import { describe, expect, it } from "vitest";

import {
  decodeLocation,
  encodeLocation,
  encodeLocationSearchParams,
  hasNonShareableKeys,
  NON_SHAREABLE_KEYS,
} from "./codec";

const sample = {
  name: "Kyiv",
  admin_region: "Kyiv City",
  country: "Ukraine",
  flag_emoji: "🇺🇦",
  latitude: 50.4501,
  longitude: 30.5234,
};

describe("location codec", () => {
  it("round-trips lat/lon/name through encode → decode", () => {
    const encoded = encodeLocation(sample);
    const params = new URLSearchParams({
      lat: encoded.lat,
      lon: encoded.lon,
      name: encoded.name,
      ...(encoded.admin ? { admin: encoded.admin } : {}),
      ...(encoded.country ? { country: encoded.country } : {}),
    });
    const decoded = decodeLocation(params);
    expect(decoded.ok).toBe(true);
    if (decoded.ok) {
      expect(decoded.location.name).toBe("Kyiv");
      expect(decoded.location.latitude).toBeCloseTo(50.4501, 3);
      expect(decoded.location.longitude).toBeCloseTo(30.5234, 3);
      expect(decoded.location.admin_region).toBe("Kyiv City");
    }
  });

  it("never writes pin/compare keys to shareable query", () => {
    const params = encodeLocationSearchParams(sample);
    for (const key of NON_SHAREABLE_KEYS) {
      expect(params.has(key)).toBe(false);
    }
    params.set("pins", "1,2,3");
    expect(hasNonShareableKeys(params)).toBe(true);
  });

  it("returns failure for invalid or partial query", () => {
    expect(decodeLocation(new URLSearchParams("lat=50"))).toEqual({ ok: false });
    expect(decodeLocation(new URLSearchParams("lat=999&lon=0&name=X"))).toEqual({
      ok: false,
    });
    expect(decodeLocation(new URLSearchParams(""))).toEqual({ ok: false });
  });
});
