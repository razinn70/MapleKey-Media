import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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
      success_url: `${req.headers.get("origin")}/booking/confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/#pricing`,
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
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
