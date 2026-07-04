---
id: T1
title: "Add Ukrainian-first i18n catalogues and deterministic footer jokes"
layer: domain
deps: []
acs: ["AC-17"]
files_hint: ["lib/i18n/", "lib/jokes/"]
owner: "TBD lead"
estimate: "S"
status: "todo"
---

# T1 — i18n catalogues + footer jokes

## Why

Derives from [ADR-0006](../adr/0006-centralise-strings-in-static-i18n-catalogues.md) and [AC-17](../spec.md) — Ukrainian-first copy and deterministic footer jokes without external APIs.

## What

- Add `lib/i18n/uk.ts` (authoritative) and `lib/i18n/en.ts` (fallback for missing keys only).
- Add `lib/i18n/index.ts` with a typed lookup helper.
- Add `lib/jokes/` with a deterministic selector (e.g. hash of date + location) returning Ukrainian weather-themed lines.
- Vitest in `lib/i18n/*.test.ts` and `lib/jokes/*.test.ts`.

## Definition of Done

- [ ] Vitest proves Ukrainian key wins over English fallback and missing keys fall back cleanly.
- [ ] Vitest proves joke selection is deterministic for the same inputs and needs no network.
- [ ] No runtime i18n library dependency added.
- [ ] lint + tsc clean.

## Notes

Reuses scaffold `lib/utils.ts` only if needed for string helpers — keep jokes framework-free.
