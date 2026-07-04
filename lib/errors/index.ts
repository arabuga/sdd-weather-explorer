export interface ApiErrorBody {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export const ErrorCodes = {
  invalidParameters: "request.invalid_parameters",
  geocodeProviderUnavailable: "geocode.provider_unavailable",
  geocodeReverseFailed: "geocode.reverse_failed",
  forecastProviderUnavailable: "forecast.provider_unavailable",
  compareTooFew: "compare.too_few_locations",
  compareTooMany: "compare.too_many_locations",
  upstreamBadGateway: "upstream.bad_gateway",
} as const;

export function apiError(
  code: string,
  message: string,
  status: number,
  details?: Record<string, unknown>,
): Response {
  const body: ApiErrorBody = { code, message };
  if (details) body.details = details;
  return Response.json(body, { status });
}

export function parseLatLon(
  searchParams: URLSearchParams,
): { lat: number; lon: number } | null {
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
  return { lat, lon };
}

export function parseRequiredQuery(
  searchParams: URLSearchParams,
  key: string,
): string | null {
  const value = searchParams.get(key)?.trim();
  return value ? value : null;
}
