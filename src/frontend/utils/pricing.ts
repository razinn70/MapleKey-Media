import type { AddOn } from '@/data/pricing';

export function calculateTotal(basePrice: number, selectedAddOns: AddOn[]): { base: number; addOnsTotal: number; total: number } {
  const addOnsTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
  return { base: basePrice, addOnsTotal, total: basePrice + addOnsTotal };
}
