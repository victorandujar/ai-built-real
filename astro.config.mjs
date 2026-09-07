import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
const env = loadEnv(
  process.env.NODE_ENV || 'production',
  process.cwd(),
  'PUBLIC_',
);
const site =
  process.env.PUBLIC_SITE_URL || env.PUBLIC_SITE_URL || 'https://example.com';
if (
  (process.env.PUBLIC_LAUNCH_READY || env.PUBLIC_LAUNCH_READY) === 'true' &&
  (new URL(site).protocol !== 'https:' ||
    ['example.com', 'localhost', '127.0.0.1'].includes(new URL(site).hostname))
)
  throw new Error(
    'Set a verified HTTPS production domain before enabling launch mode.',
  );
export default defineConfig({
  site,
  output: 'static',
  adapter: vercel(),
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: { prefixDefaultLocale: false },
  },
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (url) => !/\/(privacy|terms|404|check|work)(\/|$)/.test(url),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: { watch: { usePolling: true, interval: 500 } },
  },
  redirects: { '/blog': '/learn' },
  devToolbar: { enabled: false },
});
