import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "./route";

vi.mock("@/lib/weather", () => ({
  reverseGeocode: vi.fn(),
}));

import { reverseGeocode } from "@/lib/weather";

describe("GET /api/v1/geocode/reverse", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 400 for invalid coordinates", async () => {
    const res = await GET(
      new Request("http://localhost/api/v1/geocode/reverse?lat=999&lon=0"),
    );
    expect(res.status).toBe(400);
  });

  it("returns 422 when reverse geocode yields no place", async () => {
    vi.mocked(reverseGeocode).mockResolvedValue(null);
    const res = await GET(
      new Request("http://localhost/api/v1/geocode/reverse?lat=0&lon=0"),
    );
    expect(res.status).toBe(422);
    const body = await res.json();
    expect(body.code).toBe("geocode.reverse_failed");
  });

  it("returns 200 with place on success", async () => {
    vi.mocked(reverseGeocode).mockResolvedValue({
      name: "Kyiv",
      admin_region: null,
      country: "Ukraine",
      flag_emoji: "🇺🇦",
      latitude: 50.45,
      longitude: 30.52,
    });
    const res = await GET(
      new Request("http://localhost/api/v1/geocode/reverse?lat=50.45&lon=30.52"),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.name).toBe("Kyiv");
  });

  it("returns 503 when provider fails", async () => {
    vi.mocked(reverseGeocode).mockRejectedValue(new Error("upstream"));
    const res = await GET(
      new Request("http://localhost/api/v1/geocode/reverse?lat=50.45&lon=30.52"),
    );
    expect(res.status).toBe(503);
  });
});
