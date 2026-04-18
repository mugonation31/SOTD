import { test, expect } from '@playwright/test';
import { SuperAdminDashboardPage } from '../../pages/super-admin-dashboard.page';
import { SuperAdminUsersGroupsPage } from '../../pages/super-admin-users-groups.page';
import { LoginPage } from '../../pages/login.page';

/**
 * Smoke tests for Task 4.0 — Super Admin dashboard + Users & Groups page.
 *
 * No seeded super-admin test user exists in this environment, so both
 * routes are expected to redirect to /auth/login via AuthGuard. These
 * tests verify the redirect is graceful AND, when reachable, that each
 * page renders the Task 4.0 structural contract:
 *   - Dashboard: 4 stat cards + 2-tab layout
 *   - Users & Groups: segment control with both segment buttons
 *
 * Mutations (Sync click, user deactivate, group delete) are intentionally
 * NOT exercised — they would hit the Edge Function (API quota) or the
 * live DB. See the task spec for the explicit "do not" list.
 *
 * When a super-admin test user is later seeded, drop the
 * `isRedirectedToLogin()` branches and keep the `assertPageLoaded()`
 * assertions as the happy path.
 */
test.describe('Super admin dashboard (Task 4.0 smoke)', () => {
  test('should either render dashboard structure or redirect to login gracefully', async ({
    page,
  }) => {
    const dashboardPage = new SuperAdminDashboardPage(page);
    await dashboardPage.navigate();

    if (await dashboardPage.isRedirectedToLogin()) {
      // No authenticated super-admin session — AuthGuard redirects to
      // login. Verify the login page actually rendered (i.e. the redirect
      // didn't crash the app).
      const loginPage = new LoginPage(page);
      await expect(loginPage.heading).toBeVisible();
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    // Authenticated super-admin path — full smoke assertions.
    await dashboardPage.assertPageLoaded();
  });

  test('should not log JS exceptions when visiting /super-admin/dashboard', async ({
    page,
  }) => {
    const jsErrors: string[] = [];
    page.on('pageerror', (err) => jsErrors.push(err.message));

    const dashboardPage = new SuperAdminDashboardPage(page);
    await dashboardPage.navigate();

    // Let any guard-driven redirect + initial Supabase fetches settle
    // (admin counts, active gameweek, last sync) so any throw inside
    // `ionViewWillEnter` surfaces here, not in a later unrelated test.
    await page.waitForLoadState('networkidle');

    expect(
      jsErrors,
      `Uncaught JS exceptions: ${jsErrors.join(' | ')}`,
    ).toHaveLength(0);
  });

  /**
   * Task 4.0.8 regression guard — the layout was reduced from a multi-tab
   * navigation to exactly 2 tabs (Dashboard + Users & Groups) with a
   * logout button in the header. This test verifies that contract WHEN
   * the page is reachable. Skips gracefully on login redirect since the
   * layout component never mounts in that case.
   */
  test('should render exactly the 2-tab layout when dashboard is reachable', async ({
    page,
  }) => {
    const dashboardPage = new SuperAdminDashboardPage(page);
    await dashboardPage.navigate();

    if (await dashboardPage.isRedirectedToLogin()) {
      // Layout contract is gated on the protected shell — skip.
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    await dashboardPage.assertPageLoaded();
    await expect(dashboardPage.tabButtons).toHaveCount(2);
    await expect(dashboardPage.logoutButton).toBeVisible();
  });
});

test.describe('Super admin users & groups page (Task 4.0.9 smoke)', () => {
  test('should either render segment or redirect to login gracefully', async ({
    page,
  }) => {
    const usersGroupsPage = new SuperAdminUsersGroupsPage(page);
    await usersGroupsPage.navigate();

    if (await usersGroupsPage.isRedirectedToLogin()) {
      const loginPage = new LoginPage(page);
      await expect(loginPage.heading).toBeVisible();
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    await usersGroupsPage.assertPageLoaded();
  });

  test('should not log JS exceptions when visiting /super-admin/users-groups', async ({
    page,
  }) => {
    const jsErrors: string[] = [];
    page.on('pageerror', (err) => jsErrors.push(err.message));

    const usersGroupsPage = new SuperAdminUsersGroupsPage(page);
    await usersGroupsPage.navigate();

    // Let the parallel `getAllUsers` + `getAllGroups` fetches in
    // `ionViewWillEnter` settle so any throw surfaces here.
    await page.waitForLoadState('networkidle');

    expect(
      jsErrors,
      `Uncaught JS exceptions: ${jsErrors.join(' | ')}`,
    ).toHaveLength(0);
  });
});
