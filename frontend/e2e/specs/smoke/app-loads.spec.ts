import { test, expect } from '@playwright/test';
import { WelcomePage } from '../../pages/welcome.page';

test.describe('App loads', () => {
  test('should load the welcome page at the root URL', async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.navigateTo('/');
    await welcomePage.waitForAppReady();

    // The root URL should redirect to /welcome
    await expect(page).toHaveURL(/\/welcome/);
  });

  test('should display the Predict3 branding', async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.navigate();

    await expect(welcomePage.logoText).toBeVisible();
    await expect(welcomePage.logoText).toHaveText('Predict3');
  });

  test('should show the welcome heading and option cards', async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.navigate();

    await welcomePage.assertPageLoaded();
    await expect(welcomePage.subtitle).toHaveText("Choose how you'd like to get started:");
  });

  test('should display the How It Works and Features sections', async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.navigate();

    await expect(welcomePage.howItWorksHeading).toBeVisible();
    await expect(welcomePage.featuresHeading).toBeVisible();
  });

  test('should have a Login button in the header', async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.navigate();

    await expect(welcomePage.loginButton).toBeVisible();
  });

  /**
   * Task 4.2 Batch 2 regression guard. When a template references a class
   * property that doesn't exist (e.g. the `hasLoadedInitial` miss in
   * group-standings that initially shipped with Batch 2), `ng serve` fails
   * to compile and overlays the viewport with
   * `<iframe id="webpack-dev-server-client-overlay">`, which silently blocks
   * every click-based test downstream. A single up-front check that the
   * overlay is NOT present turns that class of regression into a loud,
   * obvious failure instead of surfacing as unrelated click timeouts in
   * navigation.spec.ts. In production builds the overlay is never present,
   * so this assertion is a no-op there.
   */
  test('should not render the webpack-dev-server compile-error overlay', async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.navigate();

    const overlay = page.locator('#webpack-dev-server-client-overlay');
    await expect(overlay).toHaveCount(0);
  });
});
