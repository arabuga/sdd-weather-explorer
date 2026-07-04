import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "./route";

vi.mock("@/lib/weather", () => ({
  searchGeocode: vi.fn(),
}));

import { searchGeocode } from "@/lib/weather";

describe("GET /api/v1/geocode/suggestions", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 400 when q is missing", async () => {
    const res = await GET(new Request("http://localhost/api/v1/geocode/suggestions"));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.code).toBe("request.invalid_parameters");
  });

  it("returns 200 with empty flag when no matches", async () => {
    vi.mocked(searchGeocode).mockResolvedValue([]);
    const res = await GET(
      new Request("http://localhost/api/v1/geocode/suggestions?q=xyznone"),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.items).toEqual([]);
    expect(body.empty).toBe(true);
  });

  it("returns 200 with suggestions", async () => {
    vi.mocked(searchGeocode).mockResolvedValue([
      {
        name: "Kyiv",
        admin_region: "Kyiv City",
        country: "Ukraine",
        flag_emoji: "🇺🇦",
        latitude: 50.45,
        longitude: 30.52,
      },
    ]);
    const res = await GET(
      new Request("http://localhost/api/v1/geocode/suggestions?q=Kyiv"),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.items).toHaveLength(1);
    expect(body.empty).toBeUndefined();
  });

  it("returns 503 when provider fails", async () => {
    vi.mocked(searchGeocode).mockRejectedValue(new Error("upstream"));
    const res = await GET(
      new Request("http://localhost/api/v1/geocode/suggestions?q=Kyiv"),
    );
    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.code).toBe("geocode.provider_unavailable");
  });
});
