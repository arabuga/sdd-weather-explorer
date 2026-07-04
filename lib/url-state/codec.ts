export interface ActiveLocation {
  name: string;
  admin_region?: string | null;
  country?: string | null;
  flag_emoji?: string | null;
  latitude: number;
  longitude: number;
}

export interface DecodeResult {
  ok: true;
  location: ActiveLocation;
}

export interface DecodeFailure {
  ok: false;
}

export type DecodeLocationResult = DecodeResult | DecodeFailure;

/** Keys excluded from shareable URL state per ADR-0003. */
export const NON_SHAREABLE_KEYS = [
  "pins",
  "compare",
  "scroll",
  "pin",
] as const;

export interface LocationQueryParams {
  lat: string;
  lon: string;
  name: string;
  admin?: string;
  country?: string;
}

/** Serialize active location to shareable query params. */
export function encodeLocation(location: ActiveLocation): LocationQueryParams {
  const params: LocationQueryParams = {
    lat: location.latitude.toFixed(4),
    lon: location.longitude.toFixed(4),
    name: location.name,
  };
  if (location.admin_region) params.admin = location.admin_region;
  if (location.country) params.country = location.country;
  return params;
}

/** Build URLSearchParams for shareable state — never includes pins/compare. */
export function encodeLocationSearchParams(
  location: ActiveLocation,
): URLSearchParams {
  const encoded = encodeLocation(location);
  const params = new URLSearchParams();
  params.set("lat", encoded.lat);
  params.set("lon", encoded.lon);
  params.set("name", encoded.name);
  if (encoded.admin) params.set("admin", encoded.admin);
  if (encoded.country) params.set("country", encoded.country);
  for (const key of NON_SHAREABLE_KEYS) {
    params.delete(key);
  }
  return params;
}

function parseCoord(value: string | null): number | null {
  if (value == null || value.trim() === "") return null;
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  return n;
}

/** Parse shareable query into active location. */
export function decodeLocation(
  params: URLSearchParams | Record<string, string | undefined>,
): DecodeLocationResult {
  const get = (key: string): string | null => {
    if (params instanceof URLSearchParams) return params.get(key);
    return params[key] ?? null;
  };

  const lat = parseCoord(get("lat"));
  const lon = parseCoord(get("lon"));
  const name = get("name")?.trim();

  if (lat == null || lon == null || !name) return { ok: false };
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return { ok: false };

  return {
    ok: true,
    location: {
      name,
      latitude: lat,
      longitude: lon,
      admin_region: get("admin"),
      country: get("country"),
    },
  };
}

/** Returns true if params contain non-shareable state keys. */
export function hasNonShareableKeys(params: URLSearchParams): boolean {
  return NON_SHAREABLE_KEYS.some((key) => params.has(key));
}
