---
status: Draft
owner: "Product / Tech Lead"
reviewers: ["Tech Lead", "Security Lead"]
updated_at: "2026-07-04"
feature_size: "M"
---

# Spec — weather-explorer

> **Glossary:** [CONTEXT](./CONTEXT.md)
> **UI design:** [ui.md](./ui.md)
> **Reference module / docs / channels used:** Product brief (session input); PRD traceability IDs (`FR-*`, `BC-*`, `NFR-*`) from workshop requirements; competitive research (WeatherItinerary, WeatherLens, METEOPROG, NoAdsWeather); devil's-advocate risk pass.

## 1. Context

Planning a weekend trip usually means juggling several weather tabs, mentally translating precipitation probability, wind, and UV into how a day will actually feel, and repeating that work for each candidate destination. For an anonymous visitor deciding whether a getaway is weather-worth-it, that process is slow, fragmented, and often wrapped in accounts, ads, and tracking.

The workshop needs a publicly demonstrable artifact: a live URL and repo that show disciplined agentic greenfield delivery, not a throwaway demo. Ukrainian-first tone, privacy-first operation, and traceable requirement IDs are part of that credibility — not optional polish.

The committed approach is a single calm screen: pick a place (search, map click, or opt-in geolocation), read seven days with per-day comfort scores and a highlighted upcoming weekend verdict, optionally pin up to three cities for side-by-side weekend comparison, and share the view via restorable link state — all without accounts, cookies, trackers, or paid API keys. Competitive products split trip comparison, comfort scoring, Ukrainian localization, and strict privacy across separate tools; none combine a keyless, Ukrainian-first, this-weekend, multi-city comfort comparison with shareable state in one flow.

Traceability: PRD IDs in §5 AC tags anchor downstream tests. Decision override: compare promoted to MVP at Checkpoint 1 — rationale: side-by-side weekend picking is core to the «where should we go?» job, not a post-MVP nice-to-have.

## 2. Goals

- Reduce weekend trip weather research to one calm screen with a plain-language comfort verdict for the upcoming Saturday and Sunday.
- Deliver a privacy-first experience: no accounts, no application cookies, no analytics, geolocation only on explicit visitor action.
- Ship a publicly demonstrable workshop artifact where every MVP capability is traceable, testable, and shareable via link state.

## 3. Non-goals

- User accounts, server-side history, or persisted favorites — would contradict the keyless, privacy-first model and add scope without serving the anonymous decision loop.
- Push notifications, scheduled jobs, or background data refresh — the visitor decides on demand when they open the app.
- Marine, aviation, or agriculture weather variables — outside leisure weekend trip planning for anonymous visitors.
- Localization beyond Ukrainian plus English labels — MVP copy scope is fixed to keep i18n centralised and reviewable.
- Native mobile app or climate/historical analysis beyond seven days — the decision horizon is the coming week, delivered as a responsive web experience.

## 4. User stories

### US-01: Choose a city by search

**As an** anonymous visitor
**I want** to type a city name and pick from debounced suggestions
**So that** I can set the active location without knowing exact coordinates

### US-02: Read forecast and comfort at a glance

**As an** anonymous visitor
**I want** to see seven daily cards with comfort scores and a highlighted weekend verdict
**So that** I can quickly judge whether this weekend is worth going to the active location

### US-03: Set place on the map

**As an** anonymous visitor
**I want** to click a point on the map to set the active location
**So that** I can explore a region when I know where on the map I want to go but not the exact city name

### US-04: Share a view with someone else

**As an** anonymous visitor
**I want** the active location reflected in a shareable link
**So that** someone else opens the same place without setup or an account

### US-05: Compare weekend options across cities

**As an** anonymous visitor
**I want** to pin up to three cities and compare their upcoming weekends side by side
**So that** I can pick the best destination among candidates

### US-06: Use my location on demand

**As an** anonymous visitor
**I want** to opt in to device location via an explicit control
**So that** I can set the active location near me without automatic tracking on first load

### US-07: Experience calm weather-aware chrome

**As an** anonymous visitor
**I want** a responsive shell with live local time and a condition-driven background
**So that** the app feels calm and grounded in the active place's sky and time of day

### US-08: Trust the brand and data sources

**As an** anonymous visitor
**I want** footer credits and lighthearted deterministic copy
**So that** I know which free services power the app and the tone stays calm and Ukrainian-first

## 5. Acceptance criteria

### AC-01 (US-01) — happy path

**Given** an anonymous visitor lands with no active location
**When** they type a city name and select a matching suggestion showing city, region, country, and optional flag
**Then** the system sets that city as the active location and begins loading forecast data for it

### AC-02 (US-01) — error path

**Given** an anonymous visitor is searching for a city
**When** geocoding returns no matches for their query
**Then** the system shows an inline «Nothing found» message and does not show a disruptive error toast

### AC-03 (US-01) — domain invariant

**Given** an anonymous visitor sees exactly one suggestion for their query
**When** they press Enter
**Then** the system selects that lone suggestion as the active location without requiring a mouse click

### AC-04 (US-02) — happy path

**Given** an anonymous visitor has an active location
**When** forecast data loads successfully
**Then** the system shows seven day cards with weekday, high and low temperature in degrees Celsius, weather icon, precipitation probability, wind, a colored comfort badge showing the numeric score from zero to one hundred in a circle with a short Ukrainian rationale sentence below it, and a weekend highlight at the top of the grid presenting one combined headline verdict equal to the mean comfort score of the upcoming Saturday and Sunday with the score and rationale in a horizontal row; below the cards it shows an hourly temperature chart covering forty-eight hours starting from local midnight (00:00) in the active location's timezone, with hour labels on the chart axis and today's sunrise, sunset, and daylight duration shown in a row beneath the chart (see [ui.md](./ui.md))

### AC-04b (US-02) — cross-context

**Given** an anonymous visitor changes the active location after a successful forecast load
**When** the new location is set
**Then** the system discards the in-memory cache for the previous location and loads fresh forecast data for the new place

### AC-04c (US-02) — error path

**Given** an anonymous visitor has an active location and forecast data is still loading
**When** they view the forecast area
**Then** the system shows a skeleton placeholder with the same layout footprint as the loaded forecast, not an empty gap

### AC-05 (US-02) — cross-context

**Given** an anonymous visitor views the active location's forecast
**When** the system computes the weekend highlight
**Then** it uses Saturday and Sunday in the active location's timezone — if today is Saturday or Sunday, the current in-progress Sat–Sun pair; otherwise the next upcoming Sat–Sun pair — and never the visitor's timezone alone

### AC-02b (US-01) — error path

**Given** an anonymous visitor is searching for a city
**When** geocoding is temporarily unavailable due to a network or provider failure
**Then** the system shows a calm inline retry state distinct from the «Nothing found» zero-match message

### AC-06 (US-03) — happy path

**Given** an anonymous visitor has the map visible for an active or empty state
**When** they click a point on the map and reverse-geocoding succeeds
**Then** the system sets that point as the active location, recentres the map with a marker and city popup, and reloads forecast and comfort data for the new place

### AC-06b (US-03) — error path

**Given** an anonymous visitor clicks a point on the map
**When** reverse-geocoding fails or returns no usable place name
**Then** the system keeps the previous active location unchanged, shows a calm inline message, and offers retry — without moving the marker to an unnamed point

### AC-07 (US-03) — domain invariant

**Given** the map is shown in any state
**When** the anonymous visitor views the map area
**Then** the system always displays OpenStreetMap contributor attribution

### AC-08 (US-04) — happy path

**Given** an anonymous visitor has selected an active location
**When** they copy the current page address and another person opens that link
**Then** the recipient sees the same active location and its forecast without signing in or configuring anything; pinned cities, compare panel state, and scroll position are not restored from the link

### AC-09 (US-05) — happy path

**Given** an anonymous visitor has pinned two or three cities shown as chips in the search column below the geolocation control
**When** they activate the weekend compare button in the pin chips block
**Then** the system shows a side-by-side table in the map column below the map for Saturday and Sunday with high and low temperature, precipitation probability, and comfort score per pinned city; each column has a sticky header with the city name and a control to make that city active

### AC-09b (US-05) — domain invariant

**Given** an anonymous visitor has fewer than two pinned cities
**When** they attempt to open the weekend compare view
**Then** the system keeps compare unavailable and communicates that at least two pinned cities are required

### AC-10 (US-05) — domain invariant

**Given** an anonymous visitor is managing pinned cities
**When** they attempt to pin a fourth city
**Then** the system blocks the action and communicates that at most three cities can be pinned for comparison

### AC-10b (US-05) — cross-context

**Given** an anonymous visitor has one or more pinned cities in the current session
**When** they refresh or reopen the page without a shareable active-location link state that includes pins
**Then** pinned cities are cleared, compare resets, and only the active location from the address bar is restored if present

### AC-11 (US-06) — happy path

**Given** an anonymous visitor loads the application for the first time
**When** the page finishes loading
**Then** the system does not read device location automatically and only requests geolocation after the visitor activates the explicit «Use my location» control

### AC-11b (US-06) — error path

**Given** an anonymous visitor activates «Use my location»
**When** the browser denies permission or geolocation is unavailable
**Then** the system shows calm inline guidance explaining that location was not applied and leaves the previous active location unchanged — without a disruptive error toast

### AC-12 (US-06) — authorization

**Given** an anonymous visitor on the application
**When** they use search, map, forecast, compare, or opt-in geolocation capabilities
**Then** the system never requires sign-in, subscription, or a stored profile to proceed — every visitor has equal access to all MVP capabilities

### AC-13 (US-07) — happy path

**Given** an anonymous visitor has an active location with loaded forecast
**When** they view the page with motion allowed
**Then** the system shows a calm animated background reflecting the active place's current condition and day-or-night cycle based on that location's sunrise and sunset, while the header shows a compact live local-time clock and theme indicator

### AC-14 (US-07) — error path

**Given** an anonymous visitor has an active location but forecast or geocoding data is temporarily unavailable
**When** the failure occurs
**Then** the system shows a calm visible empty or retry state — never a generic error page, never a silent blank, and never console warnings or errors on an otherwise healthy session

### AC-15 (US-07) — cross-context

**Given** an anonymous visitor has enabled reduced motion at the system level
**When** they view the application
**Then** the system replaces animated background effects with a static gradient while keeping forecast, map, and compare fully usable

### AC-16 (US-07) — happy path

**Given** an anonymous visitor opens the application with no active location
**When** the first screen renders
**Then** the system shows a hero with prominently centred city search and no default city pre-selected; the layout adapts to single-column on narrow viewports, two columns on medium, and three columns on wide viewports

### AC-17 (US-08) — happy path

**Given** an anonymous visitor scrolls to the footer
**When** they read the credits area
**Then** the system shows hyperlinked credits to Open-Meteo and OpenStreetMap and displays deterministic Ukrainian weather-themed jokes without calling external joke APIs or setting trackers

### AC-18 (US-02) — domain invariant

**Given** an anonymous visitor views a day card comfort badge
**When** the rationale sentence and badge color are shown
**Then** the rationale is one Ukrainian sentence of at most eighty characters with no emojis and no exclamation marks, the numeric score from zero to one hundred is visible, and the badge color is green at seventy or above, yellow from forty to sixty-nine, and red below forty

## 6. Non-functional requirements

| Aspect | Target | Measurement |
|---|---|---|
| Time to first byte (homepage) | ≤ 300 ms at p95 | Vercel Preview deployment metrics |
| Lighthouse Performance | ≥ 90 mobile and desktop | Lighthouse CI on production URL |
| Initial client JavaScript payload | ≤ 200 KB gzipped | Build artifact size check in CI |
| Lighthouse Accessibility | ≥ 95 | Lighthouse CI; all interactive elements have visible focus and accessible names |
| Color contrast | WCAG AA in light and dark themes | Automated contrast audit in CI |
| Third-party data cost | Zero paid API keys | Dependency and deployment config review |
| Runtime console hygiene | Zero warnings and zero errors on healthy session | Manual smoke plus automated browser check |
| Developer gate duration | lint, typecheck, unit tests, and production build complete in under 60 seconds on clean checkout | CI pipeline wall-clock time |
| UI string centralisation | Ukrainian-first strings in a single catalogue with English fallback only for missing Ukrainian keys | Code review of i18n module structure |

## 6.1 Security / privacy

- **Data classification:** Public — forecast and map tiles are non-sensitive; no visitor identity is collected or stored server-side.
- **Personal data touched:** Device coordinates only when the visitor explicitly opts in via «Use my location»; coordinates flow to geocoding and forecast retrieval but are not persisted as a profile.
- **AuthZ/AuthN impact:** None — single anonymous actor with full capability access; no permission tiers or tenant boundaries.
- **Abuse cases:**
  - Scraping or hammering free weather endpoints: degrade gracefully with visible calm states; rate-limit at infrastructure edge without fingerprinting visitors.
  - Misleading privacy claims while third-party queries expose intent: footer and about copy must acknowledge that location lookups reach external providers without storing visitor profiles.
  - Map tile abuse violating usage policy: serve tiles over HTTPS with required attribution and valid referrer; block obviously automated tile scraping at hosting edge if needed.
  - Geolocation misuse prompts: never trigger location permission except from the explicit control; deny silently with inline guidance if permission is refused.
- **Security review:** Required — new external data flows, opt-in geolocation, and public demo URL warrant a lightweight privacy review before ship.

## 7. Metrics / KPIs

- **Weekend decision clarity** — baseline: no product (0), target: ≥ 80% of moderated usability sessions correctly state whether the highlighted weekend is «worth going» within 30 seconds of selecting a city, measured within 14 days of MVP deploy.
- **Shareable view success** — baseline: 0, target: ≥ 90% of copied links opened in a fresh browser restore the same active location and its forecast within 14 days of MVP deploy.
- **Privacy posture audit** — baseline: unknown, target: zero application-set cookies, zero analytics or tracker scripts, and geolocation never requested on first load — verified by checklist before every public demo, ongoing.
- **Compare workflow completion** — baseline: 0, target: ≥ 50% of sessions that pin two or more cities open the weekend compare view and promote one city to active, measured within 30 days of MVP deploy.

## 8. Open questions

- [x] Should pinned cities persist across refresh via browser storage (still cookieless), or only for the current session? **Resolved:** in-memory only until refresh — no browser storage for pins in MVP. — owner: Product, due: clarify 2026-07-04
- [x] Which local calendar rule defines «upcoming weekend» when today is Saturday or Sunday? **Resolved:** current in-progress Sat–Sun pair when today is Sat or Sun; otherwise next upcoming Sat–Sun in active location timezone — see AC-05 and CONTEXT «weekend highlight». — owner: Tech Lead, due: clarify 2026-07-04
- [ ] How should comfort rationale communicate forecast uncertainty beyond naming dominant factors? Default now: factual Ukrainian sentence capped at 80 characters per AC-18. — owner: Product, due: before sdd:implement
- [ ] What minimal hosting edge rate limit balances abuse protection with the no-fingerprinting promise? Default now: generous anonymous limits with calm degradation message. — owner: Tech Lead, due: before sdd:tasks
- [x] Which panels occupy each responsive column at 768 px and 1280 px breakpoints? **Resolved in SAD §1 override and [ui.md](./ui.md):** mobile stack search block → forecast → map; tablet two-column (left: search + geolocation + pins + forecast; right: map + compare); desktop three-column (left: search block; centre: forecast + chart; right: map + compare when active). — owner: Tech Lead, due: design 2026-07-04
