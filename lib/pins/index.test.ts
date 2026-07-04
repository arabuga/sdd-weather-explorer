import { describe, expect, it } from "vitest";

import {
  addPinToList,
  canAddPin,
  canOpenCompare,
  MAX_PINS,
  MIN_COMPARE_PINS,
} from "./index";

const loc = (name: string, lat: number, lon: number) => ({
  name,
  latitude: lat,
  longitude: lon,
});

describe("pin guardrails", () => {
  it("allows up to three pins", () => {
    expect(canAddPin(0)).toBe(true);
    expect(canAddPin(2)).toBe(true);
    expect(canAddPin(MAX_PINS - 1)).toBe(true);
    expect(canAddPin(MAX_PINS)).toBe(false);
  });

  it("requires at least two pins for compare", () => {
    expect(canOpenCompare(0)).toBe(false);
    expect(canOpenCompare(1)).toBe(false);
    expect(canOpenCompare(MIN_COMPARE_PINS)).toBe(true);
    expect(canOpenCompare(3)).toBe(true);
  });

  it("blocks fourth pin", () => {
    const pins = [
      loc("A", 50, 30),
      loc("B", 51, 31),
      loc("C", 52, 32),
    ];
    const result = addPinToList(pins, loc("D", 53, 33));
    expect(result.added).toBe(false);
    expect(result.pins).toHaveLength(3);
  });

  it("deduplicates by coordinates", () => {
    const pins = [loc("Kyiv", 50.45, 30.52)];
    const result = addPinToList(pins, loc("Kyiv dup", 50.45, 30.52));
    expect(result.added).toBe(false);
    expect(result.pins).toHaveLength(1);
  });
});
