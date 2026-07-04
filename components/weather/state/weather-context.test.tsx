import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { WeatherProvider, useWeather } from "./weather-context";
import {
  resetWindowLocation,
  searchParamsForLocation,
  setWindowLocationSearch,
} from "@/tests/test-utils";
import { buildForecastFixture, kyiv, lviv } from "@/tests/fixtures/weather";

vi.mock("@/lib/api/client", () => ({
  fetchForecast: vi.fn(),
  fetchGeocodeSuggestions: vi.fn(),
  fetchReverseGeocode: vi.fn(),
  fetchWeekendCompare: vi.fn(),
}));

import { fetchForecast } from "@/lib/api/client";

function LocationProbe() {
  const { location, forecast, forecastStatus, pins, compareOpen } = useWeather();
  return (
    <div>
      <span data-testid="location">{location?.name ?? "none"}</span>
      <span data-testid="forecast-status">{forecastStatus}</span>
      <span data-testid="forecast-location">{forecast?.location.name ?? "none"}</span>
      <span data-testid="pins-count">{pins.length}</span>
      <span data-testid="compare-open">{compareOpen ? "yes" : "no"}</span>
    </div>
  );
}

function LocationDriver() {
  const { setLocation, addPin, setCompareOpen } = useWeather();
  return (
    <div>
      <button type="button" onClick={() => setLocation(kyiv)}>
        select-kyiv
      </button>
      <button type="button" onClick={() => setLocation(lviv)}>
        select-lviv
      </button>
      <button type="button" onClick={() => addPin(kyiv)}>
        pin-kyiv
      </button>
      <button type="button" onClick={() => setCompareOpen(true)}>
        open-compare
      </button>
    </div>
  );
}

describe("WeatherProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetWindowLocation();
  });

  it("restores active location from shareable URL on mount (AC-08)", async () => {
    setWindowLocationSearch(searchParamsForLocation(kyiv));
    vi.mocked(fetchForecast).mockResolvedValue(buildForecastFixture(kyiv));

    render(
      <WeatherProvider>
        <LocationProbe />
      </WeatherProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("location")).toHaveTextContent("Kyiv");
      expect(screen.getByTestId("forecast-status")).toHaveTextContent("ready");
    });
    expect(fetchForecast).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Kyiv",
        latitude: 50.45,
        longitude: 30.52,
      }),
    );
    expect(screen.getByTestId("pins-count")).toHaveTextContent("0");
    expect(screen.getByTestId("compare-open")).toHaveTextContent("no");
  });

  it("discards stale forecast when location changes before fetch completes (AC-04b)", async () => {
    let resolveKyiv!: (value: ReturnType<typeof buildForecastFixture>) => void;
    const kyivDeferred = new Promise<ReturnType<typeof buildForecastFixture>>(
      (resolve) => {
        resolveKyiv = resolve;
      },
    );

    vi.mocked(fetchForecast)
      .mockReturnValueOnce(kyivDeferred)
      .mockResolvedValueOnce(buildForecastFixture(lviv));

    render(
      <WeatherProvider>
        <LocationDriver />
        <LocationProbe />
      </WeatherProvider>,
    );

    await userEvent.click(screen.getByRole("button", { name: "select-kyiv" }));
    await userEvent.click(screen.getByRole("button", { name: "select-lviv" }));

    await waitFor(() => {
      expect(screen.getByTestId("location")).toHaveTextContent("Lviv");
      expect(screen.getByTestId("forecast-status")).toHaveTextContent("ready");
      expect(screen.getByTestId("forecast-location")).toHaveTextContent("Lviv");
    });

    resolveKyiv(buildForecastFixture(kyiv));
    await waitFor(() => {
      expect(screen.getByTestId("forecast-location")).toHaveTextContent("Lviv");
    });
  });

  it("starts with empty pins and compare on fresh mount even with URL location (AC-10b)", async () => {
    setWindowLocationSearch(searchParamsForLocation(kyiv));
    vi.mocked(fetchForecast).mockResolvedValue(buildForecastFixture(kyiv));

    const first = render(
      <WeatherProvider>
        <LocationDriver />
        <LocationProbe />
      </WeatherProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("location")).toHaveTextContent("Kyiv");
    });

    await userEvent.click(screen.getByRole("button", { name: "pin-kyiv" }));
    await userEvent.click(screen.getByRole("button", { name: "open-compare" }));

    expect(screen.getByTestId("pins-count")).toHaveTextContent("1");
    expect(screen.getByTestId("compare-open")).toHaveTextContent("yes");

    first.unmount();

    render(
      <WeatherProvider>
        <LocationProbe />
      </WeatherProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("location")).toHaveTextContent("Kyiv");
    });
    expect(screen.getByTestId("pins-count")).toHaveTextContent("0");
    expect(screen.getByTestId("compare-open")).toHaveTextContent("no");
  });
});
