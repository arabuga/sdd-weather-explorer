export type ComfortColor = "green" | "yellow" | "red";

export interface ComfortScore {
  value: number;
  rationale: string;
  color: ComfortColor;
}

export interface DailyComfortInput {
  temperature_max_c: number;
  temperature_min_c: number;
  precipitation_probability_percent: number;
  wind_speed_ms: number;
}

const RATIONALE_MAX = 80;

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function colorForScore(value: number): ComfortColor {
  if (value >= 70) return "green";
  if (value >= 40) return "yellow";
  return "red";
}

function sanitizeRationale(text: string): string {
  const cleaned = text
    .replace(/!/g, "")
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, "")
    .trim();
  if (cleaned.length <= RATIONALE_MAX) return cleaned;
  return cleaned.slice(0, RATIONALE_MAX - 1).trimEnd() + "…";
}

function buildRationale(input: DailyComfortInput, score: number): string {
  const parts: string[] = [];
  const avgTemp = (input.temperature_max_c + input.temperature_min_c) / 2;

  if (input.precipitation_probability_percent >= 60) {
    parts.push("ймовірний дощ");
  } else if (input.precipitation_probability_percent >= 30) {
    parts.push("можливий дощ");
  }

  if (input.wind_speed_ms >= 10) {
    parts.push("сильний вітер");
  } else if (input.wind_speed_ms >= 6) {
    parts.push("помірний вітер");
  }

  if (avgTemp >= 30) {
    parts.push("спека");
  } else if (avgTemp >= 22) {
    parts.push("тепло");
  } else if (avgTemp >= 12) {
    parts.push("помірна температура");
  } else if (avgTemp >= 0) {
    parts.push("прохолодно");
  } else {
    parts.push("морозно");
  }

  if (score >= 70 && parts.length === 0) {
    return sanitizeRationale("Комфортна погода для прогулянок.");
  }
  if (parts.length === 0) {
    return sanitizeRationale("Змішана погода, будьте готові до змін.");
  }

  const sentence = parts.slice(0, 2).join(", ");
  const capitalized = sentence.charAt(0).toUpperCase() + sentence.slice(1);
  return sanitizeRationale(`${capitalized}.`);
}

/** Pure comfort score from daily weather metrics — deterministic, Ukrainian rationale. */
export function comfortScore(input: DailyComfortInput): ComfortScore {
  let score = 100;
  const avgTemp = (input.temperature_max_c + input.temperature_min_c) / 2;

  // Temperature comfort band 15–26°C
  if (avgTemp < 5 || avgTemp > 32) score -= 35;
  else if (avgTemp < 10 || avgTemp > 28) score -= 20;
  else if (avgTemp < 12 || avgTemp > 26) score -= 10;

  score -= input.precipitation_probability_percent * 0.35;
  score -= Math.max(0, input.wind_speed_ms - 4) * 3;

  const value = clampScore(score);
  return {
    value,
    color: colorForScore(value),
    rationale: buildRationale(input, value),
  };
}

export { RATIONALE_MAX };
