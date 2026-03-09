import { Check } from 'lucide-react';
import { packages, type Package } from '@/data/pricing';

interface PackageSelectorProps {
  selectedPackageId: string;
  onSelect: (id: string) => void;
}

const PackageSelector = ({ selectedPackageId, onSelect }: PackageSelectorProps) => (
  <div className="grid md:grid-cols-3 gap-6 mb-12">
    {packages.map((pkg) => {
      const isSelected = pkg.id === selectedPackageId;
      return (
        <button
          key={pkg.id}
          onClick={() => onSelect(pkg.id)}
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
);

export default PackageSelector;
