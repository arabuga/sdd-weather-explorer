import { comfortScore } from "@/lib/scoring";
import { weekendHighlight } from "@/lib/scoring/weekend";
import type { ActiveLocation } from "@/lib/url-state";
import type { ForecastRaw } from "@/lib/weather/types";
import { weatherCodeToIcon } from "@/lib/weather/types";

function weekdayLabel(date: string, timezone: string): string {
  const d = new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "long",
  }).format(d);
}

export interface ForecastBundle {
  location: ActiveLocation;
  timezone: string;
  weekend_highlight: {
    score: number;
    rationale: string;
    saturday_date: string;
    sunday_date: string;
  };
  days: Array<{
    date: string;
    weekday: string;
    temperature_max_c: number;
    temperature_min_c: number;
    precipitation_probability_percent: number;
    wind_speed_ms: number;
    weather_icon: string;
    comfort: ReturnType<typeof comfortScore>;
  }>;
  hourly: Array<{ time: string; temperature_c: number }>;
  astronomy: { sunrise: string; sunset: string };
}

export function buildForecastBundle(
  location: ActiveLocation,
  raw: ForecastRaw,
  now: Date = new Date(),
): ForecastBundle {
  const timezone = raw.timezone;

  const days = raw.daily.map((day) => {
    const input = {
      temperature_max_c: day.temperature_max_c,
      temperature_min_c: day.temperature_min_c,
      precipitation_probability_percent: day.precipitation_probability_percent,
      wind_speed_ms: day.wind_speed_ms,
    };
    return {
      date: day.date,
      weekday: weekdayLabel(day.date, timezone),
      temperature_max_c: day.temperature_max_c,
      temperature_min_c: day.temperature_min_c,
      precipitation_probability_percent: day.precipitation_probability_percent,
      wind_speed_ms: day.wind_speed_ms,
      weather_icon: weatherCodeToIcon(day.weather_code),
      comfort: comfortScore(input),
    };
  });

  const highlight =
    weekendHighlight(
      raw.daily.map((d) => ({
        date: d.date,
        comfortInput: {
          temperature_max_c: d.temperature_max_c,
          temperature_min_c: d.temperature_min_c,
          precipitation_probability_percent: d.precipitation_probability_percent,
          wind_speed_ms: d.wind_speed_ms,
        },
      })),
      now,
      timezone,
    ) ?? {
      score: days[0]?.comfort.value ?? 0,
      rationale: days[0]?.comfort.rationale ?? "",
      saturday_date: raw.daily[5]?.date ?? raw.daily[0].date,
      sunday_date: raw.daily[6]?.date ?? raw.daily[1]?.date ?? raw.daily[0].date,
    };

  return {
    location,
    timezone,
    weekend_highlight: highlight,
    days,
    hourly: raw.hourly,
    astronomy: raw.astronomy,
  };
}

export interface WeekendCompareColumn {
  location: ActiveLocation;
  saturday: {
    temperature_max_c: number;
    temperature_min_c: number;
    precipitation_probability_percent: number;
    comfort: ReturnType<typeof comfortScore>;
  };
  sunday: {
    temperature_max_c: number;
    temperature_min_c: number;
    precipitation_probability_percent: number;
    comfort: ReturnType<typeof comfortScore>;
  };
}

export function buildWeekendCompareColumns(
  bundles: ForecastBundle[],
): WeekendCompareColumn[] {
  return bundles.map((bundle) => {
    const sat = bundle.days.find((d) => d.date === bundle.weekend_highlight.saturday_date);
    const sun = bundle.days.find((d) => d.date === bundle.weekend_highlight.sunday_date);
    if (!sat || !sun) {
      throw new Error("Weekend days missing from forecast");
    }
    return {
      location: bundle.location,
      saturday: {
        temperature_max_c: sat.temperature_max_c,
        temperature_min_c: sat.temperature_min_c,
        precipitation_probability_percent: sat.precipitation_probability_percent,
        comfort: sat.comfort,
      },
      sunday: {
        temperature_max_c: sun.temperature_max_c,
        temperature_min_c: sun.temperature_min_c,
        precipitation_probability_percent: sun.precipitation_probability_percent,
        comfort: sun.comfort,
      },
    };
  });
}
