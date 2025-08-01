import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, UserRole } from '../../../../core/services/auth.service';
import { SignupPage } from './signup.page';
import { SignupTestConfig, SignupTestUtils } from './signup.test.config';

describe('SignupPage Integration Tests', () => {
  let component: SignupPage;
  let fixture: ComponentFixture<SignupPage>;
  let mockRouter: any;
  let mockAuthService: any;

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

    // Mock alert for tests
    global.alert = jest.fn();
  });

  afterEach(() => {
    SignupTestConfig.clearMocks();
  });

  describe('User Interface Integration', () => {
    it('should display form elements correctly', () => {
      const compiled = fixture.nativeElement;
      
      expect(compiled.querySelector('ion-input[name="username"]')).toBeTruthy();
      expect(compiled.querySelector('ion-input[name="firstName"]')).toBeTruthy();
      expect(compiled.querySelector('ion-input[name="lastName"]')).toBeTruthy();
      expect(compiled.querySelector('ion-input[name="email"]')).toBeTruthy();
      expect(compiled.querySelector('ion-input[name="password"]')).toBeTruthy();
      expect(compiled.querySelector('ion-input[name="confirmPassword"]')).toBeTruthy();
      expect(compiled.querySelector('ion-select[name="role"]')).toBeTruthy();
      expect(compiled.querySelector('ion-checkbox[name="acceptedTerms"]')).toBeTruthy();
      expect(compiled.querySelector('ion-button[type="submit"]')).toBeTruthy();
    });

    it('should show validation error for empty username', () => {
      const compiled = fixture.nativeElement;
      
      component.signupData.username = '';
      component.validateRequired('username', '');
      fixture.detectChanges();
      
      const errorNote = compiled.querySelector('ion-note');
      expect(errorNote.textContent).toContain('Username is required');
    });

    it('should show validation error for invalid email format', () => {
      const compiled = fixture.nativeElement;
      
      component.signupData.email = 'invalid-email';
      component.validateEmail();
      fixture.detectChanges();
      
      const errorNote = compiled.querySelector('ion-note');
      expect(errorNote.textContent).toContain('Please enter a valid email address');
    });

    it('should show validation error for weak password', () => {
      const compiled = fixture.nativeElement;
      
      component.signupData.password = 'weak';
      component.validatePassword();
      fixture.detectChanges();
      
      const errorNote = compiled.querySelector('ion-note');
      expect(errorNote.textContent).toContain('Password does not meet all requirements');
    });

    it('should show validation error for non-matching passwords', () => {
      const compiled = fixture.nativeElement;
      
      component.signupData.password = 'TestPassword123!';
      component.signupData.confirmPassword = 'DifferentPassword123!';
      component.validateConfirmPassword();
      fixture.detectChanges();
      
      const errorNote = compiled.querySelector('ion-note');
      expect(errorNote.textContent).toContain('Passwords do not match');
    });

    it('should clear validation error for valid input', () => {
      const compiled = fixture.nativeElement;
      
      // Set invalid email first
      component.signupData.email = 'invalid-email';
      component.validateEmail();
      fixture.detectChanges();
      
      // Set valid email
      component.signupData.email = 'test@example.com';
      component.validateEmail();
      fixture.detectChanges();
      
      const errorNote = compiled.querySelector('ion-note');
      expect(errorNote).toBeFalsy();
    });

    it('should disable submit button when form is invalid', () => {
      const compiled = fixture.nativeElement;
      
      // Form should be invalid initially
      fixture.detectChanges();
      
      const submitButton = compiled.querySelector('ion-button[type="submit"]');
      expect(submitButton.disabled).toBe(true);
    });

    it('should enable submit button when form is valid', () => {
      const compiled = fixture.nativeElement;
      
      // Set valid form data
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      
      // Clear all validation errors
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      
      // Ensure password is valid
      component.validatePassword();
      
      fixture.detectChanges();
      
      const submitButton = compiled.querySelector('ion-button[type="submit"]');
      expect(submitButton.disabled).toBe(false);
    });
  });

  describe('Form Submission Flow', () => {
    it('should handle successful signup flow', async () => {
      const compiled = fixture.nativeElement;
      
      // Set valid form data
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      
      // Clear all validation errors
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });

      // Ensure password is valid
      component.validatePassword();

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ next }) => {
          if (next) next();
        })
      });

      await component.onSignup();

      const { confirmPassword, acceptedTerms, ...expectedPayload } = component.signupData;
      expect(mockAuthService.signup).toHaveBeenCalledWith(expectedPayload);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login'], {
        queryParams: {
          returnUrl: '/welcome',
          role: 'player'
        }
      });
    });

    it('should handle failed signup flow', async () => {
      const compiled = fixture.nativeElement;
      
      // Set valid form data
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      
      // Clear all validation errors
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });

      // Ensure password is valid
      component.validatePassword();

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error({ message: 'Email already exists' });
        })
      });

      await component.onSignup();

      const { confirmPassword, acceptedTerms, ...expectedPayload } = component.signupData;
      expect(mockAuthService.signup).toHaveBeenCalledWith(expectedPayload);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should not submit form with invalid data', async () => {
      const signupSpy = jest.spyOn(mockAuthService, 'signup');
      
      // Form should be invalid initially
      await component.onSignup();
      
      expect(signupSpy).not.toHaveBeenCalled();
    });

    it('should not submit form with validation errors', async () => {
      const signupSpy = jest.spyOn(mockAuthService, 'signup');
      
      // Set form data but make email invalid to create a validation error
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      component.signupData.email = 'invalid-email';
      
      // Ensure the form is invalid by checking canSubmit
      expect(component.canSubmit).toBe(false);
      
      await component.onSignup();
      
      expect(signupSpy).not.toHaveBeenCalled();
    });
  });

  describe('Field Validation Integration', () => {
    it('should validate various email formats correctly', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user-name@domain.org',
        'user123@domain.net'
      ];

      validEmails.forEach(email => {
        component.signupData.email = email;
        component.validateEmail();
        expect(component.validationErrors.email).toBe('');
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
        component.signupData.email = email;
        component.validateEmail();
        expect(component.validationErrors.email).toBe('Please enter a valid email address');
      });
    });

    it('should validate password strength requirements', () => {
      // Test strong password
      component.signupData.password = 'TestPassword123!';
      component.validatePassword();
      expect(component.validationErrors.password).toBe('');
      expect(component.passwordCriteria.length).toBe(true);
      expect(component.passwordCriteria.uppercase).toBe(true);
      expect(component.passwordCriteria.number).toBe(true);
      expect(component.passwordCriteria.special).toBe(true);

      // Test weak password
      component.signupData.password = 'weak';
      component.validatePassword();
      expect(component.validationErrors.password).toBe('Password does not meet all requirements');
    });

    it('should validate password confirmation correctly', () => {
      // Test matching passwords
      component.signupData.password = 'TestPassword123!';
      component.signupData.confirmPassword = 'TestPassword123!';
      component.validateConfirmPassword();
      expect(component.validationErrors.confirmPassword).toBe('');

      // Test non-matching passwords
      component.signupData.confirmPassword = 'DifferentPassword123!';
      component.validateConfirmPassword();
      expect(component.validationErrors.confirmPassword).toBe('Passwords do not match');
    });

    it('should validate required fields correctly', () => {
      // Test empty required fields
      component.validateRequired('username', '');
      expect(component.validationErrors.username).toBe('Username is required');

      component.validateRequired('firstName', '');
      expect(component.validationErrors.firstName).toBe('FirstName is required');

      component.validateRequired('lastName', '');
      expect(component.validationErrors.lastName).toBe('LastName is required');

      // Test valid required fields
      component.validateRequired('username', 'testuser');
      expect(component.validationErrors.username).toBe('');
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle network errors gracefully', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });

      // Ensure password is valid
      component.validatePassword();

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(new Error('Network error'));
        })
      });

      await component.onSignup();

      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
    });

    it('should handle AuthService errors with specific messages', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });

      // Ensure password is valid
      component.validatePassword();

      const authError = {
        user: null,
        error: {
          message: 'Email already exists',
          status: 400
        }
      };
      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(authError);
        })
      });

      await component.onSignup();

      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
    });

    it('should handle empty error response', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });

      // Ensure password is valid
      component.validatePassword();

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error({ user: null, error: {} });
        })
      });

      await component.onSignup();

      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
    });
  });

  describe('Navigation Integration', () => {
    it('should navigate to welcome page when logo is clicked', () => {
      const compiled = fixture.nativeElement;
      const logoContainer = compiled.querySelector('.logo-container');
      
      logoContainer.click();
      
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/welcome']);
    });
  });

  describe('Component State Management Integration', () => {
    it('should update validation state when form fields change', () => {
      // Initially should not allow submission
      expect(component.canSubmit).toBe(false);

      // Set valid form data
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      
      // Clear all validation errors
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });

      // Ensure password is valid
      component.validatePassword();

      expect(component.canSubmit).toBe(true);
    });

    it('should maintain state consistency during form interactions', () => {
      // Test password visibility toggle
      expect(component.showPassword).toBe(false);
      component.togglePasswordVisibility();
      expect(component.showPassword).toBe(true);
      component.togglePasswordVisibility();
      expect(component.showPassword).toBe(false);

      // Test confirm password visibility toggle
      expect(component.showConfirmPassword).toBe(false);
      component.toggleConfirmPasswordVisibility();
      expect(component.showConfirmPassword).toBe(true);
      component.toggleConfirmPasswordVisibility();
      expect(component.showConfirmPassword).toBe(false);
    });
  });

  describe('Real-world Scenarios', () => {
    it('should handle complete signup flow with valid data', async () => {
      // Simulate user filling out the form
      component.signupData.username = 'testuser';
      component.signupData.firstName = 'John';
      component.signupData.lastName = 'Doe';
      component.signupData.email = 'test@example.com';
      component.signupData.password = 'TestPassword123!';
      component.signupData.confirmPassword = 'TestPassword123!';
      component.signupData.role = 'player';
      component.signupData.acceptedTerms = true;

      // Validate all fields
      component.validateRequired('username', component.signupData.username);
      component.validateRequired('firstName', component.signupData.firstName);
      component.validateRequired('lastName', component.signupData.lastName);
      component.validateEmail();
      component.validatePassword();
      component.validateConfirmPassword();
      component.validateAcceptedTerms();

      // All validations should pass
      expect(component.validationErrors.username).toBe('');
      expect(component.validationErrors.firstName).toBe('');
      expect(component.validationErrors.lastName).toBe('');
      expect(component.validationErrors.email).toBe('');
      expect(component.validationErrors.password).toBe('');
      expect(component.validationErrors.confirmPassword).toBe('');
      expect(component.validationErrors.acceptedTerms).toBe('');

      // Form should be valid
      expect(component.canSubmit).toBe(true);

      // Ensure password is valid
      component.validatePassword();

      // Mock successful signup
      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ next }) => {
          if (next) next();
        })
      });

      // Submit form
      await component.onSignup();

      // Should call signup service and navigate
      const { confirmPassword, acceptedTerms, ...expectedPayload } = component.signupData;
      expect(mockAuthService.signup).toHaveBeenCalledWith(expectedPayload);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login'], {
        queryParams: {
          returnUrl: '/welcome',
          role: 'player'
        }
      });
    });

    it('should handle signup flow with validation errors', async () => {
      // Simulate user filling out the form with errors
      component.signupData.username = '';
      component.signupData.firstName = 'John';
      component.signupData.lastName = 'Doe';
      component.signupData.email = 'invalid-email';
      component.signupData.password = 'weak';
      component.signupData.confirmPassword = 'different';
      component.signupData.role = 'player';
      component.signupData.acceptedTerms = false;

      // Validate all fields
      component.validateRequired('username', component.signupData.username);
      component.validateRequired('firstName', component.signupData.firstName);
      component.validateRequired('lastName', component.signupData.lastName);
      component.validateEmail();
      component.validatePassword();
      component.validateConfirmPassword();
      component.validateAcceptedTerms();

      // Should have validation errors
      expect(component.validationErrors.username).toBe('Username is required');
      expect(component.validationErrors.email).toBe('Please enter a valid email address');
      expect(component.validationErrors.password).toBe('Password does not meet all requirements');
      expect(component.validationErrors.confirmPassword).toBe('Passwords do not match');
      expect(component.validationErrors.acceptedTerms).toBe('You must accept the Terms and Conditions to continue');

      // Form should be invalid
      expect(component.canSubmit).toBe(false);

      // Should not call signup service
      const signupSpy = jest.spyOn(mockAuthService, 'signup');
      await component.onSignup();
      expect(signupSpy).not.toHaveBeenCalled();
    });
  });
}); 