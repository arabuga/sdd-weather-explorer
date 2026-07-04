import { en } from "./en";
import { uk } from "./uk";

type NestedKeys<T, Prefix extends string = ""> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? NestedKeys<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`;
    }[keyof T & string]
  : never;

export type I18nKey = NestedKeys<typeof uk>;

function getNestedValue(
  obj: Record<string, unknown>,
  path: string,
): string | undefined {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

/** Ukrainian-first lookup with English fallback for missing keys. */
export function t(key: I18nKey): string {
  const ukValue = getNestedValue(uk as Record<string, unknown>, key);
  if (ukValue !== undefined) return ukValue;
  const enValue = getNestedValue(en as Record<string, unknown>, key);
  if (enValue !== undefined) return enValue;
  return key;
}

export { uk, en };
