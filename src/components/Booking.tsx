import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, MapPin, Camera, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

const serviceOptions = [
  { value: 'hdr-photography', label: 'HDR Photography', price: 'From $249' },
  { value: 'video-tour', label: 'Video Tour', price: 'From $449' },
  { value: 'drone-aerial', label: 'Drone Aerial', price: 'From $349' },
  { value: '3d-virtual-tour', label: '3D Virtual Tour', price: 'From $399' },
  { value: 'floor-plans', label: 'Floor Plans', price: 'From $149' },
  { value: 'virtual-staging', label: 'Virtual Staging', price: 'From $49/room' },
];

const Booking = () => {
  const [service, setService] = useState('');
  const [date, setDate] = useState<Date>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = service && date && name.trim() && email.trim() && address.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
      toast({
        title: 'Session Booked!',
        description: `Your ${serviceOptions.find(s => s.value === service)?.label} session has been scheduled.`,
      });
    }, 1200);
  };

  const handleReset = () => {
    setService('');
    setDate(undefined);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setNotes('');
    setShowConfirmation(false);
  };

  return (
    <section id="booking" className="py-24 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Book a Session</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Schedule Your Photography Session
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose your service, pick a date, and we'll handle the rest. Professional results, guaranteed.
          </p>
        </div>

        {/* Booking Form */}
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Step 1: Service Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-full bg-gradient-red flex items-center justify-center text-sm font-bold text-primary-foreground">1</span>
                <h3 className="font-display text-xl font-bold">Select a Service</h3>
              </div>
              <RadioGroup value={service} onValueChange={setService} className="grid sm:grid-cols-2 gap-3">
                {serviceOptions.map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={opt.value}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border border-border/30 bg-card/5 p-4 cursor-pointer transition-all hover:border-primary/50',
                      service === opt.value && 'border-primary bg-primary/10'
                    )}
                  >
                    <RadioGroupItem value={opt.value} id={opt.value} />
                    <div className="flex-1">
                      <span className="font-semibold text-secondary-foreground">{opt.label}</span>
                      <span className="block text-xs text-muted-foreground">{opt.price}</span>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Step 2: Date */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-full bg-gradient-red flex items-center justify-center text-sm font-bold text-primary-foreground">2</span>
                <h3 className="font-display text-xl font-bold">Pick a Date</h3>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full sm:w-[300px] justify-start text-left font-normal bg-card/5 border-border/30 hover:border-primary/50 text-secondary-foreground',
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
            </div>

            {/* Step 3: Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-full bg-gradient-red flex items-center justify-center text-sm font-bold text-primary-foreground">3</span>
                <h3 className="font-display text-xl font-bold">Your Details</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="booking-name" className="text-secondary-foreground">Full Name *</Label>
                  <Input
                    id="booking-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    maxLength={100}
                    className="bg-card/5 border-border/30 text-secondary-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="booking-email" className="text-secondary-foreground">Email *</Label>
                  <Input
                    id="booking-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@realty.com"
                    maxLength={255}
                    className="bg-card/5 border-border/30 text-secondary-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="booking-phone" className="text-secondary-foreground">Phone</Label>
                  <Input
                    id="booking-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(416) 555-0100"
                    maxLength={20}
                    className="bg-card/5 border-border/30 text-secondary-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="booking-address" className="text-secondary-foreground">Property Address *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="booking-address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Main St, Toronto, ON"
                      maxLength={300}
                      className="pl-10 bg-card/5 border-border/30 text-secondary-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="booking-notes" className="text-secondary-foreground">Additional Notes</Label>
                <Textarea
                  id="booking-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requests, access codes, or details about the property..."
                  maxLength={1000}
                  rows={3}
                  className="bg-card/5 border-border/30 text-secondary-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              disabled={!isFormValid || isSubmitting}
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
                  Book Session
                </span>
              )}
            </Button>
          </form>
        </div>
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
              Your <strong>{serviceOptions.find(s => s.value === service)?.label}</strong> session at{' '}
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

export default Booking;
