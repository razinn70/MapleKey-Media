import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
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
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-12">Last updated: February 2026</p>

          <div className="prose prose-neutral max-w-none space-y-10 text-foreground">

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">1. Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed">
                MapleKey Media Inc. ("MapleKey Media", "we", "us", or "our") is a real estate media and marketing company operating in southern Ontario, Canada. We are committed to protecting the privacy of our clients, website visitors, and prospective customers. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit <strong>maplekey.media</strong> or engage our services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We may collect the following types of information:</p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                <li><strong className="text-foreground">Contact Information:</strong> Name, email address, phone number, and property address submitted through our booking and contact forms.</li>
                <li><strong className="text-foreground">Booking Details:</strong> Selected service packages, preferred session dates, and any notes about your property.</li>
                <li><strong className="text-foreground">Usage Data:</strong> Pages visited, time on site, referring URLs, and browser type collected automatically via analytics tools.</li>
                <li><strong className="text-foreground">Communications:</strong> Records of messages or inquiries you send to us.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use collected information to:</p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                <li>Confirm and manage your bookings and deliver our services.</li>
                <li>Send email confirmations, reminders, and delivery notifications.</li>
                <li>Respond to inquiries and provide customer support.</li>
                <li>Improve our website, services, and marketing materials.</li>
                <li>Send occasional promotional communications (with your consent and with an easy opt-out).</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">4. How We Share Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, rent, or trade your personal information. We may share your data with trusted third-party service providers (e.g., email delivery services, scheduling platforms, cloud storage) solely to operate our business and fulfill our services. These providers are contractually bound to protect your information. We may also disclose information when required by law.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">5. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes described in this policy, maintain our business records, and comply with legal requirements. Booking records are typically retained for 3 years. You may request deletion of your data at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">6. Cookies & Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may use cookies and similar tracking technologies to enhance your experience and analyze site traffic. Analytics tools such as Google Analytics 4 may collect anonymized usage data. You can control cookie preferences through your browser settings. By continuing to use our site, you consent to our use of cookies in accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">7. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Under Canada's Personal Information Protection and Electronic Documents Act (PIPEDA), you have the right to:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                <li>Access the personal information we hold about you.</li>
                <li>Request correction of inaccurate data.</li>
                <li>Request deletion of your data (subject to legal retention requirements).</li>
                <li>Withdraw consent for marketing communications at any time.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise these rights, contact us at <a href="mailto:info@maplekey.media" className="text-primary hover:underline">info@maplekey.media</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">8. Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">9. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions or concerns about this Privacy Policy, please contact:<br /><br />
                <strong className="text-foreground">MapleKey Media Inc.</strong><br />
                Kitchener-Waterloo Region, Ontario, Canada<br />
                Email: <a href="mailto:info@maplekey.media" className="text-primary hover:underline">info@maplekey.media</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
