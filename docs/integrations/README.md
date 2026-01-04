# Integrations Documentation

Third-party services, APIs, and external integrations.

## Active Integrations

### Supabase
- **Purpose:** Backend as a Service (Database + Auth + Storage)
- **Version:** 2.50.3
- **Documentation:** [Supabase Docs](https://supabase.com/docs)

### Capacitor
- **Purpose:** Native mobile runtime
- **Version:** 6.2.0
- **Documentation:** [Capacitor Docs](https://capacitorjs.com/docs)

## Supabase Integration

### Configuration

**Project Details:**
- URL: `https://lmybyfrhzarxmantttki.supabase.co`
- Environment: Production
- Region: [Your region]

**Setup:**
```typescript
// frontend/src/app/services/supabase.service.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = environment.supabaseUrl;
const supabaseKey = environment.supabaseAnonKey;

this.supabase = createClient(supabaseUrl, supabaseKey);
```

### Features Used

**Authentication:**
- Email/password authentication
- Password reset via email
- Session management
- JWT token handling

**Database:**
- PostgreSQL with Row Level Security
- Real-time subscriptions (optional)
- Complex queries with joins

**Storage:**
- Not currently used
- Available for future file uploads

### Database Schema

**Tables:**
- `auth.users` - Supabase managed auth table
- `public.profiles` - User profile data

**RLS Policies:**
```sql
-- Users can read their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);
```

### API Usage

**Authentication:**
```typescript
// Sign up
const { data, error } = await this.supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
});

// Sign in
const { data, error } = await this.supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

// Sign out
await this.supabase.auth.signOut();
```

**Database Queries:**
```typescript
// Select
const { data, error } = await this.supabase
  .from('profiles')
  .select('*')
  .eq('id', userId);

// Insert
const { data, error } = await this.supabase
  .from('profiles')
  .insert({ ...profileData });

// Update
const { data, error } = await this.supabase
  .from('profiles')
  .update({ first_name: 'John' })
  .eq('id', userId);
```

## Capacitor Integration

### Plugins Used

**Core Plugins:**
- `@capacitor/app` - App lifecycle events
- `@capacitor/keyboard` - Keyboard control
- `@capacitor/preferences` - Native storage
- `@capacitor/status-bar` - Status bar styling
- `@capacitor/haptics` - Haptic feedback

### Configuration

```typescript
// capacitor.config.ts
const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Predict3',
  webDir: 'www',
  bundledWebRuntime: false
};
```

### Platform-Specific Code

```typescript
import { Capacitor } from '@capacitor/core';

// Check platform
if (Capacitor.isNativePlatform()) {
  // Native code
} else {
  // Web code
}

// Check specific platform
if (Capacitor.getPlatform() === 'ios') {
  // iOS specific
} else if (Capacitor.getPlatform() === 'android') {
  // Android specific
}
```

### Storage Example

```typescript
import { Preferences } from '@capacitor/preferences';

// Set value
await Preferences.set({
  key: 'user',
  value: JSON.stringify(userData)
});

// Get value
const { value } = await Preferences.get({ key: 'user' });
const userData = JSON.parse(value || '{}');

// Remove value
await Preferences.remove({ key: 'user' });
```

## Future Integrations

### Analytics (Planned)
- Google Analytics
- Mixpanel
- or Amplitude

### Error Tracking (Planned)
- Sentry
- or Rollbar

### Push Notifications (Planned)
- Firebase Cloud Messaging
- or OneSignal

### Payment Processing (If needed)
- Stripe
- or PayPal

## Integration Best Practices

### Security
- Never commit API keys to git
- Use environment variables
- Implement rate limiting
- Validate all external data

### Error Handling
```typescript
try {
  const { data, error } = await externalAPI.call();

  if (error) {
    console.error('API Error:', error);
    // Handle gracefully
  }

  return data;
} catch (error) {
  console.error('Unexpected error:', error);
  throw error;
}
```

### Monitoring
- Log all API calls
- Track response times
- Monitor error rates
- Set up alerts for failures

---

_Last Updated: 2026-01-03_
