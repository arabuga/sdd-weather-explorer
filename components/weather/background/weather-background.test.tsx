import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { WeatherBackground } from "./weather-background";
import { mockWeatherContext } from "@/tests/test-utils";
import { buildForecastFixture, kyiv } from "@/tests/fixtures/weather";

vi.mock("@/components/weather/state/weather-context", () => ({
  useWeather: vi.fn(),
}));

import { useWeather } from "@/components/weather/state/weather-context";

describe("WeatherBackground", () => {
  it("shows local clock and theme indicator when forecast is loaded (AC-13)", () => {
    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({
        location: kyiv,
        forecast: buildForecastFixture(kyiv),
        forecastStatus: "ready",
      }),
    );

    render(<WeatherBackground />);
    expect(document.querySelector("time")).toBeInTheDocument();
    expect(screen.getByLabelText(/День|Ніч/i)).toBeInTheDocument();
  });

  it("applies condition-driven gradient and animation (AC-13)", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });

    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({
        location: kyiv,
        forecast: buildForecastFixture(kyiv),
        forecastStatus: "ready",
      }),
    );

    const { container } = render(<WeatherBackground />);
    const layer = container.querySelector("[aria-hidden]") as HTMLElement;
    expect(layer.style.background).toMatch(/38bdf8|rgb\(56,\s*189,\s*248\)/);
    expect(layer.style.animation).toContain("pulse");
  });

  it("uses static gradient without animation when reduced motion is preferred (AC-15)", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: (query: string) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });

    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({
        location: kyiv,
        forecast: buildForecastFixture(kyiv),
        forecastStatus: "ready",
      }),
    );

    const { container } = render(<WeatherBackground />);
    const layer = container.querySelector("[aria-hidden]") as HTMLElement;
    expect(layer.style.animation).toBe("");
  });
});
