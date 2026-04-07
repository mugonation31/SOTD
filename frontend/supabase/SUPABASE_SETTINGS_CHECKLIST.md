# Supabase Settings Checklist

**Project:** Predict3 MVP V1
**Supabase URL:** https://zsoevdobcpgacrvgqlkx.supabase.co
**Status:** Migrations complete, now configuring settings as needed

---

## ✅ Completed

- [x] **API Keys** - Updated in environment.ts
- [x] **Database Schema** - All 6 migrations run
- [x] **Row Level Security** - Enabled on all tables

---

## 🔧 Settings to Configure (As Needed)

### 1. Auth Settings ⚠️ HIGH PRIORITY

**When:** Before testing signup/login
**Where:** Dashboard → Authentication → Settings

#### Email Auth (REQUIRED)
- [x] **Email provider** - Already configured (uses Supabase default)
- [ ] **Email templates** - Customize confirmation emails
  - Confirmation email (signup)
  - Reset password email
  - Magic link email (if used)
  - Change email confirmation

#### Email Template Customization (OPTIONAL)
```
Dashboard → Authentication → Email Templates
```
- [ ] Update "Confirm signup" email with app branding
- [ ] Update "Reset password" email
- [ ] Add app logo and colors
- [ ] Test by signing up a user

#### Auth Configuration
```
Dashboard → Authentication → Settings → Site URL
```
- [ ] **Site URL:** Set to your app URL (e.g., `http://localhost:8100` for dev)
- [ ] **Redirect URLs:** Add allowed redirect URLs
  - `http://localhost:8100/**` (dev)
  - `https://your-domain.com/**` (production)
  - `io.ionic.starter://**` (mobile deep links)

#### Email Rate Limiting
```
Dashboard → Authentication → Rate Limits
```
- [ ] Review default rate limits (usually fine for MVP)
- [ ] Adjust if needed for testing

---

### 2. Realtime Settings 🟡 MEDIUM PRIORITY

**When:** When you need live updates (leaderboards, match scores)
**Where:** Dashboard → Database → Replication

#### For MVP V1, you'll need Realtime for:
- [ ] **Live match scores** - Update scores in real-time
- [ ] **Leaderboard updates** - See points update live
- [ ] **Group member changes** - New members joining

#### Enable Realtime on Tables:
```
Dashboard → Database → Tables → [table] → Enable Realtime
```
- [ ] `matches` - For live score updates
- [ ] `predictions` - (Optional) For seeing submissions
- [ ] `group_members` - (Optional) For member tracking
- [ ] `gameweeks` - (Optional) For deadline countdowns

**Note:** Realtime has costs - only enable on tables you actually need live updates for!

---

### 3. Database Extensions 🟢 LOW PRIORITY

**When:** As features require them
**Where:** Dashboard → Database → Extensions

#### Currently Enabled by Default:
- [x] `uuid-ossp` - For UUID generation
- [x] `pg_stat_statements` - For query performance

#### May Need Later:
- [ ] **pgcrypto** - For additional encryption (if needed)
- [ ] **pg_cron** - For scheduled jobs (e.g., lock predictions after deadline)
- [ ] **postgis** - If adding location features (probably not needed)

#### For Predict3, consider enabling:
```sql
-- pg_cron for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Example: Lock predictions every hour after deadline
SELECT cron.schedule(
  'lock-predictions',
  '0 * * * *', -- Every hour
  $$SELECT public.lock_predictions_after_deadline()$$
);
```

---

### 4. Edge Functions ⚪ NOT NEEDED YET

**When:** When you need server-side logic
**Where:** Dashboard → Edge Functions

#### Potential Future Uses:
- [ ] **Score Calculation** - Auto-calculate points when match completes
- [ ] **EPL API Integration** - Fetch match data on schedule
- [ ] **Notifications** - Send push notifications
- [ ] **Webhooks** - Handle external events

**For MVP V1:** Not required. Can use client-side logic initially.

---

### 5. Storage (Files) ⚪ NOT NEEDED YET

**When:** When users upload avatars, images, etc.
**Where:** Dashboard → Storage

#### For Future:
- [ ] Create bucket for user avatars
- [ ] Create bucket for team logos
- [ ] Set up RLS policies for storage

**For MVP V1:** Not required. Using avatar URLs only.

---

### 6. Database Backups ⚠️ HIGH PRIORITY (Production)

**When:** Before going to production
**Where:** Dashboard → Settings → Database → Backups

- [ ] **Enable automatic backups** - Daily recommended
- [ ] **Test restore process** - Make sure you can recover
- [ ] **Set retention period** - 7-30 days typical

**For MVP V1 Dev:** Optional, but good practice to enable.

---

### 7. Security Settings 🟡 MEDIUM PRIORITY

**When:** Before public launch
**Where:** Dashboard → Settings → Security

#### Email Domain Restrictions
- [ ] Restrict signups to specific domains (if needed)
- [ ] Enable/disable anonymous signups

#### Password Settings
- [ ] Minimum password length (default: 6, consider 8+)
- [ ] Password requirements (uppercase, numbers, symbols)

#### Rate Limiting
- [ ] Review and adjust rate limits
- [ ] Set up CAPTCHA for signup (if spam is a concern)

---

## 🎯 Immediate Actions (Before Testing)

Do these NOW before running `npm start`:

### 1. Email Templates (5 minutes)
```
Dashboard → Authentication → Email Templates → Confirm signup
```

Update the confirmation email:
- Change subject: "Welcome to Predict3!"
- Update body with app branding
- Test by signing up

### 2. Site URL Configuration (2 minutes)
```
Dashboard → Authentication → Settings → URL Configuration
```

Add:
- Site URL: `http://localhost:8100`
- Redirect URLs: `http://localhost:8100/**`

### 3. Test Auth Flow (5 minutes)
```bash
cd frontend
npm start
# Try signup → check email → confirm → login
```

---

## 📋 Testing Checklist

After migrations, test these:

- [ ] **Signup** - Create a test user
- [ ] **Email confirmation** - Check email arrives
- [ ] **Login** - Log in with confirmed user
- [ ] **Profile creation** - Check profiles table populated
- [ ] **Group creation** - Create a test group (if group-admin)
- [ ] **Group joining** - Join with group code
- [ ] **Predictions** - Submit a prediction (after adding matches)

---

## 🚀 What's Next?

**Order of operations:**

1. ✅ Run all 6 migrations (DO THIS NOW)
2. ⚠️ Configure Auth settings (before testing)
3. 🧪 Test signup/login flow
4. 📊 Seed initial data (gameweeks, matches)
5. 🎮 Test full app flow
6. 🔄 Enable Realtime (when needed)
7. ⚡ Add Edge Functions (when needed)
8. 🎉 Launch MVP V1!

---

## 📝 Notes

### What We're NOT Using (For MVP V1 Simplification)

- ❌ Payment integrations (no prize money)
- ❌ SMS auth (email only)
- ❌ Social auth (Google, Facebook, etc.)
- ❌ Magic links (password auth only)
- ❌ File storage (avatar URLs only)

### What We ARE Using

- ✅ Email/password auth
- ✅ Row Level Security
- ✅ PostgreSQL database
- ✅ Email confirmations
- ✅ Password reset flow
- ✅ (Future) Realtime subscriptions
- ✅ (Future) Edge Functions for scoring

---

## 🐛 Common Issues

### "Email not sent"
- Check Supabase email limits (development plans have limits)
- Verify email templates are configured
- Check spam folder

### "Redirect URL not allowed"
- Add your URL to allowed redirect URLs
- Use exact match (including port number)

### "RLS policy violation"
- Check policies are created (should be from migrations)
- Verify user role is correct

---

_Focus on migrations first, then we'll tackle settings as needed!_
