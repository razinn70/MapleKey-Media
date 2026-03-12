import galleryKitchenModern2 from '@/assets/gallery-kitchen-modern-2.jpg';
import galleryLivingElegant from '@/assets/gallery-living-room-elegant.jpg';
import galleryDiningFormal from '@/assets/gallery-dining-formal.jpg';
import galleryLivingCoastal from '@/assets/gallery-living-coastal.jpg';
import galleryBedroomMaster from '@/assets/gallery-bedroom-master.jpg';
import galleryKitchenModern from '@/assets/gallery-kitchen-modern.jpg';
import galleryLivingWindow from '@/assets/gallery-living-window.jpg';
import galleryDiningNook from '@/assets/gallery-dining-nook.jpg';
import galleryKitchenWood from '@/assets/gallery-kitchen-wood.jpg';
import galleryEntryway from '@/assets/gallery-entryway.jpg';
import galleryStaircase from '@/assets/gallery-staircase.jpg';

export interface GalleryItem {
  id: string;
  src: string;
  videoSrc?: string;
  alt: string;
  title: string;
  description: string;
  category: 'Photography' | 'Video' | 'Drone' | 'Short-Form';
}

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    src: galleryKitchenModern2,
    alt: 'Modern White Kitchen with Patio Access',
    title: 'Modern Kitchen & Patio',
    description: 'A bright, contemporary kitchen featuring white shaker cabinetry, quartz countertops, and a stylish tile backsplash. The sliding patio door floods the space with natural light and connects indoor living to the private backyard.',
    category: 'Photography',
  },
  {
    id: '2',
    src: galleryLivingElegant,
    alt: 'Elegant Living Room with Tufted Sofas',
    title: 'Elegant Living Room',
    description: 'A sophisticated living space featuring classic tufted sofas, rich hardwood flooring, and curated décor. The round mirror and botanical accents create a warm, inviting atmosphere perfect for showcasing this home\'s timeless character.',
    category: 'Photography',
  },
  {
    id: '3',
    src: galleryDiningFormal,
    alt: 'Formal Dining Room with Crystal Chandelier',
    title: 'Grand Formal Dining',
    description: 'This stately dining room commands attention with its crystal chandelier, coffered ceiling, and elegant table setting. Dark hardwood floors contrast beautifully with the light walls, while the antique china cabinet adds heritage charm.',
    category: 'Photography',
  },
  {
    id: '4',
    src: galleryLivingCoastal,
    alt: 'Coastal-Themed Living Room',
    title: 'Coastal Living Room',
    description: 'A bright, airy living room styled with coastal accents — a serene ocean painting, soft green throw, and striped pillows bring beach-house warmth. Light hardwood floors and a vintage-inspired rug tie the look together effortlessly.',
    category: 'Photography',
  },
  {
    id: '5',
    src: galleryBedroomMaster,
    alt: 'Serene Master Bedroom',
    title: 'Serene Master Suite',
    description: 'This tranquil master bedroom features a plush tufted headboard, layered bedding in soft blues and greens, and symmetrical bedside lighting. Natural light floods through the window, highlighting the warm hardwood floors and creating a restful retreat.',
    category: 'Photography',
  },
  {
    id: '6',
    src: galleryKitchenModern,
    alt: 'Modern White Kitchen with Island',
    title: 'Contemporary White Kitchen',
    description: 'A sleek, modern kitchen showcasing crisp white cabinetry, a generous island with quartz countertops, and a neutral tile backsplash. Recessed lighting and clean lines create an open, minimalist feel ideal for today\'s buyers.',
    category: 'Photography',
  },
  {
    id: '7',
    src: galleryLivingWindow,
    alt: 'Sun-Filled Living Room',
    title: 'Sun-Drenched Living Space',
    description: 'Floor-to-ceiling windows flood this living room with natural light, perfectly capturing the spacious layout and cozy staging. The coastal artwork and coordinated textiles give this room a welcoming, move-in-ready feel.',
    category: 'Photography',
  },
  {
    id: '8',
    src: galleryDiningNook,
    alt: 'Modern Dining Nook',
    title: 'Intimate Dining Nook',
    description: 'A charming dining area tucked beside the staircase, featuring a glass-top table, modern velvet chairs, and an abstract floral painting illuminated by warm spotlights. Every detail is styled to make this space feel both functional and aspirational.',
    category: 'Photography',
  },
  {
    id: '9',
    src: galleryKitchenWood,
    alt: 'Warm Wood Kitchen',
    title: 'Classic Wood-Tone Kitchen',
    description: 'Rich cherry-wood cabinetry and a clean white counter create a warm, traditional kitchen. The subway tile backsplash adds texture, while the open sightline to the dining area highlights the home\'s connected floor plan.',
    category: 'Photography',
  },
  {
    id: '10',
    src: galleryEntryway,
    alt: 'Welcoming Home Entryway',
    title: 'Bright Entryway & Foyer',
    description: 'A clean, well-lit entryway with tile flooring and a solid wood staircase railing sets the tone for the entire home. Natural light pours through the front door, creating an inviting first impression for potential buyers.',
    category: 'Photography',
  },
  {
    id: '11',
    src: galleryStaircase,
    alt: 'Oak Staircase Detail',
    title: 'Architectural Staircase',
    description: 'Shot from above, this dramatic angle captures the craftsmanship of the solid oak banister and newel post. The overhead perspective and natural light emphasize the home\'s quality construction and architectural detail.',
    category: 'Photography',
  },
];

export const galleryCategories = ['All', 'Photography'] as const;
