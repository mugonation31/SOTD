---
name: Football Data API
description: football-data.org free tier API for EPL fixtures and results - key stored in Supabase secrets
type: reference
---

- **Provider**: football-data.org
- **Plan**: Free tier (12 competitions, 10 calls/min, scores delayed)
- **Auth**: HTTP header `X-Auth-Token` with API key
- **Key storage**: Supabase Edge Function secrets (NOT in codebase)
- **EPL competition code**: `PL` (Premier League)
- **Useful endpoints**:
  - `GET /v4/competitions/PL/matches` — all PL matches for current season
  - `GET /v4/competitions/PL/matches?matchday=X` — matches for specific gameweek
  - `GET /v4/competitions/PL/standings` — league table
- **Limitations**: Scores delayed (not real-time), schedules delayed
