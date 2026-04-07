-- ============================================================================
-- Migration: 005_group_members_table
-- Description: Group membership and member statistics
-- Created: 2026-01-05
-- Dependencies: 001_profiles_table, 004_groups_table
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE: group_members
-- ----------------------------------------------------------------------------
-- Stores group membership (many-to-many between users and groups) and
-- tracks member statistics including points, accuracy, and joker usage.

CREATE TABLE IF NOT EXISTS public.group_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    total_points INTEGER DEFAULT 0,
    gameweeks_played INTEGER DEFAULT 0,
    correct_scores INTEGER DEFAULT 0,
    correct_results INTEGER DEFAULT 0,
    jokers_used INTEGER DEFAULT 0 CHECK (jokers_used BETWEEN 0 AND 2),
    first_joker_gameweek INTEGER,
    second_joker_gameweek INTEGER,
    is_active BOOLEAN DEFAULT TRUE, -- Can be deactivated by admin
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(group_id, user_id) -- One membership per user per group
);

-- ----------------------------------------------------------------------------
-- INDEXES
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_group_members_group ON public.group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_user ON public.group_members(user_id);
CREATE INDEX IF NOT EXISTS idx_group_members_points ON public.group_members(group_id, total_points DESC);
CREATE INDEX IF NOT EXISTS idx_group_members_active ON public.group_members(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_group_members_jokers ON public.group_members(jokers_used);

-- ----------------------------------------------------------------------------
-- COMMENTS
-- ----------------------------------------------------------------------------
COMMENT ON TABLE public.group_members IS 'Group membership and member statistics';
COMMENT ON COLUMN public.group_members.total_points IS 'Total points earned in this group';
COMMENT ON COLUMN public.group_members.jokers_used IS 'Number of jokers used (max 2 per season)';
COMMENT ON COLUMN public.group_members.first_joker_gameweek IS 'Gameweek number when first joker was used';
COMMENT ON COLUMN public.group_members.second_joker_gameweek IS 'Gameweek number when second joker was used';
COMMENT ON COLUMN public.group_members.is_active IS 'Admins can deactivate members (they remain in group but cannot participate)';

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- ----------------------------------------------------------------------------
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;

-- Users can view members of their groups
CREATE POLICY "Users can view group members" ON public.group_members
    FOR SELECT USING (
        auth.uid() IN (
            SELECT user_id FROM public.group_members WHERE group_id = group_members.group_id
        )
    );

-- Users can join groups (insert themselves)
CREATE POLICY "Users can join groups" ON public.group_members
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can leave groups (delete themselves), but admins cannot leave their own group
CREATE POLICY "Users can leave groups" ON public.group_members
    FOR DELETE USING (
        auth.uid() = user_id
        AND NOT EXISTS (
            SELECT 1 FROM public.groups
            WHERE id = group_id AND admin_id = auth.uid()
        )
    );

-- Group admins can update member stats (for scoring)
CREATE POLICY "Group admins can update members" ON public.group_members
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.groups
            WHERE id = group_id AND admin_id = auth.uid()
        )
    );

-- Group admins can remove members
CREATE POLICY "Group admins can remove members" ON public.group_members
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.groups
            WHERE id = group_id AND admin_id = auth.uid()
        )
    );

-- Super admins can manage all group members
CREATE POLICY "Super admins can manage all group members" ON public.group_members
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'super-admin'
        )
    );

-- ----------------------------------------------------------------------------
-- TRIGGERS
-- ----------------------------------------------------------------------------
CREATE TRIGGER handle_group_members_updated_at
    BEFORE UPDATE ON public.group_members
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- FUNCTIONS
-- ----------------------------------------------------------------------------
-- Function to auto-increment group member count when a member joins
CREATE OR REPLACE FUNCTION public.increment_group_member_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.groups
    SET current_members = current_members + 1,
        updated_at = NOW()
    WHERE id = NEW.group_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to auto-decrement group member count when a member leaves
CREATE OR REPLACE FUNCTION public.decrement_group_member_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.groups
    SET current_members = current_members - 1,
        updated_at = NOW()
    WHERE id = OLD.group_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Triggers for auto-updating member counts
CREATE TRIGGER increment_member_count_on_join
    AFTER INSERT ON public.group_members
    FOR EACH ROW
    EXECUTE FUNCTION public.increment_group_member_count();

CREATE TRIGGER decrement_member_count_on_leave
    AFTER DELETE ON public.group_members
    FOR EACH ROW
    EXECUTE FUNCTION public.decrement_group_member_count();

-- ----------------------------------------------------------------------------
-- PERMISSIONS
-- ----------------------------------------------------------------------------
GRANT SELECT, INSERT, UPDATE, DELETE ON public.group_members TO authenticated;
GRANT ALL ON public.group_members TO service_role;

-- ============================================================================
-- Migration Complete: group_members table
-- ============================================================================
