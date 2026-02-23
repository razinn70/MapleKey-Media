export interface Package {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  included: string[];
}

export interface AddOn {
  id: string;
  label: string;
  price: number;
}

export const packages: Package[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Essential media for single listings',
    basePrice: 200,
    included: ['Up to 25 HDR Photos', 'Basic Photo Editing', 'Same-Day Delivery', 'Web-Ready Formats'],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Complete media package for serious agents',
    basePrice: 450,
    included: ['Up to 40 HDR Photos', 'Cinematic Video Tour', 'Drone Aerial Photography', 'Social Media Cuts', 'Branded Watermarks'],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Full-service marketing for luxury listings',
    basePrice: 750,
    included: ['Unlimited HDR Photos', 'Cinematic Video Tour', 'Drone Aerial Photography', 'Short-Form Social Content', 'Custom Landing Page', 'Ad Consultation'],
  },
];

export const addOns: AddOn[] = [
  { id: 'drone', label: 'Drone Aerial Add-On', price: 75 },
  { id: 'twilight', label: 'Twilight Photography', price: 100 },
  { id: 'walkthrough', label: 'Walkthrough Video', price: 75 },
  { id: 'ad-consultation', label: 'Ad Consultation', price: 200 },
  { id: 'social-reels', label: 'Social Media Reel Package', price: 150 },
  { id: 'lead-funnel', label: 'Lead Funnel', price: 350 },
];
