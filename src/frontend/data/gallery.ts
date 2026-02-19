import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: 'Photography' | 'Video' | 'Drone' | 'Short-Form';
}

export const galleryItems: GalleryItem[] = [
  { id: '1', src: portfolio1, alt: 'Penthouse Living Room', title: 'Penthouse Living Room', category: 'Photography' },
  { id: '2', src: portfolio2, alt: 'Modern Kitchen Design', title: 'Modern Kitchen Design', category: 'Photography' },
  { id: '3', src: portfolio3, alt: 'Luxury Estate Aerial', title: 'Luxury Estate Aerial', category: 'Drone' },
  { id: '4', src: portfolio1, alt: 'Downtown Condo Interior', title: 'Downtown Condo Interior', category: 'Photography' },
  { id: '5', src: portfolio2, alt: 'Waterfront Property Tour', title: 'Waterfront Property Tour', category: 'Video' },
  { id: '6', src: portfolio3, alt: 'Suburban Home Aerial', title: 'Suburban Home Aerial', category: 'Drone' },
  { id: '7', src: portfolio1, alt: 'Open Concept Loft', title: 'Open Concept Loft', category: 'Photography' },
  { id: '8', src: portfolio2, alt: 'Kitchen Renovation Reel', title: 'Kitchen Renovation Reel', category: 'Short-Form' },
  { id: '9', src: portfolio3, alt: 'Estate Grounds Flyover', title: 'Estate Grounds Flyover', category: 'Drone' },
  { id: '10', src: portfolio1, alt: 'Luxury Bathroom Suite', title: 'Luxury Bathroom Suite', category: 'Photography' },
  { id: '11', src: portfolio2, alt: 'Property Walkthrough', title: 'Property Walkthrough', category: 'Video' },
  { id: '12', src: portfolio3, alt: 'Rooftop Terrace Aerial', title: 'Rooftop Terrace Aerial', category: 'Drone' },
  { id: '13', src: portfolio1, alt: 'Master Bedroom Design', title: 'Master Bedroom Design', category: 'Photography' },
  { id: '14', src: portfolio2, alt: 'Before & After Reel', title: 'Before & After Reel', category: 'Short-Form' },
  { id: '15', src: portfolio3, alt: 'Lakeside Villa Aerial', title: 'Lakeside Villa Aerial', category: 'Drone' },
  { id: '16', src: portfolio1, alt: 'Home Office Staging', title: 'Home Office Staging', category: 'Photography' },
  { id: '17', src: portfolio2, alt: 'Neighbourhood Tour Video', title: 'Neighbourhood Tour Video', category: 'Video' },
  { id: '18', src: portfolio3, alt: 'Commercial Lot Drone Shot', title: 'Commercial Lot Drone Shot', category: 'Drone' },
  { id: '19', src: portfolio1, alt: 'Dining Room Elegance', title: 'Dining Room Elegance', category: 'Photography' },
  { id: '20', src: portfolio2, alt: 'Listing Highlight Reel', title: 'Listing Highlight Reel', category: 'Short-Form' },
  { id: '21', src: portfolio3, alt: 'Countryside Estate Aerial', title: 'Countryside Estate Aerial', category: 'Drone' },
  { id: '22', src: portfolio1, alt: 'Minimalist Living Space', title: 'Minimalist Living Space', category: 'Photography' },
  { id: '23', src: portfolio2, alt: 'Virtual Open House', title: 'Virtual Open House', category: 'Video' },
  { id: '24', src: portfolio3, alt: 'Golf Course Property Aerial', title: 'Golf Course Property Aerial', category: 'Drone' },
];

export const galleryCategories = ['All', 'Photography', 'Video', 'Drone', 'Short-Form'] as const;
