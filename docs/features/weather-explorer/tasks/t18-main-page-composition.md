---
id: T18
title: "Compose main page with responsive three-column layout and panel placement"
layer: wiring
deps: ["T10", "T11", "T12", "T13", "T14", "T15", "T16", "T17"]
acs: ["AC-12", "AC-16"]
files_hint: ["app/page.tsx", "components/weather/"]
owner: "TBD lead"
estimate: "M"
status: "todo"
---

# T18 — Main page composition

## Why

Final integration of all panels per [sad §1 layout override](../sad.md) and anonymous access AC-12.

## What

- Replace scaffold placeholder `app/page.tsx` with composed weather-explorer main view.
- Place search block (search + geolocation + pins), forecast + chart, map + compare per [ui.md](../ui.md) and SAD §1.
- Wire all feature components from T10–T17 through shell slots from T9.
- Smoke-verify every MVP flow reachable without authentication.

## Definition of Done

- [ ] Responsive layout matches SAD §1 column assignment at 768px and 1280px breakpoints (AC-16).
- [ ] `npm run build` succeeds; gate lint/tsc/test green.
- [ ] Manual smoke: search, forecast, map click, geolocation button, compare, and share URL all work without sign-in (AC-12).
- [ ] lint + tsc clean.

## Notes

Last wiring task — depends on all feature slices. Does not add new business logic; integration only.
