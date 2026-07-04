import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";

import {
  WeatherProvider,
  type WeatherContextValue,
} from "@/components/weather/state/weather-context";
import { encodeLocationSearchParams } from "@/lib/url-state";
import type { ActiveLocation } from "@/lib/url-state";

export function renderWithWeather(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <WeatherProvider>{children}</WeatherProvider>;
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

export function mockWeatherContext(
  value: Partial<WeatherContextValue>,
): WeatherContextValue {
  return value as WeatherContextValue;
}

export function setWindowLocationSearch(search: string): void {
  Object.defineProperty(window, "location", {
    value: {
      href: `http://localhost/${search}`,
      search,
    },
    writable: true,
    configurable: true,
  });
}

export function searchParamsForLocation(location: ActiveLocation): string {
  return `?${encodeLocationSearchParams(location).toString()}`;
}

export function resetWindowLocation(): void {
  setWindowLocationSearch("");
}
