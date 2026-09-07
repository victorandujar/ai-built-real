import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '@/config/site';
export async function GET() {
  return rss({
    title: `${site.shortName} — Field notes`,
    description: site.description,
    site: site.url,
    items: (await getCollection('learn'))
      .filter((p) => !p.data.draft)
      .map((p) => ({
        title: p.data.title,
        description: p.data.description,
        pubDate: new Date(p.data.published),
        link: `/learn/${p.id}`,
      })),
  });
}
