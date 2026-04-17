import { test, expect } from '@playwright/test';
import { GroupStandingsPage } from '../../pages/group-standings.page';
import { LoginPage } from '../../pages/login.page';

/**
 * Smoke tests for Task 3.3 — Prediction Visibility toggle on the player
 * group-standings page (/player/group-standings/:groupId).
 *
 * These are STRUCTURAL tests. They never mutate Supabase state, never
 * manipulate gameweek deadlines, and never attempt to seed group
 * memberships. They simply verify that:
 *
 *   1. Navigating to the route either renders the guarded page with a
 *      structurally-valid visibility-gated section (locked card OR
 *      predictions list OR empty standings) OR gracefully redirects to
 *      /auth/login when no session is present.
 *   2. No uncaught JS exceptions fire during the page load / guard redirect.
 *
 * No seeded test user exists yet in this environment, so the redirect
 * path is currently the only one these smokes exercise end-to-end — but
 * the assertions are written so they will also pass once a seeded
 * authenticated session is added.
 */
test.describe('Player group-standings page (Task 3.3 smoke)', () => {
  test('should either render group-standings or redirect to login gracefully', async ({ page }) => {
    const groupStandingsPage = new GroupStandingsPage(page);
    await groupStandingsPage.navigate();

    if (await groupStandingsPage.isRedirectedToLogin()) {
      // No authenticated session — AuthGuard redirects to login. Verify the
      // login page actually rendered (i.e. the redirect didn't crash the app).
      const loginPage = new LoginPage(page);
      await expect(loginPage.heading).toBeVisible();
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    // Authenticated path — assert one of the three valid visibility-gate
    // content shapes is rendered (locked card, predictions list, or the
    // always-present standings card as an empty fallback).
    await groupStandingsPage.assertPageLoaded();
  });

  test('should not log JS exceptions when visiting /player/group-standings/:groupId', async ({ page }) => {
    const jsErrors: string[] = [];
    page.on('pageerror', (err) => jsErrors.push(err.message));

    const groupStandingsPage = new GroupStandingsPage(page);
    await groupStandingsPage.navigate();

    // Let any guard-driven redirect + initial Supabase fetch
    // (getGameweekDeadline, getGroupPredictionsForGameweek) settle before
    // asserting. `networkidle` also covers the Ionic hydration paint.
    await page.waitForLoadState('networkidle');

    expect(jsErrors, `Uncaught JS exceptions: ${jsErrors.join(' | ')}`).toHaveLength(0);
  });
});
