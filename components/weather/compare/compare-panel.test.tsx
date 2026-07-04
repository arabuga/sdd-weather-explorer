import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ComparePanel } from "./compare-panel";
import { mockWeatherContext } from "@/tests/test-utils";

vi.mock("@/lib/api/client", () => ({
  fetchWeekendCompare: vi.fn(),
}));

vi.mock("@/components/weather/state/weather-context", () => ({
  useWeather: vi.fn(),
}));

import { useWeather } from "@/components/weather/state/weather-context";

import { fetchWeekendCompare } from "@/lib/api/client";
import { compareResponseFixture, kyiv, lviv } from "@/tests/fixtures/weather";

describe("ComparePanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows side-by-side weekend metrics for pinned cities (AC-09)", async () => {
    const setLocation = vi.fn();
    vi.mocked(fetchWeekendCompare).mockResolvedValue(compareResponseFixture);
    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({
        pins: [kyiv, lviv],
        compareOpen: true,
        setCompareOpen: vi.fn(),
        setLocation,
      }),
    );

    render(<ComparePanel />);

    await waitFor(() => {
      expect(screen.getByText("Kyiv")).toBeInTheDocument();
      expect(screen.getByText("Lviv")).toBeInTheDocument();
    });
    expect(screen.getAllByText("Субота").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Неділя").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByRole("button", { name: "Зробити активним" })).toHaveLength(2);
    expect(screen.getByText("26° / 17°C")).toBeInTheDocument();
    expect(screen.getByText("24° / 14°C")).toBeInTheDocument();
    expect(screen.getByText("20%")).toBeInTheDocument();
    expect(screen.getByText("68")).toBeInTheDocument();
    expect(document.querySelector("th.sticky")).toBeInTheDocument();
  });

  it("shows calm retry when compare fetch fails (AC-14)", async () => {
    vi.mocked(fetchWeekendCompare)
      .mockRejectedValueOnce(new Error("503"))
      .mockResolvedValueOnce(compareResponseFixture);
    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({
        pins: [kyiv, lviv],
        compareOpen: true,
        setCompareOpen: vi.fn(),
        setLocation: vi.fn(),
      }),
    );

    render(<ComparePanel />);

    await waitFor(() => {
      expect(
        screen.getByText(/Прогноз тимчасово недоступний/i),
      ).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole("button", { name: "Повторити" }));

    await waitFor(() => {
      expect(screen.getByText("Kyiv")).toBeInTheDocument();
    });
    expect(fetchWeekendCompare).toHaveBeenCalledTimes(2);
  });

  it("closes when pins drop below two while compare is open (AC-09b)", () => {
    const setCompareOpen = vi.fn();
    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({
        pins: [{ name: "Kyiv", latitude: 50.45, longitude: 30.52 }],
        compareOpen: true,
        setCompareOpen,
        setLocation: vi.fn(),
      }),
    );

    const { container } = render(<ComparePanel />);
    expect(container).toBeEmptyDOMElement();
    expect(setCompareOpen).toHaveBeenCalledWith(false);
  });
});
