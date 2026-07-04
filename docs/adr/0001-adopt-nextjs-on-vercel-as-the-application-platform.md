---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead"]
updated_at: "2026-07-04"
---

# 0001 — Adopt Next.js on Vercel as the application platform

- **Status:** Accepted
- **Date:** 2026-07-04
- **Deciders:** Architect, Tech Lead

## Context

The Agentic workshop greenfield repo delivers Weather Explorer as a publicly demonstrable web application with strict performance, privacy, and zero-ops deployment requirements.

## Decision drivers

- Responsive web app with SSR and client interactivity (weather-explorer SAD §4).
- Vercel preview URLs per pull request for workshop demos.
- TypeScript strict mode and React 19 ecosystem alignment.

## Considered options

1. **Next.js 16 App Router on Vercel** — fullstack TypeScript web platform.
2. **Vite SPA + separate API** — two deployables, more wiring.
3. **Remix on Node** — strong web framework, less aligned with workshop Vercel MCP tooling.

## Decision outcome

**Chosen:** Option 1 — Next.js 16.2 App Router, React 19.2, TypeScript strict, deployed on Vercel.

## Consequences

**Positive**
- Single deployable matches feature SAD and workshop tooling.
- RSC + Route Handlers support server-side Open-Meteo BFF.

**Negative**
- Vendor coupling to Vercel for simplest deployment path.

**Neutral**
- Extracting to another host remains possible with Next.js adapter changes.

## Links

- Architecture map: [[../architecture-map.md]]
- Feature SAD: [[../features/weather-explorer/sad.md]]
