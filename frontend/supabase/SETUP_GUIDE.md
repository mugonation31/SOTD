# Predict3 Supabase Setup Guide

**Version:** 1.0.0 (MVP V1 Simplified)
**Created:** 2026-01-05
**Database:** PostgreSQL via Supabase
**Schema:** 6 tables, all simplified without prize money fields

---

## Overview

This guide will walk you through setting up a fresh Supabase database for Predict3 MVP V1. The schema is **simplified** - no prize money handling, no public/private groups, just pure prediction gaming.

---

## Prerequisites

- ✅ New Supabase project created
- ✅ Supabase project is active (not paused)
- ✅ Access to Supabase Dashboard
- ✅ Your project URL and anon key ready

---

## Step 1: Update Environment Configuration

### 1.1 Get Your Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy:
   - **Project URL**: `https://[your-ref].supabase.co`
   - **Anon/Public Key**: Long JWT token starting with `eyJ...`

### 1.2 Update `frontend/src/environments/environment.ts`

Replace BOTH production and development configs:

```typescript
const productionConfig = {
  production: true,
  supabase: {
    url: 'https://YOUR_PROJECT_REF.supabase.co',  // ← Your project URL
    key: 'YOUR_ANON_KEY_HERE'                     // ← Your anon key
  },
  apiUrl: 'https://api.example.com',
  encryptionKey: 'your-encryption-key-here'
};

const developmentConfig = {
  production: false,
  supabase: {
    url: 'https://YOUR_PROJECT_REF.supabase.co',  // ← Your project URL
    key: 'YOUR_ANON_KEY_HERE'                     // ← Your anon key
  },
  apiUrl: 'http://localhost:3000',
  encryptionKey: 'dev-encryption-key'
};
```

---

## Step 2: Run Database Migrations

### 2.1 Access SQL Editor

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**

### 2.2 Run Migrations in Order

Run each migration file **one at a time** in this exact order:

#### Migration 1: Profiles Table
```sql
-- Copy contents of: migrations/001_profiles_table.sql
-- Paste and click Run
```

**What it creates:**
- `profiles` table (extends auth.users)
- Indexes for email, username, role
- RLS policies for user data protection
- Auto-update trigger for `updated_at`

**Verify:** Go to **Table Editor** → should see `profiles` table

---

#### Migration 2: Gameweeks Table
```sql
-- Copy contents of: migrations/002_gameweeks_table.sql
-- Paste and click Run
```

**What it creates:**
- `gameweeks` table (38 gameweeks per season)
- Support for special gameweeks (Boxing Day, Final Day)
- Deadline tracking
- RLS: all authenticated users can read, only super admins can write

**Verify:** Table Editor → should see `gameweeks` table

---

#### Migration 3: Matches Table
```sql
-- Copy contents of: migrations/003_matches_table.sql
-- Paste and click Run
```

**What it creates:**
- `matches` table (EPL fixtures and results)
- Links to gameweeks
- Status tracking (scheduled, live, completed, cancelled)
- RLS: all authenticated users can read, only super admins can write

**Verify:** Table Editor → should see `matches` table

---

#### Migration 4: Groups Table (Simplified)
```sql
-- Copy contents of: migrations/004_groups_table.sql
-- Paste and click Run
```

**What it creates:**
- `groups` table **WITHOUT prize money fields**
- 6-character unique codes for joining
- Member count tracking
- `generate_group_code()` function
- RLS: users can view their groups, admins can manage

**Verify:** Table Editor → should see `groups` table (no `entry_fee` or `prize_pool` columns!)

---

#### Migration 5: Group Members Table
```sql
-- Copy contents of: migrations/005_group_members_table.sql
-- Paste and click Run
```

**What it creates:**
- `group_members` table (many-to-many relationship)
- Member statistics (points, accuracy, jokers)
- Auto-increment/decrement group member counts
- RLS: users can join/leave, admins can manage

**Verify:** Table Editor → should see `group_members` table

---

#### Migration 6: Predictions Table
```sql
-- Copy contents of: migrations/006_predictions_table.sql
-- Paste and click Run
```

**What it creates:**
- `predictions` table
- Prediction locking after deadline
- `calculate_prediction_points()` function
- RLS: users see own predictions always, see others' after deadline

**Verify:** Table Editor → should see `predictions` table

---

### 2.3 Verify All Tables Created

Go to **Table Editor** in Supabase Dashboard. You should see:

✅ `profiles`
✅ `gameweeks`
✅ `matches`
✅ `groups`
✅ `group_members`
✅ `predictions`

---

## Step 3: Verify Security Policies

### 3.1 Check RLS is Enabled

1. Go to **Authentication** → **Policies**
2. Each table should have multiple policies listed
3. If no policies appear, re-run that table's migration

### 3.2 Key Security Features

- **profiles**: Users can only see/edit their own data (except super admins)
- **gameweeks/matches**: Read-only for players, write for super admins
- **groups**: Users see groups they're in, admins manage their groups
- **group_members**: Auto-managed with triggers
- **predictions**: Hidden until deadline, then visible to group members

---

## Step 4: Test the Setup

### 4.1 Start Development Server

```bash
cd frontend
npm start
```

### 4.2 Test Signup Flow

1. Navigate to signup page: `http://localhost:8100/auth/signup`
2. Create a test account
3. Check Supabase Dashboard:
   - **Authentication** → **Users** (user should appear)
   - **Table Editor** → **profiles** (profile should be created automatically)

### 4.3 Test Login Flow

1. Log in with test account
2. Should redirect to welcome/dashboard
3. Check browser console - no Supabase errors

### 4.4 Test Group Creation (if group-admin)

1. Create a test group
2. Verify it appears in **Table Editor** → **groups**
3. Note the 6-character code generated

---

## Step 5: Optional - Seed Initial Data

### 5.1 Create Super Admin User

After signing up a user, manually promote them:

```sql
-- Get your user ID from auth.users or profiles table first
UPDATE public.profiles
SET role = 'super-admin'
WHERE email = 'your-email@example.com';
```

### 5.2 Create Sample Gameweek

```sql
INSERT INTO public.gameweeks (
    gameweek_number,
    season_year,
    start_date,
    end_date,
    deadline,
    is_active
) VALUES (
    1,
    '2024-25',
    '2024-08-17 00:00:00+00',
    '2024-08-18 23:59:59+00',
    '2024-08-17 11:00:00+00',  -- 1 hour before first match
    TRUE
);
```

---

## Troubleshooting

### Error: "relation does not exist"

**Cause:** Table wasn't created
**Solution:** Re-run that migration file

### Error: "new row violates row-level security policy"

**Cause:** RLS policy is blocking the operation
**Solution:**
1. Check the RLS policies for that table
2. Ensure you're authenticated
3. Check if your user has the right role

### Error: "JWT expired" or "Invalid token"

**Cause:** Wrong anon key in environment.ts
**Solution:** Double-check your anon key in Supabase Settings → API

### Signup works but profile not created

**Cause:** Trigger or policy issue
**Solution:**
1. Check browser console for errors
2. Verify `profiles` table has INSERT policy
3. Check Supabase logs (Dashboard → Logs)

### Group code not generated

**Cause:** `generate_group_code()` function not created
**Solution:** Re-run migration 004_groups_table.sql

---

## Database Maintenance

### View All Tables

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

### Check Table Sizes

```sql
SELECT
  tablename,
  pg_size_pretty(pg_total_relation_size('public.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size('public.'||tablename) DESC;
```

### Backup Database

Supabase Dashboard → **Settings** → **Database** → **Backups**

Enable daily backups for production!

---

## Next Steps

After successful setup:

1. ✅ **Configure Email Templates**
   Dashboard → Authentication → Email Templates
   Customize signup confirmation emails

2. ✅ **Set Up Environment Variables**
   Create `.env` file for sensitive data (don't commit!)

3. ✅ **Enable Database Backups**
   Dashboard → Settings → Database → Enable daily backups

4. ✅ **Test All Features**
   - Signup/login
   - Create group
   - Join group
   - Submit predictions

5. ✅ **Integrate EPL API**
   Start Phase 6 of TODO.md (Backend Integration)

---

## Schema Differences from Original Plan

### ❌ Removed (MVP V1 Simplification)

- `groups.entry_fee` - No prize money handling
- `groups.prize_pool` - No prize money handling
- `groups.is_private` - All groups are code-only (inherently private)
- `group_members.paid_status` - No payment tracking
- Any payment-related tables

### ✅ Kept (Core Features)

- All prediction mechanics
- Group codes for joining
- Leaderboards and scoring
- Joker system (2 per season)
- User roles and permissions
- Gameweek deadlines

---

## Support & Resources

- **Supabase Docs:** https://supabase.com/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Project TODO:** See `TODO.md` for development roadmap
- **Type Definitions:** See `frontend/src/app/services/supabase.service.ts`

---

## Migration Summary

| Migration | Table | Purpose | Status |
|-----------|-------|---------|--------|
| 001 | profiles | User data | ✅ Ready |
| 002 | gameweeks | Season schedule | ✅ Ready |
| 003 | matches | EPL fixtures | ✅ Ready |
| 004 | groups | Prediction groups (simplified) | ✅ Ready |
| 005 | group_members | Membership & stats | ✅ Ready |
| 006 | predictions | User predictions | ✅ Ready |

---

_Last Updated: 2026-01-05_
_Schema Version: 1.0.0 (MVP V1 Simplified)_
_Next: Update environment.ts and test connection_
