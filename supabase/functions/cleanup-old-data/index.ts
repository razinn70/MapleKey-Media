import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Delete bookings older than 3 years
    const threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

    const { data: deletedBookings, error: bookingsError } = await supabase
      .from("bookings")
      .delete()
      .lt("created_at", threeYearsAgo.toISOString())
      .select("id");

    if (bookingsError) {
      console.error("Error deleting old bookings:", bookingsError);
    }

    // Delete contact submissions older than 1 year
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const { data: deletedContacts, error: contactsError } = await supabase
      .from("contact_submissions")
      .delete()
      .lt("created_at", oneYearAgo.toISOString())
      .select("id");

    if (contactsError) {
      console.error("Error deleting old contacts:", contactsError);
    }

    const deletedBookingsCount = deletedBookings?.length ?? 0;
    const deletedContactsCount = deletedContacts?.length ?? 0;

    console.log(`Cleanup complete: ${deletedBookingsCount} bookings, ${deletedContactsCount} contacts deleted`);

    return new Response(
      JSON.stringify({
        success: true,
        deletedBookingsCount,
        deletedContactsCount,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Cleanup function error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
