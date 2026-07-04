import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { WeatherShell } from "./weather-shell";
import { mockWeatherContext } from "@/tests/test-utils";

vi.mock("@/components/weather/state/weather-context", () => ({
  useWeather: vi.fn(),
}));

import { useWeather } from "@/components/weather/state/weather-context";

describe("WeatherShell", () => {
  it("shows centred hero layout when no active location (AC-16)", () => {
    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({ location: null }),
    );

    const { container } = render(
      <WeatherShell
        search={<div>search-box</div>}
        forecast={<div>forecast</div>}
        map={<div>map</div>}
        compare={<div>compare</div>}
      />,
    );

    expect(screen.getByText("search-box")).toBeInTheDocument();
    expect(screen.queryByText("forecast")).not.toBeInTheDocument();
    expect(container.querySelector(".py-16")).toBeInTheDocument();
  });

  it("uses responsive grid columns when location is active (AC-16)", () => {
    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({
        location: { name: "Kyiv", latitude: 50.45, longitude: 30.52 },
      }),
    );

    const { container } = render(
      <WeatherShell
        search={<div>search-box</div>}
        forecast={<div>forecast</div>}
        map={<div>map</div>}
        compare={<div>compare</div>}
      />,
    );

    const grid = container.querySelector("main .grid");
    expect(grid?.className).toContain("md:grid-cols-2");
    expect(grid?.className).toContain("xl:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)]");
    expect(screen.getByText("forecast")).toBeInTheDocument();
  });
});
