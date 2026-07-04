import {
  apiError,
  ErrorCodes,
} from "@/lib/errors";
import type { ActiveLocation } from "@/lib/url-state";
import {
  buildForecastBundle,
  buildWeekendCompareColumns,
} from "@/lib/weather/bundle";
import { fetchForecastRaw } from "@/lib/weather";

interface CompareRequestBody {
  locations?: ActiveLocation[];
}

export async function POST(request: Request): Promise<Response> {
  let body: CompareRequestBody;
  try {
    body = (await request.json()) as CompareRequestBody;
  } catch {
    return apiError(
      ErrorCodes.invalidParameters,
      "Required parameters are missing or invalid.",
      400,
    );
  }

  const locations = body.locations ?? [];
  if (locations.length < 2) {
    return apiError(
      ErrorCodes.compareTooFew,
      "At least two pinned cities are required for compare.",
      400,
    );
  }
  if (locations.length > 3) {
    return apiError(
      ErrorCodes.compareTooMany,
      "At most three cities can be compared.",
      400,
    );
  }

  try {
    const bundles = await Promise.all(
      locations.map(async (loc) => {
        const raw = await fetchForecastRaw({
          latitude: loc.latitude,
          longitude: loc.longitude,
        });
        return buildForecastBundle(loc, raw);
      }),
    );
    const columns = buildWeekendCompareColumns(bundles);
    return Response.json({ columns });
  } catch {
    return apiError(
      ErrorCodes.forecastProviderUnavailable,
      "Forecast is temporarily unavailable. Try again.",
      503,
    );
  }
}
