import type { WeatherIcon } from "./types";

export const WEATHER_ICON_GLYPH: Record<WeatherIcon, string> = {
  clear: "☀",
  partly_cloudy: "⛅",
  cloudy: "☁",
  fog: "🌫",
  drizzle: "🌦",
  rain: "🌧",
  snow: "❄",
  thunderstorm: "⛈",
};

export const WEATHER_ICON_LABEL_UK: Record<WeatherIcon, string> = {
  clear: "Ясно",
  partly_cloudy: "Мінлива хмарність",
  cloudy: "Хмарно",
  fog: "Туман",
  drizzle: "Мряка",
  rain: "Дощ",
  snow: "Сніг",
  thunderstorm: "Гроза",
};

export function weatherIconGlyph(icon: string): string {
  if (icon in WEATHER_ICON_GLYPH) {
    return WEATHER_ICON_GLYPH[icon as WeatherIcon];
  }
  return "🌡";
}

export function weatherIconLabel(icon: string): string {
  if (icon in WEATHER_ICON_LABEL_UK) {
    return WEATHER_ICON_LABEL_UK[icon as WeatherIcon];
  }
  return "Погода";
}
