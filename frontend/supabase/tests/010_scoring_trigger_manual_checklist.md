# Migration 010 — Scoring Trigger Manual Test Checklist

> ⚠️ **WARNING — DO NOT RUN AGAINST PRODUCTION**
>
> These checks seed synthetic `auth.users`, `profiles`, `groups`,
> `group_members`, `gameweeks`, `matches`, and `predictions` rows with
> **predictable fixed UUIDs** (`11111111-…`, `22222222-…`, `33333333-…`)
> and `@example.com` emails. Each check wraps its seed in `BEGIN ...
> ROLLBACK;` so nothing should persist — **but** if you forget the
> `ROLLBACK;` those rows remain permanent and reference-able.
>
> Recommended: run ONLY against a local Supabase or a disposable staging
> project. If you must run in prod, confirm every `BEGIN ... ROLLBACK`
> block completes as a single transaction and verify the seeded IDs are
> gone afterwards:
> ```sql
> SELECT count(*) FROM auth.users
>  WHERE id IN (
>    '11111111-1111-1111-1111-111111111111',
>    '22222222-2222-2222-2222-222222222222',
>    '33333333-3333-3333-3333-333333333333'
>  );
> -- expected: 0
> ```

Run this after applying migration `010_scoring_trigger.sql` to verify the
scoring pipeline works end-to-end against a live Supabase project.

## Two ways to use this file

1. **Fast path** — open `010_scoring_trigger_test.sql` in the Supabase SQL
   editor and run it as one script. Everything is wrapped in
   `BEGIN ... ROLLBACK`, so nothing persists. Script completes silently on
   pass, aborts loudly with `RAISE EXCEPTION` on fail.
2. **Step-by-step manual path** — use the checklist below. Each section is
   an independent scenario you can paste into the SQL editor, run, and tick
   off. Each section ends with its own `ROLLBACK;` so scenarios don't leak
   into each other.

---

## Scoring rules reminder

From migration 005 (`calculate_prediction_points`):

| Outcome | Points |
|---|---|
| Home win, correct result | 3 |
| Away win, correct result | 4 |
| Draw, correct result    | 6 |
| Exact score (on top of result) | +3 |
| Joker on that prediction | doubles the per-match total |

Plus from migration 010:

- Perfect-round bonus: +10 flat when a user has >= 3 exact scores in a
  fully-completed NON-special gameweek. Not doubled by joker.
- Special gameweeks (Boxing Day, Final Day) do NOT get the perfect-round
  bonus.

---

## Shared prerequisite seed

Paste this once per scenario. Each scenario opens with `BEGIN;` and closes
with `ROLLBACK;`, so you can re-run without cleanup.

```sql
-- Minimal fixtures used by every scenario below.
-- Fixed UUIDs so the trigger output is easy to trace.

-- auth.users (SQL editor runs as superuser, so direct insert works)
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES
    ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'test-user-1@example.com', '', NOW(), NOW(), NOW()),
    ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'test-user-2@example.com', '', NOW(), NOW(), NOW()),
    ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'test-admin@example.com',  '', NOW(), NOW(), NOW());

-- profiles
INSERT INTO public.profiles (id, email, role, username, first_name, last_name)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'test-user-1@example.com', 'player',      'test_user_1', 'Test', 'User1'),
    ('22222222-2222-2222-2222-222222222222', 'test-user-2@example.com', 'player',      'test_user_2', 'Test', 'User2'),
    ('33333333-3333-3333-3333-333333333333', 'test-admin@example.com',  'group-admin', 'test_admin',  'Test', 'Admin');

-- groups
INSERT INTO public.groups (id, name, code, admin_id, season_year, current_members)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Test Group A', 'TESTAA', '33333333-3333-3333-3333-333333333333', '2025-26', 0),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Test Group B', 'TESTBB', '33333333-3333-3333-3333-333333333333', '2025-26', 0);

-- group_members (User1 in both, User2 in A)
INSERT INTO public.group_members (group_id, user_id)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111'),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111');

-- gameweeks: GW1 regular, GW2 special (Boxing Day)
INSERT INTO public.gameweeks (id, gameweek_number, season_year, start_date, end_date, deadline, is_special, special_type)
VALUES
    ('11111111-aaaa-aaaa-aaaa-111111111111', 1, '2025-26',
        NOW() - INTERVAL '7 days', NOW() - INTERVAL '5 days', NOW() - INTERVAL '8 days',
        FALSE, NULL),
    ('22222222-aaaa-aaaa-aaaa-222222222222', 2, '2025-26',
        NOW() - INTERVAL '4 days', NOW() - INTERVAL '2 days', NOW() - INTERVAL '5 days',
        TRUE, 'boxing-day');

-- matches: 3 in GW1, 10 in GW2, all scheduled with NULL scores
INSERT INTO public.matches (id, gameweek_id, gameweek_number, home_team, away_team, kickoff_time, status, season_year)
VALUES
    ('aa111111-1111-1111-1111-111111111111', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 'Arsenal',   'Chelsea',    NOW() - INTERVAL '6 days', 'scheduled', '2025-26'),
    ('aa222222-2222-2222-2222-222222222222', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 'Liverpool', 'Man City',   NOW() - INTERVAL '6 days', 'scheduled', '2025-26'),
    ('aa333333-3333-3333-3333-333333333333', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 'Spurs',     'Man United', NOW() - INTERVAL '6 days', 'scheduled', '2025-26'),
    ('bb111111-1111-1111-1111-111111111111', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home1', 'Away1', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bb222222-2222-2222-2222-222222222222', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home2', 'Away2', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bb333333-3333-3333-3333-333333333333', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home3', 'Away3', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bb444444-4444-4444-4444-444444444444', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home4', 'Away4', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bb555555-5555-5555-5555-555555555555', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home5', 'Away5', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bb666666-6666-6666-6666-666666666666', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home6', 'Away6', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bb777777-7777-7777-7777-777777777777', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home7', 'Away7', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bb888888-8888-8888-8888-888888888888', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home8', 'Away8', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bb999999-9999-9999-9999-999999999999', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home9', 'Away9', NOW() - INTERVAL '3 days', 'scheduled', '2025-26'),
    ('bbaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 'Home10','Away10',NOW() - INTERVAL '3 days', 'scheduled', '2025-26');
```

---

## [ ] Test 1 — Basic result correct

User1 predicts 2-0 Arsenal; actual 3-1 Arsenal. Home win correct, score wrong.

**Setup** (paste the shared seed above first, then):

```sql
BEGIN;

-- shared seed here (see above)

INSERT INTO public.predictions (id, user_id, match_id, gameweek_id, gameweek_number, home_score, away_score)
VALUES ('d1111111-1111-1111-1111-111111111111',
        '11111111-1111-1111-1111-111111111111',
        'aa111111-1111-1111-1111-111111111111',
        '11111111-aaaa-aaaa-aaaa-111111111111', 1, 2, 0);
```

**Trigger:**

```sql
UPDATE public.matches
   SET status = 'completed', home_score = 3, away_score = 1
 WHERE id = 'aa111111-1111-1111-1111-111111111111';
```

**Assert:**

```sql
SELECT points_earned
FROM public.predictions
WHERE id = 'd1111111-1111-1111-1111-111111111111';
-- Expected: 3 (home win correct, score not exact)
```

**Cleanup:**

```sql
ROLLBACK;
```

---

## [ ] Test 2 — Exact score correct

User2 predicts 2-1; actual 2-1. Result correct AND exact score.

**Setup:**

```sql
BEGIN;

-- shared seed here

INSERT INTO public.predictions (id, user_id, match_id, gameweek_id, gameweek_number, home_score, away_score)
VALUES ('d2222222-2222-2222-2222-222222222222',
        '22222222-2222-2222-2222-222222222222',
        'aa111111-1111-1111-1111-111111111111',
        '11111111-aaaa-aaaa-aaaa-111111111111', 1, 2, 1);
```

**Trigger:**

```sql
UPDATE public.matches
   SET status = 'completed', home_score = 2, away_score = 1
 WHERE id = 'aa111111-1111-1111-1111-111111111111';
```

**Assert:**

```sql
SELECT points_earned
FROM public.predictions
WHERE id = 'd2222222-2222-2222-2222-222222222222';
-- Expected: 6 (3 home win + 3 exact score)
```

**Cleanup:**

```sql
ROLLBACK;
```

---

## [ ] Test 3 — Joker doubles per-match points

User1 puts joker on match 1 in GW1. All 3 GW1 matches complete.

- Match 1 joker: predict 2-0, actual 2-1 -> home correct -> 3, doubled = 6
- Match 2:       predict 1-0, actual 3-1 -> home correct -> 3
- Match 3:       predict 0-1, actual 0-2 -> away correct -> 4
- Expected total_points for User1 = 13 (no +10; only 0 exact scores).

**Setup:**

```sql
BEGIN;

-- shared seed here

INSERT INTO public.predictions (id, user_id, match_id, gameweek_id, gameweek_number, home_score, away_score, joker_used)
VALUES
    ('d1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'aa111111-1111-1111-1111-111111111111', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 2, 0, TRUE),
    ('d1222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'aa222222-2222-2222-2222-222222222222', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 1, 0, FALSE),
    ('d1333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'aa333333-3333-3333-3333-333333333333', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 0, 1, FALSE);
```

**Trigger** (complete all 3 GW1 matches):

```sql
UPDATE public.matches SET status='completed', home_score=2, away_score=1 WHERE id = 'aa111111-1111-1111-1111-111111111111';
UPDATE public.matches SET status='completed', home_score=3, away_score=1 WHERE id = 'aa222222-2222-2222-2222-222222222222';
UPDATE public.matches SET status='completed', home_score=0, away_score=2 WHERE id = 'aa333333-3333-3333-3333-333333333333';
```

**Assert:**

```sql
-- Joker match should be 6 (3 doubled)
SELECT points_earned FROM public.predictions
WHERE id = 'd1111111-1111-1111-1111-111111111111';
-- Expected: 6

-- GW1 total for User1 in Group A
SELECT total_points FROM public.group_members
WHERE user_id = '11111111-1111-1111-1111-111111111111'
  AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
-- Expected: 13 (6 + 3 + 4)
```

**Cleanup:**

```sql
ROLLBACK;
```

---

## [ ] Test 4 — Perfect-round bonus (+10) on regular gameweek

User2 predicts exact scores on all 3 GW1 matches. Final match completion
should trigger the +10 perfect-round bonus.

- Match 1: predict 2-1 actual 2-1 -> home exact -> 6
- Match 2: predict 3-1 actual 3-1 -> home exact -> 6
- Match 3: predict 0-2 actual 0-2 -> away exact -> 7
- Base = 19; +10 bonus = 29.

**Setup:**

```sql
BEGIN;

-- shared seed here

INSERT INTO public.predictions (id, user_id, match_id, gameweek_id, gameweek_number, home_score, away_score)
VALUES
    ('d2222221-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'aa111111-1111-1111-1111-111111111111', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 2, 1),
    ('d2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'aa222222-2222-2222-2222-222222222222', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 3, 1),
    ('d2222223-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'aa333333-3333-3333-3333-333333333333', '11111111-aaaa-aaaa-aaaa-111111111111', 1, 0, 2);
```

**Trigger** (complete all 3 matches; the bonus kicks in on the final update):

```sql
UPDATE public.matches SET status='completed', home_score=2, away_score=1 WHERE id = 'aa111111-1111-1111-1111-111111111111';
UPDATE public.matches SET status='completed', home_score=3, away_score=1 WHERE id = 'aa222222-2222-2222-2222-222222222222';
UPDATE public.matches SET status='completed', home_score=0, away_score=2 WHERE id = 'aa333333-3333-3333-3333-333333333333';
```

**Assert:**

```sql
SELECT total_points, correct_scores
FROM public.group_members
WHERE user_id = '22222222-2222-2222-2222-222222222222'
  AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
-- Expected: total_points = 29, correct_scores = 3
```

**Cleanup:**

```sql
ROLLBACK;
```

---

## [ ] Test 5 — Special gameweek does NOT award +10

User2 has 3 exact scores in the 10-match Boxing Day GW. No perfect-round
bonus should be added.

- 3 exact scores: 6 + 7 + 9 = 22
- 7 wrong predictions: 0 each
- Expected total_points = 22 (NOT 32).

**Setup:**

```sql
BEGIN;

-- shared seed here

INSERT INTO public.predictions (user_id, match_id, gameweek_id, gameweek_number, home_score, away_score)
VALUES
    ('22222222-2222-2222-2222-222222222222', 'bb111111-1111-1111-1111-111111111111', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 2, 0),
    ('22222222-2222-2222-2222-222222222222', 'bb222222-2222-2222-2222-222222222222', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 1, 2),
    ('22222222-2222-2222-2222-222222222222', 'bb333333-3333-3333-3333-333333333333', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 1, 1),
    ('22222222-2222-2222-2222-222222222222', 'bb444444-4444-4444-4444-444444444444', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 0, 0),
    ('22222222-2222-2222-2222-222222222222', 'bb555555-5555-5555-5555-555555555555', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 0, 0),
    ('22222222-2222-2222-2222-222222222222', 'bb666666-6666-6666-6666-666666666666', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 0, 0),
    ('22222222-2222-2222-2222-222222222222', 'bb777777-7777-7777-7777-777777777777', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 0, 0),
    ('22222222-2222-2222-2222-222222222222', 'bb888888-8888-8888-8888-888888888888', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 0, 0),
    ('22222222-2222-2222-2222-222222222222', 'bb999999-9999-9999-9999-999999999999', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 0, 0),
    ('22222222-2222-2222-2222-222222222222', 'bbaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-aaaa-aaaa-aaaa-222222222222', 2, 0, 0);
```

**Trigger** (complete all 10 matches):

```sql
UPDATE public.matches SET status='completed', home_score=2, away_score=0 WHERE id = 'bb111111-1111-1111-1111-111111111111';
UPDATE public.matches SET status='completed', home_score=1, away_score=2 WHERE id = 'bb222222-2222-2222-2222-222222222222';
UPDATE public.matches SET status='completed', home_score=1, away_score=1 WHERE id = 'bb333333-3333-3333-3333-333333333333';
UPDATE public.matches SET status='completed', home_score=5, away_score=0 WHERE id = 'bb444444-4444-4444-4444-444444444444';
UPDATE public.matches SET status='completed', home_score=5, away_score=0 WHERE id = 'bb555555-5555-5555-5555-555555555555';
UPDATE public.matches SET status='completed', home_score=5, away_score=0 WHERE id = 'bb666666-6666-6666-6666-666666666666';
UPDATE public.matches SET status='completed', home_score=5, away_score=0 WHERE id = 'bb777777-7777-7777-7777-777777777777';
UPDATE public.matches SET status='completed', home_score=5, away_score=0 WHERE id = 'bb888888-8888-8888-8888-888888888888';
UPDATE public.matches SET status='completed', home_score=5, away_score=0 WHERE id = 'bb999999-9999-9999-9999-999999999999';
UPDATE public.matches SET status='completed', home_score=5, away_score=0 WHERE id = 'bbaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
```

**Assert:**

```sql
SELECT total_points, correct_scores
FROM public.group_members
WHERE user_id = '22222222-2222-2222-2222-222222222222'
  AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
-- Expected: total_points = 22, correct_scores = 3 (NOT 32 — no +10 on special)
```

**Cleanup:**

```sql
ROLLBACK;
```

---

## [ ] Test 6 — Score-correction idempotency

Admin corrects match 1 from 2-1 to 1-2. Trigger refires. User1's points must
be recomputed, not double-counted. Re-running recompute manually must leave
the total unchanged.

**Setup:**

```sql
BEGIN;

-- shared seed here

INSERT INTO public.predictions (id, user_id, match_id, gameweek_id, gameweek_number, home_score, away_score)
VALUES ('d1111111-1111-1111-1111-111111111111',
        '11111111-1111-1111-1111-111111111111',
        'aa111111-1111-1111-1111-111111111111',
        '11111111-aaaa-aaaa-aaaa-111111111111', 1, 2, 1);

-- First completion: 2-1 actual, User1 exact -> 6 pts.
UPDATE public.matches SET status='completed', home_score=2, away_score=1
 WHERE id = 'aa111111-1111-1111-1111-111111111111';
```

Confirm the starting state:

```sql
SELECT points_earned FROM public.predictions
WHERE id = 'd1111111-1111-1111-1111-111111111111';
-- Expected: 6

SELECT total_points FROM public.group_members
WHERE user_id = '11111111-1111-1111-1111-111111111111'
  AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
-- Expected: 6
```

**Trigger** (admin corrects the score — this fires the trigger again):

```sql
UPDATE public.matches SET home_score=1, away_score=2
 WHERE id = 'aa111111-1111-1111-1111-111111111111';
```

**Assert** (recompute is correct, and a second manual recompute is idempotent):

```sql
-- Points should flip: 2-1 prediction vs 1-2 actual = wrong result = 0.
SELECT points_earned FROM public.predictions
WHERE id = 'd1111111-1111-1111-1111-111111111111';
-- Expected: 0

SELECT total_points FROM public.group_members
WHERE user_id = '11111111-1111-1111-1111-111111111111'
  AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
-- Expected: 0

-- Manually re-run recompute. Must produce the same total (no double-counting).
SELECT public.recompute_group_member_aggregates('11111111-1111-1111-1111-111111111111');

SELECT total_points FROM public.group_members
WHERE user_id = '11111111-1111-1111-1111-111111111111'
  AND group_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
-- Expected: 0 (still — recompute is idempotent)
```

**Cleanup:**

```sql
ROLLBACK;
```

---

## [ ] Test 7 — Multi-group aggregation

User1 is in both Group A and Group B. After any scoring event, both
group_members rows should have identical totals (scoring is per-player,
not per-group).

**Setup:**

```sql
BEGIN;

-- shared seed here

INSERT INTO public.predictions (user_id, match_id, gameweek_id, gameweek_number, home_score, away_score)
VALUES ('11111111-1111-1111-1111-111111111111',
        'aa111111-1111-1111-1111-111111111111',
        '11111111-aaaa-aaaa-aaaa-111111111111', 1, 2, 1);
```

**Trigger:**

```sql
UPDATE public.matches SET status='completed', home_score=2, away_score=1
 WHERE id = 'aa111111-1111-1111-1111-111111111111';
```

**Assert** — both rows should match exactly:

```sql
SELECT group_id, total_points, correct_scores, correct_results
FROM public.group_members
WHERE user_id = '11111111-1111-1111-1111-111111111111'
ORDER BY group_id;
-- Expected: 2 rows, both with total_points=6, correct_scores=1, correct_results=1.
```

**Cleanup:**

```sql
ROLLBACK;
```

---

## When something fails

- A `RAISE EXCEPTION` in the full SQL script will print the expected vs
  actual values in the error message. Use those to narrow down which
  function misbehaved:
  - Wrong `points_earned` per prediction -> look at
    `score_predictions_for_match` and `calculate_prediction_points`.
  - Wrong `total_points` on group_members but per-prediction points look
    right -> look at `recompute_group_member_aggregates`, especially the
    perfect-round loop.
  - `correct_scores` count off -> look at the home/away equality CASE
    in the recompute function.
- To inspect state mid-run, replace the final `ROLLBACK;` with `COMMIT;`
  in a scratch DB — never on production data.
