import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the Player Matches page (/player/matches).
 *
 * This route is guarded by AuthGuard (expectedRole: 'player'). Without a
 * valid session the app redirects to /auth/login. Tests should call
 * `isRedirectedToLogin()` to branch between the rendered-matches path and
 * the redirected-to-login path.
 *
 * Task 2.2 wired this page to Supabase via SupabaseDataService. Depending
 * on DB contents the page may render match cards, or show an empty-state
 * message. Both are valid for a smoke test.
 */
export class MatchesPage extends BasePage {
  /** "Game Week N" heading */
  readonly gameweekHeading: Locator;

  /** Previous gameweek nav button (chevron-back icon) */
  readonly prevButton: Locator;

  /** Next gameweek nav button (chevron-forward icon) */
  readonly nextButton: Locator;

  /** All rendered match cards (zero or more) */
  readonly matchCards: Locator;

  /** Empty-state message shown when no fixtures exist for the gameweek */
  readonly emptyStateMessage: Locator;

  /** Home team name within a match card */
  readonly homeTeamNames: Locator;

  /** Away team name within a match card */
  readonly awayTeamNames: Locator;

  /** "Submit Predictions" button */
  readonly submitButton: Locator;

  /**
   * Task 3.1 — the `<app-countdown-timer>` rendered inside the deadline card.
   * Always present when the matches page renders; its inner text is either
   * `Xd Yh Zm Ws` (deadline in the future) or `Predictions Locked` (past /
   * missing deadline). Structural, not time-based.
   */
  readonly countdownTimer: Locator;

  /**
   * Task 3.1 — lock icon in the gameweek title. Only present when
   * `isLocked === true` (deadline passed). Uses the component class rather
   * than the generic `ion-icon[name="lock-closed-outline"]` to avoid
   * matching the icon inside the locked banner.
   */
  readonly lockIcon: Locator;

  /**
   * Task 3.1 — "Predictions Locked" banner in the deadline card. Only
   * rendered when `isLocked === true`.
   */
  readonly lockedBanner: Locator;

  /**
   * Task 3.1 — "RESET ALL" button. Present only when `isLocked === false`.
   * Used to assert the form hides the reset affordance after lock.
   */
  readonly resetButton: Locator;

  /** Score number inputs across all match cards (home + away). */
  readonly scoreInputs: Locator;

  constructor(page: Page) {
    super(page);
    this.gameweekHeading = page.locator('.gameweek-title h2');
    // Nav buttons are identified by the chevron icon they contain — resilient
    // to wrapping-element changes.
    this.prevButton = page.locator('.gameweek-navigation ion-button:has(ion-icon[name="chevron-back-outline"])');
    this.nextButton = page.locator('.gameweek-navigation ion-button:has(ion-icon[name="chevron-forward-outline"])');
    this.matchCards = page.locator('.match-card');
    this.emptyStateMessage = page.locator('.empty-state-message');
    this.homeTeamNames = page.locator('.match-card .team.home');
    this.awayTeamNames = page.locator('.match-card .team.away');
    this.submitButton = page.locator('.submit-button');
    this.countdownTimer = page.locator('app-countdown-timer');
    this.lockIcon = page.locator('.gameweek-title .lock-icon');
    this.lockedBanner = page.locator('.locked-banner');
    this.resetButton = page.locator('.reset-button');
    this.scoreInputs = page.locator('.match-card .score-input');
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/player/matches');
    await this.waitForAppReady();
  }

  /**
   * Returns true if the AuthGuard redirected the browser to the login page
   * (i.e. no valid test session). Tests use this to short-circuit
   * matches-page assertions and instead assert graceful redirect.
   */
  async isRedirectedToLogin(): Promise<boolean> {
    // Wait briefly for any client-side redirect to settle
    await this.page.waitForURL(/\/(player\/matches|auth\/login)/, { timeout: 5_000 }).catch(() => {
      // If neither URL matches, fall through and let the caller assert
    });
    return new URL(this.page.url()).pathname.startsWith('/auth/login');
  }

  /**
   * Smoke assertion for the matches page itself: heading + nav buttons are
   * present, and EITHER match cards exist OR the empty-state message is
   * shown. Both content paths are valid depending on Supabase data.
   */
  async assertPageLoaded(): Promise<void> {
    await expect(this.gameweekHeading).toBeVisible();
    await expect(this.gameweekHeading).toContainText(/Game Week \d+/);
    await expect(this.prevButton).toBeVisible();
    await expect(this.nextButton).toBeVisible();

    const matchCount = await this.matchCards.count();
    if (matchCount > 0) {
      // Data path: verify the first card has team names rendered
      await expect(this.homeTeamNames.first()).toBeVisible();
      await expect(this.awayTeamNames.first()).toBeVisible();
    } else {
      // Empty-state path: verify the Task 2.2 empty-state copy
      await expect(this.emptyStateMessage).toBeVisible();
      await expect(this.emptyStateMessage).toHaveText('No fixtures available for this gameweek');
    }
  }

  /**
   * Task 3.1 — assert the countdown timer element is present and rendering
   * one of its two valid content shapes:
   *   - running:  matches `/\d+d\s+\d+h\s+\d+m\s+\d+s/`
   *   - locked:   contains "Predictions Locked"
   * The assertion is deadline-agnostic so the test never has to know what
   * the live DB has seeded.
   */
  async assertCountdownTimerVisible(): Promise<void> {
    await expect(this.countdownTimer).toBeVisible();
    await expect(this.countdownTimer).toHaveText(
      /(\d+d\s+\d+h\s+\d+m\s+\d+s|Predictions Locked)/,
    );
  }

  /**
   * Task 3.1 — returns whether the page is currently rendering the locked
   * state (lock icon OR locked banner present). Tests use this to branch
   * between "unlocked expectations" and "locked expectations" without
   * hard-coding a deadline value.
   */
  async isInLockedState(): Promise<boolean> {
    const [iconCount, bannerCount] = await Promise.all([
      this.lockIcon.count(),
      this.lockedBanner.count(),
    ]);
    return iconCount > 0 || bannerCount > 0;
  }

  /**
   * Task 3.1 — when the page renders in locked state, all score inputs
   * must be `[disabled]` and the reset button must be hidden. Called only
   * after `isInLockedState()` returns true.
   */
  async assertLockedStateDisablesInputs(): Promise<void> {
    await expect(this.lockedBanner).toBeVisible();
    await expect(this.lockedBanner).toContainText('Predictions Locked');
    await expect(this.lockIcon).toBeVisible();
    await expect(this.resetButton).toHaveCount(0);

    const inputCount = await this.scoreInputs.count();
    for (let i = 0; i < inputCount; i++) {
      await expect(this.scoreInputs.nth(i)).toBeDisabled();
    }
  }
}
