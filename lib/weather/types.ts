/** Internal DTOs — server-only Open-Meteo adapters. Do not import from client bundles. */

export interface GeocodePlace {
  name: string;
  admin_region: string | null;
  country: string | null;
  flag_emoji: string | null;
  latitude: number;
  longitude: number;
}

export interface DailyWeatherRaw {
  date: string;
  temperature_max_c: number;
  temperature_min_c: number;
  precipitation_probability_percent: number;
  wind_speed_ms: number;
  weather_code: number;
}

export interface HourlyWeatherRaw {
  time: string;
  temperature_c: number;
}

export interface AstronomyRaw {
  sunrise: string;
  sunset: string;
}

export interface ForecastRaw {
  timezone: string;
  daily: DailyWeatherRaw[];
  hourly: HourlyWeatherRaw[];
  astronomy: AstronomyRaw;
}

export type WeatherIcon =
  | "clear"
  | "partly_cloudy"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "thunderstorm";

/** Map WMO weather code to internal icon slug. */
export function weatherCodeToIcon(code: number): WeatherIcon {
  if (code === 0) return "clear";
  if (code <= 3) return "partly_cloudy";
  if (code <= 48) return code === 45 || code === 48 ? "fog" : "cloudy";
  if (code <= 57) return "drizzle";
  if (code <= 67) return "rain";
  if (code <= 77) return "snow";
  if (code <= 82) return "rain";
  if (code <= 86) return "snow";
  return "thunderstorm";
}

export class WeatherProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WeatherProviderError";
  }
}
