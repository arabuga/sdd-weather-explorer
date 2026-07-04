---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead"]
updated_at: "2026-07-04"
---

# 0002 — Use feature-sliced layout with framework-free lib

- **Status:** Accepted
- **Date:** 2026-07-04
- **Deciders:** Architect, Tech Lead

## Context

The codebase must stay testable and readable for agentic implementation. Domain rules (comfort scoring, i18n) must not depend on Next.js or React.

## Decision drivers

- Vitest unit tests on pure functions (weather-explorer spec §6 developer gate).
- Clear separation between UI (`app/`, `components/`) and domain (`lib/`).
- Workshop traceability from spec AC to testable modules.

## Considered options

1. **Feature-sliced monolith** — `app/` + `components/` + framework-free `lib/`.
2. **Hexagonal modules per bounded context** — heavier folder overhead for one MVP app.
3. **Everything in components** — fast start, poor test isolation.

## Decision outcome

**Chosen:** Option 1 — Next.js routes and UI in `app/` / `components/`; all business rules and i18n catalogues in `lib/` with no `next/*` or `react` imports.

## Consequences

**Positive**
- Comfort scoring and rationale generation are fast to unit test.
- Implement tasks can target `lib/` before UI polish.

**Negative**
- Requires lint boundaries to prevent accidental framework imports into `lib/`.

**Neutral**
- Additional features add folders under the same pattern.

## Links

- Architecture map: [[../architecture-map.md]]
- Feature ADR: [[../features/weather-explorer/adr/0004-keep-comfort-scoring-in-framework-free-lib.md]]
