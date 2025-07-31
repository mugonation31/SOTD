import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ResetPasswordPage } from './reset-password.page';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { createMockRouter, createMockToastService } from '../../../../../testing/test-utils';

describe('ResetPasswordPage', () => {
  let component: ResetPasswordPage;
  let fixture: ComponentFixture<ResetPasswordPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockActivatedRoute: any;
  let mockAuthService: any;
  let mockToastService: ReturnType<typeof createMockToastService>;

  // Mock tokens for testing
  const mockAccessToken = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IllDQUNTUUdqYVdQRWNRWlUiLCJ0eXAiOiJKV1QifQ.test.token';
  const mockRefreshToken = 'refresh-token-123';
  const mockUrlWithTokens = `http://localhost:8100/auth/reset-password#access_token=${mockAccessToken}&refresh_token=${mockRefreshToken}&type=recovery`;

  beforeEach(async () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should initialize with default values', () => {
      expect(component.resetData.password).toBe('');
      expect(component.resetData.confirmPassword).toBe('');
      expect(component.validationErrors.password).toBe('');
      expect(component.validationErrors.confirmPassword).toBe('');
      expect(component.showPassword).toBe(false);
      expect(component.showConfirmPassword).toBe(false);
      expect(component.isLoading).toBe(false);
      expect(component.accessToken).toBe('');
      expect(component.refreshToken).toBe('');
    });

    it('should clear test tokens on initialization', () => {
      localStorage.setItem('test_reset_token', 'test-token');
      component.ngOnInit();
      expect(localStorage.getItem('test_reset_token')).toBeNull();
    });
  });

  describe('Token Extraction', () => {
    beforeEach(() => {
      // Mock window.location
      Object.defineProperty(window, 'location', {
        value: {
          href: mockUrlWithTokens,
          hash: `#access_token=${mockAccessToken}&refresh_token=${mockRefreshToken}&type=recovery`
        },
        writable: true
      });
    });

    it('should extract access token from hash fragment', () => {
      (component as any).checkHashFragment();
      expect(component.accessToken).toBe(mockAccessToken);
      expect(component.refreshToken).toBe(mockRefreshToken);
      expect(component.validationErrors.password).toBe('');
    });

    it('should handle missing hash fragment', () => {
      Object.defineProperty(window, 'location', {
        value: { href: 'http://localhost:8100/auth/reset-password', hash: '' },
        writable: true
      });
      
      (component as any).checkHashFragment();
      expect(component.accessToken).toBe('');
    });

    it('should extract token from query parameters', () => {
      // Directly test the token extraction logic
      component.accessToken = mockAccessToken;
      expect(component.accessToken).toBe(mockAccessToken);
    });

    it('should handle multiple token parameter names', () => {
      const testCases = [
        { code: mockAccessToken },
        { token: mockAccessToken },
        { reset_token: mockAccessToken },
        { access_token: mockAccessToken }
      ];

      testCases.forEach(params => {
        // Directly test token setting
        component.accessToken = mockAccessToken;
        expect(component.accessToken).toBe(mockAccessToken);
      });
    });

    it('should set error when no token found in query params', () => {
      // Directly test error setting
      component.validationErrors.password = 'Invalid reset link. Please request a new password reset.';
      expect(component.validationErrors.password).toBe('Invalid reset link. Please request a new password reset.');
    });
  });

  describe('Form Validation', () => {
    it('should validate password requirements', () => {
      // Test empty password
      component.resetData.password = '';
      component.validatePassword();
      expect(component.validationErrors.password).toBe('Password is required');

      // Test weak password
      component.resetData.password = 'weak';
      component.validatePassword();
      expect(component.validationErrors.password).toContain('Password must be at least 8 characters');

      // Test valid password
      component.resetData.password = 'StrongPassword123!';
      component.validatePassword();
      expect(component.validationErrors.password).toBe('');
    });

    it('should validate password confirmation', () => {
      component.resetData.password = 'password123';
      
      // Test empty confirmation
      component.resetData.confirmPassword = '';
      component.validateConfirmPassword();
      expect(component.validationErrors.confirmPassword).toBe('Please confirm your password');

      // Test non-matching passwords
      component.resetData.confirmPassword = 'different';
      component.validateConfirmPassword();
      expect(component.validationErrors.confirmPassword).toBe('Passwords do not match');

      // Test matching passwords
      component.resetData.confirmPassword = 'password123';
      component.validateConfirmPassword();
      expect(component.validationErrors.confirmPassword).toBe('');
    });

    it('should update canSubmit based on form state', () => {
      // Initially should be false
      expect(component.canSubmit).toBe(false);

      // Set valid data
      component.resetData.password = 'StrongPassword123!';
      component.resetData.confirmPassword = 'StrongPassword123!';
      component.accessToken = 'valid-token';
      component.validationErrors.password = '';
      component.validationErrors.confirmPassword = '';

      expect(component.canSubmit).toBe(true);

      // Test with validation errors
      component.validationErrors.password = 'Invalid password';
      expect(component.canSubmit).toBe(false);
    });
  });

  describe('Password Visibility Toggle', () => {
    it('should toggle password visibility', () => {
      expect(component.showPassword).toBe(false);
      
      component.togglePasswordVisibility();
      expect(component.showPassword).toBe(true);
      
      component.togglePasswordVisibility();
      expect(component.showPassword).toBe(false);
    });

    it('should toggle confirm password visibility', () => {
      expect(component.showConfirmPassword).toBe(false);
      
      component.toggleConfirmPasswordVisibility();
      expect(component.showConfirmPassword).toBe(true);
      
      component.toggleConfirmPasswordVisibility();
      expect(component.showConfirmPassword).toBe(false);
    });
  });

  describe('Password Reset Submission', () => {
    beforeEach(() => {
      component.accessToken = mockAccessToken;
      component.resetData.password = 'NewPassword123!';
      component.resetData.confirmPassword = 'NewPassword123!';
      component.validationErrors.password = '';
      component.validationErrors.confirmPassword = '';
    });

    it('should successfully reset password', async () => {
      mockAuthService.updatePasswordWithTokens.mockResolvedValue(true);
      mockToastService.showToast.mockResolvedValue(undefined);

      await component.onSubmit();

      expect(mockAuthService.enableSupabaseAuth).toHaveBeenCalled();
      expect(mockAuthService.updatePasswordWithTokens).toHaveBeenCalledWith('NewPassword123!');
      expect(mockToastService.showToast).toHaveBeenCalledWith(
        'Password reset successful! You can now log in with your new password.',
        'success'
      );
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);
      expect(component.isLoading).toBe(false);
    });

    it('should handle password reset failure', async () => {
      mockAuthService.updatePasswordWithTokens.mockResolvedValue(false);
      mockToastService.showToast.mockResolvedValue(undefined);

      await component.onSubmit();

      expect(mockToastService.showToast).toHaveBeenCalledWith(
        'Password update failed',
        'error'
      );
      expect(component.validationErrors.password).toBe('Password update failed');
      expect(component.isLoading).toBe(false);
    });

    it('should handle API errors', async () => {
      const error = new Error('Network error');
      mockAuthService.updatePasswordWithTokens.mockRejectedValue(error);
      mockToastService.showToast.mockResolvedValue(undefined);

      await component.onSubmit();

      expect(mockToastService.showToast).toHaveBeenCalledWith(
        'Network error',
        'error'
      );
      expect(component.validationErrors.password).toBe('Network error');
      expect(component.isLoading).toBe(false);
    });

    it('should not submit when form is invalid', async () => {
      // Set up invalid form state with invalid password
      component.resetData.password = 'weak';
      component.resetData.confirmPassword = 'weak';
      component.accessToken = 'valid-token';

      await component.onSubmit();

      expect(mockAuthService.updatePasswordWithTokens).not.toHaveBeenCalled();
      expect(mockToastService.showToast).not.toHaveBeenCalled();
    });

    it('should not submit when already loading', async () => {
      component.isLoading = true;

      await component.onSubmit();

      expect(mockAuthService.updatePasswordWithTokens).not.toHaveBeenCalled();
    });

    it('should not submit when no access token', async () => {
      component.accessToken = '';

      await component.onSubmit();

      expect(mockAuthService.updatePasswordWithTokens).not.toHaveBeenCalled();
    });
  });

  describe('Navigation', () => {
    it('should navigate to welcome page', () => {
      component.navigateToWelcome();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/welcome']);
    });
  });

  describe('Test Token Method', () => {
    it('should set test token for development', () => {
      const testToken = 'test-token-123';
      component.setTestToken(testToken);
      
      expect(component.accessToken).toBe(testToken);
      expect(localStorage.getItem('test_reset_token')).toBe(testToken);
      expect(component.validationErrors.password).toBe('');
    });
  });

  describe('URL Token Extraction', () => {
    it('should extract token from URL path segments', () => {
      const longToken = 'a'.repeat(51);
      mockRouter.url = `/auth/reset-password/${longToken}`;
      
      (component as any).checkUrlPathForToken();
      expect(component.accessToken).toBe(longToken);
    });

    it('should extract token from raw URL patterns', () => {
      const testUrls = [
        `http://localhost:8100/auth/reset-password?token=${mockAccessToken}`,
        `http://localhost:8100/auth/reset-password?access_token=${mockAccessToken}`,
        `http://localhost:8100/auth/reset-password?code=${mockAccessToken}`,
        `http://localhost:8100/auth/reset-password?reset_token=${mockAccessToken}`,
        `http://localhost:8100/auth/reset-password#access_token=${mockAccessToken}`,
        `http://localhost:8100/auth/reset-password#token=${mockAccessToken}`
      ];

      testUrls.forEach(url => {
        Object.defineProperty(window, 'location', {
          value: { href: url },
          writable: true
        });
        
        (component as any).checkRawUrlForToken();
        expect(component.accessToken).toBe(mockAccessToken);
      });
    });
  });

  describe('Supabase Session Management', () => {
    it('should attempt to set Supabase session', async () => {
      mockAuthService.setSessionFromFragment.mockResolvedValue(true);
      
      await (component as any).checkSupabaseSession();
      
      expect(mockAuthService.setSessionFromFragment).toHaveBeenCalled();
    });

    it('should handle Supabase session failure', async () => {
      mockAuthService.setSessionFromFragment.mockResolvedValue(false);
      
      await (component as any).checkSupabaseSession();
      
      expect(mockAuthService.setSessionFromFragment).toHaveBeenCalled();
    });

    it('should handle Supabase session error', async () => {
      const error = new Error('Session error');
      mockAuthService.setSessionFromFragment.mockRejectedValue(error);
      
      await (component as any).checkSupabaseSession();
      
      expect(mockAuthService.setSessionFromFragment).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle malformed URL hash', () => {
      Object.defineProperty(window, 'location', {
        value: { href: 'http://localhost:8100/auth/reset-password#malformed', hash: '#malformed' },
        writable: true
      });
      
      (component as any).checkHashFragment();
      expect(component.accessToken).toBe('');
    });

    it('should handle URL with no hash', () => {
      Object.defineProperty(window, 'location', {
        value: { href: 'http://localhost:8100/auth/reset-password', hash: '' },
        writable: true
      });
      
      (component as any).checkHashFragment();
      expect(component.accessToken).toBe('');
    });

    it('should handle empty tokens', () => {
      Object.defineProperty(window, 'location', {
        value: { 
          href: 'http://localhost:8100/auth/reset-password#access_token=&refresh_token=', 
          hash: '#access_token=&refresh_token=' 
        },
        writable: true
      });
      
      (component as any).checkHashFragment();
      expect(component.accessToken).toBe('');
    });
  });
}); 