import type { ActiveLocation } from "@/lib/url-state";
import type { ForecastBundle } from "@/lib/weather/bundle";

export type { ActiveLocation, ForecastBundle };

export interface GeocodeSuggestionList {
  items: ActiveLocation[];
  empty?: boolean;
}

export interface WeekendCompareResponse {
  columns: Array<{
    location: ActiveLocation;
    saturday: DayMetrics;
    sunday: DayMetrics;
  }>;
}

interface DayMetrics {
  temperature_max_c: number;
  temperature_min_c: number;
  precipitation_probability_percent: number;
  comfort: { value: number; rationale: string; color: string };
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

async function parseError(res: Response): Promise<ApiClientError> {
  try {
    const body = (await res.json()) as { code?: string; message?: string };
    return new ApiClientError(
      body.message ?? "Request failed",
      res.status,
      body.code,
    );
  } catch {
    return new ApiClientError("Request failed", res.status);
  }
}

export async function fetchGeocodeSuggestions(
  query: string,
): Promise<GeocodeSuggestionList> {
  const params = new URLSearchParams({ q: query, limit: "5" });
  const res = await fetch(`/api/v1/geocode/suggestions?${params}`);
  if (!res.ok) throw await parseError(res);
  return res.json() as Promise<GeocodeSuggestionList>;
}

export async function fetchReverseGeocode(
  latitude: number,
  longitude: number,
): Promise<ActiveLocation> {
  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
  });
  const res = await fetch(`/api/v1/geocode/reverse?${params}`);
  if (!res.ok) throw await parseError(res);
  return res.json() as Promise<ActiveLocation>;
}

export async function fetchForecast(
  location: ActiveLocation,
): Promise<ForecastBundle> {
  const params = new URLSearchParams({
    lat: String(location.latitude),
    lon: String(location.longitude),
    name: location.name,
  });
  if (location.admin_region) params.set("admin", location.admin_region);
  if (location.country) params.set("country", location.country);
  const res = await fetch(`/api/v1/forecast?${params}`);
  if (!res.ok) throw await parseError(res);
  return res.json() as Promise<ForecastBundle>;
}

export async function fetchWeekendCompare(
  locations: ActiveLocation[],
): Promise<WeekendCompareResponse> {
  const res = await fetch("/api/v1/forecast/weekend-compare", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ locations }),
  });
  if (!res.ok) throw await parseError(res);
  return res.json() as Promise<WeekendCompareResponse>;
}
