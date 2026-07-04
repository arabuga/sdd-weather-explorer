---
id: T7
title: "Expose weekend-compare BFF route for two or three pinned cities"
layer: ports
deps: ["T2", "T4"]
acs: ["AC-09"]
files_hint: ["app/api/v1/forecast/weekend-compare/route.ts"]
owner: "TBD lead"
estimate: "S"
status: "todo"
---

# T7 — Weekend-compare BFF route

## Why

Derives from [openapi.yaml](../contracts/openapi.yaml) `POST /api/v1/forecast/weekend-compare` and [Flow 2](../sad.md).

## What

- `app/api/v1/forecast/weekend-compare/route.ts` — accepts 2–3 locations, fetches forecasts in parallel via T4, computes weekend metrics via T2.
- Returns `WeekendCompareResponse` per OpenAPI.
- Route test for valid 2-city request and 400 when fewer than two locations.

## Definition of Done

- [ ] POST with two or three locations returns side-by-side Sat/Sun metrics per city (AC-09 data layer).
- [ ] POST with one location returns 400.
- [ ] Route tests pass; lint + tsc clean.

## Notes

UI guardrails for compare availability (AC-09b) are client-side in T15; BFF still validates minimum count.
