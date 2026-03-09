import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const rateMap = new Map<string, number[]>();
function isRateLimited(ip: string, maxPerMin = 5): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (hits.length >= maxPerMin) return true;
  hits.push(now);
  rateMap.set(ip, hits);
  return false;
}

function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

Deno.serve(async (req) => {
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

    const body = await req.json();

    // Honeypot check — if filled, silently succeed (bot trap)
    if (body.honeypot) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Server-side validation
    const errors: string[] = [];
    if (!body.firstName || sanitize(body.firstName).length < 1) errors.push("First name required");
    if (!body.lastName || sanitize(body.lastName).length < 1) errors.push("Last name required");
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push("Valid email required");
    if (body.phone && !/^[\d\s\-+()]{7,20}$/.test(body.phone)) errors.push("Invalid phone format");
    if (!body.message || sanitize(body.message).length < 10) errors.push("Message must be at least 10 characters");
    if (body.message && body.message.length > 2000) errors.push("Message must be under 2000 characters");

    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ error: errors.join("; ") }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase.from("contact_submissions").insert({
      first_name: sanitize(body.firstName),
      last_name: sanitize(body.lastName),
      email: body.email.trim().toLowerCase(),
      phone: body.phone ? sanitize(body.phone) : null,
      message: sanitize(body.message),
    });

    if (error) {
      console.error("Contact insert error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to submit. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fire-and-forget admin notification email
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    fetch(`${supabaseUrl}/functions/v1/send-email`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "contact_notification",
        data: {
          first_name: sanitize(body.firstName),
          last_name: sanitize(body.lastName),
          email: body.email.trim().toLowerCase(),
          phone: body.phone ? sanitize(body.phone) : null,
          message: sanitize(body.message),
        },
      }),
    }).catch((e) => console.error("Email trigger failed:", e));

    return new Response(
      JSON.stringify({ success: true }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Contact function error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
