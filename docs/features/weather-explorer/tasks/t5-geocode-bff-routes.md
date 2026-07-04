---
id: T5
title: "Expose geocode suggestions and reverse-geocode BFF routes with shared errors"
layer: ports
deps: ["T4"]
acs: ["AC-01", "AC-02", "AC-02b", "AC-03", "AC-06", "AC-06b"]
files_hint: ["app/api/v1/geocode/", "lib/errors/"]
owner: "TBD lead"
estimate: "M"
status: "todo"
---

# T5 — Geocode BFF routes + shared errors

## Why

Derives from [openapi.yaml](../contracts/openapi.yaml) geocode paths, [sad §6 Flow 1](../sad.md), and search/map error ACs.

## What

- `lib/errors/` — typed error codes matching OpenAPI (`geocode.provider_unavailable`, `geocode.reverse_failed`, etc.).
- `app/api/v1/geocode/suggestions/route.ts` — GET handler per OpenAPI.
- `app/api/v1/geocode/reverse/route.ts` — GET handler per OpenAPI.
- Handler-level or route tests (Vitest) for 200 empty list, 503, 422 reverse failure.

## Definition of Done

- [ ] GET suggestions returns `GeocodeSuggestionList`; empty query results in 200 with zero items (AC-02 path).
- [ ] Provider failure returns 503 with distinct code (AC-02b server side).
- [ ] Reverse success returns `ActiveLocation`; failure returns 422 without throwing (AC-06b server side).
- [ ] Handler tests pass; lint + tsc clean.

## Notes

First BFF task — shared `lib/errors` types live here (compile-coupled with later routes via shared error module, not a standalone contract task).

Default edge rate limit: document generous anonymous threshold in route comment or env example (spec §8 OQ resolution).
