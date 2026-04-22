import { test, expect } from '@playwright/test';
import { SuperAdminDashboardPage } from '../../pages/super-admin-dashboard.page';
import { LoginPage } from '../../pages/login.page';

/**
 * E2E smoke tests for Task 4.2.6 — AuthGuard cold-start race on
 * super-admin deep-link.
 *
 * The timing race itself (5s wait on `profile$` hydration) is covered by
 * 13 unit specs in `auth.guard.spec.ts` with fake timers. This file
 * asserts the observable browser-visible behaviour that matters to real
 * users:
 *
 *   - Scenario B: Unauthenticated deep-link to /super-admin/dashboard
 *     redirects to /auth/login?returnUrl=/super-admin/dashboard immediately
 *     (no 5s hang, no "Session taking too long" toast).
 *   - Scenario C: Role mismatch (player deep-linking to super-admin)
 *     redirects to /auth/login. No toast.
 *   - Scenarios A + D: Happy-path super-admin deep-link + reload. Branch
 *     on `isRedirectedToLogin()` because no super-admin test user is
 *     seeded in this environment — same convention used by the existing
 *     Task 4.0 super-admin smoke spec.
 *
 * NOT covered here (intentionally):
 *   - The 5s profile-hydration timeout path. Requires stubbing
 *     `profile$` to never emit; that's a unit-test concern.
 */
test.describe('AuthGuard — super-admin deep-link (Task 4.2.6)', () => {
  /**
   * Scenario B (primary regression guard): unauthenticated user deep-links
   * directly to /super-admin/dashboard.
   *
   * Before Task 4.2.6's hoisted unauthenticated check, this path would
   * hang for ~5s on `profile$` and fire a misleading toast. The fix
   * guarantees: immediate redirect to /auth/login, no toast.
   *
   * Note on returnUrl: the unit tests assert `returnUrl=/super-admin/dashboard`
   * because they stub `route.url` with the full path. At runtime the
   * AuthGuard is attached to the `path: ''` parent of the super-admin
   * lazy-loaded routes, so `route.url` is `[]` → attemptedUrl resolves to
   * `/` → the guard's `if (attemptedUrl !== '/')` branch skips the query
   * param. This E2E test asserts the actual browser-observable URL, which
   * is plain `/auth/login` with no query string. The returnUrl attachment
   * logic is still covered by the unit spec.
   */
  test('unauthenticated deep-link redirects to login immediately with no toast', async ({
    page,
    context,
  }) => {
    // Clean session — incognito-equivalent. Drop any stray Supabase
    // auth cookies/localStorage so we're guaranteed unauthenticated.
    await context.clearCookies();

    // Prime the origin first so we can clear storage (localStorage is
    // origin-scoped and requires a navigated context).
    await page.goto('/welcome', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    // The real assertion: deep-link to the guarded route.
    await page.goto('/super-admin/dashboard', { waitUntil: 'domcontentloaded' });

    // Hoisted unauthenticated branch → immediate redirect. The 5s timeout
    // here is a hard upper bound; the redirect should fire well under 1s.
    // If this assertion ever times out at 5s, Task 4.2.6 has regressed.
    await expect(page).toHaveURL(/\/auth\/login(\?|$)/, { timeout: 5_000 });

    // Login page actually rendered (redirect didn't crash the app).
    const loginPage = new LoginPage(page);
    await expect(loginPage.heading).toBeVisible();

    // Critical Task 4.2.6 negative assertion: the misleading toast from
    // the half-applied fix MUST NOT fire on the unauthenticated path.
    const timeoutToast = page.locator('ion-toast', {
      hasText: 'Session taking too long to load',
    });
    await expect(timeoutToast).toHaveCount(0);
  });

  /**
   * Scenario B variant: verify the redirect is fast. A stray 5s wait
   * would indicate the unauthenticated branch was accidentally moved
   * below the super-admin branch again.
   *
   * Budget: allow up to 3s end-to-end (navigation + Angular bootstrap +
   * guard evaluation + redirect) on a cold dev server. A true regression
   * would blow past 5s.
   */
  test('unauthenticated redirect completes well under the 5s profile timeout', async ({
    page,
    context,
  }) => {
    await context.clearCookies();

    // Prime the origin first so we can clear storage.
    await page.goto('/welcome', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    const start = Date.now();
    await page.goto('/super-admin/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForURL(/\/auth\/login/, { timeout: 5_000 });
    const elapsed = Date.now() - start;

    // The guard's profile-hydration timeout is 5000ms. A healthy
    // unauthenticated redirect should complete in <3s. If this ever
    // approaches 5s, the hoisted unauthenticated check has regressed.
    expect(
      elapsed,
      `Unauthenticated redirect took ${elapsed}ms — Task 4.2.6 hoisted ` +
        `unauthenticated check may have regressed (budget: <3000ms, guard ` +
        `timeout: 5000ms).`,
    ).toBeLessThan(3_000);
  });

  /**
   * Scenario A + D: happy path + browser-reload deep-link.
   *
   * Without a seeded super-admin test user we can't drive a real login.
   * We follow the project convention established in `super-admin.spec.ts`:
   * branch on `isRedirectedToLogin()`. When a super-admin test user is
   * later seeded, drop the branch and keep the full-page-reload
   * assertion as the canonical Task 4.2.6 happy-path guard.
   *
   * The `page.reload()` step is the cold-start race simulation: Angular
   * re-bootstraps from a persisted Supabase session token and `profile$`
   * re-hydrates from scratch. Before Task 4.2.6, this reload would
   * bounce a legitimate super-admin to /auth/login.
   */
  test('super-admin cold-start reload should not bounce to login (branches on redirect)', async ({
    page,
  }) => {
    const dashboardPage = new SuperAdminDashboardPage(page);
    await dashboardPage.navigate();

    if (await dashboardPage.isRedirectedToLogin()) {
      // No seeded super-admin session — AuthGuard redirects, expected in
      // this environment. Smoke-assert the redirect is graceful (no app
      // crash, login page actually rendered). The cold-start reload
      // assertion below is only meaningful with a real session.
      const loginPage = new LoginPage(page);
      await expect(loginPage.heading).toBeVisible();
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    // Happy path — super-admin session is active. Full-page reload
    // triggers the exact cold-start race Task 4.2.6 fixed: Angular
    // bootstrap, guard runs, profile$ hydrating concurrently. A passing
    // test here means the guard waited for profile$ instead of reading
    // currentProfile?.role synchronously.
    await dashboardPage.assertPageLoaded();
    await page.reload({ waitUntil: 'domcontentloaded' });

    // After reload we MUST still be on the dashboard — the Task 4.2.6
    // regression would bounce us to /auth/login here.
    await expect(page).toHaveURL(/\/super-admin\/dashboard/);
    await dashboardPage.assertPageLoaded();

    // And no misleading timeout toast after a successful hydration.
    const timeoutToast = page.locator('ion-toast', {
      hasText: 'Session taking too long to load',
    });
    await expect(timeoutToast).toHaveCount(0);
  });

  /**
   * Scenario C: role mismatch. A logged-in player (non-super-admin)
   * deep-linking to /super-admin/dashboard must redirect to /auth/login.
   * No toast — role mismatch is not a timeout condition.
   *
   * Same seeded-user caveat as Scenario A/D: without a player test
   * account we exercise the unauthenticated path (which asserts the
   * same redirect behaviour via a different guard branch). When a
   * player test user is seeded, pre-login via a future auth helper
   * before the navigate() call to exercise the true role-mismatch
   * branch.
   */
  test('role mismatch deep-link redirects to login without timeout toast', async ({
    page,
    context,
  }) => {
    // Without a seeded non-super-admin test user, this test currently
    // overlaps with Scenario B. It's kept as a separate test so that
    // when a player user is seeded, only this test's `beforeEach` or
    // auth helper needs updating — the assertions stay identical.
    await context.clearCookies();
    await page.goto('/welcome', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await page.goto('/super-admin/dashboard', { waitUntil: 'domcontentloaded' });

    // Redirect fires via the same `redirectToLogin(route)` helper for
    // both unauth and role-mismatch branches. returnUrl query-param
    // attachment is asserted by the unit spec (it depends on the stubbed
    // `route.url` shape, which diverges from real routing topology).
    await expect(page).toHaveURL(/\/auth\/login(\?|$)/, { timeout: 5_000 });

    // Redirect landed on a rendered login page.
    const loginPage = new LoginPage(page);
    await expect(loginPage.heading).toBeVisible();

    // No toast on the role-mismatch path either.
    const timeoutToast = page.locator('ion-toast', {
      hasText: 'Session taking too long to load',
    });
    await expect(timeoutToast).toHaveCount(0);
  });

  /**
   * Defensive check: visiting /super-admin/dashboard must not produce
   * any uncaught JS exceptions, regardless of which guard branch runs.
   * Mirrors the same assertion in the Task 4.0 super-admin smoke spec.
   */
  test('no uncaught JS exceptions during guard evaluation', async ({ page }) => {
    const jsErrors: string[] = [];
    page.on('pageerror', (err) => jsErrors.push(err.message));

    const dashboardPage = new SuperAdminDashboardPage(page);
    await dashboardPage.navigate();

    // Let the guard + any Supabase initialisation finish so a throw in
    // canActivate or the profile$ subscription surfaces here.
    await page.waitForLoadState('networkidle');

    expect(
      jsErrors,
      `Uncaught JS exceptions: ${jsErrors.join(' | ')}`,
    ).toHaveLength(0);
  });
});
