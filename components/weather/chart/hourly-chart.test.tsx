import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { HourlyChart } from "./hourly-chart";
import { mockWeatherContext } from "@/tests/test-utils";
import { buildForecastFixture, kyiv } from "@/tests/fixtures/weather";

vi.mock("@/components/weather/state/weather-context", () => ({
  useWeather: vi.fn(),
}));

import { useWeather } from "@/components/weather/state/weather-context";

describe("HourlyChart", () => {
  it("renders 48-hour chart and location-local sunrise/sunset (AC-04)", () => {
    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({
        forecast: buildForecastFixture(kyiv),
        forecastStatus: "ready",
      }),
    );

    render(<HourlyChart />);
    expect(
      screen.getByRole("img", { name: "Температура на 48 годин" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Схід сонця")).toBeInTheDocument();
    expect(screen.getByText("05:30")).toBeInTheDocument();
    expect(screen.getByText("Світанок")).toBeInTheDocument();
    expect(screen.getByText("Захід сонця")).toBeInTheDocument();
    expect(screen.getByText("21:15")).toBeInTheDocument();
    expect(screen.getByText("Сутінки")).toBeInTheDocument();
    expect(screen.getByText("Світловий день")).toBeInTheDocument();
    expect(screen.getByText("15 год 45 хв")).toBeInTheDocument();
    expect(screen.getAllByText("00:00").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("06:00").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("12:00").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("23:00")).toBeInTheDocument();
  });
});
