import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the Group Admin Predictions page
 * (`/group-admin/predictions`).
 *
 * Scoped intentionally to Task 4.2.11's E2E surface: navigation + the
 * redirect branch for unauth. No deeper selectors are defined because
 * the regression canary that uses this POM doesn't assert on rendered
 * content — it asserts on "guarded redirect happened" and "no uncaught
 * JS exceptions during the hydration pipeline." Richer selectors can
 * be added here once a seeded group-admin test account exists.
 */
export class GroupAdminPredictionsPage extends BasePage {
  /** Page heading (only asserted when an authenticated admin session exists) */
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('ion-title', { hasText: /Predictions/i });
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/group-admin/predictions');
    await this.waitForAppReady();
  }

  /**
   * True if the AuthGuard has redirected the visit to `/auth/login`.
   * Mirrors the pattern used in `super-admin-dashboard.page.ts` and
   * `matches.page.ts` for specs that run without a seeded session.
   */
  async isRedirectedToLogin(): Promise<boolean> {
    // Give the guard's redirect a beat to settle.
    await this.page.waitForLoadState('domcontentloaded');
    return /\/auth\/login/.test(this.page.url());
  }
}
