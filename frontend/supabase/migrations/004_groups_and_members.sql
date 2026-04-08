-- ============================================================================
-- Combined Migration: 004 (groups) + 005 (group_members)
-- Run this INSTEAD of 004 and 005 separately (circular dependency)
-- ============================================================================

-- ============================================================================
-- STEP 1: Create groups table (WITHOUT RLS policies that reference group_members)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    admin_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    season_year TEXT NOT NULL,
    max_members INTEGER DEFAULT 100,
    current_members INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    rules TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT valid_member_count CHECK (current_members <= max_members AND current_members >= 0),
    CONSTRAINT valid_code_format CHECK (code ~ '^[A-Z0-9]{6}$')
);

CREATE INDEX IF NOT EXISTS idx_groups_code ON public.groups(code);
CREATE INDEX IF NOT EXISTS idx_groups_admin ON public.groups(admin_id);
CREATE INDEX IF NOT EXISTS idx_groups_active ON public.groups(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_groups_season ON public.groups(season_year);

COMMENT ON TABLE public.groups IS 'Prediction groups (simplified - no prize money)';
COMMENT ON COLUMN public.groups.code IS '6-character alphanumeric code for joining';
COMMENT ON COLUMN public.groups.current_members IS 'Auto-maintained by triggers on group_members';

-- Group code generator function
CREATE OR REPLACE FUNCTION public.generate_group_code()
RETURNS TEXT AS $$
DECLARE
    new_code TEXT;
    code_exists BOOLEAN;
    chars TEXT := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
BEGIN
    LOOP
        new_code := '';
        FOR i IN 1..6 LOOP
            new_code := new_code || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
        END LOOP;
        SELECT EXISTS(SELECT 1 FROM public.groups WHERE code = new_code) INTO code_exists;
        EXIT WHEN NOT code_exists;
    END LOOP;
    RETURN new_code;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION public.generate_group_code() IS 'Generates unique 6-character alphanumeric group codes (excludes I, O, 0, 1, L for clarity)';

CREATE TRIGGER handle_groups_updated_at
    BEFORE UPDATE ON public.groups
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

GRANT SELECT, INSERT, UPDATE, DELETE ON public.groups TO authenticated;
GRANT ALL ON public.groups TO service_role;

-- ============================================================================
-- STEP 2: Create group_members table (references groups)
-- ============================================================================

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
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(group_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_group_members_group ON public.group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_user ON public.group_members(user_id);
CREATE INDEX IF NOT EXISTS idx_group_members_points ON public.group_members(total_points DESC);
CREATE INDEX IF NOT EXISTS idx_group_members_active ON public.group_members(is_active) WHERE is_active = TRUE;

COMMENT ON TABLE public.group_members IS 'Group membership with player stats';
COMMENT ON COLUMN public.group_members.jokers_used IS 'Number of jokers used (max 2 per season)';
COMMENT ON COLUMN public.group_members.first_joker_gameweek IS 'Gameweek number where first joker was used';
COMMENT ON COLUMN public.group_members.second_joker_gameweek IS 'Gameweek number where second joker was used';

-- Helper function: check if user is a member of a group (bypasses RLS to avoid recursion)
CREATE OR REPLACE FUNCTION public.is_group_member(check_group_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.group_members
    WHERE group_id = check_group_id AND user_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;

-- Users can view members of groups they belong to
CREATE POLICY "Users can view group members" ON public.group_members
    FOR SELECT USING (public.is_group_member(group_id));

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
            WHERE id = group_members.group_id AND admin_id = auth.uid()
        )
    );

-- Group admins can remove members
CREATE POLICY "Group admins can remove members" ON public.group_members
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.groups
            WHERE id = group_members.group_id AND admin_id = auth.uid()
        )
    );

-- Super admins can manage all members
CREATE POLICY "Super admins can manage members" ON public.group_members
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'super-admin'
        )
    );

-- Auto-increment member count on join
CREATE OR REPLACE FUNCTION public.increment_member_count_on_join()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.groups
    SET current_members = current_members + 1
    WHERE id = NEW.group_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER increment_member_count_on_join
    AFTER INSERT ON public.group_members
    FOR EACH ROW
    EXECUTE FUNCTION public.increment_member_count_on_join();

-- Auto-decrement member count on leave
CREATE OR REPLACE FUNCTION public.decrement_member_count_on_leave()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.groups
    SET current_members = GREATEST(current_members - 1, 0)
    WHERE id = OLD.group_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER decrement_member_count_on_leave
    AFTER DELETE ON public.group_members
    FOR EACH ROW
    EXECUTE FUNCTION public.decrement_member_count_on_leave();

CREATE TRIGGER handle_group_members_updated_at
    BEFORE UPDATE ON public.group_members
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

GRANT SELECT, INSERT, UPDATE, DELETE ON public.group_members TO authenticated;
GRANT ALL ON public.group_members TO service_role;

-- ============================================================================
-- STEP 3: Now add RLS policies on groups that reference group_members
-- ============================================================================

ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;

-- Users can view groups they're members of
CREATE POLICY "Users can view their groups" ON public.groups
    FOR SELECT USING (
        public.is_group_member(id) OR auth.uid() = admin_id
    );

-- Group admins and super admins can create groups
CREATE POLICY "Group admins can create groups" ON public.groups
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role IN ('group-admin', 'super-admin')
        )
    );

-- Group admins can update their own groups
CREATE POLICY "Group admins can update own groups" ON public.groups
    FOR UPDATE USING (auth.uid() = admin_id);

-- Group admins can delete their own groups
CREATE POLICY "Group admins can delete own groups" ON public.groups
    FOR DELETE USING (auth.uid() = admin_id);

-- Super admins can manage all groups
CREATE POLICY "Super admins can manage all groups" ON public.groups
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'super-admin'
        )
    );

-- ============================================================================
-- Combined Migration Complete: groups + group_members
-- ============================================================================
