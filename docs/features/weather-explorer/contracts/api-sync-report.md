# API sync report — weather-explorer

Generated: 2026-07-04  
Contract: `openapi.yaml` v0.1.0  
Inputs: `spec.md`, `sad.md` §6, `CONTEXT.md`, `architecture-map.md`

## Gate notes

- **`data-model.md`:** absent — **legal fast-lane skip** (no schema change; stateless MVP per SAD §7 and repo ADR-0003).
- **Field origins:** derived from `CONTEXT.md` glossary + `spec.md` §5 AC shapes + `sad.md` §6 error branches.
- **`target_surfaces`:** `[web-frontend, backend-service]` — this OpenAPI describes the **backend BFF** consumed by the web UI.
- **`events.md`:** not produced — no async message-bus flows in MVP sequences.

## Section A — field origins

| schema_path | origin | confidence |
|---|---|---|
| ActiveLocation.name | CONTEXT «active location» + AC-01 suggestion fields | high |
| ActiveLocation.latitude/longitude | ADR-0003 URL query state + AC-08 shareable view | high |
| ActiveLocation.admin_region/country/flag_emoji | AC-01 suggestion display | high |
| ComfortScore.value | CONTEXT «comfort score» 0–100 | high |
| ComfortScore.rationale | AC-18 max 80 Ukrainian chars | high |
| ComfortScore.color | AC-18 green/yellow/red thresholds | high |
| WeekendHighlight.score | CONTEXT «weekend highlight» mean Sat+Sun | high |
| WeekendHighlight.saturday_date/sunday_date | AC-05 timezone rule | high |
| ForecastBundle.days | AC-04 seven day cards | high |
| ForecastBundle.hourly | AC-04 forty-eight hour chart | high |
| ForecastBundle.astronomy | AC-04 sunrise/sunset | high |
| ForecastBundle.timezone | AC-05, AC-13 location TZ | high |
| GeocodeSuggestionList.empty | AC-02 zero-match inline state | medium |
| WeekendCompareRequest.locations | AC-09 pins 2–3 cities | high |
| Error.code geocode.not_found | implied by AC-02 (UI uses empty list; optional explicit code) | medium |
| Error.code geocode.provider_unavailable | AC-02b sequence branch | high |
| Error.code geocode.reverse_failed | AC-06b sequence branch | high |
| Error.code forecast.provider_unavailable | AC-14 sequence branch | high |
| Error.code compare.too_few_locations | AC-09b | high |
| Error.code compare.too_many_locations | AC-10 | high |

## Section B — drift checklist

| # | Check | Result | Notes |
|---|---|---|---|
| 1 | Endpoint ↔ schema / user stories | ✓ | 4 operations map to US-01, US-02, US-03, US-05. US-04/06 reuse geocode+forecast. US-07/08 are client-only (non-runtime). |
| 2 | Error code ↔ repo registry | ✓ | No error registry in greenfield repo yet — codes are **contract proposal**; reconcile at implement in `lib/errors` or equivalent. |
| 3 | Validation ↔ constraints | ✓ | maxLength/enum/min/max aligned with AC-18 and CONTEXT; no DB constraints apply. |
| 4 | OpenAPI ↔ sequence | ✓ | §6 alt branches for provider outage, reverse failure, compare guardrails have matching responses. AC-11b geolocation denied is browser-only — non-runtime N/A. |

## AC → operation coverage

| AC | Operation / branch |
|---|---|
| AC-01, AC-03 | `GET /geocode/suggestions` 200 |
| AC-02 | `GET /geocode/suggestions` 200 + `empty: true` |
| AC-02b | `GET /geocode/suggestions` 503 `geocode.provider_unavailable` |
| AC-04, AC-05, AC-18 | `GET /forecast` 200 |
| AC-04b | Client cache — non-API |
| AC-04c | UI skeleton — non-API loading state |
| AC-06 | `GET /geocode/reverse` 200 + `GET /forecast` |
| AC-06b | `GET /geocode/reverse` 422 |
| AC-07 | UI map attribution — non-API |
| AC-08 | `GET /forecast` with URL params |
| AC-09 | `POST /forecast/weekend-compare` 200 |
| AC-09b | `POST /forecast/weekend-compare` 400 `compare.too_few_locations` |
| AC-10 | `POST /forecast/weekend-compare` 400 `compare.too_many_locations` |
| AC-10b | Client refresh — non-API |
| AC-11, AC-11b | Browser geolocation — non-API |
| AC-12 | All operations `security: []` |
| AC-13, AC-15, AC-16 | UI/render — non-API |
| AC-14 | `GET /forecast` 503, geocode 503 |
| AC-17 | Static footer in UI — non-API |

## Flags / follow-ups

- **No spectral lint wired** — suggest adding `@stoplight/spectral-cli` or redocly to CI when scaffold lands.
- **Error codes are proposals** until `implement` creates the repo registry.
- **Sequence gap:** none blocking — client-only ACs documented as non-runtime N/A.

## Reconcile

Run `/sdd:api weather-explorer --reconcile` after `data-model.md` appears (unlikely for this feature) or when implement adds error constants.
