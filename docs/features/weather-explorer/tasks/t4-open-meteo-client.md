---
id: T4
title: "Build server-only Open-Meteo geocode and forecast client wrappers"
layer: infra
deps: []
acs: []
files_hint: ["lib/weather/"]
owner: "TBD lead"
estimate: "M"
status: "todo"
---

# T4 — Open-Meteo client wrappers

## Why

Derives from [ADR-0002](../adr/0002-proxy-open-meteo-through-server-bff.md) and [sad §5](../sad.md) — server-side adapters before BFF routes.

## What

- `lib/weather/geocode.ts` — forward geocode via Open-Meteo; **reverse geocode via Nominatim** (OpenStreetMap) with required User-Agent.
- `lib/weather/forecast.ts` — daily + hourly (48 points from local midnight) + astronomy fields needed by OpenAPI `ForecastBundle`.
- `lib/weather/types.ts` — internal DTOs mapped from Open-Meteo JSON.
- Vitest with mocked `fetch` for success, empty, and HTTP error paths.
- Mark module server-only (document in file header; no client imports).

## Definition of Done

- [ ] Vitest maps sample Open-Meteo JSON to internal DTOs for geocode and forecast.
- [ ] Vitest covers network/HTTP failure propagation for BFF error mapping in T5/T6.
- [ ] No `next/*` or `react` imports in `lib/weather/`.
- [ ] lint + tsc clean.

## Notes

Can start in parallel with T1–T3. Does not call comfort scoring — that stays in route handlers (T6).
