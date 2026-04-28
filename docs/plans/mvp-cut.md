# MVP Cut Plan — Restructure player + group-admin surfaces

**Goal:** trim the app to exactly what 5 friends-and-family need to play
the last 5 EPL gameweeks of the 2025-26 season. Delete dead pages,
collapse duplicates, replace mock-data dashboards with a real "what
happened last week / what's next" home.

**Date created:** 2026-04-27
**Owner:** Simba (super-admin, single dev)
**Cohort:** 5 users, 1 group, GW34-38

---

## Locked decisions (from product conversation)

1. **Deadline model = Option A.** One gameweek-level deadline, 1 hour
   before the earliest kick-off in that GW. Already implemented in
   `sync-matches`'s `calculateGameweekDeadline`. No change needed.
2. **Promote/demote admins = in scope.** Max 3 admins per group.
   Schema change required: `group_members.is_admin BOOLEAN DEFAULT FALSE`
   becomes the source of truth. `groups.admin_id` becomes "creator,"
   not "the admin." All RLS that currently keys on `groups.admin_id`
   needs updating to also accept `group_members.is_admin = TRUE`.
3. **No redirects, just deletions.** Delete what we don't use.
4. **Player landing priority order (the home page logic):**
   1. How I did last week (recap card)
   2. Where I am on the leaderboard (top-3 preview + my row)
   3. What's coming next (next-GW countdown + "Predict Now" CTA)

---

## Target architecture — 5 routes per platform

### Player (5 routes)

| Route | Job |
|---|---|
| `/player` (Home) | Last-week recap → leaderboard preview → next-GW countdown + CTA |
| `/player/predictions` | Pick this week's 3 matches, joker toggle, live countdown, submit |
| `/player/history` | Every past GW: my predictions, my points, group leaderboard at that point |
| `/player/standings` | Full current leaderboard for my group |
| `/player/settings` | Sign out, profile |

### Group admin (5 routes — symmetric)

| Route | Job |
|---|---|
| `/group-admin` (Home) | Same as player home (admin is also a player) + admin block: group code, member count, "Manage Group" link |
| `/group-admin/predictions` | Identical to player predictions — admin competes |
| `/group-admin/history` | Own predictions + points per past GW + post-deadline visibility into other members' predictions |
| `/group-admin/group` | Member list, promote/demote (admin's superpower), shareable group code, current GW info |
| `/group-admin/settings` | Sign out, profile |

---

## What gets deleted

### Player

- `frontend/src/app/platforms/player/pages/dashboard/` — replaced by new home
- ~~`frontend/src/app/platforms/player/pages/matches/`~~ **KEEP** — this is where players actually MAKE predictions (score inputs, joker toggle, submit). `predictions.page` is the read-only "my picks" view. Two-page split is intentional. Nav now reads "Predict" / "My Picks" to make the distinction obvious.
- `frontend/src/app/platforms/player/pages/groups/` — collapsed into standings/home
- `frontend/src/app/platforms/player/pages/group-standings/` — merged into `/player/standings`
- ~~`frontend/src/app/platforms/player/pages/join-group/`~~ **KEEP** — first-login flow already sends new players here; that onboarding is intentional and works. Don't collapse it into the home empty-state.

### Group admin

- `frontend/src/app/platforms/group-admin/pages/dashboard/` — replaced by new home
- `frontend/src/app/platforms/group-admin/pages/live/` — no purpose for this cohort
- `frontend/src/app/platforms/group-admin/pages/leaderboard/` — merged into `/group-admin/history` and `/group-admin/group`
- `frontend/src/app/platforms/group-admin/pages/members/` — becomes the new `/group-admin/group` page
- `frontend/src/app/platforms/group-admin/pages/groups/` — collapsed
- `frontend/src/app/platforms/group-admin/pages/create-group/` — becomes empty-state of `/group-admin/group` (or modal)

**Net effect:** 16 pages → 10 pages.

---

## Phases

Each phase is one focused work-unit, ideally one Plan→TDD→Review→Security→
E2E cycle per the project memory. Sizes: S=≤2hr, M=half-day, L=full-day.

### Phase 1 — Delete dead pages + nav cleanup (S)

- Delete the 11 pages listed above.
- Strip routes from `player.routes.ts` and `group-admin.routes.ts`.
- Update bottom-nav components (player layout + group-admin layout).
- Update any cross-page links / `routerLink` references that pointed at
  deleted routes — replace with the new collapsed targets.

**Acceptance:** App builds, type-check passes, no 404 navigation
exists from any remaining page. Test suite holds at baseline.

### Phase 2 — Build player home (`/player`) (M)

- New page: `frontend/src/app/platforms/player/pages/home/`.
- Composition: three stacked cards in priority order.
  1. **Last-week recap card.** Shows the most-recent GW with at least
     one match completed. Pulls predictions for that GW + matches +
     calculates points already-scored. Shows: "GW N — you scored X
     points, came Y/Z, perfect round badge if applicable."
  2. **Leaderboard preview card.** Top 3 by `total_points` + the
     caller's row if they're not in top 3. Tap → `/player/standings`.
  3. **Next-GW countdown card.** The first gameweek with
     `deadline > NOW()`. Shows deadline + countdown (reuse
     `CountdownTimerComponent`) + "Predict Now" CTA → `/player/predictions`.
     If user has already predicted this week's GW, show "Predictions
     locked in ✓ — change them anytime before the deadline."
- Empty state: when player is in 0 groups, show "Join a group to start
  predicting" + 6-char code input. Trade-off vs a separate
  `/player/join-group` page: this keeps the empty path one-click.

**Acceptance:** Home loads with real data for player1 (in
AdminTestGroup). Last-week recap shows 0 points / 0 of 0 (no past GWs
yet — gracefully handle empty). Leaderboard preview renders the 2
members. Next-GW countdown shows GW35.

### Phase 3 — Extend home for group admin (S)

- New page: `frontend/src/app/platforms/group-admin/pages/home/`.
- Re-use Phase 2 components (extract them to `shared/components` if
  not already there).
- Add an "Admin block" below the three player cards: group name +
  shareable code (with copy button) + member count + "Manage Group"
  link → `/group-admin/group`.

**Acceptance:** Admin home loads, admin block renders. The three
player cards show identical data to what the same user would see on
`/player`.

### Phase 4 — Build `/history` for both platforms (M)

- New pages: `player/pages/history/` + `group-admin/pages/history/`.
- For each past GW (where `is_completed = TRUE` or where the deadline
  has passed and at least one match is finished):
  - Show the GW number + dates.
  - Show the caller's 3 predictions for that GW (including joker
    flag if used).
  - Show match results next to each prediction.
  - Show points earned per prediction.
  - Total points for the GW.
- For group-admin's `/history`: ALSO show, for each past GW (post-
  deadline), every member's predictions side-by-side. RLS already
  permits this via the deadline-locked visibility policy on
  `predictions` (migration 005). Verify before relying on it.

**Acceptance:** History renders empty-state on a fresh database
(no past GWs yet). Once a GW completes mid-test, history populates.
Group-admin extra view shows other members' predictions only after
deadline.

### Phase 5 — Multi-admin schema + RLS migration (M)

Migration `017_multi_admin_per_group.sql`:

- Add `is_admin BOOLEAN DEFAULT FALSE` to `group_members`.
- Add CHECK constraint or trigger: at most 3 rows per `group_id`
  with `is_admin = TRUE`. (Plan: trigger on INSERT/UPDATE that
  raises if count goes above 3.)
- Backfill: every existing `groups.admin_id` becomes the
  corresponding `group_members.is_admin = TRUE`.
- Update RLS policies that reference `groups.admin_id`:
  - `groups`: SELECT/UPDATE/DELETE policies must accept either
    `admin_id = auth.uid()` (creator) OR caller's `group_members.is_admin
    = TRUE`. (Likely a new helper function `is_group_admin(group_id)`,
    SECURITY DEFINER, mirroring `is_group_co_member`.)
  - `group_members`: "Group admins can update members" /
    "Group admins can remove members" policies must use
    `is_group_admin(group_id)`.
  - `predictions`: any admin-only visibility rule needs updating.
- Document `groups.admin_id` semantics: now means "creator," not
  "the only admin." Cannot be deactivated/removed (FK ON DELETE
  CASCADE still cascades the group). Adding a second admin doesn't
  affect this column.

**Acceptance:** Migration applies cleanly. Existing single-admin
group continues to work. New `is_group_admin()` helper returns TRUE
for `admin_id` matches AND for any `is_admin = TRUE` member.
`pg_policies` shows the updated USING/WITH_CHECK clauses.

### Phase 6 — Build `/group-admin/group` with promote/demote (M)

- Replaces `members.page.ts` (which is being deleted in Phase 1 —
  but until Phase 6 ships, the deletion will leave a hole; sequence
  Phase 1 with this phase together).
- Render member list with current role: ADMIN badge for any member
  with `is_admin = TRUE` (covers both creator and promoted admins).
- Per-member actions (visible only to admins):
  - **Promote**: button shown for non-admin members. Disabled if
    group already has 3 admins. Calls service that sets
    `group_members.is_admin = TRUE`.
  - **Demote**: button shown for admins who are NOT the creator
    (`groups.admin_id`). The creator can't be demoted. Calls
    service that sets `group_members.is_admin = FALSE`.
  - **Remove**: existing functionality, gated to admins.
- Confirmation alerts on promote/demote. Toast on success/failure.
- Empty state: when admin has no group, show create-group form
  inline (replaces the separate `create-group` page).

**Acceptance:** Admin can promote a player → ADMIN badge appears.
Demote → badge disappears. Promote button greys out when 3
admins exist. Creator's row never shows demote button. Test the
RLS path: promoted admin can edit member status, demoted admin
cannot.

### Phase 8 — Settings/Profile real-data wiring (S)

Both `/player/settings` and `/group-admin/settings` currently render
hardcoded fixture data: "John Player", "john.player@example.com",
"+44 7123 456789", role "Player", joined "2024-01-01". Real users see
this on first login and immediately notice it's not them.

Tasks:
- Replace the hardcoded constants with reads from `profiles` (email,
  first_name, last_name, role, created_at, avatar_url) keyed on
  `auth.uid()`.
- "Update Profile" button writes back via the existing RLS-permitted
  update path — owner can edit their own row, except the `role`
  column (covered by migration 001's WITH CHECK clause).
- "Phone" field: not in the current `profiles` schema. Either:
  a) Hide the field for MVP (recommended — nobody uses it yet), or
  b) Add `phone TEXT` to profiles in a new migration and surface it.
  Going with (a) for now.
- "Joined Date" should bind to `profiles.created_at` formatted as
  `mediumDate`.
- "Change Password" already uses Supabase Auth — verify it still
  works under the ES256 / sb_publishable_ keys; current spec passes
  but the prod path hasn't been smoke-tested since the auth refactor.
- Apply identical treatment to the group-admin settings page (which
  is the same component or near-identical).

Acceptance: Logged in as player1, settings shows
"Player One / player1@predict3.co.uk / Player / Apr 24 2026". Edit
first name → save → reload → persists. Email is read-only (Supabase
auth manages it). Role is read-only.

### Phase 7 — Joker UX polish (S, conditional)

- Audit current joker UI on `/player/predictions` and `/group-admin/
  predictions`.
- Required behaviour:
  - Toggle visible at the top of the prediction surface.
  - Disabled if the player has already used 2 jokers this season
    (`group_members.jokers_used >= 2`).
  - Active toggle persists across submit.
  - Visual indicator on submitted predictions that joker was
    applied: "JOKER" badge + 2x scoring shown in history.
- Skip this phase if current UI already meets the requirements.
  Confirm by manual run-through before declaring done.

**Acceptance:** Joker can be toggled on a fresh GW. After use, the
remaining count decrements. The 3rd attempt is blocked client-side
(belt) and server-side via the `mark_joker_used` RPC's existing
guard (braces).

### Phase 9 — Multi-group join CTA (S)

**Title:** Surface a "Join another group" CTA so players already in one
group can enter a second group code without leaving the app or being
treated as new users.

The current first-login flow routes 0-group players to
`/player/join-group`, but once a player is in any group the join surface
is unreachable from the player and group-admin shells. With promote/demote
and history landing this cycle, the same human can legitimately belong to
multiple groups (e.g. a friends group plus a work group), so the join page
needs to be a steady-state action — not just an onboarding gate.

**Size:** S

**Files:**
- `frontend/src/app/platforms/player/pages/home/home.page.html`
  (add CTA in admin-adjacent / footer slot)
- `frontend/src/app/platforms/player/pages/home/home.page.ts`
  (handler that routes to `/player/join-group`)
- `frontend/src/app/platforms/group-admin/pages/group/group.page.html`
  (add "Join another group" secondary action below the member list)
- `frontend/src/app/platforms/group-admin/pages/group/group.page.ts`
  (handler)
- `frontend/src/app/platforms/player/pages/join-group/join-group.page.ts`
  (loosen the "redirect away if already in a group" guard so the page
  is reachable as an explicit action; keep the auto-redirect only for
  the first-login deep path)
- `frontend/src/app/platforms/player/player.routes.ts` /
  `frontend/src/app/platforms/group-admin/group-admin.routes.ts`
  (confirm `/join-group` route is reachable from both shells; reuse
  the existing player route from group-admin via shared link if simpler)
- `frontend/src/app/core/services/group.service.ts`
  (verify `joinGroup(code)` already appends to `group_members` rather
  than replacing — no change expected, but covered by tests)

**TDD scenarios:**
1. Player already in 1 group taps "Join another group" CTA on
   `/player` → router navigates to `/player/join-group` (no
   auto-redirect back to home).
2. Player submits a valid 6-char code on the join page while already
   in a group → `group_members` row inserted for the new group, toast
   confirms, routed to `/player`. Existing membership is untouched.
3. Player submits a code for a group they're already a member of →
   inline error "You're already in this group" surfaces; no duplicate
   `group_members` row created. (Relies on the unique
   `(group_id, user_id)` constraint already in place.)
4. Group admin on `/group-admin/group` taps "Join another group" →
   navigates to the join surface; a successful join does not affect
   their admin status in the original group.
5. Settings/home empty-state path (player in 0 groups) still
   auto-routes to `/player/join-group` on first load — regression
   guard for the existing onboarding flow.

**Implementation outline:**
- Add a small `<ion-button fill="outline">Join another group</ion-button>`
  to the player home (under the leaderboard preview card or in a
  fourth utility card) and to the group-admin group page (under the
  member list, paired with the existing copy-code button).
- Update `join-group.page.ts` so the "already in a group, redirect
  home" branch only fires when the page is hit via the post-signup
  deep link (e.g. query param `?onboarding=1`), not on direct
  navigation. Default behaviour: render the form regardless of
  current membership count.
- Confirm `GroupService.joinGroup` is idempotent on the unique
  constraint and surfaces a friendly error.
- No schema changes — the `group_members` table already supports
  multiple rows per `user_id`.

**Acceptance:**
- Player in AdminTestGroup can tap "Join another group" from
  `/player`, enter a second valid code, and end up with two rows in
  `group_members` for their `auth.uid()`.
- Their `/player/standings` and `/player/history` continue to scope
  to whichever group is "active" (out of scope for this phase: a
  group switcher; defer until 2+ groups exist for any real user).
- The first-login onboarding redirect for 0-group players still
  works.
- All existing tests stay green; new specs cover the 5 TDD scenarios.

### Phase 10 — Drop redundant Settings bottom-nav tab (XS)

**Title:** Remove the Settings tab from the player and group-admin
bottom-nav bars. The per-page header already has a profile icon
(top-right `person-outline`) that routes to `/<platform>/settings`,
so the bottom-nav entry is duplicate UX.

**Files:**
- `frontend/src/app/platforms/player/layout/player-layout.page.html`
  — delete the `<ion-tab-button tab="settings">` block (lines 18-21).
- `frontend/src/app/platforms/group-admin/layout/group-admin-layout.page.html`
  — delete the `<ion-tab-button tab="settings">` block (lines 35-38).
- `frontend/src/app/platforms/player/layout/player-layout.page.ts`
  — drop the now-unused `settingsOutline` import + `addIcons` entry.
- `frontend/src/app/platforms/group-admin/layout/group-admin-layout.page.ts`
  — drop the now-unused `settingsOutline` import + `addIcons` entry.

**TDD scenarios:**
1. `/player/home`: bottom-nav renders exactly 3 tabs (Home, My Picks,
   Standings) — no Settings tab.
2. `/group-admin/home`: bottom-nav renders exactly 3 tabs (Home,
   Predictions, Group) — no Settings tab.
3. Top-right profile icon on any player page still routes to
   `/player/settings` and the page loads.
4. Top-right profile icon on any group-admin page still routes to
   `/group-admin/settings` and the page loads.
5. Direct navigation to `/player/settings` and `/group-admin/settings`
   continues to work (route definitions untouched).

**Implementation outline:**
- Delete the 4-line tab-button block from each layout HTML.
- In each layout TS, remove `settingsOutline` from the `ionicons/icons`
  import list and from the `addIcons({...})` call. Leave all other
  icons alone — header + remaining tabs still reference them.
- No route, guard, or service changes. Settings page stays as-is.

**Acceptance:**
- `npm test` clean (no new failures vs baseline).
- `e2e/specs/smoke/navigation.spec.ts` still passes (no Settings-tab
  reference in current spec).
- `player-join-another-group.spec.ts` E2E still passes.
- Visual: 3 tabs at bottom on both shells; profile icon top-right
  still navigates to settings on every page.

**Non-goals:** Not removing the settings page. Not changing settings
content. Not adding a new profile icon. Not touching super-admin.

### Phase 11 — Token-leak cleanup (S, split into 11.1 + 11.2)

**Title:** Stop leaking Supabase session tokens through `console.log` and
`localStorage`. Three findings from the launch-readiness review (B1, H2, B2)
each expose access/refresh tokens to anyone with devtools, browser
extensions, or screenshare access. Pre-launch must-fix.

#### 11.1 — Redact session and recovery-URL logs in supabase.service (S)

**Size:** S — 2 call sites, ~24 line diff

**Files:**
- `frontend/src/app/services/supabase.service.ts` (B1: signIn logs around
  L373-383; H2: handleDeepLinkSession log around L693)
- `frontend/src/app/services/supabase.service.spec.ts` (new specs only)

**TDD scenarios:**
1. B1 — successful signIn does not log refresh_token (spy on console,
   walk all calls, assert no `'AT_FAKE'`/`'RT_FAKE'`/`'refresh_token'`).
2. B1 — failed signIn does not log session payload.
3. H2 — handleDeepLinkSession does not log fragment substrings.
4. H2 — diagnostic log keeps origin/pathname + `type` (debug signal preserved).
5. H2 — `auth.setSession` still receives unredacted tokens (behaviour preserved).

**Implementation outline:**
- Delete `console.log('Data:', data)` and `console.log('Error:', error)`
  in signIn; the success-marker log keeps its prefix without the payload.
- Hoist URL parsing + `type` extraction above the deep-link log; emit
  `${urlObj.origin}${urlObj.pathname} (type=${type})` instead of `url`.
- No helper, no lint rule — inline redaction for two sites.

**Acceptance:**
- 5 new specs green; existing supabase.service.spec.ts unchanged.
- `npm test` clean (16 pre-existing auth/signup failures unchanged).
- Manual: sign in with devtools open, search console for `eyJ` — zero hits.

#### 11.2 — Hold reset-password token in memory, drop localStorage (S)

**Size:** S — adds setter on AuthService, deletes 5 localStorage writes

**Files:**
- `frontend/src/app/platforms/auth/pages/reset-password/reset-password.page.ts`
  (5 `localStorage.setItem('current_reset_token', …)` writes around
  L118/170/198/229/250 + 2 `removeItem` calls)
- `frontend/src/app/core/services/auth.service.ts`
  (`updatePasswordWithTokens` localStorage/sessionStorage reads around
  L1455-1460; add `setResetAccessToken` / `clearResetAccessToken`)
- `frontend/src/app/platforms/auth/pages/reset-password/reset-password.page.spec.ts`
  (new specs only — must NOT modify existing 42 passing assertions)

**TDD scenarios (all new — append, do not edit existing):**
1. `checkHashFragment` populates `accessToken` field WITHOUT calling
   `localStorage.setItem('current_reset_token', …)`.
2. PKCE query-param flow (`?code=…`) — same assertion.
3. `checkRawUrlForToken` — same assertion.
4. `checkUrlPathForToken` — same assertion.
5. Component calls `authService.setResetAccessToken('AT')` after capture.
6. `ngOnDestroy` calls `authService.clearResetAccessToken()` for cleanup.

**Implementation outline (Option B — preserves existing API signature):**
- Add private `resetAccessToken: string | null = null` to AuthService
  with `setResetAccessToken(t)` / `clearResetAccessToken()` accessors.
- In `updatePasswordWithTokens`, replace `localStorage.getItem(...)` and
  `sessionStorage.getItem(...)` fallbacks with `this.resetAccessToken`.
  Self-clear after success or failure.
- In reset-password page, replace each `localStorage.setItem(...)` with
  `this.authService.setResetAccessToken(token)`. Delete `removeItem` calls.
- Add `OnDestroy` lifecycle calling `clearResetAccessToken()`.

**Why Option B (memory cell on service, not new arg to existing method):**
The existing spec at L230 asserts
`updatePasswordWithTokens.toHaveBeenCalledWith('NewPassword123!')` —
adding a 2nd arg would break it. Per CLAUDE.md project rule we never
modify passing assertions. Setter pattern keeps the public API stable.

**Acceptance:**
- 6 new specs green; all 42 existing reset-password specs unchanged.
- Codebase grep for `'current_reset_token'` returns zero hits.
- `npm test` clean. `npm run build:prod` succeeds.
- Manual: reset password via real email link with devtools open,
  Application > Local Storage shows no `current_reset_token` key.

**Risks:**
- The L230 spec is the trip wire — verified before implementation that
  Option B keeps it green. If any other existing assertion depends on
  localStorage state, stop and re-plan rather than edit the spec.
- In-memory token only survives until tab close — acceptable, that's the
  point. Worst case: user closes tab mid-form → must restart from email
  link. Better than persistent localStorage.

**Non-goals (deferred from this phase):**
- Lint rule against future `console.log(token)` patterns (was originally
  scoped here, descoped — single-purpose phase). Add as separate task if
  desired post-launch.
- CSP header for XSS defense-in-depth (separate MEDIUM finding).
- Stripping the URL fragment after capture (bigger refactor).

#### 11.3 — Same-class residuals on adjacent surfaces (S)

**Size:** S — surfaced by post-11.2 security re-scan; same threat
class as B1 + B2 hiding on parallel code paths.

**Files:**
- `frontend/src/app/platforms/auth/pages/reset-password/reset-password.page.ts`
  (RESID-1: `setTestToken()` public method writes recovery token to
  `localStorage` under `test_reset_token` — same B2 vulnerability,
  different key. Comment says "Remove in production." Delete the method,
  the matching spec block, and the `removeItem('test_reset_token')` line
  in `ngOnInit`.)
- `frontend/src/app/core/services/auth.service.ts`
  (RESID-2: `console.log('Supabase signIn completed:', result)` around
  L641 dumps the full session including `access_token` + `refresh_token`
  — same B1 leak class on the AuthService path. Replace with a marker
  log carrying only `{ hasUser, hasSession }`.)
- `frontend/src/app/platforms/auth/pages/reset-password/reset-password.page.spec.ts`
  (delete the spec block exercising `setTestToken`; new spec confirming
  `setTestToken` no longer exists or no longer writes to localStorage.)
- `frontend/src/app/core/services/auth.service.spec.ts`
  (new spec spying on `console.log` during signIn → assert no log
  argument contains `access_token`/`refresh_token`/JWT shape; reuses the
  Phase 11.1 `concatLoggedStrings` regression-guard pattern.)

**TDD scenarios:**
1. `setTestToken` is no longer present on the component (or, if kept as
   a test-only no-op, calling it does NOT call `localStorage.setItem`
   with key `test_reset_token`).
2. AuthService `signIn` (or the wrapping method that emits the L641 log)
   produces no console output containing `access_token`, `refresh_token`,
   or JWT-shaped substrings — pattern parity with `supabase.service.spec.ts`.

**Implementation outline:**
- Delete `setTestToken()` method body and its spec describe block.
  Keep `removeItem('test_reset_token')` cleanup on init only if grep
  finds any remaining writers; otherwise delete it too.
- Replace L641 `console.log('Supabase signIn completed:', result)` with
  `console.log('Supabase signIn completed', { hasUser: !!result?.data?.user, hasSession: !!result?.data?.session })`.
- Audit the immediately surrounding lines (L676, L1047, L1050 noted as
  PII leaks — MEDIUM/LOW from re-scan) and decide per case. Stick to
  the HIGH-class fixes for this phase; PII follow-up out of scope.

**Acceptance:**
- `grep -rn "test_reset_token" frontend/src/ | grep -v "\.spec\.ts"` → zero hits
- `grep -rn "console.log.*result" frontend/src/app/core/services/auth.service.ts | grep -v "hasSession"` → no matches that would re-leak a session
- New specs green; existing 16 pre-existing failures unchanged
- `npm test` clean; full E2E smoke clean

**Non-goals:**
- PII-class log dumps (MEDIUM/LOW residuals — separate cleanup ticket)
- Other ~140 console.log sites bundled in production output (LOW)

### Phase 12 — Remaining HIGH cluster from launch-readiness review (S+S+S)

**Title:** Fix the three HIGH-severity issues from today's full-app
review that are clear-cut code changes (B3 deferred — needs manual
verification first). All three are launch-blockers for the 5-user
cohort but each is ~10-15 min of work.

#### 12.1 — Move `markFirstLoginComplete` to post-join branch (H3, S)

**Files:**
- `frontend/src/app/platforms/player/pages/join-group/join-group.page.ts`
  (currently `handleFirstTimeUser` runs in `ngOnInit` — flips the flag
  on page load regardless of whether the user actually joins. If they
  bounce, next login routes them to `/player/home` with no group →
  broken UX.)
- `frontend/src/app/platforms/player/pages/join-group/join-group.page.spec.ts`

**TDD scenarios:**
1. `ngOnInit` does NOT call `markFirstLoginComplete` for first-time users
   any more (regression of the previous behaviour we're moving away from).
2. `confirmJoinGroup` success path calls `markFirstLoginComplete` exactly
   once when `isFirstTimeUser()` returns true.
3. `confirmJoinGroup` success path does NOT call `markFirstLoginComplete`
   when `isFirstTimeUser()` returns false (returning users joining
   additional groups).
4. `confirmJoinGroup` failure path does NOT call `markFirstLoginComplete`
   (only flip the flag on actual successful join).

**Implementation outline:**
- Remove the `handleFirstTimeUser` call from `ngOnInit` (or trim it to
  data-prep only — read the function first to see if it does more).
- In `confirmJoinGroup` success branch, after the toast and before
  navigation, call `if (this.authService.isFirstTimeUser()) { await this.authService.markFirstLoginComplete(); }`.
- Mirror what `group-admin/pages/group/group.page.ts:216` already does
  on the create-group path — use that as the reference pattern.

**Acceptance:**
- 4 specs green; existing join-group specs unchanged.
- Manual: fresh signup → land on /player/join-group → close tab without
  joining → log back in → still routes to /player/join-group (not /home).

#### 12.2 — `returnUrl` open-redirect allowlist on login (H4, S)

**Files:**
- `frontend/src/app/platforms/auth/pages/login/login.page.ts`
  (lines ~100, ~191 — `returnUrl` from query param fed directly into
  `router.navigate([returnUrl])`. Crafted `/auth/reset-password#access_token=…`
  returnUrl could phish a reset flow.)
- `frontend/src/app/platforms/auth/pages/login/login.page.spec.ts`

**TDD scenarios:**
1. Valid in-app `returnUrl` (`/player/home`, `/group-admin/group`,
   `/super-admin/dashboard`) → router.navigate called with it.
2. Invalid external/malformed `returnUrl` (`http://evil.com`,
   `//evil.com/path`, `/auth/reset-password#access_token=AT_FAKE`,
   `javascript:alert(1)`) → router.navigate falls back to default
   destination (`/player/home` or whatever the existing default is —
   read the file first).
3. Empty/missing `returnUrl` → falls back to default (regression guard).

**Implementation outline:**
- Add `private readonly RETURN_URL_ALLOWLIST = /^\/(player|group-admin|super-admin|welcome)\//`
  (or refine pattern by reading the actual route tree).
- Wrap `returnUrl` use in a sanitiser:
  `const safeReturnUrl = this.RETURN_URL_ALLOWLIST.test(returnUrl) ? returnUrl : DEFAULT_RETURN_URL;`
- Apply at both call sites (~L100, ~L191).
- Don't break the legitimate post-login redirect for any role.

**Acceptance:**
- 3+ specs green; existing login specs unchanged.
- Manual: visit `/auth/login?returnUrl=http://evil.com` → log in → land
  on default (not evil.com).

#### 12.3 — `leaveGroup` admin guard mirrors RLS predicate (H5, S)

**Files:**
- `frontend/src/app/core/services/supabase-data.service.ts`
  (lines ~200-223 — `leaveGroup` checks `group.admin_id === userId`
  but RLS now also blocks any `is_admin = TRUE` member from leaving
  per migration 017. Promoted co-admins clicking "leave" hit a
  confusing "You are not a member" error from the empty data array.)
- `frontend/src/app/core/services/supabase-data.service.spec.ts`

**TDD scenarios:**
1. Creator (admin_id match) gets the existing "demote first" error.
2. Promoted co-admin (is_admin=true but NOT admin_id) ALSO gets the
   "demote first" error (this is the bug being fixed).
3. Regular member (is_admin=false, not creator) successfully leaves.

**Implementation outline:**
- Read the membership row first (already happens? verify) to get
  `is_admin`.
- Replace `if (group.admin_id === userId) throw …` with
  `if (group.admin_id === userId || membership.is_admin) throw …`
- Keep the user-facing message neutral — "You are an admin of this
  group. Demote yourself or have another admin do so before leaving."

**Acceptance:**
- 3 specs green; existing leaveGroup specs unchanged.
- Manual: promote a member to admin, click leave → see clear error;
  demote → click leave → succeeds.

**Sequencing:** 12.1 → 12.2 → 12.3 (in any order, all independent).
Single Plan→TDD→Review→Security→E2E cycle for the cluster.

**Out of scope (from launch-readiness review, deferred):**
- B3 (`getGroupByCode` RLS) — needs manual verification first; might
  not be a real bug since friends-and-family testing has had successful
  joins. Verify with a fresh non-member account before fixing.
- All MEDIUM-severity items (search_path pinning, CSP, predictions
  fail-open, dead createGroup, PII profile dumps).

---

## Sequencing notes

- **Phase 1 + Phase 6 sequence:** Phase 1 deletes `members.page`. Phase
  6 builds its replacement. Don't ship Phase 1 alone — execute Phase 1
  then immediately Phase 6 (or merge them into one task day).
- **Phase 2 → Phase 3:** Phase 3 reuses Phase 2's home components.
  Don't reverse the order.
- **Phase 4 (history):** can run in parallel with Phase 5/6 because it
  doesn't touch admin schema.
- **Phase 5 must precede Phase 6:** UI promote/demote depends on the
  schema changes.

---

## Out of scope (defer post-launch)

- Email notifications when GW deadline approaches.
- Push notifications.
- Avatars / profile photos beyond default Ionicons.
- Admin transfer (different from promotion — would change
  `groups.admin_id` itself).
- Group archiving / season rollover.
- Public leaderboard (currently group-scoped).

---

## Rollback playbook

If any phase breaks production:

- **Phase 1**: `git revert` is enough — nothing destructive on the DB.
- **Phase 5 (schema)**: migration 017 will need an explicit DOWN
  migration written. Have it ready before applying.
- All other phases: code-only, `git revert` is safe.
