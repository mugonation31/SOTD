import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordPage } from './forgot-password.page';
import { ForgotPasswordTestConfig, ForgotPasswordTestUtils } from './forgot-password.test.config';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

describe('ForgotPasswordPage', () => {
  let component: ForgotPasswordPage;
  let fixture: ComponentFixture<ForgotPasswordPage>;
  let mockRouter: any;
  let mockAuthService: any;

  beforeEach(async () => {
    ForgotPasswordTestConfig.configureTestBed();

    // Mock window.alert for JSDOM
    global.alert = jest.fn();

    fixture = TestBed.createComponent(ForgotPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockRouter = TestBed.inject(Router);
    mockAuthService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    ForgotPasswordTestConfig.clearMocks();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with empty email and no validation error', () => {
      expect(component.email).toBe('');
      expect(component.validationError).toBe('');
    });

    it('should not allow submission initially', () => {
      expect(component.canSubmit).toBe(false);
    });
  });

  describe('Email Validation', () => {
    it('should validate empty email', () => {
      component.email = ForgotPasswordTestUtils.createEmptyEmail();
      component.validateEmail();
      expect(component.validationError).toBe('Email is required');
      expect(component.canSubmit).toBe(false);
    });

    it('should validate invalid email format', () => {
      component.email = ForgotPasswordTestUtils.createInvalidEmail();
      component.validateEmail();
      expect(component.validationError).toBe('Please enter a valid email address');
      expect(component.canSubmit).toBe(false);
    });

    it('should validate valid email format', () => {
      component.email = ForgotPasswordTestUtils.createValidEmail();
      component.validateEmail();
      expect(component.validationError).toBe('');
      expect(component.canSubmit).toBe(true);
    });

    it('should validate various email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user-name@domain.org',
        'user123@domain.net'
      ];

      validEmails.forEach(email => {
        component.email = email;
        component.validateEmail();
        expect(component.validationError).toBe('');
        expect(component.canSubmit).toBe(true);
      });
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'invalid-email',
        'test@',
        '@domain.com',
        'test@domain',
        'test.domain.com'
      ];

      invalidEmails.forEach(email => {
        component.email = email;
        component.validateEmail();
        expect(component.validationError).toBe('Please enter a valid email address');
        expect(component.canSubmit).toBe(false);
      });
    });
  });

  describe('Form Submission', () => {
    beforeEach(() => {
      component.email = ForgotPasswordTestUtils.createValidEmail();
      component.validateEmail();
    });

    it('should call resetPassword with valid email', async () => {
      mockAuthService.resetPassword.mockResolvedValue(ForgotPasswordTestUtils.mockSuccessfulReset());

      await component.onSubmit();

      expect(mockAuthService.resetPassword).toHaveBeenCalledWith(component.email);
    });

    it('should navigate to login on successful reset', async () => {
      mockAuthService.resetPassword.mockResolvedValue(ForgotPasswordTestUtils.mockSuccessfulReset());

      await component.onSubmit();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should not submit when form is invalid', async () => {
      component.email = ForgotPasswordTestUtils.createInvalidEmail();
      component.validateEmail();

      await component.onSubmit();

      expect(mockAuthService.resetPassword).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should handle reset password failure', async () => {
      const errorMessage = 'Failed to send reset email. Please try again.';
      mockAuthService.resetPassword.mockResolvedValue(ForgotPasswordTestUtils.mockFailedReset(errorMessage));

      await component.onSubmit();

      expect(component.validationError).toBe(errorMessage);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should handle network errors', async () => {
      mockAuthService.resetPassword.mockRejectedValue(new Error('Network error'));

      await component.onSubmit();

      expect(component.validationError).toBe('Something went wrong. Please try again later.');
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should handle unexpected errors', async () => {
      mockAuthService.resetPassword.mockRejectedValue(new Error('Unexpected error'));

      await component.onSubmit();

      expect(component.validationError).toBe('Something went wrong. Please try again later.');
    });
  });

  describe('Navigation', () => {
    it('should navigate to welcome page', () => {
      component.navigateToWelcome();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/welcome']);
    });
  });

  describe('Component State Management', () => {
    it('should update canSubmit when email changes', () => {
      // Initially should not allow submission
      expect(component.canSubmit).toBe(false);

      // Set valid email
      component.email = ForgotPasswordTestUtils.createValidEmail();
      component.validateEmail();
      expect(component.canSubmit).toBe(true);

      // Set invalid email
      component.email = ForgotPasswordTestUtils.createInvalidEmail();
      component.validateEmail();
      expect(component.canSubmit).toBe(false);

      // Clear email
      component.email = '';
      component.validateEmail();
      expect(component.canSubmit).toBe(false);
    });

    it('should clear validation error when email becomes valid', () => {
      // Set invalid email first
      component.email = ForgotPasswordTestUtils.createInvalidEmail();
      component.validateEmail();
      expect(component.validationError).toBe('Please enter a valid email address');

      // Set valid email
      component.email = ForgotPasswordTestUtils.createValidEmail();
      component.validateEmail();
      expect(component.validationError).toBe('');
    });
  });

  describe('Error Handling', () => {
    it('should handle AuthService errors with specific messages', async () => {
      const authError = {
        error: {
          message: 'User not found',
          status: 404
        }
      };
      mockAuthService.resetPassword.mockResolvedValue(authError);

      // Set valid email first
      component.email = 'test@example.com';
      component.validateEmail();

      await component.onSubmit();

      expect(component.validationError).toBe('Failed to send reset email. Please try again.');
    });

    it('should handle empty error response', async () => {
      mockAuthService.resetPassword.mockResolvedValue({ error: {} });

      // Set valid email first
      component.email = 'test@example.com';
      component.validateEmail();

      await component.onSubmit();

      expect(component.validationError).toBe('Failed to send reset email. Please try again.');
    });
  });

  describe('Integration with AuthService', () => {
    it('should pass email to AuthService resetPassword method', async () => {
      const testEmail = 'test@example.com';
      component.email = testEmail;
      component.validateEmail();
      mockAuthService.resetPassword.mockResolvedValue(ForgotPasswordTestUtils.mockSuccessfulReset());

      await component.onSubmit();

      expect(mockAuthService.resetPassword).toHaveBeenCalledWith(testEmail);
    });

    it('should handle AuthService returning null error', async () => {
      mockAuthService.resetPassword.mockResolvedValue({ error: null });

      // Set valid email first
      component.email = 'test@example.com';
      component.validateEmail();

      await component.onSubmit();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
      expect(component.validationError).toBe('');
    });
  });
}); 