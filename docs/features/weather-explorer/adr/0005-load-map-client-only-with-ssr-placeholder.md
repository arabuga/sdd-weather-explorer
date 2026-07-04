---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead"]
updated_at: "2026-07-04"
feature_size: "M"
ticket: "weather-explorer"
---

# 0005 — Load the interactive map client-only with an SSR placeholder

- **Status:** Accepted
- **Date:** 2026-07-04
- **Deciders:** Architect, Tech Lead

## Context

The product requires an interactive OpenStreetMap-tiled map with click-to-set-location (US-03, AC-06). Leaflet depends on browser DOM APIs and cannot render meaningfully during SSR. Layout must remain stable during load (AC-14, AC-04c pattern).

## Decision drivers

- Interactive map with marker, popup, and click handler (AC-06, AC-07).
- Avoid SSR hydration errors from Leaflet window access.
- Preserve layout stability with skeleton placeholder matching final map footprint.

## Considered options

1. **Dynamic import with SSR disabled + skeleton placeholder** — `next/dynamic` for map component.
2. **SSR-rendered static map image** — non-interactive preview replaced on hydrate.
3. **Iframe embed of third-party map** — external frame with less control over reverse-geocode flow.

## Decision outcome

**Chosen:** Option 1 — Map component loads via dynamic import (`ssr: false`) with a skeleton matching the final map footprint. Reverse-geocode on click flows through the server BFF (ADR-0002).

## Consequences

**Positive**
- Reliable hydration and full Leaflet feature set.
- Clear separation between static shell and interactive map.

**Negative**
- Map appears slightly after first paint — mitigated by skeleton.
- Increases client bundle weight — must stay within 200 KB gzipped total budget.

**Neutral**
- Switching map libraries later affects only the client map module.

## Links

- Spec: [[../spec.md]] — US-03, AC-06, AC-06b, AC-07
- SAD: [[../sad.md]] §4
- Related ADR: [[0001-use-nextjs-app-router-with-rsc-bff]], [[0002-proxy-open-meteo-through-server-bff]]
