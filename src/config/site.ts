export const site = {
  name: 'AI-built → Real product',
  shortName: 'Real product',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://example.com',
  launchReady: import.meta.env.PUBLIC_LAUNCH_READY === 'true',
  description:
    'You built it with AI. Get a human product and engineering review before real users, real data and real payments arrive.',
  founder: {
    name: 'Víctor Andújar',
    role: 'Product engineer & full-stack product builder',
  },
  cta: 'Check my product',
  navigation: [
    { label: 'Reality Check', href: '/reality-check' },
    { label: 'Field notes', href: '/learn' },
    { label: 'About', href: '/about' },
  ],
  prices: {
    check: null as number | null,
    sprint: null as number | null,
    currency: 'EUR',
  },
  features: { publicScan: false, caseStudies: false },
  locales: { default: 'en', available: ['en'] },
  social: [] as { label: string; url: string }[],
};
export const absolute = (path: string) => new URL(path, site.url).href;
