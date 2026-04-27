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
- `frontend/src/app/platforms/player/pages/matches/` — duplicates predictions
- `frontend/src/app/platforms/player/pages/groups/` — collapsed into standings/home
- `frontend/src/app/platforms/player/pages/group-standings/` — merged into `/player/standings`
- `frontend/src/app/platforms/player/pages/join-group/` — becomes empty-state of `/player/standings` (or modal triggered from home)

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

- Multi-group-per-player support (assumed 1 group per player for MVP).
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
