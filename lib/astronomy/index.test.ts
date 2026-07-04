import { describe, expect, it } from "vitest";

import {
  formatAstronomyLocalTime,
  formatLocationTime,
  isLocationNight,
  themeIndicator,
} from "./index";

const TZ = "Europe/Kyiv";

describe("isLocationNight", () => {
  it("returns true before sunrise in location timezone", () => {
    const beforeSunrise = new Date("2026-07-04T02:00:00Z"); // ~05:00 Kyiv in summer
    expect(
      isLocationNight(
        beforeSunrise,
        "2026-07-04T05:30",
        "2026-07-04T21:15",
        TZ,
      ),
    ).toBe(true);
  });

  it("returns false at midday in location timezone", () => {
    const midday = new Date("2026-07-04T09:00:00Z"); // ~12:00 Kyiv
    expect(
      isLocationNight(midday, "2026-07-04T05:30", "2026-07-04T21:15", TZ),
    ).toBe(false);
  });

  it("returns true after sunset", () => {
    const evening = new Date("2026-07-04T19:00:00Z"); // ~22:00 Kyiv
    expect(
      isLocationNight(evening, "2026-07-04T05:30", "2026-07-04T21:15", TZ),
    ).toBe(true);
  });
});

describe("formatLocationTime", () => {
  it("formats using the location timezone, not the host default", () => {
    const instant = new Date("2026-07-04T12:00:00Z");
    const kyiv = formatLocationTime(instant, TZ);
    const ny = formatLocationTime(instant, "America/New_York");
    expect(kyiv).not.toBe(ny);
  });
});

describe("formatAstronomyLocalTime", () => {
  it("shows wall-clock time from Open-Meteo local ISO regardless of host TZ", () => {
    const original = process.env.TZ;
    process.env.TZ = "America/New_York";
    try {
      expect(formatAstronomyLocalTime("2026-07-04T05:30")).toMatch(/05:30/);
      expect(formatAstronomyLocalTime("2026-07-04T21:15")).toMatch(/21:15/);
    } finally {
      if (original === undefined) delete process.env.TZ;
      else process.env.TZ = original;
    }
  });
});

describe("themeIndicator", () => {
  it("maps night and day from astronomy", () => {
    const night = new Date("2026-07-04T02:00:00Z");
    const day = new Date("2026-07-04T09:00:00Z");
    expect(
      themeIndicator(night, "2026-07-04T05:30", "2026-07-04T21:15", TZ),
    ).toBe("night");
    expect(
      themeIndicator(day, "2026-07-04T05:30", "2026-07-04T21:15", TZ),
    ).toBe("day");
  });
});
