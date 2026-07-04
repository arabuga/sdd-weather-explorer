---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead"]
updated_at: "2026-07-04"
feature_size: "M"
ticket: "weather-explorer"
---

# 0003 — Encode active location in URL query state

- **Status:** Accepted
- **Date:** 2026-07-04
- **Deciders:** Architect, Product

## Context

Anonymous visitors must share a view via link (US-04, AC-08) without accounts or cookies. Pinned cities and compare state must not persist server-side (clarify resolution AC-10b).

## Decision drivers

- No application cookies (spec §6.1, CONTEXT invariants).
- Shareable view restores active location only — not pins or compare panel (CONTEXT «shareable view»).
- Browser refresh should restore active location from URL when present.

## Considered options

1. **URL query parameters for active location** — encode latitude, longitude, and display name in the address bar.
2. **Browser localStorage for all session state** — including pins and compare mode.
3. **Server-side session store** — cookieless token with server memory (violates privacy posture).

## Decision outcome

**Chosen:** Option 1 — Active location is encoded in URL query parameters (`lat`, `lon`, `name`). Pinned cities and compare UI mode live in React client state only and clear on refresh (AC-10b).

## Consequences

**Positive**
- Copy-paste sharing works without backend state.
- No cookies required for core share flow.

**Negative**
- Compare workflow resets on refresh — acceptable MVP trade-off per clarify.
- URL length and encoding must handle international city names carefully.

**Neutral**
- Adding optional localStorage for pins later would be a separate product decision.

## Links

- Spec: [[../spec.md]] — US-04, AC-08, AC-10b
- SAD: [[../sad.md]] §4
- Related ADR: none
