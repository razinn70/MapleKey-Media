

# MapleKey Media — Structured Refinement Plan

## Architecture Audit Summary

**Stack**: Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui
**Routing**: React Router v6 (BrowserRouter)
**Structure**: `src/frontend/` (SPA) + `src/backend/` (scaffolded, empty)
**Data**: All content hardcoded in component files (services in Services.tsx, stats in Hero.tsx, contact info in Contact.tsx)
**Gallery**: Already has GalleryGrid, GalleryLightbox, and /gallery page with filtering + load more

### Issues Found
- Services data hardcoded inside Services.tsx
- Stats data hardcoded inside Hero.tsx
- Contact info (fake address, placeholder phone/email) hardcoded in Contact.tsx
- Hero copy is generic placeholder text
- No pricing section exists
- NavLink.tsx is unused
- Gallery system already exists and is well-structured (Phase 6 is mostly done)

---

## Phase 1 — Data Extraction + New Data Files

Create centralized data files to eliminate hardcoded content:

**`src/frontend/data/services.ts`** — All 6 service definitions with icons, descriptions, and features. Replace bottom 3 services:
- Floor Plans --> Short-Form Video Content
- Virtual Staging --> Meta Ads and Paid Growth
- 3D Virtual Tours remains, but add: Lead Funnel and Booking Systems

**`src/frontend/data/stats.ts`** — Updated stats:
- 403% — More inquiries with video listings
- 86% — Of buyers use online video during their home search
- 24hr — Average turnaround
- 100% — Client satisfaction

**`src/frontend/data/pricing.ts`** — Package tiers with base prices and add-on definitions (price, label, id).

**`src/frontend/data/contact.ts`** — Centralized contact info:
- Phone: 519-503-3479
- Email: maplekeymedia@gmail.com
- Service area: Kitchener-Waterloo Region and Surrounding Areas
- No physical address

---

## Phase 2 — Hero Refinement

Update `Hero.tsx` with new copy only (layout stays the same):

- **Headline**: "Modern Media & Marketing for Real Estate Professionals"
- **Subheadline**: The provided paragraph about helping realtors in southern Ontario
- **Body text**: Add the second paragraph about the team specializing in photography, videography, etc.
- **Stats**: Import from `data/stats.ts` instead of inline array
- **Image**: Already uses local asset import with object-cover; add `loading="lazy"` attribute and explicit width/height for CLS prevention

---

## Phase 3 — Services Restructure

Refactor `Services.tsx`:
- Import service data from `data/services.ts`
- Updated service list (keep top 3: HDR Photography, Video Tours, Drone Aerial; replace bottom 3 with Short-Form Video Content, Meta Ads and Paid Growth, Lead Funnel and Booking Systems)
- Component remains a clean grid renderer with no hardcoded copy

---

## Phase 4 — Pricing Calculator

Create new components:

**`src/frontend/data/pricing.ts`**:
- Base packages array: each with id, name, description, basePrice, included features list
- Add-ons array: each with id, label, price

**`src/frontend/components/PricingCalculator.tsx`**:
- Select a base package (radio/card selection)
- Toggle add-on checkboxes with +$ values
- Pure function `calculateTotal(basePrice, selectedAddOns)` computes estimated total
- Real-time display: "Base: $X + Add-ons: $Y = Estimated Total: $Z"
- Clean, professional card-based layout matching existing design language
- Informational only, no checkout

**`src/frontend/utils/pricing.ts`**:
- `calculateTotal()` pure function separated for testability

Add Pricing section to Index.tsx page between Services and Portfolio.

---

## Phase 5 — Contact Refinement

Update `Contact.tsx`:
- Import contact data from `data/contact.ts`
- Remove the fake "123 King Street West" office address block
- Replace with "Service Area: Kitchener-Waterloo Region and Surrounding Areas" using a MapPin icon
- Update phone to 519-503-3479 (with proper tel: link)
- Update email to maplekeymedia@gmail.com (with proper mailto: link)
- Keep Hours block as-is

---

## Phase 6 — Portfolio / Gallery

The gallery system is already implemented with:
- GalleryGrid (responsive columns, hover overlay)
- GalleryLightbox (dialog with keyboard nav, captions)
- /gallery page with category filtering + load more
- data/gallery.ts with typed items

No major changes needed. Minor cleanup:
- Update Header nav "Portfolio" link to point to /gallery for consistency
- Ensure Footer "Portfolio" link also goes to /gallery

---

## Phase 7 — Cleanup

- Delete `src/frontend/App.css` (unused legacy file)
- Delete `src/frontend/components/NavLink.tsx` (unused wrapper)
- Add `loading="lazy"` to hero image
- Update Footer service links to reflect the new 6 services
- Update CHECKLIST.md to reflect completed items
- Add "Pricing" to Header nav links

---

## Technical Details

### New files to create:
1. `src/frontend/data/services.ts`
2. `src/frontend/data/stats.ts`
3. `src/frontend/data/pricing.ts`
4. `src/frontend/data/contact.ts`
5. `src/frontend/components/PricingCalculator.tsx`
6. `src/frontend/utils/pricing.ts`

### Files to modify:
1. `src/frontend/components/Hero.tsx` — new copy + stats import + lazy load
2. `src/frontend/components/Services.tsx` — import from data file
3. `src/frontend/components/Contact.tsx` — new contact info, remove address
4. `src/frontend/components/Header.tsx` — add "Pricing" nav link
5. `src/frontend/components/Footer.tsx` — update service links
6. `src/frontend/pages/Index.tsx` — add PricingCalculator section
7. `CHECKLIST.md` — mark completed items

### Files to delete:
1. `src/frontend/App.css`
2. `src/frontend/components/NavLink.tsx`

### No new dependencies required.

