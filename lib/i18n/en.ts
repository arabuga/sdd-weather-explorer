import type { UkCatalogue } from "./uk";

/** English fallback — only keys missing from uk.ts should live here. */
export const en: Partial<{
  [K in keyof UkCatalogue]: Partial<UkCatalogue[K]>;
}> = {
  app: {
    title: "Weather Explorer",
  },
};
