import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ResetPasswordPage } from './reset-password.page';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { createMockRouter, createMockToastService } from '../../../../../testing/test-utils';

describe('ResetPasswordPage Integration Tests', () => {
  let component: ResetPasswordPage;
  let fixture: ComponentFixture<ResetPasswordPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockActivatedRoute: any;
  let mockAuthService: any;
  let mockToastService: ReturnType<typeof createMockToastService>;
  let mockFetch: jest.Mock;
  let originalFetch: typeof global.fetch;

  const mockAccessToken = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IllDQUNTUUdqYVdQRWNRWlUiLCJ0eXAiOiJKV1QifQ.test.token';
  const mockRefreshToken = 'refresh-token-123';

  beforeEach(async () => {
    // Store original fetch
    originalFetch = global.fetch;
    mockFetch = jest.fn();
    global.fetch = mockFetch;

    mockRouter = createMockRouter();
    mockActivatedRoute = {
      queryParams: of({}),
      params: of({})
    };
    mockAuthService = {
      enableSupabaseAuth: jest.fn(),
      updatePasswordWithTokens: jest.fn(),
      setSessionFromFragment: jest.fn()
    };
    mockToastService = createMockToastService();

    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ResetPasswordPage
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ToastService, useValue: mockToastService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    // Restore original fetch
    global.fetch = originalFetch;
  });

  describe('Complete Password Reset Flow', () => {
    it('should complete full password reset flow successfully', async () => {
      // Setup: Mock URL with tokens
      Object.defineProperty(window, 'location', {
        value: {
          href: `http://localhost:8100/auth/reset-password#access_token=${mockAccessToken}&refresh_token=${mockRefreshToken}&type=recovery`,
          hash: `#access_token=${mockAccessToken}&refresh_token=${mockRefreshToken}&type=recovery`
        },
        writable: true
      });

      // Setup: Mock successful API responses
      mockAuthService.setSessionFromFragment.mockResolvedValue(true);
      mockAuthService.updatePasswordWithTokens.mockResolvedValue(true);
      mockToastService.showToast.mockResolvedValue(undefined);

      // Step 1: Initialize component
      component.ngOnInit();
      fixture.detectChanges();

      // Verify tokens are extracted
      expect(component.accessToken).toBe(mockAccessToken);
      expect(component.refreshToken).toBe(mockRefreshToken);

      // Step 2: Fill form with valid data
      component.resetData.password = 'NewStrongPassword123!';
      component.resetData.confirmPassword = 'NewStrongPassword123!';
      component.validatePassword();
      component.validateConfirmPassword();
      fixture.detectChanges();

      // Verify form is valid
      expect(component.validationErrors.password).toBe('');
      expect(component.validationErrors.confirmPassword).toBe('');
      expect(component.canSubmit).toBe(true);

      // Step 3: Submit form
      await component.onSubmit();

      // Verify all service calls
      expect(mockAuthService.enableSupabaseAuth).toHaveBeenCalled();
      expect(mockAuthService.updatePasswordWithTokens).toHaveBeenCalledWith('NewStrongPassword123!');
      expect(mockToastService.showToast).toHaveBeenCalledWith(
        'Password reset successful! You can now log in with your new password.',
        'success'
      );
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);

      // Verify loading state is reset
      expect(component.isLoading).toBe(false);
    });

    it('should handle complete flow with API failure', async () => {
      // Setup: Mock URL with tokens
      Object.defineProperty(window, 'location', {
        value: {
          href: `http://localhost:8100/auth/reset-password#access_token=${mockAccessToken}&refresh_token=${mockRefreshToken}&type=recovery`,
          hash: `#access_token=${mockAccessToken}&refresh_token=${mockRefreshToken}&type=recovery`
        },
        writable: true
      });

      // Setup: Mock API failure
      mockAuthService.setSessionFromFragment.mockResolvedValue(true);
      mockAuthService.updatePasswordWithTokens.mockResolvedValue(false);
      mockToastService.showToast.mockResolvedValue(undefined);

      // Step 1: Initialize component
      component.ngOnInit();
      fixture.detectChanges();

      // Step 2: Fill form with valid data
      component.resetData.password = 'NewStrongPassword123!';
      component.resetData.confirmPassword = 'NewStrongPassword123!';
      component.validatePassword();
      component.validateConfirmPassword();

      // Step 3: Submit form
      await component.onSubmit();

      // Verify error handling
      expect(mockToastService.showToast).toHaveBeenCalledWith(
        'Password update failed',
        'error'
      );
      expect(component.validationErrors.password).toBe('Password update failed');
      expect(component.isLoading).toBe(false);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });

  describe('UI Integration Tests', () => {
    beforeEach(() => {
      // Setup valid tokens
      Object.defineProperty(window, 'location', {
        value: {
          href: `http://localhost:8100/auth/reset-password#access_token=${mockAccessToken}`,
          hash: `#access_token=${mockAccessToken}`
        },
        writable: true
      });

      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should update UI based on form validation', () => {
      // Initially submit button should be disabled
      expect(component.canSubmit).toBe(false);

      // Fill password only
      component.resetData.password = 'ValidPassword123!';
      component.validatePassword();
      fixture.detectChanges();

      // Still disabled (no confirmation)
      expect(component.canSubmit).toBe(false);

      // Fill confirmation with mismatch
      component.resetData.confirmPassword = 'DifferentPassword123!';
      component.validateConfirmPassword();
      fixture.detectChanges();

      // Still disabled (passwords don't match)
      expect(component.canSubmit).toBe(false);

      // Fix confirmation
      component.resetData.confirmPassword = 'ValidPassword123!';
      component.validateConfirmPassword();
      fixture.detectChanges();

      // Now should be enabled
      expect(component.canSubmit).toBe(true);
    });

    it('should show/hide password fields correctly', () => {
      // Initially passwords should be hidden
      expect(component.showPassword).toBe(false);
      expect(component.showConfirmPassword).toBe(false);

      // Toggle password visibility
      component.togglePasswordVisibility();
      expect(component.showPassword).toBe(true);

      component.togglePasswordVisibility();
      expect(component.showPassword).toBe(false);

      // Toggle confirm password visibility
      component.toggleConfirmPasswordVisibility();
      expect(component.showConfirmPassword).toBe(true);

      component.toggleConfirmPasswordVisibility();
      expect(component.showConfirmPassword).toBe(false);
    });

    it('should handle loading state during submission', async () => {
      // Setup async operation
      mockAuthService.updatePasswordWithTokens.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve(true), 100))
      );

      // Fill form
      component.resetData.password = 'ValidPassword123!';
      component.resetData.confirmPassword = 'ValidPassword123!';
      component.validatePassword();
      component.validateConfirmPassword();

      // Submit and check loading state
      const submitPromise = component.onSubmit();
      expect(component.isLoading).toBe(true);

      await submitPromise;
      expect(component.isLoading).toBe(false);
    });
  });

  describe('Error Scenarios Integration', () => {
    it('should handle network errors gracefully', async () => {
      // Setup: Mock URL with tokens
      Object.defineProperty(window, 'location', {
        value: {
          href: `http://localhost:8100/auth/reset-password#access_token=${mockAccessToken}`,
          hash: `#access_token=${mockAccessToken}`
        },
        writable: true
      });

      // Setup: Mock network error
      mockAuthService.updatePasswordWithTokens.mockRejectedValue(new Error('Network error'));
      mockToastService.showToast.mockResolvedValue(undefined);

      component.ngOnInit();
      component.resetData.password = 'ValidPassword123!';
      component.resetData.confirmPassword = 'ValidPassword123!';
      component.validatePassword();
      component.validateConfirmPassword();

      await component.onSubmit();

      expect(mockToastService.showToast).toHaveBeenCalledWith('Network error', 'error');
      expect(component.validationErrors.password).toBe('Network error');
      expect(component.isLoading).toBe(false);
    });

    it('should handle invalid token scenarios', async () => {
      // Setup: Mock URL without tokens
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:8100/auth/reset-password',
          hash: ''
        },
        writable: true
      });

      component.ngOnInit();
      fixture.detectChanges();

      // Should show error for invalid reset link
      expect(component.validationErrors.password).toBe('Invalid reset link. Please request a new password reset.');
      expect(component.accessToken).toBe('');
      expect(component.canSubmit).toBe(false);
    });

    it('should handle expired token scenarios', async () => {
      // Setup: Mock URL with tokens
      Object.defineProperty(window, 'location', {
        value: {
          href: `http://localhost:8100/auth/reset-password#access_token=${mockAccessToken}`,
          hash: `#access_token=${mockAccessToken}`
        },
        writable: true
      });

      // Setup: Mock API error for expired token
      mockAuthService.updatePasswordWithTokens.mockResolvedValue(false);
      mockToastService.showToast.mockResolvedValue(undefined);

      component.ngOnInit();
      component.resetData.password = 'ValidPassword123!';
      component.resetData.confirmPassword = 'ValidPassword123!';
      component.validatePassword();
      component.validateConfirmPassword();

      await component.onSubmit();

      expect(mockToastService.showToast).toHaveBeenCalledWith(
        'Password update failed',
        'error'
      );
    });
  });

  describe('Token Extraction Integration', () => {
    it('should handle various token formats in URL', () => {
      const testCases = [
        {
          url: `http://localhost:8100/auth/reset-password?access_token=${mockAccessToken}`,
          expectedToken: mockAccessToken
        },
        {
          url: `http://localhost:8100/auth/reset-password?token=${mockAccessToken}`,
          expectedToken: mockAccessToken
        },
        {
          url: `http://localhost:8100/auth/reset-password?code=${mockAccessToken}`,
          expectedToken: mockAccessToken
        },
        {
          url: `http://localhost:8100/auth/reset-password?reset_token=${mockAccessToken}`,
          expectedToken: mockAccessToken
        },
        {
          url: `http://localhost:8100/auth/reset-password#access_token=${mockAccessToken}`,
          expectedToken: mockAccessToken
        }
      ];

      testCases.forEach(({ url, expectedToken }) => {
        Object.defineProperty(window, 'location', {
          value: { href: url, hash: url.includes('#') ? url.split('#')[1] : '' },
          writable: true
        });

        component.ngOnInit();
        expect(component.accessToken).toBe(expectedToken);
      });
    });

    it('should handle malformed URLs gracefully', () => {
      const malformedUrls = [
        'http://localhost:8100/auth/reset-password#malformed',
        'http://localhost:8100/auth/reset-password#access_token=',
        'http://localhost:8100/auth/reset-password#token=&refresh_token=',
        'invalid-url'
      ];

      malformedUrls.forEach(url => {
        Object.defineProperty(window, 'location', {
          value: { href: url, hash: url.includes('#') ? url.split('#')[1] : '' },
          writable: true
        });

        component.ngOnInit();
        expect(component.accessToken).toBe('');
      });
    });
  });

  describe('Form Validation Integration', () => {
    beforeEach(() => {
      // Setup valid tokens
      Object.defineProperty(window, 'location', {
        value: {
          href: `http://localhost:8100/auth/reset-password#access_token=${mockAccessToken}`,
          hash: `#access_token=${mockAccessToken}`
        },
        writable: true
      });

      component.ngOnInit();
    });

    it('should validate password strength requirements', () => {
      const testCases = [
        { password: '', expectedError: 'Password is required' },
        { password: 'weak', expectedError: 'Password must be at least 8 characters long, Password must contain at least one uppercase letter, Password must contain at least one number, Password must contain at least one special character (@$!%*?&)' },
        { password: '12345678', expectedError: 'Password must contain at least one uppercase letter, Password must contain at least one special character (@$!%*?&)' },
        { password: 'abcdefgh', expectedError: 'Password must contain at least one uppercase letter, Password must contain at least one number, Password must contain at least one special character (@$!%*?&)' },
        { password: 'ABCDEFGH', expectedError: 'Password must contain at least one number, Password must contain at least one special character (@$!%*?&)' },
        { password: 'Abcdefgh', expectedError: 'Password must contain at least one number, Password must contain at least one special character (@$!%*?&)' },
        { password: 'Abcdefgh1', expectedError: 'Password must contain at least one special character (@$!%*?&)' },
        { password: 'StrongPassword123!', expectedError: '' }
      ];

      testCases.forEach(({ password, expectedError }) => {
        component.resetData.password = password;
        component.validatePassword();
        expect(component.validationErrors.password).toBe(expectedError);
      });
    });

    it('should validate password confirmation matching', () => {
      component.resetData.password = 'ValidPassword123!';

      // Test empty confirmation
      component.resetData.confirmPassword = '';
      component.validateConfirmPassword();
      expect(component.validationErrors.confirmPassword).toBe('Please confirm your password');

      // Test non-matching confirmation
      component.resetData.confirmPassword = 'DifferentPassword123!';
      component.validateConfirmPassword();
      expect(component.validationErrors.confirmPassword).toBe('Passwords do not match');

      // Test matching confirmation
      component.resetData.confirmPassword = 'ValidPassword123!';
      component.validateConfirmPassword();
      expect(component.validationErrors.confirmPassword).toBe('');
    });

    it('should update canSubmit based on all validation criteria', () => {
      // Initially false (no password, no token)
      expect(component.canSubmit).toBe(false);

      // Add token
      component.accessToken = mockAccessToken;
      expect(component.canSubmit).toBe(false); // Still no password

      // Add password only
      component.resetData.password = 'ValidPassword123!';
      component.validatePassword();
      expect(component.canSubmit).toBe(false); // Still no confirmation

      // Add confirmation
      component.resetData.confirmPassword = 'ValidPassword123!';
      component.validateConfirmPassword();
      expect(component.canSubmit).toBe(true); // Now valid

      // Add validation error
      component.validationErrors.password = 'Invalid password';
      expect(component.canSubmit).toBe(false); // Invalid again

      // Clear error
      component.validationErrors.password = '';
      expect(component.canSubmit).toBe(true); // Valid again
    });
  });
}); 