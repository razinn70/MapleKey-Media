import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ADMIN_EMAIL = "maplekeymedia@gmail.com";

async function sendEmail(to: string, subject: string, html: string) {
  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!resendKey) {
    console.warn("RESEND_API_KEY not configured — skipping email");
    return;
  }

  const PRIMARY_FROM = "MapleKey Media <bookings@maplekey.media>";
  const FALLBACK_FROM = "MapleKey Media <onboarding@resend.dev>";

  async function attemptSend(from: string) {
    return fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], subject, html }),
    });
  }

  const res = await attemptSend(PRIMARY_FROM);
  if (res.ok) return;

  const err = await res.text();
  console.error("Resend primary error:", err);

  // Retry with fallback sender if domain not verified (403)
  if (res.status === 403) {
    console.log("Retrying with fallback sender...");
    const fallbackRes = await attemptSend(FALLBACK_FROM);
    if (!fallbackRes.ok) {
      const fallbackErr = await fallbackRes.text();
      console.error("Resend fallback error:", fallbackErr);
    }
  }
}

function bookingConfirmationHtml(data: {
  client_name: string;
  package_name: string;
  session_date: string;
  property_address: string;
  total_price: number;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="font-size: 24px; margin: 0;">🍁 MapleKey Media</h1>
    <p style="color: #666; margin-top: 4px;">Booking Confirmation</p>
  </div>
  <p>Hi <strong>${data.client_name}</strong>,</p>
  <p>Your photography session has been booked! Here are the details:</p>
  <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin: 20px 0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #666;">Package</td><td style="padding: 8px 0; font-weight: bold; text-align: right;">${data.package_name}</td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Date</td><td style="padding: 8px 0; font-weight: bold; text-align: right;">${data.session_date}</td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Property</td><td style="padding: 8px 0; font-weight: bold; text-align: right;">${data.property_address}</td></tr>
      <tr style="border-top: 1px solid #ddd;"><td style="padding: 12px 0; color: #666;">Total</td><td style="padding: 12px 0; font-weight: bold; font-size: 20px; text-align: right;">$${data.total_price}</td></tr>
    </table>
  </div>
  <h3 style="margin-top: 24px;">What Happens Next?</h3>
  <ol style="color: #444; line-height: 1.8;">
    <li>Our team will reach out 24 hours before your session to confirm access.</li>
    <li>Show up on session day — we'll handle the rest!</li>
    <li>Edited media delivered within 24–48 hours.</li>
  </ol>
  <p style="color: #666; margin-top: 24px;">Questions? Reply to this email or call us at <strong>519-503-3479</strong>.</p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
  <p style="font-size: 12px; color: #999; text-align: center;">MapleKey Media · Kitchener-Waterloo Region · <a href="https://maplekey.media" style="color: #999;">maplekey.media</a></p>
</body>
</html>`;
}

function adminBookingNotificationHtml(data: {
  client_name: string;
  client_email: string;
  client_phone: string | null;
  package_name: string;
  session_date: string;
  property_address: string;
  total_price: number;
  add_on_ids: string[];
  notes: string | null;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
  <h1 style="font-size: 20px; color: #c41e3a;">🔔 New Booking Received</h1>
  <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin: 16px 0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 6px 0; color: #666;">Client</td><td style="padding: 6px 0; text-align: right;"><strong>${data.client_name}</strong></td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0; text-align: right;">${data.client_email}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Phone</td><td style="padding: 6px 0; text-align: right;">${data.client_phone || '—'}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Package</td><td style="padding: 6px 0; text-align: right;"><strong>${data.package_name}</strong></td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Date</td><td style="padding: 6px 0; text-align: right;">${data.session_date}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Property</td><td style="padding: 6px 0; text-align: right;">${data.property_address}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Add-ons</td><td style="padding: 6px 0; text-align: right;">${data.add_on_ids.length > 0 ? data.add_on_ids.join(', ') : 'None'}</td></tr>
      ${data.notes ? `<tr><td style="padding: 6px 0; color: #666;">Notes</td><td style="padding: 6px 0; text-align: right;">${data.notes}</td></tr>` : ''}
      <tr style="border-top: 1px solid #ddd;"><td style="padding: 10px 0; color: #666;">Total</td><td style="padding: 10px 0; font-weight: bold; font-size: 18px; text-align: right;">$${data.total_price}</td></tr>
    </table>
  </div>
</body>
</html>`;
}

function adminContactNotificationHtml(data: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
  <h1 style="font-size: 20px; color: #c41e3a;">📬 New Contact Submission</h1>
  <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin: 16px 0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 6px 0; color: #666;">Name</td><td style="padding: 6px 0; text-align: right;"><strong>${data.first_name} ${data.last_name}</strong></td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0; text-align: right;">${data.email}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Phone</td><td style="padding: 6px 0; text-align: right;">${data.phone || '—'}</td></tr>
    </table>
    <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #ddd;">
      <p style="color: #666; margin: 0 0 8px;">Message:</p>
      <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
    </div>
  </div>
  <p style="font-size: 12px; color: #999;">Reply directly to <a href="mailto:${data.email}">${data.email}</a></p>
</body>
</html>`;
}

// Edge function to send transactional emails (internal-only, requires service role key)
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Verify caller is using the service role key
  const authHeader = req.headers.get("Authorization");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!serviceKey || authHeader !== `Bearer ${serviceKey}`) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const { type, data } = await req.json();

    switch (type) {
      case "booking_confirmation":
        await sendEmail(
          data.client_email,
          `Booking Confirmed — ${data.package_name} Session`,
          bookingConfirmationHtml(data)
        );
        await sendEmail(
          ADMIN_EMAIL,
          `🔔 New Booking: ${data.client_name} — ${data.package_name}`,
          adminBookingNotificationHtml(data)
        );
        break;

      case "contact_notification":
        await sendEmail(
          ADMIN_EMAIL,
          `📬 Contact: ${data.first_name} ${data.last_name}`,
          adminContactNotificationHtml(data)
        );
        break;

      default:
        return new Response(
          JSON.stringify({ error: "Unknown email type" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Send email error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
