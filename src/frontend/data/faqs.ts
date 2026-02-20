export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 'areas-served',
    question: 'What areas do you serve?',
    answer:
      'We primarily serve the Kitchener-Waterloo Region and surrounding southern Ontario communities, including Cambridge, Guelph, Hamilton, and the Greater Toronto Area. Contact us if you\'re outside these areas — we\'re happy to discuss travel options for the right project.',
  },
  {
    id: 'turnaround',
    question: 'How quickly will I receive my photos and videos?',
    answer:
      'Our standard turnaround is 24–48 hours after your session. Rush delivery is available upon request. All files are delivered digitally through a private download link, optimized for both MLS upload and web use.',
  },
  {
    id: 'base-packages',
    question: "What's included in the base packages?",
    answer:
      'Each base package includes professional HDR photography with full editing and colour correction, MLS-ready file formats, and web-optimized delivery. Higher-tier packages add video tours, drone footage, and short-form social content. You can also customize any package with our add-ons.',
  },
  {
    id: 'presence-required',
    question: 'Do I need to be present during the shoot?',
    answer:
      "It's not required, but we recommend a brief walkthrough at the start so we can note any specific angles or features you'd like highlighted. We handle the full shoot independently and will lock up securely when finished.",
  },
  {
    id: 'meta-ads',
    question: 'How do Meta Ads and Lead Funnels work with my listings?',
    answer:
      'We build targeted Facebook and Instagram ad campaigns that place your listing directly in front of qualified local buyers and investors. These are paired with high-converting landing pages and automated follow-up sequences so every lead is captured and nurtured — not just seen.',
  },
];
