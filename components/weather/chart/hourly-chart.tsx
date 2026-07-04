"use client";

import { useWeather } from "@/components/weather/state/weather-context";
import { formatAstronomyLocalTime } from "@/lib/astronomy";
import { t } from "@/lib/i18n";

export function HourlyChart() {
  const { forecast, forecastStatus } = useWeather();

  if (forecastStatus !== "ready" || !forecast?.hourly.length) return null;

  const points = forecast.hourly.slice(0, 48);
  const temps = points.map((p) => p.temperature_c);
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const range = max - min || 1;
  const width = 600;
  const height = 120;
  const padding = 8;

  const path = points
    .map((p, i) => {
      const x = padding + (i / (points.length - 1)) * (width - padding * 2);
      const y =
        height -
        padding -
        ((p.temperature_c - min) / range) * (height - padding * 2);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-32 w-full"
        role="img"
        aria-label="Графік температури на 48 годин"
      >
        <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
      </svg>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>
          {t("forecast.sunrise")}:{" "}
          {formatAstronomyLocalTime(forecast.astronomy.sunrise)}
        </span>
        <span>
          {t("forecast.sunset")}:{" "}
          {formatAstronomyLocalTime(forecast.astronomy.sunset)}
        </span>
      </div>
    </div>
  );
}
