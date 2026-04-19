import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the Group Admin Leaderboard page (/group-admin/leaderboard).
 *
 * This route is guarded by AuthGuard (expectedRole: 'group-admin'). Without
 * a valid group-admin session the app redirects to /auth/login. Tests
 * should call `isRedirectedToLogin()` to branch between the rendered-page
 * path and the redirected-to-login path.
 *
 * Task 4.1 wired this page to Supabase via SupabaseDataService. The page
 * renders one of three valid shapes:
 *   - Loading:     `.loading-state` with an `ion-spinner` (transient)
 *   - Empty state: `.empty-state` card with "No Groups Created" copy — shown
 *                  when the admin manages zero groups
 *   - Populated:   `ion-list` of `.group-item` rows, one per managed group
 * Any of empty / populated satisfies the smoke contract.
 *
 * Mirrors `PlayerStandingsPage` — the two pages share a template shape but
 * use different empty-state copy ("Created" vs "Joined") and role-scoped
 * navigation affordances.
 */
export class GroupAdminLeaderboardPage extends BasePage {
  /** Loading spinner shown while `ionViewWillEnter` resolves standings. */
  readonly loadingSpinner: Locator;

  /** Empty-state card shown when the admin has no managed groups. */
  readonly emptyState: Locator;

  /** "No Groups Created" heading inside the empty-state card. */
  readonly emptyStateHeading: Locator;

  /** All rendered group rows (zero or more depending on DB contents). */
  readonly groupItems: Locator;

  /** Page heading ("My Groups") — always rendered when the page mounts. */
  readonly pageHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.loadingSpinner = page.locator('.loading-state ion-spinner');
    this.emptyState = page.locator('ion-card.empty-state');
    this.emptyStateHeading = page.locator('ion-card.empty-state h3');
    this.groupItems = page.locator('ion-item.group-item');
    this.pageHeading = page.locator('.page-header h1');
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/group-admin/leaderboard');
    await this.waitForAppReady();
  }

  /**
   * Returns true if the AuthGuard redirected the browser to the login page
   * (i.e. no valid group-admin session). Mirrors the pattern used by
   * `MatchesPage.isRedirectedToLogin()`.
   */
  async isRedirectedToLogin(): Promise<boolean> {
    await this.page
      .waitForURL(/\/(group-admin\/leaderboard|auth\/login)/, { timeout: 5_000 })
      .catch(() => {
        // If neither URL matches, fall through and let the caller assert.
      });
    return new URL(this.page.url()).pathname.startsWith('/auth/login');
  }

  /**
   * Smoke assertion for the leaderboard page itself. Two valid content
   * paths after the loading spinner clears:
   *
   *   1. Empty-state path: `.empty-state` card visible with "No Groups
   *      Created" copy.
   *   2. Populated path: at least one `.group-item` row rendered.
   *
   * We don't control seeded data, so either satisfies the smoke contract.
   * The "My Groups" page heading is always present and acts as a baseline
   * signal that the page actually mounted.
   */
  async assertPageLoaded(): Promise<void> {
    // Wait for the loading spinner to disappear so the post-load state has
    // rendered.
    await expect(this.loadingSpinner).toHaveCount(0, { timeout: 10_000 });

    // Baseline: page heading is always rendered.
    await expect(this.pageHeading).toBeVisible();
    await expect(this.pageHeading).toHaveText('My Groups');

    const emptyCount = await this.emptyState.count();
    if (emptyCount > 0) {
      await expect(this.emptyState).toBeVisible();
      await expect(this.emptyStateHeading).toHaveText('No Groups Created');
      return;
    }

    // Populated path — verify at least one group row rendered.
    await expect(this.groupItems.first()).toBeVisible();
  }
}
