import { Camera, Video, Plane, Box, Image, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Camera,
    title: 'HDR Photography',
    description: 'Professional HDR photography that captures every detail with stunning clarity and color accuracy.',
    features: ['Interior & Exterior Shots', 'Twilight Photography', 'Same-Day Delivery'],
  },
  {
    icon: Video,
    title: 'Video Tours',
    description: 'Cinematic property walkthroughs that tell a story and engage potential buyers emotionally.',
    features: ['4K Ultra HD Quality', 'Licensed Music', 'Branded Videos'],
  },
  {
    icon: Plane,
    title: 'Drone Aerial',
    description: 'Breathtaking aerial perspectives that showcase properties and their surroundings beautifully.',
    features: ['FAA Certified Pilots', 'Neighborhood Context', 'Lot Size Display'],
  },
  {
    icon: Box,
    title: '3D Virtual Tours',
    description: 'Immersive Matterport tours that let buyers explore properties from anywhere in the world.',
    features: ['Interactive Floor Plans', '24/7 Open House', 'VR Compatible'],
  },
  {
    icon: Image,
    title: 'Floor Plans',
    description: 'Detailed 2D and 3D floor plans that help buyers understand space and layout instantly.',
    features: ['Accurate Measurements', 'Branded Options', 'Multiple Formats'],
  },
  {
    icon: Sparkles,
    title: 'Virtual Staging',
    description: 'Transform empty spaces into beautifully furnished rooms with photorealistic virtual staging.',
    features: ['Multiple Styles', 'Fast Turnaround', 'Unlimited Revisions'],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Complete Media Solutions for Real Estate
          </h2>
          <p className="text-lg text-muted-foreground">
            From stunning photography to immersive virtual tours, we provide everything you need to market properties effectively.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card rounded-lg p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg bg-gradient-red flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
