import { describe, expect, it } from "vitest";

import { selectFooterJoke } from "./index";

describe("footer jokes", () => {
  it("is deterministic for same date and location", () => {
    const ctx = { date: "2026-07-04", locationName: "Kyiv" };
    const a = selectFooterJoke(ctx);
    const b = selectFooterJoke(ctx);
    expect(a).toBe(b);
    expect(a.length).toBeGreaterThan(0);
  });

  it("may differ for different locations on same date", () => {
    const a = selectFooterJoke({ date: "2026-07-04", locationName: "Kyiv" });
    const b = selectFooterJoke({ date: "2026-07-04", locationName: "Lviv" });
    // Not guaranteed different, but both must be valid catalogue entries
    expect(a).toBeTruthy();
    expect(b).toBeTruthy();
  });
});
