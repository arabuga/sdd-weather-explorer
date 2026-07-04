import { beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "./route";

vi.mock("@/lib/weather", () => ({
  fetchForecastRaw: vi.fn(),
}));

import { fetchForecastRaw } from "@/lib/weather";

const loc = (name: string, lat: number, lon: number) => ({
  name,
  latitude: lat,
  longitude: lon,
});

const rawFixture = {
  timezone: "Europe/Kyiv",
  daily: [
    { date: "2026-07-04", temperature_max_c: 26, temperature_min_c: 17, precipitation_probability_percent: 20, wind_speed_ms: 4, weather_code: 2 },
    { date: "2026-07-05", temperature_max_c: 27, temperature_min_c: 18, precipitation_probability_percent: 10, wind_speed_ms: 3, weather_code: 0 },
    { date: "2026-07-06", temperature_max_c: 25, temperature_min_c: 16, precipitation_probability_percent: 5, wind_speed_ms: 3, weather_code: 1 },
    { date: "2026-07-07", temperature_max_c: 24, temperature_min_c: 15, precipitation_probability_percent: 5, wind_speed_ms: 4, weather_code: 1 },
    { date: "2026-07-08", temperature_max_c: 23, temperature_min_c: 14, precipitation_probability_percent: 10, wind_speed_ms: 5, weather_code: 2 },
    { date: "2026-07-11", temperature_max_c: 22, temperature_min_c: 13, precipitation_probability_percent: 15, wind_speed_ms: 4, weather_code: 2 },
    { date: "2026-07-12", temperature_max_c: 21, temperature_min_c: 12, precipitation_probability_percent: 20, wind_speed_ms: 5, weather_code: 3 },
  ],
  hourly: [],
  astronomy: { sunrise: "2026-07-04T05:30", sunset: "2026-07-04T21:15" },
};

describe("POST /api/v1/forecast/weekend-compare", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fetchForecastRaw).mockResolvedValue(rawFixture);
  });

  it("returns 400 when fewer than two locations", async () => {
    const res = await POST(
      new Request("http://localhost/api/v1/forecast/weekend-compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locations: [loc("Kyiv", 50.45, 30.52)] }),
      }),
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.code).toBe("compare.too_few_locations");
  });

  it("returns side-by-side columns for two locations", async () => {
    const res = await POST(
      new Request("http://localhost/api/v1/forecast/weekend-compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locations: [
            loc("Kyiv", 50.45, 30.52),
            loc("Lviv", 49.84, 24.03),
          ],
        }),
      }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.columns).toHaveLength(2);
    expect(body.columns[0].saturday).toBeDefined();
    expect(body.columns[0].sunday).toBeDefined();
  });

  it("returns 503 when provider fails", async () => {
    vi.mocked(fetchForecastRaw).mockRejectedValue(new Error("upstream"));
    const res = await POST(
      new Request("http://localhost/api/v1/forecast/weekend-compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locations: [
            loc("Kyiv", 50.45, 30.52),
            loc("Lviv", 49.84, 24.03),
          ],
        }),
      }),
    );
    expect(res.status).toBe(503);
  });

  it("returns 400 when more than three locations", async () => {
    const res = await POST(
      new Request("http://localhost/api/v1/forecast/weekend-compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locations: [
            loc("Kyiv", 50.45, 30.52),
            loc("Lviv", 49.84, 24.03),
            loc("Odesa", 46.48, 30.73),
            loc("Kharkiv", 49.99, 36.23),
          ],
        }),
      }),
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.code).toBe("compare.too_many_locations");
  });
});
