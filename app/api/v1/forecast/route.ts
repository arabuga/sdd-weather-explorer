import {
  apiError,
  ErrorCodes,
  parseLatLon,
  parseRequiredQuery,
} from "@/lib/errors";
import type { ActiveLocation } from "@/lib/url-state";
import { buildForecastBundle } from "@/lib/weather/bundle";
import { fetchForecastRaw } from "@/lib/weather";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const coords = parseLatLon(searchParams);
  if (!coords) {
    return apiError(
      ErrorCodes.invalidParameters,
      "Required parameters are missing or invalid.",
      400,
    );
  }

  const name = parseRequiredQuery(searchParams, "name") ?? "Unknown";
  const timezone = searchParams.get("timezone") ?? "auto";

  const location: ActiveLocation = {
    name,
    latitude: coords.lat,
    longitude: coords.lon,
    admin_region: searchParams.get("admin"),
    country: searchParams.get("country"),
  };

  try {
    const raw = await fetchForecastRaw({
      latitude: coords.lat,
      longitude: coords.lon,
      timezone,
    });
    const bundle = buildForecastBundle(location, raw);
    return Response.json(bundle);
  } catch {
    return apiError(
      ErrorCodes.forecastProviderUnavailable,
      "Forecast is temporarily unavailable. Try again.",
      503,
    );
  }
}
