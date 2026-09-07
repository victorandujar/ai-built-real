import { site } from '@/config/site';
export function GET() {
  return new Response(
    `User-agent: *\n${site.launchReady ? 'Allow: /\nDisallow: /api/' : 'Disallow: /'}\nSitemap: ${site.url}/sitemap-index.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
