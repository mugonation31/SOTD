import { type Page, type APIResponse, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page object for the production nginx-served container (Task 4.2 Batch 1).
 *
 * Unlike dev-server page objects, this one targets an absolute `prodUrl`
 * (default: http://localhost:8080) rather than Playwright's configured
 * baseURL. That lets the prod-build spec run alongside the existing
 * 44-count smoke suite without needing a second Playwright project.
 *
 * Keep this page object thin — it's a smoke harness for nginx + Dockerfile,
 * not a UI flow.
 */
export class ProductionBuildPage extends BasePage {
  readonly prodUrl: string;

  constructor(page: Page, prodUrl: string) {
    super(page);
    // Strip a trailing slash so path concat below stays predictable.
    this.prodUrl = prodUrl.replace(/\/$/, '');
  }

  /** Navigate to an absolute path on the prod container. */
  async goToProd(path: string): Promise<void> {
    const target = path.startsWith('/') ? path : `/${path}`;
    await this.page.goto(`${this.prodUrl}${target}`, {
      waitUntil: 'domcontentloaded',
    });
  }

  /** Assert the Angular SPA shell is present in the DOM. */
  async assertAppRootPresent(): Promise<void> {
    const appRoot = this.page.locator('app-root');
    await expect(appRoot, 'Expected <app-root> in the prod HTML — build output shape is wrong').toHaveCount(1);
  }

  /** Raw HTTP GET against a prod path. Uses Playwright's APIRequestContext
   *  so it's independent of browser navigation / cookies. */
  async request(path: string): Promise<APIResponse> {
    const target = path.startsWith('/') ? path : `/${path}`;
    return this.page.request.get(`${this.prodUrl}${target}`);
  }

  /** Return response headers lower-cased for consistent assertions. */
  static headers(response: APIResponse): Record<string, string> {
    const raw = response.headers();
    const normalized: Record<string, string> = {};
    for (const [k, v] of Object.entries(raw)) {
      normalized[k.toLowerCase()] = v;
    }
    return normalized;
  }

  /** Extract the first hashed main.*.js filename referenced in a prod HTML
   *  body — mirrors the regex used by scripts/smoke-test-prod.sh. */
  static extractMainJsAsset(html: string): string | null {
    const match = html.match(/main\.[a-z0-9]+\.js/i);
    return match ? match[0] : null;
  }
}
