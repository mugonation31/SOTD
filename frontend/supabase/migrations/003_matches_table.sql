-- ============================================================================
-- Migration: 003_matches_table
-- Description: Premier League match fixtures and results
-- Created: 2026-01-05
-- Dependencies: 002_gameweeks_table
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE: matches
-- ----------------------------------------------------------------------------
-- Stores Premier League match fixtures, live updates, and final results.

CREATE TABLE IF NOT EXISTS public.matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gameweek_id UUID NOT NULL REFERENCES public.gameweeks(id) ON DELETE CASCADE,
    gameweek_number INTEGER NOT NULL, -- Denormalized for quick queries
    home_team TEXT NOT NULL,
    away_team TEXT NOT NULL,
    home_team_logo TEXT,
    away_team_logo TEXT,
    kickoff_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'completed', 'cancelled')),
    home_score INTEGER,
    away_score INTEGER,
    season_year TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT valid_scores CHECK (
        (status = 'completed' AND home_score IS NOT NULL AND away_score IS NOT NULL) OR
        (status != 'completed')
    )
);

-- ----------------------------------------------------------------------------
-- INDEXES
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_matches_gameweek ON public.matches(gameweek_id);
CREATE INDEX IF NOT EXISTS idx_matches_gameweek_number ON public.matches(gameweek_number);
CREATE INDEX IF NOT EXISTS idx_matches_status ON public.matches(status);
CREATE INDEX IF NOT EXISTS idx_matches_kickoff ON public.matches(kickoff_time);
CREATE INDEX IF NOT EXISTS idx_matches_season ON public.matches(season_year);
CREATE INDEX IF NOT EXISTS idx_matches_teams ON public.matches(home_team, away_team);

-- ----------------------------------------------------------------------------
-- COMMENTS
-- ----------------------------------------------------------------------------
COMMENT ON TABLE public.matches IS 'Premier League match fixtures and results';
COMMENT ON COLUMN public.matches.gameweek_number IS 'Denormalized from gameweeks for performance';
COMMENT ON COLUMN public.matches.status IS 'Match status: scheduled, live, completed, or cancelled';
COMMENT ON COLUMN public.matches.home_score IS 'Final score (NULL until match is completed)';
COMMENT ON COLUMN public.matches.away_score IS 'Final score (NULL until match is completed)';

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- ----------------------------------------------------------------------------
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read matches
CREATE POLICY "Authenticated users can read matches" ON public.matches
    FOR SELECT TO authenticated USING (true);

-- Only super admins can create/update/delete matches
CREATE POLICY "Super admins can manage matches" ON public.matches
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'super-admin'
        )
    );

-- ----------------------------------------------------------------------------
-- TRIGGERS
-- ----------------------------------------------------------------------------
CREATE TRIGGER handle_matches_updated_at
    BEFORE UPDATE ON public.matches
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- PERMISSIONS
-- ----------------------------------------------------------------------------
GRANT SELECT ON public.matches TO authenticated;
GRANT ALL ON public.matches TO service_role;

-- ============================================================================
-- Migration Complete: matches table
-- ============================================================================
