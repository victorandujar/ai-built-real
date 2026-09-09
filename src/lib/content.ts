import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/i18n';

export type Article = CollectionEntry<'learn'> & { slug: string };

/**
 * Articles live in `src/content/learn/<locale>/<slug>.md`, so the collection id
 * carries the language. `slug` is the id without that prefix, which is what the
 * localised routes are built from.
 */
export const articleSlug = (id: string) => id.split('/').slice(1).join('/');
export const articleLocale = (id: string) => id.split('/')[0] as Locale;

export async function getArticles(locale: Locale): Promise<Article[]> {
  return (await getCollection('learn'))
    .filter((post) => !post.data.draft && articleLocale(post.id) === locale)
    .sort((a, b) => a.data.order - b.data.order)
    .map((post) => ({ ...post, slug: articleSlug(post.id) }));
}

/** The same article in another language, matched on `translationKey`. */
export async function articleAlternates(entry: CollectionEntry<'learn'>) {
  const all = await getCollection('learn');
  return all.filter(
    (post) =>
      !post.data.draft &&
      post.data.translationKey === entry.data.translationKey,
  );
}

/** Legal pages mirror the article layout: `src/content/legal/<locale>/<doc>.md`. */
export async function getLegal(doc: 'privacy' | 'terms', locale: Locale) {
  const entries = await getCollection('legal');
  const entry = entries.find((item) => item.id === `${locale}/${doc}`);
  if (!entry) throw new Error(`Missing legal document ${locale}/${doc}`);
  return entry;
}
