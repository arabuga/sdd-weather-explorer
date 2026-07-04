import {
  apiError,
  ErrorCodes,
  parseRequiredQuery,
} from "@/lib/errors";
import { searchGeocode } from "@/lib/weather";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const q = parseRequiredQuery(searchParams, "q");
  if (!q) {
    return apiError(
      ErrorCodes.invalidParameters,
      "Required parameters are missing or invalid.",
      400,
    );
  }

  const limitRaw = searchParams.get("limit");
  const limit = limitRaw ? Number(limitRaw) : 5;
  if (!Number.isFinite(limit) || limit < 1 || limit > 10) {
    return apiError(
      ErrorCodes.invalidParameters,
      "Required parameters are missing or invalid.",
      400,
    );
  }

  try {
    const items = await searchGeocode({ query: q, limit });
    return Response.json({
      items,
      ...(items.length === 0 ? { empty: true } : {}),
    });
  } catch {
    return apiError(
      ErrorCodes.geocodeProviderUnavailable,
      "Geocoding is temporarily unavailable. Try again.",
      503,
    );
  }
}
