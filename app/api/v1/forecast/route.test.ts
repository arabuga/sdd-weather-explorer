import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "./route";

vi.mock("@/lib/weather", () => ({
  fetchForecastRaw: vi.fn(),
}));

import { fetchForecastRaw } from "@/lib/weather";

const rawFixture = {
  timezone: "Europe/Kyiv",
  daily: [
    {
      date: "2026-07-04",
      temperature_max_c: 26,
      temperature_min_c: 17,
      precipitation_probability_percent: 20,
      wind_speed_ms: 4,
      weather_code: 2,
    },
    {
      date: "2026-07-05",
      temperature_max_c: 27,
      temperature_min_c: 18,
      precipitation_probability_percent: 10,
      wind_speed_ms: 3,
      weather_code: 0,
    },
    {
      date: "2026-07-06",
      temperature_max_c: 25,
      temperature_min_c: 16,
      precipitation_probability_percent: 5,
      wind_speed_ms: 3,
      weather_code: 1,
    },
    {
      date: "2026-07-07",
      temperature_max_c: 24,
      temperature_min_c: 15,
      precipitation_probability_percent: 5,
      wind_speed_ms: 4,
      weather_code: 1,
    },
    {
      date: "2026-07-08",
      temperature_max_c: 23,
      temperature_min_c: 14,
      precipitation_probability_percent: 10,
      wind_speed_ms: 5,
      weather_code: 2,
    },
    {
      date: "2026-07-11",
      temperature_max_c: 22,
      temperature_min_c: 13,
      precipitation_probability_percent: 15,
      wind_speed_ms: 4,
      weather_code: 2,
    },
    {
      date: "2026-07-12",
      temperature_max_c: 21,
      temperature_min_c: 12,
      precipitation_probability_percent: 20,
      wind_speed_ms: 5,
      weather_code: 3,
    },
  ],
  hourly: [{ time: "2026-07-04T12:00", temperature_c: 22 }],
  astronomy: { sunrise: "2026-07-04T05:30", sunset: "2026-07-04T21:15" },
};

describe("GET /api/v1/forecast", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 400 when coordinates are invalid", async () => {
    const res = await GET(new Request("http://localhost/api/v1/forecast?lat=bad&lon=30"));
    expect(res.status).toBe(400);
  });

  it("returns forecast bundle with timezone on success", async () => {
    vi.mocked(fetchForecastRaw).mockResolvedValue(rawFixture);
    const res = await GET(
      new Request(
        "http://localhost/api/v1/forecast?lat=50.45&lon=30.52&name=Kyiv",
      ),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.timezone).toBe("Europe/Kyiv");
    expect(body.days).toHaveLength(7);
    expect(body.weekend_highlight.score).toBeGreaterThanOrEqual(0);
  });

  it("returns 503 when provider fails", async () => {
    vi.mocked(fetchForecastRaw).mockRejectedValue(new Error("upstream"));
    const res = await GET(
      new Request(
        "http://localhost/api/v1/forecast?lat=50.45&lon=30.52&name=Kyiv",
      ),
    );
    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.code).toBe("forecast.provider_unavailable");
  });
});
