---
status: Living
updated_at: "2026-07-04"
---

# Domain Context — weather-explorer

## Glossary

- **anonymous visitor** — A person who opens the live application URL without signing in, creating an account, or leaving a server-side profile. NOT a registered user or admin; there are no roles beyond this single actor.
- **active location** — The city or map point currently driving forecast, comfort scores, map bounds, animated background, and shareable view state. NOT a pinned comparison city until explicitly made active.
- **pinned city** — A candidate destination saved in the compare row (up to three) for side-by-side weekend evaluation, held in memory only until the page is refreshed. NOT the active location unless the visitor promotes it, and not restored from a shareable view link.
- **comfort score** — A deterministic 0–100 rating of how pleasant a day will feel, derived from feels-like temperature, precipitation probability, wind, cloud cover, and UV, plus a short Ukrainian rationale sentence. NOT a raw temperature or a single weather variable.
- **weekend highlight** — The headline comfort read for the upcoming Saturday and Sunday in the active location's timezone: if today is Saturday or Sunday, the current in-progress Sat–Sun pair; otherwise the next upcoming Sat–Sun pair. The headline value is the arithmetic mean of the two days' comfort scores. NOT a generic weekly summary or a user-defined date range.
- **shareable view** — An application state restorable from the address bar so a recipient opens the same active location (coordinates and display name) without setup. Pinned cities, compare panel state, and scroll position are not part of the shareable view. NOT a saved account favorite or server-side bookmark.

## Invariants

- The application never sets cookies, never runs analytics or third-party trackers, and never reads geolocation except after an explicit visitor action.
- Comfort scoring is a pure, total function of declared weather inputs — the same inputs always yield the same score and rationale.
- UI copy is Ukrainian-first, calm, and practical — no exclamation marks in product strings.
- All third-party weather and map data is fetched via keyless, free-tier services only.

## Out of scope

- User accounts, server-side history, or persisted favorites — conflicts with privacy-first, keyless MVP.
- Push notifications, scheduled jobs, or background refresh — not needed for the weekend decision loop.
- Marine, aviation, or agriculture weather variables — outside leisure weekend trip planning.
- Localization beyond Ukrainian plus English labels — MVP language scope is fixed.
- Native mobile app — web experience is the workshop artifact.
- Climate or historical analysis beyond the seven-day forecast — decision horizon is the coming week.
