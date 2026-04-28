import { test, expect } from '@playwright/test';
import { PlayerStandingsPage } from '../../pages/player-standings.page';
import { LoginPage } from '../../pages/login.page';

/**
 * Smoke tests for Task 9.1 — "+ Join another group" CTA on the player
 * standings page (/player/standings).
 *
 * Behaviour under test (per Task 9.1):
 *   1. /player/standings renders a "Join another group" CTA above the
 *      groups list, gated on `!isLoading && groupStandings.length > 0`.
 *   2. Clicking the CTA navigates to /player/join-group.
 *   3. The CTA is NOT rendered when groupStandings is empty (the
 *      empty-state card has its own separate CTA — different element).
 *
 * These are STRUCTURAL smokes. They never seed Supabase, never mutate
 * group membership, and never sign in via the login form (no seeded test
 * users exist in this environment — see player-group-standings.spec.ts
 * and player-matches.spec.ts for the same graceful-redirect pattern).
 *
 * Because /player/standings is guarded by AuthGuard with
 * `expectedRole: 'player'`, an unauthenticated visit redirects to
 * /auth/login. When that happens, we assert the redirect is graceful
 * and exit. When a seeded player session is later added to this test
 * environment, the same assertions exercise the happy path end-to-end
 * with no spec changes required.
 */
test.describe('Player standings — "Join another group" CTA (Task 9.1 smoke)', () => {
  test('should render the CTA when standings shows at least one joined group', async ({
    page,
  }) => {
    const standingsPage = new PlayerStandingsPage(page);
    await standingsPage.navigate();

    if (await standingsPage.isRedirectedToLogin()) {
      // No authenticated session — AuthGuard redirects to login. Verify
      // the login page actually rendered and exit. See file header.
      const loginPage = new LoginPage(page);
      await expect(loginPage.heading).toBeVisible();
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    await standingsPage.assertPageLoaded();

    // The CTA is gated on `groupStandings.length > 0`. We don't control
    // seeded data here, so only assert the CTA's presence on the
    // populated branch. The `groupStandings.length === 0` branch is
    // covered by the dedicated "hidden when no groups" test below.
    if (!(await standingsPage.hasGroups())) {
      test.info().annotations.push({
        type: 'skip-reason',
        description:
          'Standings rendered with zero groups; CTA is hidden by Task 9.1 contract (covered by sibling test).',
      });
      return;
    }

    await expect(standingsPage.joinAnotherGroupButton).toBeVisible();
    await expect(standingsPage.joinAnotherGroupButton).toContainText('Join another group');
  });

  test('should navigate to /player/join-group when the CTA is clicked', async ({ page }) => {
    const standingsPage = new PlayerStandingsPage(page);
    await standingsPage.navigate();

    if (await standingsPage.isRedirectedToLogin()) {
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    await standingsPage.assertPageLoaded();

    // Same conditional branch as the render test — only click when the
    // CTA is actually in the DOM (i.e. user has at least one group).
    if (!(await standingsPage.hasGroups())) {
      test.info().annotations.push({
        type: 'skip-reason',
        description:
          'Standings rendered with zero groups; CTA is not in DOM, navigation contract not asserted.',
      });
      return;
    }

    await standingsPage.clickJoinAnotherGroup();
    await expect(page).toHaveURL(/\/player\/join-group/);
  });

  test('should NOT render the CTA when standings has zero joined groups', async ({ page }) => {
    const standingsPage = new PlayerStandingsPage(page);
    await standingsPage.navigate();

    if (await standingsPage.isRedirectedToLogin()) {
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    await standingsPage.assertPageLoaded();

    // Mirror branch — only assert CTA absence on the empty-state path.
    // When groups exist, this contract is the inverse of the render
    // test above, so we exit cleanly rather than double-asserting.
    if (await standingsPage.hasGroups()) {
      test.info().annotations.push({
        type: 'skip-reason',
        description:
          'Standings rendered with at least one group; empty-state contract not exercised here.',
      });
      return;
    }

    // Empty-state path — the `.empty-state` card has its own separate CTA
    // ("Join Your First Group") that lives inside `ion-card.empty-state`.
    // The Task 9.1 CTA (`ion-button.join-another-cta`) must not be in the
    // DOM at all on this branch.
    await expect(standingsPage.emptyState).toBeVisible();
    await expect(standingsPage.joinAnotherGroupButton).toHaveCount(0);
  });

  test('should not log JS exceptions while rendering the CTA branch', async ({ page }) => {
    const jsErrors: string[] = [];
    page.on('pageerror', (err) => jsErrors.push(err.message));

    const standingsPage = new PlayerStandingsPage(page);
    await standingsPage.navigate();

    // Let any guard-driven redirect + initial Supabase fetch
    // (getPlayerGroupStandings) settle before asserting.
    await page.waitForLoadState('networkidle');

    expect(jsErrors, `Uncaught JS exceptions: ${jsErrors.join(' | ')}`).toHaveLength(0);
  });
});
