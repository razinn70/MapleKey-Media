import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contactInfo } from '@/data/contact';
import { contactSchema } from '@/lib/validations';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side Zod validation
    const result = contactSchema.safeParse({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone || undefined,
      message: formData.message,
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
      // Check honeypot
      const form = e.currentTarget;
      const honeypot = (form.querySelector('[name="website"]') as HTMLInputElement)?.value;

      const { data, error } = await supabase.functions.invoke('submit-contact', {
        body: {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          message: formData.message.trim(),
          honeypot: honeypot || undefined,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({
        title: 'Message Sent!',
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });

      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error('Contact error:', err);
      toast({
        title: 'Failed to Send',
        description: err.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
              Ready to Elevate Your Listings?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Contact us today for a free consultation and quote. Our team is ready to help you create stunning visual content that sells.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Phone</div>
                  <a href={`tel:${contactInfo.phoneTel}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Email</div>
                  <a href={`mailto:${contactInfo.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Service Area</div>
                  <p className="text-muted-foreground">{contactInfo.serviceArea}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Hours</div>
                  <p className="text-muted-foreground">{contactInfo.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-lg p-8 shadow-elevated border border-border">
            <h3 className="font-display text-2xl font-bold text-foreground mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <Input name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                    First Name *
                  </label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="John"
                    maxLength={100}
                  />
                  {fieldErrors.firstName && <p className="text-sm text-destructive mt-1">{fieldErrors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                    Last Name *
                  </label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="Doe"
                    maxLength={100}
                  />
                  {fieldErrors.lastName && <p className="text-sm text-destructive mt-1">{fieldErrors.lastName}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="john@example.com"
                  maxLength={255}
                />
                {fieldErrors.email && <p className="text-sm text-destructive mt-1">{fieldErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 (519) 555-0000"
                  maxLength={20}
                />
                {fieldErrors.phone && <p className="text-sm text-destructive mt-1">{fieldErrors.phone}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  How Can We Help? *
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell us about your project..."
                  rows={4}
                  maxLength={2000}
                />
                {fieldErrors.message && <p className="text-sm text-destructive mt-1">{fieldErrors.message}</p>}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-gradient-red hover:opacity-90 text-primary-foreground font-semibold gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
