# MapleKey Media — Deployment-Ready Checklist

> Authored by senior engineering review. Every item must be resolved before production launch.

---

## 🔴 P0 — BLOCKING (Must fix before deploy)

### Backend / Data Persistence

- [ ] **Enable Lovable Cloud** — No backend exists. Both the booking form (`PricingAndBooking.tsx:58-71`) and contact form (`Contact.tsx:11-29`) are fake. Booking does a `setTimeout` that pretends to submit. Contact opens a `mailto:` link. Neither persists data anywhere.
- [ ] **Create `bookings` table** — Schema: `id`, `package_id`, `package_name`, `base_price`, `add_on_ids[]`, `total_price`, `session_date`, `client_name`, `client_email`, `client_phone`, `property_address`, `notes`, `status` (enum: pending/confirmed/completed/cancelled), `created_at`, `updated_at`.
- [ ] **Create `contact_submissions` table** — Schema: `id`, `first_name`, `last_name`, `email`, `phone`, `message`, `status` (enum: new/read/replied), `created_at`.
- [ ] **Create booking submission edge function** — Receives booking payload, validates with Zod, inserts into `bookings` table, returns confirmation. Must handle duplicate submissions (idempotency key).
- [ ] **Create contact submission edge function** — Receives contact payload, validates, inserts into `contact_submissions` table.
- [ ] **Wire booking form to edge function** — Replace `setTimeout` mock in `PricingAndBooking.tsx` with `supabase.functions.invoke()`. Handle loading, success, and error states.
- [ ] **Wire contact form to edge function** — Replace `mailto:` hack in `Contact.tsx` with actual API call. Show success/error toast.

### Form Validation

- [ ] **Add Zod schemas for booking form** — Validate: `name` (min 2 chars), `email` (valid format), `phone` (optional, valid format if provided), `address` (min 5 chars), `date` (future date, not Sunday), `notes` (max 1000 chars). Packages: `zod` + `react-hook-form` + `@hookform/resolvers` already installed.
- [ ] **Add Zod schemas for contact form** — Validate: `firstName` (required), `lastName` (required), `email` (valid format), `phone` (optional), `message` (min 10 chars, max 2000).
- [ ] **Server-side validation** — Edge functions must independently validate all inputs. Never trust client-only validation.

### Email Notifications

- [ ] **Booking confirmation email** — Send automated email to client on successful booking (via Resend, SendGrid, or similar). Include: package name, date, address, total price, cancellation policy link.
- [ ] **Admin notification email** — Send email to `maplekeymedia@gmail.com` on every new booking and contact submission.
- [ ] **Store email service API key as Cloud secret** — Never in codebase.

---

## 🟡 P1 — HIGH PRIORITY (Should fix before deploy)

### Security

- [ ] **Rate limiting on edge functions** — Prevent spam/abuse on booking and contact endpoints. Implement per-IP rate limiting (e.g., 5 submissions per minute).
- [ ] **CSRF / honeypot field** — Add a hidden honeypot field to both forms to block basic bots.
- [ ] **Sanitize all user inputs** — Strip HTML/scripts from `name`, `address`, `notes`, `message` fields before DB insert.
- [ ] **RLS policies on tables** — `bookings` and `contact_submissions` should not be publicly readable. Only edge functions (service role) write; admin reads via authenticated session.

### SEO & Meta

- [ ] **OG image missing** — `index.html` has `og:title` and `og:description` but no `og:image`. Add a branded OG image (1200×630) for social sharing.
- [ ] **Canonical tag missing** — Add `<link rel="canonical" href="https://maplekey.media/" />` to `index.html`.
- [ ] **Per-page meta tags** — Gallery, LearnMore, Privacy, Terms pages have no `<title>` or `<meta description>`. Use `react-helmet-async` or document.title in useEffect.
- [ ] **robots.txt is empty placeholder** — Update `public/robots.txt` with proper directives and sitemap reference.
- [ ] **Sitemap.xml missing** — Generate a static `public/sitemap.xml` listing all routes: `/`, `/gallery`, `/learn-more`, `/privacy`, `/terms`.

### Accessibility

- [ ] **Mobile hamburger menu** — Missing `aria-expanded`, `aria-controls`, and `aria-label` on the menu toggle button (`Header.tsx:73-78`).
- [ ] **Focus trap on mobile menu** — When open, Tab should cycle within the menu. Escape key should close it.
- [ ] **Hero image `loading="lazy"`** — The hero/LCP image should be `loading="eager"` or removed entirely (it's above the fold). Lazy loading the LCP image hurts performance.
- [ ] **Skip-to-content link** — Add a visually hidden skip link as the first focusable element for keyboard/screen reader users.
- [ ] **Gallery grid images missing dimensions** — `GalleryGrid.tsx` `<img>` tags lack `width`/`height` attributes, causing layout shift (CLS).

### Performance

- [ ] **Hero image format** — `hero-property.jpg` should be converted to WebP with responsive `srcSet` for mobile/tablet/desktop breakpoints.
- [ ] **Portfolio images** — Only 3 source images (`portfolio-1/2/3.jpg`) are reused 24 times. Convert to WebP. Add `width`/`height` to prevent CLS.
- [ ] **Font optimization** — Google Fonts loaded via CSS `@import` blocks render. Switch to `<link rel="preload">` in `index.html` with `font-display: swap`. Subset to Latin only.
- [ ] **Code splitting** — Gallery, LearnMore, Privacy, Terms pages should use `React.lazy()` + `Suspense` since they're not on the critical path.
- [ ] **Bundle size** — `recharts` is imported but never used anywhere in the app. Remove it (`~200KB` savings).

---

## 🟢 P2 — ENHANCEMENTS (Deploy without, ship soon after)

### UX Polish

- [ ] **Booking success state is fragile** — After booking, if user refreshes, form state resets with no record. With backend, redirect to a `/booking/confirmed/:id` page.
- [ ] **Loading skeletons** — Add skeleton placeholders for gallery images during lazy load.
- [ ] **Error boundaries** — Wrap each major section (`Hero`, `Services`, `PricingAndBooking`, `Portfolio`, `About`, `Contact`) in error boundaries for graceful failure.
- [ ] **Toast placement** — Both `<Toaster />` (shadcn) and `<Sonner />` are rendered in `App.tsx`. Pick one. Having both causes duplicate notifications and bundle bloat.

### Content / Data Integrity

- [ ] **"Trusted by" brands in Portfolio.tsx** — `RE/MAX`, `CENTURY 21`, `Royal LePage`, `Keller Williams`, `Sotheby's` are hardcoded. If these are real client relationships, fine. If not, remove — this is a legal liability.
- [ ] **Gallery uses 3 recycled images** — All 24 gallery items reference only `portfolio-1.jpg`, `portfolio-2.jpg`, `portfolio-3.jpg`. Replace with actual project photos before launch.
- [ ] **LinkedIn social link** — Footer links to `/admin/dashboard/` URL (`linkedin.com/company/111807200/admin/dashboard/`). This is an admin-only URL that won't work for visitors. Use the public company page URL.
- [ ] **Contact email mismatch** — `contact.ts` uses `maplekeymedia@gmail.com` but Privacy/Terms pages reference `info@maplekey.media`. Standardize to one.
- [ ] **Footer nav links not route-aware** — Footer links use bare `#services`, `#about` etc. Same bug that was fixed in Header. Apply the same `handleNavClick` pattern.

### Architecture

- [ ] **PricingAndBooking.tsx is 318 lines** — Split into: `PackageCards.tsx`, `AddOnSelector.tsx`, `PricingSummary.tsx`, `BookingForm.tsx`, `BookingConfirmation.tsx`. Share state via context or prop drilling.
- [ ] **Backend types out of sync** — `src/backend/types/index.ts` defines `BookingRequest` with `service: string` but the frontend uses `selectedPackageId` + `selectedAddOnIds[]` + `total`. Update type to match actual payload shape.
- [ ] **No environment-specific config** — No `.env` usage for things like site URL, API endpoints. When Cloud is enabled, ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are properly configured.
- [ ] **Remove unused dependencies** — `recharts`, `react-resizable-panels`, `next-themes`, `cmdk`, `input-otp`, `embla-carousel-react` are installed but unused. Each adds to bundle size.

### Testing

- [ ] **No meaningful tests** — `src/frontend/test/example.test.ts` is a placeholder. Add:
  - Unit tests for `calculateTotal()` utility
  - Unit tests for Zod validation schemas (once created)
  - Integration test for booking form submission flow
  - Integration test for contact form submission flow
- [ ] **Playwright config exists but no tests** — `playwright.config.ts` and `playwright-fixture.ts` exist with zero test files. Add E2E tests for critical paths: homepage load, nav scrolling, booking flow, contact form.

### Monitoring & Analytics

- [ ] **No analytics** — No GA4, Plausible, or any tracking. Add analytics before launch to measure conversions.
- [ ] **No error tracking** — No Sentry or similar. Production errors will be silent. At minimum, add `window.onerror` reporting.
- [ ] **Console.error in NotFound** — `NotFound.tsx:8` logs 404s to console. In production, these should report to an error tracking service.

---

## ✅ Already Good

- [x] Design system with semantic tokens (HSL-based, dark mode ready)
- [x] JSON-LD structured data (`LocalBusiness` + `ProfessionalService`)
- [x] Single source of truth for pricing (`data/pricing.ts` → `utils/pricing.ts` → `PricingAndBooking.tsx`)
- [x] Data-driven architecture (services, stats, FAQs, gallery, contact, pricing all in `/data/`)
- [x] Proper TypeScript types for all data models
- [x] Privacy Policy and Terms of Service pages
- [x] Route-aware header navigation with smooth scrolling
- [x] Responsive layout across all breakpoints
- [x] Social media links with proper `target="_blank"` + `rel="noopener noreferrer"`
- [x] Semantic HTML structure with proper heading hierarchy
- [x] Lightbox with keyboard navigation (arrow keys)

---

## 📋 Deploy Sequence

1. Enable Lovable Cloud
2. Create DB tables + RLS policies
3. Build edge functions (booking + contact + email)
4. Wire forms to edge functions with Zod validation
5. Fix SEO gaps (OG image, canonical, sitemap, robots.txt, per-page titles)
6. Fix accessibility issues (aria attrs, focus management, skip link)
7. Optimize images (WebP, srcSet, eager LCP)
8. Remove unused deps, code-split routes
9. Add analytics + error tracking
10. Write critical-path tests
11. Final QA pass (mobile, desktop, all routes)
12. Publish
