import { screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { WeatherMapInner } from "./weather-map-inner";
import { useWeather } from "@/components/weather/state/weather-context";
import {
  renderWithWeather,
  searchParamsForLocation,
  setWindowLocationSearch,
} from "@/tests/test-utils";
import { buildForecastFixture, kyiv } from "@/tests/fixtures/weather";

export const mapClickRef: {
  current: ((lat: number, lon: number) => void) | null;
} = { current: null };

vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children: ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: ({ attribution }: { attribution?: string }) => (
    <div data-testid="tile-layer" data-attribution={attribution ?? ""} />
  ),
  Marker: ({ children }: { children: ReactNode }) => (
    <div data-testid="map-marker">{children}</div>
  ),
  Popup: ({ children }: { children: ReactNode }) => <span>{children}</span>,
  useMap: () => ({ setView: vi.fn() }),
  useMapEvents: (handlers: {
    click?: (event: { latlng: { lat: number; lng: number } }) => void;
  }) => {
    if (handlers.click) {
      mapClickRef.current = (lat, lon) =>
        handlers.click!({ latlng: { lat, lng: lon } });
    }
    return null;
  },
}));

vi.mock("leaflet", () => ({
  default: {
    icon: vi.fn(() => ({})),
  },
}));

vi.mock("@/lib/api/client", () => ({
  fetchReverseGeocode: vi.fn(),
  fetchForecast: vi.fn(),
  ApiClientError: class ApiClientError extends Error {
    constructor(
      message: string,
      readonly status: number,
    ) {
      super(message);
    }
  },
}));

import { fetchForecast, fetchReverseGeocode, ApiClientError } from "@/lib/api/client";

function LocationName() {
  const { location } = useWeather();
  return <span data-testid="active-name">{location?.name ?? "none"}</span>;
}

describe("WeatherMapInner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mapClickRef.current = null;
  });

  it("always shows OpenStreetMap attribution in map area (AC-07)", () => {
    renderWithWeather(<WeatherMapInner />);

    expect(screen.getByTestId("tile-layer")).toHaveAttribute(
      "data-attribution",
      expect.stringContaining("OpenStreetMap"),
    );
    expect(screen.getByText(/OpenStreetMap/i)).toBeInTheDocument();
  });

  it("sets active location on successful map click (AC-06)", async () => {
    vi.mocked(fetchReverseGeocode).mockResolvedValue(kyiv);
    vi.mocked(fetchForecast).mockResolvedValue(buildForecastFixture(kyiv));

    renderWithWeather(
      <>
        <WeatherMapInner />
        <LocationName />
      </>,
    );

    mapClickRef.current?.(50.45, 30.52);

    await waitFor(() => {
      expect(screen.getByTestId("active-name")).toHaveTextContent("Kyiv");
    });
    expect(fetchReverseGeocode).toHaveBeenCalledWith(50.45, 30.52);
    expect(screen.getByTestId("map-marker")).toBeInTheDocument();
  });

  it("keeps prior location and shows retry on reverse-geocode failure (AC-06b)", async () => {
    setWindowLocationSearch(searchParamsForLocation(kyiv));
    vi.mocked(fetchForecast).mockResolvedValue(buildForecastFixture(kyiv));
    vi.mocked(fetchReverseGeocode).mockRejectedValue(
      new ApiClientError("fail", 422),
    );

    renderWithWeather(
      <>
        <WeatherMapInner />
        <LocationName />
      </>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("active-name")).toHaveTextContent("Kyiv");
    });

    mapClickRef.current?.(48.0, 32.0);

    await waitFor(() => {
      expect(
        screen.getByText(/Не вдалося визначити назву місця/i),
      ).toBeInTheDocument();
    });
    expect(screen.getByTestId("active-name")).toHaveTextContent("Kyiv");
    expect(screen.getByRole("button", { name: "Повторити" })).toBeInTheDocument();
  });
});
