import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { GeolocationControl } from "./geolocation-control";
import { mockWeatherContext } from "@/tests/test-utils";
import { kyiv } from "@/tests/fixtures/weather";

vi.mock("@/lib/api/client", () => ({
  fetchReverseGeocode: vi.fn(),
  ApiClientError: class ApiClientError extends Error {
    constructor(
      message: string,
      readonly status: number,
    ) {
      super(message);
    }
  },
}));

vi.mock("@/components/weather/state/weather-context", async () => {
  const actual = await vi.importActual<
    typeof import("@/components/weather/state/weather-context")
  >("@/components/weather/state/weather-context");
  return { ...actual, useWeather: vi.fn() };
});

import { useWeather } from "@/components/weather/state/weather-context";

describe("GeolocationControl", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows calm guidance when permission is denied (AC-11b)", async () => {
    const setLocation = vi.fn();
    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({ location: kyiv, setLocation }),
    );

    const getCurrentPosition = vi.fn((_success, error) => {
      error?.({ code: 1, message: "denied" });
    });
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: { getCurrentPosition },
    });

    render(<GeolocationControl />);
    await userEvent.click(
      screen.getByRole("button", { name: /Моє місцезнаходження/i }),
    );

    expect(setLocation).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toHaveTextContent(
      /Доступ до геолокації не надано/i,
    );
  });

  it("sets active location when geolocation and reverse geocode succeed (AC-11)", async () => {
    const setLocation = vi.fn();
    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({ location: null, setLocation }),
    );

    const { fetchReverseGeocode } = await import("@/lib/api/client");
    vi.mocked(fetchReverseGeocode).mockResolvedValue(kyiv);

    const getCurrentPosition = vi.fn((success) => {
      success?.({
        coords: { latitude: kyiv.latitude, longitude: kyiv.longitude },
      });
    });
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: { getCurrentPosition },
    });

    render(<GeolocationControl />);
    await userEvent.click(
      screen.getByRole("button", { name: /Моє місцезнаходження/i }),
    );

    expect(fetchReverseGeocode).toHaveBeenCalledWith(
      kyiv.latitude,
      kyiv.longitude,
    );
    expect(setLocation).toHaveBeenCalledWith(kyiv);
  });

  it("offers retry when reverse geocode fails after geolocation (AC-14)", async () => {
    const setLocation = vi.fn();
    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({ location: kyiv, setLocation }),
    );

    const { fetchReverseGeocode } = await import("@/lib/api/client");
    vi.mocked(fetchReverseGeocode)
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValueOnce(kyiv);

    const getCurrentPosition = vi.fn((success) => {
      success?.({ coords: { latitude: 50.45, longitude: 30.52 } });
    });
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: { getCurrentPosition },
    });

    render(<GeolocationControl />);
    await userEvent.click(
      screen.getByRole("button", { name: /Моє місцезнаходження/i }),
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      /Не вдалося визначити назву місця/i,
    );
    await userEvent.click(screen.getByRole("button", { name: /Повторити/i }));
    expect(setLocation).toHaveBeenCalledWith(kyiv);
  });
});
