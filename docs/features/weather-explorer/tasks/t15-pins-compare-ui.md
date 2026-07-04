---
id: T15
title: "Implement pin chips and weekend compare table with guardrails"
layer: ui
deps: ["T7", "T11", "T8"]
acs: ["AC-09", "AC-09b", "AC-10", "AC-10b"]
files_hint: ["components/weather/compare/", "components/weather/pins/"]
owner: "TBD lead"
estimate: "M"
status: "todo"
---

# T15 — Pins + weekend compare UI

## Why

Derives from [Flow 2](../sad.md), [Compare guardrails flow](../sad.md), and US-05 ACs.

## What

- `components/weather/pins/` — chip list in **search column below geolocation**; max three pins; block fourth with inline message (AC-10).
- `components/weather/compare/` — weekend compare panel **below map** in map column; calls `POST /api/v1/forecast/weekend-compare`.
- Compare trigger button in pin chips block (disabled when <2 pins).
- Side-by-side Sat/Sun table with temp, precip, comfort; sticky city headers with promote-to-active control (AC-09).
- Disable compare when fewer than two pins (AC-09b); clear pins on refresh (AC-10b).

See [ui.md](../ui.md) for placement diagram.

## Definition of Done

- [ ] Compare opens only with ≥2 pins; message when unavailable (AC-09b).
- [ ] Fourth pin attempt blocked with clear copy (AC-10).
- [ ] Page refresh clears pins and compare; URL location still restored (AC-10b).
- [ ] Compare table matches AC-09 column requirements.
- [ ] lint + tsc clean.

## Notes

Pins live in client memory only — no localStorage (spec §8 resolved). Reuses T8 `Card` for compare table.
