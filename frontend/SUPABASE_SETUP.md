# Supabase Database Setup

## Issue
The signup process is hanging because the `public.profiles` table doesn't exist in your Supabase database. This table is required for storing user profile information after successful authentication.

## Solution
Run the SQL script `supabase-profiles-table.sql` in your Supabase SQL Editor.

## Steps to Fix

### 1. Access Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor** section

### 2. Run the SQL Script
1. Copy the contents of `supabase-profiles-table.sql`
2. Paste it into the SQL Editor
3. Click **Run** to execute the script

### 3. Verify the Table
After running the script, you should see:
- A new `profiles` table in your database
- Proper indexes for performance
- Row Level Security (RLS) policies
- Automatic timestamp updates

## What the Script Creates

### Table Structure
- `id`: UUID (references auth.users.id)
- `email`: User's email address
- `role`: User role (super-admin, group-admin, player)
- `username`: Unique username
- `first_name`: User's first name
- `last_name`: User's last name
- `avatar_url`: Optional avatar URL
- `created_at`: Timestamp when profile was created
- `updated_at`: Timestamp when profile was last updated
- `first_login`: Boolean flag for first-time users

### Security Features
- Row Level Security (RLS) enabled
- Users can only access their own profiles
- Super admins can access all profiles
- Automatic timestamp updates

## After Running the Script
1. Try signing up again
2. The signup process should complete successfully
3. Users will be redirected to the login page after account creation

## Troubleshooting
If you encounter any issues:
1. Check the Supabase logs for any SQL errors
2. Ensure your Supabase project has the correct permissions
3. Verify that the `auth.users` table exists (it should by default) 