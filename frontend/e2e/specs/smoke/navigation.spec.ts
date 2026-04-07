import { test, expect } from '@playwright/test';
import { WelcomePage } from '../../pages/welcome.page';
import { LoginPage } from '../../pages/login.page';
import { SignupPage } from '../../pages/signup.page';

test.describe('Navigation between pages', () => {
  test('should navigate from welcome to login via header Login button', async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    await welcomePage.navigate();

    await welcomePage.clickLogin();

    await expect(page).toHaveURL(/\/auth\/login/);

    const loginPage = new LoginPage(page);
    await expect(loginPage.heading).toBeVisible();
  });

  test('should navigate from login to signup via "Create an account" link', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    await loginPage.clickSignupLink();

    await expect(page).toHaveURL(/\/auth\/signup/);

    const signupPage = new SignupPage(page);
    await expect(signupPage.heading).toBeVisible();
  });

  test('should navigate from signup to login via "Login" link', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.navigate();

    await signupPage.clickLoginLink();

    await expect(page).toHaveURL(/\/auth\/login/);

    const loginPage = new LoginPage(page);
    await expect(loginPage.heading).toBeVisible();
  });

  test('should navigate from login to forgot password page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    await loginPage.clickForgotPassword();

    await expect(page).toHaveURL(/\/auth\/forgot-password/);
  });

  test('should navigate from login back to welcome via logo click', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    await loginPage.clickLogo();

    await expect(page).toHaveURL(/\/welcome/);
  });

  test('should redirect unknown routes to auth/login', async ({ page }) => {
    await page.goto('/nonexistent-page', { waitUntil: 'domcontentloaded' });

    // The wildcard route redirects to auth/login
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});
