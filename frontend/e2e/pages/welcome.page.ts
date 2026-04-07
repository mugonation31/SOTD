import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the Welcome page (/welcome).
 * This is the app's landing page where users choose to create or join a group.
 */
export class WelcomePage extends BasePage {
  /** Header logo text */
  readonly logoText: Locator;

  /** Login button in the header toolbar */
  readonly loginButton: Locator;

  /** Main heading - "Welcome to Predict3" */
  readonly heading: Locator;

  /** Subtitle prompt */
  readonly subtitle: Locator;

  /** "Create a Group" card */
  readonly createGroupCard: Locator;

  /** "Join a Group" card */
  readonly joinGroupCard: Locator;

  /** "How It Works" section heading */
  readonly howItWorksHeading: Locator;

  /** "Features" section heading */
  readonly featuresHeading: Locator;

  constructor(page: Page) {
    super(page);
    // Header elements
    this.logoText = page.locator('span.logo-predict3').first();
    this.loginButton = page.locator('ion-header ion-button', { hasText: 'Login' });

    // Main content
    this.heading = page.locator('h1', { hasText: 'Welcome to Predict3' });
    this.subtitle = page.locator('.welcome-container > p');

    // Option cards - use card title text for resilience
    this.createGroupCard = page.locator('ion-card', { hasText: 'Create a Group' });
    this.joinGroupCard = page.locator('ion-card', { hasText: 'Join a Group' });

    // Section headings
    this.howItWorksHeading = page.locator('h2', { hasText: 'How It Works' });
    this.featuresHeading = page.locator('h2', { hasText: 'Features' });
  }

  async navigate(): Promise<void> {
    await this.navigateTo('/welcome');
    await this.waitForAppReady();
  }

  /** Click the Login button in the header to go to the login page */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /** Click the "Create a Group" card */
  async clickCreateGroup(): Promise<void> {
    await this.createGroupCard.click();
  }

  /** Click the "Join a Group" card */
  async clickJoinGroup(): Promise<void> {
    await this.joinGroupCard.click();
  }

  /** Assert that all main welcome page elements are visible */
  async assertPageLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.createGroupCard).toBeVisible();
    await expect(this.joinGroupCard).toBeVisible();
  }
}
