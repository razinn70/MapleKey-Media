import { useState, useMemo } from 'react';
import { packages, addOns } from '@/data/pricing';
import { calculateTotal } from '@/utils/pricing';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PackageSelector from '@/components/pricing/PackageSelector';
import AddOnSelector from '@/components/pricing/AddOnSelector';
import PricingSummary from '@/components/pricing/PricingSummary';
import BookingForm from '@/components/pricing/BookingForm';

const PricingAndBooking = () => {
  const [selectedPackageId, setSelectedPackageId] = useState(packages[1].id);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  const selectedPackage = packages.find((p) => p.id === selectedPackageId)!;
  const selectedAddOns = addOns.filter((a) => selectedAddOnIds.includes(a.id));
  const { base, total } = useMemo(
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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Pricing & Booking</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Choose Your Package & Book Your Session
          </h2>
          <p className="text-lg text-muted-foreground">
            Select a package, customize with add-ons, and schedule your session — all in one place.
          </p>
        </div>

        <Tabs defaultValue="pricing" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
            <TabsTrigger value="pricing" className="text-sm font-semibold">Packages & Pricing</TabsTrigger>
            <TabsTrigger value="booking" className="text-sm font-semibold">Book Your Session</TabsTrigger>
          </TabsList>

          <TabsContent value="pricing">
            <PackageSelector selectedPackageId={selectedPackageId} onSelect={setSelectedPackageId} />
            <div className="grid lg:grid-cols-2 gap-8">
              <AddOnSelector selectedAddOnIds={selectedAddOnIds} onToggle={toggleAddOn} />
              <PricingSummary selectedPackage={selectedPackage} selectedAddOns={selectedAddOns} base={base} total={total} />
            </div>
          </TabsContent>

          <TabsContent value="booking">
            <BookingForm
              selectedPackage={selectedPackage}
              selectedAddOnIds={selectedAddOnIds}
              selectedAddOns={selectedAddOns}
              base={base}
              total={total}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default PricingAndBooking;
