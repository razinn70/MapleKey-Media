import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Terms of Service" description="MapleKey Media terms of service. Read about our service agreement, booking policies, and usage terms." canonical="/terms" />
      <Header />
      <main className="pt-24 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Button asChild variant="ghost" className="mb-8 gap-2 text-muted-foreground hover:text-foreground -ml-3">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>

          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Legal</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-12">Last updated: February 2026</p>

          <div className="prose prose-neutral max-w-none space-y-10 text-foreground">

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing maplekey.media or booking our services, you ("Client") agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services. MapleKey Media Inc. reserves the right to modify these terms at any time, with changes effective upon posting to this page.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">2. Services Provided</h2>
              <p className="text-muted-foreground leading-relaxed">
                MapleKey Media provides professional real estate media services including HDR photography, video tours, drone aerial photography, short-form social content, Meta advertising campaign management, and lead funnel setup. Specific deliverables for each engagement are defined in the applicable package or service agreement confirmed at the time of booking.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">3. Booking & Payment</h2>
              <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                <li>All bookings are subject to availability and confirmation by MapleKey Media.</li>
                <li>A booking confirmation email will be sent upon successful submission. This does not constitute a guaranteed reservation until confirmed by our team.</li>
                <li>Payment terms, including any deposit requirements, will be communicated at the time of confirmation. Full payment is due prior to or upon delivery of final assets unless otherwise agreed in writing.</li>
                <li>Prices displayed on the website are estimates. Final pricing may vary based on property size, location, and specific project requirements.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">4. Cancellation & Rescheduling</h2>
              <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                <li>Cancellations made more than 48 hours before the scheduled session will receive a full refund of any deposit paid.</li>
                <li>Cancellations made within 48 hours of the session may forfeit the deposit.</li>
                <li>Rescheduling requests must be made at least 24 hours in advance and are subject to availability.</li>
                <li>MapleKey Media reserves the right to reschedule sessions due to weather conditions (particularly for drone services) or unforeseen circumstances, with no penalty to the client.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">5. Intellectual Property & Usage Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                Upon receipt of full payment, the Client is granted a non-exclusive, non-transferable licence to use the delivered media content for marketing the specified property. MapleKey Media retains the copyright and may use the work in its portfolio, marketing materials, and social media. The Client may not resell, sublicense, or transfer the media to third parties without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">6. Client Responsibilities</h2>
              <ul className="space-y-3 text-muted-foreground list-disc pl-6">
                <li>The Client is responsible for ensuring the property is clean, staged, and accessible at the time of the scheduled session.</li>
                <li>The Client must obtain any necessary permissions for photography or drone flights on or near the property.</li>
                <li>For drone sessions, the Client confirms there are no airspace restrictions or HOA prohibitions on drone operations at the property location.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                MapleKey Media's total liability for any claim arising out of or related to our services shall not exceed the total amount paid by the Client for the specific service giving rise to the claim. We are not liable for indirect, incidental, or consequential damages, including lost listings, lost commissions, or reputational harm.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">8. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein. Any disputes shall be subject to the exclusive jurisdiction of the courts of Ontario.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">9. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms, contact us at:<br /><br />
                <strong className="text-foreground">MapleKey Media Inc.</strong><br />
                Kitchener-Waterloo Region, Ontario, Canada<br />
                Email: <a href="mailto:maplekeymedia@gmail.com" className="text-primary hover:underline">maplekeymedia@gmail.com</a>
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
