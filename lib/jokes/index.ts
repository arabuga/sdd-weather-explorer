import { FOOTER_JOKES } from "./catalogue";

/** Simple deterministic hash for joke selection. */
function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export interface JokeContext {
  /** ISO date YYYY-MM-DD in active location timezone */
  date: string;
  /** Location label used for deterministic rotation */
  locationName: string;
}

/** Returns a deterministic joke for the given date and location — no network. */
export function selectFooterJoke(ctx: JokeContext): string {
  const seed = `${ctx.date}|${ctx.locationName.toLowerCase()}`;
  const index = hashString(seed) % FOOTER_JOKES.length;
  return FOOTER_JOKES[index] ?? FOOTER_JOKES[0];
}

export { FOOTER_JOKES };
