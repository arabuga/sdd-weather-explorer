---
id: T14
title: "Wire URL query state and in-memory forecast cache to search and forecast"
layer: wiring
deps: ["T3", "T10", "T11"]
acs: ["AC-08", "AC-04b"]
files_hint: ["components/weather/state/", "app/page.tsx"]
owner: "TBD lead"
estimate: "M"
status: "todo"
---

# T14 — URL state wiring

## Why

Derives from [ADR-0003](../adr/0003-encode-active-location-in-url-query-state.md), [Flow: Open shareable link](../sad.md), and [AC-08](../spec.md).

## What

- `components/weather/state/` — client context or hooks syncing T3 codec with Next.js router search params.
- On location select: update URL without encoding pins/compare.
- On load with encoded location: restore active location and trigger forecast fetch.
- Ensure forecast cache discard on location change integrates T11 cache (AC-04b).

## Definition of Done

- [ ] Copy/open URL in fresh browser restores same active location and forecast (AC-08).
- [ ] Pins and compare state are not restored from URL.
- [ ] Changing location updates URL and clears prior forecast cache.
- [ ] lint + tsc clean.

## Notes

Overlaps `app/page.tsx` with T18 — T14 owns state wiring; T18 owns final panel placement.
