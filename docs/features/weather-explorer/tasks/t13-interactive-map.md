---
id: T13
title: "Load Leaflet map client-only with OSM tiles and reverse-geocode click"
layer: ui
deps: ["T5", "T9"]
acs: ["AC-06", "AC-06b", "AC-07"]
files_hint: ["components/weather/map/"]
owner: "TBD lead"
estimate: "M"
status: "todo"
---

# T13 — Client-only interactive map

## Why

Derives from [ADR-0005](../adr/0005-load-map-client-only-with-ssr-placeholder.md) and map ACs US-03.

## What

- Install `leaflet`, `react-leaflet`, and types; dynamic import map with SSR placeholder matching map footprint.
- OSM raster tiles over HTTPS with required attribution always visible (AC-07).
- Map click → `GET /api/v1/geocode/reverse` → on success update marker, popup, and active location; on failure show inline retry and keep prior location (AC-06b).

## Definition of Done

- [ ] Map never executes Leaflet code during SSR (ADR-0005).
- [ ] OSM attribution visible in all map states (AC-07).
- [ ] Successful click recentres marker and triggers forecast reload (AC-06).
- [ ] Failed reverse geocode does not move marker to unnamed point (AC-06b).
- [ ] lint + tsc clean.

## Notes

Add Leaflet CSS import in client bundle only. Map lives in right column per SAD §1 at tablet/desktop.
