-- ============================================================================
-- Migration: 007_matches_external_id
-- Description: Add external_id column for football-data.org match ID
-- Created: 2026-04-06
-- Dependencies: 003_matches_table
-- ============================================================================

-- Add external_id column to track the football-data.org match identifier
ALTER TABLE public.matches
    ADD COLUMN IF NOT EXISTS external_id INTEGER UNIQUE;

COMMENT ON COLUMN public.matches.external_id IS 'Football-data.org match ID for API sync upserts';

-- Fix gameweek unique constraint: scope to season to prevent cross-season overwrites
ALTER TABLE public.gameweeks DROP CONSTRAINT IF EXISTS gameweeks_gameweek_number_key;
ALTER TABLE public.gameweeks ADD CONSTRAINT gameweeks_number_season_unique UNIQUE (gameweek_number, season_year);

-- Add 'postponed' to matches status check (EPL matches get rescheduled, not cancelled)
ALTER TABLE public.matches DROP CONSTRAINT IF EXISTS matches_status_check;
ALTER TABLE public.matches ADD CONSTRAINT matches_status_check
    CHECK (status IN ('scheduled', 'live', 'completed', 'cancelled', 'postponed'));

-- ============================================================================
-- Migration Complete: matches external_id
-- ============================================================================
