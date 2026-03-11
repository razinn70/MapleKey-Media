import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-primary fill-primary' : 'text-muted-foreground/30'}`}
      />
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="bg-card border border-border rounded-lg p-8 shadow-card hover:shadow-elevated transition-shadow duration-300 flex flex-col">
    <Quote className="w-8 h-8 text-primary/20 mb-4 flex-shrink-0" />
    <blockquote className="text-foreground leading-relaxed mb-6 flex-1">
      "{testimonial.quote}"
    </blockquote>
    <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
      <div>
        <div className="font-semibold text-foreground">{testimonial.name}</div>
        <div className="text-sm text-muted-foreground">{testimonial.brokerage}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{testimonial.location}</div>
      </div>
      <StarRating rating={testimonial.rating} />
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Trusted by top-producing agents across southern Ontario to deliver results that sell.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
