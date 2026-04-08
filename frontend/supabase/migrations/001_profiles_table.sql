-- ============================================================================
-- Migration: 001_profiles_table
-- Description: User profiles extending Supabase auth.users
-- Created: 2026-01-05
-- Dependencies: auth.users (Supabase built-in)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE: profiles
-- ----------------------------------------------------------------------------
-- Stores user profile information extending the built-in auth.users table.
-- Each user in auth.users MUST have a corresponding profile.

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('super-admin', 'group-admin', 'player')),
    username TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    first_login BOOLEAN DEFAULT TRUE
);

-- ----------------------------------------------------------------------------
-- INDEXES
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- ----------------------------------------------------------------------------
-- COMMENTS
-- ----------------------------------------------------------------------------
COMMENT ON TABLE public.profiles IS 'User profile data extending auth.users';
COMMENT ON COLUMN public.profiles.id IS 'Foreign key to auth.users.id';
COMMENT ON COLUMN public.profiles.role IS 'User role: super-admin, group-admin, or player';
COMMENT ON COLUMN public.profiles.first_login IS 'Flag to show welcome screen on first login';

-- ----------------------------------------------------------------------------
-- HELPER FUNCTION (bypasses RLS to check role without recursion)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'super-admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- ----------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile (but NOT their role)
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id)
    WITH CHECK (role = (SELECT role FROM public.profiles WHERE id = auth.uid()));

-- Users can insert their own profile (during signup)
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Super admins can view all profiles (uses SECURITY DEFINER function to avoid recursion)
CREATE POLICY "Super admins can view all profiles" ON public.profiles
    FOR SELECT USING (public.is_super_admin());

-- Super admins can update all profiles
CREATE POLICY "Super admins can update all profiles" ON public.profiles
    FOR UPDATE USING (public.is_super_admin());

-- Super admins can delete profiles
CREATE POLICY "Super admins can delete profiles" ON public.profiles
    FOR DELETE USING (public.is_super_admin());

-- ----------------------------------------------------------------------------
-- TRIGGERS
-- ----------------------------------------------------------------------------
-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to profiles table
CREATE TRIGGER handle_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- PERMISSIONS
-- ----------------------------------------------------------------------------
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- ============================================================================
-- Migration Complete: profiles table
-- ============================================================================
