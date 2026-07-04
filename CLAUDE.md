# Weather Explorer — Agentic workshop repo

Greenfield scaffold for the SDD pipeline feature **weather-explorer**.

## Stack

- Next.js App Router, React 19, TypeScript strict
- Tailwind CSS 4 + shadcn-style UI primitives in `components/ui/`
- Vitest for unit tests on framework-free code in `lib/`
- Vercel deployment target

See `docs/architecture-map.md` for the full foundation map.

## Folder layout

```
app/           Next.js routes, layouts, route handlers (server BFF)
components/  UI components (feature + ui primitives)
lib/           Framework-free domain logic — NO next/* or react imports
docs/          SDD artifacts (spec, SAD, ADRs, contracts)
```

## Rules

1. **`lib/` is framework-free** — no `next/*`, no `react`, no DOM globals. Vitest covers `lib/`.
2. **Open-Meteo calls** go through server routes / RSC loaders, not raw client bundles.
3. **Privacy-first** — no application cookies, analytics, or trackers.
4. **Ukrainian-first UI** — strings live in `lib/i18n/uk.ts` (to be added with the feature).

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build
npm run lint     # ESLint
npm test         # Vitest unit tests
npx tsc --noEmit # typecheck
```

## SDD docs

- Feature spec: `docs/features/weather-explorer/spec.md`
- Architecture: `docs/features/weather-explorer/sad.md`
- API contract: `docs/features/weather-explorer/contracts/openapi.yaml`
- Roadmap: `docs/roadmap.md`
