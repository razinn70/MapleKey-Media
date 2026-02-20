

# Combine Pricing + Booking Into One Unified Section

## Overview

Merge the separate "Pricing" and "Book Now" sections into a single tabbed section. Users pick their package and add-ons, then switch to a booking tab to schedule -- with their pricing selection carried through. This creates a smoother flow: **configure your package, then book it**.

## How It Works

The combined section will use **shadcn Tabs** (already installed via `@radix-ui/react-tabs`) with two tabs:

1. **"Pricing" tab** -- The existing package cards, add-on checkboxes, and estimated total
2. **"Book Now" tab** -- The existing booking form (date picker, contact details, submit)

The selected package and add-ons from the Pricing tab carry over into the Booking tab, so the user sees their selection summary while filling out the form. The booking form's "Step 1: Select a Service" radio group is removed since the package is already chosen.

## Technical Plan

### 1. Create a new combined component: `PricingAndBooking.tsx`

- Single `<section id="pricing">` with a shared header
- Uses shadcn `Tabs` with two triggers: "Packages & Pricing" and "Book Your Session"
- Shared state: `selectedPackageId`, `selectedAddOnIds` lifted to this component
- Passes pricing state down to both tab contents
- The Booking tab shows a summary card of the selected package + add-ons + total at the top, then the date/details form below

### 2. Refactor existing components into sub-components

- Extract pricing content (package cards, add-ons, total) into an inline section within the Pricing tab
- Extract booking form (date, details, submit) into the Book Now tab -- remove the redundant service selection step
- Keep the confirmation dialog

### 3. Update navigation

- **Header**: Merge "Pricing" and "Book Now" into a single "Pricing" nav link pointing to `#pricing`
- **Footer**: Update any "Book Now" links to point to `#pricing`
- Remove the separate `#booking` anchor

### 4. Update Index.tsx

- Remove the separate `<Booking />` and `<PricingCalculator />` imports
- Replace with single `<PricingAndBooking />`

### 5. Delete old files

- `src/frontend/components/PricingCalculator.tsx`
- `src/frontend/components/Booking.tsx`

## Section Layout

```text
+--------------------------------------------------+
|  PRICING & BOOKING                                |
|  "Choose Your Package & Book Your Session"        |
|                                                   |
|  [ Packages & Pricing ]  [ Book Your Session ]    |
|  ------------------------------------------------ |
|                                                   |
|  (Tab 1: Package cards, add-ons, total)           |
|  (Tab 2: Summary card + date/details/submit)      |
+--------------------------------------------------+
```

## Files Changed

| File | Action |
|------|--------|
| `src/frontend/components/PricingAndBooking.tsx` | Create -- combined tabbed component |
| `src/frontend/components/PricingCalculator.tsx` | Delete |
| `src/frontend/components/Booking.tsx` | Delete |
| `src/frontend/pages/Index.tsx` | Update -- swap imports |
| `src/frontend/components/Header.tsx` | Update -- remove "Book Now" nav link |
| `src/frontend/components/Footer.tsx` | Update -- adjust links |

