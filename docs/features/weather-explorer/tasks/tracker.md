# Tracker — weather-explorer

> Status of every task in the epic. `implement` updates `done` as it commits each task.
> States: `todo` · `in_progress` · `blocked` · `review` · `done`.

| # | Task | Layer | Owner | Estimate | Blocked by | Status |
|---|---|---|---|---|---|---|
| T1 | i18n catalogues + footer jokes | domain | TBD lead | S | — | done |
| T2 | Comfort scoring + weekend highlight | domain | TBD lead | M | — | done |
| T3 | URL location codec | domain | TBD lead | S | — | done |
| T4 | Open-Meteo client wrappers | infra | TBD lead | M | — | done |
| T5 | Geocode BFF routes + errors | ports | TBD lead | M | T4 | done |
| T6 | Forecast BFF route | ports | TBD lead | M | T2, T4 | done |
| T7 | Weekend-compare BFF route | ports | TBD lead | S | T2, T4 | done |
| T8 | shadcn Input, Card, Skeleton | ui | TBD lead | S | — | done |
| T9 | Shell, hero, footer | ui | TBD lead | M | T1, T8 | done |
| T10 | City search combobox | ui | TBD lead | M | T5, T9 | done |
| T11 | Forecast panel + skeleton | ui | TBD lead | M | T6, T9, T8 | done |
| T12 | Hourly temperature chart | ui | TBD lead | S | T6, T11 | done |
| T13 | Client-only map | ui | TBD lead | M | T5, T9 | done |
| T14 | URL state wiring | wiring | TBD lead | M | T3, T10, T11 | done |
| T15 | Pins + compare UI | ui | TBD lead | M | T7, T11, T8 | done |
| T16 | Geolocation control | ui | TBD lead | S | T5, T10 | done |
| T17 | Background + local clock | ui | TBD lead | M | T11, T9 | done |
| T18 | Main page composition | wiring | TBD lead | M | T10–T17 | done |

**Review remediation pass 2 (2026-07-04):** All 7 pass-2 review findings addressed — astronomy display TZ, geo reverse-failure copy, compare stale panel, OpenAPI timezone + local datetime shapes, contract validation (ajv), component tests (8), smoke e2e-through-UI (2). Gate: **73 tests**, lint, build green.

**Review remediation pass 3 (2026-07-04):** Expanded UI test matrix per pass-3 review — component/integration tests for AC-03/04/04b/06/06b/07/08/09/10b/11b/13/15/16/17; smoke e2e-through-UI expanded to 5 flows. Gate: **90 tests**, lint, build green.

**Review remediation pass 4 (2026-07-04):** Closed hard test-plan gaps AC-12 + AC-14 — smoke flow asserts anonymous MVP surfaces (search, geo, pins, compare, map) with no auth wall; forecast-panel error state asserts calm copy + retry. Gate: **92 tests**, lint, tsc, build green. Partial assertion gaps (AC-04/09/16/…) deferred per user scope.

**Review remediation pass 5 (2026-07-04):** Closed pass-5 review findings — compare panel retry on fetch failure; strengthened tests for AC-01/04/05/09/13/14/16/18 (suggestion metadata, day-card fields, TZ contrast, compare metrics, gradient/animation, responsive grid, comfort badge colours); smoke console hygiene spy. Gate: **100 tests**, lint, tsc green.

**Total:** 18 tasks, ~14–18 person-days (M epic, dual surface: web-frontend + backend-service).
