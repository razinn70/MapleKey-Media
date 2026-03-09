import { addOns } from '@/data/pricing';
import { Checkbox } from '@/components/ui/checkbox';

interface AddOnSelectorProps {
  selectedAddOnIds: string[];
  onToggle: (id: string) => void;
}

const AddOnSelector = ({ selectedAddOnIds, onToggle }: AddOnSelectorProps) => (
  <div className="bg-card rounded-lg p-8 border border-border">
    <h3 className="font-display text-xl font-bold text-foreground mb-6">Enhance Your Package</h3>
    <div className="space-y-4">
      {addOns.map((addon) => (
        <label key={addon.id} className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={selectedAddOnIds.includes(addon.id)}
              onCheckedChange={() => onToggle(addon.id)}
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
);

export default AddOnSelector;
