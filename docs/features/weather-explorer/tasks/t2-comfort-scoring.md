---
id: T2
title: "Implement comfort scoring and weekend highlight in framework-free lib"
layer: domain
deps: []
acs: ["AC-04", "AC-05", "AC-18"]
files_hint: ["lib/scoring/"]
owner: "TBD lead"
estimate: "M"
status: "todo"
---

# T2 — Comfort scoring + weekend highlight

## Why

Derives from [ADR-0004](../adr/0004-keep-comfort-scoring-in-framework-free-lib.md), [sad §5](../sad.md), and [AC-04](../spec.md) / [AC-05](../spec.md) / [AC-18](../spec.md).

## What

- `lib/scoring/comfort.ts` — compute 0–100 score, badge color (green ≥70, yellow 40–69, red <40), Ukrainian rationale ≤80 chars, no emoji or `!`.
- `lib/scoring/weekend.ts` — pick Sat–Sun pair in location timezone (in-progress pair when today is Sat/Sun).
- `lib/scoring/index.ts` exports pure functions consumed by BFF and tests.
- Comprehensive Vitest fixtures covering edge dates and timezone boundaries.

## Definition of Done

- [ ] Vitest covers score thresholds and rationale length/character rules (AC-18).
- [ ] Vitest covers weekend pair selection for Fri, Sat, Sun, and Mon anchors (AC-05).
- [ ] Module has zero imports from `next/*`, `react`, or DOM APIs.
- [ ] lint + tsc clean.

## Notes

Comfort rationale uncertainty wording (spec §8 OQ) stays factual per AC-18 default until Product changes copy.
