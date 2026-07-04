import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CitySearch } from "./city-search";
import { renderWithWeather } from "@/tests/test-utils";
import { kyiv } from "@/tests/fixtures/weather";

vi.mock("@/lib/api/client", () => ({
  fetchGeocodeSuggestions: vi.fn(),
}));

import { fetchGeocodeSuggestions } from "@/lib/api/client";

describe("CitySearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows inline nothing-found when geocode returns no matches (AC-02)", async () => {
    vi.mocked(fetchGeocodeSuggestions).mockResolvedValue({ items: [], empty: true });
    renderWithWeather(<CitySearch />);

    await userEvent.type(screen.getByRole("textbox"), "xyznone");
    await vi.advanceTimersByTimeAsync(350);

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent("Нічого не знайдено");
    });
  });

  it("shows distinct retry state on provider failure (AC-02b)", async () => {
    vi.mocked(fetchGeocodeSuggestions).mockRejectedValue(new Error("503"));
    renderWithWeather(<CitySearch />);

    await userEvent.type(screen.getByRole("textbox"), "Kyiv");
    await vi.advanceTimersByTimeAsync(350);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Пошук тимчасово недоступний",
      );
      expect(screen.getByRole("button", { name: "Повторити" })).toBeInTheDocument();
    });
  });

  it("shows suggestion metadata in listbox (AC-01)", async () => {
    vi.mocked(fetchGeocodeSuggestions).mockResolvedValue({ items: [kyiv] });
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
  });

  it("selects lone suggestion when visitor presses Enter (AC-03)", async () => {
    vi.mocked(fetchGeocodeSuggestions).mockResolvedValue({ items: [kyiv] });
    renderWithWeather(<CitySearch />);

    await userEvent.type(screen.getByRole("textbox"), "Kyiv");
    await vi.advanceTimersByTimeAsync(350);

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(screen.getByRole("textbox")).toHaveValue("Kyiv");
    });
  });
});
