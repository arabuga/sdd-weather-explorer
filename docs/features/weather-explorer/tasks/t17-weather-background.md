---
id: T17
title: "Render condition-driven background, local clock, and reduced-motion fallback"
layer: ui
deps: ["T11", "T9"]
acs: ["AC-13", "AC-14", "AC-15"]
files_hint: ["components/weather/background/"]
owner: "TBD lead"
estimate: "M"
status: "todo"
---

# T17 — Weather background + local clock

## Why

Derives from US-07 ACs — calm chrome tied to active place sky/time.

## What

- `components/weather/background/` — animated gradient/sky from current condition + day/night using astronomy from forecast (AC-13).
- Header compact clock in active location timezone.
- `prefers-reduced-motion: reduce` → static gradient, full feature usability (AC-15).
- When forecast/geocode unavailable, background area shows calm retry/empty state not blank (AC-14).

## Definition of Done

- [ ] Background reacts to loaded forecast condition and sunrise/sunset (AC-13).
- [ ] Reduced motion preference disables animation (AC-15).
- [ ] Outage shows visible calm state, zero console errors on healthy degraded path (AC-14).
- [ ] lint + tsc clean.

## Notes

Client component; keep animation CSS-only where possible for bundle budget.
