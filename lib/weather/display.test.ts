import { describe, expect, it } from "vitest";

import { weatherIconGlyph, weatherIconLabel } from "./display";

describe("weather display helpers", () => {
  it("maps known icons to glyphs and Ukrainian labels", () => {
    expect(weatherIconGlyph("clear")).toBe("☀");
    expect(weatherIconLabel("clear")).toBe("Ясно");
  });

  it("falls back for unknown icons", () => {
    expect(weatherIconGlyph("unknown")).toBe("🌡");
    expect(weatherIconLabel("unknown")).toBe("Погода");
  });
});
