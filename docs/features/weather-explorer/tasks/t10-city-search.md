---
id: T10
title: "Implement debounced city search combobox with calm error states"
layer: ui
deps: ["T5", "T9"]
acs: ["AC-01", "AC-02", "AC-02b", "AC-03"]
files_hint: ["components/weather/search/"]
owner: "TBD lead"
estimate: "M"
status: "todo"
---

# T10 — City search combobox

## Why

Derives from [Flow 1](../sad.md), [Cross-cutting error branches](../sad.md), and search ACs US-01.

## What

- `components/weather/search/` — debounced autocomplete calling `GET /api/v1/geocode/suggestions`.
- Renders city, region, country, optional flag per suggestion.
- Inline «Nothing found» for zero matches (AC-02).
- Distinct inline retry for 503/provider outage (AC-02b).
- Enter selects lone suggestion (AC-03).

## Definition of Done

- [ ] Selecting a suggestion emits active location change event for wiring tasks.
- [ ] Zero-match and outage UI are visually and semantically distinct.
- [ ] Enter-with-single-suggestion works without mouse click.
- [ ] lint + tsc clean.

## Notes

Uses T8 `Input`; strings from T1 i18n catalogue.
