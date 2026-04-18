import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the Super Admin Users & Groups page
 * (/super-admin/users-groups).
 *
 * This route is guarded by AuthGuard (expectedRole: 'super-admin'). Without
 * a valid super-admin session the app redirects to /auth/login. Tests
 * should call `isRedirectedToLogin()` to branch between the rendered-page
 * path and the redirected-to-login path. There is no seeded super-admin
 * test user in this environment, so the redirect path is the common case.
 *
 * Task 4.0.9 combined the previously separate Users and Groups pages into a
 * single segmented view. This page object never exercises mutations
 * (toggle is_active, delete group) — those would require seeded data and
 * cause real DB writes.
 */
export class SuperAdminUsersGroupsPage extends BasePage {
  /** The `ion-segment` that toggles between users and groups views. */
  readonly segmentControl: Locator;

  /** "Users" segment button (value="users"). */
  readonly usersSegmentButton: Locator;

  /** "Groups" segment button (value="groups"). */
  readonly groupsSegmentButton: Locator;

  /** All rendered user rows (zero or more depending on DB contents). */
  readonly userRows: Locator;

  /** All rendered group rows (zero or more depending on DB contents). */
  readonly groupRows: Locator;

  /** Empty-state message shown when the active segment has no rows. */
  readonly emptyState: Locator;

  /** Loading spinner shown while `ionViewWillEnter` resolves the lists. */
  readonly loadingSpinner: Locator;

  /** Logout button in the layout header (icon `log-out-outline`). */
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.segmentControl = page.locator('ion-segment');
    this.usersSegmentButton = page.locator('ion-segment-button[value="users"]');
    this.groupsSegmentButton = page.locator('ion-segment-button[value="groups"]');
    // Rows are `ion-item` inside the segment's `ion-list`. Filtering by
    // having an `ion-toggle` (users) or a danger button (groups) keeps the
    // selectors specific even though both segments share the same DOM
    // shape at the list level.
    this.userRows = page.locator('ion-item:has(ion-toggle)');
    this.groupRows = page.locator('ion-item:has(ion-button[color="danger"])');
    this.emptyState = page.locator('.empty-state');
    this.loadingSpinner = page.locator('.loading-state ion-spinner');
    this.logoutButton = page.locator('ion-button.logout-button');
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/super-admin/users-groups');
    await this.waitForAppReady();
  }

  /**
   * Returns true if the AuthGuard redirected the browser to the login page
   * (i.e. no valid super-admin session). Tests use this to short-circuit
   * page assertions and instead assert graceful redirect.
   */
  async isRedirectedToLogin(): Promise<boolean> {
    await this.page
      .waitForURL(/\/(super-admin\/users-groups|auth\/login)/, { timeout: 5_000 })
      .catch(() => {
        // If neither URL matches, fall through and let the caller assert
      });
    return new URL(this.page.url()).pathname.startsWith('/auth/login');
  }

  /**
   * Smoke assertion for the users-groups page: the segment control and
   * both segment buttons are present. Row counts are NOT asserted because
   * they vary with DB seeding.
   */
  async assertPageLoaded(): Promise<void> {
    // Wait for the loading spinner to disappear so the segment content
    // has rendered.
    await expect(this.loadingSpinner).toHaveCount(0, { timeout: 10_000 });

    await expect(this.segmentControl).toBeVisible();
    await expect(this.usersSegmentButton).toBeVisible();
    await expect(this.groupsSegmentButton).toBeVisible();
  }
}
