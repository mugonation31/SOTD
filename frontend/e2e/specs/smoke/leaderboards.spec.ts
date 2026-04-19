import { test, expect } from '@playwright/test';
import { PlayerStandingsPage } from '../../pages/player-standings.page';
import { GroupAdminLeaderboardPage } from '../../pages/group-admin-leaderboard.page';
import { LoginPage } from '../../pages/login.page';

/**
 * Smoke tests for Task 4.1 — Player Standings + Group Admin Leaderboard.
 *
 * Both routes are guarded by AuthGuard (expectedRole: 'player' and
 * 'group-admin' respectively). No seeded test user exists in this
 * environment, so both routes are expected to redirect to /auth/login.
 * These tests verify the redirect is graceful AND, when reachable, that
 * each page renders the Task 4.1 structural contract (loading spinner
 * clears, page heading renders, either an empty-state card or group rows
 * are present).
 *
 * Actual leaderboard data is NOT exercised — that would require seeded
 * users, predictions and completed matches. DB-trigger behaviour is
 * covered by the SQL test script.
 *
 * When a test user is later seeded, drop the `isRedirectedToLogin()`
 * branches and keep `assertPageLoaded()` as the happy path.
 */
test.describe('Player standings page (Task 4.1 smoke)', () => {
  test('should either render standings structure or redirect to login gracefully', async ({
    page,
  }) => {
    const standingsPage = new PlayerStandingsPage(page);
    await standingsPage.navigate();

    if (await standingsPage.isRedirectedToLogin()) {
      // No authenticated player session — AuthGuard redirects to login.
      // Verify the login page actually rendered (i.e. the redirect didn't
      // crash the app).
      const loginPage = new LoginPage(page);
      await expect(loginPage.heading).toBeVisible();
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    // Authenticated player path — full smoke assertions.
    await standingsPage.assertPageLoaded();
  });

  test('should not log JS exceptions when visiting /player/standings', async ({
    page,
  }) => {
    const jsErrors: string[] = [];
    page.on('pageerror', (err) => jsErrors.push(err.message));

    const standingsPage = new PlayerStandingsPage(page);
    await standingsPage.navigate();

    // Let any guard-driven redirect + initial Supabase fetch (group
    // memberships + rank per group) settle so any throw inside
    // `ionViewWillEnter` surfaces here, not in a later unrelated test.
    await page.waitForLoadState('networkidle');

    expect(
      jsErrors,
      `Uncaught JS exceptions: ${jsErrors.join(' | ')}`,
    ).toHaveLength(0);
  });
});

test.describe('Group admin leaderboard page (Task 4.1 smoke)', () => {
  test('should either render leaderboard structure or redirect to login gracefully', async ({
    page,
  }) => {
    const leaderboardPage = new GroupAdminLeaderboardPage(page);
    await leaderboardPage.navigate();

    if (await leaderboardPage.isRedirectedToLogin()) {
      const loginPage = new LoginPage(page);
      await expect(loginPage.heading).toBeVisible();
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    await leaderboardPage.assertPageLoaded();
  });

  test('should not log JS exceptions when visiting /group-admin/leaderboard', async ({
    page,
  }) => {
    const jsErrors: string[] = [];
    page.on('pageerror', (err) => jsErrors.push(err.message));

    const leaderboardPage = new GroupAdminLeaderboardPage(page);
    await leaderboardPage.navigate();

    // Let the admin-managed-groups fetch in `ionViewWillEnter` settle so
    // any throw surfaces here.
    await page.waitForLoadState('networkidle');

    expect(
      jsErrors,
      `Uncaught JS exceptions: ${jsErrors.join(' | ')}`,
    ).toHaveLength(0);
  });
});
