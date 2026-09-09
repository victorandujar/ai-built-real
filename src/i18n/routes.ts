import type { Locale } from './config';
import { defaultLocale, locales } from './config';

/**
 * Every page has one key and one path per locale. The switcher, the nav and the
 * hreflang alternates all read from here, so a route can never exist in one
 * language and silently point at the wrong page in the other.
 */
export const routes = {
  home: { en: '/', es: '/es' },
  realityCheck: { en: '/reality-check', es: '/es/reality-check' },
  learn: { en: '/learn', es: '/es/notas' },
  about: { en: '/about', es: '/es/sobre-mi' },
  check: { en: '/check', es: '/es/solicitud' },
  privacy: { en: '/privacy', es: '/es/privacidad' },
  terms: { en: '/terms', es: '/es/terminos' },
  rss: { en: '/rss.xml', es: '/es/rss.xml' },
  notFound: { en: '/404', es: '/es/404' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

export const path = (key: RouteKey, locale: Locale) => routes[key][locale];

/** Article paths live under the localised `learn` route, keyed by slug. */
export const articlePath = (slug: string, locale: Locale) =>
  `${routes.learn[locale]}/${slug}`;

const withoutTrailingSlash = (value: string) =>
  value.length > 1 ? value.replace(/\/$/, '') : value;

/**
 * The same page in another locale. Falls back to that locale's home rather than
 * a guessed prefix, so the switcher never lands on a 404.
 */
export function translatePath(
  pathname: string,
  target: Locale,
  alternates?: Partial<Record<Locale, string>>,
): string {
  const current = withoutTrailingSlash(pathname);
  if (alternates?.[target]) return alternates[target]!;
  for (const value of Object.values(routes)) {
    for (const locale of locales)
      if (withoutTrailingSlash(value[locale]) === current) return value[target];
  }
  return routes.home[target];
}

/** Emit alternates only for pages that exist in both languages. */
export function alternatesFor(
  pathname: string,
  origin: string,
  alternates?: Partial<Record<Locale, string>>,
) {
  return locales.map((locale) => ({
    locale,
    href: new URL(translatePath(pathname, locale, alternates), origin).href,
  }));
}

export const defaultPath = (key: RouteKey) => routes[key][defaultLocale];

/**
 * Alternates for a path the registry actually knows, or null. The sitemap uses
 * this rather than `alternatesFor`, whose home fallback would wrongly pair every
 * article with the landing page. Articles carry their alternates in the page head.
 */
export function registryAlternates(pathname: string, origin: string) {
  const current = withoutTrailingSlash(pathname);
  const known = Object.values(routes).some((value) =>
    locales.some((locale) => withoutTrailingSlash(value[locale]) === current),
  );
  return known ? alternatesFor(current, origin) : null;
}
