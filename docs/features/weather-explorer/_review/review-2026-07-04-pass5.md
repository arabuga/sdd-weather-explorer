---
status: Final
reviewer: "SDD review gate — independent reviewer subagent (pass 5) + host synthesis"
date: "2026-07-04"
review_pass: 5
feature_size: "M"
route: "standard"
scope: "Re-review after pass-4 AC-12/AC-14 remediation (no git repository)"
gate_result: "CHANGES REQUESTED"
---

# Review — weather-explorer (2026-07-04, pass 5)

## Scope

- **Diff:** Full implemented tree after pass-4 remediation.
- **Build gate:** `npm test` — **92/92 passed** (29 files); lint + tsc green.
- **Prior:** Pass 4 fixed hard blockers AC-12 and AC-14; partial assertion gaps deferred.

## Pass 4 → Pass 5 delta

| Area | Pass 4 (post-remediation) | Pass 5 |
|---|---|---|
| AC-12 (no auth gate) | Fixed | **Verified** — genuine full-app smoke test |
| AC-14 (forecast failure UI) | Fixed | **Verified** — calm retry + `reloadForecast` |
| Full AC implementation chain | Pass | **Pass** — all 22 ACs reach code |
| Partial test assertions | Deferred | **Still open** — user chose fix now |
| Compare failure retry | Not flagged | **New finding** — user chose fix now |
| Console hygiene automation | Not flagged | **New finding** — user chose fix now |

## Findings

### Stage 1 — spec / AC compliance

- **[stage-1] AC-12 remediation verified** — `tests/e2e-ui/smoke.test.tsx:144-165`; AC: AC-12; problem: none; suggested: none.

- **[stage-1] AC-14 forecast retry verified** — `components/weather/forecast/forecast-panel.test.tsx:80-96`; AC: AC-14; problem: none for primary forecast path; suggested: none.

- **[stage-1] AC-01 suggestion metadata untested in UI** — `components/weather/search/city-search.tsx:114-118`; AC: AC-01; problem: smoke only asserts `fetchForecast` call, not region/country/flag in listbox; suggested: extend smoke or city-search test.

- **[stage-1] AC-04 day-card fields partially asserted** — `components/weather/forecast/forecast-panel.test.tsx:52-63`; AC: AC-04; problem: icons only — no °C, precip, wind, comfort badge, or seven-card count; suggested: extend loaded-state test.

- **[stage-1] AC-05 covered at unit layer only** — `lib/scoring/comfort.test.ts:57-87`; AC: AC-05; problem: no cross-layer TZ contrast test; suggested: add boundary case with visitor TZ ≠ location TZ.

- **[stage-1] AC-09 compare metrics shallowly asserted** — `components/weather/compare/compare-panel.test.tsx:39-45`; AC: AC-09; problem: labels only, not temp/precip/comfort values or sticky header; suggested: assert fixture values.

- **[stage-1] AC-13 condition-driven animation untested** — `components/weather/background/weather-background.test.tsx:15-27`; AC: AC-13; problem: clock/theme only; gradient/animation not checked; suggested: assert gradient by condition.

- **[stage-1] AC-16 responsive breakpoints untested** — `components/weather/shell/weather-shell.test.tsx:14-31`; AC: AC-16; problem: hero-only; md/xl grid classes not asserted; suggested: viewport harness tests.

- **[stage-1] AC-18 badge colours untested at component layer** — `components/weather/forecast/forecast-panel.tsx:86-90`; AC: AC-18; problem: unit only; no DOM badge colour assertion; suggested: render green/yellow/red fixtures.

- **[stage-1] AC-14 compare failure lacks retry** — `components/weather/compare/compare-panel.tsx:49-51`; AC: AC-14; problem: error text only, no retry control; suggested: add retry button re-invoking compare fetch.

- **[stage-1] AC-14 console-hygiene clause unautomated** — `docs/features/weather-explorer/spec.md:214-215`; AC: AC-14; problem: no test asserts zero console warnings/errors on healthy session; suggested: add console spy to smoke happy paths.

### Stage 2 — quality (non-blocking)

- **[stage-2] Integration tests deviate from test-plan replay strategy** — `app/api/v1/geocode/suggestions/route.test.ts:5-7`; problem: vi.mock instead of ephemeral upstream replay; suggested: acceptable MVP debt.

- **[stage-2] Geolocation reverse-geocode failure has no retry** — `components/weather/geolocation/geolocation-control.tsx:30-31`; problem: inline message only; suggested: mirror map/search retry pattern.

## Positive observations

- Pass-4 hard blockers AC-12 and AC-14 are genuinely fixed with non-tautological tests.
- Full AC chain intact: spec §4/§5 → sad §6 → openapi → tasks → code for all 22 ACs.
- 92 tests green; `lib/` framework-free; BFF + contract coverage solid.

## Finding resolutions

| Finding | Verdict | Notes |
|---|---|---|
| AC-12 + AC-14 primary paths | **Not an issue** | Verified fixed |
| Partial assertions (AC-01/04/05/09/13/16/18) | **Fix now** | User chose strengthen before ship |
| AC-14 compare failure retry | **Fix now** | Add retry button + test |
| AC-14 console hygiene | **Fix now** | Add console spy to smoke tests |
| Stage-2 integration replay + geo retry | **Defer** | Acceptable MVP debt |

## Gate result

**CHANGES REQUESTED** — Prior blockers resolved; user elected to close remaining stage-1 gaps (partial assertions, compare retry, console hygiene) before ship.
