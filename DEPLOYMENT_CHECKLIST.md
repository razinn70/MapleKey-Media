# MapleKey Media — Deployment-Ready Checklist

> Authored by senior engineering review. Every item must be resolved before production launch.

---

## 🔴 P0 — BLOCKING (Must fix before deploy)

### Backend / Data Persistence

- [x] **Enable Lovable Cloud** — Cloud enabled with Supabase backend.
- [x] **Create `bookings` table** — Schema includes `id`, `idempotency_key`, `package_id`, `package_name`, `base_price`, `add_on_ids[]`, `total_price`, `session_date`, `client_name`, `client_email`, `client_phone`, `property_address`, `notes`, `status` (enum), `created_at`, `updated_at`.
- [x] **Create `contact_submissions` table** — Schema includes `id`, `first_name`, `last_name`, `email`, `phone`, `message`, `honeypot`, `status` (enum), `created_at`.
- [x] **Create booking submission edge function** — `submit-booking` validates with server-side checks, inserts into `bookings`, handles idempotency key.
- [x] **Create contact submission edge function** — `submit-contact` validates inputs, honeypot check, inserts into `contact_submissions`.
- [x] **Wire booking form to edge function** — Replaced `setTimeout` mock with `supabase.functions.invoke()`. Handles loading, success, error states.
- [x] **Wire contact form to edge function** — Replaced `mailto:` hack with actual API call. Shows success/error toast.

### Form Validation

- [x] **Add Zod schemas for booking form** — `src/frontend/lib/validations.ts` validates name, email, phone, address, date (future, not Sunday), notes.
- [x] **Add Zod schemas for contact form** — Validates firstName, lastName, email, phone, message (min 10, max 2000).
- [x] **Server-side validation** — Edge functions independently validate all inputs with sanitization.

### Email Notifications

- [ ] **Booking confirmation email** — Send automated email to client on successful booking. Requires email service integration (Resend/SendGrid).
- [ ] **Admin notification email** — Send email to `maplekeymedia@gmail.com` on every new booking and contact submission.
- [ ] **Store email service API key as Cloud secret** — Never in codebase.

---

## 🟡 P1 — HIGH PRIORITY (Should fix before deploy)

### Security

- [x] **Rate limiting on edge functions** — Per-IP rate limiting (5 submissions per minute) on both endpoints.
- [x] **CSRF / honeypot field** — Hidden honeypot field on both forms. Bot submissions silently accepted (no data stored).
- [x] **Sanitize all user inputs** — HTML tags stripped from all text fields before DB insert.
- [x] **RLS policies on tables** — RLS enabled, no public policies. Only service role (edge functions) can write.

### SEO & Meta

- [x] **OG image** — Branded OG image (1200×630) generated and referenced in `index.html`.
- [x] **Canonical tag** — Added `<link rel="canonical" href="https://maplekey.media/" />`.
- [x] **Per-page meta tags** — Gallery, LearnMore, Privacy, Terms pages now set `document.title` via `useEffect`.
- [x] **robots.txt** — Updated with proper directives and sitemap reference.
- [x] **Sitemap.xml** — Generated static `public/sitemap.xml` listing all routes.

### Accessibility

- [x] **Mobile hamburger menu** — Added `aria-expanded`, `aria-controls`, `aria-label` on toggle button.
- [x] **Focus trap on mobile menu** — Tab cycles within menu when open. Escape closes menu and returns focus.
- [x] **Hero image `loading="eager"`** — Changed from `loading="lazy"` to `loading="eager"` with `fetchPriority="high"`.
- [x] **Skip-to-content link** — Added visually hidden skip link as first focusable element on Index page.
- [x] **Gallery grid images dimensions** — Added `width={800} height={600}` to all gallery images.

### Performance

- [ ] **Hero image format** — Convert `hero-property.jpg` to WebP with responsive `srcSet`.
- [ ] **Portfolio images** — Convert to WebP. Add `width`/`height`.
- [x] **Font optimization** — Switched from CSS `@import` to `<link rel="preload">` in `index.html` with `&subset=latin`.
- [x] **Code splitting** — Gallery, LearnMore, Privacy, Terms, NotFound pages use `React.lazy()` + `Suspense`.
- [x] **Bundle size** — Removed unused deps: `recharts`, `react-resizable-panels`, `next-themes`, `cmdk`, `input-otp`, `embla-carousel-react`, `sonner`.

---

## 🟢 P2 — ENHANCEMENTS (Deploy without, ship soon after)

### UX Polish

- [ ] **Booking success state** — After backend integration, redirect to `/booking/confirmed/:id`.
- [ ] **Loading skeletons** — Add skeleton placeholders for gallery images.
- [ ] **Error boundaries** — Wrap major sections in error boundaries.
- [x] **Toast placement** — Removed duplicate `<Sonner />`, keeping only shadcn `<Toaster />`.

### Content / Data Integrity

- [ ] **"Trusted by" brands** — Verify RE/MAX, CENTURY 21, Royal LePage, Keller Williams, Sotheby's are real client relationships.
- [ ] **Gallery uses 3 recycled images** — Replace with actual project photos before launch.
- [x] **LinkedIn social link** — Fixed from admin dashboard URL to public company page URL.
- [x] **Contact email mismatch** — Standardized to `maplekeymedia@gmail.com` across Privacy/Terms pages.
- [x] **Footer nav links route-aware** — Applied `handleNavClick` pattern to all footer hash links.

### Architecture

- [ ] **PricingAndBooking.tsx refactor** — Split into sub-components.
- [x] **Backend types in sync** — Updated `BookingRequest` to match frontend payload shape.
- [ ] **Environment config** — Set up `.env` for site URL and API endpoints.
- [x] **Removed unused dependencies** — 7 packages removed.

### Testing

- [ ] **Unit tests** — Add tests for `calculateTotal()`, Zod schemas.
- [ ] **Integration tests** — Booking and contact form flows.
- [ ] **E2E tests** — Playwright tests for critical paths.

### Monitoring & Analytics

- [ ] **Analytics** — Add GA4 or Plausible.
- [ ] **Error tracking** — Add Sentry or similar.

---

## ✅ Already Good

- [x] Design system with semantic tokens (HSL-based, dark mode ready)
- [x] JSON-LD structured data (`LocalBusiness` + `ProfessionalService`)
- [x] Single source of truth for pricing (`data/pricing.ts` → `utils/pricing.ts` → `PricingAndBooking.tsx`)
- [x] Data-driven architecture (services, stats, FAQs, gallery, contact, pricing all in `/data/`)
- [x] Proper TypeScript types for all data models
- [x] Privacy Policy and Terms of Service pages
- [x] Route-aware header AND footer navigation with smooth scrolling
- [x] Responsive layout across all breakpoints
- [x] Social media links with proper `target="_blank"` + `rel="noopener noreferrer"`
- [x] Semantic HTML structure with proper heading hierarchy
- [x] Lightbox with keyboard navigation (arrow keys)
- [x] Lovable Cloud backend with database persistence
- [x] Zod validation on both client and server
- [x] Rate limiting and honeypot anti-spam
- [x] Code-split lazy-loaded routes
- [x] SEO: canonical, sitemap, robots.txt, OG image, per-page titles

---

## 📋 Remaining Deploy Sequence

1. ~~Enable Lovable Cloud~~ ✅
2. ~~Create DB tables + RLS policies~~ ✅
3. ~~Build edge functions (booking + contact)~~ ✅
4. ~~Wire forms to edge functions with Zod validation~~ ✅
5. ~~Fix SEO gaps~~ ✅
6. ~~Fix accessibility issues~~ ✅
7. Convert images to WebP (optional optimization)
8. ~~Remove unused deps, code-split routes~~ ✅
9. Set up email notifications (booking confirmation + admin alerts)
10. Add analytics + error tracking
11. Write critical-path tests
12. Final QA pass (mobile, desktop, all routes)
13. Publish
