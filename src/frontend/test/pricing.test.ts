import { describe, it, expect } from 'vitest';
import { calculateTotal } from '@/utils/pricing';
import type { AddOn } from '@/data/pricing';

describe('calculateTotal', () => {
  it('returns base price with no add-ons', () => {
    const result = calculateTotal(200, []);
    expect(result).toEqual({ base: 200, addOnsTotal: 0, total: 200 });
  });

  it('sums add-ons correctly', () => {
    const addOns: AddOn[] = [
      { id: 'a', label: 'Drone', price: 75, stripePriceId: 'price_test1' },
      { id: 'b', label: 'Twilight', price: 100, stripePriceId: 'price_test2' },
    ];
    const result = calculateTotal(450, addOns);
    expect(result).toEqual({ base: 450, addOnsTotal: 175, total: 625 });
  });

  it('handles single add-on', () => {
    const addOns: AddOn[] = [{ id: 'x', label: 'Reel', price: 150, stripePriceId: 'price_test3' }];
    const result = calculateTotal(750, addOns);
    expect(result.total).toBe(900);
  });

  it('handles zero base price', () => {
    const result = calculateTotal(0, [{ id: 'a', label: 'Test', price: 50 }]);
    expect(result.total).toBe(50);
  });
});
