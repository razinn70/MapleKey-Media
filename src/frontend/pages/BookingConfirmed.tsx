import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { analytics } from '@/utils/analytics';

const BookingConfirmed = () => {
  const [searchParams] = useSearchParams();
  const packageName = searchParams.get('package') ?? 'Your';
  const address = searchParams.get('address') ?? '';
  const date = searchParams.get('date') ?? '';
  const email = searchParams.get('email') ?? '';
  const total = searchParams.get('total') ?? '';

  useEffect(() => {
    document.title = 'Booking Confirmed — MapleKey Media';
    analytics.bookingConfirmed({
      package_name: packageName,
      total_price: Number(total) || 0,
    });
  }, [packageName, total]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-fade-up">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Session Booked!
          </h1>
          <p className="text-lg text-muted-foreground mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Your <strong className="text-foreground">{packageName}</strong> session has been confirmed.
            {email && (
              <> We'll send a confirmation to <strong className="text-foreground">{email}</strong>.</>
            )}
          </p>

          {(address || date || total) && (
            <div className="bg-card border border-border rounded-lg p-8 mb-10 text-left animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="font-display text-lg font-bold text-foreground mb-4">Booking Details</h2>
              <div className="space-y-3">
                {date && (
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Date:</span>
                    <span className="text-foreground font-medium">{date}</span>
                  </div>
                )}
                {address && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Property:</span>
                    <span className="text-foreground font-medium">{address}</span>
                  </div>
                )}
                {total && (
                  <div className="flex items-center gap-3 text-sm">
                    <span className="h-4 w-4 text-primary flex-shrink-0 font-bold text-center">$</span>
                    <span className="text-muted-foreground">Total:</span>
                    <span className="text-foreground font-bold">${total}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-accent border border-primary/20 rounded-lg p-6 mb-10 text-left animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="font-display text-lg font-bold text-foreground mb-3">What Happens Next?</h3>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>You'll receive a confirmation email with your booking details.</li>
              <li>Our team will reach out 24 hours before your session to confirm access.</li>
              <li>Show up on session day — we'll handle the rest!</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <Button asChild className="bg-gradient-red hover:opacity-90 text-primary-foreground gap-2">
              <Link to="/#pricing">
                Book Another Session
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingConfirmed;
