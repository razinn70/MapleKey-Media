import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { CalendarIcon, MapPin, Camera, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { bookingSchema } from '@/lib/validations';
import { supabase } from '@integrations/supabase/client';
import type { Package, AddOn } from '@/data/pricing';
import { addOns as allAddOns } from '@/data/pricing';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarPicker } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';
import { analytics } from '@/utils/analytics';

interface BookingFormProps {
  selectedPackage: Package;
  selectedAddOnIds: string[];
  selectedAddOns: AddOn[];
  base: number;
  total: number;
}

const BookingForm = ({ selectedPackage, selectedAddOnIds, selectedAddOns, base, total }: BookingFormProps) => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
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
      return false;
    }

    setFieldErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const idempotencyKey = `${email}-${date?.toISOString()}-${selectedPackage.id}-${Date.now()}`;

      const { data, error } = await supabase.functions.invoke('submit-booking', {
        body: {
          idempotency_key: idempotencyKey,
          package_id: selectedPackage.id,
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

      analytics.bookingSubmitted({
        package_name: selectedPackage.name,
        total_price: total,
        add_on_count: selectedAddOnIds.length,
      });

      toast({
        title: 'Session Booked!',
        description: `Your ${selectedPackage.name} session has been scheduled.`,
      });

      const params = new URLSearchParams({
        package: selectedPackage.name,
        address: address.trim(),
        date: date ? format(date, 'PPP') : '',
        email: email.trim(),
        total: String(total),
      });
      navigate(`/booking/confirmed?${params.toString()}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      console.error('Booking error:', err);
      toast({
        title: 'Booking Failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayNow = async () => {
    if (!validateForm()) return;

    setIsCheckingOut(true);

    try {
      const idempotencyKey = `${email}-${date?.toISOString()}-${selectedPackage.id}-${Date.now()}`;

      await supabase.functions.invoke('submit-booking', {
        body: {
          idempotency_key: idempotencyKey,
          package_id: selectedPackage.id,
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

      analytics.checkoutStarted({
        package_name: selectedPackage.name,
        total_price: total,
      });

      const addOnPriceIds = selectedAddOnIds
        .map((id) => allAddOns.find((a) => a.id === id)?.stripePriceId)
        .filter(Boolean);

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          packagePriceId: selectedPackage.stripePriceId,
          addOnPriceIds,
          customerEmail: email.trim(),
          customerName: name.trim(),
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      console.error('Checkout error:', err);
      toast({
        title: 'Checkout Failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
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
                className={cn('w-full sm:w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : 'Select a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarPicker
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date() || d.getDay() === 0}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          {fieldErrors.session_date && <p className="text-sm text-destructive">{fieldErrors.session_date}</p>}
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

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="button"
            size="lg"
            disabled={isCheckingOut}
            onClick={handlePayNow}
            className="w-full sm:w-auto bg-gradient-red hover:opacity-90 text-primary-foreground font-semibold px-10"
          >
            {isCheckingOut ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Pay Now — ${total}
              </span>
            )}
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto font-semibold px-10"
          >
            <a href="https://calendly.com/maplekeymedia" target="_blank" rel="noopener noreferrer">
              <span className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Schedule a Call
              </span>
            </a>
          </Button>
        </div>
      </form>
    </>
  );
};

export default BookingForm;
