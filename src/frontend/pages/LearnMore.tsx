import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/data/faqs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-24">
        {/* Hero-style intro */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8 gap-2 text-muted-foreground hover:text-foreground -ml-3">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">About MapleKey Media</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-3 mb-6">
              A Strategic Partner in Modern Real Estate Marketing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              We combine high-impact media, paid advertising, and structured marketing systems to help real estate professionals generate measurable results.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-secondary/40">
          <div className="container mx-auto px-6 max-w-4xl">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Frequently Asked Questions</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-12">
              Everything You Need to Know
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-background rounded-lg border border-border px-6"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Block */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Elevate Your Marketing?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Book a strategy call today and let's build a system that drives real results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="bg-gradient-red hover:opacity-90 text-primary-foreground font-semibold px-8 py-6 text-lg">
                <Link to="/#pricing">Book a Strategy Call</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="font-semibold px-8 py-6 text-lg">
                <Link to="/gallery">View Our Work</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LearnMore;
