---
id: T9
title: "Build responsive app shell, hero empty state, and footer credits"
layer: ui
deps: ["T1", "T8"]
acs: ["AC-12", "AC-16", "AC-17"]
files_hint: ["app/layout.tsx", "components/weather/shell/", "components/weather/footer/"]
owner: "TBD lead"
estimate: "M"
status: "todo"
---

# T9 — App shell, hero, footer

## Why

Derives from [sad §1 layout override](../sad.md), [AC-16](../spec.md), [AC-17](../spec.md), and empty-state flow in [sad §6](../sad.md).

## What

- Update `app/layout.tsx` with Ukrainian metadata, theme tokens, and shell wrapper.
- `components/weather/shell/` — responsive grid slots for search / forecast / map columns.
- Hero empty state: centred search, no default city.
- `components/weather/footer/` — Open-Meteo + OSM links and T1 jokes.

## Definition of Done

- [ ] Empty URL renders hero with centred search only (AC-16).
- [ ] Layout grid adapts at `<768`, `768–1279`, `≥1280` breakpoints per SAD §1.
- [ ] Footer shows hyperlinked credits and deterministic Ukrainian joke (AC-17).
- [ ] No auth or sign-in affordances anywhere (AC-12 shell check).
- [ ] lint + tsc clean.

## Notes

Reuses `Button` from scaffold; add `Input` from T8 in search slot placeholder.
