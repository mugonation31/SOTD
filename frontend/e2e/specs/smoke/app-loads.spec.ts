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
});
