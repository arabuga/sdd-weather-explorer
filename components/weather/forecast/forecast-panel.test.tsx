import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ForecastPanel } from "./forecast-panel";
import type { ForecastBundle } from "@/lib/weather/bundle";
import { mockWeatherContext } from "@/tests/test-utils";

vi.mock("@/components/weather/state/weather-context", () => ({
  useWeather: vi.fn(),
}));

import { useWeather } from "@/components/weather/state/weather-context";

const mockForecast: ForecastBundle = {
  location: { name: "Kyiv", latitude: 50.45, longitude: 30.52 },
  timezone: "Europe/Kyiv",
  weekend_highlight: {
    score: 72,
    rationale: "Комфортно для прогулянок.",
    saturday_date: "2026-07-11",
    sunday_date: "2026-07-12",
  },
  days: Array.from({ length: 7 }, (_, i) => ({
    date: `2026-07-${String(i + 4).padStart(2, "0")}`,
    weekday: "Friday",
    temperature_max_c: 25,
    temperature_min_c: 15,
    precipitation_probability_percent: 10,
    wind_speed_ms: 3,
    weather_icon: "clear",
    comfort: { value: 70, rationale: "Комфортно.", color: "green" as const },
  })),
  hourly: [{ time: "2026-07-04T12:00", temperature_c: 22 }],
  astronomy: { sunrise: "2026-07-04T05:30", sunset: "2026-07-04T21:15" },
};

describe("ForecastPanel", () => {
  it("renders loading skeleton with forecast card footprint (AC-04c)", () => {
    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({
        forecast: null,
        forecastStatus: "loading",
        reloadForecast: vi.fn(),
      }),
    );

    render(<ForecastPanel />);
    expect(screen.getByLabelText("Завантаження прогнозу")).toBeInTheDocument();
  });

  it("renders seven day cards with full forecast fields (AC-04)", () => {
    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({
        forecast: mockForecast,
        forecastStatus: "ready",
        reloadForecast: vi.fn(),
      }),
    );

    render(<ForecastPanel />);
    expect(screen.getAllByLabelText("Ясно")).toHaveLength(7);
    expect(screen.getAllByText("25° / 15°C")).toHaveLength(7);
    expect(screen.getAllByText(/10% · 3\.0 m\/s/)).toHaveLength(7);
    expect(screen.getAllByText("70 — Комфортно.")).toHaveLength(7);
  });

  it("renders weather icon on each day card (AC-04)", () => {
    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({
        forecast: mockForecast,
        forecastStatus: "ready",
        reloadForecast: vi.fn(),
      }),
    );

    render(<ForecastPanel />);
    expect(screen.getAllByLabelText("Ясно")).toHaveLength(7);
  });

  it("renders weekend highlight headline with combined score (AC-04)", () => {
    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({
        forecast: mockForecast,
        forecastStatus: "ready",
        reloadForecast: vi.fn(),
      }),
    );

    render(<ForecastPanel />);
    expect(screen.getByText("Вихідні")).toBeInTheDocument();
    expect(screen.getByText("72")).toBeInTheDocument();
    expect(screen.getByText("Комфортно для прогулянок.")).toBeInTheDocument();
  });

  it("shows calm retry when forecast provider fails (AC-14)", async () => {
    const reloadForecast = vi.fn();
    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({
        forecast: null,
        forecastStatus: "error",
        reloadForecast,
      }),
    );

    render(<ForecastPanel />);
    expect(
      screen.getByText(/Прогноз тимчасово недоступний/i),
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Повторити" }));
    expect(reloadForecast).toHaveBeenCalledTimes(1);
  });

  it("renders comfort badge colours at component layer (AC-18)", () => {
    const multiColorForecast: ForecastBundle = {
      ...mockForecast,
      days: [
        {
          ...mockForecast.days[0],
          date: "2026-07-04",
          comfort: { value: 75, rationale: "Добре.", color: "green" },
        },
        {
          ...mockForecast.days[1],
          date: "2026-07-05",
          comfort: { value: 55, rationale: "Помірно.", color: "yellow" },
        },
        {
          ...mockForecast.days[2],
          date: "2026-07-06",
          comfort: { value: 30, rationale: "Складно.", color: "red" },
        },
        ...mockForecast.days.slice(3),
      ],
    };

    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({
        forecast: multiColorForecast,
        forecastStatus: "ready",
        reloadForecast: vi.fn(),
      }),
    );

    const { container } = render(<ForecastPanel />);
    expect(container.querySelector(".bg-emerald-500\\/20")).toBeInTheDocument();
    expect(container.querySelector(".bg-amber-500\\/20")).toBeInTheDocument();
    expect(container.querySelector(".bg-red-500\\/20")).toBeInTheDocument();
  });
});
