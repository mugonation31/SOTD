import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the Signup page (/auth/signup).
 */
export class SignupPage extends BasePage {
  /** Page heading - "Create Account" */
  readonly heading: Locator;

  /** Subheading text */
  readonly subheading: Locator;

  /** Username input */
  readonly usernameInput: Locator;

  /** First name input */
  readonly firstNameInput: Locator;

  /** Last name input */
  readonly lastNameInput: Locator;

  /** Email input */
  readonly emailInput: Locator;

  /** Password input */
  readonly passwordInput: Locator;

  /** Confirm password input */
  readonly confirmPasswordInput: Locator;

  /** Terms checkbox */
  readonly termsCheckbox: Locator;

  /** Submit button */
  readonly submitButton: Locator;

  /** Login link for existing users */
  readonly loginLink: Locator;

  /** Terms and Conditions link */
  readonly termsLink: Locator;

  /** Privacy Policy link */
  readonly privacyLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h1', { hasText: 'Create Account' });
    this.subheading = page.locator('.auth-header p', { hasText: 'Join us and start predicting matches' });
    this.usernameInput = page.locator('ion-input[name="username"]');
    this.firstNameInput = page.locator('ion-input[name="firstName"]');
    this.lastNameInput = page.locator('ion-input[name="lastName"]');
    this.emailInput = page.locator('ion-input[name="email"]');
    this.passwordInput = page.locator('ion-input[name="password"]');
    this.confirmPasswordInput = page.locator('ion-input[name="confirmPassword"]');
    this.termsCheckbox = page.locator('ion-checkbox[name="acceptedTerms"]');
    this.submitButton = page.locator('ion-button[type="submit"]');
    this.loginLink = page.locator('a[routerLink="/auth/login"]');
    this.termsLink = page.locator('.terms-text a', { hasText: 'Terms and Conditions' });
    this.privacyLink = page.locator('.terms-text a', { hasText: 'Privacy Policy' });
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/auth/signup');
    await this.waitForAppReady();
  }

  /** Assert that all signup form elements are rendered */
  async assertPageLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.confirmPasswordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  /** Click the login link to navigate to the login page.
   *  The link sits at the bottom of a long form inside ion-content's shadow-DOM scroll container.
   *  Ionic's ion-content uses an internal scroll element in shadow DOM, so standard Playwright
   *  scrolling cannot reach it. We use JS click which bypasses viewport checks.
   */
  async clickLoginLink(): Promise<void> {
    await this.loginLink.evaluate((el: HTMLElement) => el.click());
  }
}
