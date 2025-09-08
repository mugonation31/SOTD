import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { createMockRouter } from '../../../../../testing/test-utils';

/**
 * Test configuration for ForgotPasswordPage tests
 * Centralizes mock services and test utilities
 */
export class ForgotPasswordTestConfig {
  static mockRouter = {
    navigate: jest.fn(),
    navigateByUrl: jest.fn(),
    url: '/auth/forgot-password',
    events: {
      subscribe: jest.fn(),
      pipe: jest.fn().mockReturnValue({
        subscribe: jest.fn()
      })
    },
    createUrlTree: jest.fn(),
    serializeUrl: jest.fn(),
    parseUrl: jest.fn(),
    isActive: jest.fn(),
    routerState: {
      snapshot: {
        url: '/auth/forgot-password'
      }
    }
  };

  static mockActivatedRoute = {
    queryParams: { subscribe: jest.fn() },
    params: { subscribe: jest.fn() }
  };

  static mockAuthService = {
    resetPassword: jest.fn(),
    login: jest.fn(),
    signup: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: jest.fn(),
    getCurrentUser: jest.fn(),
    getUserRole: jest.fn(),
    getDefaultDashboardRoute: jest.fn(),
    getFirstTimeRoute: jest.fn(),
    getUserDisplayName: jest.fn(),
    getTimeBasedGreeting: jest.fn(),
    getPersonalizedGreeting: jest.fn(),
    markFirstTimeUser: jest.fn(),
    markUserAsReturning: jest.fn(),
    isFirstTimeUser: jest.fn(),
    getToken: jest.fn(),
    clearAllUserData: jest.fn(),
    emergencyAuthReset: jest.fn(),
    clearAuthLocks: jest.fn(),
    enableSupabaseAuth: jest.fn(),
    disableSupabaseAuth: jest.fn(),
    setSessionFromFragment: jest.fn(),
    updatePasswordWithTokens: jest.fn()
  };

  /**
   * Configure TestBed with common providers
   */
  static configureTestBed() {
    return TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: this.mockRouter },
        { provide: ActivatedRoute, useValue: this.mockActivatedRoute },
        { provide: AuthService, useValue: this.mockAuthService }
      ]
    });
  }

  /**
   * Clear all mock function calls
   */
  static clearMocks(): void {
    jest.clearAllMocks();
    this.mockRouter.navigate.mockClear();
    this.mockRouter.navigateByUrl.mockClear();
    this.mockAuthService.resetPassword.mockClear();
  }
}

/**
 * Test utilities for forgot password tests
 */
export class ForgotPasswordTestUtils {
  /**
   * Create a valid email for testing
   */
  static createValidEmail(): string {
    return 'test@example.com';
  }

  /**
   * Create an invalid email for testing
   */
  static createInvalidEmail(): string {
    return 'invalid-email';
  }

  /**
   * Create an empty email for testing
   */
  static createEmptyEmail(): string {
    return '';
  }

  /**
   * Mock successful password reset response
   */
  static mockSuccessfulReset(): { error: null } {
    return { error: null };
  }

  /**
   * Mock failed password reset response
   */
  static mockFailedReset(errorMessage: string = 'Failed to send reset email'): { error: any } {
    return {
      error: {
        message: errorMessage,
        status: 400
      }
    };
  }

  /**
   * Mock network error response
   */
  static mockNetworkError(): { error: any } {
    return {
      error: {
        message: 'Network error',
        status: 0
      }
    };
  }

  /**
   * Validate email format using the same regex as the component
   */
  static isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  /**
   * Get expected validation error for email
   */
  static getExpectedValidationError(email: string): string {
    if (!email) {
      return 'Email is required';
    }
    if (!this.isValidEmail(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  }
} 