import { comfortScore, type ComfortScore, type DailyComfortInput } from "./comfort";

export interface WeekendHighlight {
  score: number;
  rationale: string;
  saturday_date: string;
  sunday_date: string;
}

export interface DayForecastForWeekend {
  date: string;
  comfortInput: DailyComfortInput;
}

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

function formatDateInTimezone(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function weekdayInTimezone(date: Date, timezone: string): number {
  const name = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "long",
  }).format(date);
  return WEEKDAY_NAMES.indexOf(name as (typeof WEEKDAY_NAMES)[number]);
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date.getTime());
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

/** Resolve Sat–Sun pair in location timezone per AC-05. */
export function resolveWeekendDates(
  now: Date,
  timezone: string,
): { saturday: string; sunday: string } {
  const dow = weekdayInTimezone(now, timezone);

  let daysUntilSaturday: number;
  if (dow === 6) {
    daysUntilSaturday = 0;
  } else if (dow === 0) {
    daysUntilSaturday = -1;
  } else {
    daysUntilSaturday = 6 - dow;
  }

  const saturday = addDays(now, daysUntilSaturday);
  const sunday = addDays(saturday, 1);

  return {
    saturday: formatDateInTimezone(saturday, timezone),
    sunday: formatDateInTimezone(sunday, timezone),
  };
}

function meanScore(a: ComfortScore, b: ComfortScore): number {
  return Math.round((a.value + b.value) / 2);
}

function combineRationale(a: ComfortScore, b: ComfortScore): string {
  const score = meanScore(a, b);
  if (score >= 70) return "Гарні умови на вихідні.";
  if (score >= 40) return "Змішані умови на вихідні.";
  return "Складні умови на вихідні.";
}

/** Compute weekend highlight from daily forecasts keyed by ISO date. */
export function weekendHighlight(
  days: DayForecastForWeekend[],
  now: Date,
  timezone: string,
): WeekendHighlight | null {
  const { saturday, sunday } = resolveWeekendDates(now, timezone);
  const sat = days.find((d) => d.date === saturday);
  const sun = days.find((d) => d.date === sunday);
  if (!sat || !sun) return null;

  const satScore = comfortScore(sat.comfortInput);
  const sunScore = comfortScore(sun.comfortInput);
  const score = meanScore(satScore, sunScore);

  return {
    score,
    rationale: combineRationale(satScore, sunScore).slice(0, 80),
    saturday_date: saturday,
    sunday_date: sunday,
  };
}

export { comfortScore };
export type { ComfortScore, DailyComfortInput };
