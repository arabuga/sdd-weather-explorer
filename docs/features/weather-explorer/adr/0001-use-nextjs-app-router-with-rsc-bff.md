---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead"]
updated_at: "2026-07-04"
feature_size: "M"
ticket: "weather-explorer"
---

# 0001 — Use Next.js App Router with RSC and client islands

- **Status:** Accepted
- **Date:** 2026-07-04
- **Deciders:** Architect, Tech Lead

## Context

Weather Explorer is a responsive web application that must render a fast empty-state hero, load forecast data keylessly, and still support interactive map, chart, compare, and animated background. Workshop constraints select Next.js 16 App Router with React 19.

## Decision drivers

- Time to first byte ≤ 300 ms at p95 on Vercel Preview (spec §6).
- Lighthouse Performance ≥ 90 mobile and desktop (spec §6).
- Interactive map and geolocation require browser APIs unavailable during SSR (US-03, US-06).
- Server-side weather access preferred for privacy and error handling (spec §6.1, ADR-0002).

## Considered options

1. **Client-side SPA only** — single-page app fetching all data in the browser.
2. **Hybrid App Router (RSC + client islands)** — server-rendered shell and data paths with targeted client components.
3. **Fully server-rendered pages with minimal JS** — no client islands; static HTML only.

## Decision outcome

**Chosen:** Option 2 — Hybrid App Router with React Server Components for the shell and initial data, plus client components for search debouncing, Leaflet map, Recharts hourly chart, compare interactions, geolocation button, and animated background.

## Consequences

**Positive**
- Strong first paint and SEO-safe empty state without sacrificing interactivity.
- Natural split between server BFF fetches and browser-only APIs.

**Negative**
- Requires disciplined `"use client"` boundaries and hydration testing.
- Slightly higher conceptual complexity for workshop contributors new to RSC.

**Neutral**
- Switching to pure SPA later is possible but would rework routing and data loading.

## Links

- Spec: [[../spec.md]] — US-07, AC-16, spec §6 Performance rows
- SAD: [[../sad.md]] §4
- Related ADR: [[0002-proxy-open-meteo-through-server-bff]]
