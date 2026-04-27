-- ============================================================================
-- Migration: 014_auto_create_profile_on_signup
-- Description: Auto-creates public.profiles row when a new auth.users row is
--              inserted, using metadata from the signUp() options.data payload.
--
-- Problem:
--   With Supabase "Confirm email" = ON, supabase.auth.signUp() returns the
--   created user but NO session. The client code then tries to INSERT into
--   public.profiles, but the RLS policy "Users can insert own profile"
--   requires auth.uid() = id — which is NULL when no session exists.
--   Result: every signup throws "new row violates row-level security policy
--   for table 'profiles'" and the auth.users row is orphaned.
--
-- Solution:
--   A SECURITY DEFINER trigger on auth.users AFTER INSERT creates the
--   profile row server-side (bypassing RLS). The client no longer needs to
--   create the profile; it only calls auth.signUp() with metadata on
--   options.data, which the trigger reads from raw_user_meta_data.
--
--   The trigger is idempotent via ON CONFLICT (id) DO NOTHING so a stale
--   client-side INSERT attempt (if any) or a retried signup on an existing
--   auth.users row cannot cause cascading failures.
--
--   Covers both email/password signup and OAuth (Google). For OAuth the
--   metadata may not contain role/username/name fields, so we fall back to
--   'player' role and derive a username from the email local-part.
-- Created: 2026-04-24
-- Dependencies: 001_profiles_table.sql
-- ============================================================================

-- ----------------------------------------------------------------------------
-- FUNCTION: public.handle_new_user()
-- ----------------------------------------------------------------------------
-- Runs AFTER INSERT on auth.users. Creates matching profiles row.
-- SECURITY DEFINER so it runs with owner privileges and bypasses RLS.
-- search_path is pinned to public to prevent search_path-based attacks
-- (a SECURITY DEFINER function with an unpinned search_path is a classic
-- privilege-escalation vector).

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role TEXT;
  v_username TEXT;
  v_first_name TEXT;
  v_last_name TEXT;
BEGIN
  -- Pull metadata from raw_user_meta_data (populated by signUp's options.data).
  v_role := COALESCE(NEW.raw_user_meta_data->>'role', 'player');
  v_username := COALESCE(
    NULLIF(NEW.raw_user_meta_data->>'username', ''),
    split_part(NEW.email, '@', 1)
  );
  v_first_name := COALESCE(NEW.raw_user_meta_data->>'first_name', '');
  v_last_name := COALESCE(NEW.raw_user_meta_data->>'last_name', '');

  -- Guard against a client sending role='super-admin' via metadata —
  -- only allow the two self-service roles. Super-admin elevation must
  -- go through SQL by a human DBA (or the future admin RPC).
  IF v_role NOT IN ('group-admin', 'player') THEN
    v_role := 'player';
  END IF;

  INSERT INTO public.profiles (
    id, email, username, first_name, last_name, role, first_login
  )
  VALUES (
    NEW.id,
    NEW.email,
    v_username,
    v_first_name,
    v_last_name,
    v_role,
    true
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.handle_new_user() IS
  'Auto-creates public.profiles row from auth.users metadata on signup. '
  'SECURITY DEFINER bypasses RLS. Caps role at group-admin/player to '
  'prevent metadata-based super-admin elevation.';

-- ----------------------------------------------------------------------------
-- TRIGGER: on_auth_user_created
-- ----------------------------------------------------------------------------
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- Migration Complete: auto-create profile on signup
-- ============================================================================
