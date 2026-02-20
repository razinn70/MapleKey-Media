import { useState, useMemo } from 'react';
import { Check } from 'lucide-react';
import { packages, addOns } from '@/data/pricing';
import { calculateTotal } from '@/utils/pricing';
import { Checkbox } from '@/components/ui/checkbox';

const PricingCalculator = () => {
  const [selectedPackageId, setSelectedPackageId] = useState(packages[1].id);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  const selectedPackage = packages.find((p) => p.id === selectedPackageId)!;
  const selectedAddOns = addOns.filter((a) => selectedAddOnIds.includes(a.id));
  const { base, addOnsTotal, total } = useMemo(
    () => calculateTotal(selectedPackage.basePrice, selectedAddOns),
    [selectedPackage, selectedAddOns]
  );

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Transparent, Flexible Packages
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose a base package and add only what you need. Every project is different — your pricing should be too.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {packages.map((pkg) => {
            const isSelected = pkg.id === selectedPackageId;
            return (
              <button
                key={pkg.id}
                onClick={() => setSelectedPackageId(pkg.id)}
                className={`text-left rounded-lg p-8 border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-accent shadow-elevated'
                    : 'border-border bg-card hover:border-primary/40'
                }`}
              >
                <h3 className="font-display text-xl font-bold text-foreground">{pkg.name}</h3>
                <p className="text-muted-foreground text-sm mt-1 mb-4">{pkg.description}</p>
                <div className="text-3xl font-bold text-foreground mb-6">
                  ${pkg.basePrice}
                  <span className="text-sm font-normal text-muted-foreground"> / session</span>
                </div>
                <ul className="space-y-2">
                  {pkg.included.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {/* Add-ons + Total */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add-ons */}
          <div className="bg-card rounded-lg p-8 border border-border">
            <h3 className="font-display text-xl font-bold text-foreground mb-6">Enhance Your Package</h3>
            <div className="space-y-4">
              {addOns.map((addon) => (
                <label
                  key={addon.id}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedAddOnIds.includes(addon.id)}
                      onCheckedChange={() => toggleAddOn(addon.id)}
                    />
                    <span className="text-foreground group-hover:text-primary transition-colors">
                      {addon.label}
                    </span>
                  </div>
                  <span className="text-muted-foreground font-medium">+${addon.price}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Estimated Total */}
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
              Final pricing may vary based on property size and specific requirements. Contact us for a custom quote.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;
