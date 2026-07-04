import { describe, expect, it, vi } from "vitest";

import { reverseGeocode, searchGeocode } from "./geocode";
import { fetchForecastRaw } from "./forecast";
import { WeatherProviderError } from "./types";

const searchPayload = {
  results: [
    {
      name: "Kyiv",
      admin1: "Kyiv City",
      country: "Ukraine",
      country_code: "UA",
      latitude: 50.4501,
      longitude: 30.5234,
    },
  ],
};

const forecastPayload = {
  timezone: "Europe/Kyiv",
  daily: {
    time: ["2026-07-04", "2026-07-05", "2026-07-06", "2026-07-07", "2026-07-08", "2026-07-09", "2026-07-10"],
    temperature_2m_max: [26, 27, 25, 24, 23, 22, 21],
    temperature_2m_min: [17, 18, 16, 15, 14, 13, 12],
    precipitation_probability_max: [20, 30, 10, 5, 40, 50, 60],
    wind_speed_10m_max: [4.2, 5, 3, 6, 7, 8, 9],
    weather_code: [2, 3, 0, 1, 61, 63, 80],
    sunrise: ["2026-07-04T05:12"],
    sunset: ["2026-07-04T21:04"],
  },
  hourly: {
    time: Array.from({ length: 48 }, (_, i) => `2026-07-04T${String(i % 24).padStart(2, "0")}:00`),
    temperature_2m: Array.from({ length: 48 }, () => 20),
  },
};

describe("searchGeocode", () => {
  it("maps Open-Meteo search JSON to internal DTOs", async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => searchPayload,
    });
    const results = await searchGeocode({ query: "Kyiv", fetchFn });
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("Kyiv");
    expect(results[0].flag_emoji).toBe("🇺🇦");
  });

  it("returns empty array when no matches", async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
    const results = await searchGeocode({ query: "Xyznone", fetchFn });
    expect(results).toEqual([]);
  });

  it("throws WeatherProviderError on HTTP failure", async () => {
    const fetchFn = vi.fn().mockResolvedValue({ ok: false, status: 503 });
    await expect(searchGeocode({ query: "Kyiv", fetchFn })).rejects.toThrow(
      WeatherProviderError,
    );
  });
});

describe("reverseGeocode", () => {
  it("returns place or null", async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => searchPayload,
    });
    const place = await reverseGeocode({ latitude: 50.45, longitude: 30.52, fetchFn });
    expect(place?.name).toBe("Kyiv");
  });
});

describe("fetchForecastRaw", () => {
  it("maps forecast payload to internal DTOs", async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => forecastPayload,
    });
    const raw = await fetchForecastRaw({
      latitude: 50.45,
      longitude: 30.52,
      fetchFn,
    });
    expect(raw.daily).toHaveLength(7);
    expect(raw.hourly.length).toBeLessThanOrEqual(48);
    expect(raw.astronomy.sunrise).toBeTruthy();
  });

  it("throws on network failure", async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error("network"));
    await expect(
      fetchForecastRaw({ latitude: 50, longitude: 30, fetchFn }),
    ).rejects.toThrow(WeatherProviderError);
  });
});
