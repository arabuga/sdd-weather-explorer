## Summary

Ships **weather-explorer** — a privacy-first, Ukrainian-first weekend trip weather planner. Anonymous visitors pick a city (search, map, or opt-in geolocation), read seven-day comfort-scored forecasts with a highlighted upcoming weekend verdict, pin up to three cities for side-by-side comparison, and share the active location via URL. No accounts, cookies, analytics, or paid API keys.

Spec: [docs/features/weather-explorer/spec.md](docs/features/weather-explorer/spec.md)

## Acceptance criteria

- AC-01 — City search with debounced suggestions (city, region, country, flag) sets active location ✓
- AC-02 / AC-02b — Inline nothing-found and retry states for geocoding failures ✓
- AC-03 — Lone suggestion selectable via Enter ✓
- AC-04 / AC-04b / AC-04c / AC-05 — Seven-day forecast, weekend highlight, skeleton loading, location-TZ weekend pair ✓
- AC-06 / AC-06b / AC-07 — Map click reverse-geocode, error retry, OSM attribution ✓
- AC-08 — Shareable URL restores active location and forecast ✓
- AC-09 / AC-09b / AC-10 / AC-10b — Weekend compare (2–3 pins), pin limit, session-only pins ✓
- AC-11 / AC-11b / AC-12 — Opt-in geolocation only, calm deny guidance, no auth wall ✓
- AC-13 / AC-14 / AC-15 / AC-16 — Weather background, calm error states, reduced-motion static gradient, responsive hero ✓
- AC-17 / AC-18 — Footer credits + jokes; comfort badge colours and rationale invariant ✓

## Design

- Spec: `docs/features/weather-explorer/spec.md`
- Architecture: `docs/features/weather-explorer/sad.md`
- Decisions: `docs/features/weather-explorer/adr/`
- Data model + migration: none
- API: `docs/features/weather-explorer/contracts/openapi.yaml`

## Tasks (SDD-Task trailers)

No git history in this workspace yet. Tasks T1–T18 are all `done` per `docs/features/weather-explorer/tasks/tracker.md`. Expected commit trailers when history is initialised:

| Task | Title |
|---|---|
| T1 | i18n catalogues + footer jokes |
| T2 | Comfort scoring + weekend highlight |
| T3 | URL location codec |
| T4 | Open-Meteo client wrappers |
| T5 | Geocode BFF routes |
| T6 | Forecast BFF route |
| T7 | Weekend-compare BFF route |
| T8 | shadcn Input, Card, Skeleton |
| T9 | Shell, hero, footer |
| T10 | City search combobox |
| T11 | Forecast panel + skeleton |
| T12 | Hourly temperature chart |
| T13 | Client-only map |
| T14 | URL state wiring |
| T15 | Pins + compare UI |
| T16 | Geolocation control |
| T17 | Background + local clock |
| T18 | Main page composition |

## Verification

- Unit + component: **100/100 passed** (`npm test`, 29 files)
- Integration: BFF route tests + OpenAPI contract validation (ajv)
- Lint + vet: ESLint clean; `tsc --noEmit` clean; `npm run build` green (122 kB first-load JS)
- Ran the feature (localhost:3001):
  - **AC-01:** typed «Lviv» → suggestions with city/region/country → selected → active location set, forecast loading
  - **AC-04:** seven day cards with °C, precip %, wind; weekend headline «Складні умови на вихідні»
  - **AC-08:** pasted share URL in fresh load → Lviv restored with forecast and map marker
  - **AC-11:** first load shows «Моє місцезнаходження» button only — no automatic geolocation prompt
  - **AC-07:** map shows «© OpenStreetMap contributors» attribution
  - **AC-16:** hero with centred search, no default city on empty load

Review gate: PASS — `docs/features/weather-explorer/_review/review-2026-07-04-pass6.md`

Repository: https://github.com/arabuga/sdd-weather-explorer

## Operational notes

- Migration: none
- Feature flag / config: none
- Deploy: Vercel target; ensure Open-Meteo and Nominatim reachability from serverless functions
