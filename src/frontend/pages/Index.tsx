import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import PricingAndBooking from '@/components/PricingAndBooking';
import Portfolio from '@/components/Portfolio';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <ErrorBoundary section="hero">
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary section="services">
          <Services />
        </ErrorBoundary>
        <ErrorBoundary section="pricing">
          <PricingAndBooking />
        </ErrorBoundary>
        <ErrorBoundary section="portfolio">
          <Portfolio />
        </ErrorBoundary>
        <ErrorBoundary section="before-after">
          <BeforeAfterSlider />
        </ErrorBoundary>
        <ErrorBoundary section="testimonials">
          <Testimonials />
        </ErrorBoundary>
        <ErrorBoundary section="about">
          <About />
        </ErrorBoundary>
        <ErrorBoundary section="contact">
          <Contact />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
