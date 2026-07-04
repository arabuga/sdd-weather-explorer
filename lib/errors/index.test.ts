import { describe, expect, it } from "vitest";

import { apiError, ErrorCodes, parseLatLon } from "./index";

describe("errors", () => {
  it("builds JSON error response", async () => {
    const res = apiError(ErrorCodes.geocodeProviderUnavailable, "Unavailable", 503);
    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.code).toBe("geocode.provider_unavailable");
  });

  it("parses valid lat/lon", () => {
    const params = new URLSearchParams("lat=50.45&lon=30.52");
    expect(parseLatLon(params)).toEqual({ lat: 50.45, lon: 30.52 });
  });

  it("rejects invalid coordinates", () => {
    expect(parseLatLon(new URLSearchParams("lat=999&lon=0"))).toBeNull();
  });
});
