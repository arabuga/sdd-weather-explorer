import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { GeolocationControl } from "./geolocation-control";
import { mockWeatherContext } from "@/tests/test-utils";
import { kyiv } from "@/tests/fixtures/weather";

vi.mock("@/lib/api/client", () => ({
  fetchReverseGeocode: vi.fn(),
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
});
