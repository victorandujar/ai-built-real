export type Locale = 'en' | 'es';
export type TranslatedRoutes = Partial<Record<Locale, string>>;
export function languageAlternates(routes: TranslatedRoutes, origin: string) {
  return Object.entries(routes).map(([locale, path]) => ({
    locale,
    href: new URL(path, origin).href,
  }));
}
// Emit these only for existing equivalents, including reciprocal references.
// English lives at root. Future Spanish pages can live at /es/.
