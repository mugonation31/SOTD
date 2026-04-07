-- ============================================================================
-- Migration: 002_gameweeks_table
-- Description: Premier League gameweek schedule and deadlines
-- Created: 2026-01-05
-- Dependencies: None
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE: gameweeks
-- ----------------------------------------------------------------------------
-- Stores Premier League gameweek information including deadlines and special
-- gameweeks (Boxing Day and Final Day with 10 matches each).

CREATE TABLE IF NOT EXISTS public.gameweeks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gameweek_number INTEGER NOT NULL UNIQUE,
    season_year TEXT NOT NULL, -- e.g., "2024-25"
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    deadline TIMESTAMP WITH TIME ZONE NOT NULL, -- Prediction deadline (1 hour before first match)
    is_special BOOLEAN DEFAULT FALSE, -- Boxing Day, Final Day
    special_type TEXT CHECK (special_type IN ('boxing-day', 'final-day', NULL)),
    is_active BOOLEAN DEFAULT FALSE, -- Currently active gameweek
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT valid_gameweek_number CHECK (gameweek_number BETWEEN 1 AND 38)
);

-- ----------------------------------------------------------------------------
-- INDEXES
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_gameweeks_number ON public.gameweeks(gameweek_number);
CREATE INDEX IF NOT EXISTS idx_gameweeks_active ON public.gameweeks(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_gameweeks_season ON public.gameweeks(season_year);
CREATE INDEX IF NOT EXISTS idx_gameweeks_special ON public.gameweeks(is_special) WHERE is_special = TRUE;

-- ----------------------------------------------------------------------------
-- COMMENTS
-- ----------------------------------------------------------------------------
COMMENT ON TABLE public.gameweeks IS 'Premier League gameweek schedule and deadlines';
COMMENT ON COLUMN public.gameweeks.deadline IS 'Predictions must be submitted before this time';
COMMENT ON COLUMN public.gameweeks.is_special IS 'TRUE for Boxing Day (10 matches) and Final Day (10 matches)';
COMMENT ON COLUMN public.gameweeks.special_type IS 'Identifies Boxing Day or Final Day gameweeks';
COMMENT ON COLUMN public.gameweeks.is_active IS 'Only one gameweek should be active at a time';

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- ----------------------------------------------------------------------------
ALTER TABLE public.gameweeks ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read gameweeks
CREATE POLICY "Authenticated users can read gameweeks" ON public.gameweeks
    FOR SELECT TO authenticated USING (true);

-- Only super admins can create/update/delete gameweeks
CREATE POLICY "Super admins can manage gameweeks" ON public.gameweeks
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'super-admin'
        )
    );

-- ----------------------------------------------------------------------------
-- TRIGGERS
-- ----------------------------------------------------------------------------
CREATE TRIGGER handle_gameweeks_updated_at
    BEFORE UPDATE ON public.gameweeks
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- PERMISSIONS
-- ----------------------------------------------------------------------------
GRANT SELECT ON public.gameweeks TO authenticated;
GRANT ALL ON public.gameweeks TO service_role;

-- ============================================================================
-- Migration Complete: gameweeks table
-- ============================================================================
