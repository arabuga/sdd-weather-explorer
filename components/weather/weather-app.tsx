"use client";

import { WeatherBackground } from "@/components/weather/background/weather-background";
import { ComparePanel } from "@/components/weather/compare/compare-panel";
import { HourlyChart } from "@/components/weather/chart/hourly-chart";
import { ForecastPanel } from "@/components/weather/forecast/forecast-panel";
import { GeolocationControl } from "@/components/weather/geolocation/geolocation-control";
import { WeatherMap } from "@/components/weather/map/weather-map";
import { PinChips } from "@/components/weather/pins/pin-chips";
import { CitySearch } from "@/components/weather/search/city-search";
import { WeatherShell } from "@/components/weather/shell/weather-shell";
import { WeatherProvider, useWeather } from "@/components/weather/state/weather-context";
import { t } from "@/lib/i18n";

function SearchBlock() {
  const { location } = useWeather();
  return (
    <div className="space-y-3">
      {!location && (
        <>
          <h1 className="text-2xl font-semibold text-balance">{t("app.tagline")}</h1>
          <p className="text-muted-foreground">{t("app.heroEmpty")}</p>
        </>
      )}
      <CitySearch />
      <GeolocationControl />
      {location && <PinChips />}
    </div>
  );
}

function ForecastBlock() {
  return (
    <>
      <ForecastPanel />
      <HourlyChart />
    </>
  );
}

function WeatherAppInner() {
  return (
    <WeatherShell
      background={<WeatherBackground />}
      header={null}
      search={<SearchBlock />}
      forecast={<ForecastBlock />}
      map={<WeatherMap />}
      compare={<ComparePanel />}
    />
  );
}

export function WeatherApp() {
  return (
    <WeatherProvider>
      <WeatherAppInner />
    </WeatherProvider>
  );
}
