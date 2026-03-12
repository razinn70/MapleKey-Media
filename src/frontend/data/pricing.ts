export interface Package {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  originalPrice?: number;
  discountLabel?: string;
  included: string[];
  stripePriceId: string;
}

export interface AddOn {
  id: string;
  label: string;
  price: number;
  stripePriceId: string;
}

export const packages: Package[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Essential media for single listings',
    basePrice: 187,
    originalPrice: 250,
    discountLabel: '25% OFF',
    included: ['Up to 25 HDR Photos', 'Basic Photo Editing', 'Same-Day Delivery', 'Web-Ready Formats'],
    stripePriceId: 'price_1T9uSAQS8CDhJNREIM9UWbhN',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Complete media package for serious agents',
    basePrice: 450,
    included: ['Up to 40 HDR Photos', 'Cinematic Video Tour', 'Drone Aerial Photography', 'Social Media Cuts', 'Branded Watermarks'],
    stripePriceId: 'price_1T9uSLQS8CDhJNRE7KdYhmys',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Full-service marketing for luxury listings',
    basePrice: 750,
    included: ['Unlimited HDR Photos', 'Cinematic Video Tour', 'Drone Aerial Photography', 'Short-Form Social Content', 'Custom Landing Page', 'Ad Consultation'],
    stripePriceId: 'price_1T9uSLQS8CDhJNREMA3dJT9O',
  },
];

export const addOns: AddOn[] = [
  { id: 'drone', label: 'Drone Aerial Add-On', price: 75, stripePriceId: 'price_1T9uSMQS8CDhJNREg1nZEEp9' },
  { id: 'twilight', label: 'Twilight Photography', price: 100, stripePriceId: 'price_1T9uSNQS8CDhJNREgBKJWRS1' },
  { id: 'walkthrough', label: 'Walkthrough Video', price: 75, stripePriceId: 'price_1T9uSOQS8CDhJNREkaaIqpMQ' },
  { id: 'ad-consultation', label: 'Ad Consultation', price: 200, stripePriceId: 'price_1T9uSPQS8CDhJNREAxTayQal' },
  { id: 'social-reels', label: 'Social Media Reel Package', price: 150, stripePriceId: 'price_1T9uSQQS8CDhJNREiTIlOl88' },
  { id: 'lead-funnel', label: 'Lead Funnel', price: 350, stripePriceId: 'price_1T9uSRQS8CDhJNREw8mnQ8Wt' },
];
