---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead"]
updated_at: "2026-07-04"
---

# 0003 — Stay stateless with no application database in MVP

- **Status:** Accepted
- **Date:** 2026-07-04
- **Deciders:** Architect, Product

## Context

Weather Explorer is privacy-first: no accounts, no server-side visitor profiles, no application cookies. Shareable state lives in the URL; pins live in client memory only.

## Decision drivers

- Spec non-goals exclude user accounts and server-side history.
- Workshop MVP scope and operational simplicity.
- No migration tooling needed for bootstrap.

## Considered options

1. **Stateless BFF + URL/client state only** — no application database.
2. **Edge KV for anonymous session cache** — adds infra and persistence semantics.
3. **PostgreSQL for analytics/events** — violates privacy posture.

## Decision outcome

**Chosen:** Option 1 — No application database in the foundation or weather-explorer MVP. External data is fetched on demand from Open-Meteo; map tiles from OSM.

## Consequences

**Positive**
- Aligns with privacy invariants and zero migration bootstrap.
- `data-model` stage can skip schema work for this feature.

**Negative**
- Pins lost on refresh — accepted product trade-off (AC-10b).

**Neutral**
- A future feature needing persistence would add a datastore with a new ADR.

## Links

- Architecture map: [[../architecture-map.md]]
- Feature ADR: [[../features/weather-explorer/adr/0003-encode-active-location-in-url-query-state.md]]
