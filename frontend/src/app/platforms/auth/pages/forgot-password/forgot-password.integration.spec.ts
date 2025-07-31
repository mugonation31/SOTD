import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ForgotPasswordPage } from './forgot-password.page';
import { ForgotPasswordTestConfig, ForgotPasswordTestUtils } from './forgot-password.test.config';

describe('ForgotPasswordPage Integration Tests', () => {
  let component: ForgotPasswordPage;
  let fixture: ComponentFixture<ForgotPasswordPage>;
  let mockRouter: any;
  let mockAuthService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: ForgotPasswordTestConfig.mockRouter },
        { provide: ActivatedRoute, useValue: ForgotPasswordTestConfig.mockActivatedRoute },
        { provide: AuthService, useValue: ForgotPasswordTestConfig.mockAuthService }
      ]
    }).compileComponents();

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

  describe('User Interface Integration', () => {
    it('should display form elements correctly', () => {
      const compiled = fixture.nativeElement;
      
      expect(compiled.querySelector('ion-input[name="email"]')).toBeTruthy();
      expect(compiled.querySelector('ion-button[type="submit"]')).toBeTruthy();
      expect(compiled.querySelector('ion-button').textContent).toContain('Send Reset Link');
    });

    it('should show validation error for empty email', () => {
      const compiled = fixture.nativeElement;
      const emailInput = compiled.querySelector('ion-input[name="email"]');
      
      // Trigger validation by setting empty email
      component.email = '';
      component.validateEmail();
      fixture.detectChanges();
      
      const errorMessage = compiled.querySelector('.error-message');
      expect(errorMessage.textContent).toContain('Email is required');
    });

    it('should show validation error for invalid email format', () => {
      const compiled = fixture.nativeElement;
      
      component.email = 'invalid-email';
      component.validateEmail();
      fixture.detectChanges();
      
      const errorMessage = compiled.querySelector('.error-message');
      expect(errorMessage.textContent).toContain('Please enter a valid email address');
    });

    it('should clear validation error for valid email', () => {
      const compiled = fixture.nativeElement;
      
      // Set invalid email first
      component.email = 'invalid-email';
      component.validateEmail();
      fixture.detectChanges();
      
      // Set valid email
      component.email = 'test@example.com';
      component.validateEmail();
      fixture.detectChanges();
      
      const errorNote = compiled.querySelector('ion-note');
      expect(errorNote).toBeFalsy();
    });

    it('should disable submit button when form is invalid', () => {
      const compiled = fixture.nativeElement;
      
      component.email = '';
      component.validateEmail();
      fixture.detectChanges();
      
      const submitButton = compiled.querySelector('ion-button[type="submit"]');
      expect(submitButton.disabled).toBe(true);
    });

    it('should enable submit button when form is valid', () => {
      const compiled = fixture.nativeElement;
      
      component.email = 'test@example.com';
      component.validateEmail();
      fixture.detectChanges();
      
      const submitButton = compiled.querySelector('ion-button[type="submit"]');
      expect(submitButton.disabled).toBe(false);
    });

    it('should show real-time validation feedback', () => {
      const compiled = fixture.nativeElement;
      
      // Start with empty email
      component.email = '';
      component.validateEmail(); // Call directly to avoid delay
      fixture.detectChanges();
      
      let errorMessage = compiled.querySelector('.error-message');
      expect(errorMessage.textContent).toContain('Email is required');
      
      // Type invalid email
      component.email = 'invalid';
      component.validateEmail(); // Call directly to avoid delay
      fixture.detectChanges();
      
      errorMessage = compiled.querySelector('.error-message');
      expect(errorMessage.textContent).toContain('Please enter a valid email address');
      
      // Type valid email
      component.email = 'test@example.com';
      component.validateEmail(); // Call directly to avoid delay
      fixture.detectChanges();
      
      errorMessage = compiled.querySelector('.error-message');
      expect(errorMessage).toBeFalsy();
    });

    it('should trigger validation on blur event', () => {
      const compiled = fixture.nativeElement;
      
      // Set invalid email and trigger blur
      component.email = 'invalid';
      component.onEmailBlur();
      fixture.detectChanges();
      
      const errorMessage = compiled.querySelector('.error-message');
      expect(errorMessage.textContent).toContain('Please enter a valid email address');
    });

    it('should display error messages with correct styling', () => {
      const compiled = fixture.nativeElement;
      
      component.email = 'invalid';
      component.validateEmail();
      fixture.detectChanges();
      
      const errorMessage = compiled.querySelector('.error-message');
      expect(errorMessage).toBeTruthy();
      expect(errorMessage.classList.contains('error-message')).toBe(true);
      expect(errorMessage.textContent).toContain('Please enter a valid email address');
    });

    it('should handle rapid validation state changes', () => {
      const compiled = fixture.nativeElement;
      
      // Rapid state changes
      component.email = '';
      component.validateEmail(); // Call directly to avoid delay
      fixture.detectChanges();
      
      let errorMessage = compiled.querySelector('.error-message');
      expect(errorMessage.textContent).toContain('Email is required');
      
      component.email = 'test@example.com';
      component.validateEmail(); // Call directly to avoid delay
      fixture.detectChanges();
      
      errorMessage = compiled.querySelector('.error-message');
      expect(errorMessage).toBeFalsy();
    });
  });

  describe('Form Submission Flow', () => {
    it('should handle successful password reset request', async () => {
      const testEmail = 'test@example.com';
      mockAuthService.resetPassword.mockResolvedValue(ForgotPasswordTestUtils.mockSuccessfulReset());
      
      component.email = testEmail;
      component.validateEmail();
      
      await component.onSubmit();
      
      expect(mockAuthService.resetPassword).toHaveBeenCalledWith(testEmail);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should handle failed password reset request', async () => {
      const errorMessage = 'Failed to send reset email. Please try again.';
      mockAuthService.resetPassword.mockResolvedValue(ForgotPasswordTestUtils.mockFailedReset(errorMessage));
      
      component.email = 'test@example.com';
      component.validateEmail();
      
      await component.onSubmit();
      
      expect(component.validationError).toBe(errorMessage);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should not submit form with invalid email', async () => {
      component.email = 'invalid-email';
      component.validateEmail();
      
      await component.onSubmit();
      
      expect(mockAuthService.resetPassword).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should not submit form with empty email', async () => {
      component.email = '';
      component.validateEmail();
      
      await component.onSubmit();
      
      expect(mockAuthService.resetPassword).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });

  describe('Email Validation Integration', () => {
    it('should validate various email formats correctly', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user_name@domain.org',
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
        'test.domain.com',
        'test@.com',
        'test@domain.',
        'test@domain.c', // Too short TLD
        'test@domain.c0m', // Invalid TLD character
        'test@@domain.com', // Double @
        'test@domain.com.' // Trailing dot
      ];

      invalidEmails.forEach(email => {
        component.email = email;
        component.validateEmail();
        expect(component.validationError).toBe('Please enter a valid email address');
        expect(component.canSubmit).toBe(false);
      });
    });

    it('should handle edge case email formats', () => {
      // Test with underscores
      component.email = 'test_user@example.com';
      component.validateEmail();
      expect(component.validationError).toBe('');
      expect(component.canSubmit).toBe(true);

      // Test with numbers
      component.email = 'user123@domain123.com';
      component.validateEmail();
      expect(component.validationError).toBe('');
      expect(component.canSubmit).toBe(true);

      // Test with dots
      component.email = 'user.name@domain.com';
      component.validateEmail();
      expect(component.validationError).toBe('');
      expect(component.canSubmit).toBe(true);
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle network errors gracefully', async () => {
      mockAuthService.resetPassword.mockRejectedValue(new Error('Network error'));
      
      component.email = 'test@example.com';
      component.validateEmail();
      
      await component.onSubmit();
      
      expect(component.validationError).toBe('Something went wrong. Please try again later.');
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should handle AuthService errors with specific messages', async () => {
      const authError = {
        error: {
          message: 'User not found',
          status: 404
        }
      };
      mockAuthService.resetPassword.mockResolvedValue(authError);
      
      component.email = 'nonexistent@example.com';
      component.validateEmail();
      
      await component.onSubmit();
      
      expect(component.validationError).toBe('Failed to send reset email. Please try again.');
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should handle empty error response', async () => {
      mockAuthService.resetPassword.mockResolvedValue({ error: {} });
      
      component.email = 'test@example.com';
      component.validateEmail();
      
      await component.onSubmit();
      
      expect(component.validationError).toBe('Failed to send reset email. Please try again.');
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });

  describe('Navigation Integration', () => {
    it('should navigate to welcome page when logo is clicked', () => {
      component.navigateToWelcome();
      
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/welcome']);
    });

    it('should have login link in footer', () => {
      const compiled = fixture.nativeElement;
      const loginLink = compiled.querySelector('a[routerLink="/auth/login"]');
      
      expect(loginLink).toBeTruthy();
      expect(loginLink.textContent).toContain('Login');
    });
  });

  describe('Component State Management Integration', () => {
    it('should update validation state when email changes', () => {
      // Start with empty email
      expect(component.canSubmit).toBe(false);
      expect(component.validationError).toBe('');

      // Set invalid email
      component.email = 'invalid-email';
      component.validateEmail();
      expect(component.canSubmit).toBe(false);
      expect(component.validationError).toBe('Please enter a valid email address');

      // Set valid email
      component.email = 'test@example.com';
      component.validateEmail();
      expect(component.canSubmit).toBe(true);
      expect(component.validationError).toBe('');

      // Clear email
      component.email = '';
      component.validateEmail();
      expect(component.canSubmit).toBe(false);
      expect(component.validationError).toBe('Email is required');
    });

    it('should maintain state consistency during form interactions', () => {
      // Set valid email
      component.email = 'test@example.com';
      component.validateEmail();
      expect(component.canSubmit).toBe(true);

      // Simulate form submission attempt
      component.onSubmit();
      expect(component.canSubmit).toBe(true); // Should remain true after submission attempt

      // Change to invalid email
      component.email = 'invalid-email';
      component.validateEmail();
      expect(component.canSubmit).toBe(false);
    });
  });

  describe('Real-world Scenarios', () => {
    it('should handle rapid email changes', () => {
      const emails = ['', 'invalid', 'test@example.com', 'another@test.com', ''];
      
      emails.forEach(email => {
        component.email = email;
        component.validateEmail();
        
        if (email === '') {
          expect(component.validationError).toBe('Email is required');
          expect(component.canSubmit).toBe(false);
        } else if (email === 'invalid') {
          expect(component.validationError).toBe('Please enter a valid email address');
          expect(component.canSubmit).toBe(false);
        } else {
          expect(component.validationError).toBe('');
          expect(component.canSubmit).toBe(true);
        }
      });
    });

    it('should handle form submission with various email states', async () => {
      mockAuthService.resetPassword.mockResolvedValue(ForgotPasswordTestUtils.mockSuccessfulReset());

      // Test with valid email
      component.email = 'test@example.com';
      component.validateEmail();
      await component.onSubmit();
      expect(mockAuthService.resetPassword).toHaveBeenCalledWith('test@example.com');

      // Reset mocks
      ForgotPasswordTestConfig.clearMocks();

      // Test with invalid email
      component.email = 'invalid-email';
      component.validateEmail();
      await component.onSubmit();
      expect(mockAuthService.resetPassword).not.toHaveBeenCalled();

      // Reset mocks
      ForgotPasswordTestConfig.clearMocks();

      // Test with empty email
      component.email = '';
      component.validateEmail();
      await component.onSubmit();
      expect(mockAuthService.resetPassword).not.toHaveBeenCalled();
    });
  });
}); 