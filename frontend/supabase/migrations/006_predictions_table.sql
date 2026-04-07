-- ============================================================================
-- Migration: 006_predictions_table
-- Description: User predictions for matches
-- Created: 2026-01-05
-- Dependencies: 001_profiles_table, 003_matches_table, 002_gameweeks_table
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE: predictions
-- ----------------------------------------------------------------------------
-- Stores user predictions for matches. Predictions are locked after the
-- gameweek deadline and become visible to other group members.

CREATE TABLE IF NOT EXISTS public.predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
    gameweek_id UUID NOT NULL REFERENCES public.gameweeks(id) ON DELETE CASCADE,
    gameweek_number INTEGER NOT NULL, -- Denormalized for quick queries
    home_score INTEGER NOT NULL CHECK (home_score BETWEEN 0 AND 99),
    away_score INTEGER NOT NULL CHECK (away_score BETWEEN 0 AND 99),
    joker_used BOOLEAN DEFAULT FALSE,
    points_earned INTEGER DEFAULT 0,
    is_locked BOOLEAN DEFAULT FALSE, -- Locked after deadline
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, match_id) -- One prediction per user per match
);

-- ----------------------------------------------------------------------------
-- INDEXES
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_predictions_user ON public.predictions(user_id);
CREATE INDEX IF NOT EXISTS idx_predictions_match ON public.predictions(match_id);
CREATE INDEX IF NOT EXISTS idx_predictions_gameweek ON public.predictions(gameweek_id);
CREATE INDEX IF NOT EXISTS idx_predictions_user_gameweek ON public.predictions(user_id, gameweek_number);
CREATE INDEX IF NOT EXISTS idx_predictions_joker ON public.predictions(joker_used) WHERE joker_used = TRUE;
CREATE INDEX IF NOT EXISTS idx_predictions_locked ON public.predictions(is_locked);

-- ----------------------------------------------------------------------------
-- COMMENTS
-- ----------------------------------------------------------------------------
COMMENT ON TABLE public.predictions IS 'User predictions for matches';
COMMENT ON COLUMN public.predictions.gameweek_number IS 'Denormalized from gameweeks for performance';
COMMENT ON COLUMN public.predictions.joker_used IS 'Doubles points for this prediction';
COMMENT ON COLUMN public.predictions.is_locked IS 'Locked after gameweek deadline - prevents changes';
COMMENT ON COLUMN public.predictions.points_earned IS 'Auto-calculated after match completion. Home win correct result: 3pts, Away win: 4pts, Draw: 6pts, Correct score: +3pts additional, Joker doubles per-match points.';

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- ----------------------------------------------------------------------------
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;

-- Users can view their own predictions ALWAYS
CREATE POLICY "Users can view own predictions" ON public.predictions
    FOR SELECT USING (auth.uid() = user_id);

-- Users can view predictions of other group members after deadline
-- (scoped to shared group membership, not any authenticated user)
CREATE POLICY "Users can view group predictions after deadline" ON public.predictions
    FOR SELECT USING (
        -- Can see others' predictions if they share a group AND deadline has passed
        EXISTS (
            SELECT 1 FROM public.group_members gm1
            JOIN public.group_members gm2 ON gm1.group_id = gm2.group_id
            WHERE gm1.user_id = auth.uid()
            AND gm2.user_id = predictions.user_id
        )
        AND EXISTS (
            SELECT 1 FROM public.gameweeks g
            WHERE g.id = predictions.gameweek_id
            AND g.deadline < NOW()
        )
    );

-- Users can create their own predictions BEFORE deadline
CREATE POLICY "Users can create predictions before deadline" ON public.predictions
    FOR INSERT WITH CHECK (
        auth.uid() = user_id AND
        EXISTS (
            SELECT 1 FROM public.gameweeks
            WHERE id = gameweek_id AND deadline > NOW()
        )
    );

-- Users can update their own predictions BEFORE deadline AND if not locked
CREATE POLICY "Users can update predictions before deadline" ON public.predictions
    FOR UPDATE USING (
        auth.uid() = user_id AND
        NOT is_locked AND
        EXISTS (
            SELECT 1 FROM public.gameweeks
            WHERE id = gameweek_id AND deadline > NOW()
        )
    );

-- Super admins can manage all predictions
CREATE POLICY "Super admins can manage all predictions" ON public.predictions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'super-admin'
        )
    );

-- ----------------------------------------------------------------------------
-- TRIGGERS
-- ----------------------------------------------------------------------------
CREATE TRIGGER handle_predictions_updated_at
    BEFORE UPDATE ON public.predictions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- FUNCTIONS
-- ----------------------------------------------------------------------------
-- Function to lock predictions after deadline
CREATE OR REPLACE FUNCTION public.lock_predictions_after_deadline()
RETURNS void AS $$
BEGIN
    UPDATE public.predictions
    SET is_locked = TRUE,
        updated_at = NOW()
    WHERE is_locked = FALSE
    AND gameweek_id IN (
        SELECT id FROM public.gameweeks
        WHERE deadline < NOW() AND is_completed = FALSE
    );
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION public.lock_predictions_after_deadline() IS 'Locks all predictions for gameweeks that have passed their deadline. Should be run periodically (e.g., via cron job).';

-- Function to calculate points for a prediction
-- Scoring:
--   Home win correct result: 3pts
--   Away win correct result: 4pts
--   Draw correct result:     6pts
--   Correct score:          +3pts additional
--   Joker:                  doubles per-match points
-- Note: 3-correct-scores bonus and round-level joker doubling are
--       calculated at gameweek level, not per-match.
CREATE OR REPLACE FUNCTION public.calculate_prediction_points(
    p_prediction_id UUID,
    p_match_home_score INTEGER,
    p_match_away_score INTEGER
)
RETURNS INTEGER AS $$
DECLARE
    v_pred_home_score INTEGER;
    v_pred_away_score INTEGER;
    v_joker_used BOOLEAN;
    v_points INTEGER := 0;
    v_pred_result TEXT;
    v_match_result TEXT;
BEGIN
    -- Get prediction details
    SELECT home_score, away_score, joker_used
    INTO v_pred_home_score, v_pred_away_score, v_joker_used
    FROM public.predictions
    WHERE id = p_prediction_id;

    -- Calculate predicted result
    IF v_pred_home_score > v_pred_away_score THEN
        v_pred_result := 'home_win';
    ELSIF v_pred_home_score < v_pred_away_score THEN
        v_pred_result := 'away_win';
    ELSE
        v_pred_result := 'draw';
    END IF;

    -- Calculate actual result
    IF p_match_home_score > p_match_away_score THEN
        v_match_result := 'home_win';
    ELSIF p_match_home_score < p_match_away_score THEN
        v_match_result := 'away_win';
    ELSE
        v_match_result := 'draw';
    END IF;

    -- Award points for correct result
    IF v_pred_result = v_match_result THEN
        CASE v_match_result
            WHEN 'home_win' THEN v_points := 3;
            WHEN 'away_win' THEN v_points := 4;
            WHEN 'draw'     THEN v_points := 6;
        END CASE;

        -- Additional points for correct score
        IF v_pred_home_score = p_match_home_score AND v_pred_away_score = p_match_away_score THEN
            v_points := v_points + 3;
        END IF;
    END IF;

    -- Double points if joker was used (per-match level)
    IF v_joker_used THEN
        v_points := v_points * 2;
    END IF;

    RETURN v_points;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION public.calculate_prediction_points IS 'Calculates points for a prediction: Home win 3pts, Away win 4pts, Draw 6pts, +3pts for correct score, doubled if joker used';

-- ----------------------------------------------------------------------------
-- PERMISSIONS
-- ----------------------------------------------------------------------------
GRANT SELECT, INSERT, UPDATE ON public.predictions TO authenticated;
GRANT ALL ON public.predictions TO service_role;

-- ============================================================================
-- Migration Complete: predictions table
-- ============================================================================
