---
id: T16
title: "Add explicit opt-in geolocation control with permission-denied guidance"
layer: ui
deps: ["T5", "T10"]
acs: ["AC-11", "AC-11b", "AC-12"]
files_hint: ["components/weather/geolocation/"]
owner: "TBD lead"
estimate: "S"
status: "todo"
---

# T16 — Geolocation control

## Why

Derives from [Flow: Opt-in geolocation](../sad.md) and US-06 ACs.

## What

- `components/weather/geolocation/` — «Моє місцезнаходження» control **directly under city search** in the search column ([ui.md](../ui.md)).
- No `navigator.geolocation` call on first load (AC-11).
- On success: reverse geocode via BFF (Nominatim) and set active location.
- On denial/unavailability: calm inline guidance, prior location unchanged, no toast (AC-11b).
- On reverse-geocode failure: inline message + retry button reusing last coordinates.

## Definition of Done

- [ ] Geolocation API invoked only after button click.
- [ ] Permission denied path leaves prior location and shows inline guidance.
- [ ] No sign-in or permission tier gating (AC-12).
- [ ] lint + tsc clean.

## Notes

Integrates with T14 URL update on successful location set.
