# Run Database Migrations - Quick Guide

**Project:** Predict3
**Date:** 2026-01-05
**Supabase Project:** https://zsoevdobcpgacrvgqlkx.supabase.co

---

## Quick Steps

### 1. Open Supabase SQL Editor

1. Go to: https://supabase.com/dashboard
2. Select your project: **zsoevdobcpgacrvgqlkx**
3. Click **SQL Editor** in the left sidebar
4. Click **New Query** button

### 2. Run Each Migration (In Order!)

**IMPORTANT:** Run these ONE AT A TIME in exact order.

---

#### ✅ Migration 1: Profiles Table

1. Open file: `migrations/001_profiles_table.sql`
2. Copy ALL contents (Ctrl+A, Ctrl+C)
3. Paste into SQL Editor
4. Click **Run** (or Ctrl+Enter)
5. ✅ Should see: "Success. No rows returned"

**Verify:**
- Go to **Table Editor** → should see `profiles` table
- Check columns: id, email, role, username, first_name, last_name, avatar_url, created_at, updated_at, first_login

---

#### ✅ Migration 2: Gameweeks Table

1. Open file: `migrations/002_gameweeks_table.sql`
2. Copy ALL contents
3. Paste into SQL Editor (clear previous query first)
4. Click **Run**
5. ✅ Should see: "Success. No rows returned"

**Verify:**
- Go to **Table Editor** → should see `gameweeks` table
- Check columns: id, gameweek_number, season_year, start_date, end_date, deadline, is_special, etc.

---

#### ✅ Migration 3: Matches Table

1. Open file: `migrations/003_matches_table.sql`
2. Copy ALL contents
3. Paste into SQL Editor
4. Click **Run**
5. ✅ Should see: "Success. No rows returned"

**Verify:**
- Go to **Table Editor** → should see `matches` table
- Check it references `gameweeks` table

---

#### ✅ Migration 4: Groups Table (Simplified!)

1. Open file: `migrations/004_groups_table.sql`
2. Copy ALL contents
3. Paste into SQL Editor
4. Click **Run**
5. ✅ Should see: "Success. No rows returned"

**Verify:**
- Go to **Table Editor** → should see `groups` table
- **CHECK:** No `entry_fee` column (should be removed!)
- **CHECK:** No `prize_pool` column (should be removed!)
- **CHECK:** No `is_private` column (should be removed!)
- Should have: id, name, code, description, admin_id, season_year, max_members, current_members, etc.

---

#### ✅ Migration 5: Group Members Table

1. Open file: `migrations/005_group_members_table.sql`
2. Copy ALL contents
3. Paste into SQL Editor
4. Click **Run**
5. ✅ Should see: "Success. No rows returned"

**Verify:**
- Go to **Table Editor** → should see `group_members` table
- Check columns: id, group_id, user_id, total_points, jokers_used, etc.

---

#### ✅ Migration 6: Predictions Table

1. Open file: `migrations/006_predictions_table.sql`
2. Copy ALL contents
3. Paste into SQL Editor
4. Click **Run**
5. ✅ Should see: "Success. No rows returned"

**Verify:**
- Go to **Table Editor** → should see `predictions` table
- Check columns: id, user_id, match_id, group_id, home_score, away_score, joker_used, points_earned, is_locked, etc.

---

## ✅ Final Verification

### Check All Tables Exist

Go to **Table Editor** and verify you see:

- [x] `profiles`
- [x] `gameweeks`
- [x] `matches`
- [x] `groups`
- [x] `group_members`
- [x] `predictions`

### Check RLS Policies

Go to **Authentication** → **Policies**

Each table should have multiple policies listed. If you see "0 policies", that migration didn't run properly.

---

## 🎉 Migration Complete!

Once all 6 migrations are done, you're ready to test:

```bash
cd frontend
npm start
# Open http://localhost:8100/auth/signup
```

---

## 🐛 Troubleshooting

### Error: "relation already exists"

**Cause:** You already ran that migration
**Solution:** Skip to the next one OR drop the table first:

```sql
DROP TABLE IF EXISTS public.table_name CASCADE;
-- Then re-run the migration
```

### Error: "relation does not exist"

**Cause:** You skipped a migration or ran them out of order
**Solution:** Run the migrations in order from 001 → 006

### Error: "permission denied"

**Cause:** Your Supabase user doesn't have permissions
**Solution:** You should be project owner - check your Supabase dashboard access

---

## 📝 Migration Checklist

- [ ] 001_profiles_table.sql
- [ ] 002_gameweeks_table.sql
- [ ] 003_matches_table.sql
- [ ] 004_groups_table.sql
- [ ] 005_group_members_table.sql
- [ ] 006_predictions_table.sql
- [ ] Verified all tables exist
- [ ] Verified RLS policies exist
- [ ] Tested signup flow

---

_Ready to run the migrations? Start with 001!_
