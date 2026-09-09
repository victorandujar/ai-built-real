import { en } from './en';
import { es } from './es';
import type { Locale } from './config';

const dictionaries = { en, es } as const;

/** The copy for a locale. Views take `lang` and call this once. */
export const useTranslations = (locale: Locale) => dictionaries[locale];

export * from './config';
export * from './routes';
export type { Translation } from './es';
