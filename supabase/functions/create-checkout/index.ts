import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Valid Stripe price IDs from the catalog
const VALID_PRICE_IDS = new Set([
  "price_1T9uSAQS8CDhJNREIM9UWbhN", // Standard
  "price_1T9uSLQS8CDhJNRE7KdYhmys", // Professional
  "price_1T9uSLQS8CDhJNREMA3dJT9O", // Premium
  "price_1T9uSMQS8CDhJNREg1nZEEp9", // Drone
  "price_1T9uSNQS8CDhJNREgBKJWRS1", // Twilight
  "price_1T9uSOQS8CDhJNREkaaIqpMQ", // Walkthrough
  "price_1T9uSPQS8CDhJNREAxTayQal", // Ad Consultation
  "price_1T9uSQQS8CDhJNREiTIlOl88", // Social Reels
  "price_1T9uSRQS8CDhJNREw8mnQ8Wt", // Lead Funnel
]);

// In-memory rate limiting (per function instance)
const rateMap = new Map<string, number[]>();
function isRateLimited(ip: string, maxPerMin = 10): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (hits.length >= maxPerMin) return true;
  hits.push(now);
  rateMap.set(ip, hits);
  return false;
}

const ALLOWED_ORIGINS = new Set([
  "https://maplekey.media",
  "https://www.maplekey.media",
  "https://maplekeymedia.ca",
  "https://www.maplekeymedia.ca",
  "https://maplekeymedia.lovable.app",
  "http://localhost:8080",
]);

function verifyOrigin(req: Request): Response | null {
  const origin = req.headers.get("origin") ?? "";
  if (!ALLOWED_ORIGINS.has(origin)) {
    return new Response(
      JSON.stringify({ error: "Invalid request origin" }),
      { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const { packagePriceId, addOnPriceIds, customerEmail, customerName } = await req.json();

    if (!packagePriceId) {
      return new Response(JSON.stringify({ error: "Package price ID is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate price IDs against catalog whitelist
    if (!VALID_PRICE_IDS.has(packagePriceId)) {
      return new Response(JSON.stringify({ error: "Invalid package selection" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (addOnPriceIds && Array.isArray(addOnPriceIds)) {
      for (const priceId of addOnPriceIds) {
        if (!VALID_PRICE_IDS.has(priceId)) {
          return new Response(JSON.stringify({ error: "Invalid add-on selection" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }
    }

    // Build line items: package + any add-ons
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      { price: packagePriceId, quantity: 1 },
    ];

    if (addOnPriceIds && Array.isArray(addOnPriceIds)) {
      for (const priceId of addOnPriceIds) {
        lineItems.push({ price: priceId, quantity: 1 });
      }
    }

    // Check for existing Stripe customer
    let customerId: string | undefined;
    if (customerEmail) {
      const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      }
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : customerEmail || undefined,
      line_items: lineItems,
      mode: "payment",
      success_url: `${ALLOWED_ORIGINS.has(req.headers.get("origin") ?? "") ? req.headers.get("origin") : "https://maplekeymedia.ca"}/booking/confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${ALLOWED_ORIGINS.has(req.headers.get("origin") ?? "") ? req.headers.get("origin") : "https://maplekeymedia.ca"}/#pricing`,
      metadata: {
        customer_name: customerName || "",
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(
      JSON.stringify({ error: "Unable to create checkout session. Please try again." }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
