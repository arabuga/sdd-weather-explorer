---
status: Draft
owner: "QA / Implementing engineer"
reviewers: ["Implementing engineer", "Tech Lead"]
updated_at: "2026-07-04"
feature_size: "M"
---

# Test plan — weather-explorer

Maps every `spec.md` §5 acceptance criterion to named tests at generic levels before implementation. Weather Explorer is a keyless, Ukrainian-first web app: city search, seven-day forecast with comfort scores, map pick, opt-in geolocation, weekend compare (up to three pins), and shareable active-location URL state — with calm inline error handling and no accounts or application cookies.

## Levels

| Level | Scope | Strategy (generic — no tool names) |
|---|---|---|
| Unit | Pure logic: comfort scoring, weekend highlight rules, URL location codec, pin guardrails, rationale formatting — no I/O. | In-memory inputs and fixtures; no network or DOM. |
| Integration | BFF route handlers against a real HTTP stack with an ephemeral upstream replay of captured Open-Meteo payloads (real response shapes, not hand-rolled stubs). | Spin up a throwaway local server + wire replay per suite; tear down after. |
| Contract | BFF JSON responses validated against `contracts/openapi.yaml` at each cross-participant boundary (Web UI ↔ Server BFF). | Validate live handler output against the agreed OpenAPI schemas and examples. |
| E2E | Full server-side flow from HTTP entry through BFF to proxied weather data (one per critical sequence in `sad.md` §6). | Exercise real route handlers with ephemeral upstream replay; assert end-to-end payload shaping. |
| Load | Numeric NFR validation — throughput and latency under sustained anonymous traffic. | The load tool already in your repo, or e.g. k6 or Locust against preview deployment. |
| Component | UI pieces in isolation: search combobox, day cards, compare table, map shell placeholder, footer, skeleton states. | Render in a component harness with stubbed props; assert output, interactions, and accessible names. |
| Visual-regression | Key rendered layouts: empty hero (AC-16), loaded forecast grid, compare table, calm error/retry states. | Snapshot rendered output; fail on unintended visual diff; update baselines deliberately. |
| E2E-through-UI | User-story flows driven through the real rendered UI (search → forecast, map click, geolocation opt-in, share link, compare guardrails). | Boot the app against ephemeral upstream replay; drive UI interactions; assert visible outcomes. |

## AC coverage

| AC (spec.md §5) | Test name (intent-based) | Level | Expected outcome |
|---|---|---|---|
| AC-01 — search happy path | visitor selects city suggestion and active location loads forecast | e2e-through-UI, contract | Suggestion shows city, region, country, optional flag; selection sets active location and triggers forecast load |
| AC-02 — zero geocode matches | geocode query with no matches shows inline nothing-found | unit, e2e-through-UI | Inline «Nothing found» message; no disruptive toast |
| AC-03 — Enter on lone suggestion | pressing Enter with exactly one suggestion selects it | unit, e2e-through-UI | Lone suggestion becomes active location without mouse click |
| AC-04 — forecast happy path | loaded forecast shows seven day cards weekend highlight and hourly chart | unit, component, e2e-through-UI | Seven cards with weekday, °C high/low, icon, precipitation, wind, stacked comfort badge (circle score + rationale below); weekend headline inline row; 48-hour hourly chart from local 00:00 with 6-hour axis ticks and astronomy chip row beneath (see [ui.md](./ui.md)) |
| AC-04b — location change discards cache | changing active location drops prior forecast cache | integration, e2e-through-UI | Previous location cache cleared; fresh forecast fetched for new place |
| AC-04c — forecast loading skeleton | forecast area shows skeleton while loading | component, e2e-through-UI | Skeleton matches loaded layout footprint; no empty gap |
| AC-05 — weekend highlight timezone | weekend highlight uses active location timezone Sat–Sun rule | unit | When today is Sat or Sun, current in-progress pair; otherwise next upcoming Sat–Sun in location TZ — never visitor TZ alone |
| AC-02b — geocode provider unavailable | geocode outage shows calm retry distinct from zero-match | integration, e2e-through-UI | Inline retry state visible; message distinct from «Nothing found» |
| AC-06 — map click happy path | map click with successful reverse geocode sets location | e2e-through-UI, contract | Point becomes active location; map recentres with marker and popup; forecast reloads |
| AC-06b — reverse geocode failure | map click when reverse geocode fails keeps prior location | integration, e2e-through-UI | Prior active location unchanged; calm inline message with retry; marker not placed on unnamed point |
| AC-07 — OSM attribution | map always shows OpenStreetMap contributor attribution | component, e2e-through-UI | Attribution visible in map area in every map state |
| AC-08 — shareable link restores active location | copied URL restores active location and forecast for recipient | unit, e2e-through-UI | Recipient sees same active location and forecast without sign-in; pins, compare panel, and scroll position not restored |
| AC-09 — weekend compare happy path | compare with two or three pins shows side-by-side weekend table | e2e-through-UI, contract | Sat/Sun columns per pinned city with high/low, precipitation, comfort; sticky city header with make-active control |
| AC-09b — compare requires two pins | compare blocked with fewer than two pinned cities | unit, e2e-through-UI | Compare unavailable; message that at least two pins are required |
| AC-10 — max three pins | fourth pin attempt is blocked | unit, e2e-through-UI | Action blocked; message that at most three cities can be pinned |
| AC-10b — refresh clears pins | page refresh clears pins and compare state | e2e-through-UI | Pins and compare reset; only active location from URL restored when present |
| AC-11 — no automatic geolocation | first load does not request device location | e2e-through-UI | No geolocation request until visitor activates explicit control |
| AC-11b — geolocation denied | geolocation permission denied shows calm guidance | e2e-through-UI | Inline guidance; previous active location unchanged; no disruptive toast |
| AC-12 — no auth gate | all MVP capabilities accessible without sign-in | e2e-through-UI | Search, map, forecast, compare, and opt-in geolocation work with no login or subscription prompt |
| AC-13 — condition-driven background | animated background reflects active place condition and day/night | component, e2e-through-UI | Calm animated background from location condition and sunrise/sunset; header shows live local time and theme indicator |
| AC-14 — calm failure surfaces | dependency failure shows visible retry not blank page | integration, e2e-through-UI | Calm empty or retry state; no generic error page; no silent blank; no console warnings or errors on healthy session |
| AC-15 — reduced motion | prefers-reduced-motion replaces animation with static gradient | component, e2e-through-UI | Static gradient background; forecast, map, and compare remain fully usable |
| AC-16 — empty-state hero layout | landing without location shows centred search hero | component, visual-regression, e2e-through-UI | Hero with centred search and no default city; single column narrow, two medium, three wide |
| AC-17 — footer credits and jokes | footer shows provider credits and deterministic Ukrainian jokes | component, e2e-through-UI | Hyperlinked Open-Meteo and OpenStreetMap credits; deterministic Ukrainian jokes; no external joke API or trackers |
| AC-18 — comfort badge invariants | comfort badge shows score color and capped rationale | unit, component | Score 0–100 visible; rationale one Ukrainian sentence ≤80 chars, no emojis or exclamation marks; green ≥70, yellow 40–69, red <40 |

## Edge cases / error paths

Dedicated rows for every error and authorization AC (not folded into happy paths above):

- Geocode query returns empty result set → inline «Nothing found», no toast (AC-02)
- Geocode provider network or upstream failure → calm inline retry distinct from zero-match (AC-02b)
- Forecast still loading → skeleton with same layout footprint (AC-04c)
- Reverse geocode fails or returns no usable place name → prior location kept, inline retry, no orphan marker (AC-06b)
- Browser denies or cannot provide geolocation → inline guidance, prior location unchanged (AC-11b)
- Forecast or geocode unavailable with active location → calm visible retry, not blank page or generic error page (AC-14)
- Compare opened with fewer than two pins → compare stays unavailable with requirement message (AC-09b)
- Fourth pin attempted → blocked with max-three message (AC-10)
- Malformed or missing URL location parameter on open → empty hero landing, no crash (extends AC-16 / AC-08 negative)
- BFF receives invalid query parameters → structured client-safe error without stack trace (contract + integration)
- All MVP flows attempted without credentials → no auth wall at any step (AC-12)

## Test data

No application database in MVP (`sad.md` §6 flags stateless). Seed and cleanup focus on fixtures and session state.

- **Seed strategy:** Static JSON fixtures matching `contracts/openapi.yaml` schemas — geocode suggestion lists (zero, one, many matches), reverse-geocode success/failure payloads, seven-day + hourly forecast samples for known coordinates (e.g. Lviv, Odesa, Kyiv), and precomputed comfort scores for unit assertions. URL query fixtures for encoded active locations. Ukrainian string catalogue snippets for footer and rationale assertions.
- **Integration dependency:** Ephemeral local HTTP server replaying captured Open-Meteo response files (real shapes validated against contract) — not a mocked in-process stub that diverges from production parsing.
- **UI harness data:** Stub props for component tests (pinned-city arrays 0–3, loading/error/success forecast states, reduced-motion media query).
- **Cleanup boundary:** Per-test reset of in-memory client pin/compare state and URL mock; per-suite teardown of ephemeral upstream replay server and temp fixture dirs so runs stay independent.

## NFR validation (load)

Numeric targets from `spec.md` §6 — one scenario each:

- **Time to first byte (homepage) ≤ 300 ms at p95** → scenario: sustain 50 anonymous homepage requests per minute for 5 minutes against preview deployment; assert p95 TTFB ≤ 300 ms (the load tool already in your repo, or e.g. k6 or Locust).
- **Performance score ≥ 90 (mobile and desktop)** → scenario: after each production deploy, run automated performance audit on homepage and a location-loaded view; assert score ≥ 90 on both form factors.
- **Initial client JavaScript payload ≤ 200 KB gzipped** → scenario: production build artifact check on every PR; assert main client bundle gzip size ≤ 200 KB.
- **Accessibility score ≥ 95** → scenario: automated accessibility audit on homepage and forecast-loaded view; assert score ≥ 95; spot-check visible focus and accessible names on interactive controls.
- **Color contrast WCAG AA (light and dark themes)** → scenario: automated contrast audit across theme tokens and key UI states; assert AA compliance.
- **Developer gate duration < 60 s on clean checkout** → scenario: CI pipeline wall-clock for lint, typecheck, unit suite, and production build; assert total ≤ 60 s.
- **Runtime console hygiene (zero warnings/errors on healthy session)** → scenario: automated browser pass through search → forecast → map → compare happy path; assert zero console warnings and zero errors.
- **Third-party data cost — zero paid API keys** → scenario: dependency and deployment config review gate on every PR; assert no paid weather or map API credentials required.
- **UI string centralisation** → scenario: code-review checklist gate; assert Ukrainian-first catalogue with English fallback only for missing keys.

<!-- KPIs in spec §7 (usability sessions, link restore rate) are post-deploy measurement — out of automated test-plan scope until instrumentation exists. -->

## CI placement

- **On every PR:** unit (lib/ comfort, URL codec, pin rules, weekend highlight), contract (BFF responses vs OpenAPI), integration (BFF routes with ephemeral upstream replay), component harness suites, build-size and contrast audits, developer gate timing.
- **On merge to main / preview deploy:** e2e-through-UI critical flows (search, map, share link, compare guardrails, geolocation opt-in), visual-regression baselines for empty hero and loaded forecast, automated performance and accessibility audits against preview URL.
- **On schedule / pre-release:** load scenario for homepage p95 TTFB; full e2e-through-UI matrix including error branches (AC-02, AC-02b, AC-06b, AC-11b, AC-14).
