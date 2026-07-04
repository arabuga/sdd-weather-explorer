import { describe, expect, it } from "vitest";

import { comfortScore, RATIONALE_MAX } from "./comfort";
import { resolveWeekendDates, weekendHighlight } from "./weekend";

const mildDay = {
  temperature_max_c: 24,
  temperature_min_c: 16,
  precipitation_probability_percent: 10,
  wind_speed_ms: 3,
};

describe("comfortScore", () => {
  it("returns score between 0 and 100", () => {
    const result = comfortScore(mildDay);
    expect(result.value).toBeGreaterThanOrEqual(0);
    expect(result.value).toBeLessThanOrEqual(100);
  });

  it("assigns green at 70+", () => {
    const result = comfortScore(mildDay);
    expect(result.color).toBe("green");
    expect(result.value).toBeGreaterThanOrEqual(70);
  });

  it("assigns yellow for moderate conditions", () => {
    const result = comfortScore({
      temperature_max_c: 18,
      temperature_min_c: 10,
      precipitation_probability_percent: 55,
      wind_speed_ms: 9,
    });
    expect(result.color).toBe("yellow");
    expect(result.value).toBeGreaterThanOrEqual(40);
    expect(result.value).toBeLessThan(70);
  });

  it("assigns red for harsh conditions", () => {
    const result = comfortScore({
      temperature_max_c: 2,
      temperature_min_c: -5,
      precipitation_probability_percent: 90,
      wind_speed_ms: 15,
    });
    expect(result.color).toBe("red");
    expect(result.value).toBeLessThan(40);
  });

  it("rationale is Ukrainian, ≤80 chars, no emoji or exclamation", () => {
    const result = comfortScore(mildDay);
    expect(result.rationale.length).toBeLessThanOrEqual(RATIONALE_MAX);
    expect(result.rationale).not.toMatch(/!/);
    expect(result.rationale).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u);
  });
});

describe("resolveWeekendDates", () => {
  const tz = "Europe/Kyiv";

  it("uses next Sat–Sun when today is Friday", () => {
    const fri = new Date("2026-07-10T12:00:00Z");
    const { saturday, sunday } = resolveWeekendDates(fri, tz);
    expect(saturday).toBe("2026-07-11");
    expect(sunday).toBe("2026-07-12");
  });

  it("uses in-progress pair when today is Saturday", () => {
    const sat = new Date("2026-07-11T10:00:00Z");
    const { saturday, sunday } = resolveWeekendDates(sat, tz);
    expect(saturday).toBe("2026-07-11");
    expect(sunday).toBe("2026-07-12");
  });

  it("uses in-progress pair when today is Sunday", () => {
    const sun = new Date("2026-07-12T10:00:00Z");
    const { saturday, sunday } = resolveWeekendDates(sun, tz);
    expect(saturday).toBe("2026-07-11");
    expect(sunday).toBe("2026-07-12");
  });

  it("uses next Sat–Sun when today is Monday", () => {
    const mon = new Date("2026-07-13T10:00:00Z");
    const { saturday, sunday } = resolveWeekendDates(mon, tz);
    expect(saturday).toBe("2026-07-18");
    expect(sunday).toBe("2026-07-19");
  });

  it("uses location timezone when visitor local day differs (AC-05)", () => {
    const instant = new Date("2026-07-13T05:00:00Z");
    const locationTz = "Europe/Kyiv";
    const visitorTz = "America/Los_Angeles";

    const locationWeekend = resolveWeekendDates(instant, locationTz);
    const visitorWeekend = resolveWeekendDates(instant, visitorTz);

    expect(locationWeekend.saturday).toBe("2026-07-18");
    expect(visitorWeekend.saturday).toBe("2026-07-11");
    expect(locationWeekend.saturday).not.toBe(visitorWeekend.saturday);
  });
});

describe("weekendHighlight", () => {
  it("computes mean of Sat and Sun comfort scores", () => {
    const days = [
      { date: "2026-07-11", comfortInput: mildDay },
      { date: "2026-07-12", comfortInput: mildDay },
    ];
    const result = weekendHighlight(
      days,
      new Date("2026-07-10T12:00:00Z"),
      "Europe/Kyiv",
    );
    expect(result).not.toBeNull();
    expect(result!.score).toBeGreaterThanOrEqual(70);
    expect(result!.saturday_date).toBe("2026-07-11");
    expect(result!.sunday_date).toBe("2026-07-12");
  });

  it("highlights location-timezone weekend not visitor timezone (AC-05)", () => {
    const instant = new Date("2026-07-13T05:00:00Z");
    const locationTz = "Europe/Kyiv";
    const days = [
      { date: "2026-07-18", comfortInput: mildDay },
      { date: "2026-07-19", comfortInput: mildDay },
      { date: "2026-07-12", comfortInput: mildDay },
      { date: "2026-07-13", comfortInput: mildDay },
    ];
    const result = weekendHighlight(days, instant, locationTz);
    expect(result).not.toBeNull();
    expect(result!.saturday_date).toBe("2026-07-18");
    expect(result!.sunday_date).toBe("2026-07-19");
  });
});
