import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the Login page (/auth/login).
 */
export class LoginPage extends BasePage {
  /** Header logo text */
  readonly logoText: Locator;

  /** Page heading - "Welcome Back" */
  readonly heading: Locator;

  /** Subheading - "Sign in to continue" */
  readonly subheading: Locator;

  /** Email input field */
  readonly emailInput: Locator;

  /** Password input field */
  readonly passwordInput: Locator;

  /** Password visibility toggle button */
  readonly passwordToggle: Locator;

  /** Login submit button */
  readonly submitButton: Locator;

  /** "Forgot Password?" link */
  readonly forgotPasswordLink: Locator;

  /** "Create an account" link to signup */
  readonly signupLink: Locator;

  constructor(page: Page) {
    super(page);
    this.logoText = page.locator('span.logo-predict3').first();
    this.heading = page.locator('h1', { hasText: 'Welcome Back' });
    this.subheading = page.locator('.auth-header p', { hasText: 'Sign in to continue' });
    this.emailInput = page.locator('ion-input[name="email"]');
    this.passwordInput = page.locator('ion-input[name="password"]');
    this.passwordToggle = page.locator('ion-item:has(ion-input[name="password"]) ion-button[fill="clear"]');
    this.submitButton = page.locator('ion-button[type="submit"]');
    this.forgotPasswordLink = page.locator('a[routerLink="/auth/forgot-password"]');
    this.signupLink = page.locator('a[routerLink="/auth/signup"]');
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/auth/login');
    await this.waitForAppReady();
  }

  /** Assert that the login form is fully rendered */
  async assertPageLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  /** Click the signup link to navigate to the signup page */
  async clickSignupLink(): Promise<void> {
    await this.signupLink.click();
  }

  /** Click the forgot password link */
  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  /** Click the logo to navigate back to welcome */
  async clickLogo(): Promise<void> {
    await this.logoText.click();
  }
}
