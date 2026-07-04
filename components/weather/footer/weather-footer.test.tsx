import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WeatherFooter } from "./weather-footer";

describe("WeatherFooter", () => {
  it("shows hyperlinked provider credits and a deterministic joke (AC-17)", () => {
    const { container } = render(<WeatherFooter locationName="Kyiv" />);

    const openMeteo = screen.getByRole("link", { name: "Open-Meteo" });
    const osm = screen.getByRole("link", { name: "OpenStreetMap" });

    expect(openMeteo).toHaveAttribute("href", "https://open-meteo.com/");
    expect(osm).toHaveAttribute(
      "href",
      "https://www.openstreetmap.org/copyright",
    );
    expect(container.querySelector("footer p.italic")?.textContent?.length).toBeGreaterThan(0);
  });
});
