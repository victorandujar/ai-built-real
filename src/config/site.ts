export const site = {
  url: import.meta.env.PUBLIC_SITE_URL || 'https://example.com',
  launchReady: import.meta.env.PUBLIC_LAUNCH_READY === 'true',
  founder: { name: 'Víctor Andújar' },
  prices: {
    check: null as number | null,
    sprint: null as number | null,
    currency: 'EUR',
  },
  features: { publicScan: false, caseStudies: false },
  social: [] as { label: string; url: string }[],
};
export const absolute = (path: string) => new URL(path, site.url).href;
