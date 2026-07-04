---
id: T6
title: "Expose forecast BFF route with comfort scores and weekend highlight"
layer: ports
deps: ["T2", "T4"]
acs: ["AC-04", "AC-05", "AC-18"]
files_hint: ["app/api/v1/forecast/route.ts"]
owner: "TBD lead"
estimate: "M"
status: "todo"
---

# T6 — Forecast BFF route

## Why

Derives from [openapi.yaml](../contracts/openapi.yaml) `GET /api/v1/forecast`, [Flow 1](../sad.md), and forecast ACs.

## What

- `app/api/v1/forecast/route.ts` — loads forecast via T4, runs T2 scoring, returns `ForecastBundle`.
- Maps daily rows, hourly series, astronomy, weekend highlight per OpenAPI schema.
- Route tests with mocked weather client + scoring inputs.

## Definition of Done

- [ ] Response matches OpenAPI `ForecastBundle` shape including comfort on each day.
- [ ] Weekend highlight uses location timezone rules from T2 (AC-05).
- [ ] Provider outage returns 503 `forecast.provider_unavailable` (AC-14 server path).
- [ ] Route tests pass; lint + tsc clean.

## Notes

Reuses `lib/errors` from T5 — serialize after T5 or share gate if both touched in one session.
