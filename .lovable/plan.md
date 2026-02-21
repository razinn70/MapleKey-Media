

# Swap Stats Between Hero and About Sections

## What Changes

The hero section currently shows industry stats (95%, 51%, 76%, 70%+) and the About section shows company stats (500+, 48h, 12+, 98%). These need to be swapped.

## Plan

### 1. Update `src/frontend/data/stats.ts` (hero stats)

Restore to the original company metrics that the hero will display:

| Value | Label |
|-------|-------|
| 500+ | Properties Shot |
| 48h | Avg. Turnaround |
| 12+ | Cities Served |
| 98% | Client Satisfaction |

### 2. Update `src/frontend/components/About.tsx` (box grid)

Replace the hardcoded company stats in the 2x2 black/grey box grid with the industry stats:

| Value | Label |
|-------|-------|
| 95% | Homebuyers search online during the home buying process |
| 51% | Buyers find the home they purchase online |
| 76% | Buyers use a mobile device during their home search |
| 70%+ | Buyers say listing photos are the most important factor when viewing a property online |

Move these into a data array at the top of the file (or import from stats) to keep content out of JSX. The existing box styling (alternating `bg-secondary` / `bg-muted`, rounded corners, padding, text sizes) stays exactly as-is.

### Files Changed

| File | Action |
|------|--------|
| `src/frontend/data/stats.ts` | Edit -- restore original 4 company stats |
| `src/frontend/components/About.tsx` | Edit -- replace box grid content with industry stats from a data array |

No layout, spacing, or styling changes. Just a content swap.
