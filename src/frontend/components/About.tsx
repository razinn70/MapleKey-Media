import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const features = [
  '24–48 hour professional turnaround',
  'Platform-optimized short-form content',
  'Meta ad campaign setup & optimization',
  'MLS-ready formats & web delivery',
  'Structured lead capture & booking systems',
  'Consistent branding across all media',
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
              A Strategic Partner in Modern Real Estate Marketing
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              MapleKey Media partners with realtors and developers across southern Ontario to deliver high-impact visual content and growth-driven marketing systems that generate measurable results.
            </p>
            <p className="text-muted-foreground mb-8">
              We don't just capture properties — we build strategic campaigns. From short-form video and cinematic photography to Meta advertising and automated booking funnels, every project is designed to attract serious buyers, increase engagement, and accelerate sales. In real estate, time is money. That's why we combine creative precision with operational efficiency — ensuring fast turnaround, consistent quality, and marketing that performs.
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

            <Button size="lg" asChild className="bg-gradient-red hover:opacity-90 text-primary-foreground font-semibold px-8">
              <Link to="/learn-more">Learn More About Us</Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-secondary rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-secondary-foreground font-medium">Properties Shot</div>
            </div>
            <div className="bg-muted rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-foreground mb-2">48h</div>
              <div className="text-muted-foreground font-medium">Avg. Turnaround</div>
            </div>
            <div className="bg-muted rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-foreground mb-2">12+</div>
              <div className="text-muted-foreground font-medium">Cities Served</div>
            </div>
            <div className="bg-secondary rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-primary mb-2">98%</div>
              <div className="text-secondary-foreground font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
