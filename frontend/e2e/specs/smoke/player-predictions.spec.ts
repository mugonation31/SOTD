import { test, expect } from '@playwright/test';
import { PredictionsPage } from '../../pages/predictions.page';
import { LoginPage } from '../../pages/login.page';

/**
 * Smoke tests for Task 3.2 — Player Predictions page is wired to Supabase.
 *
 * No seeded test user exists yet in this environment, so /player/predictions
 * is expected to redirect to /auth/login via AuthGuard. These tests verify:
 *
 *   1. The redirect is graceful (login page renders, no crash). AND/OR
 *      the authenticated page renders with either the group selector or
 *      the no-groups empty state.
 *   2. No uncaught JS exceptions fire during the initial page load.
 *
 * When a test user is later added, remove the `isRedirectedToLogin()`
 * branches and keep the `assertPageLoaded()` assertions as the happy path.
 */
test.describe('Player predictions page (Task 3.2 smoke)', () => {
  test('should either render predictions or redirect to login gracefully', async ({ page }) => {
    const predictionsPage = new PredictionsPage(page);
    await predictionsPage.navigate();

    if (await predictionsPage.isRedirectedToLogin()) {
      // No authenticated session — AuthGuard redirects to login. Verify the
      // login page actually rendered (i.e. the redirect didn't crash the app).
      const loginPage = new LoginPage(page);
      await expect(loginPage.heading).toBeVisible();
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    // Authenticated path — full smoke assertions (either has-groups with
    // segment + selector, or no-groups empty state with CTA).
    await predictionsPage.assertPageLoaded();
  });

  test('should render the segment control when the authenticated user has groups', async ({ page }) => {
    const predictionsPage = new PredictionsPage(page);
    await predictionsPage.navigate();

    if (await predictionsPage.isRedirectedToLogin()) {
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    // Conditional: we don't control Supabase group membership, so only
    // assert the has-groups contract when the page isn't rendering the
    // empty state. The no-groups path is implicitly covered by the
    // `assertPageLoaded` smoke above.
    const noGroupsCount = await predictionsPage.noGroupsState.count();
    if (noGroupsCount > 0) {
      test.info().annotations.push({
        type: 'skip-reason',
        description: 'Predictions page rendered no-groups empty state; segment contract not asserted.',
      });
      return;
    }

    await expect(predictionsPage.segmentControl).toBeVisible();
    await expect(predictionsPage.currentTab).toContainText(/My Predictions/i);
    await expect(predictionsPage.historyTab).toContainText(/History/i);
    await expect(predictionsPage.groupSelect).toBeVisible();
  });

  test('should not log JS exceptions when visiting /player/predictions', async ({ page }) => {
    const jsErrors: string[] = [];
    page.on('pageerror', (err) => jsErrors.push(err.message));

    const predictionsPage = new PredictionsPage(page);
    await predictionsPage.navigate();

    // Let any guard-driven redirect + initial Supabase fetch (groups +
    // predictions) settle before asserting.
    await page.waitForLoadState('networkidle');

    expect(jsErrors, `Uncaught JS exceptions: ${jsErrors.join(' | ')}`).toHaveLength(0);
  });
});
