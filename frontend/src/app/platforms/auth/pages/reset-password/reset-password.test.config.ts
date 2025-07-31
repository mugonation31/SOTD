import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { createMockRouter, createMockToastService } from '../../../../../testing/test-utils';

/**
 * Test configuration for ResetPasswordPage tests
 * Provides common mocks and setup for all test suites
 */
export class ResetPasswordTestConfig {
  static mockRouter = createMockRouter();
  static mockToastService = createMockToastService();
  
  static mockActivatedRoute = {
    queryParams: { subscribe: jest.fn() },
    params: { subscribe: jest.fn() }
  };

  static mockAuthService = {
    enableSupabaseAuth: jest.fn(),
    updatePasswordWithTokens: jest.fn(),
    setSessionFromFragment: jest.fn(),
    resetPassword: jest.fn()
  };

  static mockSupabaseService = {
    client: {
      auth: {
        setSession: jest.fn(),
        getSession: jest.fn(),
        updateUser: jest.fn()
      }
    },
    user$: { subscribe: jest.fn() },
    profile$: { pipe: jest.fn().mockReturnValue({ subscribe: jest.fn() }) }
  };

  /**
   * Configure TestBed with common providers
   */
  static configureTestBed() {
    return TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: this.mockRouter },
        { provide: ActivatedRoute, useValue: this.mockActivatedRoute },
        { provide: AuthService, useValue: this.mockAuthService },
        { provide: ToastService, useValue: this.mockToastService }
      ]
    });
  }

  /**
   * Reset all mocks to their initial state
   */
  static resetMocks() {
    jest.clearAllMocks();
    
    // Reset router mock
    this.mockRouter.navigate.mockClear();
    this.mockRouter.navigateByUrl.mockClear();
    
    // Reset auth service mocks
    this.mockAuthService.enableSupabaseAuth.mockClear();
    this.mockAuthService.updatePasswordWithTokens.mockClear();
    this.mockAuthService.setSessionFromFragment.mockClear();
    this.mockAuthService.resetPassword.mockClear();
    
    // Reset toast service mocks
    this.mockToastService.showToast.mockClear();
    this.mockToastService.showSuccess.mockClear();
    this.mockToastService.showError.mockClear();
    
    // Reset Supabase service mocks
    this.mockSupabaseService.client.auth.setSession.mockClear();
    this.mockSupabaseService.client.auth.getSession.mockClear();
    this.mockSupabaseService.client.auth.updateUser.mockClear();
  }

  /**
   * Mock window.location for testing URL scenarios
   */
  static mockWindowLocation(url: string, hash: string = '') {
    Object.defineProperty(window, 'location', {
      value: { href: url, hash },
      writable: true
    });
  }

  /**
   * Mock fetch for testing API calls
   */
  static mockFetch(response: any) {
    const originalFetch = global.fetch;
    const mockFetch = jest.fn().mockResolvedValue(response);
    global.fetch = mockFetch;
    return { mockFetch, originalFetch };
  }

  /**
   * Restore original fetch
   */
  static restoreFetch(originalFetch: typeof global.fetch) {
    global.fetch = originalFetch;
  }

  /**
   * Create test tokens for testing
   */
  static createTestTokens() {
    return {
      accessToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IllDQUNTUUdqYVdQRWNRWlUiLCJ0eXAiOiJKV1QifQ.test.token',
      refreshToken: 'refresh-token-123',
      urlWithTokens: 'http://localhost:8100/auth/reset-password#access_token=eyJhbGciOiJIUzI1NiIsImtpZCI6IllDQUNTUUdqYVdQRWNRWlUiLCJ0eXAiOiJKV1QifQ.test.token&refresh_token=refresh-token-123&type=recovery'
    };
  }

  /**
   * Create test passwords for validation testing
   */
  static createTestPasswords() {
    return {
      valid: 'StrongPassword123!',
      weak: 'weak',
      short: 'Abc1!',
      noUppercase: 'password123!',
      noLowercase: 'PASSWORD123!',
      noNumber: 'Password!',
      noSpecial: 'Password123',
      empty: ''
    };
  }

  /**
   * Create test URLs for token extraction testing
   */
  static createTestUrls() {
    const tokens = this.createTestTokens();
    return {
      withHashFragment: `http://localhost:8100/auth/reset-password#access_token=${tokens.accessToken}`,
      withQueryParams: `http://localhost:8100/auth/reset-password?access_token=${tokens.accessToken}`,
      withMultipleParams: `http://localhost:8100/auth/reset-password?token=${tokens.accessToken}&refresh_token=${tokens.refreshToken}`,
      withoutTokens: 'http://localhost:8100/auth/reset-password',
      malformed: 'http://localhost:8100/auth/reset-password#malformed',
      emptyTokens: 'http://localhost:8100/auth/reset-password#access_token=&refresh_token='
    };
  }

  /**
   * Setup successful password reset scenario
   */
  static setupSuccessfulReset() {
    this.mockAuthService.setSessionFromFragment.mockResolvedValue(true);
    this.mockAuthService.updatePasswordWithTokens.mockResolvedValue(true);
    this.mockToastService.showToast.mockResolvedValue(undefined);
  }

  /**
   * Setup failed password reset scenario
   */
  static setupFailedReset() {
    this.mockAuthService.setSessionFromFragment.mockResolvedValue(true);
    this.mockAuthService.updatePasswordWithTokens.mockResolvedValue(false);
    this.mockToastService.showToast.mockResolvedValue(undefined);
  }

  /**
   * Setup network error scenario
   */
  static setupNetworkError() {
    this.mockAuthService.setSessionFromFragment.mockResolvedValue(true);
    this.mockAuthService.updatePasswordWithTokens.mockRejectedValue(new Error('Network error'));
    this.mockToastService.showToast.mockResolvedValue(undefined);
  }

  /**
   * Setup invalid token scenario
   */
  static setupInvalidToken() {
    this.mockAuthService.setSessionFromFragment.mockResolvedValue(false);
    this.mockAuthService.updatePasswordWithTokens.mockResolvedValue(false);
    this.mockToastService.showToast.mockResolvedValue(undefined);
  }
}

/**
 * Test utilities for common assertions
 */
export class ResetPasswordTestUtils {
  /**
   * Assert that password reset was successful
   */
  static assertSuccessfulReset(
    authService: any,
    toastService: any,
    router: any,
    expectedPassword: string
  ) {
    expect(authService.enableSupabaseAuth).toHaveBeenCalled();
    expect(authService.updatePasswordWithTokens).toHaveBeenCalledWith(expectedPassword);
    expect(toastService.showToast).toHaveBeenCalledWith(
      'Password reset successful! You can now log in with your new password.',
      'success'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  }

  /**
   * Assert that password reset failed
   */
  static assertFailedReset(toastService: any, router: any) {
    expect(toastService.showToast).toHaveBeenCalledWith(
      'Failed to reset password. Please try again.',
      'error'
    );
    expect(router.navigate).not.toHaveBeenCalled();
  }

  /**
   * Assert that form validation is working correctly
   */
  static assertFormValidation(
    component: any,
    password: string,
    confirmPassword: string,
    expectedValid: boolean
  ) {
    component.resetData.password = password;
    component.resetData.confirmPassword = confirmPassword;
    component.validatePassword();
    component.validateConfirmPassword();
    
    expect(component.canSubmit).toBe(expectedValid);
  }

  /**
   * Assert that tokens are extracted correctly
   */
  static assertTokenExtraction(
    component: any,
    expectedAccessToken: string,
    expectedRefreshToken?: string
  ) {
    expect(component.accessToken).toBe(expectedAccessToken);
    if (expectedRefreshToken) {
      expect(component.refreshToken).toBe(expectedRefreshToken);
    }
    expect(component.validationErrors.password).toBe('');
  }

  /**
   * Assert that error is shown for invalid reset link
   */
  static assertInvalidResetLink(component: any) {
    expect(component.accessToken).toBe('');
    expect(component.validationErrors.password).toBe('Invalid reset link. Please request a new password reset.');
    expect(component.canSubmit).toBe(false);
  }
} 