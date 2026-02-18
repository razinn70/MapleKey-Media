# MapleKey Media — Improvement Checklist

## 🔴 Critical (Must Fix)

- [ ] **Connect backend (Lovable Cloud)** — Booking form and contact form currently simulate submissions. Enable Cloud for database persistence, email confirmations, and real data storage.
- [ ] **Form validation** — Add proper validation with `zod` + `react-hook-form` on both Booking and Contact forms (email format, required fields, phone format).
- [ ] **Remove unused `App.css`** — Legacy Vite boilerplate CSS (`src/frontend/App.css`) conflicts with Tailwind design system. Delete it.
- [ ] **Accessibility audit** — Several interactive elements lack proper `aria-labels`, focus states, and keyboard navigation. Hero CTA buttons need anchor links to `#booking`.

## 🟡 High Priority (Should Fix)

- [ ] **SEO: Add JSON-LD structured data** — Add `LocalBusiness` and `Service` schema markup for search engine visibility.
- [ ] **Image optimization** — Convert hero/portfolio JPGs to WebP with responsive `srcSet` for faster load times.
- [ ] **Lazy load below-fold sections** — Use `React.lazy` or Intersection Observer for Portfolio, About, Contact, and Footer sections.
- [ ] **Mobile hamburger menu accessibility** — Add `aria-expanded`, focus trap, and Escape key handling to the mobile menu.
- [ ] **Contact form submission handling** — Currently no `onSubmit` logic. Wire up to backend or add client-side feedback.
- [ ] **Booking component refactor** — At 269 lines, `Booking.tsx` should be split into `ServiceSelector`, `DatePicker`, `BookingForm`, and `ConfirmationDialog` sub-components.

## 🟢 Enhancements (Nice to Have)

- [ ] **Add Framer Motion animations** — Scroll-triggered animations for Services cards, Portfolio gallery, and About stats.
- [ ] **Testimonials carousel** — Add client testimonials with agent photos and ratings for social proof.
- [ ] **Pricing section** — Three-tier pricing (Basic, Pro, Enterprise) with feature comparison table.
- [ ] **Before/After virtual staging slider** — Interactive comparison slider showcasing virtual staging results.
- [ ] **Blog/Resources section** — Content marketing for SEO (real estate photography tips, market insights).
- [ ] **Dark mode toggle** — Design tokens already support dark mode; add a theme toggle in the header.
- [ ] **Admin dashboard** — Protected route for viewing bookings, managing portfolio, and tracking leads.
- [ ] **Analytics integration** — Google Analytics 4 or Plausible for tracking conversions and user behavior.
- [ ] **Error boundaries** — Add React error boundaries around major sections for graceful failure handling.
- [ ] **Loading skeleton states** — Add skeleton loaders for images and dynamic content.

## 🏗️ Architecture & Performance

- [ ] **Bundle analysis** — Run `vite-plugin-visualizer` to identify large dependencies.
- [ ] **Code splitting** — Split routes with `React.lazy` for the NotFound page and future pages.
- [ ] **Font subsetting** — Subset Playfair Display and Inter to reduce font payload.
- [ ] **Cache headers** — Configure proper caching for static assets after publishing.
- [ ] **Testing** — Add unit tests for form validation logic, integration tests for booking flow.

## 📁 Project Structure (Current)

```
src/
├── frontend/           # All client-side code
│   ├── assets/         # Images, logos
│   ├── components/     # UI components
│   │   ├── ui/         # shadcn/ui primitives
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Booking.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities
│   ├── pages/          # Route pages
│   ├── test/           # Test setup
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   └── index.css       # Design system tokens
├── backend/            # Server-side code (requires Lovable Cloud)
│   ├── api/            # API route handlers
│   ├── services/       # Business logic
│   ├── types/          # Shared TypeScript types
│   └── utils/          # Backend utilities
```
