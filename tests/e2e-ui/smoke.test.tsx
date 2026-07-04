import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CitySearch } from "@/components/weather/search/city-search";
import { GeolocationControl } from "@/components/weather/geolocation/geolocation-control";
import { PinChips } from "@/components/weather/pins/pin-chips";
import { ComparePanel } from "@/components/weather/compare/compare-panel";
import { useWeather } from "@/components/weather/state/weather-context";
import { WeatherApp } from "@/components/weather/weather-app";
import { renderWithWeather } from "@/tests/test-utils";

vi.mock("@/components/weather/map/weather-map", () => ({
  WeatherMap: () => <div data-testid="weather-map">map</div>,
}));

vi.mock("@/lib/api/client", () => ({
  fetchGeocodeSuggestions: vi.fn(),
  fetchForecast: vi.fn(),
  fetchReverseGeocode: vi.fn(),
  fetchWeekendCompare: vi.fn(),
}));

import {
  fetchForecast,
  fetchGeocodeSuggestions,
  fetchWeekendCompare,
} from "@/lib/api/client";

import { kyiv, lviv, buildForecastFixture, compareResponseFixture } from "@/tests/fixtures/weather";
import {
  resetWindowLocation,
  searchParamsForLocation,
  setWindowLocationSearch,
} from "@/tests/test-utils";

describe("e2e-through-UI smoke flows", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers({ shouldAdvanceTime: true });
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    resetWindowLocation();
  });

  afterEach(() => {
    vi.useRealTimers();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it("search selection triggers forecast load (AC-01)", async () => {
    vi.mocked(fetchGeocodeSuggestions).mockResolvedValue({ items: [kyiv] });
    vi.mocked(fetchForecast).mockResolvedValue(buildForecastFixture(kyiv));

    renderWithWeather(<CitySearch />);
    await userEvent.type(screen.getByRole("textbox"), "Kyiv");
    await vi.advanceTimersByTimeAsync(350);

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    const option = screen.getByRole("option");
    expect(option).toHaveTextContent("Kyiv");
    expect(option).toHaveTextContent("Kyiv City");
    expect(option).toHaveTextContent("Ukraine");
    expect(option).toHaveTextContent("🇺🇦");

    await userEvent.click(option);
    await waitFor(() => {
      expect(fetchForecast).toHaveBeenCalledWith(
        expect.objectContaining({ name: "Kyiv" }),
      );
    });
  });

  it("geolocation is not requested until the visitor clicks the control (AC-11)", async () => {
    const getCurrentPosition = vi.fn();
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: { getCurrentPosition },
    });

    renderWithWeather(<GeolocationControl />);
    expect(getCurrentPosition).not.toHaveBeenCalled();

    await userEvent.click(
      screen.getByRole("button", { name: /Моє місцезнаходження/i }),
    );
    expect(getCurrentPosition).toHaveBeenCalledTimes(1);
  });

  it("restores shareable URL location without pins on load (AC-08)", async () => {
    setWindowLocationSearch(searchParamsForLocation(kyiv));
    vi.mocked(fetchForecast).mockResolvedValue(buildForecastFixture(kyiv));

    renderWithWeather(<LocationProbe />);

    await waitFor(() => {
      expect(screen.getByTestId("location")).toHaveTextContent("Kyiv");
    });
    expect(fetchForecast).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Kyiv" }),
    );
    expect(screen.getByTestId("pins-count")).toHaveTextContent("0");
  });

  it("opens weekend compare after pinning two cities (AC-09)", async () => {
    vi.mocked(fetchForecast).mockResolvedValue(buildForecastFixture(kyiv));
    vi.mocked(fetchWeekendCompare).mockResolvedValue(compareResponseFixture);

    renderWithWeather(
      <>
        <LocationDriver />
        <PinChips />
        <ComparePanel />
      </>,
    );

    await userEvent.click(screen.getByRole("button", { name: /select-kyiv/i }));
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Закріпити Kyiv/i })).toBeInTheDocument();
    });
    await userEvent.click(screen.getByRole("button", { name: /Закріпити Kyiv/i }));
    await userEvent.click(screen.getByRole("button", { name: /select-lviv/i }));
    await userEvent.click(screen.getByRole("button", { name: /Закріпити Lviv/i }));
    await userEvent.click(screen.getByRole("button", { name: /Порівняти вихідні/i }));

    await waitFor(() => {
      expect(screen.getAllByText("Субота").length).toBeGreaterThanOrEqual(2);
    });
  });

  it("shows calm guidance when geolocation permission is denied (AC-11b)", async () => {
    const getCurrentPosition = vi.fn((_success, error) => {
      error?.({ code: 1, message: "denied" });
    });
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: { getCurrentPosition },
    });

    renderWithWeather(<GeolocationControl />);
    await userEvent.click(
      screen.getByRole("button", { name: /Моє місцезнаходження/i }),
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      /Доступ до геолокації не надано/i,
    );
  });

  it("exposes MVP surfaces without login or subscription gate (AC-12)", async () => {
    setWindowLocationSearch(searchParamsForLocation(kyiv));
    vi.mocked(fetchForecast).mockResolvedValue(buildForecastFixture(kyiv));

    render(<WeatherApp />);

    await waitFor(() => {
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    expect(
      screen.queryByText(/sign in|log in|login|subscribe|увійти|підписк|реєстрац/i),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Моє місцезнаходження/i }),
    ).toBeEnabled();
    expect(screen.getByRole("button", { name: /Закріпити Kyiv/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Порівняти вихідні/i }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("weather-map")).toBeInTheDocument();
  });
});

function LocationProbe() {
  const { location, pins } = useWeather();
  return (
    <div>
      <span data-testid="location">{location?.name ?? "none"}</span>
      <span data-testid="pins-count">{pins.length}</span>
    </div>
  );
}

function LocationDriver() {
  const { setLocation } = useWeather();
  return (
    <div>
      <button type="button" onClick={() => setLocation(kyiv)}>
        select-kyiv
      </button>
      <button type="button" onClick={() => setLocation(lviv)}>
        select-lviv
      </button>
    </div>
  );
}
