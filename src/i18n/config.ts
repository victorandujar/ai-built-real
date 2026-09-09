export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};
/** BCP 47 tags for `lang`, `hreflang`, `og:locale` and date formatting. */
export const localeTags: Record<Locale, string> = { en: 'en', es: 'es' };
export const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
};
export const dateLocales: Record<Locale, string> = {
  en: 'en-GB',
  es: 'es-ES',
};
/** English lives at the root; every other locale is prefixed. */
export function localeFromPath(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0];
  return segment && isLocale(segment) && segment !== defaultLocale
    ? segment
    : defaultLocale;
}
export function formatDate(value: string, locale: Locale) {
  return new Date(value).toLocaleDateString(dateLocales[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
