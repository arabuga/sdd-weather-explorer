import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET as getForecast } from "@/app/api/v1/forecast/route";
import { GET as getSuggestions } from "@/app/api/v1/geocode/suggestions/route";
import { POST as postCompare } from "@/app/api/v1/forecast/weekend-compare/route";
import { validateAgainstOpenApi } from "@/lib/contracts/validate";

vi.mock("@/lib/weather", () => ({
  fetchForecastRaw: vi.fn(),
  searchGeocode: vi.fn(),
}));

import { fetchForecastRaw, searchGeocode } from "@/lib/weather";

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
  hourly: [{ time: "2026-07-04T12:00", temperature_c: 22 }],
  astronomy: { sunrise: "2026-07-04T05:30", sunset: "2026-07-04T21:15" },
};

describe("OpenAPI contract validation", () => {
  beforeEach(() => vi.clearAllMocks());

  it("validates ForecastBundle from GET /forecast", async () => {
    vi.mocked(fetchForecastRaw).mockResolvedValue(rawFixture);
    const res = await getForecast(
      new Request(
        "http://localhost/api/v1/forecast?lat=50.45&lon=30.52&name=Kyiv",
      ),
    );
    const body = await res.json();
    const result = validateAgainstOpenApi("ForecastBundle", body);
    expect(result.valid).toBe(true);
  });

  it("validates GeocodeSuggestionList from GET /geocode/suggestions", async () => {
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
    const res = await getSuggestions(
      new Request("http://localhost/api/v1/geocode/suggestions?q=Kyiv"),
    );
    const body = await res.json();
    const result = validateAgainstOpenApi("GeocodeSuggestionList", body);
    expect(result.valid).toBe(true);
  });

  it("validates WeekendCompareResponse from POST /forecast/weekend-compare", async () => {
    vi.mocked(fetchForecastRaw).mockResolvedValue(rawFixture);
    const res = await postCompare(
      new Request("http://localhost/api/v1/forecast/weekend-compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locations: [
            { name: "Kyiv", latitude: 50.45, longitude: 30.52 },
            { name: "Lviv", latitude: 49.84, longitude: 24.03 },
          ],
        }),
      }),
    );
    const body = await res.json();
    const result = validateAgainstOpenApi("WeekendCompareResponse", body);
    expect(result.valid).toBe(true);
  });
});
