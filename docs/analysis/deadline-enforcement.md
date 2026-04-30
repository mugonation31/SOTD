# Feature: Deadline Enforcement

## Audit Date: 2026-04-30

## Problem Statement

Predictions must lock exactly 1 hour before the earliest kickoff in a gameweek. After
the deadline, players cannot add or change predictions, and other players' picks become
visible. Without this, the game is broken — players can copy the leader's picks after
kickoff.

## Audit Verdict: Substantially Complete

A full code audit shows deadline enforcement is almost entirely built. The breakdown:

---

## What Is Already Done

### Client-side (matches.page.ts)
| Feature | Status | Location |
|---------|--------|----------|
| Countdown timer component | ✅ Done | `shared/components/countdown-timer/` |
| `isLocked` flag (init from deadline) | ✅ Done | `matches.page.ts:996,1678` |
| `canSubmit()` blocks when locked | ✅ Done | `matches.page.ts:1416` |
| `isInputDisabled()` disables inputs | ✅ Done | `matches.page.ts:1442` |
| `onSubmit()` guard returns early | ✅ Done | `matches.page.ts:1450` |
| `onDeadlinePassed()` flips isLocked | ✅ Done | `matches.page.ts:1692` |
| Visual locked banner in template | ✅ Done | `matches.page.ts:293` |
| Page-load: sets isLocked if past deadline | ✅ Done | `matches.page.ts:1678` |

### Server-side (RLS policies — migration 005)
| Policy | Status | Effect |
|--------|--------|--------|
| INSERT blocked after deadline | ✅ Done | `deadline > NOW()` |
| UPDATE blocked after deadline | ✅ Done | `deadline > NOW() AND NOT is_locked` |
| Own predictions always visible | ✅ Done | `auth.uid() = user_id` |
| Others' predictions gated to post-deadline | ✅ Done | `deadline < NOW()` |

### Deadline value calculation
| Item | Status | Location |
|------|--------|----------|
| `sync-matches` sets deadline = 1hr before earliest kickoff | ✅ Done | `functions/sync-matches/index.ts:45,65` |
| `getGameweekDeadline()` helper in data service | ✅ Done | `supabase-data.service.ts:346` |

### Prediction visibility UI
| Page | Status | Notes |
|------|--------|-------|
| Group admin predictions | ✅ Done | `predictionsLocked` flag + "visible after deadline" placeholder |
| Group standings (player) | ✅ Done | `predictionsLocked` flag wired |
| Player predictions (own picks) | ✅ Done | Only shows own picks — no cross-user leak |

---

## The One Real Gap

### `lock_predictions_after_deadline()` — no cron caller

The DB function exists (migration 005, line 118) and correctly sets `is_locked = true`
on prediction rows after their gameweek deadline. But nothing calls it periodically.

**Impact assessment:** LOW — the RLS `deadline > NOW()` check handles the actual
enforcement at query time. `is_locked` is belt-and-braces and not used by the scoring
trigger. Predictions are effectively locked even with `is_locked = false` because
the INSERT/UPDATE RLS policies use `deadline > NOW()`, not `is_locked`.

**Fix:** Call `lock_predictions_after_deadline()` via `rpc()` at the end of the
`sync-matches` edge function. This piggybacks on the existing heartbeat — every sync
also locks past-deadline predictions. No pg_cron (Pro plan) needed.

---

## Proposed Fix (Single Change)

Add to `supabase/functions/sync-matches/index.ts` after the upsert block:

```typescript
// Lock predictions for any gameweek whose deadline has now passed.
await supabase.rpc('lock_predictions_after_deadline');
```

This is ~1 line in an existing file.

---

## No Migration Needed

All schema, RLS policies, and DB functions are already deployed.

---

## Testing Strategy

- Unit: `CountdownTimerComponent` spec already exists and passes
- Integration: RLS policies testable via Supabase CLI `db test`
- Manual: Set a gameweek deadline 2 minutes in the future; verify form locks at T+0
  and the sync-matches call flips `is_locked` on existing prediction rows
