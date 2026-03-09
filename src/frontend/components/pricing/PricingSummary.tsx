import type { Package, AddOn } from '@/data/pricing';

interface PricingSummaryProps {
  selectedPackage: Package;
  selectedAddOns: AddOn[];
  base: number;
  total: number;
}

const PricingSummary = ({ selectedPackage, selectedAddOns, base, total }: PricingSummaryProps) => (
  <div className="bg-secondary rounded-lg p-8 text-secondary-foreground flex flex-col justify-center">
    <h3 className="font-display text-xl font-bold mb-6">Estimated Total</h3>
    <div className="space-y-3 mb-6">
      <div className="flex justify-between text-secondary-foreground/70">
        <span>{selectedPackage.name} Package</span>
        <span>${base}</span>
      </div>
      {selectedAddOns.map((addon) => (
        <div key={addon.id} className="flex justify-between text-secondary-foreground/70">
          <span>{addon.label}</span>
          <span>+${addon.price}</span>
        </div>
      ))}
      <div className="border-t border-secondary-foreground/20 pt-3 flex justify-between text-2xl font-bold">
        <span>Total</span>
        <span>${total}</span>
      </div>
    </div>
    <p className="text-secondary-foreground/50 text-sm">
      Final pricing may vary based on property size and specific requirements.
    </p>
  </div>
);

export default PricingSummary;
