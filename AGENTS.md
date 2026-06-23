# AGENTS.md — eva-sync-hud

## Project

**EVA SYNC** — NGE-styled pilot health command center. Oura Ring = Eva biometrics; user = pilot.

## Stack

- Next.js 15 (App Router) + TypeScript
- Oura API v2 (OAuth + PAT fallback)
- Vercel deploy
- Legacy cinematic HUD: `public/cinematic/index.html`

## Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
```

## Env (see `.env.example`)

- `OURA_PERSONAL_ACCESS_TOKEN` — fastest when ring arrives
- `OURA_CLIENT_ID` / `OURA_CLIENT_SECRET` / `OURA_REDIRECT_URI` — OAuth

## Conventions

- `PilotState` in `src/types/pilot.ts` is the single dashboard model
- Map Oura → pilot in `src/lib/oura/mapper.ts` only
- Five wings: status, sleep, strain, nutrition, trends
- NGE aesthetic: dense panels, neon green/purple, cascades, no minimal UX
- Secrets never in client components

## Docs

`docs/ARCHITECTURE.md` — wireframes, data flow, security, Oura checklist