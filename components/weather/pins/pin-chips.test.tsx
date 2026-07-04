import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PinChips } from "./pin-chips";
import { mockWeatherContext } from "@/tests/test-utils";

vi.mock("@/components/weather/state/weather-context", () => ({
  useWeather: vi.fn(),
}));

import { useWeather } from "@/components/weather/state/weather-context";

const kyiv = {
  name: "Kyiv",
  latitude: 50.45,
  longitude: 30.52,
  country: "Ukraine",
};

const lviv = {
  name: "Lviv",
  latitude: 49.84,
  longitude: 24.03,
  country: "Ukraine",
};

describe("PinChips", () => {
  it("shows compare guardrail when fewer than two pins (AC-09b)", () => {
    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({
        location: kyiv,
        pins: [kyiv],
        addPin: vi.fn(),
        removePin: vi.fn(),
        setCompareOpen: vi.fn(),
      }),
    );

    render(<PinChips />);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Потрібно щонайменше два закріплені міста",
    );
    expect(screen.getByRole("button", { name: /Порівняти вихідні/i })).toBeDisabled();
  });

  it("blocks fourth pin with max-three message (AC-10)", async () => {
    const addPin = vi.fn().mockReturnValue(false);

    vi.mocked(useWeather).mockReturnValue(
      mockWeatherContext({
        location: kyiv,
        pins: [kyiv, lviv, { name: "Odesa", latitude: 46.48, longitude: 30.73 }],
        addPin,
        removePin: vi.fn(),
        setCompareOpen: vi.fn(),
      }),
    );

    const user = userEvent.setup();
    render(<PinChips />);
    await user.click(
      screen.getAllByRole("button", { name: /Закріпити Kyiv/i })[0]!,
    );

    expect(addPin).toHaveBeenCalledWith(kyiv);
    expect(screen.getByText(/щонайбільше три/i)).toBeInTheDocument();
  });
});
