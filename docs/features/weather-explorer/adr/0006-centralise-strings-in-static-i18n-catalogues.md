---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead"]
updated_at: "2026-07-04"
feature_size: "M"
ticket: "weather-explorer"
---

# 0006 — Centralise UI strings in static i18n catalogues

- **Status:** Accepted
- **Date:** 2026-07-04
- **Deciders:** Architect, Product

## Context

The product is Ukrainian-first with calm, practical copy and no exclamation marks (AC-17, AC-18). Clarify resolved English fallback triggers only for missing Ukrainian keys.

## Decision drivers

- Ukrainian-first UI with centralised strings (spec §6 «UI string centralisation»).
- No runtime i18n library in MVP — workshop scope control.
- Deterministic copy supports traceability and review.

## Considered options

1. **Static TypeScript catalogues (`uk.ts`, `en.ts`)** — simple lookup helper, no ICU runtime.
2. **next-intl or react-i18next** — full runtime internationalisation framework.
3. **Inline strings in components** — no central catalogue.

## Decision outcome

**Chosen:** Option 1 — All product strings live in `lib/i18n/uk.ts` with `lib/i18n/en.ts` providing fallback only when a Ukrainian key is absent. A thin `t(key)` helper selects Ukrainian by default.

## Consequences

**Positive**
- Predictable copy review and BC-BRAND-01 enforcement.
- Zero additional client bundle from i18n framework.

**Negative**
- No pluralisation or locale auto-detection beyond the fixed fallback rule.
- Adding languages beyond UA/EN requires new catalogues.

**Neutral**
- Migrating to a runtime i18n library later is feasible if localization scope expands.

## Links

- Spec: [[../spec.md]] — US-08, AC-17, AC-18, spec §6 i18n row
- SAD: [[../sad.md]] §4, §8
- Related ADR: [[0004-keep-comfort-scoring-in-framework-free-lib]]
