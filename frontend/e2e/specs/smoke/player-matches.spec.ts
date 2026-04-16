import { test, expect } from '@playwright/test';
import { MatchesPage } from '../../pages/matches.page';
import { LoginPage } from '../../pages/login.page';

/**
 * Smoke tests for Task 2.2 — Player Matches page is wired to Supabase.
 *
 * No seeded test user exists yet in this environment, so /player/matches is
 * expected to redirect to /auth/login via AuthGuard. These tests verify
 * that redirect is graceful AND, when reachable, that the page renders the
 * Task 2.2 contract (heading, nav buttons, and either cards or empty state).
 *
 * When a test user is later added, remove the `isRedirectedToLogin()`
 * branch and keep the `assertPageLoaded()` assertions as the happy path.
 */
test.describe('Player matches page (Task 2.2 smoke)', () => {
  test('should either render matches or redirect to login gracefully', async ({ page }) => {
    const matchesPage = new MatchesPage(page);
    await matchesPage.navigate();

    if (await matchesPage.isRedirectedToLogin()) {
      // No authenticated session — AuthGuard redirects to login. Verify the
      // login page actually rendered (i.e. the redirect didn't crash the app).
      const loginPage = new LoginPage(page);
      await expect(loginPage.heading).toBeVisible();
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    // Authenticated path — full smoke assertions.
    await matchesPage.assertPageLoaded();
  });

  test('should not log JS exceptions when visiting /player/matches', async ({ page }) => {
    const jsErrors: string[] = [];
    page.on('pageerror', (err) => jsErrors.push(err.message));

    const matchesPage = new MatchesPage(page);
    await matchesPage.navigate();

    // Let any guard-driven redirect + initial Supabase fetch settle
    await page.waitForLoadState('networkidle');

    expect(jsErrors, `Uncaught JS exceptions: ${jsErrors.join(' | ')}`).toHaveLength(0);
  });
});
