# Console Issues Debug Guide

## Issues Identified and Fixed

### 1. NavigatorLockAcquireTimeoutError
**Problem**: Browser lock timeout with Supabase's auth token management
**Solution**: 
- Added retry mechanism with exponential backoff in `signUp` method
- Added `clearAuthLocks()` method in AuthService
- Added debug button in signup page to clear locks manually

### 2. Profile Loading Errors (406 status)
**Problem**: Service tries to load profile that doesn't exist yet during signup
**Solution**:
- Modified `loadUserProfile()` to handle PGRST116 error gracefully
- Added proper null handling for missing profiles
- Profile creation now checks for existing profiles before creating

### 3. Profile Creation During Signup
**Problem**: Profile creation was failing silently
**Solution**:
- Enhanced `createProfile()` with duplicate key handling
- Added proper error handling for profile creation
- Profile creation now continues signup flow even if it fails

## Debug Buttons Added

### Signup Page
- **Enable Supabase for Testing**: Enables Supabase auth mode
- **Clear Auth Locks**: Clears browser locks and Supabase session

## How to Test

1. **Enable Supabase**: Click "Enable Supabase for Testing" button
2. **Clear Locks**: If you see NavigatorLockAcquireTimeoutError, click "Clear Auth Locks"
3. **Try Signup**: Fill out the form and submit
4. **Check Console**: Look for improved error messages and retry attempts

## Expected Console Output

### Successful Signup:
```
🔧 SupabaseService: Starting signUp...
🔧 SupabaseService: Signup attempt 1/3...
✅ SupabaseService: Auth signup successful
🔧 SupabaseService: Creating profile for user: [user-id]
✅ SupabaseService: Profile created successfully
✅ SupabaseService: SignUp completed successfully
```

### Profile Not Found (Normal during signup):
```
ℹ️ User profile not found yet, this is normal during signup
```

### Lock Error with Retry:
```
⏳ SupabaseService: Navigator lock timeout, waiting before retry...
🔧 SupabaseService: Signup attempt 2/3...
```

## Troubleshooting

### If signup still fails:
1. Click "Clear Auth Locks" button
2. Refresh the page
3. Try signup again

### If profile creation fails:
- This is handled gracefully - user account is still created
- Profile can be created later during first login

### If you see 406 errors:
- These are now handled gracefully
- Profile loading will retry automatically

