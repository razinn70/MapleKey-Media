import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { galleryItems } from '@/data/gallery';
import GalleryGrid from '@/components/GalleryGrid';

const Portfolio = () => {
  const previewItems = galleryItems.slice(0, 6);

  return (
    <section id="portfolio" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Portfolio</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-foreground mt-3">
              Our Recent Work
            </h2>
          </div>
          <Button asChild variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 gap-2 self-start md:self-auto">
            <Link to="/gallery">
              View All Projects
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Gallery Grid */}
        <GalleryGrid items={previewItems} columns={3} />

        {/* See More */}
        <div className="flex justify-center mt-12">
          <Button asChild className="bg-gradient-red hover:opacity-90 text-primary-foreground gap-2 px-8">
            <Link to="/gallery">
              See more
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 pt-16 border-t border-secondary-foreground/10">
          <p className="text-center text-secondary-foreground/60 text-sm uppercase tracking-wider mb-8">Trusted by Leading Real Estate Brands</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
            {['RE/MAX', 'CENTURY 21', 'Royal LePage', 'Keller Williams', 'Sotheby\'s'].map((brand) => (
              <span key={brand} className="text-xl font-bold text-secondary-foreground">{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
