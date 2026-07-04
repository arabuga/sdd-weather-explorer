"use client";

import { useWeather } from "@/components/weather/state/weather-context";
import {
  formatAstronomyLocalTime,
  formatDaylightDurationUk,
} from "@/lib/astronomy";
import { t } from "@/lib/i18n";

const CHART_WIDTH = 600;
const PLOT_TOP = 12;
const PLOT_HEIGHT = 96;
const LABEL_Y = PLOT_TOP + PLOT_HEIGHT + 16;
const CHART_HEIGHT = LABEL_Y + 4;
const PADDING = 12;
const HOUR_TICK_STEP = 6;

function xForIndex(index: number, count: number): number {
  if (count <= 1) return PADDING;
  return PADDING + (index / (count - 1)) * (CHART_WIDTH - PADDING * 2);
}

function formatHourLabel(isoTime: string): string {
  const timePart = isoTime.includes("T") ? isoTime.split("T")[1] : isoTime;
  const [hours = "0", minutes = "00"] = timePart.split(":");
  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
}

function hourTickIndices(pointCount: number): number[] {
  if (pointCount <= 1) return [0];
  const indices: number[] = [0];
  for (let i = HOUR_TICK_STEP; i < pointCount; i += HOUR_TICK_STEP) {
    indices.push(i);
  }
  const last = pointCount - 1;
  if (indices[indices.length - 1] !== last) {
    indices.push(last);
  }
  return indices;
}

function AstronomyChip({
  icon,
  label,
  hint,
  time,
}: {
  icon: string;
  label: string;
  hint: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-muted/40 px-3 py-2.5">
      <span className="text-lg leading-none" aria-hidden>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="font-mono text-sm tabular-nums">{time}</p>
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      </div>
    </div>
  );
}

export function HourlyChart() {
  const { forecast, forecastStatus } = useWeather();

  if (forecastStatus !== "ready" || !forecast?.hourly.length) return null;

  const points = forecast.hourly.slice(0, 48);
  const temps = points.map((p) => p.temperature_c);
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const range = max - min || 1;

  const coords = points.map((p, i) => {
    const x = xForIndex(i, points.length);
    const y =
      PLOT_TOP +
      PLOT_HEIGHT -
      ((p.temperature_c - min) / range) * PLOT_HEIGHT;
    return { x, y };
  });

  const linePath = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${PLOT_TOP + PLOT_HEIGHT} L ${coords[0].x} ${PLOT_TOP + PLOT_HEIGHT} Z`;

  const sunriseTime = formatAstronomyLocalTime(forecast.astronomy.sunrise);
  const sunsetTime = formatAstronomyLocalTime(forecast.astronomy.sunset);
  const daylight = formatDaylightDurationUk(
    forecast.astronomy.sunrise,
    forecast.astronomy.sunset,
  );

  const hourTicks = hourTickIndices(points.length);

  const gridLines = [0.25, 0.5, 0.75].map((ratio) => {
    const y = PLOT_TOP + ratio * PLOT_HEIGHT;
    return (
      <line
        key={ratio}
        x1={PADDING}
        y1={y}
        x2={CHART_WIDTH - PADDING}
        y2={y}
        stroke="currentColor"
        strokeOpacity={0.08}
        strokeWidth={1}
      />
    );
  });

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold">{t("forecast.hourlyTitle")}</h3>
        <p className="text-xs text-muted-foreground">
          {Math.round(min)}° – {Math.round(max)}°C
        </p>
      </div>

      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="h-40 w-full text-foreground"
        role="img"
        aria-label={t("forecast.hourlyTitle")}
      >
        <defs>
          <linearGradient id="hourly-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        {gridLines}
        <path d={areaPath} fill="url(#hourly-fill)" />
        <path
          d={linePath}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <text
          x={PADDING}
          y={PLOT_TOP + 4}
          fontSize={10}
          fill="currentColor"
          fillOpacity={0.5}
        >
          {Math.round(max)}°
        </text>
        <text
          x={PADDING}
          y={PLOT_TOP + PLOT_HEIGHT - 2}
          fontSize={10}
          fill="currentColor"
          fillOpacity={0.5}
        >
          {Math.round(min)}°
        </text>
        {hourTicks.map((index) => {
          const x = xForIndex(index, points.length);
          return (
            <g key={index}>
              <line
                x1={x}
                y1={PLOT_TOP + PLOT_HEIGHT}
                x2={x}
                y2={PLOT_TOP + PLOT_HEIGHT + 4}
                stroke="currentColor"
                strokeOpacity={0.25}
                strokeWidth={1}
              />
              <text
                x={x}
                y={LABEL_Y}
                textAnchor="middle"
                fontSize={10}
                fill="currentColor"
                fillOpacity={0.55}
                className="tabular-nums"
              >
                {formatHourLabel(points[index].time)}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
        <AstronomyChip
          icon="🌅"
          label={t("forecast.sunriseCaption")}
          hint={t("forecast.sunriseHint")}
          time={sunriseTime}
        />
        {daylight && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 px-3 py-2 text-center">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {t("forecast.daylightLabel")}
            </p>
            <p className="text-sm font-semibold tabular-nums">{daylight}</p>
          </div>
        )}
        <AstronomyChip
          icon="🌇"
          label={t("forecast.sunsetCaption")}
          hint={t("forecast.sunsetHint")}
          time={sunsetTime}
        />
      </div>
    </div>
  );
}
