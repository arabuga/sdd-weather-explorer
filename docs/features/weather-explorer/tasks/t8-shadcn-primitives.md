---
id: T8
title: "Add shadcn Input, Card, and Skeleton primitives"
layer: ui
deps: []
acs: ["AC-04c", "AC-14"]
files_hint: ["components/ui/input.tsx", "components/ui/card.tsx", "components/ui/skeleton.tsx"]
owner: "TBD lead"
estimate: "S"
status: "todo"
---

# T8 — shadcn UI primitives

## Why

Forecast loading and calm degradation need shared primitives; reuses [architecture-map §Frontend](../../../architecture-map.md) shadcn convention and existing `components/ui/button.tsx`.

## What

- Add `components/ui/input.tsx`, `card.tsx`, `skeleton.tsx` matching scaffold Tailwind 4 + CVA patterns.
- Skeleton dimensions should match forecast day-card footprint (used in T11).

## Definition of Done

- [ ] Primitives import cleanly from feature components.
- [ ] Skeleton demo in Story-less smoke: renders seven-card grid footprint without layout shift.
- [ ] lint + tsc clean.

## Notes

Can run in parallel with domain/infra tasks. Extend shadcn CLI later for Badge if needed in T11.
