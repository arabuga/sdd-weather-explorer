import type { ForecastBundle } from "@/lib/weather/bundle";
import type { ActiveLocation } from "@/lib/url-state";

export const kyiv: ActiveLocation = {
  name: "Kyiv",
  admin_region: "Kyiv City",
  country: "Ukraine",
  flag_emoji: "🇺🇦",
  latitude: 50.45,
  longitude: 30.52,
};

export const lviv: ActiveLocation = {
  name: "Lviv",
  admin_region: "Lviv Oblast",
  country: "Ukraine",
  flag_emoji: "🇺🇦",
  latitude: 49.84,
  longitude: 24.03,
};

export function buildForecastFixture(
  location: ActiveLocation = kyiv,
): ForecastBundle {
  return {
    location,
    timezone: "Europe/Kyiv",
    weekend_highlight: {
      score: 72,
      rationale: "Комфортно для прогулянок.",
      saturday_date: "2026-07-11",
      sunday_date: "2026-07-12",
    },
    days: Array.from({ length: 7 }, (_, i) => ({
      date: `2026-07-${String(i + 4).padStart(2, "0")}`,
      weekday: i === 0 ? "Friday" : "Saturday",
      temperature_max_c: 25,
      temperature_min_c: 15,
      precipitation_probability_percent: 10,
      wind_speed_ms: 3,
      weather_icon: "clear",
      comfort: { value: 70, rationale: "Комфортно.", color: "green" as const },
    })),
    hourly: Array.from({ length: 48 }, (_, i) => ({
      time: `2026-07-04T${String(i % 24).padStart(2, "0")}:00`,
      temperature_c: 20 + (i % 5),
    })),
    astronomy: { sunrise: "2026-07-04T05:30", sunset: "2026-07-04T21:15" },
  };
}

export const compareResponseFixture = {
  columns: [
    {
      location: kyiv,
      saturday: {
        temperature_max_c: 26,
        temperature_min_c: 17,
        precipitation_probability_percent: 20,
        comfort: { value: 68, rationale: "Добре.", color: "yellow" },
      },
      sunday: {
        temperature_max_c: 27,
        temperature_min_c: 18,
        precipitation_probability_percent: 10,
        comfort: { value: 72, rationale: "Комфортно.", color: "green" },
      },
    },
    {
      location: lviv,
      saturday: {
        temperature_max_c: 24,
        temperature_min_c: 14,
        precipitation_probability_percent: 15,
        comfort: { value: 65, rationale: "Помірно.", color: "yellow" },
      },
      sunday: {
        temperature_max_c: 25,
        temperature_min_c: 15,
        precipitation_probability_percent: 5,
        comfort: { value: 70, rationale: "Комфортно.", color: "green" },
      },
    },
  ],
};
