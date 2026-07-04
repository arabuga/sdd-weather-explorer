---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead"]
updated_at: "2026-07-04"
feature_size: "M"
ticket: "weather-explorer"
---

# 0002 — Proxy Open-Meteo through a server-side BFF

- **Status:** Accepted
- **Date:** 2026-07-04
- **Deciders:** Architect, Tech Lead

## Context

The application depends on Open-Meteo geocoding and forecast APIs. Spec requires calm degradation on provider failure (AC-02b, AC-14) and honest privacy copy about third-party lookups (spec §6.1).

## Decision drivers

- Zero paid API keys (spec §6 «Third-party data cost»).
- Prefer server-side Open-Meteo access for privacy and centralized error mapping.
- Enable future edge rate limiting without client fingerprinting.
- Distinguish zero-match geocoding from provider outage (AC-02 vs AC-02b).

## Considered options

1. **Direct browser calls to Open-Meteo** — client fetches geocode and forecast endpoints.
2. **Server BFF via Route Handlers and RSC loaders** — Next.js server layer wraps Open-Meteo.
3. **Separate standalone backend service** — dedicated API microservice in another deployable.

## Decision outcome

**Chosen:** Option 2 — All geocoding and forecast retrieval flows through the Next.js server BFF (Route Handlers and/or Server Component data loaders). The browser UI calls same-origin server endpoints or receives server-fetched props.

## Consequences

**Positive**
- Uniform error handling and retry messaging.
- Aligns with privacy narrative and workshop deployment on Vercel.
- Keeps Open-Meteo usage patterns auditable in one module.

**Negative**
- Adds server latency hop versus direct client fetch.
- BFF becomes a scaling hotspot under abuse — mitigated by planned edge limits (spec §8).

**Neutral**
- Extracting to a standalone service later is possible if traffic outgrows serverless limits.

## Links

- Spec: [[../spec.md]] — AC-02b, AC-06b, AC-14, §6.1
- SAD: [[../sad.md]] §4, §5
- Related ADR: [[0001-use-nextjs-app-router-with-rsc-bff]]
