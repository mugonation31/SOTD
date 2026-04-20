# Predict3 - Complete Supabase Setup Guide

**Created:** 2026-01-05
**Status:** Setup complete — project `zsoevdobcpgacrvgqlkx` is live. This guide is retained for onboarding new environments (staging clones, contributor sandboxes) that need to repeat the migration.
**Purpose:** Set up a fresh Supabase project with the MVP schema from scratch.

---

## Step 1: Get Your New Supabase Credentials

### 1.1 Access Your New Supabase Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your new project
3. Navigate to **Settings** → **API**

### 1.2 Copy Your Credentials
You'll need two values:
- **Project URL**: `https://[your-project-ref].supabase.co`
- **Anon/Public Key**: `eyJhbGc...` (long JWT token)

---

## Step 2: Update Environment File

### File: `frontend/src/environments/environment.ts` and `environment.prod.ts`

As of Task 4.2.1, production builds use `environment.prod.ts` via `angular.json` fileReplacements. That file ships placeholders (`__SUPABASE_URL__`, `__SUPABASE_ANON_KEY__`) which are substituted at build time by `replace-env.js` from the `SUPABASE_URL` and `SUPABASE_ANON_KEY` env vars.

**For local dev:** `environment.ts` contains the dev values directly (public-safe anon key + project URL).

**For prod builds:** set env vars in `.envrc` (local, via direnv) or the Cloudflare Pages dashboard (CI). Never hardcode production credentials in source.

```typescript
// environment.prod.ts (do NOT edit in place — placeholders only)
export const environment = {
  production: true,
  supabase: {
    url: '__SUPABASE_URL__',
    key: '__SUPABASE_ANON_KEY__',
  },
  apiUrl: '__API_URL__',
  encryptionKey: '__ENCRYPTION_KEY__',
};

const developmentConfig = {
  production: false,
  supabase: {
    url: 'https://YOUR_NEW_PROJECT_REF.supabase.co',  // ← Update this
    key: 'YOUR_NEW_ANON_KEY_HERE'                     // ← Update this
  },
  apiUrl: 'http://localhost:3000',
  encryptionKey: 'dev-encryption-key'
};
```

---

## Step 3: Run Complete Database Migration

### 3.1 Access SQL Editor
1. In your Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**

### 3.2 Run the Migration
Copy the entire contents of `supabase-complete-migration.sql` (created below)
Paste into SQL Editor and click **Run**

**This creates:**
- ✅ `profiles` table (user profiles)
- ✅ `groups` table (prediction groups)
- ✅ `group_members` table (group membership)
- ✅ `matches` table (EPL fixtures)
- ✅ `predictions` table (user predictions)
- ✅ `gameweeks` table (season gameweeks)
- ✅ All RLS policies (security)
- ✅ All indexes (performance)
- ✅ All triggers (auto-updates)

---

## Step 4: Verify Installation

### 4.1 Check Tables
In Supabase Dashboard → **Table Editor**, you should see:
- `profiles`
- `groups`
- `group_members`
- `matches`
- `predictions`
- `gameweeks`

### 4.2 Check RLS
In Supabase Dashboard → **Authentication** → **Policies**, verify policies exist for all tables.

---

## Step 5: Test Connection

### 5.1 Start Development Server
```bash
cd frontend
npm start
```

### 5.2 Test Signup Flow
1. Navigate to signup page
2. Create a test account
3. Check Supabase Dashboard → **Authentication** → **Users** (user should appear)
4. Check **Table Editor** → **profiles** (profile should be created)

### 5.3 Test Login Flow
1. Log in with test account
2. Should redirect to welcome/dashboard
3. Check browser console for any Supabase errors

---

## Schema Overview (MVP V1 Simplified)

### Key Changes from Original Plan
✅ **Removed:**
- `entry_fee` (no prize money handling)
- `prize_pool` (no prize money handling)
- `is_private` (all groups are code-only)
- `paid_members` (no payment tracking)

✅ **Kept:**
- Pure prediction gaming features
- Group management with codes
- Scoring and leaderboards
- User roles and permissions

---

## Table Relationships

```
auth.users (Supabase managed)
    ↓ 1:1
profiles
    ↓ 1:many
group_members → groups
    ↓ 1:many
predictions → matches → gameweeks
```

---

## Security Model

### Row Level Security (RLS)
All tables have RLS enabled with these principles:

1. **Users** can read/update their own data
2. **Group Admins** can manage their groups
3. **Super Admins** can access everything
4. **Public data** (matches, gameweeks) is readable by authenticated users
5. **Predictions** are private until gameweek deadline passes

---

## Troubleshooting

### Issue: "relation does not exist"
**Solution:** Run the complete migration SQL again. Tables weren't created properly.

### Issue: "new row violates row-level security policy"
**Solution:** Check that RLS policies were created. Re-run the RLS section of migration.

### Issue: "JWT expired" or "Invalid token"
**Solution:** Your anon key might be wrong. Double-check in Settings → API.

### Issue: Signup works but profile not created
**Solution:** Check `profiles` table has proper INSERT policy. Check browser console for errors.

---

## Next Steps After Setup

1. ✅ Verify all tables exist
2. ✅ Test authentication flow
3. ✅ Test group creation
4. 📋 Seed initial data (optional):
   - Create test super admin
   - Create sample gameweeks
   - Create sample matches
5. 📋 Configure email templates (Supabase → Authentication → Email Templates)
6. 📋 Set up production environment variables
7. 📋 Enable database backups (Settings → Database → Backups)

---

## Maintenance Commands

### Clear All Data (Development Only!)
```sql
-- WARNING: Deletes ALL data
TRUNCATE TABLE predictions CASCADE;
TRUNCATE TABLE group_members CASCADE;
TRUNCATE TABLE groups CASCADE;
TRUNCATE TABLE matches CASCADE;
TRUNCATE TABLE gameweeks CASCADE;
-- Note: profiles will cascade delete from auth.users
```

### Reset Test User
```sql
-- Delete user from profiles (auth.users cascades)
DELETE FROM auth.users WHERE email = 'test@example.com';
```

### Check Table Sizes
```sql
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## Support

If you encounter issues:
1. Check Supabase logs: Dashboard → Logs
2. Check browser console for client-side errors
3. Verify RLS policies are not blocking valid operations
4. Check that all environment variables are correct

---

_Last Updated: 2026-01-05_
_Schema Version: 1.0.0 (MVP V1 Simplified)_
