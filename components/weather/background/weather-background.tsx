"use client";

import { useEffect, useState } from "react";

import { useWeather } from "@/components/weather/state/weather-context";
import {
  formatLocationTime,
  isLocationNight,
  themeIndicator,
} from "@/lib/astronomy";
import { t } from "@/lib/i18n";

function gradientForCondition(icon: string | undefined, isNight: boolean): string {
  if (isNight) {
    return "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #312e81 100%)";
  }
  switch (icon) {
    case "clear":
      return "linear-gradient(135deg, #38bdf8 0%, #fde68a 100%)";
    case "rain":
    case "drizzle":
    case "thunderstorm":
      return "linear-gradient(135deg, #64748b 0%, #334155 100%)";
    case "snow":
      return "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)";
    case "fog":
    case "cloudy":
    case "partly_cloudy":
    default:
      return "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)";
  }
}

export function WeatherBackground() {
  const { forecast, location } = useWeather();
  const [localTime, setLocalTime] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [theme, setTheme] = useState<"day" | "night">("day");

  const timezone = forecast?.timezone ?? "UTC";
  const sunrise = forecast?.astronomy.sunrise ?? "";
  const sunset = forecast?.astronomy.sunset ?? "";

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!location || !forecast) {
      setLocalTime("");
      return;
    }
    const tick = () => {
      const now = new Date();
      setLocalTime(formatLocationTime(now, timezone));
      setTheme(themeIndicator(now, sunrise, sunset, timezone));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [location, forecast, timezone, sunrise, sunset]);

  const today = forecast?.days[0];
  const isNight =
    forecast != null
      ? isLocationNight(new Date(), sunrise, sunset, timezone)
      : false;

  const gradient = gradientForCondition(today?.weather_icon, isNight);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        style={{
          background: gradient,
          animation: reducedMotion ? undefined : "pulse 8s ease-in-out infinite alternate",
        }}
        aria-hidden
      />
      <header className="relative z-10 flex items-center justify-between border-b border-border/50 px-4 py-3 backdrop-blur-sm">
        <span className="text-sm font-medium">Weather Explorer</span>
        {location && forecast && (
          <div className="flex items-center gap-3">
            <span
              className="rounded-full border border-border/60 bg-card/80 px-2 py-0.5 text-xs text-muted-foreground"
              aria-label={theme === "night" ? t("theme.night") : t("theme.day")}
            >
              {theme === "night" ? "🌙" : "☀️"}{" "}
              {theme === "night" ? t("theme.night") : t("theme.day")}
            </span>
            <time className="font-mono text-sm tabular-nums" aria-live="polite">
              {localTime}
            </time>
          </div>
        )}
      </header>
    </>
  );
}
