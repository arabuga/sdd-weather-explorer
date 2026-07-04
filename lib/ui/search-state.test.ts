import { describe, expect, it } from "vitest";

import { classifySearchOutcome } from "./search-state";

describe("classifySearchOutcome", () => {
  it("returns empty for zero matches on success", () => {
    expect(classifySearchOutcome(0, false)).toBe("empty");
  });

  it("returns error for provider failures distinct from empty", () => {
    expect(classifySearchOutcome(0, true)).toBe("error");
    expect(classifySearchOutcome(3, true)).toBe("error");
  });

  it("returns results when items exist", () => {
    expect(classifySearchOutcome(1, false)).toBe("results");
  });
});
