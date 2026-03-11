export interface Testimonial {
  id: string;
  name: string;
  brokerage: string;
  quote: string;
  rating: number;
  location: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    brokerage: 'RE/MAX Hallmark',
    quote: 'MapleKey Media completely transformed how I market my listings. The HDR photography and drone shots helped me sell a property in just 3 days — above asking price. My clients are blown away every time.',
    rating: 5,
    location: 'Kitchener, ON',
  },
  {
    id: '2',
    name: 'David Chen',
    brokerage: 'Royal LePage',
    quote: 'The short-form video content they produce is incredible. My Instagram engagement went up 300% in the first month. They understand what gets attention in today\'s market.',
    rating: 5,
    location: 'Waterloo, ON',
  },
  {
    id: '3',
    name: 'Jessica Patel',
    brokerage: 'Century 21',
    quote: 'I\'ve worked with other photographers before, but MapleKey is on another level. The turnaround is lightning fast, the quality is consistently premium, and their Meta ad campaigns actually generate leads.',
    rating: 5,
    location: 'Cambridge, ON',
  },
  {
    id: '4',
    name: 'Michael Torres',
    brokerage: 'Keller Williams',
    quote: 'From the first consultation to final delivery, the MapleKey team was professional and detail-oriented. Their video tours have become a key differentiator for my luxury listings.',
    rating: 5,
    location: 'Guelph, ON',
  },
  {
    id: '5',
    name: 'Amanda Brooks',
    brokerage: 'Sotheby\'s International Realty',
    quote: 'The lead funnel system MapleKey built for me generates 15–20 qualified inquiries per month. It\'s completely changed my business. I can\'t recommend them enough.',
    rating: 5,
    location: 'Hamilton, ON',
  },
  {
    id: '6',
    name: 'Ryan Kowalski',
    brokerage: 'Coldwell Banker',
    quote: 'Every listing I hand to MapleKey comes back looking like a magazine spread. The twilight photography alone has helped me win multiple listing presentations over the competition.',
    rating: 5,
    location: 'Brantford, ON',
  },
];
