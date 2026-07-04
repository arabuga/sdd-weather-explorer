/** Framework-free helpers for location-local time and day/night. */

function localTimeParts(date: Date, timezone: string): { date: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "0";

  const dateStr = `${get("year")}-${get("month")}-${get("day")}`;
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  return { date: dateStr, minutes };
}

function parseLocalTimeMinutes(isoLocal: string): number | null {
  const timePart = isoLocal.includes("T") ? isoLocal.split("T")[1] : isoLocal;
  if (!timePart) return null;
  const [h, m] = timePart.split(":").map(Number);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
  return h * 60 + m;
}

/** Whether `now` is night at `timezone` given today's sunrise/sunset (Open-Meteo local ISO). */
export function isLocationNight(
  now: Date,
  sunrise: string,
  sunset: string,
  timezone: string,
): boolean {
  if (!sunrise || !sunset || !timezone) return false;

  const sunriseMin = parseLocalTimeMinutes(sunrise);
  const sunsetMin = parseLocalTimeMinutes(sunset);
  if (sunriseMin == null || sunsetMin == null) return false;

  const { minutes } = localTimeParts(now, timezone);
  return minutes < sunriseMin || minutes >= sunsetMin;
}

export function formatLocationTime(
  now: Date,
  timezone: string,
  locale = "uk-UA",
): string {
  return now.toLocaleTimeString(locale, {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/** Open-Meteo astronomy times are wall-clock local — format without visitor TZ drift. */
export function formatAstronomyLocalTime(
  isoLocal: string,
  locale = "uk-UA",
): string {
  const mins = parseLocalTimeMinutes(isoLocal);
  if (mins == null) return isoLocal;
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  const anchor = new Date(Date.UTC(2020, 0, 1, hours, minutes));
  return anchor.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export type ThemeIndicator = "day" | "night";

export function themeIndicator(
  now: Date,
  sunrise: string,
  sunset: string,
  timezone: string,
): ThemeIndicator {
  return isLocationNight(now, sunrise, sunset, timezone) ? "night" : "day";
}
