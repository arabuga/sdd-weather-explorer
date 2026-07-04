import { describe, expect, it } from "vitest";

import { forecastSkeletonCardCount, FORECAST_DAY_CARD_COUNT } from "./forecast-layout";
import { t } from "@/lib/i18n";

describe("forecast layout", () => {
  it("uses seven day-card placeholders matching loaded grid", () => {
    expect(forecastSkeletonCardCount()).toBe(FORECAST_DAY_CARD_COUNT);
    expect(FORECAST_DAY_CARD_COUNT).toBe(7);
  });
});

describe("map attribution copy", () => {
  it("includes OpenStreetMap contributor text", () => {
    expect(t("map.attribution")).toMatch(/OpenStreetMap/i);
  });
});
