---
id: T11
title: "Render forecast day cards, weekend highlight, and loading skeleton"
layer: ui
deps: ["T6", "T9", "T8"]
acs: ["AC-04", "AC-04b", "AC-04c", "AC-05", "AC-18"]
files_hint: ["components/weather/forecast/"]
owner: "TBD lead"
estimate: "M"
status: "todo"
---

# T11 — Forecast panel + skeleton

## Why

Derives from [AC-04](../spec.md) family and [Flow 1](../sad.md) — core decision surface.

## What

- `components/weather/forecast/` — fetches `GET /api/v1/forecast` when active location set.
- Seven day cards: weekday, high/low °C, icon, precip %, wind, comfort badge (stacked: circle score + rationale below — see [ui.md](../ui.md)).
- Weekend highlight headline = mean Sat–Sun comfort at top of grid; **inline** badge layout (score left, rationale right).
- Skeleton grid matching loaded footprint while loading (AC-04c).
- In-memory cache keyed by location; discard on location change (AC-04b).

## Definition of Done

- [ ] Loaded view satisfies AC-04 field list (chart deferred to T12).
- [ ] Skeleton shown during fetch, not empty gap (AC-04c).
- [ ] Location change clears cached forecast before reload (AC-04b).
- [ ] Comfort badge follows AC-18 color and copy rules.
- [ ] lint + tsc clean.

## Notes

Reuses T8 `Card` and `Skeleton`; optional Badge primitive inline or via shadcn add.
