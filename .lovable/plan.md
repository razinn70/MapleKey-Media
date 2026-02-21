
# MapleKey Media — UI & Functional Updates

## Phase 1 — Hero Button Update

**File**: `src/frontend/components/Hero.tsx`

- Remove the white outline "View Showreel" button entirely (lines 47-50)
- Remove the `Play` import from lucide-react
- Change the flex container from `flex-col sm:flex-row` to just `flex` with `justify-center`
- Update the red button text from "Book a Session" to "Get a Quote" and make it scroll to `#pricing` using an `<a>` tag with `scroll-behavior: smooth`
- The button wraps in `<a href="#pricing">` via shadcn's `asChild` pattern

## Phase 2 — Stats Update

**File**: `src/frontend/data/stats.ts`

Replace all 4 stats with the new data:
- `95%` — "Homebuyers search online during the home buying process"
- `51%` — "Buyers find the home they purchase online"
- `76%` — "Buyers use a mobile device during their home search"
- `70%+` — "Buyers say listing photos are the most important factor when viewing a property online"

No changes to `Hero.tsx` grid layout — it already renders from this data file.

## Phase 3 — Delivery Info to Contact Us

**File**: `src/frontend/components/Footer.tsx`

- Rename footer support link "Delivery Info" to "Contact Us"
- Change its `href` from `/learn-more#faq` to `#contact` so it scrolls to the Contact section

## Phase 4 — Send Message Button (mailto)

**File**: `src/frontend/components/Contact.tsx`

- Update the form's `onSubmit` handler: on submit, open `mailto:maplekeymedia@gmail.com` with the form data populated in the subject/body
- Keep the existing form markup and validation intact
- The button triggers a `mailto:` link as a fallback action using `window.location.href`

Note: The email in the prompt has a typo ("mapleketmedia") — using the correct email from `data/contact.ts`: `maplekeymedia@gmail.com`

## Phase 5 — Social Links Update

**File**: `src/frontend/components/Footer.tsx`

Update `socialLinks` array:
- Instagram: `https://www.instagram.com/maplekeymedia/`
- Facebook: `https://www.facebook.com/MapleKeyMedia`
- LinkedIn: `https://www.linkedin.com/company/111807200/admin/dashboard/`
- Replace Twitter with TikTok: `https://www.tiktok.com/@maplekeymedia`

Since lucide-react does not include a TikTok icon, create a small inline SVG component for the TikTok icon within Footer.tsx (a simple path-based SVG, no external library).

Add `target="_blank"` and `rel="noopener noreferrer"` to all social link `<a>` tags.

## Files Summary

| File | Action |
|------|--------|
| `src/frontend/components/Hero.tsx` | Edit — remove white button, center red button, link to #pricing |
| `src/frontend/data/stats.ts` | Edit — replace all 4 stats with new data |
| `src/frontend/components/Footer.tsx` | Edit — rename Delivery Info, update social links, add TikTok SVG |
| `src/frontend/components/Contact.tsx` | Edit — add mailto behavior on form submit |
