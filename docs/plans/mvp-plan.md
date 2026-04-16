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

- [ ] **3.1 Deadline Enforcement** (Size: M)
  - **Description**: Add a countdown timer to the matches page showing time until the gameweek deadline. Lock the prediction form when the deadline passes. Prevent submission after deadline on both frontend and backend (RLS already handles backend).
  - **Depends on**: 2.2 (needs real gameweek deadlines)
  - **Files**:
    - Create `frontend/src/app/shared/components/countdown-timer/countdown-timer.component.ts`
    - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (add deadline checking, disable form)
    - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.html` (add timer, locked state UI)
    - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.scss` (locked state styling)
  - **Acceptance criteria**:
    - Countdown timer shows days/hours/minutes until deadline
    - Timer updates every second
    - When deadline passes: all score inputs disabled, submit button disabled, "Predictions Locked" message shown
    - Locked icon displayed on the gameweek header after deadline
    - Page auto-detects deadline pass without requiring refresh
    - If user navigates to matches page after deadline, form is immediately locked

- [ ] **3.2 Wire predictions to Supabase** (Size: M)
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

- [ ] **3.3 Prediction Visibility** (Size: S)
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

- [ ] **3.4 Joker System** (Size: M)
  - **Description**: Add joker selection to the prediction form. Track usage in `group_members.jokers_used`. Auto-assign jokers if not used by Boxing Day (1st) or Final Day (2nd). Block joker usage on special gameweeks.
  - **Depends on**: 3.2, 2.1 (needs special gameweek data)
  - **Files**:
    - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.ts` (joker toggle, validation logic)
    - Modify `frontend/src/app/platforms/player/pages/matches/matches.page.html` (joker checkbox/toggle UI, warning banners)
    - Modify `frontend/src/app/core/services/supabase-data.service.ts` (joker tracking methods)
    - Modify `frontend/src/app/core/services/scoring.service.ts` (integrate joker doubling with Supabase data)
  - **Acceptance criteria**:
    - "Use Joker" toggle on prediction form (only if jokers remaining)
    - Shows "X/2 jokers remaining" indicator
    - Warning banner: "You must use your 1st joker before Boxing Day" when approaching deadline
    - Joker toggle disabled on Boxing Day and Final Day gameweeks with tooltip explaining why
    - If 1st joker not used by Boxing Day gameweek, auto-assigned to that gameweek's predictions
    - If 2nd joker not used by Final Day gameweek, auto-assigned to that gameweek's predictions
    - `joker_used` flag set on prediction rows, `jokers_used` incremented on `group_members`

---

### Phase 4: Scoring, Super Admin & Production

- [ ] **4.0 Super Admin Simplification** (Size: M)
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
2. **Joker auto-assignment**: Auto-assign when the player submits predictions for the relevant gameweek without using their joker. Show a friendly warning: "Your joker will be automatically played if not used by Gameweek X." If they never submit, auto-assign at deadline via scheduled function.
3. **Scoring model**: Use the **frontend model** (it's the correct one):
   - Correct result: Home win 3pts, Away win 4pts, Draw 6pts
   - Correct score: +3pts per correct score
   - 3 correct scores in a round: +10pts bonus
   - Joker: doubles the entire round's points
   - Boxing Day & Final Day: predict all 10 matches
   - The SQL `calculate_prediction_points` function must be updated to match this.
4. **Predictions are per-player, not per-group**: One set of predictions applies to all groups. DB schema change: `UNIQUE(user_id, match_id)` — remove `group_id` from predictions table. Leaderboards calculated per-group by filtering on group membership.
5. **Super admin access**: No separate registration flow. Owner gets `role = 'super-admin'` set directly in `profiles` table. Normal login, guard routes to super-admin dashboard.
