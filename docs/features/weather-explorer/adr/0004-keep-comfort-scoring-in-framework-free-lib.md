---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead"]
updated_at: "2026-07-04"
feature_size: "M"
ticket: "weather-explorer"
---

# 0004 — Keep comfort scoring in a framework-free lib module

- **Status:** Accepted
- **Date:** 2026-07-04
- **Deciders:** Architect, Tech Lead

## Context

Comfort scores drive the core product verdict (US-02). Spec and CONTEXT require a pure, deterministic function with Ukrainian rationale (AC-18). Workshop practice requires framework-free `lib/` modules testable with Vitest.

## Decision drivers

- Comfort scoring is a pure total function — same inputs yield same score and rationale (CONTEXT invariant).
- 100% unit testability with Vitest without Next.js or React.
- Weekend highlight depends on the same scoring function (AC-05, CONTEXT «weekend highlight»).

## Considered options

1. **Framework-free `lib/scoring/` module** — pure TypeScript functions consumed by server and client.
2. **Scoring logic embedded in React components** — compute in UI layer.
3. **Scoring as a microservice** — separate deployable calculator.

## Decision outcome

**Chosen:** Option 1 — Implement `comfortScore(daily)` and weekend highlight aggregation in `lib/scoring/` with no imports from `next/*`, `react`, or DOM APIs. Vitest covers all branches including badge color thresholds (AC-18).

## Consequences

**Positive**
- Fast, reliable unit tests for the product's core value proposition.
- Reuse from BFF and client preview paths without duplication.

**Negative**
- Requires strict lint boundaries to prevent accidental framework imports into `lib/`.

**Neutral**
- Extracting to a shared npm package is possible if reused across projects later.

## Links

- Spec: [[../spec.md]] — US-02, AC-04, AC-05, AC-18
- SAD: [[../sad.md]] §4, §5
- Related ADR: [[0002-proxy-open-meteo-through-server-bff]]
