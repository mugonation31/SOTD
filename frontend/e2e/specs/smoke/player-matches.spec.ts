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

  /**
   * Task 3.2 regression guard — the submit button was rewritten to upsert
   * to Supabase (instead of writing to localStorage) and now disables
   * while submitting. This test simply verifies the button is still a real
   * `ion-button` in the DOM so a future template refactor can't silently
   * remove it. We don't click it (requires auth + seeded data + network).
   */
  test('should render the Ionic submit button when matches page is reachable', async ({ page }) => {
    const matchesPage = new MatchesPage(page);
    await matchesPage.navigate();

    if (await matchesPage.isRedirectedToLogin()) {
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    await matchesPage.assertPageLoaded();
    await expect(matchesPage.submitButton).toBeVisible();
    // Confirm it's an actual ion-button element (not a plain <button> that
    // could slip past the smoke if the template were ever refactored).
    await expect(matchesPage.submitButton).toHaveJSProperty('tagName', 'ION-BUTTON');
  });
});

/**
 * Smoke tests for Task 3.1 — countdown timer + deadline lock UI.
 *
 * These are STRUCTURAL tests. They never manipulate `Date`, never demand a
 * specific deadline value in Supabase, and never submit a prediction. They
 * simply verify:
 *   1. When the matches page renders, `<app-countdown-timer>` is visible
 *      and displays one of its two valid text shapes (running OR locked).
 *   2. IF the page happens to be in locked state (past deadline OR null
 *      deadline), all score inputs are disabled and the reset button is
 *      hidden. (Conditional — skipped when the page is in the unlocked
 *      state, since we don't control seeded data.)
 *   3. Rendering the timer does not introduce JS exceptions.
 *
 * Login redirect is tolerated with the same graceful pattern used by the
 * Task 2.2 spec above.
 */
test.describe('Player matches page — countdown + lock (Task 3.1 smoke)', () => {
  test('should render the countdown timer when matches page is reachable', async ({ page }) => {
    const matchesPage = new MatchesPage(page);
    await matchesPage.navigate();

    if (await matchesPage.isRedirectedToLogin()) {
      // Task 3.1 is gated on the matches page — if we can't reach it,
      // assert the graceful redirect and exit. No seeded test user yet.
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    await matchesPage.assertPageLoaded();
    await matchesPage.assertCountdownTimerVisible();
  });

  test('should disable score inputs and hide reset when page is in locked state', async ({ page }) => {
    const matchesPage = new MatchesPage(page);
    await matchesPage.navigate();

    if (await matchesPage.isRedirectedToLogin()) {
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    // Conditional: we don't control Supabase's deadline values, so only
    // assert the lock contract when the page is actually rendering locked.
    // When unlocked, this test is a no-op (the unlocked path is implicitly
    // covered by the Task 2.2 assertPageLoaded smoke).
    if (!(await matchesPage.isInLockedState())) {
      test.info().annotations.push({
        type: 'skip-reason',
        description: 'Matches page rendered in unlocked state; lock contract not asserted.',
      });
      return;
    }

    await matchesPage.assertLockedStateDisablesInputs();
  });

  test('should not log JS exceptions while the countdown timer is mounted', async ({ page }) => {
    const jsErrors: string[] = [];
    page.on('pageerror', (err) => jsErrors.push(err.message));

    const matchesPage = new MatchesPage(page);
    await matchesPage.navigate();

    // Give the timer at least one tick (setInterval runs at 1s) plus a
    // moment for network idle, so any throw inside tick() surfaces here
    // rather than in a later, unrelated test.
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1_500);

    expect(jsErrors, `Uncaught JS exceptions: ${jsErrors.join(' | ')}`).toHaveLength(0);
  });
});

/**
 * Smoke tests for Task 3.4 — joker UI embedded in the matches deadline card.
 *
 * These are STRUCTURAL tests only. They never:
 *   - submit a prediction (would require auth + DB state)
 *   - toggle the joker (would fire an AlertController dialog we don't mock)
 *   - seed a specific GW state (special vs regular, unlocked vs locked)
 *
 * Visibility of each joker element is conditional on runtime flags
 * (`!isLocked`, `canUseJoker()`, `jokerDeadlineWarning`, `isSpecial`), so
 * we assert on WHAT IS RENDERED rather than what we expect in isolation.
 *
 * Login redirect is tolerated with the same graceful pattern used above.
 */
test.describe('Player matches page — joker UI (Task 3.4 smoke)', () => {
  test('should render at least one joker-section element when matches page is reachable', async ({
    page,
  }) => {
    const matchesPage = new MatchesPage(page);
    await matchesPage.navigate();

    if (await matchesPage.isRedirectedToLogin()) {
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    await matchesPage.assertPageLoaded();

    // Task 3.4 guarantees the joker-section is always rendered inside the
    // deadline card; its children vary by GW state. At minimum, the
    // indicator is present when `!isLocked`, so unlocked pages must show
    // at least one element. For locked pages, the locked-state branch
    // hides all joker children — this is the Task 3.1 lock contract, and
    // is covered elsewhere. Conditionally assert on the unlocked branch.
    if (await matchesPage.isInLockedState()) {
      test.info().annotations.push({
        type: 'skip-reason',
        description: 'Page rendered locked; joker UI is hidden by Task 3.1 lock contract.',
      });
      return;
    }

    const count = await matchesPage.getJokerElementCount();
    expect(
      count,
      'Expected at least one joker-section element (indicator/toggle/warning/disabled-note) on an unlocked matches page',
    ).toBeGreaterThan(0);
  });

  test('should render the joker indicator with canonical "X/2 jokers remaining" copy', async ({
    page,
  }) => {
    const matchesPage = new MatchesPage(page);
    await matchesPage.navigate();

    if (await matchesPage.isRedirectedToLogin()) {
      await expect(page).toHaveURL(/\/auth\/login/);
      return;
    }

    // The indicator is gated on `!isLocked`. Skip assertion on locked
    // pages since the element is intentionally not in the DOM.
    if ((await matchesPage.jokerIndicator.count()) === 0) {
      test.info().annotations.push({
        type: 'skip-reason',
        description: 'joker-indicator not rendered (page is locked); pattern not asserted.',
      });
      return;
    }

    await matchesPage.assertJokerIndicatorTextShape();
  });

  test('should not log JS exceptions while the joker UI is mounted', async ({ page }) => {
    const jsErrors: string[] = [];
    page.on('pageerror', (err) => jsErrors.push(err.message));

    const matchesPage = new MatchesPage(page);
    await matchesPage.navigate();

    // Let Supabase joker-context fetch + template bindings settle so any
    // throw inside `loadJokerContext()` / `recomputeJokerWarning()` /
    // `canUseJoker()` surfaces here, not in a later unrelated test.
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    expect(jsErrors, `Uncaught JS exceptions: ${jsErrors.join(' | ')}`).toHaveLength(0);
  });
});
