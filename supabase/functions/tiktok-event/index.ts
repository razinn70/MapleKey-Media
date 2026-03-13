/**
 * Server-side TikTok Events API proxy.
 * Called fire-and-forget from other edge functions for reliable conversion tracking.
 * Requires TIKTOK_ACCESS_TOKEN and SUPABASE_SERVICE_ROLE_KEY secrets.
 */

const TIKTOK_PIXEL_ID = "D6Q5ETBC77UCL0AQT51G";
const TIKTOK_API_URL = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

interface TikTokEventPayload {
  event: string;
  event_id?: string;
  email?: string;
  phone?: string;
  value?: number;
  currency?: string;
  content_name?: string;
  content_id?: string;
  page_url?: string;
  ip?: string;
  user_agent?: string;
}

function hashSha256(value: string): Promise<string> {
  const encoder = new TextEncoder();
  return crypto.subtle.digest("SHA-256", encoder.encode(value.trim().toLowerCase()))
    .then((buf) => Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join(""));
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Only allow internal calls (service role key)
    const authHeader = req.headers.get("authorization") ?? "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    if (!authHeader.includes(serviceKey)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const accessToken = Deno.env.get("TIKTOK_ACCESS_TOKEN");
    if (!accessToken) {
      console.error("TIKTOK_ACCESS_TOKEN not configured");
      return new Response(JSON.stringify({ error: "TikTok token not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload: TikTokEventPayload = await req.json();

    // Hash PII for TikTok's advanced matching
    const user: Record<string, string> = {};
    if (payload.email) user.email = await hashSha256(payload.email);
    if (payload.phone) user.phone = await hashSha256(payload.phone);
    if (payload.ip) user.ip = payload.ip;
    if (payload.user_agent) user.user_agent = payload.user_agent;

    const eventData: Record<string, unknown> = {
      event: payload.event,
      event_time: Math.floor(Date.now() / 1000),
      user,
      properties: {
        currency: payload.currency ?? "CAD",
        value: payload.value,
        contents: [
          {
            content_id: payload.content_id ?? payload.content_name,
            content_name: payload.content_name,
          },
        ],
        content_type: "product",
      },
    };

    if (payload.event_id) eventData.event_id = payload.event_id;
    if (payload.page_url) eventData.page = { url: payload.page_url };

    const body = {
      event_source: "web",
      event_source_id: TIKTOK_PIXEL_ID,
      data: [eventData],
    };

    const resp = await fetch(TIKTOK_API_URL, {
      method: "POST",
      headers: {
        "Access-Token": accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await resp.text();
    console.log("TikTok Events API response:", resp.status, result);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("TikTok event error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
