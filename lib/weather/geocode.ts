/**
 * Server-only Open-Meteo geocoding client.
 * Do not import from client components.
 */
import {
  type GeocodePlace,
  WeatherProviderError,
} from "./types";

const GEOCODE_BASE = "https://geocoding-api.open-meteo.com/v1";
const NOMINATIM_REVERSE = "https://nominatim.openstreetmap.org/reverse";
/** Required by Nominatim usage policy — server-side BFF only. */
const NOMINATIM_USER_AGENT = "WeatherExplorer/1.0 (agentic-workshop)";

export interface GeocodeSearchOptions {
  query: string;
  limit?: number;
  fetchFn?: typeof fetch;
}

interface OpenMeteoSearchResult {
  results?: Array<{
    name: string;
    admin1?: string;
    country?: string;
    country_code?: string;
    latitude: number;
    longitude: number;
  }>;
}

function countryCodeToFlag(countryCode?: string): string | null {
  if (!countryCode || countryCode.length !== 2) return null;
  const upper = countryCode.toUpperCase();
  const codePoints = [...upper].map((c) => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function mapResult(r: NonNullable<OpenMeteoSearchResult["results"]>[number]): GeocodePlace {
  return {
    name: r.name,
    admin_region: r.admin1 ?? null,
    country: r.country ?? null,
    flag_emoji: countryCodeToFlag(r.country_code),
    latitude: r.latitude,
    longitude: r.longitude,
  };
}

export async function searchGeocode(
  options: GeocodeSearchOptions,
): Promise<GeocodePlace[]> {
  const { query, limit = 5, fetchFn = fetch } = options;
  const url = new URL(`${GEOCODE_BASE}/search`);
  url.searchParams.set("name", query);
  url.searchParams.set("count", String(limit));
  url.searchParams.set("language", "uk");
  url.searchParams.set("format", "json");

  let response: Response;
  try {
    response = await fetchFn(url.toString());
  } catch {
    throw new WeatherProviderError("Geocoding network failure");
  }

  if (!response.ok) {
    throw new WeatherProviderError(`Geocoding HTTP ${response.status}`);
  }

  const data = (await response.json()) as OpenMeteoSearchResult;
  return (data.results ?? []).map(mapResult);
}

export interface ReverseGeocodeOptions {
  latitude: number;
  longitude: number;
  fetchFn?: typeof fetch;
}

interface OpenMeteoReverseResult {
  results?: Array<{
    name: string;
    admin1?: string;
    country?: string;
    country_code?: string;
    latitude: number;
    longitude: number;
  }>;
}

interface NominatimReverseResult {
  name?: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    suburb?: string;
    borough?: string;
    state?: string;
    region?: string;
    country?: string;
    country_code?: string;
  };
}

function pickReversePlaceName(
  address: NominatimReverseResult["address"],
  fallbackName?: string,
): string | null {
  if (!address) return fallbackName?.trim() || null;
  const name =
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    address.suburb ||
    fallbackName?.trim();
  return name || null;
}

export async function reverseGeocode(
  options: ReverseGeocodeOptions,
): Promise<GeocodePlace | null> {
  const { latitude, longitude, fetchFn = fetch } = options;
  const url = new URL(NOMINATIM_REVERSE);
  url.searchParams.set("lat", String(latitude));
  url.searchParams.set("lon", String(longitude));
  url.searchParams.set("format", "json");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("accept-language", "uk");

  let response: Response;
  try {
    response = await fetchFn(url.toString(), {
      headers: { "User-Agent": NOMINATIM_USER_AGENT },
    });
  } catch {
    throw new WeatherProviderError("Reverse geocoding network failure");
  }

  if (response.status === 429) {
    throw new WeatherProviderError("Reverse geocoding rate limited");
  }

  if (!response.ok) {
    throw new WeatherProviderError(`Reverse geocoding HTTP ${response.status}`);
  }

  const data = (await response.json()) as NominatimReverseResult;
  const name = pickReversePlaceName(data.address, data.name);
  if (!name) return null;

  const adminRegion =
    data.address?.state ??
    data.address?.region ??
    data.address?.borough ??
    null;

  return {
    name,
    admin_region: adminRegion,
    country: data.address?.country ?? null,
    flag_emoji: countryCodeToFlag(data.address?.country_code),
    latitude,
    longitude,
  };
}
