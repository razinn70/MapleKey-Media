import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';

const portfolioItems = [
  {
    image: portfolio1,
    title: 'Penthouse Living Room',
    category: 'Interior Photography',
    location: 'Toronto, ON',
  },
  {
    image: portfolio2,
    title: 'Modern Kitchen Design',
    category: 'Interior Photography',
    location: 'Vancouver, BC',
  },
  {
    image: portfolio3,
    title: 'Luxury Estate Aerial',
    category: 'Drone Photography',
    location: 'Oakville, ON',
  },
];

const Portfolio = () => {
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
          <Button variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 gap-2 self-start md:self-auto">
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-primary text-sm font-medium">{item.category}</span>
                  <h3 className="font-display text-xl font-bold text-secondary-foreground mt-1">{item.title}</h3>
                  <p className="text-secondary-foreground/70 text-sm mt-1">{item.location}</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-75">
                <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          ))}
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
