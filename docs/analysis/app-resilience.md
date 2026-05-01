# Feature: App Resilience — Professional Error Handling & No Infinite Hangs

## Problem Statement

Three categories of bad UX have been observed in production:

1. **Native browser dialogs** — `window.alert()` is called in 4 auth pages (login,
   signup ×2, forgot-password). This shows a raw OS-level popup that no professional
   app uses. The infrastructure to replace it already exists (`ToastService` +
   `error.utils.ts`) but isn't wired up.

2. **45-second UI freeze** — Auth service wraps Supabase sign-in in a `Promise.race`
   with a 45-second timeout (`auth.service.ts:635`). On a network stall the button
   shows "LOGGING IN..." for up to 45 seconds before the error callback fires.

3. **Infinite loading spinners** — `supabase-data.service.ts` has no query timeouts.
   If a network stall occurs mid-fetch, the `await` never resolves AND never throws,
   so `finally { isLoading = false }` never runs. The spinner is permanent. Affects
   Standings, Home, Group, Predictions pages.

4. **No offline detection** — the app fires Supabase requests even when the device
   is offline, producing confusing "Failed to fetch" errors instead of a clear
   "No internet connection" message.

5. **No skeleton loading** — spinning dots with no context look broken. Skeleton
   screens communicate "loading" without implying failure.

---

## Proposed Solution — 4 sub-tasks, smallest → largest

### 10.1 — Replace alert() with ToastService (30 min, zero risk)

Replace all 4 `window.alert()` calls with the existing `ToastService.showToast()`.
Use `getUserFriendlyErrorMessage()` from `error.utils.ts` for friendly copy.
Also reduce auth timeout from 45 s → 10 s.

**Files:**
- `auth/pages/login/login.page.ts` — line 190
- `auth/pages/signup/signup.page.ts` — lines 295, 323
- `auth/pages/forgot-password/forgot-password.page.ts` — line 104
- `core/services/auth.service.ts` — line 635 (45000 → 10000)

---

### 10.2 — Query timeout wrapper on SupabaseDataService (1–2 hrs)

Add a private `withTimeout<T>(promise, ms)` helper that `Promise.race`s every
Supabase query against a configurable timeout (default 8 s). Wrap all public
data-fetching methods. On timeout, throw a `SupabaseError` with a user-friendly
message — the existing `finally` blocks in each page then clear `isLoading`.

```typescript
private withTimeout<T>(promise: Promise<T>, ms = 8000): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), ms)
  );
  return Promise.race([promise, timeout]);
}
```

**Methods to wrap in `supabase-data.service.ts`:**
- `getGroups()` — used by standings, home, group pages
- `getLeaderboard()` → `fetchMembersWithProfiles()` — used by standings
- `getMatches()` — used by matches, admin predictions
- `getGameweeks()` — used by matches, admin predictions, group-standings
- `getGameweekDeadline()` — used by group-standings, admin predictions
- `getPredictionsWithMatches()` — used by player predictions
- `getGroupPredictions()` — used by admin predictions
- `submitPredictions()` — used by matches, admin predictions

---

### 10.3 — Offline detection (1 hr)

New `NetworkService` using `navigator.onLine` + `window.addEventListener('online'
/ 'offline')`. Exposes a `BehaviorSubject<boolean>` that `AppComponent` subscribes
to, showing a persistent `ion-toast` (no duration — stays until reconnected) when
the device goes offline.

```typescript
@Injectable({ providedIn: 'root' })
export class NetworkService {
  private online$ = new BehaviorSubject<boolean>(navigator.onLine);
  readonly isOnline$ = this.online$.asObservable();
  constructor() {
    window.addEventListener('online', () => this.online$.next(true));
    window.addEventListener('offline', () => this.online$.next(false));
  }
}
```

**Files:**
- `core/services/network.service.ts` (new)
- `app.component.ts` (subscribe + show/dismiss toast)

---

### 10.4 — Skeleton loading on key pages (2–3 hrs)

Replace the `<ion-spinner>` + plain text pattern with `<ion-skeleton-text>` cards
on the 3 most user-visible pages that currently hang: Standings, Group (admin),
and Home (admin). The skeleton matches the shape of the real content so the
transition feels smooth.

**Pages:**
- `player/pages/standings/standings.page.html` + `.scss`
- `group-admin/pages/home/home.page.html` + `.scss`
- `group-admin/pages/group/group.page.html` + `.scss`

---

## Database Changes

None. All fixes are client-side.

---

## Security Considerations

- Reducing auth timeout from 45 s → 10 s: safe. Supabase auth completes in < 3 s
  on a healthy connection. 45 s was overly generous for lock-clearing scenarios
  that are now resolved.
- Query timeout: errors are user-facing only — no auth bypass risk.
- `NetworkService` reads `navigator.onLine` — browser API, no security surface.

---

## Testing Strategy

**10.1 — alert() replacement:**
- Unit: login/signup error callback calls `ToastService.showToast()` not `alert()`
- Unit: forgot-password success calls `ToastService.showToast()` with success type

**10.2 — Query timeouts:**
- Unit: `withTimeout()` rejects after specified ms
- Unit: `getGroups()` etc. reject with timeout error when query hangs
- Unit: standings page `isLoading` resets to false after timeout

**10.3 — Offline detection:**
- Unit: `NetworkService` emits false on offline event, true on online event
- Unit: `AppComponent` shows toast when `isOnline$` emits false

**10.4 — Skeletons:**
- Component: skeleton renders when `isLoading = true`
- Component: skeleton hidden when `isLoading = false`

---

## Deployment Plan

1. Sub-task 10.1: implement → test → review → security → push (smallest, do first)
2. Sub-task 10.2: implement → test → review → security → push
3. Sub-task 10.3: implement → test → review → security → push
4. Sub-task 10.4: implement → test → review → security → push (visual, manual QA)

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| 10 s timeout too short on slow connections | 10 s is 3× the 99th-percentile Supabase response. User gets a retry button via toast rather than hanging forever |
| Skeleton shape doesn't match real content | Use actual card dimensions; animate with Ionic's built-in `animated` attribute |
| `NetworkService` offline event doesn't fire on all browsers | `navigator.onLine` is the fallback; also retry button in error toast |
| Reducing auth timeout breaks slow-network users | Auth errors now show a friendly toast with "Try again" — better than 45 s freeze |
