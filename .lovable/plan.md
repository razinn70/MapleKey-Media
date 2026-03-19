

## Fix Email Notifications

### The Problem
All emails from the `send-email` backend function are failing with a 403 error. Resend requires domain verification before it allows sending emails from that domain. Currently, the `from` address is set to `bookings@maplekey.media`, but `maplekey.media` is not verified in Resend.

### What You Need to Do (Outside Lovable)

1. **Log into your Resend account** at [resend.com/domains](https://resend.com/domains)
2. **Add the domain** `maplekey.media`
3. **Add the DNS records** Resend provides (typically 3 records: SPF, DKIM, and an MX record) to your domain's DNS settings (wherever you manage maplekey.media — GoDaddy, Cloudflare, Namecheap, etc.)
4. **Wait for verification** — usually takes a few minutes, sometimes up to 48 hours

### Code Change (Quick Fix While You Verify)

As a temporary fallback, update the `send-email` function to use Resend's free shared domain (`onboarding@resend.dev`) when sending fails, so you still receive admin notifications while domain verification is pending.

**File: `supabase/functions/send-email/index.ts`**
- Update the `sendEmail` function to retry with `onboarding@resend.dev` as the `from` address if the first attempt returns a 403 domain error
- This ensures you receive booking and contact notifications immediately

### Summary
- 1 edge function updated with a fallback sender
- No frontend changes needed
- Once you verify `maplekey.media` in Resend, the primary sender will work and the fallback won't trigger

