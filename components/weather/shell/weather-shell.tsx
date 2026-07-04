"use client";

import type { ReactNode } from "react";

import { WeatherFooter } from "@/components/weather/footer/weather-footer";
import { useWeather } from "@/components/weather/state/weather-context";

interface WeatherShellProps {
  search: ReactNode;
  forecast: ReactNode;
  map: ReactNode;
  compare: ReactNode;
  background?: ReactNode;
  header?: ReactNode;
}

export function WeatherShell({
  search,
  forecast,
  map,
  compare,
  background,
  header,
}: WeatherShellProps) {
  const { location } = useWeather();

  return (
    <div className="relative flex min-h-screen flex-col">
      {background}
      <div className="relative z-10 flex flex-1 flex-col">
        {header}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
          <div
            className={
              location
                ? "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)]"
                : "flex flex-col items-center justify-center py-16"
            }
          >
            <section
              className={
                location
                  ? "space-y-4 md:col-start-1 md:row-start-1 xl:col-start-1"
                  : "w-full max-w-lg space-y-4 text-center"
              }
              aria-label="Пошук"
            >
              {search}
            </section>

            {location && (
              <>
                <section
                  className="space-y-4 md:col-start-1 md:row-start-2 xl:col-start-2 xl:row-start-1"
                  aria-label="Прогноз"
                >
                  {forecast}
                </section>
                <section
                  className="space-y-4 md:col-start-2 md:row-start-1 md:row-span-2 xl:col-start-3 xl:row-start-1"
                  aria-label="Карта"
                >
                  {map}
                  {compare}
                </section>
              </>
            )}
          </div>
        </main>
        <WeatherFooter locationName={location?.name ?? "Ukraine"} />
      </div>
    </div>
  );
}
