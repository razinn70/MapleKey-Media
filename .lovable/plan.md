
# MapleKey Media — Phase 1–5 Refinement Plan

## Architecture Audit Results

**Stack**: Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui
**Router**: React Router v6 (BrowserRouter) — routes defined in `App.tsx`
**Data Layer**: `src/frontend/data/` — already has `services.ts`, `stats.ts`, `pricing.ts`, `contact.ts`, `gallery.ts`
**Existing UI components**: shadcn Accordion (`ui/accordion.tsx`) is already installed and uses `@radix-ui/react-accordion` — no new dependencies needed
**Navigation**: `Header.tsx` drives nav links from an inline array; Footer links are hardcoded in-file

### Issues identified before changes
- `About.tsx`: heading, body copy, and bullet list are all hardcoded inline with stale content
- `Hero.tsx`: headline/subheadline are hardcoded inline (though stats already come from `data/stats.ts`)
- No `/learn-more` route exists in `App.tsx`
- No `src/frontend/data/faqs.ts` file exists
- Footer "FAQ" link points to `#` (dead link) — can be updated to `/learn-more#faq`
- The prompt's FAQ block placeholder was empty; will write 5 professional FAQs matching MapleKey's services

---

## Phase 1 — Hero Copy Update

**File**: `src/frontend/components/Hero.tsx`

Only the text content changes. Layout, animations, image, buttons, and stats are untouched.

- Replace `<h1>` content:
  - Line 1: `"Turn Attention Into Appointments."`
  - Remove the `<span className="block text-primary mt-2">` second line — the new headline is a single punchy statement

- Replace subheadline `<p>`:
  - `"MapleKey Media builds content and marketing systems that help realtors and developers attract serious buyers, generate consistent inquiries, and accelerate sales."`

- Remove the body `<p>` (the second paragraph under subheadline) — it no longer fits the tighter new messaging and would create visual clutter with the punchy new headline. The hero becomes: badge → headline → subheadline → CTAs → stats.

---

## Phase 2 & 3 — About Section Copy + Bullets

**File**: `src/frontend/components/About.tsx`

Move content out of JSX into the data layer. The `features` array at the top of the file is already a quasi-data pattern — we elevate it properly.

### Changes to `About.tsx`:
- Update the small label from `"About MapleKey Media"` → keep as-is (it's a section label, not content)
- Replace `<h2>` text: `"A Strategic Partner in Modern Real Estate Marketing"`
- Replace first `<p>` (large lead text): `"MapleKey Media partners with realtors and developers across southern Ontario to deliver high-impact visual content and growth-driven marketing systems that generate measurable results."`
- Replace second `<p>` (body): `"We don't just capture properties — we build strategic campaigns. From short-form video and cinematic photography to Meta advertising and automated booking funnels, every project is designed to attract serious buyers, increase engagement, and accelerate sales. In real estate, time is money. That's why we combine creative precision with operational efficiency — ensuring fast turnaround, consistent quality, and marketing that performs."`
- Replace `features` array (top of file) with updated 6 bullets:
  1. `"24–48 hour professional turnaround"`
  2. `"Platform-optimized short-form content"`
  3. `"Meta ad campaign setup & optimization"`
  4. `"MLS-ready formats & web delivery"`
  5. `"Structured lead capture & booking systems"`
  6. `"Consistent branding across all media"`
- Update the "Learn More About Us" `<Button>` to route to `/learn-more` using React Router `<Link asChild>` so it navigates correctly without a full page reload

---

## Phase 4 — New Data File: `faqs.ts`

**New file**: `src/frontend/data/faqs.ts`

TypeScript interface and export:
```ts
export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
export const faqs: FAQ[] = [ ... ]
```

5 professional FAQs for MapleKey Media:

1. **What areas do you serve?**
   "We primarily serve the Kitchener-Waterloo Region and surrounding southern Ontario communities, including Cambridge, Guelph, Hamilton, and the Greater Toronto Area. Contact us if you're outside these areas — we're happy to discuss travel options for the right project."

2. **How quickly will I receive my photos and videos?**
   "Our standard turnaround is 24–48 hours after your session. Rush delivery is available upon request. All files are delivered digitally through a private download link, optimized for both MLS upload and web use."

3. **What's included in the base packages?**
   "Each base package includes professional HDR photography with full editing and colour correction, MLS-ready file formats, and web-optimized delivery. Higher-tier packages add video tours, drone footage, and short-form social content. You can also customize any package with our add-ons."

4. **Do I need to be present during the shoot?**
   "It's not required, but we recommend a brief walkthrough at the start so we can note any specific angles or features you'd like highlighted. We handle the full shoot independently and will lock up securely when finished."

5. **How do Meta Ads and Lead Funnels work with my listings?**
   "We build targeted Facebook and Instagram ad campaigns that place your listing directly in front of qualified local buyers and investors. These are paired with high-converting landing pages and automated follow-up sequences so every lead is captured and nurtured — not just seen."

---

## Phase 5 — New `/learn-more` Page

**New file**: `src/frontend/pages/LearnMore.tsx`

Follows the exact same structural pattern as `Gallery.tsx` — uses `<Header />` and `<Footer />`, full-page layout with `pt-24` for fixed header offset.

### Page sections (top to bottom):

**1. Hero-style intro block** (matches existing section heading patterns):
- Small label: `"ABOUT MAPLKEY MEDIA"` styled as `text-primary font-semibold text-sm uppercase tracking-wider`
- `<h1>`: `"A Strategic Partner in Modern Real Estate Marketing"`
- Supporting `<p>`: `"We combine high-impact media, paid advertising, and structured marketing systems to help real estate professionals generate measurable results."`

**2. FAQ Section**:
- Small label: `"FREQUENTLY ASKED QUESTIONS"` — same styling pattern
- `<h2>`: `"Everything You Need to Know"`
- Renders `faqs` array from `data/faqs.ts` using the existing shadcn `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` components
- `type="single" collapsible` on the Accordion root — only one open at a time
- Keyboard accessible out of the box (Radix handles Enter/Space and ARIA)

**3. CTA Block** (full-width, matches existing section patterns):
- `<h2>`: `"Ready to Elevate Your Marketing?"`
- `<p>`: `"Book a strategy call today and let's build a system that drives real results."`
- Primary button: `"Book a Strategy Call"` → `href="#pricing"` on home (use `<Link to="/#pricing">`)
- Secondary button: `"View Our Work"` → `<Link to="/gallery">`
- Button styling matches existing site: primary uses `bg-gradient-red`, secondary uses `variant="outline"`

---

## Phase 6 — Register Route in App.tsx

**File**: `src/frontend/App.tsx`

Add import and route:
```tsx
import LearnMore from "./pages/LearnMore.tsx";
// ...
<Route path="/learn-more" element={<LearnMore />} />
```
Insert above the catch-all `*` route.

---

## Phase 7 — Update Footer FAQ Link

**File**: `src/frontend/components/Footer.tsx`

Update the FAQ support link from `href: '#'` to `href: '/learn-more'` so it navigates to the new page. Since footer uses plain `<a>` tags, it will navigate as a full URL — works fine for a non-SPA-critical link.

---

## Files Summary

| File | Action |
|------|--------|
| `src/frontend/components/Hero.tsx` | Edit — update headline and subheadline text only |
| `src/frontend/components/About.tsx` | Edit — update heading, body copy, bullets, and button link |
| `src/frontend/data/faqs.ts` | Create — 5 FAQs with id/question/answer |
| `src/frontend/pages/LearnMore.tsx` | Create — full page: intro hero + FAQ accordion + CTA block |
| `src/frontend/App.tsx` | Edit — register `/learn-more` route |
| `src/frontend/components/Footer.tsx` | Edit — update FAQ href from `#` to `/learn-more` |

**No new dependencies.** shadcn Accordion (`@radix-ui/react-accordion`) is already installed and the component file exists at `src/frontend/components/ui/accordion.tsx`.
