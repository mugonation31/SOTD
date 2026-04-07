-- ============================================================================
-- Migration: 004_groups_table
-- Description: Prediction groups (SIMPLIFIED - NO PRIZE MONEY)
-- Created: 2026-01-05
-- Dependencies: 001_profiles_table
-- MVP V1 Note: All prize money fields removed. Groups are code-only (no public/private).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE: groups
-- ----------------------------------------------------------------------------
-- Stores prediction groups. All groups are private (code-only joining).
-- NO prize money fields (entry_fee, prize_pool, etc.) - groups handle prizes externally.

CREATE TABLE IF NOT EXISTS public.groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL, -- 6-character code for joining (e.g., ABC123)
    description TEXT,
    admin_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    season_year TEXT NOT NULL,
    max_members INTEGER DEFAULT 100,
    current_members INTEGER DEFAULT 1, -- Admin counts as first member
    is_active BOOLEAN DEFAULT TRUE,
    rules TEXT, -- Optional custom rules set by admin
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT valid_member_count CHECK (current_members <= max_members AND current_members >= 0),
    CONSTRAINT valid_code_format CHECK (code ~ '^[A-Z0-9]{6}$')
);

-- ----------------------------------------------------------------------------
-- INDEXES
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_groups_code ON public.groups(code);
CREATE INDEX IF NOT EXISTS idx_groups_admin ON public.groups(admin_id);
CREATE INDEX IF NOT EXISTS idx_groups_active ON public.groups(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_groups_season ON public.groups(season_year);

-- ----------------------------------------------------------------------------
-- COMMENTS
-- ----------------------------------------------------------------------------
COMMENT ON TABLE public.groups IS 'Prediction groups - MVP V1 simplified (no prize money)';
COMMENT ON COLUMN public.groups.code IS 'Unique 6-character code for joining. All groups are code-only (no discovery).';
COMMENT ON COLUMN public.groups.current_members IS 'Auto-incremented when members join, decremented when they leave';
COMMENT ON COLUMN public.groups.rules IS 'Optional custom rules text set by group admin';

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- ----------------------------------------------------------------------------
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;

-- Users can view groups they're members of
CREATE POLICY "Users can view their groups" ON public.groups
    FOR SELECT USING (
        auth.uid() IN (
            SELECT user_id FROM public.group_members WHERE group_id = id
        )
        OR auth.uid() = admin_id
    );

-- Group admins and super admins can create groups
CREATE POLICY "Group admins can create groups" ON public.groups
    FOR INSERT WITH CHECK (
        auth.uid() = admin_id AND
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role IN ('group-admin', 'super-admin')
        )
    );

-- Group admins can update their own groups
CREATE POLICY "Admins can update their groups" ON public.groups
    FOR UPDATE USING (auth.uid() = admin_id);

-- Group admins can delete their own groups
CREATE POLICY "Admins can delete their groups" ON public.groups
    FOR DELETE USING (auth.uid() = admin_id);

-- Super admins can do anything with groups
CREATE POLICY "Super admins can manage all groups" ON public.groups
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'super-admin'
        )
    );

-- ----------------------------------------------------------------------------
-- TRIGGERS
-- ----------------------------------------------------------------------------
CREATE TRIGGER handle_groups_updated_at
    BEFORE UPDATE ON public.groups
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- UTILITY FUNCTIONS
-- ----------------------------------------------------------------------------
-- Function to generate unique 6-character group codes
CREATE OR REPLACE FUNCTION public.generate_group_code()
RETURNS TEXT AS $$
DECLARE
    chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- Excluding similar looking chars (I, O, 0, 1, L)
    result TEXT := '';
    i INTEGER;
    code_exists BOOLEAN;
BEGIN
    LOOP
        result := '';
        FOR i IN 1..6 LOOP
            result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
        END LOOP;

        -- Check if code already exists
        SELECT EXISTS(SELECT 1 FROM public.groups WHERE code = result) INTO code_exists;

        IF NOT code_exists THEN
            RETURN result;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION public.generate_group_code() IS 'Generates unique 6-character alphanumeric group codes (excludes I, O, 0, 1, L for clarity)';

-- ----------------------------------------------------------------------------
-- PERMISSIONS
-- ----------------------------------------------------------------------------
GRANT SELECT, INSERT, UPDATE, DELETE ON public.groups TO authenticated;
GRANT ALL ON public.groups TO service_role;

-- ============================================================================
-- Migration Complete: groups table (simplified - no prize money)
-- ============================================================================
