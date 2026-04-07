# Supabase Database Structure

This folder contains all database migrations for the Predict3 application.

---

## Folder Structure

```
supabase/
├── README.md              ← You are here
├── SETUP_GUIDE.md         ← Complete setup instructions
├── migrations/            ← Database migrations (run in order)
│   ├── 001_profiles_table.sql
│   ├── 002_gameweeks_table.sql
│   ├── 003_matches_table.sql
│   ├── 004_groups_table.sql
│   ├── 005_group_members_table.sql
│   └── 006_predictions_table.sql
└── archive/               ← Old migrations (for reference only)
    ├── supabase-profiles-table.sql
    ├── supabase-profiles-table-simple.sql
    └── supabase-profiles-table-fixed.sql
```

---

## Quick Start

### 1. Get Your Supabase Credentials

From your Supabase Dashboard → Settings → API:
- **Project URL**: `https://[your-ref].supabase.co`
- **Anon Key**: JWT token

### 2. Update Environment File

Edit `frontend/src/environments/environment.ts`:

```typescript
supabase: {
  url: 'YOUR_PROJECT_URL',
  key: 'YOUR_ANON_KEY'
}
```

### 3. Run Migrations

Open **Supabase Dashboard → SQL Editor** and run each migration file in order (001 → 006).

**📖 See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.**

---

## Migration Order (IMPORTANT!)

Always run migrations in this order:

1. **001_profiles_table.sql** - User profiles (extends auth.users)
2. **002_gameweeks_table.sql** - EPL gameweeks and deadlines
3. **003_matches_table.sql** - Match fixtures and results
4. **004_groups_table.sql** - Prediction groups (simplified - no prize money)
5. **005_group_members_table.sql** - Group membership and stats
6. **006_predictions_table.sql** - User predictions

**Dependencies:**
- Migration 003 requires 002 (gameweeks → matches)
- Migration 004 requires 001 (profiles → groups)
- Migration 005 requires 001 + 004 (profiles + groups → members)
- Migration 006 requires 001, 002, 003, 004 (all → predictions)

---

## What Each Migration Creates

### 001: Profiles Table
- User profile data (username, name, role, avatar)
- RLS policies for user privacy
- Super admin access policies
- Auto-update triggers

### 002: Gameweeks Table
- 38 gameweeks per EPL season
- Prediction deadlines (1 hour before first match)
- Special gameweeks (Boxing Day, Final Day)
- Read-only for players, writable for super admins

### 003: Matches Table
- EPL match fixtures
- Live score updates
- Final results
- Status tracking (scheduled, live, completed, cancelled)

### 004: Groups Table (SIMPLIFIED)
- Prediction groups with 6-character codes
- **NO prize money fields** (entry_fee, prize_pool removed for MVP V1)
- **NO public/private distinction** (all groups are code-only)
- Auto-generated unique codes
- Member count tracking

### 005: Group Members Table
- Many-to-many relationship (users ↔ groups)
- Member statistics (points, accuracy, jokers)
- Joker tracking (max 2 per season)
- Auto-increment/decrement member counts

### 006: Predictions Table
- User score predictions
- Deadline-based locking
- Visibility controls (hidden until deadline)
- Point calculation functions
- Joker system integration

---

## Key Features

### ✅ MVP V1 Simplifications

- **NO prize money handling** - Groups manage prizes externally
- **NO public/private groups** - All groups are code-only (inherently private)
- **Pure prediction gaming** - Focus on gameplay, not payments

### ✅ Security (RLS)

All tables have Row Level Security enabled:
- Users can only see their own data (or group data they're in)
- Super admins have full access
- Predictions are hidden until deadline passes

### ✅ Auto-Features

- Auto-generated group codes (6 characters, unique)
- Auto-updated timestamps (`updated_at`)
- Auto-increment/decrement group member counts
- Auto-locking predictions after deadline

---

## Archive Folder

The `archive/` folder contains old migration attempts from the previous Supabase project. These are kept for reference only and should **NOT** be run on the new database.

**Old files:**
- `supabase-profiles-table.sql` - Original profiles migration
- `supabase-profiles-table-simple.sql` - Version without RLS
- `supabase-profiles-table-fixed.sql` - Version with fixed RLS

**Why archived?**
- These were experiments with the profiles table only
- They had RLS issues that were resolved
- The new migrations are clean, organized, and comprehensive

---

## Database Schema Diagram

```
auth.users (Supabase managed)
    ↓ 1:1
profiles
    ↓ 1:many
┌─────────────┐
│   groups    │
│  (admin_id) │
└──────┬──────┘
       │
       ↓ many:many
group_members ←─ 1:many ─ predictions
       ↑                      ↓
       │                  matches
       └──────────────────── ↑
                              │
                          gameweeks
```

---

## Testing Your Setup

After running all migrations:

```bash
# 1. Start dev server
cd frontend
npm start

# 2. Test signup
Open: http://localhost:8100/auth/signup

# 3. Verify in Supabase Dashboard
- Authentication → Users (should see new user)
- Table Editor → profiles (should see profile)

# 4. Test group creation (if group-admin)
- Create a group
- Check groups table for new entry
- Note the 6-character code
```

---

## Troubleshooting

### "relation does not exist" error
→ Table wasn't created. Re-run that migration.

### "RLS policy violation" error
→ Check your user role and RLS policies.

### Profile not created after signup
→ Check INSERT policy on profiles table.

### Group code not generated
→ Re-run migration 004 (includes `generate_group_code()` function).

**📖 See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed troubleshooting.**

---

## Next Steps

1. ✅ Run all 6 migrations in order
2. ✅ Test signup and login
3. ✅ Configure email templates (Supabase Dashboard)
4. ✅ Enable database backups
5. 📋 Continue with Phase 6 of [TODO.md](/TODO.md) (Backend Integration)

---

## Resources

- **Setup Guide**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Supabase Docs**: https://supabase.com/docs
- **Project TODO**: [/TODO.md](/TODO.md)
- **Type Definitions**: [frontend/src/app/services/supabase.service.ts](/frontend/src/app/services/supabase.service.ts)

---

_Last Updated: 2026-01-05_
_Schema Version: 1.0.0 (MVP V1 Simplified)_
