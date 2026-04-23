# Predict3 MVP Implementation Plan

> **Created:** 2026-04-06
> **Goal:** Ship the minimum viable Predict3 -- EPL predictions, scoring, leaderboards. No payments, no announcements, no audit trails.
> **Current state:** Frontend 70% done (Ionic/Angular), auth working with Supabase, all data on localStorage/mock. DB schema migrations exist but are not wired to frontend.

---

## What Already Exists

- **Supabase migrations** (6 files in `frontend/supabase/migrations/`): profiles, gameweeks, matches, groups, group_members, predictions -- all with RLS policies, triggers, and utility functions (scoring, deadline locking, member count auto-increment)
- **SupabaseService** (`frontend/src/app/services/supabase.service.ts`): Client initialized, TypeScript interfaces for all tables
- **ScoringService** (`frontend/src/app/core/services/scoring.service.ts`): Point calculation logic (correct result, correct score, joker doubling, perfect round bonus)
- **SeasonService** (`frontend/src/app/core/services/season.service.ts`): Gameweek tracking via BehaviorSubject
- **GroupService** (`frontend/src/app/core/services/group.service.ts`): Full CRUD but backed by localStorage
- **MockDataService** (`frontend/src/app/core/services/mock-data.service.ts`): Provides all match, prediction, and standings data
- **Complete UI**: Player (dashboard, matches, predictions, standings, groups, join-group, settings), Group Admin (dashboard, groups, create-group, members, leaderboard, predictions, settings, live), Super Admin, Auth, Welcome

## Out of Scope

Payments, prize money, announcements, audit trails, user suspension, feature flags, analytics, gradual rollout, public groups.

---

## Tasks

### Phase 0: Dev Environment

- [x] **0.1 Dockerise app for development** (Size: S)
  - **Description**: Create a dev Docker setup so the app runs with `docker compose up` on port 3048 with hot reload. No production container yet — that comes in 4.2.
  - **Depends on**: Nothing
  - **Files**:
    - Create `Dockerfile.dev` (Node image, runs `ionic serve` with hot reload)
    - Create `docker-compose.yml` (maps port 3048, mounts source code for live reload)
    - Create `.dockerignore` (exclude node_modules, .angular/cache, dist, .git)
  - **Acceptance criteria**:
    - `docker compose up` starts the app on http://localhost:3048
    - Code changes reflect immediately (hot reload via volume mount)
    - No need to install Node/npm locally
    - Works on a fresh clone with just Docker installed

---

### Phase 1: Supabase Foundation (replace localStorage with real database)

- [ ] **1.1 Create Supabase data service layer** (Size: L)
  - **Description**: Create a `SupabaseDataService` that wraps all Supabase table operations (CRUD for groups, group_members, gameweeks, matches, predictions). This becomes the single source of truth replacing localStorage. Re-use and extend the existing `SupabaseService` and its TypeScript interfaces.
  - **Depends on**: Database migrations applied to Supabase project (manual step)
  - **Files**:
    - Create `frontend/src/app/core/services/supabase-data.service.ts`
    - Modify `frontend/src/app/services/supabase.service.ts` (expose client getter, add missing interfaces if needed)
  - **Acceptance criteria**:
    - Service has methods: `getGroups()`, `getGroup(id)`, `createGroup(data)`, `joinGroup(code)`, `leaveGroup(groupId)`, `getGroupMembers(groupId)`, `getGameweeks()`, `getActiveGameweek()`, `getMatches(gameweekId)`, `getPredictions(userId, groupId, gameweekNumber)`, `submitPrediction(data)`, `updatePrediction(id, data)`, `getLeaderboard(groupId)`
    - All methods return Observables or Promises with proper error handling
    - Methods use the Supabase client from `SupabaseService`
    - RLS is respected (no service_role key on frontend)

- [x] **1.2 Wire auth flow to profiles table** (Size: M)
  - **Description**: Ensure that on signup a profile row is created in the `profiles` table, and on login the profile is fetched and cached. The existing `SupabaseService` has `currentProfile$` -- make sure it is populated on every auth state change.
  - **Depends on**: 1.1
  - **Files**:
    - Modify `frontend/src/app/services/supabase.service.ts` (profile upsert on auth state change)
    - Modify `frontend/src/app/core/services/auth.service.ts` (use profile from Supabase instead of localStorage)
    - Modify `frontend/src/app/platforms/auth/pages/signup/signup.page.ts` (pass profile data on signup)
  - **Acceptance criteria**:
    - New user signup creates a row in `profiles` with role, username, first_name, last_name
    - Login fetches the profile and populates `currentProfile$`
    - `auth.service.ts` reads role from Supabase profile, not localStorage
    - Existing tests still pass (do not modify passing tests)

- [x] **1.5 Auth Enhancements — Resend + Google Sign-In** (Size: S)
  - **Description**: Configure Resend as the SMTP provider for all Supabase auth emails (confirmation, password reset) so emails come from your domain with proper branding. Add Google OAuth sign-in as an alternative to email/password.
  - **Depends on**: 1.2
  - **Files**:
    - Supabase Dashboard → Settings → Auth → SMTP (Resend config, no code)
    - Supabase Dashboard → Auth → Providers → Google (enable, add credentials)
    - Modify `frontend/src/app/platforms/auth/pages/login/login.page.ts` (add Google sign-in button + handler)
    - Modify `frontend/src/app/platforms/auth/pages/login/login.page.html` (Google button UI)
    - Modify `frontend/src/app/platforms/auth/pages/signup/signup.page.ts` (add Google sign-up button + handler)
    - Modify `frontend/src/app/platforms/auth/pages/signup/signup.page.html` (Google button UI)
    - Modify `frontend/src/app/core/services/auth.service.ts` (add `signInWithGoogle()` method)
  - **Acceptance criteria**:
    - Auth emails (confirmation, password reset) sent via Resend from your domain
    - "Sign in with Google" button on login and signup pages
    - Google OAuth flow completes and creates a profile row in `profiles` table
    - Existing email/password auth still works unchanged
  - **Setup steps** (manual, not code):
    1. Create Resend account, verify domain, get API key
    2. Add SMTP credentials in Supabase Dashboard
    3. Create Google Cloud project, enable OAuth, get client ID/secret
    4. Add Google provider in Supabase Dashboard

- [x] **1.3 Wire groups to Supabase** (Size: M)
  - **Description**: Replace all localStorage calls in `GroupService` with calls to `SupabaseDataService`. Groups are created, listed, joined, and viewed via Supabase.
  - **Depends on**: 1.1, 1.2
  - **Files**:
    - Modify `frontend/src/app/core/services/group.service.ts` (replace localStorage with SupabaseDataService)
    - Modify `frontend/src/app/platforms/group-admin/pages/create-group/create-group.page.ts` (use real create)
    - Modify `frontend/src/app/platforms/player/pages/join-group/join-group.page.ts` (use real join by code)
    - Modify `frontend/src/app/platforms/player/pages/groups/groups.page.ts` (list from Supabase)
    - Modify `frontend/src/app/platforms/group-admin/pages/groups/groups.page.ts` (list from Supabase)
  - **Acceptance criteria**:
    - Creating a group inserts into `groups` table and adds creator to `group_members`
    - Joining by code looks up group, inserts into `group_members`, increments `current_members`
    - Player groups page shows groups from Supabase
    - Group admin groups page shows administered groups from Supabase
    - No more localStorage usage for groups

- [x] **1.4 Player Leave Group** (Size: S)
  - **Description**: Add a "Leave Group" button on the player groups page. Confirmation dialog, then delete from `group_members`. Prevent leaving if user is the group admin.
  - **Depends on**: 1.3
  - **Files**:
    - Modify `frontend/src/app/platforms/player/pages/groups/groups.page.ts` (add leave button, confirmation dialog, call service)
    - Modify `frontend/src/app/platforms/player/pages/groups/groups.page.html` (add leave button UI)
    - Modify `frontend/src/app/core/services/group.service.ts` (add `leaveGroup(groupId)` if not already wired)
  - **Acceptance criteria**:
    - "Leave Group" button visible on each group card (except groups where user is admin)
    - Confirmation dialog: "Are you sure you want to leave [Group Name]?"
    - On confirm: deletes `group_members` row, `current_members` auto-decremented by DB trigger
    - Success toast shown
    - Group disappears from player's group list
    - Admin cannot leave their own group (button hidden or disabled with tooltip)

---

### Phase 2: Match Data Pipeline

- [x] **2.1 EPL Match Data Integration** (Size: L)
  - **Description**: Integrate a football data API (football-data.org free tier, or API-Football) to populate `gameweeks` and `matches` tables with real EPL fixtures and results. Create a Supabase Edge Function (or a simple scheduled script) that syncs fixture data and match results.
  - **Depends on**: 1.1 (database must be set up)
  - **Files**:
    - Create `frontend/supabase/functions/sync-matches/index.ts` (Supabase Edge Function)
    - Create `frontend/supabase/functions/sync-matches/config.ts` (API key, endpoints)
    - Modify `frontend/src/environments/environment.ts` (add football API config if needed client-side)
  - **Acceptance criteria**:
    - Edge function fetches current season EPL fixtures from API
    - Gameweeks are created/updated with correct deadlines (1hr before first kickoff)
    - Matches are created/updated with teams, kickoff times, and gameweek associations
    - Completed matches have scores populated
    - Function can be triggered manually and on a schedule (cron)
    - Boxing Day and Final Day gameweeks are marked as `is_special = true` with correct `special_type`
  - **Risks**: API rate limits on free tier; API may require approval. Fallback: manual data entry via super admin.

- [x] **2.2 Wire matches page to Supabase** (Size: M)
  - **Description**: Replace `MockDataService` match data on the player matches page with real data from Supabase `matches` and `gameweeks` tables.
  - **Depends on**: 1.1, 2.1
  - **Files**:
    - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (fetch from SupabaseDataService)
    - Modify `frontend/src/app/core/services/season.service.ts` (fetch active gameweek from Supabase instead of calculating)
  - **Acceptance criteria**:
    - Matches page shows real EPL fixtures for the current gameweek
    - Gameweek navigation (prev/next) fetches correct matches
    - Match status (scheduled/live/completed) displayed correctly
    - Completed matches show final scores
    - No dependency on MockDataService for match data

  - [ ] **2.2.1 Add gameweek + match fetch methods to SupabaseDataService** (Size: S)
    - **Description**: Implement the service-layer methods the matches page needs: fetch the active gameweek, fetch matches for a given gameweek, and fetch adjacent gameweeks for prev/next navigation.
    - **Depends on**: 1.1, 2.1
    - **Files**:
      - Modify `frontend/src/app/core/services/supabase-data.service.ts` (add `getActiveGameweek()`, `getGameweekByNumber(n)`, `getMatchesByGameweekId(id)`, `getMatchesByGameweekNumber(n)`)
    - **Acceptance criteria**:
      - `getActiveGameweek()` returns the row where `is_active = true` (or falls back to the gameweek whose deadline is next in the future)
      - `getMatchesByGameweekNumber(n)` returns all matches ordered by `kickoff_time`
      - Methods return typed Observables/Promises and surface errors cleanly
      - No direct Supabase client usage leaks into page components

  - [ ] **2.2.2 Refactor SeasonService to read gameweeks from Supabase** (Size: S)
    - **Description**: Replace the hardcoded 2024-25 date logic in `SeasonService` with a Supabase-backed implementation that hydrates `currentGameweek$` from the `gameweeks` table via `SupabaseDataService`.
    - **Depends on**: 2.2.1
    - **Files**:
      - Modify `frontend/src/app/core/services/season.service.ts` (remove hardcoded dates, call `getActiveGameweek()` on init, expose `setGameweek(number)` for nav)
    - **Acceptance criteria**:
      - `currentGameweek$` BehaviorSubject emits the active gameweek's `gameweek_number` on service init
      - No hardcoded season/deadline dates remain in `season.service.ts`
      - Existing subscribers (matches page, dashboard) keep working with the same observable contract
      - Service handles the empty-DB case gracefully (emits null, no throw)

  - [ ] **2.2.3 Wire matches page to fetch real fixtures** (Size: M)
    - **Description**: Remove `MockDataService` usage from the matches page and fetch matches for the current gameweek from Supabase. Render team names, kickoff times, status badges, and completed scores from live data.
    - **Depends on**: 2.2.1, 2.2.2
    - **Files**:
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (subscribe to `SeasonService.currentGameweek$`, call `getMatchesByGameweekNumber`, drop mock imports)
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.html` (bind to real match fields; handle empty state)
    - **Acceptance criteria**:
      - Page renders real EPL fixtures for the active gameweek on load
      - Match status badge reflects `status` column (scheduled/live/completed)
      - Completed matches show `home_score` – `away_score`
      - Loading state shown while fetching; empty state shown if no matches for that gameweek
      - No `MockDataService` imports remain in this page

  - [ ] **2.2.4 Prev/next gameweek navigation** (Size: S)
    - **Description**: Wire the existing prev/next gameweek controls to actually load the adjacent gameweek's matches from Supabase. Disable the buttons at the season boundaries.
    - **Depends on**: 2.2.3
    - **Files**:
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (prev/next handlers call `SeasonService.setGameweek`, refetch matches)
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.html` (disable buttons at boundaries)
    - **Acceptance criteria**:
      - Clicking next advances gameweek number and loads that gameweek's matches
      - Clicking prev goes back one gameweek
      - Prev disabled on gameweek 1, next disabled on the final gameweek of the season
      - Gameweek header updates to reflect the viewed gameweek (not stuck on active one)

  - [ ] **2.2.5 Smoke test: matches page with real data** (Size: S)
    - **Description**: Add a lightweight E2E smoke test that the matches page loads real fixtures from Supabase (not mock) for a logged-in player, and prev/next navigation works.
    - **Depends on**: 2.2.3, 2.2.4
    - **Files**:
      - Add test in `frontend/tests/e2e/` (follow existing smoke test pattern)
    - **Acceptance criteria**:
      - Test logs in as a seeded test player, navigates to `/player/matches`, asserts at least one fixture row renders
      - Test clicks next gameweek and asserts the gameweek number in the header changes
      - Test passes locally against a Supabase project seeded by the 2.1 sync function

---

### Phase 3: Predictions and Game Rules

- [x] **3.1 Deadline Enforcement** (Size: M)
  - **Description**: Add a countdown timer to the matches page showing time until the gameweek deadline. Lock the prediction form when the deadline passes. Prevent submission after deadline on both frontend and backend (RLS already handles backend).
  - **Depends on**: 2.2 (needs real gameweek deadlines)
  - **Files**:
    - Create `frontend/src/app/shared/components/countdown-timer/countdown-timer.component.ts`
    - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (add deadline checking, disable form, inline template + styles)
  - **Acceptance criteria**:
    - Countdown timer shows days/hours/minutes until deadline
    - Timer updates every second
    - When deadline passes: all score inputs disabled, submit button disabled, "Predictions Locked" message shown
    - Locked icon displayed on the gameweek header after deadline
    - Page auto-detects deadline pass without requiring refresh
    - If user navigates to matches page after deadline, form is immediately locked

  - [ ] **3.1.1 Countdown timer standalone component** (Size: S)
    - **Description**: Build a reusable standalone `CountdownTimerComponent` that accepts a deadline input, ticks every second, emits a `deadlinePassed` event once when the deadline crosses zero, and cleans up its interval in `ngOnDestroy`. Renders days/hours/minutes/seconds while active and a passed-state when elapsed. TDD: write the spec first.
    - **Depends on**: 2.2
    - **Files**:
      - Create `frontend/src/app/shared/components/countdown-timer/countdown-timer.component.ts`
      - Create `frontend/src/app/shared/components/countdown-timer/countdown-timer.component.spec.ts`
    - **Acceptance criteria**:
      - Component is standalone, no NgModule
      - `@Input() deadline: string | Date | null` and `@Output() deadlinePassed = new EventEmitter<void>()`
      - Renders "Xd Yh Zm Ws" while counting down; renders a "Deadline passed" state once elapsed
      - Emits `deadlinePassed` exactly once on zero-crossing (not repeatedly)
      - `ngOnDestroy` clears the `setInterval` handle (verified by spec using `jest.useFakeTimers`)
      - Handles null/empty/invalid deadline without throwing (renders placeholder dashes)

  - [ ] **3.1.2 Wire gameweek deadline into matches page** (Size: S)
    - **Description**: Populate `currentGameweek.deadline` and `currentGameweek.isSpecial` from Supabase whenever matches load. On init, pull the active gameweek; on prev/next navigation, fetch the gameweek row for the target number (via `getGameweeks()` filter) so the deadline updates too.
    - **Depends on**: 3.1.1
    - **Files**:
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (fetch gameweek row in `loadMatchesForGameweek`, populate deadline + isSpecial)
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.spec.ts` (add new tests only — never modify the 36 existing)
    - **Acceptance criteria**:
      - `currentGameweek.deadline` holds the ISO string from the `gameweeks` table
      - `currentGameweek.isSpecial` reflects the DB row flag (used later by lock + joker logic)
      - Navigation refreshes deadline for the viewed gameweek
      - On error fetching the gameweek row, deadline stays empty and the page does not crash
      - All 36 existing matches page tests still pass; new tests cover the wiring

  - [ ] **3.1.3 Lock-state logic on matches page** (Size: M)
    - **Description**: Add an `isLocked` flag to the page. Compute it on load by comparing `currentGameweek.deadline` to `Date.now()`, and toggle it via an `onDeadlinePassed()` handler subscribed to the timer's output. Thread `isLocked` into `canSubmit()`, score input `[disabled]` bindings, and reset-button visibility. Re-evaluate when navigating to a different gameweek.
    - **Depends on**: 3.1.1, 3.1.2
    - **Files**:
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (add `isLocked`, `onDeadlinePassed()`, update `canSubmit`, update disabled bindings)
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.spec.ts` (new tests only: locked on load if deadline past, transitions to locked via event, unlocks on future gameweek)
    - **Acceptance criteria**:
      - If the user navigates to the page after the deadline, `isLocked` is true before the first render tick
      - Score inputs disabled when `isLocked` (in addition to existing `isLive` rule)
      - `canSubmit()` returns false when `isLocked`
      - `onDeadlinePassed()` flips `isLocked` to true without requiring a refresh
      - Navigating to a future gameweek with a future deadline resets `isLocked` to false
      - All 36 existing tests still pass

  - [ ] **3.1.4 Locked-state UI (timer, banner, lock icon)** (Size: S)
    - **Description**: Embed `<app-countdown-timer>` in the deadline card bound to `currentGameweek.deadline` with `(deadlinePassed)="onDeadlinePassed()"`. Add a "Predictions Locked" banner shown when `isLocked`, a lock icon next to the gameweek title when `isLocked`, and minimal styles for the banner. Register the `lockClosedOutline` icon via `addIcons`.
    - **Depends on**: 3.1.3
    - **Files**:
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (inline template + styles + import `CountdownTimerComponent` into `imports` array, register lock icon)
    - **Acceptance criteria**:
      - Countdown timer visible in the deadline card while deadline is in the future
      - "Predictions Locked" banner (styled like the existing warning banner but in neutral/dark tone) visible when `isLocked`
      - Lock icon appears next to the gameweek title once `isLocked` is true
      - No console errors on mount; no NgModule edits (standalone imports only)
      - Reset button hidden or disabled when `isLocked`

- [x] **3.2 Wire predictions to Supabase** (Size: M)
  - **Description**: Submit, update, and read predictions from the Supabase `predictions` table instead of MockDataService/localStorage. Integrate with the matches page form submission.
  - **Depends on**: 1.1, 2.2, 3.1
  - **Files**:
    - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (save predictions to Supabase)
    - Modify `frontend/src/app/platforms/player/pages/predictions/predictions.page.ts` (read from Supabase)
    - Modify `frontend/src/app/core/services/supabase-data.service.ts` (prediction methods if not complete)
  - **Acceptance criteria**:
    - Submitting predictions on matches page inserts/upserts rows in `predictions` table
    - Previously submitted predictions are pre-filled when returning to a gameweek
    - Predictions page shows history of all submitted predictions with points
    - Predictions respect RLS (cannot submit after deadline -- DB rejects it)
    - Player must select a group context for predictions

  - [ ] **3.2.1 Prediction CRUD methods on SupabaseDataService** (Size: S)
    - **Description**: Add the service-layer methods the matches and predictions pages need: upsert a batch of predictions for a user/gameweek, fetch a user's predictions for a specific gameweek, and fetch a user's full prediction history with points. Per resolved decision (4), predictions are keyed on `(user_id, match_id)` — no `group_id`.
    - **Depends on**: 1.1, 2.2, 3.1
    - **Files**:
      - Modify `frontend/src/app/core/services/supabase-data.service.ts` (add `upsertPredictions(rows)`, `getPredictionsForGameweek(userId, gameweekNumber)`, `getPredictionHistory(userId)`)
    - **Acceptance criteria**:
      - `upsertPredictions` performs a batch upsert on `predictions` with conflict target `(user_id, match_id)`
      - `getPredictionsForGameweek` returns typed rows joined to `matches` for the given gameweek number
      - `getPredictionHistory` returns predictions joined with match + gameweek data, ordered newest first, including `points_earned`
      - All methods return typed Promises/Observables and surface Supabase errors cleanly (no silent swallow)
      - RLS rejections bubble up so the UI can show a toast

  - [ ] **3.2.2 Submit predictions from matches page to Supabase** (Size: M)
    - **Description**: Replace the in-memory/mock prediction submit flow on the matches page with a call to `SupabaseDataService.upsertPredictions`. Gate submission on `isLocked` (from 3.1.3) and on the user being authenticated. Show a success toast on save and a user-friendly error toast on RLS/network failure.
    - **Depends on**: 3.2.1
    - **Files**:
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (update `onSubmit()` to build prediction rows and call `upsertPredictions`; add `isLocked` guard at top of `onSubmit`; toast on success/error)
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.spec.ts` (new tests only — do not modify the existing 36)
    - **Acceptance criteria**:
      - Submitting the form inserts/upserts one row per match into `predictions` for the current user
      - `onSubmit()` short-circuits with a locked toast if `isLocked` is true (belt-and-braces beyond `canSubmit()`)
      - Success toast: "Predictions saved"; error toast on RLS deadline rejection: "Deadline passed — predictions locked"
      - No `MockDataService` usage remains in the submit path
      - All existing matches page tests still pass

  - [ ] **3.2.3 Pre-fill existing predictions on matches page** (Size: S)
    - **Description**: When the matches page loads a gameweek, fetch the current user's existing predictions for that gameweek via `getPredictionsForGameweek` and pre-fill the score inputs. Re-run on prev/next gameweek navigation.
    - **Depends on**: 3.2.1, 2.2.4
    - **Files**:
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (after `loadMatchesForGameweek`, call `getPredictionsForGameweek` and merge into `MatchViewModel.prediction`)
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.spec.ts` (new tests only)
    - **Acceptance criteria**:
      - Returning to a gameweek where the user has submitted predictions shows those values pre-filled
      - Matches with no existing prediction render empty score inputs
      - Prev/next gameweek navigation refetches predictions for the viewed gameweek
      - No flicker of stale predictions between gameweeks (old values cleared before new fetch resolves)
      - Fetch errors do not crash the page; inputs fall back to empty

  - [ ] **3.2.4 Wire predictions history page to Supabase** (Size: S)
    - **Description**: Replace `MockDataService` on the predictions history page with `getPredictionHistory`. Render each prediction with its match, gameweek number, the user's score, the actual result (if completed), and `points_earned`.
    - **Depends on**: 3.2.1
    - **Files**:
      - Modify `frontend/src/app/platforms/player/pages/predictions/predictions.page.ts` (fetch from `SupabaseDataService`, drop mock imports, add loading/empty/error states)
      - Modify `frontend/src/app/platforms/player/pages/predictions/predictions.page.html` (bind to real fields; empty state when no history)
    - **Acceptance criteria**:
      - Page lists all the user's submitted predictions grouped/ordered by gameweek (newest first)
      - Each row shows predicted score, actual score (or "TBD" for scheduled/live), and points earned (or "—" pre-scoring)
      - Empty state shown when the user has no predictions
      - Loading spinner shown while fetching
      - No `MockDataService` imports remain in this page

  - [ ] **3.2.5 Smoke test: end-to-end prediction flow** (Size: S)
    - **Description**: Add a lightweight E2E smoke test covering the full loop: seeded player logs in, submits predictions on the matches page, navigates away, returns and sees them pre-filled, then opens the predictions history page and sees the same entries listed.
    - **Depends on**: 3.2.2, 3.2.3, 3.2.4
    - **Files**:
      - Add test in `frontend/tests/e2e/` (follow the pattern established by 2.2.5)
    - **Acceptance criteria**:
      - Test logs in as a seeded player, submits scores for the active gameweek, asserts success toast
      - Test navigates away and returns to `/player/matches`, asserts submitted scores are pre-filled
      - Test opens `/player/predictions` and asserts at least one prediction row renders with the submitted values
      - Test passes locally against a Supabase project seeded by the 2.1 sync function

- [x] **3.3 Prediction Visibility** (Size: S)
  - **Description**: Hide other players' predictions until the gameweek deadline has passed. The RLS policy already enforces this at the DB level -- this task is about the frontend displaying the right thing.
  - **Depends on**: 3.2
  - **Files**:
    - Modify `frontend/src/app/platforms/player/pages/group-standings/group-standings.page.ts` (check deadline before showing predictions)
    - Modify `frontend/src/app/platforms/group-admin/pages/predictions/predictions.page.ts` (same logic)
    - Modify `frontend/src/app/platforms/player/pages/group-standings/group-standings.page.html` (placeholder message)
  - **Acceptance criteria**:
    - Before deadline: "Predictions will be visible after the deadline" placeholder shown
    - After deadline: other players' predictions displayed normally
    - User's own predictions are always visible to them
    - Group admin can see all predictions after deadline (not before)

  - [ ] **3.3.1 Visibility helper on SupabaseDataService** (Size: S)
    - **Description**: Add a small service-layer helper that returns, for a given gameweek number, whether its deadline has passed (source of truth: `gameweeks.deadline` vs `Date.now()`). Expose a companion method to fetch other members' predictions for a gameweek keyed off `group_id` -- RLS already hides pre-deadline rows for non-owners, but the helper lets the UI decide whether to even issue the query and what placeholder to render.
    - **Depends on**: 3.2.1
    - **Files**:
      - Modify `frontend/src/app/core/services/supabase-data.service.ts` (add `isGameweekLocked(gameweekNumber)` and `getGroupPredictionsForGameweek(groupId, gameweekNumber)`)
    - **Acceptance criteria**:
      - `isGameweekLocked` resolves `true` once `gameweeks.deadline <= now()`, `false` otherwise, and surfaces fetch errors rather than silently returning `false`
      - `getGroupPredictionsForGameweek` returns typed rows joined to `matches` + `profiles` (display name) for all members of the group in that gameweek
      - RLS rejections bubble up so callers can show a toast instead of rendering empty tables
      - No call paths here depend on `MockDataService`

  - [ ] **3.3.2 Player group-standings page: gate other players' predictions** (Size: S)
    - **Description**: On `group-standings.page.ts`, use `isGameweekLocked` to decide whether to render the other-players prediction columns/rows for the viewed gameweek. Before the deadline, render a placeholder row/section; after the deadline, call `getGroupPredictionsForGameweek` and render normally. The current user's own predictions must always display regardless of lock state.
    - **Depends on**: 3.3.1
    - **Files**:
      - Modify `frontend/src/app/platforms/player/pages/group-standings/group-standings.page.ts` (add `isLocked` flag per viewed gameweek, fetch predictions only when unlocked, always hydrate own predictions)
      - Modify `frontend/src/app/platforms/player/pages/group-standings/group-standings.page.html` (placeholder block when locked, predictions table when unlocked)
    - **Acceptance criteria**:
      - Before deadline: placeholder "Predictions will be visible after the deadline" shown in place of other members' rows
      - After deadline: all members' predictions render with display name, predicted score, and points
      - Current user's own row is always visible (pre- and post-deadline)
      - Switching between gameweeks re-evaluates lock state for each viewed gameweek
      - No `MockDataService` imports remain in the visibility path on this page

  - [ ] **3.3.3 Group-admin predictions page: gate visibility by deadline** (Size: S)
    - **Description**: Apply the same deadline-gated rendering on the group-admin predictions page. Admins are not privileged viewers pre-deadline per the spec -- they see the same placeholder as players until the gameweek locks, then the full table once unlocked. Reuse `isGameweekLocked` and `getGroupPredictionsForGameweek`.
    - **Depends on**: 3.3.1
    - **Files**:
      - Modify `frontend/src/app/platforms/group-admin/pages/predictions/predictions.page.ts` (gate fetch + render on lock state)
    - **Acceptance criteria**:
      - Before deadline: admin sees the placeholder, no rows for other members rendered
      - After deadline: admin sees the full group predictions table for the gameweek
      - Switching gameweeks re-evaluates lock state
      - Admin's own predictions remain visible pre-deadline
      - No `MockDataService` usage remains in the visibility path

  - [ ] **3.3.4 Specs: visibility gating across lock state** (Size: S)
    - **Description**: Add component specs covering the three lock-state scenarios on both visibility-gated pages: locked (placeholder only, no fetch of other members), unlocked (fetch + render), and transition mid-session (a spec simulating a gameweek whose deadline has passed since page load must re-query on next navigation). New tests only -- do not modify existing passing specs.
    - **Depends on**: 3.3.2, 3.3.3
    - **Files**:
      - Add tests in `frontend/src/app/platforms/player/pages/group-standings/group-standings.page.spec.ts` (new `describe` block for visibility gating)
      - Add tests in `frontend/src/app/platforms/group-admin/pages/predictions/predictions.page.spec.ts` (new `describe` block for visibility gating)
    - **Acceptance criteria**:
      - Locked-state spec: `getGroupPredictionsForGameweek` is not called; placeholder text is rendered
      - Unlocked-state spec: `getGroupPredictionsForGameweek` is called once; rows render with mocked data
      - Own-predictions spec: current user's row is visible in both locked and unlocked states
      - Navigation spec: switching from an unlocked gameweek to a still-locked one hides other members' rows again
      - All previously passing specs in both files still pass unchanged

- [x] **3.4 Joker System** (Size: M)
  - **Description**: Add joker selection to the prediction form. Track usage in `group_members.jokers_used`. Block joker usage on special gameweeks (Boxing Day + Final Day — these are 10-match rounds, no bonus applies). Auto-assign jokers on the LAST REGULAR gameweek BEFORE each special round if the player hasn't used them by then.
  - **Depends on**: 3.2, 2.1 (needs special gameweek data)
  - **Joker rules (clarified):**
    - Each player gets 2 jokers per season. A joker doubles that gameweek's total points.
    - Jokers CANNOT be played on Boxing Day or Final Day (both are 10-match special rounds).
    - The 1st joker's spend-by deadline is the LAST REGULAR gameweek BEFORE Boxing Day. If the player hasn't used it by then, it is auto-assigned to that regular gameweek's predictions.
    - The 2nd joker's spend-by deadline is the LAST REGULAR gameweek BEFORE Final Day. Same auto-assign rule applies.
    - The "last regular gameweek before special" is computed as: for each special gameweek with `is_special=true`, find the highest-numbered gameweek with `is_special=false` AND `number < specialGameweek.number`.
  - **Files**:
    - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (joker toggle, validation logic)
    - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.html` (joker checkbox/toggle UI, warning banners)
    - Modify `frontend/src/app/core/services/supabase-data.service.ts` (joker tracking methods, last-regular-before-special lookup)
    - Modify `frontend/src/app/core/services/scoring.service.ts` (integrate joker doubling with Supabase data)
  - **Acceptance criteria**:
    - "Use Joker" toggle on prediction form (only if jokers remaining AND gameweek is not special)
    - Shows "X/2 jokers remaining" indicator
    - Warning banner on the last 2-3 regular gameweeks before Boxing Day: "Play your 1st joker by Gameweek N or it will be auto-applied" (N = last regular GW before Boxing Day)
    - Same warning in the lead-up to Final Day for the 2nd joker
    - Joker toggle disabled on Boxing Day and Final Day gameweeks with tooltip: "Jokers cannot be played on special rounds"
    - If 1st joker not used by the last regular gameweek before Boxing Day, auto-assigned to THAT gameweek's predictions on submit (not to Boxing Day itself)
    - If 2nd joker not used by the last regular gameweek before Final Day, auto-assigned to THAT gameweek's predictions on submit (not to Final Day itself)
    - `joker_used` flag set on prediction rows, `jokers_used` incremented on `group_members`

  - [ ] **3.4.1 Joker state methods on SupabaseDataService** (Size: S)
    - **Description**: Add the service-layer methods the matches page needs to reason about joker availability. Per Decision 1, jokers are a PER-PLAYER seasonal ceiling of 2, even though `group_members.jokers_used` is per-group in the schema — we treat the max across the user's group_members rows as canonical. Also add a helper that finds the "last regular gameweek before the next special" so the UI can render the spend-by warning and the auto-assign path can detect the trigger gameweek.
    - **Depends on**: 3.2.1, 2.1
    - **Files**:
      - Modify `frontend/src/app/core/services/supabase-data.service.ts` (add `getJokerUsage(userId)`, `getLastRegularGameweekBeforeSpecial(specialType: 'boxing_day' | 'final_day')`, `getNextSpecialGameweek()`)
    - **Acceptance criteria**:
      - `getJokerUsage(userId)` queries ALL `group_members` rows for the user and returns the MAX `jokers_used` as the canonical seasonal count (0, 1, or 2); when the user has no group memberships it returns 0
      - `getLastRegularGameweekBeforeSpecial(specialType)` resolves to the highest-numbered gameweek where `is_special=false` AND `number < specialGameweek.number` for the matching `special_type`
      - `getNextSpecialGameweek()` returns the nearest future `is_special=true` gameweek for warning-banner logic
      - All methods return typed Promises/Observables and surface Supabase errors cleanly
      - No direct Supabase client usage leaks into page components

  - [ ] **3.4.2 Joker toggle UI on matches page** (Size: S)
    - **Description**: Add a "Use Joker" toggle to the prediction form with a `X/2 jokers remaining` indicator. Hide/disable the toggle when `currentGameweek.isSpecial` is true with a tooltip: "Jokers cannot be played on special rounds". Disable the toggle when `jokersUsed >= 2`. Hydrate the toggle's initial state from any existing prediction row for the gameweek (per Decision 2, once submitted with joker the toggle is locked on for that gameweek).
    - **Depends on**: 3.4.1, 3.2.3
    - **Files**:
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (add `jokersUsed`, `jokerUsedThisGameweek`, `jokerAlreadySubmitted` state; load in `ionViewWillEnter`; add `toggleJoker()` handler; inline template for toggle + remaining indicator + tooltip on special rounds)
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.spec.ts` (new tests only — never modify the existing suite)
    - **Acceptance criteria**:
      - Toggle visible on regular gameweeks; disabled + tooltip shown on special gameweeks
      - `X/2 jokers remaining` indicator reflects `getJokerUsage` output
      - Toggle disabled when `jokersUsed >= 2` with tooltip "No jokers remaining"
      - When the player has already submitted this gameweek with `joker_used=true`, toggle renders on and is disabled (locked per Decision 2)
      - Navigating between gameweeks re-evaluates all three states (special flag, remaining count, already-submitted lock)
      - All existing matches page tests still pass

  - [ ] **3.4.3 Spend-by warning banner** (Size: S)
    - **Description**: Show a warning banner on the last 2-3 regular gameweeks before each special round if the corresponding joker is still unspent. Copy: "Play your 1st joker by Gameweek N or it will be auto-applied" (before Boxing Day), and the analogous message before Final Day. Use `getLastRegularGameweekBeforeSpecial` to resolve N and `getNextSpecialGameweek` to pick which joker (1st vs 2nd) the banner references.
    - **Depends on**: 3.4.1, 3.4.2
    - **Files**:
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (compute `jokerWarning: { message: string; targetGameweek: number } | null` on gameweek load; render banner in inline template above the joker toggle)
    - **Acceptance criteria**:
      - Banner appears on the 3 gameweeks immediately preceding each special round when the corresponding joker is unspent
      - Banner copy references the correct joker number ("1st" before Boxing Day, "2nd" before Final Day) and the correct target gameweek number
      - Banner hidden when the relevant joker has already been used this season
      - Banner hidden on special gameweeks themselves (the toggle tooltip covers that case)
      - Banner hidden on gameweeks more than 3 away from the next special round

  - [ ] **3.4.4 Submit flow: confirmation dialog, joker persistence, per-player sync** (Size: M)
    - **Description**: Wire the joker into the prediction submission path. Per Decision 2, when `jokerUsedThisGameweek === true` AND the player has NOT already submitted this gameweek with joker, show an Ionic `AlertController` dialog BEFORE the Supabase call with title "Play Your Joker?", message "Are you sure you want to play your joker this gameweek? This doubles your points but cannot be reversed.", and buttons "Cancel" (dismiss, abort submit) and "Play Joker" (proceed). The auto-assign path (3.4.5) skips this dialog. On commit: set `joker_used=true` on every prediction row in the batch; then run the per-player sync from Decision 1 — UPDATE all of the user's `group_members` rows in a single query (`.eq('user_id', userId)`) to increment `jokers_used`. Recommend adding a Supabase RPC `mark_joker_used(gameweek_number int)` for atomicity but client-side is acceptable for MVP.
    - **Depends on**: 3.2.2, 3.4.2
    - **Files**:
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (`onSubmit` gate: if `jokerUsedThisGameweek && !jokerAlreadySubmitted && !isAutoAssign` open `AlertController` dialog before calling `upsertPredictions`; on confirm proceed, on cancel abort without toast)
      - Modify `frontend/src/app/core/services/supabase-data.service.ts` (add `markJokerUsed(userId, gameweekNumber)` — single UPDATE on `group_members` filtered by `user_id` to increment `jokers_used` across ALL the user's rows; optional: scaffold `mark_joker_used` RPC)
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.spec.ts` (new tests only: dialog shown on first joker submit, dialog skipped when already submitted with joker, dialog skipped on auto-assign path, cancel aborts without upsert, confirm proceeds and triggers `markJokerUsed`)
    - **Acceptance criteria**:
      - Dialog only opens when `jokerUsedThisGameweek === true` AND `jokerAlreadySubmitted === false` AND the submit is not auto-assigned
      - "Cancel" dismisses the dialog without invoking `upsertPredictions` or `markJokerUsed`; no success toast
      - "Play Joker" proceeds to `upsertPredictions` with `joker_used=true` on every row in the batch, then calls `markJokerUsed`
      - `markJokerUsed` UPDATEs every `group_members` row for the user (single query, `.eq('user_id', userId)`) — not just the active group — keeping per-player ceiling canonical
      - After successful submit, re-hydrating the gameweek shows the toggle in locked-on state (Decision 2 one-way gate)
      - `getJokerUsage` returns the incremented value on next call for this user across any group
      - All existing matches page tests still pass

  - [ ] **3.4.5 Auto-assign fallback on the last regular gameweek** (Size: S)
    - **Description**: When the player submits predictions for the gameweek returned by `getLastRegularGameweekBeforeSpecial(specialType)` AND the corresponding joker is still unspent, force `joker_used=true` on the submitted rows and run `markJokerUsed`. This path MUST skip the 3.4.4 confirmation dialog (auto-assign is not a user-initiated joker play). Surface a non-blocking toast: "Joker auto-applied to Gameweek N".
    - **Depends on**: 3.4.1, 3.4.4
    - **Files**:
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (in `onSubmit`, detect auto-assign condition before the dialog gate; if true, set `isAutoAssign=true`, force joker flag, skip dialog, show toast after successful upsert)
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.spec.ts` (new tests only: auto-assign fires on the correct gameweek, skips dialog, invokes `markJokerUsed`, surfaces toast; does NOT fire when joker already used; does NOT fire on earlier regular gameweeks)
    - **Acceptance criteria**:
      - Auto-assign only triggers on the specific gameweek returned by `getLastRegularGameweekBeforeSpecial` for the next unspent joker
      - Auto-assign never triggers on special gameweeks themselves
      - Auto-assign never triggers when the relevant joker has already been used this season
      - Confirmation dialog from 3.4.4 is NOT shown on the auto-assign path
      - `joker_used=true` persisted on every prediction row and `markJokerUsed` invoked
      - Toast copy: "Joker auto-applied to Gameweek N"
      - All existing matches page tests still pass

  - **Decisions**:
    1. **Joker scope is PER PLAYER, not per group.** Each player gets 2 jokers per season total, regardless of how many groups they belong to. `group_members.jokers_used` is per-group in the schema, but the player-level ceiling is canonical and we sync across ALL the user's `group_members` rows. `getJokerUsage()` returns the MAX across rows (should be equal when sync is healthy); `markJokerUsed()` UPDATEs every row for the user in a single `.eq('user_id', userId)` query. A Supabase RPC `mark_joker_used(gameweek_number int)` is recommended for atomicity; client-side is acceptable for MVP.
    2. **Joker is LOCKED after submission, with a friendly confirmation dialog before commit.** Once a player submits predictions with `joker_used=true`, they cannot reverse it for that gameweek (they CAN still change scores before deadline). Before `submitPredictions` fires, show an Ionic `AlertController` dialog: title "Play Your Joker?", message "Are you sure you want to play your joker this gameweek? This doubles your points but cannot be reversed.", buttons "Cancel" (abort) and "Play Joker" (proceed). Dialog only shows when `jokerUsedThisGameweek === true` AND the player has not already submitted with joker. The auto-assign path (3.4.5) skips the dialog — it is already forced.

  - **Risks**:
    - **Per-player sync drift**: If `markJokerUsed` fails mid-update across a user's `group_members` rows (partial write), `getJokerUsage` will still return the correct MAX, but the rows will be inconsistent. An RPC wraps the UPDATE in a transaction — preferred over client-side.
    - **Race with new-group-join**: If a user joins a new group AFTER using a joker, the new `group_members` row starts with `jokers_used=0`. Either backfill on insert (trigger) or rely on the MAX-read in `getJokerUsage` to mask it — document which.
    - **Special-gameweek data integrity**: Auto-assign depends on `is_special` and `special_type` being correctly populated by the 2.1 sync. If misconfigured, the 1st joker could be auto-applied to the wrong gameweek. 3.4.1 methods should surface empty results rather than defaulting silently.

---

### Phase 4: Scoring, Super Admin & Production

- [x] **4.0 Super Admin Simplification** (Size: M)
  - **Description**: Gut the current 6-page super-admin section down to a single, practical dashboard. Remove all fake analytics, coaching, mentoring, revenue, and placeholder features. Replace the separate super-admin registration flow with a simple `role = 'super-admin'` flag on your Supabase profile row. Build what you actually need as the app owner.
  - **Depends on**: 1.1, 1.2, 2.1
  - **Files**:
    - Delete or heavily simplify `frontend/src/app/platforms/super-admin/pages/metrics/`
    - Delete or heavily simplify `frontend/src/app/platforms/super-admin/pages/predictions/`
    - Delete `frontend/src/app/platforms/super-admin/pages/register/` (no separate registration)
    - Rewrite `frontend/src/app/platforms/super-admin/pages/dashboard/dashboard.page.ts` (real data, not mock)
    - Simplify `frontend/src/app/platforms/super-admin/pages/users/users.page.ts` (list, activate/deactivate only)
    - Modify `frontend/src/app/platforms/super-admin/layout/` (simplify tabs to 1-2)
    - Modify super-admin routes to remove deleted pages
    - Modify auth guard to check `profiles.role = 'super-admin'` from Supabase
  - **What to keep (1-2 pages)**:
    - **Dashboard**: Real user count, group count, current gameweek, last API sync status, errors
    - **Users & Groups**: Simple list of all users (activate/deactivate), all groups (view/delete), no coaching or mentoring nonsense
  - **What to add**:
    - Gameweek overview: see current gameweek, verify matches synced, button to manually trigger match sync
    - API sync status: last sync time, any errors
  - **What to remove**:
    - Revenue/MRR tracking, engagement analytics, coaching plans, mentor assignment
    - Prediction analytics page, metrics page
    - Separate super-admin registration flow (just set role in DB)
    - All hardcoded mock data in dashboard
  - **Access method**: You (the owner) get `role = 'super-admin'` set directly in your `profiles` row in Supabase. Login via the normal auth flow, guard redirects to super-admin dashboard based on role.
  - **Acceptance criteria**:
    - Super admin has max 2 pages (dashboard + users/groups)
    - Dashboard shows real data from Supabase (user count, group count, active gameweek, sync status)
    - Can view all users and toggle active/inactive
    - Can view all groups and delete if needed
    - Can see gameweek status and trigger manual match data sync
    - No separate registration page — role assigned in DB
    - No fake analytics, coaching, mentoring, or revenue features
    - Normal login flow works — guard routes super-admin to their dashboard

  - [ ] **4.0.1 Migration: is_active + sync_metadata + RLS policies** (Size: M)
    - **Description**: New migration `008_superadmin_infrastructure.sql` that adds the `is_active` flag on `profiles`, the single-row `sync_metadata` table that the cooldown enforcement reads/writes, and the RLS policy updates on `predictions` and `group_members` so deactivated users can read but not mutate. Seed the `sync_metadata` row at migration time so cooldown logic always has a row to upsert against.
    - **Depends on**: 1.1, 1.2, 2.1
    - **Files**:
      - Create `frontend/supabase/migrations/008_superadmin_infrastructure.sql`
        - `ALTER TABLE profiles ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE` + index on `is_active`
        - `CREATE TABLE sync_metadata (id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1), last_sync_at TIMESTAMPTZ, last_sync_status TEXT, last_sync_error TEXT)` — single-row table
        - Seed: `INSERT INTO sync_metadata (id) VALUES (1) ON CONFLICT DO NOTHING`
        - RLS policies on `predictions` INSERT/UPDATE: add `WHERE EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_active = TRUE)`
        - RLS policies on `group_members` INSERT/UPDATE/DELETE: same `is_active` check
        - Grant super-admin SELECT on `sync_metadata`; grant Edge Function `service_role` full access
    - **Acceptance criteria**:
      - Migration applies cleanly against the existing schema; existing rows get `is_active = TRUE` by default
      - A deactivated user's prediction INSERT/UPDATE is rejected by RLS (DB-level, not just UI)
      - A deactivated user's `group_members` INSERT/UPDATE/DELETE is rejected by RLS
      - Reads still work for deactivated users (leaderboards, standings continue to render their historical data)
      - `sync_metadata` row with `id = 1` exists post-migration
      - Super-admin reads on `sync_metadata` are not blocked by RLS (super-admin bypasses via existing `is_super_admin()` helper)

  - [ ] **4.0.2 Auth guard reads role from Supabase profile (not localStorage)** (Size: S)
    - **Description**: Stop trusting localStorage for role-based routing. The super-admin guard must resolve the current user's role from the Supabase `profiles` row (already cached on `SupabaseService.currentProfile$` after 1.2) and gate access on `role === 'super-admin'`. Same change applied to any other role guards still reading localStorage.
    - **Depends on**: 1.2
    - **Files**:
      - Modify `frontend/src/app/core/guards/` (super-admin guard — read role from `SupabaseService.currentProfile$`)
      - Modify `frontend/src/app/core/services/auth.service.ts` (remove localStorage role lookups in routing helpers if any remain after 1.2)
    - **Acceptance criteria**:
      - Super-admin guard resolves role from Supabase, not localStorage
      - Non-super-admin users navigating to `/super-admin/*` are redirected to their role's dashboard
      - Refresh on a super-admin route does not boot the user out (profile observable hydrates before guard resolves, or guard awaits the first emission)
      - localStorage role keys are not read in the guard path
      - Existing passing tests are not modified — new tests cover the guard if needed

  - [ ] **4.0.3 Delete obsolete super-admin pages + prune routes** (Size: S)
    - **Description**: Remove the metrics, predictions, and register pages from the super-admin platform along with their routes and any imports they pull in. Keep dashboard and users pages as starting points for the rewrite.
    - **Depends on**: 4.0.2
    - **Files**:
      - Delete `frontend/src/app/platforms/super-admin/pages/metrics/` (entire folder)
      - Delete `frontend/src/app/platforms/super-admin/pages/predictions/` (entire folder)
      - Delete `frontend/src/app/platforms/super-admin/pages/register/` (entire folder)
      - Modify `frontend/src/app/platforms/super-admin/super-admin.routes.ts` (remove deleted routes, keep dashboard + users)
    - **Acceptance criteria**:
      - Three page folders deleted with no orphan imports remaining
      - Routes file no longer references the deleted pages
      - App still builds (`ionic build` succeeds)
      - No broken nav links from the simplified layout (4.0.4) to the deleted pages
      - No tests break from missing imports (delete or update any tests that referenced the deleted pages)

  - [ ] **4.0.4 Simplified layout with 2 tabs + logout button** (Size: S)
    - **Description**: Strip the super-admin layout down to two tabs (Dashboard, Users & Groups) and a logout button. Drop any tab/menu entries that pointed to deleted pages.
    - **Depends on**: 4.0.3
    - **Files**:
      - Modify `frontend/src/app/platforms/super-admin/layout/` (tab bar component template + ts — keep only Dashboard and Users & Groups; add logout)
    - **Acceptance criteria**:
      - Layout renders exactly two tab entries
      - Logout button calls `AuthService.signOut()` and redirects to `/welcome`
      - No dead nav entries to deleted pages
      - Layout looks consistent with the player and group-admin platform layouts (Ionic tab patterns)
      - Renders without console errors on a fresh load as a super-admin

  - [ ] **4.0.5 Admin service methods in SupabaseDataService** (Size: M)
    - **Description**: Add the admin-facing service methods that the dashboard and users-and-groups pages need. Per Decision 1, `getLastMatchSync` reads from `sync_metadata` and computes `cooldownRemainingSeconds` so the dashboard can render the countdown without re-implementing the math. Per Decision 2, `signOutUser` invokes the new `admin-signout` Edge Function (4.0.7) — the client never holds the `service_role` key.
    - **Depends on**: 4.0.1
    - **Files**:
      - Modify `frontend/src/app/core/services/supabase-data.service.ts`:
        - `getAllUsers(): Promise<Profile[]>` — full list with `is_active`
        - `getAllGroups(): Promise<Group[]>` — full list with member count
        - `toggleUserActive(userId: string, active: boolean): Promise<void>` — UPDATE `profiles.is_active`
        - `deleteGroup(groupId: string): Promise<void>` — DELETE on `groups` (cascade handles `group_members` per existing schema)
        - `getLastMatchSync(): Promise<{ lastSyncAt: string | null; lastSyncStatus: string | null; lastSyncError: string | null; cooldownRemainingSeconds: number }>` — reads `sync_metadata`, computes remaining cooldown vs 5-minute window
        - `triggerMatchSync(): Promise<{ ok: boolean; reason?: string; cooldownRemainingSeconds?: number }>` — invokes `sync-matches` Edge Function
        - `signOutUser(userId: string): Promise<{ ok: boolean; reason?: string }>` — invokes `admin-signout` Edge Function
    - **Acceptance criteria**:
      - All seven methods unit-tested via mocked Supabase client
      - Errors rethrown with sanitized messages (no raw Postgres column/constraint names leaked)
      - `getLastMatchSync` returns `cooldownRemainingSeconds = 0` when last sync is older than 5 minutes or `last_sync_at` is null
      - `triggerMatchSync` and `signOutUser` surface non-200 / `{ok:false}` responses to the caller without throwing on cooldown (so the UI can render a friendly toast)
      - No `service_role` key referenced anywhere on the client

  - [ ] **4.0.6 Edge Function — sync-matches cooldown enforcement** (Size: M)
    - **Description**: Modify the existing `sync-matches` Edge Function (built in 2.1) to enforce a server-side 5-minute cooldown using `sync_metadata`. Per Decision 1, the Edge Function is the authoritative gate — the client countdown is UX polish only. On invoke, read `sync_metadata.last_sync_at`; if `(now - last_sync_at) < 5 minutes`, return HTTP 429 with `{ ok: false, reason: 'cooldown', cooldownRemainingSeconds: N }` without hitting football-data.org. Otherwise proceed with sync, then upsert `last_sync_at = now`, `last_sync_status = 'ok' | 'error'`, and `last_sync_error` if applicable.
    - **Depends on**: 4.0.1, 2.1
    - **Files**:
      - Modify `frontend/supabase/functions/sync-matches/index.ts` (cooldown read/write around the existing sync logic; HTTP 429 on cooldown hit; metadata upsert after each run regardless of outcome)
    - **Acceptance criteria**:
      - Cooldown enforced server-side: duplicate invocations within 5 min return HTTP 429 without calling football-data.org
      - Response body on cooldown: `{ ok: false, reason: 'cooldown', cooldownRemainingSeconds: N }` with N reflecting actual time remaining
      - On successful sync: `sync_metadata` upserted with `last_sync_at = now`, `last_sync_status = 'ok'`, `last_sync_error = null`
      - On sync failure: `sync_metadata` upserted with `last_sync_status = 'error'` and `last_sync_error` populated (sanitized — no API keys leaked)
      - Existing 2.1 sync behavior preserved when called outside cooldown

  - [ ] **4.0.7 Edge Function — admin-signout (new)** (Size: S)
    - **Description**: New Edge Function that lets a super-admin force-terminate another user's sessions after deactivation (Decision 2). Uses the `service_role` key server-side to call `auth.admin.signOut(userId)`. Caller authorization is verified by reading the calling user's profile role from `auth.uid()` — only `role = 'super-admin'` is allowed; everyone else gets HTTP 403.
    - **Depends on**: 4.0.1
    - **Files**:
      - Create `frontend/supabase/functions/admin-signout/index.ts`
      - Create `frontend/supabase/functions/admin-signout/config.ts` if needed (mirror `sync-matches` layout)
    - **Acceptance criteria**:
      - Accepts `{ userId: string }` POST body
      - Verifies caller is super-admin by selecting `profiles.role` for `auth.uid()` — returns HTTP 403 `{ ok: false, reason: 'forbidden' }` for non-super-admins
      - On authorized call: invokes `supabaseAdmin.auth.admin.signOut(userId)` using `service_role` key from environment, returns `{ ok: true }`
      - Target user's sessions are terminated within seconds (verifiable: target user's next request 401s and they are bounced to `/welcome`)
      - Logs sanitized — no PII or tokens written to function logs
      - `service_role` key only read from env, never echoed in responses

  - [ ] **4.0.8 Dashboard page wired to real data + Sync button with cooldown countdown** (Size: M)
    - **Description**: Rewrite the super-admin dashboard to fetch real data from Supabase: total users, total groups, active gameweek, and last match sync metadata. Render a "Sync Matches Now" button that calls `triggerMatchSync()`. On success, show a success toast and start a 30-second client-side countdown (button visually disabled — UX polish, the Edge Function is the authoritative gate per Decision 1). On a `429`/cooldown response, show a toast with the `cooldownRemainingSeconds` value returned by the Edge Function.
    - **Depends on**: 4.0.5, 4.0.6
    - **Files**:
      - Modify `frontend/src/app/platforms/super-admin/pages/dashboard/dashboard.page.ts` (real data fetch via `SupabaseDataService`, sync button handler, client countdown state)
      - Modify `frontend/src/app/platforms/super-admin/pages/dashboard/dashboard.page.html` (KPI tiles, sync button + countdown, last sync status + error display)
    - **Acceptance criteria**:
      - Dashboard renders real counts: `getAllUsers().length`, `getAllGroups().length`, `getActiveGameweek().gameweek_number`, last sync timestamp + status
      - "Sync Matches Now" button visible; click triggers `triggerMatchSync()`
      - On success: toast "Match sync triggered", button disabled for 30s with visible countdown
      - On `429`/cooldown: toast "Sync on cooldown — try again in Ns" using `cooldownRemainingSeconds` from the Edge Function response
      - Last sync status block shows last_sync_at, status badge (ok/error), and error message when status is `error`
      - Loading spinner while initial data loads; error toast on fetch failure
      - No mock data used anywhere on this page

  - [ ] **4.0.9 Users & Groups combined page with deactivate (+ signout) and delete** (Size: M)
    - **Description**: Replace the existing users page with a single Users & Groups page using an `ion-segment` to switch between the two lists. In the Users segment, each row has an active/inactive toggle. When the admin deactivates a user (`active=false`), call `toggleUserActive(id, false)` AND `signOutUser(id)` so the deactivated user is force-signed-out (Decision 2). Surface success/failure for both calls — partial failure (toggle ok, signout failed) needs its own toast so the admin knows the user's existing session is still live. In the Groups segment, each row has a delete button gated behind a confirmation alert.
    - **Depends on**: 4.0.5, 4.0.7
    - **Files**:
      - Modify `frontend/src/app/platforms/super-admin/pages/users/users.page.ts` (segment state, both fetches, toggle handler with chained `signOutUser`, delete handler with confirm)
      - Modify `frontend/src/app/platforms/super-admin/pages/users/users.page.html` (`ion-segment`, two segment views, empty states)
      - Rename folder if appropriate (or leave as `users/` and treat as the combined page — match existing project conventions)
    - **Acceptance criteria**:
      - `ion-segment` toggles between Users and Groups lists
      - Users segment: toggle calls `toggleUserActive`; on deactivate (`active=false`) ALSO calls `signOutUser` — verifiable via network tab and DB
      - Successful deactivate + signout: single success toast "User deactivated and signed out"
      - Toggle succeeds but signout fails: warning toast "User deactivated but session not terminated — they may still be active until token expires"
      - Re-activate (`active=true`) only calls `toggleUserActive`, no signout invocation
      - Groups segment: delete button opens an Ionic `AlertController` confirm; on confirm calls `deleteGroup(id)`; group disappears from list
      - Empty state shown when either list is empty
      - RLS / network errors surface as toasts with sanitized messages

  - **Decisions**:
    1. **Sync button rate limiting: SERVER-SIDE Edge Function cooldown is authoritative; client-side countdown is UX polish.** The `sync-matches` Edge Function reads/writes `sync_metadata.last_sync_at` and rejects invocations within a 5-minute window with HTTP 429 + `{ ok: false, reason: 'cooldown', cooldownRemainingSeconds: N }` — football-data.org is never hit on cooldown. The dashboard separately renders a 30-second client countdown after the button is pressed for UX feedback, but the cooldown enforcement does NOT depend on the client. A user with devtools who re-fires the request still gets blocked by the Edge Function.
    2. **User deactivation: RLS flag is the authoritative write-block; admin-signout Edge Function force-terminates active sessions.** `profiles.is_active` (default TRUE) gates `predictions` and `group_members` INSERT/UPDATE/DELETE via RLS — deactivated users can still READ (so leaderboards keep rendering their historical data) but cannot mutate. Because RLS only applies to NEW requests (existing tokens still authenticate at the auth layer), the deactivation flow ALSO calls a new `admin-signout` Edge Function that uses `service_role` to invoke `auth.admin.signOut(userId)`. The Edge Function verifies the caller is super-admin via `auth.uid()` → `profiles.role` and rejects everyone else with HTTP 403.

  - **Risks**:
    - **Migration 008 effect on existing users**: All existing `profiles` rows default to `is_active = TRUE`, so no user is accidentally locked out by the migration. Verify in a staging Supabase project before production push.
    - **Edge Function `service_role` leakage**: The `service_role` key MUST stay in the Edge Function environment — never echoed in responses, logs, or client-readable env. `admin-signout` and `sync-matches` are the only call sites; both must read from `Deno.env.get` and never accept it as a request parameter.
    - **RLS policy ordering vs super-admin reads**: New RLS policies on `predictions` / `group_members` add an `is_active` check on writes only. Super-admin reads of `sync_metadata`, `profiles`, and `groups` must still bypass via the existing `is_super_admin()` helper — verify after migration that super-admin can list all users/groups without RLS blocking.
    - **Cooldown table initialization**: `sync_metadata` MUST have its `id = 1` row seeded at migration time (`INSERT ... ON CONFLICT DO NOTHING`). If absent, the first sync attempt would either crash on the read or upsert silently — neither acceptable. Cover this in 4.0.1.
    - **Partial failure on deactivate flow (4.0.9)**: If `toggleUserActive` succeeds but `signOutUser` fails, the user is write-locked but their existing session token is still valid until expiry. The UI must surface this distinctly so the admin knows to escalate (or wait for token expiry). Document explicitly in the toast copy.

- [x] **4.1 Auto Point Calculation** (Size: M)
  - **Description**: When match results come in (via the sync function from 2.1), automatically calculate points for all predictions on that match. Use the existing `calculate_prediction_points` SQL function. Update `group_members` totals.
  - **Depends on**: 2.1, 3.2
  - **Files**:
    - Modify `frontend/supabase/functions/sync-matches/index.ts` (trigger scoring after updating match results)
    - Create `frontend/supabase/migrations/007_scoring_trigger.sql` (DB trigger or function to auto-score when match status changes to 'completed')
    - Modify `frontend/src/app/platforms/player/pages/standings/standings.page.ts` (read real leaderboard from Supabase)
    - Modify `frontend/src/app/platforms/group-admin/pages/leaderboard/leaderboard.page.ts` (read real leaderboard)
  - **Acceptance criteria**:
    - When a match is marked as completed, all predictions for that match are scored using `calculate_prediction_points`
    - `points_earned` updated on each prediction row
    - `total_points`, `correct_scores`, `correct_results`, `gameweeks_played` updated on `group_members`
    - Perfect round bonus (3 correct scores in a regular gameweek) applied
    - Leaderboard pages show real standings sorted by total_points
    - Points update without manual intervention

  - [ ] **4.1.1 Migration: scoring trigger + perfect-round bonus + aggregate recompute** (Size: M)
    - **Description**: New migration `007_scoring_trigger.sql` that installs a `BEFORE UPDATE` (or `AFTER UPDATE`) trigger on `matches` firing when `status` transitions to `'completed'`. The trigger calls a new `score_match(match_id uuid)` SECURITY DEFINER function that: (a) iterates every prediction row for that match and writes `points_earned = calculate_prediction_points(...)` including the `joker_used` doubling, (b) after all three matches in a regular gameweek are completed for a given user, evaluates the perfect-round bonus (3 correct exact scores → bonus added to the gameweek's prediction rows per the existing `scoring.service.ts` rules), and (c) recomputes `group_members` aggregates (`total_points`, `correct_scores`, `correct_results`, `gameweeks_played`) for every `group_members` row whose `user_id` had predictions on this match. Idempotent: re-running against an already-scored match MUST converge (no double-counting) — use a deterministic recompute over source rows rather than incremental deltas.
    - **Depends on**: 2.1, 3.2
    - **Files**:
      - Create `frontend/supabase/migrations/007_scoring_trigger.sql`
        - `CREATE FUNCTION score_match(p_match_id uuid) RETURNS void LANGUAGE plpgsql SECURITY DEFINER`
        - Trigger: `CREATE TRIGGER trg_score_match AFTER UPDATE OF status ON matches FOR EACH ROW WHEN (NEW.status = 'completed' AND OLD.status IS DISTINCT FROM NEW.status) EXECUTE FUNCTION score_match_trigger()`
        - `score_match_trigger()` wrapper calls `score_match(NEW.id)`
        - Aggregate recompute as a SQL `UPDATE group_members SET total_points = (SELECT SUM(points_earned) ...), correct_scores = ..., correct_results = ..., gameweeks_played = ... WHERE user_id = <affected>` — sourced from predictions joined to matches
        - Grant execute on `score_match` to `service_role` (Edge Function invocation path) and `authenticated` is NOT required — trigger fires on DB write regardless of caller
    - **Acceptance criteria**:
      - Migration applies cleanly on top of existing schema; no policy conflicts
      - Transitioning a `matches` row to `status='completed'` fires the trigger exactly once and writes `points_earned` on every matching `predictions` row
      - `joker_used=true` predictions earn doubled points (matches `scoring.service.ts` rules)
      - Perfect round bonus applied when a user has 3 correct exact scores across the 3 matches they predicted in a REGULAR gameweek (not special rounds — Boxing Day / Final Day are 10-match rounds, no bonus)
      - `group_members` aggregates reflect the recomputed totals for all affected users
      - Re-firing the trigger (e.g. re-setting status to completed) does not double-count — totals converge to the same values
      - Raw SQL migration tested against a Supabase local instance or staging project before merge

  - [ ] **4.1.2 Edge Function: invoke scoring after sync + status tracking** (Size: S)
    - **Description**: Modify the existing `sync-matches` Edge Function (from 2.1, extended in 4.0.6) so that after it upserts match results, it explicitly calls `score_match(match_id)` via `supabase.rpc('score_match', { p_match_id })` for every match whose status was just flipped to `'completed'` in this sync run. The DB trigger from 4.1.1 is the authoritative path; this RPC call is a belt-and-braces redundancy path (Decision A below) and also lets the Edge Function capture scoring errors per-match for `sync_metadata.last_sync_error`.
    - **Depends on**: 4.1.1, 2.1, 4.0.6
    - **Files**:
      - Modify `frontend/supabase/functions/sync-matches/index.ts` (after match upsert, collect matches newly transitioned to completed, call `score_match` RPC per match, aggregate errors into the sync_metadata error field)
    - **Acceptance criteria**:
      - After match upsert, the function iterates the set of matches whose status just became `'completed'` and calls `score_match` for each
      - RPC errors are caught per-match (one failure does not abort the whole sync); errors aggregated into `last_sync_error`
      - Function run completes with `last_sync_status='ok'` only when every scoring RPC succeeded; otherwise `'error'` with the aggregated error message
      - No duplicate scoring — calling `score_match` after the trigger has already fired is safe because 4.1.1 is idempotent
      - No `service_role` key leaked to response or logs

  - [ ] **4.1.3 Wire player standings page to real leaderboard data** (Size: S)
    - **Description**: Replace `MockDataService` on the player standings page (`standings.page.ts`) with a real leaderboard fetch from Supabase. Add a `getLeaderboard(groupId)` method to `SupabaseDataService` if not already present (1.1 lists it but implementation may be stubbed). Query `group_members` joined to `profiles` ordered by `total_points DESC`, tiebreakers: `correct_scores DESC`, then `correct_results DESC`. Render rank, display name, total_points, correct_scores, correct_results, gameweeks_played.
    - **Depends on**: 4.1.1
    - **Files**:
      - Modify `frontend/src/app/core/services/supabase-data.service.ts` (implement/verify `getLeaderboard(groupId)` with the ordering + joined profile fields)
      - Modify `frontend/src/app/platforms/player/pages/standings/standings.page.ts` (drop `MockDataService`, fetch from `SupabaseDataService`, add loading/empty/error states)
      - Modify `frontend/src/app/platforms/player/pages/standings/standings.page.html` (bind to real fields; empty state when no members yet)
    - **Acceptance criteria**:
      - Page renders real leaderboard rows for the player's active group (or group selector if multi-group)
      - Ordering: `total_points DESC, correct_scores DESC, correct_results DESC`
      - Each row shows rank, display name, total points, correct scores, correct results, gameweeks played
      - Loading spinner shown while fetching; empty state when the group has no members with points yet
      - No `MockDataService` imports remain in this page

  - [ ] **4.1.4 Wire group-admin leaderboard page to real data** (Size: S)
    - **Description**: Same treatment for the group-admin leaderboard page. Reuse `getLeaderboard(groupId)` from 4.1.3 so both pages share a single query path. The admin variant operates on the admin's own group (via `resolveAdminGroupId` or similar single-group assumption already flagged in 4.2 refactor notes).
    - **Depends on**: 4.1.3
    - **Files**:
      - Modify `frontend/src/app/platforms/group-admin/pages/leaderboard/leaderboard.page.ts` (drop mock, fetch from `SupabaseDataService.getLeaderboard`, add loading/empty/error states)
      - Modify `frontend/src/app/platforms/group-admin/pages/leaderboard/leaderboard.page.html` (bind to real fields)
    - **Acceptance criteria**:
      - Admin leaderboard renders real `group_members` standings for the admin's group
      - Identical ordering + column set as 4.1.3 for consistency between player and admin views
      - Loading + empty states match the player page's UX
      - No `MockDataService` imports remain in this page
      - Admin can identify at a glance which members have played each gameweek via `gameweeks_played`

  - [ ] **4.1.5 Specs: scoring trigger + leaderboard wiring** (Size: S)
    - **Description**: Add specs covering the scoring path. For the DB trigger, add a SQL-level test (pgTAP or a scripted Deno test invoked by the Edge Function test harness) that inserts fixtures + predictions, flips match status to completed, and asserts `points_earned` + `group_members` aggregates match expected values for: correct-score-with-joker, correct-result-only, perfect-round-bonus-in-regular-gameweek, no-bonus-on-special-gameweek, re-fire-idempotency. For the frontend, add component specs on both leaderboard pages covering loading, empty, populated, and error states. New tests only — do not modify any existing passing specs.
    - **Depends on**: 4.1.1, 4.1.3, 4.1.4
    - **Files**:
      - Add `frontend/supabase/tests/scoring_trigger.test.sql` (or Deno test file under `frontend/supabase/functions/sync-matches/` if pgTAP not configured)
      - Add test block in `frontend/src/app/platforms/player/pages/standings/standings.page.spec.ts` (new `describe` — do not touch existing)
      - Add test block in `frontend/src/app/platforms/group-admin/pages/leaderboard/leaderboard.page.spec.ts` (new `describe` — do not touch existing)
    - **Acceptance criteria**:
      - DB-level test asserts the 5 scoring scenarios above pass against a seeded Supabase local instance
      - Player standings spec covers: initial loading, empty leaderboard, populated (sorted) leaderboard, fetch error toast
      - Admin leaderboard spec mirrors the above four scenarios
      - Idempotency scenario explicit: running the scoring trigger twice on the same match converges to identical `points_earned` and `group_members` totals (no double-counting)
      - All previously passing specs in both frontend pages still pass unchanged

  - **Design Rationale (A vs B)**:
    - **Option A (chosen): DB trigger as authoritative scoring path, Edge Function RPC as belt-and-braces.** The `score_match` function is invoked automatically by the `trg_score_match` trigger whenever a match row flips to `'completed'`. This means ANY write path that completes a match (Edge Function sync, super-admin manual fix, future webhooks) scores consistently without each caller re-implementing the logic. The Edge Function additionally calls `score_match` via RPC after its upsert so it can catch scoring errors per-match and surface them via `sync_metadata.last_sync_error`. Because the trigger + RPC are both idempotent (deterministic recompute from source rows, not incremental deltas), running both on the same match is safe.
    - **Option B (rejected): Edge Function-only scoring, no DB trigger.** Keeps scoring logic in one place (TypeScript) and avoids plpgsql complexity. REJECTED because (1) any future write path that completes a match bypasses scoring entirely, (2) manual super-admin corrections to match rows would require re-running the Edge Function, (3) splits scoring logic across two runtimes (the SQL `calculate_prediction_points` helper would still need to be called from TS), and (4) couples the scoring correctness SLA to Edge Function availability. The trigger makes scoring a property of the database, not a property of the sync pipeline.

  - **Risks**:
    - **Trigger idempotency bugs**: If `score_match` uses incremental deltas (e.g. `total_points = total_points + <new points>`), re-firing the trigger (or the Edge Function RPC after the trigger) double-counts. Mandatory: deterministic recompute from source rows (aggregate `SUM` over predictions joined to matches). Covered by the idempotency test in 4.1.5.
    - **Perfect-round bonus timing**: The bonus requires all 3 of a user's predictions for a gameweek to be scored. If matches complete out of order, the bonus must be evaluated on every match completion (not just the 3rd) — otherwise the bonus is silently skipped when the user's 3rd-completing match happens to be the earliest by kickoff time. Trigger logic must re-check the full gameweek state on every match completion.
    - **Special-gameweek bonus leak**: Boxing Day and Final Day are 10-match rounds with no perfect-round bonus. The trigger MUST check `gameweeks.is_special` before awarding bonus — otherwise a player with 3 correct scores in a special round gets an illegal bonus. Covered by the no-bonus-on-special test in 4.1.5.
    - **Aggregate recompute performance**: Recomputing `group_members` aggregates on every match completion can be expensive at scale (for each affected user, re-sum their entire prediction history). For MVP-scale (10–50 users × 38 gameweeks × 3 predictions = ~5,700 rows worst case) this is fine. At 10k+ users, move to incremental deltas with a reconciliation job — out of scope for MVP.
    - **Trigger + Edge Function double-fire race**: Both the trigger and the Edge Function RPC call `score_match` on the same match within milliseconds. Postgres serializes the second call behind the first (row-level locks on the `predictions`/`group_members` writes), so the second call is a no-op recompute. Confirmed safe by the idempotency property, but document explicitly so future refactors don't break the invariant.
    - **`calculate_prediction_points` drift**: The existing SQL function's point values must match `scoring.service.ts`. If they drift, the UI's "estimated points" preview won't match the actual scored value. Add a cross-check test (or consolidate to a single source of truth) — flag tracked in the 4.2 refactor list.

- [ ] **4.2 Production Readiness** (Size: L)
  - **Description**: Final launch-blocking work: production environment configuration, prod Docker image, global error handling, loading states on all data-fetching pages, critical security hardening from prior security scans, and test stability fixes. Everything else accumulated during the MVP has been moved to Task 4.3 post-launch polish.
  - **Depends on**: All prior tasks (4.0, 4.1 complete)
  - **Sequencing**: 4.2.1 + 4.2.2 first (env + Docker unblock deployment testing), then 4.2.5 (security), then remaining in any order.

  - [x] **4.2.1 Production environment configuration** (Size: S)
    - **Description**: Split dev and prod environment files so production builds read a distinct Supabase URL/anon key without hardcoded secrets. CI/CD supplies the production config at build time. No secrets committed to the repo.
    - **Depends on**: None (entry point of 4.2)
    - **Files**:
      - Modify `frontend/src/environments/environment.ts` (ensure dev-only values; remove any hardcoded prod keys)
      - Create `frontend/src/environments/environment.prod.ts` (production Supabase URL + anon key — values injected at CI time or read from env via Angular file replacement)
      - Modify `frontend/angular.json` if needed (confirm `fileReplacements` maps `environment.ts` → `environment.prod.ts` on `production` config)
    - **Acceptance criteria**:
      - `environment.prod.ts` exists and is referenced by the `production` build configuration
      - No hardcoded secrets remain in either environment file
      - `ionic build --prod` succeeds and produces a bundle that reads prod env values
      - Dev build continues to read `environment.ts` unchanged
      - README / deployment notes mention how CI injects the prod key (doc update is part of this task)

  - [x] **4.2.2 Production Docker image** (Size: M)
    - **Description**: Build a production container distinct from the dev `Dockerfile.dev`. Multi-stage build: Node stage runs `ionic build --prod`, Nginx stage serves the static output on port 80. Add a production service/profile to `docker-compose.yml` so `docker compose --profile prod up` runs the prod image locally for smoke testing before deploying.
    - **Depends on**: 4.2.1
    - **Files**:
      - Create `Dockerfile` (multi-stage: `node:lts-alpine` build → `nginx:alpine` serve)
      - Create `nginx.conf` or inline config for SPA routing (fallback to `index.html`)
      - Modify `docker-compose.yml` (add `prod` profile/service using the new Dockerfile)
      - Modify `.dockerignore` if new paths need excluding
    - **Acceptance criteria**:
      - `docker build -f Dockerfile .` produces an image under ~200 MB (Nginx alpine + dist)
      - Running the container serves the app on port 80 and SPA deep links resolve (404s fall back to `index.html`)
      - `docker compose --profile prod up` brings the prod image up locally
      - No dev tooling (node_modules, Angular CLI) ships in the final image layer
      - Healthcheck configured so the container reports ready once Nginx is listening

  - [x] **4.2.3 Global error handling + production-aware logger** (Size: M)
    - **Description**: Introduce a thin `LoggerService` that routes `console.log`/`console.warn`/`console.error` through an `environment.production` gate — in production, raw Supabase error objects and debug logs are suppressed, and only sanitized messages surface. Replace raw `console.error(...)` calls in pages that log Supabase errors (standings, leaderboard, matches, predictions) with `this.logger.error('Failed to load X', err)`. Wrap `SupabaseDataService` error paths in a sanitized domain error (e.g. `DataServiceError('Unable to load joker state')`) so column names, constraint names, and RLS denial reasons never reach the browser console in prod. Confirm no stray `console.log` statements remain in shipping code (or gate them on `!environment.production`).
    - **Depends on**: 4.2.1
    - **Files**:
      - Create `frontend/src/app/core/services/logger.service.ts`
      - Modify `frontend/src/app/core/services/supabase-data.service.ts` (sanitized domain error wrappers on every method that returns a raw Supabase error)
      - Modify `frontend/src/app/platforms/player/pages/standings/standings.page.ts` (use logger)
      - Modify `frontend/src/app/platforms/group-admin/pages/leaderboard/leaderboard.page.ts` (use logger)
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (use logger)
      - Modify `frontend/src/app/platforms/player/pages/predictions/predictions.page.ts` (use logger)
      - Audit all pages for stray `console.log` / `console.error` calls
    - **Acceptance criteria**:
      - `LoggerService` suppresses `.log` and `.warn` when `environment.production === true`; `.error` routes to a sanitized message only
      - No raw `console.error(supabaseError)` calls remain in shipping page code
      - `SupabaseDataService` methods that hit a Supabase error throw a typed `DataServiceError` with a safe user-facing message; the raw error is logged via the logger only (dev-visible)
      - Network errors surface as a user-friendly toast, not a raw error object
      - Existing passing tests unchanged; new tests cover the logger gating

  - [x] **4.2.4 Loading states on all data-fetching pages** (Size: M)
    - **Description**: Every page that fetches from Supabase must render a loading spinner while pending, an empty state when the query returns no rows, and a user-friendly error toast on failure. Standardize the pattern (same spinner component, same toast copy conventions) so the UX is consistent across pages.
    - **Depends on**: 4.2.3
    - **Files**:
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (loading spinner; fix `venue: ''` empty-state — template renders orphaned icon when venue blank)
      - Modify `frontend/src/app/platforms/player/pages/predictions/predictions.page.ts` (loading spinner)
      - Modify `frontend/src/app/platforms/player/pages/groups/groups.page.ts` (loading spinner)
      - Modify `frontend/src/app/platforms/player/pages/standings/standings.page.ts` (loading spinner)
      - Modify `frontend/src/app/platforms/player/pages/group-standings/group-standings.page.ts` (loading spinner)
      - Modify `frontend/src/app/platforms/group-admin/pages/predictions/predictions.page.ts` (loading spinner)
      - Modify `frontend/src/app/platforms/group-admin/pages/leaderboard/leaderboard.page.ts` (loading spinner)
      - Modify `frontend/src/app/platforms/super-admin/pages/dashboard/dashboard.page.ts` (loading spinner)
      - Modify `frontend/src/app/platforms/super-admin/pages/users/users.page.ts` (loading spinner)
    - **Acceptance criteria**:
      - Every data-fetching page renders a spinner while loading
      - Every page renders a visible empty state when the query resolves empty
      - Network errors surface as a toast (via 4.2.3 logger path) with sanitized copy
      - `matches.page` venue empty-state template no longer renders an orphaned icon when venue is blank
      - Pattern is consistent across player, group-admin, and super-admin platforms

  - [x] **4.2.5 Critical security hardening** (Size: M)
    - **Description**: Seven launch-blocking security/hardening items surfaced by prior security scans and code review. All have concrete fixes; grouping here so they ship as one PR with coordinated tests.
    - **Depends on**: 4.0.6, 4.0.7, 4.1.1 (the Edge Functions + migrations these items modify must exist)
    - **Files**:
      - Modify `frontend/supabase/functions/sync-matches/index.ts` (atomic cooldown UPDATE; wires `'in_progress'` status)
      - Modify `frontend/supabase/migrations/010_scoring_trigger.sql` (extend trigger WHEN clause for un-completion transition)
      - Modify `frontend/supabase/functions/admin-signout/index.ts` (parse `userId` before role check; write audit log)
      - Create `frontend/supabase/migrations/011_admin_audit_log.sql` (new `admin_audit_log` table + RLS)
      - Create `frontend/supabase/migrations/012_matches_audit_trigger.sql` (super-admin matches-write audit trigger + immutable `match_audit` table)
      - Modify `frontend/supabase/functions/sync-matches/index.ts` and `frontend/supabase/functions/admin-signout/index.ts` (CORS allowlist headers, not `*`)
      - Config change: Sentry / session-replay provider — exclude the super-admin users-and-groups page from capture
    - **Acceptance criteria**:
      - **Atomic sync cooldown**: `sync-matches` replaces the read-then-act cooldown with a single `UPDATE sync_metadata SET last_sync_status = 'in_progress' WHERE id = 1 AND (last_sync_at IS NULL OR last_sync_at < NOW() - INTERVAL '5 minutes' OR last_sync_status = 'error') RETURNING *`. Zero rows returned ⇒ cooldown, return HTTP 429. Concurrent invocations are serialized by the UPDATE. `'in_progress'` enum value is now wired.
      - **Un-completion trigger edge case**: `score_match_on_completion` trigger WHEN clause extended with `OLD.status = 'completed' AND NEW.status IS DISTINCT FROM 'completed'`. In that branch, zero `predictions.points_earned` for the match's predictions and call `recompute_group_member_aggregates` on each affected user. Verified by a new SQL test case in `010_scoring_trigger_test.sql`.
      - **admin-signout audit ordering**: Edge Function parses `userId` from the body BEFORE the role check, so a forbidden caller leaves a full attack-context record (caller id + intended target) in the audit log.
      - **`admin_audit_log` table**: New migration creates `admin_audit_log(id, caller_id, target_user_id, action, metadata, created_at)` with RLS allowing super-admin SELECT only. `admin-signout` writes one row per invocation (success AND denied).
      - **Super-admin matches-write audit trigger**: New migration adds an immutable `match_audit(id, caller_id, match_id, before_scores, after_scores, created_at)` table and a trigger on `matches` UPDATE that writes one row per score change (caller resolved from `auth.uid()`). Delete/update on `match_audit` denied by RLS.
      - **CORS allowlist**: Both Edge Functions respond to OPTIONS with explicit `Access-Control-Allow-Origin` set to the production + staging app origins (not `*`), plus `-Methods` and `-Headers` reflecting actual usage. Direct cross-origin `fetch` from disallowed origins fails.
      - **Session-replay / Sentry exclusion**: The super-admin users-and-groups page is excluded from session-replay and error-tracking capture (renders user emails). Verified via provider config (exclusion list or PII masking rule).
      - Each item covered by a test: SQL test for un-completion + trigger; Deno/unit test for atomic cooldown + audit ordering; migration verification for audit tables.

    - [x] **4.2.5.1 Migration 011 — scoring trigger un-completion edge case** (Size: S)
      - **Description**: Extend the existing `score_match_on_completion` trigger to handle the reverse transition. Today the trigger only fires when `status` flips TO `'completed'`; if a super-admin corrects a match by flipping it back out of `'completed'` (e.g. to `'scheduled'` or `'postponed'` after a mis-entered score), stale `points_earned` remain on the prediction rows and `group_members` aggregates stay inflated. Extend the trigger's `WHEN` clause to ALSO fire on `OLD.status = 'completed' AND NEW.status IS DISTINCT FROM 'completed'`, and in that branch zero `points_earned` for every prediction on the match then call `recompute_group_member_aggregates` for each affected user. The forward-completion branch is unchanged.
      - **Depends on**: 4.1.1 (migration 010 must exist)
      - **Files**:
        - Create `frontend/supabase/migrations/011_scoring_trigger_uncompletion.sql` (DROP + recreate the trigger with the extended `WHEN` clause and a branch that handles un-completion by zeroing `points_earned` and recomputing aggregates)
        - Modify `frontend/supabase/tests/010_scoring_trigger_test.sql` (add test case: complete match → un-complete match → assert `points_earned = 0` on all predictions for the match AND affected `group_members.total_points` / `correct_scores` / `correct_results` decrement to the pre-completion baseline)
      - **Acceptance criteria**:
        - Trigger fires on both forward (`→ completed`) and reverse (`completed →`) transitions
        - Un-completion zeros `points_earned` on every prediction for the match and recomputes aggregates for every affected user
        - Forward-completion path from 4.1.1 is preserved unchanged (same `points_earned` written, same aggregate recompute)
        - New SQL test asserts the complete-then-uncomplete round-trip converges to pre-completion baseline
        - Idempotent: repeating the un-completion transition is a no-op (aggregates already at baseline)
        - Existing 010 scoring tests still pass unchanged

    - [x] **4.2.5.2 Migration 012 — admin_audit_log + matches_audit tables + UPDATE-only audit trigger** (Size: M)
      - **Description**: Create two append-only audit tables and the `matches` UPDATE trigger that writes to `matches_audit`. `admin_audit_log` records super-admin Edge Function invocations (written by `admin-signout` in 4.2.5.5; success AND denied). `matches_audit` records score corrections made directly against the `matches` table (e.g. super-admin fixes via PostgREST). The trigger fires on UPDATE ONLY — INSERT events are always service_role writes from the sync Edge Function (no human actor to attribute) so they are intentionally excluded. RLS on both tables: super-admin SELECT only; no UPDATE / DELETE policies anywhere (append-only enforced at the policy layer; writes happen via `SECURITY DEFINER` functions or the trigger itself).
      - **Depends on**: 4.1.1
      - **Files**:
        - Create `frontend/supabase/migrations/012_audit_tables_and_trigger.sql`
          - `CREATE TABLE admin_audit_log (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), caller_id uuid, target_user_id uuid, action text NOT NULL, metadata jsonb, created_at timestamptz NOT NULL DEFAULT now())` + index on `(caller_id, created_at DESC)` and `(target_user_id, created_at DESC)`
          - `CREATE TABLE matches_audit (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), caller_id uuid, match_id uuid NOT NULL, before_scores jsonb, after_scores jsonb, created_at timestamptz NOT NULL DEFAULT now())` + index on `(match_id, created_at DESC)`
          - `CREATE FUNCTION matches_audit_trigger() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$ ... $$` — captures `auth.uid()` as `caller_id`, serializes `OLD`/`NEW` home+away scores into `before_scores`/`after_scores`, INSERTs one row per UPDATE
          - `CREATE TRIGGER trg_matches_audit AFTER UPDATE ON matches FOR EACH ROW WHEN (OLD.home_score IS DISTINCT FROM NEW.home_score OR OLD.away_score IS DISTINCT FROM NEW.away_score) EXECUTE FUNCTION matches_audit_trigger()` — UPDATE only, no INSERT trigger
          - RLS: ENABLE on both tables; policy `admin_audit_log_super_admin_select` and `matches_audit_super_admin_select` using existing `is_super_admin()` helper; NO insert/update/delete policies (writes only via SECURITY DEFINER paths)
          - Grant `service_role` INSERT on `admin_audit_log` (Edge Function write path); grant nothing to `authenticated`
        - Create `frontend/supabase/tests/012_audit_tables_test.sql` (assert: super-admin can SELECT both tables; non-admin SELECT returns zero rows; UPDATE to `matches.home_score` writes exactly one `matches_audit` row with correct `caller_id` / `before_scores` / `after_scores`; INSERT into `matches` does NOT fire the audit trigger — zero audit rows; UPDATE to a non-score column on `matches` does NOT fire the trigger; direct UPDATE / DELETE on `matches_audit` denied by RLS)
      - **Acceptance criteria**:
        - Migration applies cleanly on top of 011
        - `admin_audit_log` and `matches_audit` tables exist with the specified columns and indexes
        - `matches` UPDATE trigger fires on score changes and writes a single `matches_audit` row capturing `caller_id` (from `auth.uid()`), `before_scores`, `after_scores`
        - **INSERT on `matches` does NOT fire the audit trigger** — service_role sync writes do not pollute the audit log (captured explicitly in the test file)
        - Non-score column updates on `matches` do not fire the trigger
        - Super-admin can SELECT from both audit tables; non-admin cannot
        - Direct UPDATE / DELETE against `matches_audit` denied by RLS (append-only)
        - `service_role` has INSERT on `admin_audit_log` (so 4.2.5.5 can write rows from the Edge Function)

    - [x] **4.2.5.3 Migration 013 — claim_sync_slot() RPC + shared CORS helper** (Size: S)
      - **Description**: Two surfaces, one slice. (a) SQL: new migration adding a `claim_sync_slot()` SECURITY DEFINER RPC that atomically claims the sync cooldown slot via a single `UPDATE sync_metadata SET last_sync_status = 'in_progress', last_sync_at = NOW() WHERE id = 1 AND (last_sync_at IS NULL OR last_sync_at < NOW() - INTERVAL '5 minutes' OR last_sync_status = 'error') RETURNING *`. Returns the updated row (caller owns the slot) or zero rows (cooldown — caller must return 429). Concurrent invocations are serialized by Postgres row-level locks on the single-row table. (b) TypeScript: shared CORS helper used by both Edge Functions — allowlist of production + staging app origins (read from env var `ALLOWED_ORIGINS`, comma-separated), returns the correct `Access-Control-Allow-Origin` header mirroring the request's `Origin` if matched, else omits the header. Exports an `ok(body, origin)` / `err(status, body, origin)` response helper plus an `optionsResponse(origin)` preflight handler with `-Methods` / `-Headers` matching actual usage.
      - **Depends on**: 4.0.1 (sync_metadata table), 4.0.6 (existing sync-matches cooldown that this replaces)
      - **Files**:
        - Create `frontend/supabase/migrations/013_claim_sync_slot_rpc.sql`
          - `CREATE FUNCTION claim_sync_slot() RETURNS sync_metadata LANGUAGE sql SECURITY DEFINER AS $$ UPDATE sync_metadata SET last_sync_status = 'in_progress', last_sync_at = NOW() WHERE id = 1 AND (last_sync_at IS NULL OR last_sync_at < NOW() - INTERVAL '5 minutes' OR last_sync_status = 'error') RETURNING * $$`
          - Grant execute on `claim_sync_slot()` to `service_role` only
          - Ensure `sync_metadata.last_sync_status` accepts `'in_progress'` (add CHECK constraint value or drop the existing constraint if it enumerates)
        - Create `frontend/supabase/functions/_shared/cors.ts` (exported constants: `buildCorsHeaders(originHeader: string | null): Record<string,string>`, `optionsResponse(origin: string | null): Response`, `ALLOWED_ORIGINS = Deno.env.get('ALLOWED_ORIGINS')?.split(',').map(s => s.trim()) ?? []`)
        - Create `frontend/supabase/functions/_shared/cors.test.ts` (Deno test: allowed origin → header present; disallowed origin → header absent; no Origin header → header absent; OPTIONS returns 204 with correct `-Methods` / `-Headers`)
      - **Acceptance criteria**:
        - `claim_sync_slot()` returns exactly one row when the slot is claimable and zero rows when under cooldown
        - Two concurrent calls: the first returns a row, the second returns zero rows (row-level locks serialize)
        - `'in_progress'` accepted by `sync_metadata.last_sync_status` (constraint or enum updated)
        - `claim_sync_slot()` NOT granted to `authenticated` — service_role only
        - `_shared/cors.ts` helper mirrors the request origin only when it is in the `ALLOWED_ORIGINS` env var
        - `_shared/cors.ts` omits the `Access-Control-Allow-Origin` header entirely when the origin is not allowed (not `*`, not empty string — the header must not be set so the browser blocks the response)
        - OPTIONS preflight returns 204 with `-Methods: POST, OPTIONS` and `-Headers: authorization, content-type, apikey` (or actual headers used)
        - Deno test asserts all four CORS cases

    - [x] **4.2.5.4 Wire sync-matches to claim_sync_slot() + CORS allowlist** (Size: S)
      - **Description**: Replace the existing read-then-act cooldown in `sync-matches/index.ts` with a single `supabase.rpc('claim_sync_slot')` call at the top of the handler. If the RPC returns zero rows, respond HTTP 429 `{ ok: false, reason: 'cooldown', cooldownRemainingSeconds: N }` where N is computed from the current `sync_metadata.last_sync_at` (separate SELECT after the 429 branch — cheap, only on the cooldown path). If the RPC returns a row, the caller owns the slot; proceed with the existing sync logic. After sync completes (success or failure), UPDATE `sync_metadata` with the terminal status (`'ok'` / `'error'`) and `last_sync_error` as appropriate — this releases the `'in_progress'` lock by flipping the status. Replace the ad-hoc CORS headers with the shared helper from 4.2.5.3.
      - **Depends on**: 4.2.5.3
      - **Files**:
        - Modify `frontend/supabase/functions/sync-matches/index.ts` (import `_shared/cors`, replace the SELECT-then-UPDATE cooldown with a single `supabase.rpc('claim_sync_slot')`, handle zero-row ⇒ 429, flip status on terminal completion)
        - Modify `frontend/supabase/functions/sync-matches/index.test.ts` or create (Deno test asserting: claim_sync_slot returning zero ⇒ 429 with cooldownRemainingSeconds; claim_sync_slot returning a row ⇒ sync proceeds; CORS allowlist applied)
      - **Acceptance criteria**:
        - Cooldown enforcement is a single RPC call (no SELECT-then-UPDATE race window)
        - Two concurrent invocations within the cooldown window: one proceeds, one returns 429 — verifiable in the Deno test with a mocked/stubbed RPC
        - Terminal status flip (`'ok'` / `'error'`) happens after sync completes regardless of outcome
        - CORS headers sourced from `_shared/cors.ts`; disallowed origins receive no `Access-Control-Allow-Origin` header
        - Existing successful-sync behavior preserved (match upsert + score_match invocation from 4.1.2 still fires)
        - No raw `service_role` key or football-data.org API key leaked in any response or log

    - [x] **4.2.5.5 admin-signout — parse-before-role-check + audit writes (incl. malformed UUIDs) + CORS** (Size: M)
      - **Description**: Rework the admin-signout Edge Function authorization and audit ordering. Today the function checks the caller's role before parsing `userId` — a forbidden caller never leaves a trace in the audit log with the target they were trying to sign out. Fix by parsing and validating `userId` FIRST, then resolving the caller's role, then writing ONE `admin_audit_log` row capturing `caller_id`, `target_user_id`, `action = 'signout'`, and `metadata.outcome` (`'allowed'` / `'forbidden'` / `'invalid_target'`), then returning the response. **Malformed UUID case**: if the body `userId` fails UUID validation, still write an audit row with `target_user_id = NULL`, `action = 'signout'`, `metadata.outcome = 'invalid_target'`, `metadata.raw_input` (truncated + sanitized) BEFORE returning HTTP 400. Reconnaissance attempts MUST leave a trace. Replace the ad-hoc CORS headers with the shared helper from 4.2.5.3.
      - **Depends on**: 4.0.7, 4.2.5.2, 4.2.5.3
      - **Files**:
        - Modify `frontend/supabase/functions/admin-signout/index.ts`
          - Reorder: (1) parse body → (2) validate `userId` as UUID → (3) resolve caller's role → (4) short-circuit decision → (5) write `admin_audit_log` row with appropriate `outcome` → (6) return response
          - Malformed UUID branch writes the audit row with `target_user_id = NULL` before returning HTTP 400
          - Forbidden branch (non-super-admin caller) writes the audit row with `outcome = 'forbidden'` before returning HTTP 403
          - Allowed branch writes the audit row with `outcome = 'allowed'` AFTER `supabaseAdmin.auth.admin.signOut(userId)` resolves (so metadata can include the signout outcome)
          - Import `_shared/cors.ts`
        - Modify / create `frontend/supabase/functions/admin-signout/index.test.ts` (Deno tests for every branch: valid super-admin + valid target ⇒ 200 + audit row `outcome='allowed'`; non-super-admin + valid target ⇒ 403 + audit row `outcome='forbidden'` with the intended target captured; valid super-admin + malformed UUID ⇒ 400 + audit row `target_user_id=NULL` + `outcome='invalid_target'`; malformed JSON body ⇒ 400 + audit row with null target; CORS allowlist applied)
      - **Acceptance criteria**:
        - `userId` parsed and UUID-validated BEFORE role resolution
        - Every invocation (success, forbidden, malformed) writes exactly ONE `admin_audit_log` row
        - **Malformed UUID input logs an audit row with `target_user_id = null` and `action = 'signout'` before returning 400** — denied attempts ALWAYS leave a trace
        - Forbidden caller's audit row captures the intended target so attack context is preserved for review
        - Allowed-branch audit row is written AFTER the auth admin signOut call resolves so `metadata` can include any signOut error
        - Response codes: 200 (allowed), 403 (forbidden), 400 (malformed)
        - CORS headers sourced from `_shared/cors.ts`
        - No `service_role` key echoed in responses, logs, or audit metadata
        - Raw input fields in audit `metadata` truncated (e.g. first 256 chars) and sanitized — no full-request bodies or tokens ever written

    - [x] **4.2.5.6 Session-replay / Sentry PII exclusion on users-and-groups page** (Size: S)
      - **Description**: The super-admin users-and-groups page (4.0.9) renders user emails and activation state — sensitive PII that must not land in session-replay recordings or Sentry breadcrumbs. Configure the error-tracking / session-replay provider (whichever ships with the MVP — Sentry replay, LogRocket, or equivalent) to either exclude the `/super-admin/users-and-groups` route entirely from capture, or apply a PII masking rule covering the email column selectors. Verify via a real capture event that emails are redacted (or the page is absent from the recording). If no session-replay provider is wired at MVP, this task becomes a documented guard in the provider-integration checklist rather than code changes.
      - **Depends on**: 4.0.9
      - **Files**:
        - Modify the error-tracking / session-replay init config (location depends on provider — likely `frontend/src/main.ts` or a `core/services/monitoring.service.ts` if one exists at integration time)
        - If no provider wired yet: modify the provider-integration checklist doc (e.g. `docs/plans/mvp-plan.md` or a new `docs/ops/monitoring-integration.md`) to capture the exclusion requirement with the exact route path and CSS selectors
      - **Acceptance criteria**:
        - Session-replay / error-tracking provider config excludes `/super-admin/users-and-groups` route from capture OR masks every element rendering user emails on that route
        - Verification: a captured test event from the page shows no email strings in the replay or breadcrumb trail
        - If no provider is wired at MVP, the exclusion requirement is explicitly documented with route path + element selectors so the first integrator cannot miss it
        - No other super-admin pages accidentally excluded — only the users-and-groups route

  - **Decisions (4.2.5)**:
    1. **`claim_sync_slot()` ships as its own migration (013), separate from the audit tables (012).** Keeps each migration focused on one concern: 011 is scoring-trigger edge cases, 012 is audit infrastructure (tables + trigger), 013 is the sync cooldown RPC. Easier to review, easier to revert independently if one causes a production issue. The shared CORS helper lives in TypeScript (`_shared/cors.ts`) and is colocated with 013's slice because both Edge Functions (4.2.5.4 sync-matches and 4.2.5.5 admin-signout) consume it together.
    2. **`matches_audit` trigger fires on UPDATE only, not INSERT.** Rationale: INSERT events on `matches` are always `service_role` writes from the sync Edge Function — there is no human actor to attribute, so `auth.uid()` would be NULL and the audit row would be noise. The audit log exists to capture human score corrections (super-admin fixes a mis-entered score via PostgREST or a future admin UI). Excluding INSERT keeps the audit signal-to-noise high. Captured explicitly in 4.2.5.2's test file.
    3. **admin-signout: malformed UUIDs still log the attempt with `target_user_id = null` before returning 400.** Reconnaissance attempts — someone probing the endpoint with junk payloads to map the API surface — must leave a trace so ops can detect the pattern. The audit row uses `target_user_id = NULL`, `action = 'signout'`, `metadata.outcome = 'invalid_target'`, and a truncated/sanitized `metadata.raw_input`. Denied attempts ALWAYS leave a trace; there is no silent failure path on this endpoint.

  - [x] **4.2.6 AuthGuard cold-start race on super-admin deep-link** (Size: S)
    - **Description**: On cold start with a persisted Supabase session, `currentSession$` has emitted AND `authService.currentUser` has emitted (passing the `!authResponse?.user` check in `auth.guard.ts`), but `currentProfile$` may still be null while the `SELECT role FROM profiles WHERE id = ?` query is in flight. The super-admin branch at `auth.guard.ts:42` reads `this.supabaseService.currentProfile?.role` synchronously, gets `undefined`, falls through to `redirectToLogin()`, and a legitimate super-admin deep-linking to `/super-admin/dashboard` is bounced to `/auth/login` despite holding a valid session. Workaround today: manual refresh. Fix: replace the synchronous read in the super-admin branch with a subscription to `supabaseService.profile$`, filtered for the first non-null emission, bounded by a 5s timeout that fails closed (redirect + diagnostic toast). Non-super-admin branches are out of scope — they derive role from `authResponse.user.role` which arrives synchronously with the `currentUser` emission the guard already awaits.
    - **Depends on**: 4.0.2
    - **Files**:
      - Modify `frontend/src/app/core/guards/auth.guard.ts` (super-admin branch only, lines 40-48): replace synchronous `currentProfile?.role` read with async `profile$`-driven resolution. Inject `ToastController` from `@ionic/angular/standalone`. Add `PROFILE_HYDRATION_TIMEOUT_MS = 5000` and `PROFILE_TIMEOUT_MESSAGE = 'Session taking too long to load. Please sign in again.'` as private static constants so specs can reference them.
      - Modify `frontend/src/app/core/guards/auth.guard.spec.ts`: add a NEW describe block `describe('AuthGuard cold-start race (Task 4.2.6)', ...)` AFTER the existing Task 4.0.2 block — do not modify any existing tests. Wrap `beforeEach`/`afterEach` with `jest.useFakeTimers()` / `jest.useRealTimers()` so the 5s timeout is controllable via `jest.advanceTimersByTime`. Mock `ToastController` with `create: jest.fn().mockResolvedValue({ present: jest.fn().mockResolvedValue(undefined) })`. Reuse the existing `buildRoute` helper + `profileSubject` / `profile$` mock shape (confirmed present at `supabase.service.ts:80, 195-197, 207-209`).
    - **Acceptance criteria**:
      - Deep-linking to `/super-admin/dashboard` with `profile$` already hydrated to `{ role: 'super-admin' }` at subscription time returns `true` without a router navigation (hot-path regression).
      - Deep-linking with `profile$` initially null, then emitting `{ role: 'super-admin' }` within 5s returns `true` and does NOT call `router.navigate`.
      - Deep-linking with `profile$` that never emits a non-null value within 5s: guard returns `false`, calls `router.navigate(['/auth/login'], { queryParams: { returnUrl: '/super-admin/dashboard' } })`, and presents a toast via `ToastController.create` with `message === AuthGuard.PROFILE_TIMEOUT_MESSAGE`, `color: 'danger'`, `position: 'top'` (matching the `matches.page.ts:1054-1062` convention).
      - Deep-linking with `profile$` emitting `{ role: 'player' }` (wrong role, already hydrated) returns `false` and redirects to `/auth/login` — same failure mode as today's synchronous check; no toast required (role mismatch is not a diagnostic timeout).
      - `profile$` error emission is caught and routed to `redirectToLogin` — fail-closed; no toast.
      - All 7 existing specs in the Task 4.0.2 describe block still pass unchanged. In particular, the "currentProfile is null" spec at `auth.guard.spec.ts:112-122` still passes: under the new implementation it resolves via the 5s timeout path (since `profileSubject.next(null)` never produces a non-null value). Accept the 5s wall-clock cost OR wrap just that `it` body with fake timers if CI regression is a concern.
      - Non-super-admin branches (`player`, `group-admin`, no `expectedRole`, unauthenticated) are untouched and their 4 existing specs continue to pass.
    - **Test plan (Red phase — all failing against the current implementation)**:
      - `(a) allows access when profile is already hydrated as super-admin at guard-entry` — `profileSubject.next({ role: 'super-admin', ... })` BEFORE `canActivate`; expect `true`, no navigate, no toast.
      - `(b) waits for late profile hydration and allows access when super-admin arrives within 5s` — call `canActivate`, advance timers 2000ms, then emit super-admin; expect `true`, no navigate, no toast.
      - `(c) redirects to /auth/login with diagnostic toast when profile never hydrates within 5s` — advance timers 5001ms; expect `false`, `router.navigate(['/auth/login'], { queryParams: { returnUrl: '/super-admin/dashboard' } })`, toast `create` called with the exact message/color/position constants, `present()` invoked.
      - `(d) denies wrong-role access synchronously when profile hydrates as player on a super-admin route` — emit `{ role: 'player' }` before call; expect `false`, redirect, no toast.
      - `(e) fails closed when profile$ errors out` — `profileSubject.error(...)`; expect `false`, redirect, no toast.
    - **Implementation sketch** (super-admin branch only):
      - Import `filter, take, timeout, catchError, map, switchMap` from `rxjs/operators`; `of` from `rxjs`.
      - Restructure the outer `map` into `switchMap` so the super-admin path can return an inner observable; other branches wrap their sync result in `of(...)`.
      - Super-admin inner pipeline: `this.supabaseService.profile$.pipe( filter(p => p !== null), take(1), timeout(PROFILE_HYDRATION_TIMEOUT_MS), map(profile => { if (profile.role === 'super-admin') return true; this.redirectToLogin(route); return false; }), catchError(err => { this.redirectToLogin(route); if (err?.name === 'TimeoutError') this.presentTimeoutToast(); return of(false); }) )`.
      - Inject `ToastController`; add `presentTimeoutToast()` mirroring `matches.page.ts:1054-1062`.
    - **Non-goals**:
      - Non-super-admin branches remain untouched.
      - `NoAuthGuard` (same file, lines 83-157) is out of scope.
      - No refactor of `SupabaseService` BehaviorSubject contract.
      - No extension to future roles (`group-admin`) in this slice.
    - **Risks**:
      - `auth.guard.spec.ts:112-122` will run slower (~5s wall clock) post-change unless wrapped in fake timers — weigh against "never modify passing specs" rule.
      - `ToastController` must resolve from `providedIn: 'root'` scope at router-resolution time — smoke test via dev app.
      - `timeout(5000)` emits `TimeoutError` with `.name === 'TimeoutError'` in rxjs 7+ — fragile pin; acceptable for MVP.

  - [x] **4.2.7 Typed service returns + remove runtime typeof guards** (Size: S)
    - **Description**: Tighten loose `any` return types on `SupabaseDataService`, remove the runtime `typeof service.method === 'function'` guards that were added as deliberate workarounds to avoid modifying existing test mocks (additively extend the mocks instead), and replace the brittle `SeasonService.toString()`-based assertion with a source-file regex matching the pattern already used at `matches.page.spec.ts:157-162`. The `isLocked` short-circuit at the top of `matches.page.ts onSubmit()` (lines 1202-1208) is already in place from an earlier pass — this task's scope reduces to **adding a regression spec that locks the behaviour in**, not adding new production code for it.
    - **Depends on**: None (pure refactor; can run any time in 4.2)

    - **Pre-verified scope (from codebase scan, 2026-04-22)**:
      - `SupabaseDataService` public methods returning `any` / `any[]`: `joinGroup` (L117), `getGroupMembers` (L169), `getGameweeks` (L184), `getActiveGameweek` (L194), `getGameweek` (L205), `getPredictions` (L279), `getPredictionsWithMatches` (L299), `submitPredictions` (L321), `getGroupPredictions` (L343), `getLeaderboard` (L511). **10 methods total.**
      - `Gameweek` interface does NOT exist yet — `Match`, `PredictionGroup`, `GroupMember`, `Profile` all live in `frontend/src/app/services/supabase.service.ts` (L9-71). Convention: colocate new DB-row interfaces there, not a new `core/interfaces/` dir.
      - The existing `Prediction` interface in `supabase.service.ts:52-62` has a `group_id` field that does **NOT** exist on the real `predictions` table (migration 006 columns: `user_id`, `match_id`, `gameweek_id`, `gameweek_number`, `home_score`, `away_score`, `points_earned`, `joker_used`). Must not be reused as-is — either rewrite in place or add a new `PredictionRow` interface and leave the stale one to 4.3 triage (recommended: rewrite in place since keeping two names is worse than fixing one; flag the change in commit message).
      - `typeof` guards in page code: exactly 3 sites.
        1. `predictions.page.ts:148` — `typeof this.supabaseDataService.getGroups === 'function'` (wraps the entire group-selector block L148-168).
        2. `matches.page.ts:953` — `typeof service.getJokerUsage === 'function'` (inside `loadJokerContext`).
        3. `matches.page.ts:956` — `typeof service.getLastRegularGameweekBeforeSpecial === 'function'` (same method).
      - `isLocked` short-circuit at `matches.page.ts:1202-1208` **is already present** — no new production code needed for 4.2-point-4.
      - The `Function.prototype.toString()` assertion lives at `season.service.spec.ts:95-101` (not 91-97 as originally noted — off by 4 lines). Calls `SeasonService.toString()` on the class constructor, not a method body.
      - **Spec-mock risk — predictions.page.spec.ts Task 3.2.4 block (L11-305) does NOT stub `getGroups`.** It relies on the `typeof` guard falling through. Removing the guard breaks every test in that block (~15 tests) unless `getGroups` is stubbed additively in the 3.2.4 `beforeEach` (L40-66). The 3.2.5 block (L307+) and 4.2.4.1 block (L448+) already stub it or don't need it.

    - **Files**:
      - Modify `frontend/src/app/services/supabase.service.ts`:
        - ADD `Gameweek` interface near L50 (columns from migration 005: `id`, `number`, `season_id`, `deadline`, `is_active`, `is_special`, `special_type`, `created_at`, `updated_at`). Export it.
        - REWRITE `Prediction` interface (L52-62) to match the actual DB schema: drop `group_id`, add `match_id`, `gameweek_id`, `gameweek_number`, `joker_used`. Keep export name `Prediction` so `SupabaseDataService` can import it. Commit-message note: "drops stale `group_id` field from `Prediction` interface — column never existed on the `predictions` table (see migration 006)".
        - ADD `PredictionWithMatch = Prediction & { matches: Match }` for the `getPredictionsWithMatches` return. (Narrow enough for this task; the fuller view-model work is 4.3.)
        - ADD `GroupMemberWithProfile = GroupMember & { profiles: Pick<Profile, 'username' | 'avatar_url'> | null }` for `getGroupMembers` + `getLeaderboard` return shape.
      - Modify `frontend/src/app/core/services/supabase-data.service.ts`:
        - Import `Gameweek`, `Prediction`, `PredictionWithMatch`, `GroupMember`, `GroupMemberWithProfile` from `../../services/supabase.service` (extend existing import line at L2).
        - Tighten returns, method by method:
          - `joinGroup(code): Promise<GroupMember>` (L117)
          - `getGroupMembers(groupId): Promise<GroupMemberWithProfile[]>` (L169)
          - `getGameweeks(): Promise<Gameweek[]>` (L184)
          - `getActiveGameweek(): Promise<Gameweek>` (L194) — keep throwing on no-rows (current behaviour); consumer `safeGetActiveGameweek` catches and returns null.
          - `getGameweek(gameweekId): Promise<Gameweek>` (L205)
          - `getPredictions(gameweekNumber): Promise<Prediction[]>` (L279)
          - `getPredictionsWithMatches(gameweekNumber): Promise<PredictionWithMatch[]>` (L299)
          - `submitPredictions(...): Promise<Prediction[]>` (L321)
          - `getGroupPredictions(groupId, gameweekNumber): Promise<Prediction[]>` (L343)
          - `getLeaderboard(groupId): Promise<GroupMemberWithProfile[]>` (L511)
        - The existing `const groupIds = memberships.map((m: any) => m.group_id);` (L47) and `userIds = members.map((m: any) => m.user_id);` (L368) can be tightened to the inline PostgREST-selected shape — low priority, fold in if cheap, skip otherwise.
      - Modify `frontend/src/app/core/services/season.service.ts`:
        - `safeGetActiveGameweek()` return type can relax to `Promise<Gameweek | null>` (L80); the single caller only reads `.number` so no narrowing needed. Import `Gameweek` from `../../services/supabase.service`.
        - `safeGetGameweeks()` return type becomes `Promise<Gameweek[]>` (L92).
      - Modify `frontend/src/app/platforms/player/pages/predictions/predictions.page.ts`:
        - Remove the `typeof` guard at L148 and restructure L148-168 so the group-selector block is now unconditional. The inner `try/catch` at L150-155 remains (it handles fetch rejection).
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts`:
        - Remove the `const service = this.supabaseDataService as any;` cast (L951) and the two `typeof` guards (L953, L956) inside `loadJokerContext`. Call the methods directly. The `try/catch` at L950/L966 remains as the safety net.
        - Update the method-level doc comment (L942-948) to drop the "Uses `typeof === 'function'` guards" sentence.
        - **No change to `onSubmit`** — the `isLocked` guard (L1202-1208) is already in place.
      - Modify `frontend/src/app/platforms/player/pages/predictions/predictions.page.spec.ts`:
        - Task 3.2.4 describe block at L11-305 — add `getGroups: jest.fn().mockResolvedValue([{ id: 'g-default', name: 'Default Group' }])` to the `beforeEach` mock at L49-51. Additive only: no existing assertion in that block touches `availableGroups` / `selectedGroupId` / `hasNoGroups`, so this is a pure scaffolding add. After the guard is removed, the page code always calls `getGroups` first, so the stub must resolve to a non-empty array (empty would trigger the `hasNoGroups` short-circuit and skip `getPredictionsWithMatches`, breaking every existing assertion).
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.spec.ts`:
        - Find every `mockSupabaseDataService` `beforeEach` block that does NOT stub `getJokerUsage` / `getLastRegularGameweekBeforeSpecial` / `getGameweeks` (used by `applyGameweekMeta`) and add additive stubs. Use this exact shape to match the real service contract:
          ```ts
          getJokerUsage: jest.fn().mockResolvedValue({ usedCount: 0, firstJokerGameweek: null, secondJokerGameweek: null }),
          getLastRegularGameweekBeforeSpecial: jest.fn().mockResolvedValue({ beforeBoxingDay: null, beforeFinalDay: null }),
          getGameweeks: jest.fn().mockResolvedValue([]),
          getPredictions: jest.fn().mockResolvedValue([]),
          ```
        - Count expected blocks affected: 2.2.2, 2.2.3, 2.2.4 (existing `beforeEach` blocks at L34, L199, L374 and onward). Do NOT modify the assertions.
      - Modify `frontend/src/app/core/services/season.service.spec.ts`:
        - Replace L95-101 (`SeasonService.toString()` block) with the source-file regex pattern from `matches.page.spec.ts:157-162`:
          ```ts
          it('should not reference hardcoded SEASON_START / SEASON_END dates', () => {
            const source = readFileSync(join(__dirname, 'season.service.ts'), 'utf-8');
            expect(source).not.toMatch(/2024-08-10/);
            expect(source).not.toMatch(/2025-05-19/);
          });
          ```
        - Add the imports at the top of the spec file: `import { readFileSync } from 'fs';` and `import { join } from 'path';`.
      - Add a NEW describe block at the end of `matches.page.spec.ts` (do NOT modify existing blocks):
        ```
        describe('MatchesPage (Task 4.2.7 — isLocked short-circuit regression)', ...)
        ```
        This block exists to lock the existing `onSubmit` `isLocked` guard in place so a future refactor cannot silently drop it.

    - **Acceptance criteria**:
      1. Zero `any` / `Promise<any>` / `Promise<any[]>` return types remain on any public method of `SupabaseDataService`. (Verify with `grep -n "Promise<any" frontend/src/app/core/services/supabase-data.service.ts` — expect no matches.)
      2. Zero `typeof svc.method === 'function'` or `(service as any).method` bypass casts remain in `predictions.page.ts` or `matches.page.ts`. (Verify with `grep -rn "typeof.*=== 'function'" frontend/src/app/platforms/player/pages/` — expect no matches in `.ts` files.)
      3. `season.service.spec.ts` no longer calls `SeasonService.toString()`. The date-absence assertion still passes and still fails if `2024-08-10` or `2025-05-19` is added back to `season.service.ts`.
      4. `matches.page.ts onSubmit()` continues to early-return when `isLocked === true`, with a new spec proving it: invoking `component.onSubmit()` with `component.isLocked = true` does NOT call `supabaseDataService.submitPredictions`.
      5. Every pre-existing passing spec still passes. Updated mocks are purely additive (new method stubs only, no assertion edits, no existing-stub modifications). In particular, the 3.2.4 block's ~15 tests, the 3.2.5 block's ~10 tests, and every `matches.page.spec.ts` describe block continue to pass unchanged.
      6. Production build (`cd frontend && npm run build:prod`) completes with zero TypeScript errors. This is the compile-time gate for the typing work.
      7. Full test suite (`cd frontend && npm test`) passes with zero new failures.

    - **Test plan (Red phase — write these specs FIRST, before touching implementation)**:
      - **(a) `season.service.spec.ts` source-file regex replacement** — rewrite L95-101 in place as a Red test (will fail before source-file regex imports are added, then Green once the spec file is updated). Intentionally a functional-equivalent replacement, not a new test — this one IS the TDD-reddened case.
      - **(b) NEW `matches.page.spec.ts` block**: `describe('MatchesPage (Task 4.2.7 — isLocked short-circuit regression)')` with a single spec: "onSubmit returns without calling submitPredictions when isLocked is true". Set up a minimal component with `component.isLocked = true`, `component.currentGameweekId = 'gw-uuid-1'`, `component.selectedPredictionCount = 3`, `component.predictionsCompleted = false`, one valid match in `component.matches`. Assert `mockSupabaseDataService.submitPredictions` is NOT called after `await component.onSubmit()`. This spec passes immediately against the current code (the guard is already there) — it is a **regression lock**, not a Red/Green step. Label it as such in a code comment.
      - **(c) `predictions.page.spec.ts` Task 3.2.4 mock extension** — NOT a new spec; add `getGroups` to the existing `beforeEach` at L49-51. This will be a Red step only if the mock is added BEFORE the page-code guard removal: the existing 3.2.4 tests start calling `getGroups` through the page code (previously skipped via guard) and would fail with "getGroups is not a function" IF the mock were missing. Order of operations (see below): update mock first (still passes), then remove guard, then re-run (still passes).
      - **(d) `matches.page.spec.ts` mock extensions** — same pattern as (c): additive stubs for `getJokerUsage`, `getLastRegularGameweekBeforeSpecial`, `getGameweeks`, `getPredictions` in every existing `beforeEach`. No new assertions.
      - **Type-check step (not a Jest test)**: after each file edit in implementation order, run `cd frontend && npm run build:prod` as the compile-time gate. Fail-fast on the first type error surfaces the dependency chain.

    - **Implementation order (strict — each step must leave the suite Green before proceeding)**:
      1. **Interfaces first** — add `Gameweek`, rewrite `Prediction`, add `PredictionWithMatch`, add `GroupMemberWithProfile` in `supabase.service.ts`. Run `npm run build:prod`. Anything downstream that consumed the stale `Prediction.group_id` field will fail to compile — grep the repo for `\.group_id` on a `Prediction` to pre-flight this. If hits appear in non-task code, scope creep — stop and flag.
      2. **Tighten `SupabaseDataService` returns** — one method at a time. Run `npm run build:prod` after each. The first few will be trivial; `getPredictionsWithMatches` is the riskiest because the joined `matches` payload's shape must match `PredictionWithMatch`.
      3. **Update `season.service.ts`** consumer types. Run `npm run build:prod`. Should be a zero-diff type-level change since `Gameweek` is a structural superset of `{ number: number }`.
      4. **Update legacy specs (additive mock extensions)**: `predictions.page.spec.ts` 3.2.4 block + `matches.page.spec.ts` all three `beforeEach` blocks (2.2.2, 2.2.3, 2.2.4). Run `npm test` — all existing tests should still pass because the new mocks are invoked but their return values aren't asserted against.
      5. **Remove `typeof` guards** — `predictions.page.ts:148` first (simplest; one site), then `matches.page.ts:951-959` (drop the `as any` cast + two `typeof` checks). Run `npm test` — should still pass because step 4 already provisioned the mocks.
      6. **Replace the `SeasonService.toString()` spec** in `season.service.spec.ts:95-101`. Run `npm test` — the replacement is functionally equivalent.
      7. **Add the new `MatchesPage (Task 4.2.7 — isLocked short-circuit regression)` describe block** at the end of `matches.page.spec.ts`. Run `npm test` — passes immediately (regression lock).
      8. Final full-suite run: `npm test` then `npm run build:prod`. Both Green = done.

    - **Non-goals (out of scope for this slice — do NOT scope-creep into these)**:
      - Typed `PredictionWithMatch` deep view-model refactor replacing `toViewModel(row: any)` in `predictions.page.ts:209` — queued in 4.3 "Typed interfaces" bucket. This task only tightens the **service return type**; the page's internal `toViewModel(row: any)` stays `any` for now.
      - Typed `GroupPrediction { username?: string; gameweek_number: number; home_score: number; away_score: number }` on group-standings + group-admin predictions pages — queued in 4.3.
      - Extraction of `AdminService` from `SupabaseDataService` — queued in 4.3 "Architecture / refactors".
      - Pagination work on `getAllUsers` / `getAllGroups` — queued in 4.3.
      - Adding a toast on the `onSubmit` `isLocked` short-circuit — the current behaviour is silent no-op (the button is also hidden, so a user never hits this path). Adding a toast would change UX semantics; 4.3 decision if surfaced by user feedback.
      - Any `DeepReadonly<T>` / branded type / `satisfies` polish — this is plain-interface tightening only.

    - **Risks**:
      - **Mock-extension ordering** (primary risk): if the `typeof` guard is removed before the spec mocks are extended, ~25 tests break. Implementation order step 4 MUST precede step 5. The TDD agent must NOT reorder.
      - **Stale `Prediction` interface rewrite** (secondary risk): dropping the `group_id` field is technically a breaking change to a public-ish interface exported from `supabase.service.ts`. Grep must confirm no other consumer reads `.group_id` off a `Prediction`-typed value. If hits surface outside the task's file list, stop and flag — that's a separate slice.
      - **`npm run build:prod` triggers a full Angular compile** (~60s) which the TDD agent may be tempted to skip in favour of `npm test`. Skipping it misses type-only errors that Jest's transformer can silently let through in some configurations. The agent must run it at each implementation-order checkpoint, not just at the end.
      - **"Never modify existing passing specs" rule**: the `season.service.spec.ts:95-101` replacement IS a modification of a passing spec. Justification: the test's intent (guard against date-driven gameweek calc) is preserved; only the implementation mechanism changes. Flag this in the commit message so a reviewer can sanity-check. All other spec edits are strictly additive (new mock methods, new describe block).
      - **Regression-lock spec for `onSubmit`**: the task scope originally included ADDING the guard, but the guard is already there. The regression spec protects future refactors but adds no production behaviour. If a future task intentionally removes the guard (unlikely — it's fail-closed security), the spec will need to be deleted along with it.

  - [x] **4.2.7.1 Fix `special_type` dash/underscore enum mismatch** (Size: XS)
    - **Description**: Pre-existing silent bug surfaced during 4.2.7 review. `getLastRegularGameweekBeforeSpecial()` in `supabase-data.service.ts:483-484` compares `special_type` against `'boxing_day'` / `'final_day'` (underscores), but the DB CHECK constraint (`migrations/002_gameweeks_table.sql:22`), the mapper (`football-api-mapper.ts:27,34`), and the sync Edge Function (`supabase/functions/sync-matches/index.ts:71,78`) all write **dashes**: `'boxing-day'` / `'final-day'`. Runtime result: `findBefore()` never matches any row, the method always returns `{ beforeBoxingDay: null, beforeFinalDay: null }`, and the joker-2nd-auto-assign warning at the Final Day (GW38) deadline never fires. The existing spec at `supabase-data.service.spec.ts:731-819` passes today only because the fixtures use the same broken underscore form — the tests validate the bug against itself. Pure find-replace scope.
    - **Depends on**: None (orthogonal to 4.2.7; production code change is 2 string literals)

    - **Pre-verified scope (from codebase scan, 2026-04-22)**:
      - Underscore form `'boxing_day'` / `'final_day'` appears in `frontend/` at exactly these sites:
        1. `frontend/src/app/core/services/supabase-data.service.ts:483` — `findBefore('boxing_day')` (production bug)
        2. `frontend/src/app/core/services/supabase-data.service.ts:484` — `findBefore('final_day')` (production bug)
        3. `frontend/src/app/core/services/supabase-data.service.ts:443` — doc-comment lists `` `boxing_day`, `final_day` `` as the known special types (stale doc; must match the dash-form literals)
        4. `frontend/src/app/core/services/supabase-data.service.spec.ts:732` — describe title text `"GW 19 is boxing_day and GW 38 is final_day"` (cosmetic, update for consistency with the real enum)
        5. `frontend/src/app/core/services/supabase-data.service.spec.ts:736, 738, 756, 759, 788, 790` — 6 fixture literals across 3 test cases (`should return beforeBoxingDay=18...`, `should return beforeBoxingDay=null when Boxing Day is GW 1`, `should ignore other special_type values if present`)
      - `'mystery_cup'` at `supabase-data.service.spec.ts:786` is an intentional junk value in the "ignore other special_type values" test — leave untouched; its role is to not match either known type.
      - Dash form `'boxing-day'` / `'final-day'` is the canonical shape, confirmed at `migrations/002_gameweeks_table.sql:22`, `football-api-mapper.ts:27,34`, `supabase/functions/sync-matches/index.ts:71,78`. Sync pipeline is already correct — do not touch.
      - No TypeScript enum / union type exists for `special_type`; it is typed as `string | null` at `supabase-data.service.ts:467`. Introducing a typed enum is **4.3 scope** (see "Typed interfaces" bucket) — not this task.

    - **Files**:
      - Modify `frontend/src/app/core/services/supabase-data.service.ts`:
        - Line 483: `findBefore('boxing_day')` → `findBefore('boxing-day')`
        - Line 484: `findBefore('final_day')` → `findBefore('final-day')`
        - Line 443 (doc-comment): update `` `boxing_day`, `final_day` `` → `` `boxing-day`, `final-day` ``
      - Modify `frontend/src/app/core/services/supabase-data.service.spec.ts`:
        - Line 732: describe title `boxing_day` / `final_day` → `boxing-day` / `final-day`
        - Lines 736, 738, 756, 759, 788, 790: fixture string literals underscore → dash (6 replacements)
        - Leave line 786 (`'mystery_cup'`) untouched.

    - **Acceptance criteria**:
      1. Both production-code literals at `supabase-data.service.ts:483-484` use dash form (`'boxing-day'`, `'final-day'`), matching the DB CHECK constraint and the sync pipeline writers.
      2. All 6 underscore-form spec fixtures at `supabase-data.service.spec.ts:736, 738, 756, 759, 788, 790` updated to dash form. The existing assertions (`{ beforeBoxingDay: 18, beforeFinalDay: 37 }`, `{ beforeBoxingDay: null, beforeFinalDay: 3 }`, `{ beforeBoxingDay: 3, beforeFinalDay: 5 }`) stand unchanged — the fixture shape is what moves, the expected output is identical because the bug masked itself symmetrically.
      3. `grep -rn "'boxing_day'\\|'final_day'" frontend/src/` returns zero hits in `.ts` / `.spec.ts` files.
      4. `cd frontend && npm test` passes with zero new failures. The 5 tests in the `getLastRegularGameweekBeforeSpecial` describe block all pass against dash-form fixtures.
      5. `cd frontend && npm run build:prod` completes with zero errors.
      6. Doc-comment at `supabase-data.service.ts:443` matches the actual literal values the function compares against.

    - **Test plan (Red phase — write the failing test FIRST, before touching production code)**:
      - The 5 existing tests at `supabase-data.service.spec.ts:731-819` already cover every branch of `getLastRegularGameweekBeforeSpecial()`. They currently pass against underscore fixtures because the service also uses underscores (both broken, symmetrically). **The Red step is flipping the fixtures first**: change the 6 underscore literals at lines 736, 738, 756, 759, 788, 790 to dash form WITHOUT touching the service. Run `npm test` — the first test (`should return beforeBoxingDay=18, beforeFinalDay=37...`) must now fail with `Expected: { beforeBoxingDay: 18, beforeFinalDay: 37 }, Received: { beforeBoxingDay: null, beforeFinalDay: null }`. That failure proves the production bug is real. Then apply the 2-line service fix (+ the doc-comment update). Re-run — Green.
      - If for any reason the existing test infrastructure is skipped (e.g. `mockClient.from.mockReturnValueOnce(builder)` fails to wire), fall back to a single new minimal spec: "returns beforeBoxingDay=18 when a row with `special_type: 'boxing-day'` exists at GW 19 and regular rows precede it". Assert non-null return. This is the same assertion as the existing first test, just isolated.
      - No changes to any other spec file. No new production code beyond the 2 string literals.

    - **Non-goals (out of scope for this slice — do NOT scope-creep into these)**:
      - Introducing a TypeScript `type SpecialType = 'boxing-day' | 'final-day'` or enum — queued in 4.3 "Typed interfaces" bucket alongside `PredictionWithMatch` and `GroupPrediction`.
      - Fixing the stale `Prediction.is_locked` column usage or the missing-column references on `GroupMember` surfaced in the 4.2.7 code review — already queued to 4.3.
      - Touching the sync pipeline (`football-api-mapper.ts`, `supabase/functions/sync-matches/index.ts`) or migration 002 — all three already emit/enforce dashes correctly. Any edit there would be a reverse bug.
      - Adding a migration to rename the enum values — the DB is already on the correct form; only the reader was wrong.
      - Refactoring `findBefore()` to accept a stricter parameter type — structural change beyond scope.

    - **Risks**:
      - **Other consumers of `special_type`**: verified via grep — the only frontend reader is `getLastRegularGameweekBeforeSpecial()`. No page component or service directly reads `special_type` off a gameweek row. If a future grep surfaces a second reader, this task expands by one file; flag immediately rather than silently adding to scope.
      - **Spec-title update is cosmetic**: line 732's describe string contains `boxing_day` / `final_day`. Leaving it would be grep-confusing six months from now; updating it is a pure text change with no behavioural impact.
      - **"Never modify passing specs" tension**: the 6 fixture updates technically modify a passing spec. Justified because the current pass is a false positive (bug ↔ bug symmetry); the fix restores the spec's intended semantics (simulate the real DB row shape). Flag this in the commit message so a reviewer can sanity-check.

  - [x] **4.2.8 Test stability — fake timers around countdown specs** (Size: S)
    - **Description**: Prevent `CountdownTimerComponent` `setInterval` tickers from leaking onto the real clock between tests and causing state-dependent flakes. Three orthogonal deliverables: (1) wrap the 3.1.4 lock-UI describe block in `matches.page.spec.ts` with `jest.useFakeTimers()` / `jest.useRealTimers()`; (2) tighten the `countdown-timer.component.spec.ts` destroy-cleanup test with a baseline-to-post-destroy delta assertion; (3) add inline comments in `matches.page.ts` pinning `CountdownTimerComponent.deadlinePassed` as the runtime source of truth for the `isLocked` transition so future readers do not add a second deadline-check that desyncs.
    - **Depends on**: 3.1.4 (the specs being stabilized), 4.2.7 (last active batch; 4.2.8 is the batch-closer)

    - **Pre-verified scope (from codebase scan, 2026-04-22)**:
      - **3.1.4 describe block location**: `frontend/src/app/platforms/player/pages/matches/matches.page.spec.ts:1113-1314` (title: `"MatchesPage (Task 3.1.4 — locked-state UI)"`). 8 `it` blocks.
      - **3.1.4 existing fake-timer usage**: NONE. The block pins `Date.now()` at `matches.page.spec.ts:1167` via `jest.spyOn(Date, 'now').mockReturnValue(NOW)`, but does NOT call `jest.useFakeTimers()`. No conflict with adding fake timers — the `Date.now()` spy and `jest.useFakeTimers({ now: NOW })` (or separate `jest.setSystemTime(NOW)`) compose cleanly since Jest's modern fake timers share the Date/timer patching surface and `mockReturnValue` on `Date.now` takes precedence over the fake-timer system time when both are set.
      - **3.1.4 microtask/promise awaits that could stall under fake timers**: one site — `matches.page.spec.ts:1290` (`await fixture.whenStable()` inside the "disables score inputs" test). `whenStable()` resolves against the microtask queue, NOT `setTimeout`, so fake timers do NOT block it. Verified by reading the Angular testing source model: `whenStable()` hooks `NgZone.onStable`, which fires when the microtask queue drains. No `jest.runAllTimers()` shim required. `await component.ngOnInit()` in every test similarly awaits microtasks, not timers.
      - **Other describe blocks that mount `<app-countdown-timer>` in `matches.page.spec.ts`**: only Task 4.2.4.1 (L3067-3262) calls `fixture.detectChanges()` broadly. Its one "loading spinner" test (L3240-3261) renders the full template including `<app-countdown-timer>` — but with `currentGameweek.deadline = ''` (default) which fast-paths `isPassed=true` and NEVER schedules an interval (guard at `countdown-timer.component.ts:69` requires `this.deadline && !this.isPassed`). No interval leak possible. **Scope decision: stick to 3.1.4 per the plan's wording — do NOT expand to 4.2.4.1 or 3.1.3/3.1.2 (neither mounts the timer; 3.1.3 only calls `ngOnInit` without `detectChanges` in 9/11 specs).**
      - **Destroy-test current assertion**: `countdown-timer.component.spec.ts:153` — `expect(clearSpy).toHaveBeenCalled();`. Spuriously passing mode: `clearInterval` is ALSO called inside `tick()` via `stopTicker()` at `countdown-timer.component.ts:93` whenever the deadline passes. The current test sets a 60s-future deadline (line 141) and destroys before advancing, so today the only `clearInterval` call comes from `ngOnDestroy` → `stopTicker()`. But any future refactor that triggers an internal `stopTicker()` during the test's arrange phase (e.g. a new lifecycle hook, an input-change reset, or a defensive stop in `restart()`) would keep the assertion green even if `ngOnDestroy` silently stopped cleaning up. **Tightened form**: snapshot `clearSpy.mock.calls.length` immediately before `fixture.destroy()`, assert the post-destroy count is strictly greater by exactly 1.
      - **Contract surface for comment (3)**: `onDeadlinePassed()` at `matches.page.ts:1446-1448` directly sets `this.isLocked = true`. The `isLocked` field docblock at `matches.page.ts:805-812` already mentions both `setGameweekMeta` and `onDeadlinePassed` but does NOT name `CountdownTimerComponent.deadlinePassed` as the event source. The page template at `matches.page.ts:166-169` binds `(deadlinePassed)="onDeadlinePassed()"`. Comment should live inside the `onDeadlinePassed` body (runtime source-of-truth callout) with a cross-reference added to the `isLocked` field docblock.
      - **4.2.6 precedent for file-scope timer overrides**: `auth.guard.spec.ts:14` uses `jest.setTimeout(10000)` (test budget, not fake timers). Different mechanism (one-shot timeout vs recurring interval), compatible philosophy (surgical, file-scoped). Consistency is preserved because both tasks chose the narrowest override that covers their failure mode.

    - **Files**:
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.spec.ts`:
        - Inside the 3.1.4 describe block (L1113-1314), add `jest.useFakeTimers()` as the FIRST statement of the existing `beforeEach` (L1148-1180), BEFORE `createMockRouter()` (L1149) — keeping the existing `jest.spyOn(Date, 'now').mockReturnValue(NOW)` line untouched. Add `jest.useRealTimers();` to the existing `afterEach` (L1182-1185) as the LAST statement, AFTER `jest.restoreAllMocks()` (L1184). Scope the wrap narrowly — do NOT touch any other describe block, do NOT pull the fake-timer wrap up to a file-scope hook.
        - No `it`-body changes. No assertion edits.
      - Modify `frontend/src/app/shared/components/countdown-timer/countdown-timer.component.spec.ts`:
        - Rewrite the destroy-cleanup test at L139-161 (title `"should clean up the interval on destroy so no more ticks fire"`). Snapshot the `clearInterval` call count immediately before `fixture.destroy()`, then assert post-destroy count is `clearCallsBefore + 1`. Keep the existing "no emit after destroy" + "text-before-destroy was non-empty" assertions — they already lock in adjacent behaviour.
      - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts`:
        - Inside `onDeadlinePassed` body (L1446-1448), add a multi-line comment block above `this.isLocked = true;` stating: `CountdownTimerComponent.deadlinePassed` is the runtime source of truth for `isLocked` mid-session; `setGameweekMeta` seeds `isLocked` on init/nav from the deadline string, and the timer event flips it once the countdown crosses zero. Future readers: do NOT add a second deadline-check (e.g. a `setInterval` at page scope, or a `(ngModelChange)` recompute) — it will desync from the timer.
        - Extend the `isLocked` field docblock at L805-812 with a one-line cross-reference: the `deadlinePassed` emission from `<app-countdown-timer>` is the ONLY runtime lock transition after init.

    - **Acceptance criteria**:
      1. 3.1.4 describe block's `beforeEach` calls `jest.useFakeTimers()` and its `afterEach` calls `jest.useRealTimers()`. No fake-timer calls are added outside this describe block.
      2. `countdown-timer.component.spec.ts` destroy test captures `clearInterval` call count before `fixture.destroy()` (baseline) and asserts post-destroy count equals `baseline + 1`. The existing "no emit after destroy" assertion remains intact.
      3. Inline comment present at `matches.page.ts onDeadlinePassed()` body naming `CountdownTimerComponent.deadlinePassed` as the runtime source of truth and warning against a second deadline-check. One-line cross-reference added to the `isLocked` field docblock.
      4. **Full test suite passes**: `cd frontend && npm test` — zero new failures, zero existing-spec assertion edits, zero `it`-body changes beyond the destroy-test tightening.
      5. **Interval-leak probe**: after the 3.1.4 wrap, `jest.getTimerCount()` === 0 immediately before the `jest.useRealTimers()` call in `afterEach` (enforced implicitly by the fact that a wrapped `afterEach` will surface any stuck timer as a hang — acceptance is "suite completes without hang" rather than an explicit `expect(getTimerCount()).toBe(0)` assertion, since the 3.1.4 block's existing cleanup structure does not lend itself to per-test probes without churn).
      6. **Red-proof for the destroy-test tighten**: temporarily commenting out `clearInterval(this.intervalId)` at `countdown-timer.component.ts:133` and re-running `countdown-timer.component.spec.ts` produces a failing assertion on the new `baseline + 1` check. Restoring the line returns the test to green. (Do this as a local pre-commit sanity probe; do not commit either of those mutations.)
      7. Production build (`cd frontend && npm run build:prod`) completes with zero errors — acceptance extends to the doc-comment changes since `.ts` source edits touch `matches.page.ts`.

    - **Test plan (Red phase)**:
      - **(a) Destroy-test tighten** — the tightened assertion (`expect(clearSpy).toHaveBeenCalledTimes(clearCallsBefore + 1)`) will PASS against the current implementation because `ngOnDestroy` → `stopTicker()` → `clearInterval()` fires exactly once during `fixture.destroy()` when the ticker is live. To prove the test's Red-ability: locally comment out `clearInterval(this.intervalId)` at `countdown-timer.component.ts:133`, run the spec — the assertion flips red (`baseline + 0 !== baseline + 1`). Restore the line — back to green. This is the Red-sanity probe; it does NOT get committed. The test itself is green on the first run post-change.
      - **(b) 3.1.4 fake-timer wrap** — the goal is probabilistic ("no flake"). The single deterministic signal is: **the suite completes without hang**. Since fake timers queue `setInterval` callbacks without the real wall clock advancing, any leaked interval from a previous test that wasn't torn down would pile up silently but NOT cause hangs (fake timers don't block test teardown the way real timers can block Node process exit). The real value of the wrap is defence-in-depth: should the component ever regress to skipping `stopTicker()` on destroy, the leaked interval would be contained within the fake-timer sandbox and drained by `jest.useRealTimers()` in `afterEach`. **Acceptance signal**: all 8 specs in the 3.1.4 block pass identically both in isolation (`npm test -- --testNamePattern="Task 3.1.4"`) and as part of the full suite. If the "tick every second" test (which we did NOT modify — it lives in `countdown-timer.component.spec.ts`, not `matches.page.spec.ts`) ever flakes post-change, something is wrong with the wrap.
      - **(c) Comment-only edit in `matches.page.ts`** — no Red phase. Doc-only change. Acceptance is `npm run build:prod` passing (no accidental syntax error in the comment block).

    - **Implementation order** (strict; each step must leave the suite Green before proceeding):
      1. **Doc comments in `matches.page.ts`** — lowest-risk, no test impact, no dependency. Add the `onDeadlinePassed` body comment + the `isLocked` field docblock cross-reference. Run `cd frontend && npm run build:prod` once as a syntax check.
      2. **Destroy-test tighten in `countdown-timer.component.spec.ts`** — self-contained; no other file touched. Run `npm test -- countdown-timer.component.spec.ts`. Must pass. THEN run the Red-sanity probe described in test plan (a) — confirm red when `clearInterval` is commented out, restore, confirm green. Do NOT commit the probe.
      3. **3.1.4 fake-timer wrap in `matches.page.spec.ts`** — the riskiest step because fake timers can interact with `await fixture.whenStable()` (verified safe above, but watch for surprises). Run `npm test -- matches.page.spec.ts` in isolation. All 3.1.4 specs must pass. THEN run the full suite: `npm test`. All 400+ specs must pass. If any non-3.1.4 spec regresses, the wrap is leaking — narrow it from the describe-level `beforeEach`/`afterEach` down to individual `it` blocks.
      4. **Final gate**: `npm test` + `npm run build:prod` both green. Commit.

    - **Non-goals (out of scope for this slice — do NOT scope-creep into these)**:
      - NOT wrapping every describe block in `matches.page.spec.ts` with fake timers. Only 3.1.4 mounts `<app-countdown-timer>` with a future deadline that schedules a live interval; other blocks either don't mount it or mount it in a degenerate (deadline='') state.
      - NOT refactoring `CountdownTimerComponent` itself (e.g. switching from `setInterval` to `rxjs timer().pipe(takeUntil(destroy$))`). That would be a larger slice — the destroy-test acceptance (see Risks) assumes the current `setInterval` / `clearInterval` contract and would need adjustment if the mechanism changes. Queued in 4.3 "Architecture / refactors" if surfaced.
      - NOT introducing a new DOM-mocking library (`jsdom-fake-timers`, `@sinonjs/fake-timers` directly). Jest's modern fake timers suffice.
      - NOT adding an `(ngOnDestroy)` / lifecycle hook to `MatchesPage` just to null out the countdown component reference. The page's existing lifecycle is sufficient; the fix lives in the spec + the doc comments.
      - NOT expanding the `isLocked` comment into a full ADR or design doc. One inline comment + one docblock line is the bar.

    - **Risks**:
      - **Fake-timer wrap on 3.1.4 could hang specs that await Promises/microtasks** — verified above that `fixture.whenStable()` and `await component.ngOnInit()` resolve against the microtask queue, not `setTimeout`, so fake timers do NOT stall them. Jest's modern fake timers ONLY fake `setTimeout` / `setInterval` / `setImmediate` / `Date` — they do NOT touch `Promise.resolve` or `queueMicrotask`. **Mitigation**: if a future spec added to the 3.1.4 block uses `setTimeout` inside the test body (e.g. a debounced input check), that spec must call `jest.runAllTimers()` before its awaits. Flag in the spec file with a top-of-block comment: "fake timers active — any `setTimeout` inside a test must advance explicitly".
      - **Destroy-test tighten is mechanism-coupled** — the assertion `expect(clearSpy).toHaveBeenCalledTimes(baseline + 1)` is valid if and only if the component uses `setInterval` + `clearInterval`. If a future refactor switches to `rxjs timer().pipe(takeUntil(destroy$))`, the spy-based test becomes dead (subject.complete() doesn't call clearInterval). **This is acceptable** because the test's documented intent is "asserts the current contract; flags a breakage if the contract changes". A mechanism migration would legitimately need a spec rewrite. Flag this tension in the test's JSDoc so the next maintainer reads the intent before deleting.
      - **"Never modify passing specs" rule tension** — the destroy-test rewrite IS a modification of a passing spec. Justified: the test's observable behaviour (clean up on destroy) is preserved; only the assertion strength changes. The new assertion is strictly stronger than the old one (any green for the old must also be green for the new, given the current implementation — but not vice-versa). Flag in commit message.
      - **The 3.1.4 wrap's value is probabilistic** — see test plan (b). No single deterministic assertion proves "no flake ever". The suite-completes-without-hang signal is the practical bar. Accept that this task's value shows up months from now when a future refactor to `CountdownTimerComponent` would have caused a flake cascade; today it's preventive.
      - **Doc-comment drift** — the inline comment pinning `deadlinePassed` as source of truth will rot if someone refactors `onDeadlinePassed` into a derived getter or moves the `isLocked` flip elsewhere. Mitigation: the cross-reference in the `isLocked` field docblock doubles as a second tripwire; a grep for `deadlinePassed` surfaces both.

  - [x] **4.2.9 Remove phantom prize-pool UI** (Size: XS)
    - **Description**: Migration 004 stripped all entry-fee / prize-money columns from the `groups` table ("Prediction groups - simplified, no prize money", `frontend/supabase/migrations/004_groups_table.sql:32`) and the terms page already states Predict3 is a prediction-only platform (`frontend/src/app/platforms/auth/pages/terms/terms.page.html:118`). Three frontend UI sites still reference prize pools / entry fees and read `undefined` off real Supabase `groups` rows — the group-admin dashboard silently renders a `£0` "Prize Pool" card and the welcome landing page advertises "Prize Pools" as a feature, contradicting positioning. Pure mechanical deletion; no new tests.
    - **Depends on**: None (orthogonal cleanup)
    - **Files**:
      - Modify `frontend/src/app/platforms/welcome/welcome.page.ts`: remove the `{ icon: 'cash-outline', title: 'Prize Pools', description: 'Optional entry fees and prize distributions' }` object from the `features` array (L81-85); also drop the now-dead `cashOutline` import (L27) and its entry in `addIcons({...})` (L99) — verified sole usage.
      - Modify `frontend/src/app/platforms/group-admin/pages/dashboard/dashboard.page.ts`: remove `prizePool: number;` + `paidMembers: number;` from the `GroupStats` interface (L80-81); remove `prizePool: 0,` + `paidMembers: 0,` from the `groupStats` init (L194-195); remove the `let prizePool = 0; let paidMembers = 0;` declarations, the dead `if (group.type === 'prize') { ... }` branch (L288-291 — `group.type` / `group.entryFee` don't exist on real Supabase rows), and the `prizePool,` / `paidMembers,` emissions in the returned object inside `calculateGroupStats` (L278-307); also drop the now-dead `CurrencyPipe` import (L23) and its entry in the component's `imports` array (L171) — verified sole usage was the removed template line.
      - Modify `frontend/src/app/platforms/group-admin/pages/dashboard/dashboard.page.html`: remove the full `<ion-col size="12" size-md="6" size-lg="3">` block containing the "Prize Pool" stat card (L317-330).
    - **Acceptance criteria**:
      1. `grep -rnE "prizePool|entryFee|entry_fee|Prize Pool|paidMembers|type.*'prize'" frontend/src/` returns ZERO hits outside `frontend/src/app/platforms/auth/pages/terms/terms.page.html:118` (the legal disclaimer, which is in scope to preserve unchanged).
      2. `cd frontend && npm test` passes with zero new failures (no `dashboard.page.spec.ts` exists to touch; `welcome.page.spec.ts` has no assertions on the `features` array — verified).
      3. `cd frontend && npm run build:prod` completes with zero TypeScript errors — this is the safety net for any missed consumer of `groupStats.prizePool` / `groupStats.paidMembers`.
      4. Group-admin dashboard renders without the Prize Pool stat card; welcome page "Why Predict3" features section no longer advertises Prize Pools.
    - **Test plan**: Zero new tests — mechanical deletion. No existing passing spec asserts on the removed surface (verified: no `dashboard.page.spec.ts`; `welcome.page.spec.ts` has no `features` assertions). The TS compile (`npm run build:prod`) is the correctness gate.
    - **Non-goals**:
      - NOT touching `frontend/src/app/platforms/auth/pages/terms/terms.page.html:118` — the legal disclaimer is correct as-is and must stay untouched.
      - NOT modifying migration 004 — the DB already has no fee/prize columns; this task only syncs the UI.
      - NOT adding an off-platform prize tracker, entry-fee capture field, or "prizes handled elsewhere" UI affordance — the terms page copy is sufficient for MVP.
      - NOT fixing the pre-existing dead `CurrencyPipe` import in `group-admin/pages/members/members.page.ts` (surfaced during this audit) — unrelated housekeeping, queue in 4.3.
      - NOT introducing a typed `GroupStats` cleanup beyond removing the two offending fields.
    - **Risks**:
      - **Silent consumer miss**: if any other component (spec, service, template) reads `groupStats.prizePool` / `groupStats.paidMembers` off the removed interface fields, TS compile catches it. `npm run build:prod` is the safety net — a successful compile proves no hidden reader remains.

  - [x] **4.2.10 Purge debug + dead auth surface** (Size: XS)
    - **Description**: `/debug-auth` is routed at `frontend/src/app/app.routes.ts:6-9` with zero guards and publicly reachable — it exposes the current user/session, a prefilled test email, and buttons for Emergency Reset / Clear Auth Locks / Test Login. Launch-blocker: must be gone before real users hit the app. Deletes 3 orphan files (debug page, `FirstLoginFixer` utility, superseded `SuperAdminAuthService`) and removes the route + import.
    - **Depends on**: None (orthogonal cleanup)
    - **Files**:
      - Delete `frontend/src/app/debug-auth.page.ts` (sole consumer is the route block being removed)
      - Delete `frontend/src/app/debug-fix-first-login.ts` (class `FirstLoginFixer` — zero consumers verified)
      - Delete `frontend/src/app/core/services/super-admin-auth.service.ts` (class `SuperAdminAuthService` — superseded by Task 4.0.2 unified super-admin login; zero consumers verified)
      - Modify `frontend/src/app/app.routes.ts`: remove `import { DebugAuthPage } from './debug-auth.page';` (L3) and the `{ path: 'debug-auth', component: DebugAuthPage }` block (L6-9)
    - **Acceptance criteria**:
      1. `grep -rnE "DebugAuthPage\|debug-auth\|FirstLoginFixer\|fixAllUsersFirstLoginStatus\|SuperAdminAuthService\|super-admin-auth\.service" frontend/src/` returns ZERO hits.
      2. `cd frontend && npm test` passes — no existing `.spec.ts` imports any deleted file (pre-verify via grep before deletion).
      3. `cd frontend && npm run build:prod` completes with zero TypeScript errors.
      4. Navigating to `/debug-auth` in the running app hits the `**` catch-all at `app.routes.ts:52-55`, which redirects to `/auth/login`.
    - **Test plan**: Zero new tests. Pre-delete grep sweep for each symbol across `frontend/src/**/*.spec.ts` — if any spec imports a to-be-deleted file, Jest will fail; verify clean grep before deletion.
    - **Non-goals**:
      - NOT touching `supabase/archive/*.sql` — archive cleanup queued to 4.3.
      - NOT fixing the pre-existing dead `CurrencyPipe` import at `group-admin/pages/members/members.page.ts:33` — unrelated housekeeping already queued (surfaced in 4.2.9 audit).
      - NOT addressing `MockDataService` in group-admin/predictions — that is Task 4.2.11's scope.
      - NOT updating `docs/`, `README*`, `SETUP_GUIDE*`, or `CLAUDE.md` references to `/debug-auth` if any — not a deletion blocker; fold into 4.3 doc-hygiene if surfaced.
    - **Risks**:
      - **Spec import of deleted file**: if any `.spec.ts` imports `debug-auth.page`, `debug-fix-first-login`, or `super-admin-auth.service`, Jest fails on the next run. Pre-delete grep sweep is mandatory — zero spec hits is the go/no-go gate.

- [ ] **4.3 Post-launch polish** (Size: L)
  - **Description**: Maintainability, typing, performance, edge-case, and cleanup items accumulated during MVP development. Intentionally deferred from 4.2 because each works correctly today and MVP shipping is gated on real-user feedback, not these. Triage after launch based on what actually bites.
  - **Depends on**: 4.2 (MVP live)
  - **Note**: No sub-task decomposition yet — triage after launch. Items are grouped by theme below.

  - **Architecture / refactors** (bloat, not bug — all work today):
    - Extract `AdminService` from `SupabaseDataService` (currently 670 LOC mixing player + admin concerns)
    - Extract shared `PredictionVisibilityService.load(groupId, gameweek)` to collapse duplicated `loadVisibilityAndPredictions` between player group-standings + group-admin predictions pages
    - Refactor `matches.page.ts applyGameweekMeta` so `setGameweekMeta` takes gameweek number explicitly (current pre-assign workaround is functional, just a coupling smell)

  - **Typed interfaces** (functional, no compile-time safety):
    - Typed `PredictionWithMatch` interface to replace `toViewModel(row: any)` in `predictions.page.ts` (security scanner LOW finding — no compile-time guard against schema rename)
    - Typed `GroupPrediction { username?: string; gameweek_number: number; home_score: number; away_score: number }` replacing `groupPredictions: any[]` on group-standings + group-admin predictions pages

  - **Pagination** (works at MVP scale, ceiling not hit):
    - Proper `.range(offset, offset + pageSize - 1)` + paging/infinite-scroll on `getAllUsers` / `getAllGroups` (currently capped at `.limit(500)`; MVP scale nowhere near the cap)
    - Replace 1..(current-1) history iteration in `predictions.page.ts` with single query deriving `historicalGameweeks = uniq(rows.map(r => r.gameweek_number))` — optimisation, not correctness

  - **Joker edge cases** (low-frequency, no data corruption):
    - Auto-assign + `markJokerUsed` failure compensating path (currently "Contact support" toast + comment covers it)
    - `getJokerUsage` drift `console.warn` when `first_joker_gameweek` / `second_joker_gameweek` differ across rows (back-end sync smell)
    - Widen `applyJokerAutoAssign` final-day check from `=== 1` to `< 2` (defensive; current strict check works for happy path)
    - Joker deadline warning copy: distinct message for exact-deadline case (current copy is correct, just reads slightly oddly)
    - Doc-comment on `markJokerUsed` re: RLS `group_members` update-self policy (behavior correct; just missing an inline security contract note)
    - Cross-user `markJokerUsed` authorization integration test (RLS already enforces; belt-and-braces)

  - **Admin UX nitpicks** (single-group MVP norm):
    - `AuthGuard redirectToLogin` drops `returnUrl` query param when guard is attached at parent route (`route.url === []` at guard-fire time → `attemptedUrl === '/'` → gate skips queryParams attach). Surfaced while writing 4.2.6 E2E tests. Irrelevant for super-admin (single user = app owner). Only affects real-user mid-session expiry on `/player/**` and `/group-admin/**` — cosmetic (land on default dashboard, one extra click to resume). Fix: switch `canActivate(route)` to `canActivate(route, state: RouterStateSnapshot)` and use `state.url`. 2 lines + test update.
    - Admin multi-group handling: `group-admin/pages/predictions/predictions.page.ts resolveAdminGroupId` picks `adminGroups[0]` silently — respect a route/selector param or document the single-group assumption
    - Dashboard client countdown (30s) vs server cooldown (300s) alignment (cosmetic; second click correctly hits 429)
    - `group-admin/pages/predictions/predictions.page.ts:197-200`: `await` or `void`-prefix the fire-and-forget `loadGameweekPredictions` (sync-in-disguise)
    - Template consistency: `&mdash;` in `group-admin/pages/predictions/predictions.page.html:126` vs literal `—` in `group-standings.page.html:45`

  - **Dead code / test hygiene**:
    - Remove dead `showNewPredictionsToast` field + toast markup in `predictions.page.ts/.html` (rewrite dropped the setter)
    - Remove `scoring.service.spec.ts` "removed legacy methods" block (low-signal once method names forgotten)
    - Remove `sync_metadata 'in_progress'` enum value if the atomic cooldown claim in 4.2.5 doesn't wire it
    - Add `010_scoring_trigger_test.sql` Test 6 comment noting User2 GW1 drift is intentionally not asserted (prevents surprise)

  - **Docker / infra polish (from Task 4.2 Batch 1 review)**:
    - Trim `frontend/.dockerignore` further: add `supabase`, `playwright-report`, `test-results`, `e2e`, `*.spec.ts`, `jest.config.*`, `deno.lock`, `.envrc*`, `docs`, `README*.md`, `*.md` — reduces build context size and layer invalidation surface
    - Pin Dockerfile base images by digest (`FROM node:20-alpine@sha256:...`, `FROM nginx:alpine@sha256:...`) for reproducible prod artefacts and supply-chain hygiene
    - Harden `scripts/smoke-test-prod.sh` main-bundle regex: replace `main\.[a-z0-9]+\.js` with a parser that extracts any `<script src="...js">` — current form could silently break on future Angular/Ionic bundle naming changes
    - Add `text/html`, `application/wasm`, `font/woff2` to nginx `gzip_types` in `frontend/nginx.conf` for completeness (text/html is implicit but explicit prevents confusion)
    - Drop `container_name: sotd-app-prod` from `docker-compose.yml` prod service if we ever need parallel deploys (blue/green)
    - `SUPABASE_COMPLETE_SETUP.md`: delete the stale `developmentConfig` snippet block (lines ~45-53) — doc now points at the live file so the placeholder snippet is misleading
    - Consider `frontend/nginx.conf` server-level security headers (CSP, X-Frame-Options) — nginx `add_header` does NOT inherit once a nested `add_header` is set, so plan the layout before adding
    - Run nginx as a non-root user: switch `frontend/Dockerfile` stage 2 from `nginx:alpine` to `nginxinc/nginx-unprivileged:alpine`, OR add explicit `USER nginx` after adjusting `/var/cache/nginx` and pid file permissions (MEDIUM security finding from Batch 1 scan — defense-in-depth; low exploitability today)
    - Validate `BASE_URL` env var in `scripts/smoke-test-prod.sh` with a regex check near the top (`[[ "$BASE_URL" =~ ^https?://[A-Za-z0-9.:/_-]+$ ]] \|\| exit 1`) to prevent shell-metachar mishaps — local-only script so current risk is nil, cosmetic hardening
    - Add `Content-Security-Policy` to `frontend/nginx.conf`. Ship as `Content-Security-Policy-Report-Only` first to catch violations without breaking Angular/Ionic runtime (they need `style-src 'unsafe-inline'`). Allowlist must cover Supabase REST/realtime (`*.supabase.co`, `wss://*.supabase.co`) and Google OAuth origins (`accounts.google.com`). Validate via live browser session before switching to enforcing mode
    - Verify the paused Supabase project `lmybyfrhzarxmantttki` is fully deleted (not just unused). Historical git commits still contain its anon JWT; if the project is deleted the key is dead-letter, if it's just paused the key is dormant and discoverable via `git log -p`. Ops task, not code

  - **Error handling polish (from Task 4.2 Batch 2 review)**:
    - `matches.page.ts`: async `ngOnInit` is not awaited before `ionViewWillEnter` fires. On first mount, the view-enter hook can call `hydrateSavedPredictions(1)` (default gameweek number) against an empty `this.matches`, triggering a wasted `getPredictions(1)` round-trip and potentially flipping `jokerUsedThisGameweek` from wrong-gameweek data. Fix: either gate `hydrateSavedPredictions` on a shared `initPromise` from `ngOnInit`, or skip the hydrate when `this.matches.length === 0`
    - Wrap the 4 plain `throw new Error` sites in `SupabaseDataService` (`getCurrentUserId` 'Not authenticated', `leaveGroup` admin-self-leave guard + non-member guard, `getGroupPredictions` pre-deadline guard) in a new `DomainError` class (parallel to `SupabaseError`) so callers can render their specific copy via `err.userMessage` instead of falling through to the generic "Something went wrong" toast. Currently those useful messages never reach users
    - Add a `DEFAULT_USER_ERROR_COPY` constant and make every page's toast-on-error use `err.userMessage ?? DEFAULT_USER_ERROR_COPY` so sanitized copy always wins. Right now different pages use "Unable to load matches. Please try again.", "Something went wrong", "Failed to load users and groups" etc. inconsistently
    - Defensive `?? 0` on nullable `home_score` / `away_score` in `matches.page.ts` hydrate + `buildPredictionRows` and `predictions.page.ts` `toViewModel` silently masks data corruption. Add a `logger.warn('hydrate.nullScore', { matchId })` before each coercion so bad data is visible in dev
    - `SupabaseError.extractRawMessage` uses `'message' in raw` which can throw on frozen/primitive wrappers with unusual prototype chains. Switch to `typeof (raw as any).message` for defensiveness
    - `LoggerService.error` in prod currently prints `"[context] An error occurred"` for non-SupabaseError instances. Including `err.name` (e.g. `TypeError`, `RangeError`) would help ops distinguish error classes without leaking the raw message
    - `SupabaseDataService` dashboard path surfaces a raw `lastSyncError: string | null` field. The dashboard doesn't render it today (just the status badge), but the shape invites a future UI accident. Either drop the field from the page view model or transform to a user-safe summary in the service
    - 2 pre-existing `console.log` statements with emoji markers in `group-admin/groups.page.ts` (~lines 198, 201) — harmless but inconsistent with the Batch 2 LoggerService routing. Route through `logger.warn` or remove
    - **Stuck sync surfacing** — if a `sync-matches` run crashes between `claim_sync_slot` (migration 013) and `recordSyncOutcome`, the 5-min cooldown is the recovery path but the dashboard shows a confusing 429. Detect `lastSyncStatus === 'in_progress'` AND elapsed time > ~4 min on the dashboard and render a "sync appears stuck — will auto-retry at <time>" hint instead of a silent cooldown
    - **Harden `is_super_admin()` search_path** (migration 001:45-51): the function is `SECURITY DEFINER` but lacks `SET search_path = public, pg_temp`. A search_path hijack via `pg_temp.profiles` could theoretically shadow the `public.profiles` lookup. Pre-existing, but Task 4.2.5's audit tables now depend on this helper for confidentiality, expanding the blast radius. Ship as a small migration that adds the search_path setting to the existing function definition

---

### Phase 5: Native Apps (Deferred — post-MVP)

> **Status:** Deferred. Ship web MVP first (Phase 4.2), validate with 10–50 real users, then package native. The web version proves the product; native is packaging, not feature work.

Ionic + Capacitor is already in the stack, so the same codebase ships to Android, iOS, and desktop without a rewrite.

- [ ] **5.1 Capacitor native readiness** (Size: M)
  - **Description**: Add Capacitor platforms (Android, iOS) and wire the native-specific flows that differ from web.
  - **Depends on**: 4.2 (production web build must be stable first)
  - **Files**:
    - `frontend/capacitor.config.ts` (app id, URL scheme)
    - `frontend/android/` (generated via `npx cap add android`)
    - `frontend/ios/` (generated via `npx cap add ios`)
    - Modify `frontend/src/app/core/services/deep-link.service.ts` (custom URL scheme: `predict3://`)
    - Modify `frontend/src/app/core/services/auth.service.ts` (native Google sign-in via `@codetrix-studio/capacitor-google-auth`)
  - **Acceptance criteria**:
    - App builds and runs in Android emulator and iOS simulator
    - Deep links work for email confirmation and OAuth callbacks (both `https://` and `predict3://`)
    - Native Google sign-in works on Android and iOS
    - Supabase OAuth redirect URIs include native schemes

- [ ] **5.2 Android Play Store release** (Size: M)
  - **Description**: Package and submit Android app to Google Play.
  - **Depends on**: 5.1
  - **Requirements**:
    - Google Play Console account ($25 one-time)
    - App icons, splash screens, screenshots (Play Store assets)
    - Privacy policy URL (requires custom domain)
    - Signed release APK/AAB
  - **Acceptance criteria**:
    - Signed AAB uploaded to Play Console
    - Store listing complete (title, description, screenshots, icon)
    - Passes Play Store review
    - Live on Google Play

- [ ] **5.3 iOS App Store release** (Size: L)
  - **Description**: Package and submit iOS app to App Store. Needs a Mac with Xcode.
  - **Depends on**: 5.1
  - **Requirements**:
    - Apple Developer account ($99/year)
    - Mac with latest Xcode
    - App icons, splash screens, screenshots (App Store assets)
    - Privacy policy URL
    - TestFlight for beta testing
  - **Acceptance criteria**:
    - Archive built and uploaded via Xcode
    - TestFlight beta tested
    - Store listing complete
    - Passes App Store review
    - Live on App Store

- [ ] **5.4 Desktop app (optional)** (Size: M)
  - **Description**: Wrap the web app in Electron or Tauri for Windows/macOS/Linux desktop distribution.
  - **Depends on**: 4.2
  - **Recommendation**: Tauri (smaller bundle, better performance than Electron)
  - **Acceptance criteria**:
    - Desktop builds for Windows, macOS, Linux
    - Auto-updater configured
    - Installer signed for each OS

- [ ] **5.5 Push notifications** (Size: M)
  - **Description**: Add native push notifications for deadline reminders ("Gameweek deadline in 1 hour") and result updates.
  - **Depends on**: 5.1
  - **Files**:
    - Add `@capacitor/push-notifications`
    - Firebase Cloud Messaging (FCM) for Android
    - APNs for iOS
    - Supabase Edge Function to trigger notifications on schedule
  - **Acceptance criteria**:
    - Users opt in on first launch
    - Deadline reminders fire 1 hour before gameweek deadline
    - Result notifications after match completion

---

## Dependency Graph

```
0.1 (Dev Docker) -- no dependencies, do first
  |
1.1 (Data Service Layer)
  |
  +-- 1.2 (Auth/Profiles) --+
  |                          |
  +-- 2.1 (Match Data API)   +-- 1.3 (Groups to Supabase) -- 1.4 (Leave Group)
  |                          |
  +-- 2.2 (Matches Page) ----+
       |
       +-- 3.1 (Deadline Enforcement)
       |    |
       +----+-- 3.2 (Predictions to Supabase)
                 |
                 +-- 3.3 (Prediction Visibility)
                 |
                 +-- 3.4 (Joker System)
                 |
                 +-- 4.0 (Super Admin Simplification)
                 |
                 +-- 4.1 (Auto Scoring)
                      |
                      +-- 4.2 (Production Readiness)
                           |
                           +-- 5.1 (Capacitor native) -- 5.2/5.3 (App stores), 5.5 (Push)
                           |
                           +-- 5.4 (Desktop — optional)
```

## Recommended Implementation Order

1. **0.1** -- Dockerise dev environment (get the app running first) ✅
2. **1.1** -- Data service layer (everything depends on this)
3. **1.2** -- Auth/profiles wiring (needed for RLS to work)
4. **1.5** -- Auth enhancements: Resend emails + Google sign-in
5. **2.1** -- Match data integration (can run in parallel with 1.3)
6. **1.3** -- Groups to Supabase
7. **1.4** -- Player leave group
8. **2.2** -- Matches page wiring
9. **3.1** -- Deadline enforcement
10. **3.2** -- Predictions to Supabase
11. **3.3** -- Prediction visibility
12. **3.4** -- Joker system
13. **4.0** -- Super admin simplification
14. **4.1** -- Auto point calculation
15. **4.2** -- Production readiness
16. **5.1–5.5** -- Native apps (deferred until after MVP launch + user validation)

## Risks

- **Football data API access**: Free tiers may have strict rate limits or require approval. Fallback: manual match entry through super admin dashboard (UI already exists).
- **Supabase RLS complexity**: Recursive policies (e.g., checking group membership to view predictions) can cause performance issues. Monitor query performance.
- **Scoring function discrepancy**: The SQL `calculate_prediction_points` function awards 1pt for correct result and 3pts for correct score. The frontend `ScoringService` awards 3/4/6pts for home/away/draw correct result plus 3pts for exact score. These need to be reconciled -- the SQL function should be the source of truth.
- **Season dates**: `SeasonService` currently has hardcoded 2024-25 dates. Must be updated to use Supabase gameweek data.

## Resolved Decisions

1. **Football data API**: **football-data.org** (free tier, 10 req/min). Sufficient for MVP — fixtures + results is all we need.
2. **Joker auto-assignment**: Jokers CANNOT be played on Boxing Day or Final Day (10-match special rounds). The spend-by deadline for each joker is the LAST REGULAR gameweek before the corresponding special round:
   - 1st joker: last regular GW before Boxing Day
   - 2nd joker: last regular GW before Final Day
   Auto-assign when the player submits predictions for that last-regular gameweek without using their joker. Show a friendly warning 2-3 gameweeks ahead: "Play your 1st joker by Gameweek X or it will be auto-applied." If they never submit, auto-assign at that gameweek's deadline via a scheduled function.
3. **Scoring model**: Use the **frontend model** (it's the correct one):
   - Correct result: Home win 3pts, Away win 4pts, Draw 6pts
   - Correct score: +3pts per correct score
   - 3 correct scores in a round: +10pts bonus
   - Joker: doubles the entire round's points
   - Boxing Day & Final Day: predict all 10 matches
   - The SQL `calculate_prediction_points` function must be updated to match this.
4. **Predictions are per-player, not per-group**: One set of predictions applies to all groups. DB schema change: `UNIQUE(user_id, match_id)` — remove `group_id` from predictions table. Leaderboards calculated per-group by filtering on group membership.
5. **Super admin access**: No separate registration flow. Owner gets `role = 'super-admin'` set directly in `profiles` table. Normal login, guard routes to super-admin dashboard.
