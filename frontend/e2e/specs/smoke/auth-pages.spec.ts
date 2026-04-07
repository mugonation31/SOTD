import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { SignupPage } from '../../pages/signup.page';

test.describe('Auth pages load correctly', () => {
  test.describe('Login page', () => {
    test('should display the login form with all required elements', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();

      await loginPage.assertPageLoaded();
    });

    test('should show the "Welcome Back" heading and subheading', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();

      await expect(loginPage.heading).toHaveText('Welcome Back');
      await expect(loginPage.subheading).toHaveText('Sign in to continue');
    });

    test('should have a forgot password link', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();

      await expect(loginPage.forgotPasswordLink).toBeVisible();
      await expect(loginPage.forgotPasswordLink).toHaveText('Forgot Password?');
    });

    test('should have a link to the signup page', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();

      await expect(loginPage.signupLink).toBeVisible();
      await expect(loginPage.signupLink).toHaveText('Create an account');
    });

    test('should have the login button initially present', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();

      await expect(loginPage.submitButton).toBeVisible();
      await expect(loginPage.submitButton).toContainText('Login');
    });
  });

  test.describe('Signup page', () => {
    test('should display the signup form with all required fields', async ({ page }) => {
      const signupPage = new SignupPage(page);
      await signupPage.navigate();

      await signupPage.assertPageLoaded();
    });

    test('should show the "Create Account" heading', async ({ page }) => {
      const signupPage = new SignupPage(page);
      await signupPage.navigate();

      await expect(signupPage.heading).toHaveText('Create Account');
      await expect(signupPage.subheading).toHaveText('Join us and start predicting matches');
    });

    test('should have a terms checkbox and legal links', async ({ page }) => {
      const signupPage = new SignupPage(page);
      await signupPage.navigate();

      await expect(signupPage.termsCheckbox).toBeVisible();
      await expect(signupPage.termsLink).toBeVisible();
      await expect(signupPage.privacyLink).toBeVisible();
    });

    test('should have a link to the login page for existing users', async ({ page }) => {
      const signupPage = new SignupPage(page);
      await signupPage.navigate();

      await expect(signupPage.loginLink).toBeVisible();
      await expect(signupPage.loginLink).toHaveText('Login');
    });

    test('should have the submit button with "Create Account" text', async ({ page }) => {
      const signupPage = new SignupPage(page);
      await signupPage.navigate();

      await expect(signupPage.submitButton).toBeVisible();
      await expect(signupPage.submitButton).toContainText('Create Account');
    });
  });
});
