import {
  apiError,
  ErrorCodes,
  parseLatLon,
} from "@/lib/errors";
import { reverseGeocode } from "@/lib/weather";

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

  try {
    const place = await reverseGeocode({
      latitude: coords.lat,
      longitude: coords.lon,
    });
    if (!place) {
      return apiError(
        ErrorCodes.geocodeReverseFailed,
        "Could not resolve a place name for this point.",
        422,
      );
    }
    return Response.json(place);
  } catch {
    return apiError(
      ErrorCodes.geocodeProviderUnavailable,
      "Geocoding is temporarily unavailable. Try again.",
      503,
    );
  }
}
