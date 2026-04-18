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

- [ ] **4.1 Auto Point Calculation** (Size: M)
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

- [ ] **4.2 Production Readiness** (Size: M)
  - **Description**: Add global error handling, loading states on all data-fetching pages, and proper environment configuration for production deployment.
  - **Depends on**: All previous tasks
  - **Files**:
    - Create `Dockerfile` (multi-stage: Node build → Nginx serve, production container)
    - Update `docker-compose.yml` (add production profile/service)
    - Modify `frontend/src/environments/environment.ts` (separate prod Supabase URL/key, remove hardcoded keys)
    - Create `frontend/src/environments/environment.prod.ts` (production config)
    - Modify `frontend/src/app/core/services/supabase-data.service.ts` (consistent error handling, retry logic, tighten `any` return types on `getGameweeks()`/`getActiveGameweek()` → `Gameweek[]`/`Gameweek`)
    - Modify `frontend/src/app/core/services/season.service.ts` (`safeGet*` helpers should `console.warn` on failure — currently silent — so ops can diagnose)
    - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (loading spinner; fix `venue: ''` empty-state — template renders orphaned icon when venue blank; align import paths to use `@core/*` alias consistently)
    - Modify `frontend/src/app/platforms/player/pages/predictions/predictions.page.ts` (loading spinner)
    - Modify `frontend/src/app/platforms/player/pages/groups/groups.page.ts` (loading spinner)
    - Modify `frontend/src/app/platforms/player/pages/standings/standings.page.ts` (loading spinner)
    - Modify `frontend/src/app/platforms/player/pages/group-standings/group-standings.page.ts` (loading spinner)
  - **Acceptance criteria**:
    - Every page that fetches data shows a loading spinner while loading
    - Network errors show a user-friendly toast message (not raw error)
    - Environment files do not contain hardcoded secrets (use env vars for CI/CD)
    - Production build (`ionic build --prod`) succeeds without errors
    - `environment.prod.ts` exists with production Supabase URL
    - No console.log statements left in production code (or guarded by `!environment.production`)
    - `SupabaseDataService` methods return typed interfaces, not `any`
    - `SeasonService` logs warnings when Supabase fetches fail (currently silent defaults)
    - `matches.page` brittle `toString()`-based test in `season.service.spec.ts:91-97` replaced with source-file regex (see `matches.page.spec.ts:157` for the pattern)
    - `onSubmit()` in `matches.page.ts` adds an `isLocked` guard at the top (belt-and-braces — button is already hidden via `canSubmit()`, but direct callers should fail-closed)
    - 3.1.4 lock-UI spec block in `matches.page.spec.ts` wrapped with `jest.useFakeTimers()` / `useRealTimers()` to prevent `CountdownTimerComponent` intervals leaking into the real clock between tests
    - `countdown-timer.component.spec.ts` "clean up interval on destroy" test tightened: snapshot `clearInterval` call count before `fixture.destroy()` and assert it increments after (current assertion passes spuriously if deadline logic changes)
    - Add an inline comment in `matches.page.ts` documenting that `CountdownTimerComponent.deadlinePassed` is the runtime source of truth for the `isLocked` transition (load-time is snapshot only) — prevents future readers from adding a second deadline-check that desyncs
    - `predictions.page.ts`: replace 1..(current-1) history iteration with a single history query that derives `historicalGameweeks = uniq(rows.map(r => r.gameweek_number))` — fewer round-trips and matches the 3.2.4 AC "lists submitted predictions grouped by gameweek"
    - Move `matches.page.ts` `hydrateSavedPredictions` call from `ngOnInit` into `ionViewWillEnter` for cache-aware Ionic routing (nav back from predictions page currently shows stale data if the component is cached)
    - Defensive `?? 0` on potentially-null `home_score` / `away_score` from Supabase in predictions.page and matches.page hydrate path (submitPredictions enforces non-null on write but belt-and-braces for the VM types)
    - Remove the dead `showNewPredictionsToast` field + toast markup in `predictions.page.ts`/`.html` (rewritten loadPredictions no longer sets the flag)
    - Remove the `typeof this.supabaseDataService.getGroups === 'function'` guard in `predictions.page.ts` once legacy pre-3.2.5 test mocks are updated to stub `getGroups` — currently a deliberate workaround per the never-modify-existing-tests rule
    - Tighten `toViewModel(row: any)` in `predictions.page.ts` with a typed `PredictionWithMatch` interface to prevent silent `undefined` flows into the template if a future schema change renames columns (security scanner LOW finding)
    - Admin multi-group handling in `group-admin/pages/predictions/predictions.page.ts`: `resolveAdminGroupId` currently picks `adminGroups[0]` silently. Either respect a route/selector param or surface the single-group assumption on the admin dashboard
    - Add a typed `GroupPrediction { username?: string; gameweek_number: number; home_score: number; away_score: number }` interface and replace `groupPredictions: any[]` on both `group-standings.page.ts` and `group-admin/pages/predictions/predictions.page.ts`
    - Extract shared `PredictionVisibilityService.load(groupId, gameweek): Promise<{ locked: boolean; predictions: GroupPrediction[] }>` and collapse the duplicated `loadVisibilityAndPredictions` methods (MVP kept them duplicated intentionally)
    - `group-admin/pages/predictions/predictions.page.ts:197-200`: make ordering intent explicit — either `await` `loadGameweekPredictions` or `void`-prefix the fire-and-forget call. Currently relies on sync-in-disguise
    - `SupabaseDataService.getGameweekDeadline`: add a `console.warn` when a gameweek row has a null deadline (data-integrity smell in prod, currently silent)
    - Template consistency: `&mdash;` in `group-admin/pages/predictions/predictions.page.html:126` vs literal `—` in `group-standings.page.html:45` — pick one when the templates consolidate
    - Joker auto-assign + `markJokerUsed` failure drift: if auto-assign forces `jokerUsedThisGameweek=true` and the prediction save succeeds but `markJokerUsed` throws, rows carry `joker_used=true` while the DB counter stays old — player effectively gets a 3rd joker. Add a compensating path (clear `joker_used` on saved rows OR reconcile on next page load) and expand the "Contact support" toast message so ops knows what the drift means
    - Joker deadline warning copy: on the deadline GW itself (`current === beforeBoxingDay` / `beforeFinalDay`) the "Play your 1st joker by Gameweek N" copy reads oddly. Add a distinct message for the exact-deadline case: "This is the last gameweek to play your 1st joker — if you don't, it will be auto-applied"
    - `SupabaseDataService.getJokerUsage` drift detection: when `first_joker_gameweek` or `second_joker_gameweek` values differ across a user's group_members rows, log `console.warn` rather than silently returning the first non-null (surfaces back-end sync bugs)
    - Remove the `typeof service.getJokerUsage === 'function'` / `getLastRegularGameweekBeforeSpecial` guards in `matches.page.ts`'s `loadJokerContext` once legacy pre-3.4.2 test mocks are updated to stub these methods — same pattern as the earlier `getGroups` guard
    - Widen the final-day auto-assign check: `applyJokerAutoAssign` uses `jokerUsageUsedCount === 1` exactly; switching to `< 2` avoids silently skipping auto-assign when usedCount has drifted to an unexpected value
    - Add a doc-comment on `markJokerUsed` noting it relies on the `group_members` RLS update-self policy to confine the UPDATE to the caller's rows (the `.eq('user_id', userId)` alone does not enforce security — RLS does)
    - Remove the `scoring.service.spec.ts` "removed legacy methods" block once the 3.4.5 refactor is settled — low-signal once the method names are forgotten
    - Consider refactoring `matches.page.ts`'s `applyGameweekMeta` so that `setGameweekMeta` takes the gameweek number explicitly, keeping a single point where all fields are written together (current pre-assign of `currentGameweek.number = target` is a workaround)
    - `markJokerUsed` authorization hardening: add an integration test that disables RLS and asserts the app-layer still refuses cross-user writes. Also add a doc-comment pinning the `mark_joker_used` RPC contract so future refactors don't silently break the authorization boundary (RLS + `auth.uid()` inside the SECURITY DEFINER function)
    - Wrap `SupabaseDataService` error surfaces in a sanitized domain error (e.g. `JokerUsageError('Unable to load joker state')`) and log the raw Supabase message only — raw messages can leak schema hints (column names, constraint names, RLS denial reasons) to the browser console
    - **sync-matches cooldown race condition:** the current read-then-act pattern lets two concurrent invocations both pass the 5-min gate when clicked near-simultaneously (low risk — football-data.org upserts are idempotent — but wastes API quota). Fix: replace the check with a single `UPDATE sync_metadata SET last_sync_status = 'in_progress' WHERE id = 1 AND (last_sync_at IS NULL OR last_sync_at < NOW() - INTERVAL '5 minutes' OR last_sync_status = 'error') RETURNING *`. If zero rows returned, you're in cooldown. This also wires the `'in_progress'` enum value (currently dead)
    - **Auth guard cold-start race:** `AuthGuard` reads `supabaseService.currentProfile?.role` synchronously. On a cold start with a persisted session, `currentSession$` has emitted but `currentProfile$` may still be null while the profile query is in flight. Deep-linking to `/super-admin/dashboard` in that window redirects a legit super-admin to `/auth/login`. Fix: switch the guard to subscribe to `profile$` with `filter(p => p !== null)` and a short timeout fallback
    - **Extract `AdminService` from `SupabaseDataService`:** the 7 super-admin methods (`getAllUsers`, `getAllGroups`, `toggleUserActive`, `deleteGroup`, `getLastMatchSync`, `triggerMatchSync`, `signOutUser`) bloat the main data service (now ~670 LOC mixing player, admin, scoring, and groups). Extracting an `AdminService` keeps the normal data-access service focused and prevents accidental admin calls from non-admin pages
    - **Dashboard client countdown vs server cooldown:** `CLIENT_COUNTDOWN_SECONDS = 30` but the server enforces 300s. After a successful click, the button re-enables after 30s but the next click hits server cooldown and restarts a 270s countdown — looks flaky. Either lift the client value to 300 (match the server) or add an inline comment explaining the intentional optimistic re-enable pacing
    - **admin-signout audit logging:** re-order the Edge Function so `userId` is parsed BEFORE the role check. Currently a forbidden caller leaves no record of which user they tried to target — parsing first captures full attack context in the denial log
    - `sync_metadata` `'in_progress'` status enum value is dead code today — wire it up as part of the cooldown race fix above OR remove the CHECK constraint value (migration 008:52)
    - **Paginate `getAllUsers` / `getAllGroups`:** currently capped at `.limit(500)` as a safety guard. Replace with proper `.range(offset, offset + pageSize - 1)` + infinite scroll / paging controls on the users-groups admin page. At scale (thousands of users) even 500 rows is a lot to ship each tab visit
    - **Admin audit log:** add an `admin_audit_log` table written by `admin-signout` (and future privileged super-admin operations) — records caller, target, action, timestamp. Currently only stdout `console.log` at the Edge Function; not queryable
    - **CORS response headers:** both `sync-matches` and `admin-signout` Edge Functions respond to OPTIONS with 204 but set no `Access-Control-Allow-Origin`/`-Methods`/`-Headers`. `supabase-js` handles this internally so current callers work, but direct browser `fetch` from a different origin would fail. Add an allowlist-based CORS header set (not `*`)
    - Confirm the users-groups page is excluded from any session-replay / error-tracking capture (Sentry etc.) — it renders user emails. Mask or exclude via provider config

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
