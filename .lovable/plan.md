

# MapleKey Media — Logo, Pricing & Add-Ons Update

## Task 1: Replace Logo Asset

Copy the uploaded logo (`user-uploads://Untitled_design-2.jpg`) to `src/frontend/assets/logo.png` (overwriting the existing file).

Both `Header.tsx` and `Footer.tsx` already import from `@/assets/logo.png`, so no code changes are needed -- the new logo will appear automatically in both locations.

Also copy to `public/logo.png` to keep the public asset in sync.

## Task 2: Package Pricing Updates

**File: `src/frontend/data/pricing.ts`**

Update the three packages:

| Current | New |
|---------|-----|
| Starter / $299 | Standard / $200 |
| Professional / $599 | Professional / $450 |
| Premium / $999 | Premium / $750 |

Update the `id` for Starter from `'starter'` to `'standard'` and name from `'Starter'` to `'Standard'`.

The `PricingAndBooking.tsx` component defaults to `packages[1].id` and renders dynamically from the data, so pricing cards, summary, and booking total will all update automatically.

## Task 3: Premium Package Content Change

In the Premium package `included` array:
- Remove `'Twilight Photography'`
- Add `'Ad Consultation'`

## Task 4: Add-Ons Pricing & Item Changes

Replace the entire `addOns` array with:

| ID | Label | Price |
|----|-------|-------|
| drone | Drone Aerial Add-On | $75 |
| twilight | Twilight Photography | $100 |
| walkthrough | Walkthrough Video | $75 |
| ad-consultation | Ad Consultation | $200 |
| social-reels | Social Media Reel Package | $150 |
| lead-funnel | Lead Funnel | $350 |

Removed: Floor Plan, Virtual Staging, Meta Ads Campaign Setup.

## Task 5: Architecture

All changes are in `src/frontend/data/pricing.ts`. The UI components (`PricingAndBooking.tsx`) and utility (`utils/pricing.ts`) already consume this data file as a single source of truth. No structural changes needed.

## Files Summary

| File | Action |
|------|--------|
| `src/frontend/assets/logo.png` | Replace with uploaded logo |
| `public/logo.png` | Replace with uploaded logo |
| `src/frontend/data/pricing.ts` | Edit -- update packages (names, prices, features) and add-ons |

