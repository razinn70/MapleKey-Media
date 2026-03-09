import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ADMIN_EMAIL = "maplekeymedia@gmail.com";

// Simple in-memory rate limiting (per function instance)
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

    // Server-side validation
    const errors: string[] = [];
    if (!body.client_name || sanitize(body.client_name).length < 2) errors.push("Name must be at least 2 characters");
    if (!body.client_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.client_email)) errors.push("Valid email required");
    if (body.client_phone && !/^[\d\s\-+()]{7,20}$/.test(body.client_phone)) errors.push("Invalid phone format");
    if (!body.property_address || sanitize(body.property_address).length < 5) errors.push("Address must be at least 5 characters");
    if (!body.session_date) errors.push("Session date required");
    if (!body.package_id || !body.package_name) errors.push("Package selection required");
    if (typeof body.base_price !== "number" || typeof body.total_price !== "number") errors.push("Invalid pricing");
    if (body.notes && body.notes.length > 1000) errors.push("Notes must be under 1000 characters");

    // Validate date is in the future and not Sunday
    if (body.session_date) {
      const d = new Date(body.session_date);
      if (isNaN(d.getTime())) errors.push("Invalid date");
      else if (d < new Date(new Date().toDateString())) errors.push("Date must be in the future");
      else if (d.getDay() === 0) errors.push("Sundays are not available");
    }

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

    // Check idempotency
    if (body.idempotency_key) {
      const { data: existing } = await supabase
        .from("bookings")
        .select("id")
        .eq("idempotency_key", body.idempotency_key)
        .maybeSingle();

      if (existing) {
        return new Response(
          JSON.stringify({ success: true, data: { id: existing.id, duplicate: true } }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const { data, error } = await supabase.from("bookings").insert({
      idempotency_key: body.idempotency_key || null,
      package_id: sanitize(body.package_id),
      package_name: sanitize(body.package_name),
      base_price: body.base_price,
      add_on_ids: body.add_on_ids ?? [],
      total_price: body.total_price,
      session_date: body.session_date,
      client_name: sanitize(body.client_name),
      client_email: body.client_email.trim().toLowerCase(),
      client_phone: body.client_phone ? sanitize(body.client_phone) : null,
      property_address: sanitize(body.property_address),
      notes: body.notes ? sanitize(body.notes) : null,
    }).select("id").single();

    if (error) {
      console.error("Booking insert error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to create booking. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: { id: data.id } }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Booking function error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
