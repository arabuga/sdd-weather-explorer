/**
 * Server-only Open-Meteo forecast client.
 * Do not import from client components.
 */
import {
  type AstronomyRaw,
  type DailyWeatherRaw,
  type ForecastRaw,
  type HourlyWeatherRaw,
  WeatherProviderError,
} from "./types";

const FORECAST_BASE = "https://api.open-meteo.com/v1/forecast";

export interface FetchForecastOptions {
  latitude: number;
  longitude: number;
  timezone?: string;
  fetchFn?: typeof fetch;
}

interface OpenMeteoForecastResponse {
  timezone?: string;
  daily?: {
    time?: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: number[];
    wind_speed_10m_max?: number[];
    weather_code?: number[];
    sunrise?: string[];
    sunset?: string[];
  };
  hourly?: {
    time?: string[];
    temperature_2m?: number[];
  };
}

export async function fetchForecastRaw(
  options: FetchForecastOptions,
): Promise<ForecastRaw> {
  const { latitude, longitude, timezone = "auto", fetchFn = fetch } = options;
  const url = new URL(FORECAST_BASE);
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set("timezone", timezone);
  url.searchParams.set("forecast_days", "7");
  url.searchParams.set(
    "daily",
    [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
      "wind_speed_10m_max",
      "weather_code",
      "sunrise",
      "sunset",
    ].join(","),
  );
  url.searchParams.set("hourly", "temperature_2m");
  // Default forecast_days hourly series starts at local 00:00 today (not current hour).

  let response: Response;
  try {
    response = await fetchFn(url.toString());
  } catch {
    throw new WeatherProviderError("Forecast network failure");
  }

  if (!response.ok) {
    throw new WeatherProviderError(`Forecast HTTP ${response.status}`);
  }

  const data = (await response.json()) as OpenMeteoForecastResponse;
  const daily = data.daily;
  if (!daily?.time?.length) {
    throw new WeatherProviderError("Forecast payload missing daily data");
  }

  const dailyRows: DailyWeatherRaw[] = daily.time.map((date, i) => ({
    date,
    temperature_max_c: daily.temperature_2m_max?.[i] ?? 0,
    temperature_min_c: daily.temperature_2m_min?.[i] ?? 0,
    precipitation_probability_percent: Math.round(
      daily.precipitation_probability_max?.[i] ?? 0,
    ),
    wind_speed_ms: daily.wind_speed_10m_max?.[i] ?? 0,
    weather_code: daily.weather_code?.[i] ?? 0,
  }));

  const hourlyTimes = data.hourly?.time ?? [];
  const hourlyTemps = data.hourly?.temperature_2m ?? [];
  const hourlyStart = hourlyTimes.findIndex((time) => time.endsWith("T00:00"));
  const fromMidnight = hourlyStart >= 0 ? hourlyStart : 0;
  const hourly: HourlyWeatherRaw[] = hourlyTimes
    .slice(fromMidnight, fromMidnight + 48)
    .map((time, i) => ({
      time,
      temperature_c: hourlyTemps[fromMidnight + i] ?? 0,
    }));

  const astronomy: AstronomyRaw = {
    sunrise: daily.sunrise?.[0] ?? "",
    sunset: daily.sunset?.[0] ?? "",
  };

  return {
    timezone: data.timezone ?? timezone,
    daily: dailyRows,
    hourly,
    astronomy,
  };
}
