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

- `components/weather/chart/` — client component rendering 48 hours from active location's current local hour.
- Uses hourly series from forecast payload (same fetch as T11 or shared hook).
- Shows today's sunrise and sunset under the chart from astronomy fields.

## Definition of Done

- [ ] Chart spans 48 hourly points anchored to location local time.
- [ ] Sunrise/sunset labels visible beneath chart when astronomy data present.
- [ ] Renders calm empty state when hourly data missing (no console errors).
- [ ] lint + tsc clean.

## Notes

Keep chart library lightweight to respect NFR initial JS ≤200 KB gzipped — prefer minimal SVG/canvas over heavy charting deps.
