import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the Player Group Standings page
 * (/player/group-standings/:groupId).
 *
 * This route is guarded by AuthGuard (expectedRole: 'player'). Without a
 * valid session the app redirects to /auth/login. Tests should call
 * `isRedirectedToLogin()` to branch between the rendered-page path and the
 * redirected-to-login path.
 *
 * Task 3.3 wired this page to Supabase via SupabaseDataService.getGameweekDeadline.
 * Depending on the authenticated user's group data and the current gameweek
 * deadline the page renders one of:
 *   - `.predictions-locked-card` with the message
 *     "Predictions will be visible after the deadline" (pre-deadline), OR
 *   - `.group-predictions-list` populated with per-player prediction items
 *     (post-deadline), OR
 *   - Neither (no group data / no predictions yet — standings card only).
 * Any of these is valid for a smoke test.
 *
 * The route requires a `:groupId` segment. For smokes we use a placeholder
 * value because AuthGuard intercepts the navigation before any Supabase
 * lookup runs when there is no session, and when there IS a session the
 * page still renders the locked/unlocked placeholder structurally for any
 * groupId (the guard, not the param, gates access).
 */
export class GroupStandingsPage extends BasePage {
  /**
   * "Predictions will be visible after the deadline" card. Rendered only
   * when `predictionsLocked === true` in the component.
   */
  readonly predictionsLockedCard: Locator;

  /** Paragraph containing the locked-state copy inside the card above. */
  readonly predictionsLockedMessage: Locator;

  /**
   * Post-deadline predictions list. Rendered only when
   * `!predictionsLocked && groupPredictions.length > 0`.
   */
  readonly groupPredictionsList: Locator;

  /**
   * Large lock icon inside the locked card. Useful as an extra structural
   * check — asserts the Task 3.3.2 icon rendering survived template edits.
   */
  readonly lockIconLarge: Locator;

  /**
   * The "Leaderboard" standings card — always present when the page itself
   * renders, regardless of visibility-gate state. Used as a baseline signal
   * that the authenticated page actually loaded.
   */
  readonly standingsCard: Locator;

  constructor(page: Page) {
    super(page);
    this.predictionsLockedCard = page.locator('.predictions-locked-card');
    this.predictionsLockedMessage = page.locator('.predictions-locked-message');
    this.groupPredictionsList = page.locator('.group-predictions-list');
    this.lockIconLarge = page.locator('.predictions-locked-card .lock-icon-large');
    this.standingsCard = page.locator('.standings-card');
  }

  /**
   * Navigate to /player/group-standings/:groupId. Uses a placeholder
   * groupId because no test session is seeded — AuthGuard redirects to
   * /auth/login before the param is dereferenced.
   */
  async navigate(groupId: string = 'smoke-test'): Promise<void> {
    await this.navigateTo(`/player/group-standings/${groupId}`);
    await this.waitForAppReady();
  }

  /**
   * Returns true if the AuthGuard redirected the browser to the login page
   * (i.e. no valid test session). Mirrors the pattern used by
   * `MatchesPage.isRedirectedToLogin()` and `PredictionsPage.isRedirectedToLogin()`.
   */
  async isRedirectedToLogin(): Promise<boolean> {
    await this.page
      .waitForURL(/\/(player\/group-standings|auth\/login)/, { timeout: 5_000 })
      .catch(() => {
        // If neither URL matches, fall through and let the caller assert.
      });
    return new URL(this.page.url()).pathname.startsWith('/auth/login');
  }

  /**
   * Smoke assertion for the group-standings page when it renders
   * (authenticated path). The page has three valid content shapes for the
   * visibility-gated section, any of which is acceptable for a smoke:
   *
   *   1. Locked path: `.predictions-locked-card` is visible and contains
   *      the expected message + large lock icon.
   *   2. Unlocked-with-predictions path: `.group-predictions-list` is
   *      visible with at least one row.
   *   3. Unlocked-empty path: neither element is present (no predictions
   *      fetched yet / empty group) — still valid; the standings card
   *      rendering is enough proof the page loaded.
   *
   * We don't control seeded deadlines or predictions data, so all three
   * paths pass the smoke contract.
   */
  async assertPageLoaded(): Promise<void> {
    const lockedCount = await this.predictionsLockedCard.count();
    const listCount = await this.groupPredictionsList.count();

    if (lockedCount > 0) {
      // Locked path — verify Task 3.3.2 contract: card + message + icon.
      await expect(this.predictionsLockedCard).toBeVisible();
      await expect(this.predictionsLockedMessage).toBeVisible();
      await expect(this.predictionsLockedMessage).toContainText(
        'Predictions will be visible after the deadline',
      );
      await expect(this.lockIconLarge).toBeVisible();
      return;
    }

    if (listCount > 0) {
      // Unlocked-with-data path — verify the list rendered.
      await expect(this.groupPredictionsList).toBeVisible();
      return;
    }

    // Unlocked-empty path — fall back to the always-present standings card
    // as proof that the route actually mounted the component.
    await expect(this.standingsCard).toBeVisible();
  }
}
