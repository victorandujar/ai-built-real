/**
 * Widens the literal types of the English dictionary so a translation is
 * checked for shape and completeness without having to repeat every literal.
 */
export type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends readonly (infer U)[]
      ? readonly Widen<U>[]
      : { readonly [K in keyof T]: Widen<T[K]> };
