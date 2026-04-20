/**
 * Smoke tests for Task 4.2 Batch 1 — Production Docker build + nginx config.
 *
 * These tests are OPT-IN. They target the nginx-served prod container
 * (default: http://localhost:8080), NOT the dev server on :3048 that the
 * rest of the smoke suite uses. If the container isn't reachable, every
 * test in this file is skipped so the regular suite stays green.
 *
 * Usage:
 *
 *   # Start the prod container first:
 *   docker compose --profile production up -d --build
 *
 *   # Then run this spec:
 *   npx playwright test e2e/specs/smoke/production-build.spec.ts
 *
 *   # Tear down:
 *   docker compose --profile production down
 *
 * Override the target with PROD_URL=... if you've published the container
 * on a different host/port.
 */
import { test, expect, request as playwrightRequest } from '@playwright/test';
import { ProductionBuildPage } from '../../pages/production-build.page';

const PROD_URL = process.env['PROD_URL'] || 'http://localhost:8080';

test.describe('Production build (Task 4.2 Batch 1 smoke)', () => {
  // Probe the container once before the suite runs. If it's down, skip every
  // test in the file — this keeps the prod spec opt-in and the regular smoke
  // suite unaffected by a missing container.
  test.beforeAll(async () => {
    const api = await playwrightRequest.newContext();
    try {
      const res = await api.get(`${PROD_URL}/`, { timeout: 2000 });
      if (!res.ok()) {
        test.skip(
          true,
          `Prod container at ${PROD_URL} returned ${res.status()} — skipping prod smoke. Start it with: docker compose --profile production up -d --build`
        );
      }
    } catch (err) {
      test.skip(
        true,
        `Prod container at ${PROD_URL} is not reachable (${(err as Error).message}) — skipping prod smoke. Start it with: docker compose --profile production up -d --build`
      );
    } finally {
      await api.dispose();
    }
  });

  test('should load the SPA at the root URL with <app-root> present and no JS errors', async ({ page }) => {
    const jsErrors: string[] = [];
    page.on('pageerror', (err) => {
      jsErrors.push(err.message);
    });

    const prod = new ProductionBuildPage(page, PROD_URL);
    await prod.goToProd('/');
    await prod.assertAppRootPresent();

    // Angular bootstraps after DOMContentLoaded — give the engine a tick to
    // surface any bootstrap-time exceptions. `domcontentloaded` already fired
    // above, so waiting for `load` is a bounded, non-arbitrary wait.
    await page.waitForLoadState('load');

    expect(jsErrors, `Unexpected JS errors on prod root load:\n${jsErrors.join('\n')}`).toHaveLength(0);
  });

  test('should serve the SPA fallback for deep links (nginx try_files)', async ({ page }) => {
    const prod = new ProductionBuildPage(page, PROD_URL);
    await prod.goToProd('/player/matches');

    // nginx's try_files $uri $uri/ /index.html should return the SPA shell
    // with a 200 (NOT a 404) — Angular Router takes over from there.
    await prod.assertAppRootPresent();
    expect(page.url()).toContain('/player/matches');
  });

  test('should return the expected security headers on the root response', async ({ page }) => {
    const prod = new ProductionBuildPage(page, PROD_URL);
    const res = await prod.request('/');
    expect(res.status(), 'root should respond 200').toBe(200);

    const headers = ProductionBuildPage.headers(res);

    expect(headers['x-frame-options'], 'X-Frame-Options must be DENY to prevent clickjacking').toBe('DENY');
    expect(headers['x-content-type-options'], 'X-Content-Type-Options must be nosniff').toBe('nosniff');
    expect(
      headers['referrer-policy'],
      'Referrer-Policy must be strict-origin-when-cross-origin'
    ).toBe('strict-origin-when-cross-origin');
    expect(
      headers['permissions-policy'],
      'Permissions-Policy must be set (non-empty)'
    ).toBeTruthy();

    // server_tokens off — the Server header should be just "nginx" with no
    // version. `nginx/1.27.x` would leak the patch level to attackers.
    const serverHeader = headers['server'] ?? '';
    expect(
      serverHeader,
      `Server header "${serverHeader}" should be "nginx" (no version). server_tokens off appears to be missing.`
    ).toBe('nginx');
  });

  test('should send no-cache headers on index.html so new deploys land immediately', async ({ page }) => {
    const prod = new ProductionBuildPage(page, PROD_URL);
    const res = await prod.request('/');
    expect(res.status()).toBe(200);

    const headers = ProductionBuildPage.headers(res);
    const cacheControl = headers['cache-control'] ?? '';

    expect(
      cacheControl,
      `Cache-Control on index.html should contain no-cache/no-store/must-revalidate. Got: "${cacheControl}"`
    ).toMatch(/no-cache/i);
    expect(cacheControl).toMatch(/no-store/i);
    expect(cacheControl).toMatch(/must-revalidate/i);
  });

  test('should send immutable cache headers on hashed JS bundles', async ({ page }) => {
    const prod = new ProductionBuildPage(page, PROD_URL);

    // Grab index.html body to extract a real hashed asset filename rather
    // than hard-coding one (hash changes on every build).
    const indexRes = await prod.request('/');
    expect(indexRes.status()).toBe(200);
    const body = await indexRes.text();

    const mainJs = ProductionBuildPage.extractMainJsAsset(body);
    expect(
      mainJs,
      'Could not find a main.*.js reference in index.html — Angular build output may have changed'
    ).not.toBeNull();

    const assetRes = await prod.request(`/${mainJs}`);
    expect(assetRes.status(), `hashed asset /${mainJs} should respond 200`).toBe(200);

    const headers = ProductionBuildPage.headers(assetRes);
    const cacheControl = headers['cache-control'] ?? '';

    expect(
      cacheControl,
      `Cache-Control on /${mainJs} should be "public, immutable". Got: "${cacheControl}"`
    ).toMatch(/public/i);
    expect(cacheControl).toMatch(/immutable/i);
  });
});
