import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

/**
 * Task 4.2.10 regression canary — Purge debug + dead auth surface.
 *
 * The `/debug-auth` page previously exposed auth internals (session dumps,
 * "Emergency Reset" actions, etc.) and was publicly routable. It was deleted
 * along with its route in Task 4.2.10.
 *
 * This canary locks in the user-observable contract:
 *   navigating to /debug-auth must NOT render the debug page; it must fall
 *   through to the `**` catch-all in app.routes.ts and redirect to
 *   /auth/login.
 *
 * If a future refactor accidentally re-registers a /debug-auth route, this
 * test fails loudly — a regression that would otherwise short-circuit the
 * catch-all and slip past every existing happy-path spec.
 */
test.describe('Debug-auth surface is purged', () => {
  test('navigating to /debug-auth redirects to /auth/login and does not render debug UI', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo('/debug-auth');
    await loginPage.waitForAppReady();

    // The catch-all route (`**` → `auth/login`) must handle this.
    await expect(page).toHaveURL(/\/auth\/login$/);

    // Login UI should be rendered — proves we actually landed on the login
    // page rather than a silently-rendered placeholder.
    await expect(loginPage.heading).toBeVisible();

    // Double-check the old debug page's tell-tale copy is nowhere in the DOM.
    // If either string comes back, the old page has been re-introduced.
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toContain('Debug Authentication');
    expect(bodyText).not.toContain('Emergency Reset');
  });
});
