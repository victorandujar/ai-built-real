import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
import { registryAlternates } from './src/i18n/routes.ts';
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
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (url) =>
        !/\/(privacy|privacidad|terms|terminos|404|check|solicitud|work)(\/|$)/.test(
          url,
        ),
      // The route registry is the only thing that knows /about pairs with
      // /es/sobre-mi; the built-in i18n option only matches identical slugs.
      serialize: (item) => {
        const alternates = registryAlternates(new URL(item.url).pathname, site);
        return alternates
          ? {
              ...item,
              links: alternates.map(({ locale, href }) => ({
                lang: locale,
                url: href,
              })),
            }
          : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: { watch: { usePolling: true, interval: 500 } },
  },
  redirects: { '/blog': '/learn', '/es/blog': '/es/notas' },
  devToolbar: { enabled: false },
});
