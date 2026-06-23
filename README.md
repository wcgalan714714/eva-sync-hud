# EVA SYNC HUD

Neon Genesis Evangelion–styled **pilot health command center**. Live biometrics from **Oura Ring** mapped to Eva/pilot metaphors (SYNC readiness, neural HRV, strain, recovery).

## Live

- **Dashboard (new):** https://eva-sync-hud.vercel.app
- **Cinematic HUD (legacy):** https://eva-sync-hud.vercel.app/cinematic/index.html

## Main menu wings

1. **Pilot Status** — Readiness SYNC gauge, HRV, RHR, stress, alert cascade
2. **Sleep & Recovery** — Oura sleep score + recovery
3. **Strain & Activity** — Strain, steps, calories + custom knee tracking
4. **Nutrition** — Protein, IF, hydration (manual + future Apple Health)
5. **Trends** — 7-day charts (post-Oura hookup)

## Quick start (Oura arrives)

```bash
cp .env.example .env
# Add OURA_PERSONAL_ACCESS_TOKEN from https://cloud.ouraring.com
npm install
npm run dev
```

Open http://localhost:3000 → **FORCE SYNC** or **CONNECT OURA**.

## API routes

| Route | Purpose |
|-------|---------|
| `GET /api/health` | Config status |
| `GET /api/oura/auth` | Start OAuth |
| `GET /api/oura/callback` | OAuth callback |
| `GET /api/oura/sync` | Fetch Oura → `PilotState` JSON |

## Docs

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for wireframes, security model, and integration checklist.

## Legacy

The original single-file Ray-Ban cinematic experience is preserved at `/cinematic/index.html`.