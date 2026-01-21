import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  'Fast 24-48 hour turnaround on all projects',
  'Professional editing and color correction included',
  'MLS-ready formats and optimized web delivery',
  'Easy online scheduling and ordering system',
  'Consistent quality across all media types',
  'Dedicated account manager for enterprise clients',
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">About MapleKey Media</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
              Your Trusted Partner in Real Estate Marketing
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Since 2015, MapleKey Media has been helping real estate professionals across Canada showcase properties with stunning visual content that drives results.
            </p>
            <p className="text-muted-foreground mb-8">
              Our team of professional photographers, videographers, and drone pilots are dedicated to delivering exceptional quality with industry-leading turnaround times. We understand that in real estate, time is money—that's why we prioritize efficiency without ever compromising on quality.
            </p>

            {/* Features List */}
            <ul className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="bg-gradient-red hover:opacity-90 text-primary-foreground font-semibold px-8">
              Learn More About Us
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-secondary rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-primary mb-2">10+</div>
              <div className="text-secondary-foreground font-medium">Years Experience</div>
            </div>
            <div className="bg-muted rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-foreground mb-2">50+</div>
              <div className="text-muted-foreground font-medium">Team Members</div>
            </div>
            <div className="bg-muted rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-foreground mb-2">12</div>
              <div className="text-muted-foreground font-medium">Cities Covered</div>
            </div>
            <div className="bg-secondary rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-primary mb-2">$5B+</div>
              <div className="text-secondary-foreground font-medium">Property Value Shot</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
