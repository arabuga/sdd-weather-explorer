---
id: T3
title: "Encode and decode active location in URL query state"
layer: domain
deps: []
acs: ["AC-08"]
files_hint: ["lib/url-state/"]
owner: "TBD lead"
estimate: "S"
status: "todo"
---

# T3 — URL location codec

## Why

Derives from [ADR-0003](../adr/0003-encode-active-location-in-url-query-state.md) and [AC-08](../spec.md) — shareable view restores active location only.

## What

- `lib/url-state/codec.ts` — parse and serialize query params for lat, lon, display name, optional admin/country.
- Explicit exclusion of pins, compare mode, and scroll position from encoded state.
- Vitest round-trip and invalid-input cases.

## Definition of Done

- [ ] Vitest round-trips a sample location through encode → decode.
- [ ] Vitest confirms pin/compare keys are never written to shareable query.
- [ ] Invalid or partial query returns a safe empty/decode failure result.
- [ ] lint + tsc clean.

## Notes

Browser integration happens in T14; this task is pure codec logic only.
