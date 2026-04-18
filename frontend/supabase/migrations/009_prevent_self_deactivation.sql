-- ============================================================================
-- Migration: 009_prevent_self_deactivation
-- Description: Defense-in-depth DB trigger preventing a super-admin from
--              deactivating their own account (bricks admin access).
-- Created: 2026-04-18
-- Dependencies: 008_superadmin_infrastructure (profiles.is_active column)
-- ============================================================================

-- Problem:
--   The "Super admins can update all profiles" RLS policy (migration 001)
--   permits a super-admin to update their own `is_active` column via
--   toggleUserActive. A crafted client call (bypassing the UI guard) or
--   a second super-admin could flip the last super-admin to inactive —
--   locking themselves out of write access via the `is_user_active()`
--   RLS checks added in migration 008. A client-only guard is not enough.
--
-- Solution:
--   A BEFORE UPDATE trigger on `profiles` that raises if the caller
--   (`auth.uid()`) is attempting to set their OWN row's `is_active` to
--   FALSE. Super-admins can still deactivate OTHER users normally; other
--   roles are unaffected (normal users can't toggle `is_active` at all
--   because RLS denies their UPDATE).

CREATE OR REPLACE FUNCTION public.prevent_self_deactivation()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Only guard transitions to inactive. Reactivations are allowed.
    IF NEW.is_active = FALSE
       AND OLD.is_active = TRUE
       AND NEW.id = auth.uid()
    THEN
        RAISE EXCEPTION 'You cannot deactivate your own account'
            USING ERRCODE = 'check_violation';
    END IF;

    RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.prevent_self_deactivation() IS
    'Blocks any caller from setting is_active=FALSE on their own profile row. '
    'Prevents super-admins from accidentally or maliciously bricking their own '
    'admin access. See Task 4.0 in docs/plans/mvp-plan.md.';

DROP TRIGGER IF EXISTS prevent_self_deactivation_trigger ON public.profiles;

CREATE TRIGGER prevent_self_deactivation_trigger
    BEFORE UPDATE OF is_active ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.prevent_self_deactivation();

-- ============================================================================
-- Migration Complete: prevent_self_deactivation trigger
-- ============================================================================
