import { Camera, Video, Plane, Box, Film, Target, CalendarCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
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
    icon: Film,
    title: 'Short-Form Video Content',
    description: 'Scroll-stopping Reels, Shorts, and TikToks designed to drive engagement and generate leads on social media.',
    features: ['Platform-Optimized Formats', 'Trending Audio & Hooks', 'Caption & Hashtag Strategy'],
  },
  {
    icon: Target,
    title: 'Meta Ads & Paid Growth',
    description: 'Targeted Facebook and Instagram ad campaigns that put your listings in front of qualified buyers.',
    features: ['Custom Audience Targeting', 'A/B Creative Testing', 'Monthly Performance Reports'],
  },
  {
    icon: CalendarCheck,
    title: 'Lead Funnel & Booking Systems',
    description: 'Automated lead capture funnels and booking systems that convert website visitors into booked appointments.',
    features: ['Landing Page Design', 'CRM Integration', 'Automated Follow-Ups'],
  },
];
