
-- Explicit deny policies for anon role
CREATE POLICY "deny_all_anon_bookings" ON public.bookings
  FOR ALL TO anon USING (false);

CREATE POLICY "deny_all_anon_contacts" ON public.contact_submissions
  FOR ALL TO anon USING (false);
