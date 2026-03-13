
-- Drop the existing permissive deny policies
DROP POLICY IF EXISTS deny_all_anon_bookings ON public.bookings;
DROP POLICY IF EXISTS deny_all_anon_contacts ON public.contact_submissions;

-- Recreate as RESTRICTIVE policies to enforce hard denial
CREATE POLICY deny_all_anon_bookings ON public.bookings
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false);

CREATE POLICY deny_all_anon_contacts ON public.contact_submissions
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false);
