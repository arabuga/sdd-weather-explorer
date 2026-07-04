---
id: T12
title: "Add forty-eight-hour hourly temperature chart with sunrise and sunset"
layer: ui
deps: ["T6", "T11"]
acs: ["AC-04"]
files_hint: ["components/weather/chart/"]
owner: "TBD lead"
estimate: "S"
status: "todo"
---

# T12 — Hourly temperature chart

## Why

Completes the hourly portion of [AC-04](../spec.md) below the day-card grid.

## What

- `components/weather/chart/` — client component rendering 48 hours from **local midnight (00:00)** in the active location timezone.
- Uses hourly series from forecast payload (same fetch as T11 or shared hook); BFF slices 48 points from first `T00:00` in `lib/weather/forecast.ts`.
- SVG area chart with gradient fill, min/max labels, x-axis hour ticks every 6 hours (see [ui.md](../ui.md)).
- Astronomy row below chart: sunrise chip, daylight duration, sunset chip — **no** markers overlaid on the chart line.

## Definition of Done

- [ ] Chart spans 48 hourly points anchored to local 00:00 (not current clock hour).
- [ ] X-axis shows hour labels (6-hour step + final hour); astronomy chip row visible beneath chart.
- [ ] Renders calm empty state when hourly data missing (no console errors).
- [ ] lint + tsc clean.

## Notes

Keep chart library lightweight to respect NFR initial JS ≤200 KB gzipped — prefer minimal SVG/canvas over heavy charting deps.
