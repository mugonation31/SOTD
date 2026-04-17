import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the Player Predictions page (/player/predictions).
 *
 * This route is guarded by AuthGuard (expectedRole: 'player'). Without a
 * valid session the app redirects to /auth/login. Tests should call
 * `isRedirectedToLogin()` to branch between the rendered-page path and the
 * redirected-to-login path.
 *
 * Task 3.2.5 wired this page to Supabase via SupabaseDataService. Depending
 * on the authenticated user's group membership the page will render:
 *   - The no-groups empty state (`.no-groups-state`) when the user has no
 *     groups, OR
 *   - The group selector (`ion-select.group-select`) + segment control +
 *     predictions list when the user is in at least one group.
 * Both are valid for a smoke test.
 */
export class PredictionsPage extends BasePage {
  /** Group context selector (ion-select with class `.group-select`). */
  readonly groupSelect: Locator;

  /** Empty-state container shown when the user has no groups. */
  readonly noGroupsState: Locator;

  /** "Join a group" button inside the no-groups empty state. */
  readonly joinGroupButton: Locator;

  /** Segment control hosting the Current / History tabs. */
  readonly segmentControl: Locator;

  /** "My Predictions" segment button (value="current"). */
  readonly currentTab: Locator;

  /** "History" segment button (value="history"). */
  readonly historyTab: Locator;

  /**
   * Prediction list items. The template renders each prediction as an
   * `ion-item` containing a `.prediction-item` div (no `.prediction-card`
   * class is used — see predictions.page.html). We target `.prediction-item`
   * because it's stable and unique per prediction.
   */
  readonly predictionCards: Locator;

  /**
   * "No predictions submitted..." card shown on the Current tab when the
   * authenticated user has no predictions for the current gameweek.
   */
  readonly noPredictionsMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.groupSelect = page.locator('ion-select.group-select');
    this.noGroupsState = page.locator('.no-groups-state');
    this.joinGroupButton = page.locator('.no-groups-state ion-button');
    this.segmentControl = page.locator('ion-segment.predictions-segment');
    this.currentTab = page.locator('ion-segment-button[value="current"]');
    this.historyTab = page.locator('ion-segment-button[value="history"]');
    this.predictionCards = page.locator('.prediction-item');
    this.noPredictionsMessage = page.locator('.no-predictions');
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/player/predictions');
    await this.waitForAppReady();
  }

  /**
   * Returns true if the AuthGuard redirected the browser to the login page
   * (i.e. no valid test session). Mirrors the pattern used by
   * `MatchesPage.isRedirectedToLogin()`.
   */
  async isRedirectedToLogin(): Promise<boolean> {
    await this.page
      .waitForURL(/\/(player\/predictions|auth\/login)/, { timeout: 5_000 })
      .catch(() => {
        // If neither URL matches, fall through and let the caller assert.
      });
    return new URL(this.page.url()).pathname.startsWith('/auth/login');
  }

  /**
   * Smoke assertion for the predictions page itself. Two valid content
   * paths depending on the authenticated user's group membership:
   *
   *   1. No-groups path: `.no-groups-state` is visible and contains a
   *      "Join a group" button.
   *   2. Has-groups path: segment control is rendered AND the group
   *      selector is visible.
   *
   * Either satisfies the smoke contract — we don't control seeded data.
   */
  async assertPageLoaded(): Promise<void> {
    const noGroupsCount = await this.noGroupsState.count();

    if (noGroupsCount > 0) {
      // Empty-state path: verify the join-a-group CTA is rendered.
      await expect(this.noGroupsState).toBeVisible();
      await expect(this.joinGroupButton).toBeVisible();
      await expect(this.joinGroupButton).toContainText(/Join a group/i);
      return;
    }

    // Has-groups path: segment + group selector must both be present.
    await expect(this.segmentControl).toBeVisible();
    await expect(this.currentTab).toBeVisible();
    await expect(this.historyTab).toBeVisible();
    await expect(this.groupSelect).toBeVisible();
  }
}
