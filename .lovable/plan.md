

# MapleKey Media — Stats Update + Nav Fix

## Task 1: Replace Stats Content

Two locations use stats — the Hero section (from `data/stats.ts`) and the About section (hardcoded `industryStats` array). The user wants to update the stats that appear on the site.

The Hero stats (from `data/stats.ts`) are the ones currently showing "500+, 48h, 12+, 98%". The About section has the industry stats in the black/grey boxes.

### Changes

**File: `src/frontend/data/stats.ts`** — Replace all 4 entries:

| Value | Label |
|-------|-------|
| 73% | Homeowners are more likely to list with a realtor who uses video |
| 403% | More inquiries for listings with video |
| 100% | Client satisfaction |
| 24hr | Turnaround |

**File: `src/frontend/components/About.tsx`** — No changes needed. The About section keeps its existing industry stats (95%, 51%, 76%, 70%+) in the black/grey boxes.

The Hero section already renders from `data/stats.ts` via the `stats` import, so updating the data file is all that's needed.

---

## Task 2: Fix Top Nav Links Across All Pages

Currently, nav links use bare anchors like `#services`, `#pricing`, etc. These only work on the homepage. On other routes (e.g., `/learn-more`, `/gallery`), clicking them does nothing useful.

### Solution

Update `Header.tsx` to:
1. Change all nav `href` values to `/#services`, `/#pricing`, `/#portfolio`, `/#about`, `/#contact`
2. Add an `onClick` handler that uses `react-router-dom`'s `useNavigate` to:
   - If already on `/`, smooth-scroll to the section directly
   - If on another route, navigate to `/` first, then scroll after a short delay for DOM render
3. Apply the same fix to the "Get a Quote" CTA button (both desktop and mobile versions)
4. Close the mobile menu on click (already handled, just ensure it persists)

### Technical Detail

**File: `src/frontend/components/Header.tsx`**

- Import `useNavigate` and `useLocation` from `react-router-dom`
- Create a `handleNavClick` helper function:
  - Extracts the hash from the href
  - If `location.pathname === '/'`, calls `document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })`
  - Otherwise, calls `navigate('/')` then uses `setTimeout` (~100ms) to scroll after render
  - Calls `e.preventDefault()` to prevent default anchor behavior
- Apply this handler to all nav links and CTA buttons
- Update href values to `/#section` format for correct behavior if JS fails

---

## Files Summary

| File | Action |
|------|--------|
| `src/frontend/data/stats.ts` | Edit — replace 4 stats with new content |
| `src/frontend/components/Header.tsx` | Edit — add route-aware scroll navigation |

No new dependencies. No layout or styling changes.

