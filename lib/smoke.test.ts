import { describe, expect, it } from "vitest";

import { projectSlug } from "./smoke";

describe("smoke", () => {
  it("exposes the workshop project slug from framework-free lib", () => {
    expect(projectSlug()).toBe("weather-explorer");
  });
});
