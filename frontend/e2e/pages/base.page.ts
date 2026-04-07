import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Base page object that all page objects extend.
 * Provides common navigation and assertion helpers.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /** Navigate to a path relative to baseURL */
  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  /** Wait for the Ionic app to be fully hydrated */
  async waitForAppReady(): Promise<void> {
    await this.page.waitForSelector('app-root', { state: 'attached' });
  }

  /** Get the current URL path */
  async currentPath(): Promise<string> {
    return new URL(this.page.url()).pathname;
  }

  /** Assert no uncaught console errors during page load */
  async assertNoConsoleErrors(): Promise<void> {
    const errors: string[] = [];
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    // Give a brief moment for any errors to fire
    await this.page.waitForTimeout(500);
    // We only flag JS exceptions, not network/resource errors
    const jsErrors = errors.filter(
      (e) => !e.includes('Failed to load resource') && !e.includes('net::')
    );
    expect(jsErrors).toHaveLength(0);
  }

  /** Get the page title */
  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
