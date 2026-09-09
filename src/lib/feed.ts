import rss from '@astrojs/rss';
import { site } from '@/config/site';
import { useTranslations, articlePath, localeTags } from '@/i18n';
import type { Locale } from '@/i18n';
import { getArticles } from '@/lib/content';

export async function localeFeed(locale: Locale) {
  const t = useTranslations(locale);
  return rss({
    title: `${t.meta.shortName} — ${t.learn.breadcrumb}`,
    description: t.meta.description,
    site: site.url,
    customData: `<language>${localeTags[locale]}</language>`,
    items: (await getArticles(locale)).map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.published),
      link: articlePath(post.slug, locale),
    })),
  });
}
