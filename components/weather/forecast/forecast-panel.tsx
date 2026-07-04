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

type ComfortColor = keyof typeof comfortColors;

function ComfortBadge({
  value,
  rationale,
  color,
  compact = false,
  layout = "stack",
}: {
  value: number;
  rationale: string;
  color: ComfortColor;
  compact?: boolean;
  layout?: "stack" | "inline";
}) {
  const scoreClass = compact ? "size-9 text-xs" : "size-10 text-sm";
  const score = (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold tabular-nums ${scoreClass} ${comfortColors[color]}`}
      aria-hidden={layout === "inline"}
    >
      {value}
    </span>
  );
  const text = (
    <p
      className={`leading-snug ${compact ? "text-center text-[11px] text-balance" : "text-sm"} ${layout === "inline" ? "" : "text-center text-balance"}`}
    >
      {rationale}
    </p>
  );

  if (layout === "inline") {
    return (
      <div
        className="flex items-center gap-3"
        aria-label={`${value}: ${rationale}`}
      >
        {score}
        {text}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center ${compact ? "gap-1 pt-1" : "gap-2"}`}
      aria-label={`${value}: ${rationale}`}
    >
      {score}
      {text}
    </div>
  );
}

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
          <ComfortBadge
            value={forecast.weekend_highlight.score}
            rationale={forecast.weekend_highlight.rationale}
            color={
              forecast.weekend_highlight.score >= 70
                ? "green"
                : forecast.weekend_highlight.score >= 40
                  ? "yellow"
                  : "red"
            }
            layout="inline"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4">
        {forecast.days.map((day) => (
          <Card key={day.date} className="min-h-[160px]">
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
              <ComfortBadge
                value={day.comfort.value}
                rationale={day.comfort.rationale}
                color={day.comfort.color}
                compact
              />
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
          <Skeleton key={i} className="h-[160px] w-full" />
        ))}
      </div>
    </div>
  );
}
