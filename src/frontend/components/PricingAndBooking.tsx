import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, MapPin, Camera, CheckCircle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { packages, addOns } from '@/data/pricing';
import { calculateTotal } from '@/utils/pricing';
import { bookingSchema } from '@/lib/validations';
import { supabase } from '../../integrations/supabase/client';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const PricingAndBooking = () => {
  // Shared pricing state
  const [selectedPackageId, setSelectedPackageId] = useState(packages[1].id);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  // Booking form state
  const [date, setDate] = useState<Date>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side Zod validation
    const result = bookingSchema.safeParse({
      client_name: name,
      client_email: email,
      client_phone: phone || undefined,
      property_address: address,
      notes: notes || undefined,
      session_date: date,
    });

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        errors[field] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const idempotencyKey = `${email}-${date?.toISOString()}-${selectedPackageId}-${Date.now()}`;

      const { data, error } = await supabase.functions.invoke('submit-booking', {
        body: {
          idempotency_key: idempotencyKey,
          package_id: selectedPackageId,
          package_name: selectedPackage.name,
          base_price: base,
          add_on_ids: selectedAddOnIds,
          total_price: total,
          session_date: date?.toISOString().split('T')[0],
          client_name: name.trim(),
          client_email: email.trim(),
          client_phone: phone.trim() || null,
          property_address: address.trim(),
          notes: notes.trim() || null,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setShowConfirmation(true);
      toast({
        title: 'Session Booked!',
        description: `Your ${selectedPackage.name} session has been scheduled.`,
      });
    } catch (err: any) {
      console.error('Booking error:', err);
      toast({
        title: 'Booking Failed',
        description: err.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setDate(undefined);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setNotes('');
    setFieldErrors({});
    setShowConfirmation(false);
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

        {/* Tabs */}
        <Tabs defaultValue="pricing" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
            <TabsTrigger value="pricing" className="text-sm font-semibold">Packages & Pricing</TabsTrigger>
            <TabsTrigger value="booking" className="text-sm font-semibold">Book Your Session</TabsTrigger>
          </TabsList>

          {/* ── Tab 1: Pricing ── */}
          <TabsContent value="pricing">
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
              <div className="bg-card rounded-lg p-8 border border-border">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">Enhance Your Package</h3>
                <div className="space-y-4">
                  {addOns.map((addon) => (
                    <label key={addon.id} className="flex items-center justify-between cursor-pointer group">
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
            </div>
          </TabsContent>

          {/* ── Tab 2: Booking ── */}
          <TabsContent value="booking">
            {/* Selection Summary */}
            <div className="bg-accent border border-primary/20 rounded-lg p-6 mb-8">
              <h3 className="font-display text-lg font-bold text-foreground mb-3">Your Selection</h3>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <span className="text-foreground font-medium">{selectedPackage.name} — ${base}</span>
                {selectedAddOns.length > 0 && (
                  <span className="text-muted-foreground">
                    + {selectedAddOns.map((a) => a.label).join(', ')}
                  </span>
                )}
                <span className="text-primary font-bold ml-auto text-lg">Total: ${total}</span>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Honeypot - hidden from users, catches bots */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <Input name="website" tabIndex={-1} autoComplete="off" />
              </div>

              {/* Date */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 rounded-full bg-gradient-red flex items-center justify-center text-sm font-bold text-primary-foreground">1</span>
                  <h3 className="font-display text-xl font-bold text-foreground">Pick a Date</h3>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full sm:w-[300px] justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : 'Select a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date() || d.getDay() === 0}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                {fieldErrors.session_date && (
                  <p className="text-sm text-destructive">{fieldErrors.session_date}</p>
                )}
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 rounded-full bg-gradient-red flex items-center justify-center text-sm font-bold text-primary-foreground">2</span>
                  <h3 className="font-display text-xl font-bold text-foreground">Your Details</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="booking-name">Full Name *</Label>
                    <Input id="booking-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" maxLength={100} />
                    {fieldErrors.client_name && <p className="text-sm text-destructive">{fieldErrors.client_name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="booking-email">Email *</Label>
                    <Input id="booking-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@realty.com" maxLength={255} />
                    {fieldErrors.client_email && <p className="text-sm text-destructive">{fieldErrors.client_email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="booking-phone">Phone</Label>
                    <Input id="booking-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(519) 555-0100" maxLength={20} />
                    {fieldErrors.client_phone && <p className="text-sm text-destructive">{fieldErrors.client_phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="booking-address">Property Address *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="booking-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, Kitchener, ON" maxLength={300} className="pl-10" />
                    </div>
                    {fieldErrors.property_address && <p className="text-sm text-destructive">{fieldErrors.property_address}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="booking-notes">Additional Notes</Label>
                  <Textarea id="booking-notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special requests, access codes, or details about the property..." maxLength={1000} rows={3} />
                  {fieldErrors.notes && <p className="text-sm text-destructive">{fieldErrors.notes}</p>}
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-gradient-red hover:opacity-90 text-primary-foreground font-semibold px-10"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Booking...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Book Session — ${total}
                  </span>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <DialogTitle className="text-center font-display text-2xl">Session Booked!</DialogTitle>
            <DialogDescription className="text-center">
              Your <strong>{selectedPackage.name}</strong> session at{' '}
              <strong>{address}</strong> on <strong>{date ? format(date, 'PPP') : ''}</strong> has been confirmed.
              We'll send a confirmation email to <strong>{email}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-2">
            <Button onClick={handleReset} className="bg-gradient-red text-primary-foreground">
              Book Another Session
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PricingAndBooking;
