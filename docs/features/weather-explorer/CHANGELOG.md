# Changelog — weather-explorer

## weather-explorer — Ukrainian-first weekend weather planner (MVP)

**What:** A single calm screen where anonymous visitors search or map-pick a city, read a seven-day forecast with comfort scores and a highlighted upcoming-weekend verdict, pin up to three cities for side-by-side weekend comparison, and share the active location via URL — all without accounts, cookies, or paid API keys.

**Why:** Weekend trip weather research is usually fragmented across tabs and ad-heavy apps. This ships the workshop's privacy-first, Ukrainian-first decision loop in one flow — see [spec](./spec.md) §1–§2. Key decisions: [ADR-0001](./adr/0001-use-nextjs-app-router-with-rsc-bff.md) (App Router + RSC BFF), [ADR-0002](./adr/0002-proxy-open-meteo-through-server-bff.md) (Open-Meteo via server), [ADR-0003](./adr/0003-encode-active-location-in-url-query-state.md) (shareable URL state), [ADR-0005](./adr/0005-load-map-client-only-with-ssr-placeholder.md) (client-only map), [ADR-0006](./adr/0006-centralise-strings-in-static-i18n-catalogues.md) (static i18n catalogues).

**How to use:** Open `/` in the browser. Search a city or click the map; the active location is encoded in the query string (`lat`, `lon`, `name`, …). BFF endpoints are documented in [openapi.yaml](./contracts/openapi.yaml) — e.g. `GET /api/v1/forecast?lat=49.84&lon=24.02` returns seven daily cards with comfort scores and a weekend highlight.

**Operational notes:**
- Migration: none — stateless, no database.
- Feature flag / config: none.
- Rollback: revert the deploy; no schema to roll back.

**Acceptance criteria delivered:** AC-01 through AC-18 — city search, forecast + comfort, map pick, shareable URL, weekend compare (up to three pins), opt-in geolocation, calm weather-aware chrome, footer credits + deterministic jokes, and comfort badge invariants.
