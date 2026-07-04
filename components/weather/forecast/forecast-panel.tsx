"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useWeather } from "@/components/weather/state/weather-context";
import { t, uk } from "@/lib/i18n";
import { FORECAST_DAY_CARD_COUNT } from "@/lib/ui/forecast-layout";
import { weatherIconGlyph, weatherIconLabel } from "@/lib/weather/display";

const comfortColors = {
  green: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  yellow: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
  red: "bg-red-500/20 text-red-700 dark:text-red-300",
};

function weekdayUk(en: string): string {
  return uk.weekdays[en as keyof typeof uk.weekdays] ?? en;
}

export function ForecastPanel() {
  const { forecast, forecastStatus, reloadForecast } = useWeather();

  if (forecastStatus === "loading" || forecastStatus === "idle") {
    return <ForecastSkeleton />;
  }

  if (forecastStatus === "error") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-8 text-sm text-muted-foreground">
          <p>{t("forecast.providerUnavailable")}</p>
          <button
            type="button"
            className="text-primary underline-offset-2 hover:underline"
            onClick={() => void reloadForecast()}
          >
            {t("search.retry")}
          </button>
        </CardContent>
      </Card>
    );
  }

  if (!forecast) return null;

  return (
    <div className="space-y-4">
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle>{t("forecast.weekendHighlight")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${comfortColors[forecast.weekend_highlight.score >= 70 ? "green" : forecast.weekend_highlight.score >= 40 ? "yellow" : "red"]}`}
            >
              {forecast.weekend_highlight.score}
            </span>
            <p className="text-sm">{forecast.weekend_highlight.rationale}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4">
        {forecast.days.map((day) => (
          <Card key={day.date} className="min-h-[140px]">
            <CardHeader className="pb-1">
              <CardTitle className="flex items-center justify-between gap-2">
                <span>{weekdayUk(day.weekday)}</span>
                <span
                  className="text-lg"
                  aria-label={weatherIconLabel(day.weather_icon)}
                  title={weatherIconLabel(day.weather_icon)}
                >
                  {weatherIconGlyph(day.weather_icon)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                {Math.round(day.temperature_max_c)}° / {Math.round(day.temperature_min_c)}°C
              </p>
              <p className="text-muted-foreground">
                {day.precipitation_probability_percent}% · {day.wind_speed_ms.toFixed(1)} m/s
              </p>
              <div
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${comfortColors[day.comfort.color]}`}
              >
                {day.comfort.value} — {day.comfort.rationale}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ForecastSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label={t("forecast.loading")}>
      <Skeleton className="h-20 w-full" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3">
        {Array.from({ length: FORECAST_DAY_CARD_COUNT }).map((_, i) => (
          <Skeleton key={i} className="h-[140px] w-full" />
        ))}
      </div>
    </div>
  );
}
