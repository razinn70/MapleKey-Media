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
    id: 'starter',
    name: 'Starter',
    description: 'Essential media for single listings',
    basePrice: 299,
    included: ['Up to 25 HDR Photos', 'Basic Photo Editing', 'Same-Day Delivery', 'Web-Ready Formats'],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Complete media package for serious agents',
    basePrice: 599,
    included: ['Up to 40 HDR Photos', 'Cinematic Video Tour', 'Drone Aerial Photography', 'Social Media Cuts', 'Branded Watermarks'],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Full-service marketing for luxury listings',
    basePrice: 999,
    included: ['Unlimited HDR Photos', 'Cinematic Video Tour', 'Drone Aerial Photography', 'Short-Form Social Content', 'Custom Landing Page', 'Twilight Photography'],
  },
];

export const addOns: AddOn[] = [
  { id: 'drone', label: 'Drone Aerial Add-On', price: 150 },
  { id: 'twilight', label: 'Twilight Photography', price: 125 },
  { id: 'floorplan', label: '2D/3D Floor Plan', price: 100 },
  { id: 'virtual-staging', label: 'Virtual Staging (per room)', price: 75 },
  { id: 'social-reels', label: 'Social Media Reels Package', price: 200 },
  { id: 'meta-ads', label: 'Meta Ads Campaign Setup', price: 350 },
];
