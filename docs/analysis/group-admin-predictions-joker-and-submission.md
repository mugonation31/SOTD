# Feature: Group Admin Predictions — Joker Toggle & Real Submission

## Problem Statement

The group admin's "Make Predictions" tab has two compounding bugs:

1. **`onSubmitPredictions()` is fully mocked** — it builds a local `PlayerPrediction`
   object and pushes it into an in-memory array. It never calls
   `supabaseDataService.submitPredictions()`. Predictions typed by a group admin
   are silently discarded on page navigation.

2. **Joker toggle is absent** — no `jokersRemaining` state, no `jokerUsedThisGameweek`
   flag, no `canUseJoker()` guard, and no toggle UI. A group admin who is also a
   player cannot spend a seasonal joker from this page even though they are entitled to.

3. **UUID lost in `toMatchViewModel`** — `id: Number(row.id) || 0` converts the
   Supabase UUID to `0` (UUIDs are not numeric). The real UUID is needed to build
   the `match_id` FK on the `predictions` row. Without it, submission (once wired)
   would insert garbage foreign keys.

## Proposed Solution

Mirror the proven pattern from `player/pages/matches/matches.page.ts` exactly —
no new abstractions, no new services. Three files change:

| File | Change |
|------|--------|
| `predictions.page.ts` | Add joker state + real submission + UUID fix |
| `predictions.page.html` | Add joker indicator + toggle between deadline header and match cards |
| `predictions.page.spec.ts` | New unit tests covering joker state init, canUseJoker(), and submission |

## Technical Design

### State additions (`predictions.page.ts`)

```typescript
matchUuid: string;          // added to Match interface — preserves UUID for FK
currentGameweekId: string | null = null;   // gameweek UUID for prediction FK
jokersRemaining: number = 2;
jokerUsedThisGameweek: boolean = false;
isSubmitting: boolean = false;
```

### Hydration flow

`hydrateGameweekView(gameweekNumber)` already calls `getGameweeks()` and
`getMatches()`. Two additions:
- Extract `gameweekRow.id` → `this.currentGameweekId`
- Call `this.supabaseDataService.getJokerUsage()` → set `jokersRemaining`

### `toMatchViewModel` fix

```typescript
// Before (UUID → NaN → 0):
id: Number(row.id) || 0,

// After:
id: Number(row.external_id) || 0,   // display id (external int)
matchUuid: row.id,                   // FK for submission
```

### `canUseJoker()` — mirrors player page exactly

```typescript
canUseJoker(): boolean {
  if (this.currentGameWeek.isSpecial) return false;
  if (this.jokersRemaining <= 0) return false;
  if (this.predictionsLocked) return false;
  return true;
}
```

### Real `onSubmitPredictions()` — replaces mocked version

```typescript
async onSubmitPredictions(): Promise<void> {
  if (this.isSubmitting || !this.canSubmit || !this.currentGameweekId) return;
  this.isSubmitting = true;
  try {
    const rows = this.currentGameWeek.matches
      .filter(m => m.homeScore !== null && m.awayScore !== null)
      .map(m => ({
        match_id: m.matchUuid,
        gameweek_id: this.currentGameweekId!,
        gameweek_number: this.currentGameWeek.number,
        home_score: Number(m.homeScore),
        away_score: Number(m.awayScore),
        joker_used: this.jokerUsedThisGameweek,
      }));
    await this.supabaseDataService.submitPredictions(rows);
    if (this.jokerUsedThisGameweek) {
      await this.supabaseDataService.markJokerUsed(this.currentGameWeek.number);
      this.jokersRemaining = Math.max(0, this.jokersRemaining - 1);
    }
    this.resetPredictions();
    await this.showSuccessToast('Predictions saved!');
  } catch (err) {
    this.logger.error('group-admin-predictions.submit', err);
    const msg = err instanceof SupabaseError
      ? err.userMessage : 'Unable to save predictions. Please try again.';
    await this.showErrorToast(msg);
  } finally {
    this.isSubmitting = false;
  }
}
```

### Template additions (`predictions.page.html`)

Between the deadline header and the match cards:

```html
<!-- Joker indicator -->
<div class="joker-indicator" *ngIf="!predictionsLocked">
  <ion-icon name="star-outline"></ion-icon>
  <span>{{ jokersRemaining }}/2 jokers remaining</span>
</div>

<!-- Joker toggle -->
<div class="joker-toggle-row" *ngIf="canUseJoker()">
  <ion-label>Play Joker this gameweek</ion-label>
  <ion-toggle [(ngModel)]="jokerUsedThisGameweek"></ion-toggle>
</div>
```

Submit button gets `[disabled]="!canSubmit || isSubmitting"`.

## Database Changes

None. All schema, RPCs, and RLS policies are already in place:
- `predictions.joker_used` column (migration 005)
- `mark_joker_used(p_gameweek_number)` RPC (migration 007)
- `group_members.jokers_used` / `first_joker_gameweek` / `second_joker_gameweek`
- `getJokerUsage()` method already on `SupabaseDataService`

## Security Considerations

- Server-side RLS `deadline > NOW()` still enforces submission window — no change
- `mark_joker_used` RPC is SECURITY DEFINER scoped to `auth.uid()` — no change
- The mock `onSubmitPredictions` didn't call Supabase at all, so replacing it
  with a real call actually *increases* security (previously admins could "submit"
  without any server-side validation)
- Double-submit guard via `isSubmitting` flag — matches player page pattern

## Testing Strategy

**Unit tests (new spec file or additions to existing):**
- `canUseJoker()` returns false on special gameweek
- `canUseJoker()` returns false when `jokersRemaining === 0`
- `canUseJoker()` returns false when `predictionsLocked === true`
- `onSubmitPredictions()` calls `submitPredictions` with correct rows
- `onSubmitPredictions()` includes `joker_used: true` when toggle is on
- `onSubmitPredictions()` calls `markJokerUsed` only when joker was used
- `onSubmitPredictions()` is a no-op when `isSubmitting === true` (double-submit guard)
- `toMatchViewModel` preserves `matchUuid` from `row.id`
- `jokersRemaining` decrements after successful joker submission

**Manual QA:**
- Log in as group admin → Make Predictions tab → confirm joker indicator visible
- Toggle joker → submit → check Supabase `predictions` table for `joker_used = true`
- Check `group_members.jokers_used` incremented after submission

## Deployment Plan

1. Implement changes (TypeScript + template)
2. Run test suite: `cd frontend && npm test`
3. Code review via `/review`
4. Security scan via `/security-scan`
5. Push to main → Cloudflare auto-deploys
6. Manual QA on production URL

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| `getJokerUsage()` fails on init | Fail-open: default `jokersRemaining = 2`, log error |
| `currentGameweekId` null at submit time | Guard at top of `onSubmitPredictions` — show error toast |
| Admin submits joker then navigates away, `markJokerUsed` fails | Log error + show toast; predictions still saved (joker write is post-prediction) |
| `matchUuid` missing for a match row | Filter out matches without valid UUID before building rows |
