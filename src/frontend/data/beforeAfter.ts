export interface BeforeAfterPair {
  id: string;
  title: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  /** Use placeholder images until real shoot photos are available */
  beforeSrc: string;
  afterSrc: string;
}

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: '1',
    title: 'Living Room Transformation',
    description: 'Professional HDR photography with proper lighting and composition turns an ordinary room into a showstopper.',
    beforeLabel: 'Standard Photo',
    afterLabel: 'MapleKey HDR',
    beforeSrc: '/placeholder-before-1.jpg',
    afterSrc: '/placeholder-after-1.jpg',
  },
  {
    id: '2',
    title: 'Exterior Curb Appeal',
    description: 'Twilight photography and expert editing create a dramatic first impression that stops the scroll.',
    beforeLabel: 'Daytime Shot',
    afterLabel: 'Twilight Edit',
    beforeSrc: '/placeholder-before-2.jpg',
    afterSrc: '/placeholder-after-2.jpg',
  },
];
