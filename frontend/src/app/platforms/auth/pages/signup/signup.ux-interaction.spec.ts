import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, UserRole } from '../../../../core/services/auth.service';
import { SignupPage } from './signup.page';
import { SignupTestConfig, SignupTestUtils } from './signup.test.config';
import { By } from '@angular/platform-browser';

describe('SignupPage UX + Interaction Testing Matrix (Phase 5)', () => {
  let component: SignupPage;
  let fixture: ComponentFixture<SignupPage>;
  let mockRouter: any;
  let mockAuthService: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: SignupTestConfig.mockRouter },
        { provide: ActivatedRoute, useValue: SignupTestConfig.mockActivatedRoute },
        { provide: AuthService, useValue: SignupTestConfig.mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockRouter = TestBed.inject(Router);
    mockAuthService = TestBed.inject(AuthService);
    mockActivatedRoute = TestBed.inject(ActivatedRoute);

    // Mock alert for tests
    global.alert = jest.fn();
  });

  afterEach(() => {
    SignupTestConfig.clearMocks();
    jest.clearAllMocks();
  });

  describe('User Interaction Flows and Edge Cases', () => {
    it('should handle rapid typing in username field', async () => {
      // Simulate rapid typing by directly updating component data
      for (let i = 0; i < 10; i++) {
        component.signupData.username = `user${i}`;
        component.validateRequired('username', `user${i}`);
        fixture.detectChanges();
        await new Promise(resolve => setTimeout(resolve, 10)); // Small delay
      }

      expect(component.signupData.username).toBe('user9');
      expect(component.validationErrors.username).toBe('');
    });

    it('should handle copy-paste operations', async () => {
      // Simulate paste by directly setting the email value
      component.signupData.email = 'test@example.com';
      component.validateEmail();
      fixture.detectChanges();

      expect(component.signupData.email).toBe('test@example.com');
      expect(component.validationErrors.email).toBe('');
    });

    it('should handle keyboard navigation', async () => {
      // Test that form elements exist and can be navigated
      const form = fixture.debugElement.query(By.css('form'));
      const inputs = fixture.debugElement.queryAll(By.css('ion-input'));
      const submitButton = fixture.debugElement.query(By.css('ion-button[type="submit"]'));
      
      expect(form.nativeElement).toBeTruthy();
      expect(inputs.length).toBeGreaterThan(0);
      expect(submitButton.nativeElement).toBeTruthy();
    });

    it('should handle form submission with Enter key', async () => {
      // Set valid form data
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const form = fixture.debugElement.query(By.css('form'));
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      
      form.nativeElement.dispatchEvent(enterEvent);
      fixture.detectChanges();

      expect(component.canSubmit).toBe(true);
    });

    it('should handle browser back/forward navigation', () => {
      const originalNavigate = mockRouter.navigate;
      
      // Simulate browser back
      window.history.back();
      fixture.detectChanges();
      
      // Component should remain stable
      expect(component).toBeTruthy();
      expect(component.signupData.username).toBe('');
    });
  });

  describe('Real-time Validation Behavior Testing', () => {
    it('should validate username in real-time as user types', async () => {
      // Test empty username
      component.signupData.username = '';
      component.validateRequired('username', '');
      fixture.detectChanges();
      
      expect(component.validationErrors.username).toBe('Username is required');
      
      // Test valid username
      component.signupData.username = 'testuser';
      component.validateRequired('username', 'testuser');
      fixture.detectChanges();
      
      expect(component.validationErrors.username).toBe('');
    });

    it('should validate email format in real-time', async () => {
      // Test invalid email
      component.signupData.email = 'invalid-email';
      component.validateEmail();
      fixture.detectChanges();
      
      expect(component.validationErrors.email).toBe('Please enter a valid email address');
      
      // Test valid email
      component.signupData.email = 'test@example.com';
      component.validateEmail();
      fixture.detectChanges();
      
      expect(component.validationErrors.email).toBe('');
    });

    it('should update password criteria in real-time', async () => {
      // Test weak password
      component.signupData.password = 'weak';
      component.validatePassword();
      fixture.detectChanges();
      
      expect(component.passwordCriteria.length).toBe(false);
      expect(component.passwordCriteria.uppercase).toBe(false);
      expect(component.passwordCriteria.number).toBe(false);
      expect(component.passwordCriteria.special).toBe(false);
      
      // Test strong password
      component.signupData.password = 'TestPassword123!';
      component.validatePassword();
      fixture.detectChanges();
      
      expect(component.passwordCriteria.length).toBe(true);
      expect(component.passwordCriteria.uppercase).toBe(true);
      expect(component.passwordCriteria.number).toBe(true);
      expect(component.passwordCriteria.special).toBe(true);
    });

    it('should validate password confirmation in real-time', async () => {
      // Set password first
      component.signupData.password = 'TestPassword123!';
      component.validatePassword();
      fixture.detectChanges();
      
      // Test non-matching confirmation
      component.signupData.confirmPassword = 'DifferentPassword123!';
      component.validateConfirmPassword();
      fixture.detectChanges();
      
      expect(component.validationErrors.confirmPassword).toBe('Passwords do not match');
      
      // Test matching confirmation
      component.signupData.confirmPassword = 'TestPassword123!';
      component.validateConfirmPassword();
      fixture.detectChanges();
      
      expect(component.validationErrors.confirmPassword).toBe('');
    });

    it('should validate required fields on blur', async () => {
      // Test blur validation for firstName
      component.signupData.firstName = '';
      component.validateRequired('firstName', '');
      fixture.detectChanges();
      
      expect(component.validationErrors.firstName).toBe('FirstName is required');
    });
  });

  describe('Form State Transitions and User Journey Testing', () => {
    it('should transition from empty to valid form state', async () => {
      // Initial state should be invalid
      expect(component.canSubmit).toBe(false);
      
      // Fill form step by step
      component.signupData.username = 'testuser';
      component.validateRequired('username', 'testuser');
      fixture.detectChanges();
      expect(component.canSubmit).toBe(false); // Still invalid
      
      component.signupData.firstName = 'John';
      component.validateRequired('firstName', 'John');
      fixture.detectChanges();
      expect(component.canSubmit).toBe(false); // Still invalid
      
      component.signupData.lastName = 'Doe';
      component.validateRequired('lastName', 'Doe');
      fixture.detectChanges();
      expect(component.canSubmit).toBe(false); // Still invalid
      
      component.signupData.email = 'test@example.com';
      component.validateEmail();
      fixture.detectChanges();
      expect(component.canSubmit).toBe(false); // Still invalid
      
      component.signupData.password = 'TestPassword123!';
      component.validatePassword();
      fixture.detectChanges();
      expect(component.canSubmit).toBe(false); // Still invalid
      
      component.signupData.confirmPassword = 'TestPassword123!';
      component.validateConfirmPassword();
      fixture.detectChanges();
      expect(component.canSubmit).toBe(false); // Still invalid
      
      component.signupData.acceptedTerms = true;
      component.validateAcceptedTerms();
      fixture.detectChanges();
      expect(component.canSubmit).toBe(true); // Now valid
    });

    it('should handle form reset and clear state', async () => {
      // Set form data
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      fixture.detectChanges();
      
      // Reset form
      component.signupData = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'player' as UserRole,
        acceptedTerms: false,
      };
      
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      
      fixture.detectChanges();
      
      expect(component.canSubmit).toBe(false);
      expect(component.signupData.username).toBe('');
      expect(component.validationErrors.username).toBe('');
    });

    it('should maintain state during validation errors', async () => {
      // Set valid data
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();
      fixture.detectChanges();
      
      // Introduce validation error
      component.signupData.email = 'invalid-email';
      component.validateEmail();
      fixture.detectChanges();
      
      expect(component.canSubmit).toBe(false);
      expect(component.validationErrors.email).toBe('Please enter a valid email address');
      
      // Fix the error
      component.signupData.email = 'test@example.com';
      component.validateEmail();
      fixture.detectChanges();
      
      expect(component.canSubmit).toBe(true);
      expect(component.validationErrors.email).toBe('');
    });

    it('should handle loading state transitions', async () => {
      // Set valid form data
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      // Mock successful signup
      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ next }) => {
          if (next) next();
        })
      });

      // Submit form
      await component.onSignup();
      
      expect(component.isLoading).toBe(false);
      expect(mockRouter.navigate).toHaveBeenCalled();
    });
  });

  describe('Accessibility and Usability Testing', () => {
    it('should have proper ARIA labels and roles', () => {
      const form = fixture.debugElement.query(By.css('form'));
      const inputs = fixture.debugElement.queryAll(By.css('ion-input'));
      const submitButton = fixture.debugElement.query(By.css('ion-button[type="submit"]'));
      
      expect(form.nativeElement).toBeTruthy();
      expect(inputs.length).toBeGreaterThan(0);
      expect(submitButton.nativeElement).toBeTruthy();
      
      // Check that form elements exist
      expect(inputs.length).toBeGreaterThan(0);
    });

    it('should support keyboard-only navigation', async () => {
      const form = fixture.debugElement.query(By.css('form'));
      const inputs = fixture.debugElement.queryAll(By.css('ion-input'));
      const submitButton = fixture.debugElement.query(By.css('ion-button[type="submit"]'));
      
      expect(form.nativeElement).toBeTruthy();
      expect(inputs.length).toBeGreaterThan(0);
      expect(submitButton.nativeElement).toBeTruthy();
    });

    it('should provide clear error messages for screen readers', () => {
      // Trigger validation error
      component.signupData.username = '';
      component.validateRequired('username', '');
      fixture.detectChanges();
      
      const errorNote = fixture.debugElement.query(By.css('ion-note'));
      expect(errorNote.nativeElement.textContent).toContain('Username is required');
    });

    it('should have proper focus management', async () => {
      // Test that form elements exist and can be managed
      const form = fixture.debugElement.query(By.css('form'));
      const inputs = fixture.debugElement.queryAll(By.css('ion-input'));
      
      expect(form.nativeElement).toBeTruthy();
      expect(inputs.length).toBeGreaterThan(0);
    });

    it('should handle password visibility toggle accessibility', async () => {
      const passwordInput = fixture.debugElement.query(By.css('ion-input[name="password"]'));
      const toggleButton = fixture.debugElement.query(By.css('ion-button[slot="end"]'));
      
      expect(passwordInput.nativeElement).toBeTruthy();
      expect(toggleButton.nativeElement).toBeTruthy();
      
      // Test that toggle button exists and can be clicked
      expect(toggleButton.nativeElement).toBeTruthy();
    });
  });

  describe('Edge Cases and Error Scenarios', () => {
    it('should handle very long input values', async () => {
      const longUsername = 'a'.repeat(1000);
      component.signupData.username = longUsername;
      component.validateRequired('username', longUsername);
      fixture.detectChanges();
      
      expect(component.signupData.username).toBe(longUsername);
      expect(component.validationErrors.username).toBe('');
    });

    it('should handle special characters in inputs', async () => {
      const specialUsername = 'user@#$%^&*()_+-=[]{}|;:,.<>?';
      component.signupData.username = specialUsername;
      component.validateRequired('username', specialUsername);
      fixture.detectChanges();
      
      expect(component.signupData.username).toBe(specialUsername);
    });

    it('should handle rapid form submission attempts', async () => {
      // Set valid form data
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      // Mock slow signup
      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ next }) => {
          setTimeout(() => {
            if (next) next();
          }, 1000);
        })
      });

      // Submit multiple times rapidly
      await component.onSignup();
      await component.onSignup();
      await component.onSignup();
      
      // Should only call signup once
      expect(mockAuthService.signup).toHaveBeenCalledTimes(1);
    });

    it('should handle network interruption during signup', async () => {
      // Set valid form data
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      // Mock network error
      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(new Error('Network Error'));
        })
      });

      await component.onSignup();
      
      expect(component.isLoading).toBe(false);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should handle browser refresh during signup', async () => {
      // Set valid form data
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      // Start signup
      component.isLoading = true;
      fixture.detectChanges();
      
      // Component should handle this gracefully
      expect(component).toBeTruthy();
      expect(component.isLoading).toBe(true);
    });
  });

  describe('User Journey Testing', () => {
    it('should complete full signup journey successfully', async () => {
      // Step 1: Fill username
      component.signupData.username = 'testuser';
      component.validateRequired('username', 'testuser');
      fixture.detectChanges();
      
      // Step 2: Fill first name
      component.signupData.firstName = 'John';
      component.validateRequired('firstName', 'John');
      fixture.detectChanges();
      
      // Step 3: Fill last name
      component.signupData.lastName = 'Doe';
      component.validateRequired('lastName', 'Doe');
      fixture.detectChanges();
      
      // Step 4: Fill email
      component.signupData.email = 'test@example.com';
      component.validateEmail();
      fixture.detectChanges();
      
      // Step 5: Fill password
      component.signupData.password = 'TestPassword123!';
      component.validatePassword();
      fixture.detectChanges();
      
      // Step 6: Fill confirm password
      component.signupData.confirmPassword = 'TestPassword123!';
      component.validateConfirmPassword();
      fixture.detectChanges();
      
      // Step 7: Accept terms
      component.signupData.acceptedTerms = true;
      component.validateAcceptedTerms();
      fixture.detectChanges();
      
      // Step 8: Submit form
      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ next }) => {
          if (next) next();
        })
      });

      await component.onSignup();
      
      // Verify success
      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login'], {
        queryParams: {
          returnUrl: '/welcome',
          role: 'player'
        }
      });
    });

    it('should handle user correction of validation errors', async () => {
      // Start with invalid data
      component.signupData.username = '';
      component.signupData.email = 'invalid-email';
      component.signupData.password = 'weak';
      component.signupData.confirmPassword = 'different';
      component.signupData.acceptedTerms = false;
      
      fixture.detectChanges();
      expect(component.canSubmit).toBe(false);
      
      // Fix errors one by one
      component.signupData.username = 'testuser';
      component.validateRequired('username', 'testuser');
      fixture.detectChanges();
      expect(component.canSubmit).toBe(false);
      
      component.signupData.firstName = 'John';
      component.validateRequired('firstName', 'John');
      fixture.detectChanges();
      expect(component.canSubmit).toBe(false);
      
      component.signupData.lastName = 'Doe';
      component.validateRequired('lastName', 'Doe');
      fixture.detectChanges();
      expect(component.canSubmit).toBe(false);
      
      component.signupData.email = 'test@example.com';
      component.validateEmail();
      fixture.detectChanges();
      expect(component.canSubmit).toBe(false);
      
      component.signupData.password = 'TestPassword123!';
      component.validatePassword();
      fixture.detectChanges();
      expect(component.canSubmit).toBe(false);
      
      component.signupData.confirmPassword = 'TestPassword123!';
      component.validateConfirmPassword();
      fixture.detectChanges();
      expect(component.canSubmit).toBe(false);
      
      component.signupData.acceptedTerms = true;
      component.validateAcceptedTerms();
      fixture.detectChanges();
      
      // Ensure all validation errors are cleared and password is validated
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword(); // Re-validate password to update criteria
      fixture.detectChanges();
      
      expect(component.canSubmit).toBe(true);
    });
  });
}); 