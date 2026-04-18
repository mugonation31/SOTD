import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the Super Admin Dashboard page (/super-admin/dashboard).
 *
 * This route is guarded by AuthGuard (expectedRole: 'super-admin'). Without
 * a valid super-admin session the app redirects to /auth/login. Tests
 * should call `isRedirectedToLogin()` to branch between the rendered-
 * dashboard path and the redirected-to-login path. There is no seeded
 * super-admin test user in this environment, so the redirect path is the
 * common case.
 *
 * Task 4.0 wired this page up:
 *  - 4 stat cards (Total Users, Total Groups, Active Gameweek, Last Match Sync)
 *  - "Sync Matches Now" button with cooldown countdown
 *  - 2-tab layout (Dashboard + Users & Groups) with logout in header
 */
export class SuperAdminDashboardPage extends BasePage {
  /** All rendered stat cards. Task 4.0 contract: exactly 4 when loaded. */
  readonly statCards: Locator;

  /**
   * "Sync Matches Now" button. Targeted by stable text rather than a
   * dynamic class so it survives template restyling. Visible only when
   * there is no active cooldown (`syncCountdownSeconds <= 0`).
   */
  readonly syncButton: Locator;

  /**
   * Cooldown text shown in place of the sync button while a countdown is
   * active. Asserts shape, never the exact second value.
   */
  readonly cooldownText: Locator;

  /** Logout button in the layout header (icon `log-out-outline`). */
  readonly logoutButton: Locator;

  /**
   * The two `ion-tab-button`s in the bottom tab bar (Dashboard, Users &
   * Groups). Used to assert Task 4.0's reduced 2-tab layout.
   */
  readonly tabButtons: Locator;

  /** Loading spinner shown while `ionViewWillEnter` resolves stats. */
  readonly loadingSpinner: Locator;

  constructor(page: Page) {
    super(page);
    this.statCards = page.locator('.stat-card');
    // The button is a real ion-button containing the literal text.
    this.syncButton = page.locator('ion-button', { hasText: 'Sync Matches Now' });
    this.cooldownText = page.locator('.cooldown-text');
    this.logoutButton = page.locator('ion-button.logout-button');
    this.tabButtons = page.locator('ion-tab-button');
    this.loadingSpinner = page.locator('.loading-state ion-spinner');
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/super-admin/dashboard');
    await this.waitForAppReady();
  }

  /**
   * Returns true if the AuthGuard redirected the browser to the login page
   * (i.e. no valid super-admin session). Tests use this to short-circuit
   * dashboard assertions and instead assert graceful redirect.
   */
  async isRedirectedToLogin(): Promise<boolean> {
    await this.page
      .waitForURL(/\/(super-admin\/dashboard|auth\/login)/, { timeout: 5_000 })
      .catch(() => {
        // If neither URL matches, fall through and let the caller assert
      });
    return new URL(this.page.url()).pathname.startsWith('/auth/login');
  }

  /**
   * Smoke assertion for the dashboard itself: the 4 stat cards are
   * rendered AND the 2-tab layout is present. The sync button is NOT
   * asserted unconditionally — it's hidden during the cooldown countdown,
   * and we don't control sync state in smoke tests.
   */
  async assertPageLoaded(): Promise<void> {
    // Wait for the loading spinner to disappear so stat cards have rendered
    await expect(this.loadingSpinner).toHaveCount(0, { timeout: 10_000 });

    // Task 4.0.1-4.0.4 contract: exactly 4 stat cards
    await expect(this.statCards).toHaveCount(4);

    // Task 4.0.8 contract: 2-tab layout (Dashboard + Users & Groups)
    await expect(this.tabButtons).toHaveCount(2);
  }
}
