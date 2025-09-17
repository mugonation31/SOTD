import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, UserRole } from '../../../../core/services/auth.service';
import { SignupPage } from './signup.page';
import { SignupTestConfig, SignupTestUtils } from './signup.test.config';

describe('SignupPage', () => {
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
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with empty signup data', () => {
      expect(component.signupData.username).toBe('');
      expect(component.signupData.firstName).toBe('');
      expect(component.signupData.lastName).toBe('');
      expect(component.signupData.email).toBe('');
      expect(component.signupData.password).toBe('');
      expect(component.signupData.confirmPassword).toBe('');
      expect(component.signupData.role).toBe('player');
      expect(component.signupData.acceptedTerms).toBe(false);
    });

    it('should initialize with empty validation errors', () => {
      expect(component.validationErrors.username).toBe('');
      expect(component.validationErrors.firstName).toBe('');
      expect(component.validationErrors.lastName).toBe('');
      expect(component.validationErrors.email).toBe('');
      expect(component.validationErrors.password).toBe('');
      expect(component.validationErrors.confirmPassword).toBe('');
      expect(component.validationErrors.acceptedTerms).toBe('');
    });

    it('should not allow submission initially', () => {
      expect(component.canSubmit).toBe(false);
    });
  });

  describe('Field Validation', () => {
    describe('Required Field Validation', () => {
      it('should validate required username field', () => {
        component.validateRequired('username', '');
        expect(component.validationErrors.username).toBe('Username is required');
      });

      it('should validate required firstName field', () => {
        component.validateRequired('firstName', '');
        expect(component.validationErrors.firstName).toBe('FirstName is required');
      });

      it('should validate required lastName field', () => {
        component.validateRequired('lastName', '');
        expect(component.validationErrors.lastName).toBe('LastName is required');
      });

      it('should clear validation error when field has value', () => {
        component.validationErrors.username = 'Username is required';
        component.validateRequired('username', 'testuser');
        expect(component.validationErrors.username).toBe('');
      });
    });

    describe('Email Validation', () => {
      it('should validate valid email format', () => {
        component.signupData.email = 'test@example.com';
        component.validateEmail();
        expect(component.validationErrors.email).toBe('');
      });

      it('should validate invalid email format', () => {
        component.signupData.email = 'invalid-email';
        component.validateEmail();
        expect(component.validationErrors.email).toBe('Please enter a valid email address');
      });

      it('should validate empty email', () => {
        component.signupData.email = '';
        component.validateEmail();
        expect(component.validationErrors.email).toBe('Email is required');
      });

      it('should validate various email formats', () => {
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
    });

    describe('Password Validation', () => {
      it('should validate strong password', () => {
        component.signupData.password = 'TestPassword123!';
        component.validatePassword();
        expect(component.validationErrors.password).toBe('');
      });

      it('should validate weak password', () => {
        component.signupData.password = 'weak';
        component.validatePassword();
        expect(component.validationErrors.password).toBe('Password does not meet all requirements');
      });

      it('should validate empty password', () => {
        component.signupData.password = '';
        component.validatePassword();
        expect(component.validationErrors.password).toBe('Password is required');
      });

      it('should update password criteria correctly', () => {
        component.signupData.password = 'TestPassword123!';
        component.validatePassword();
        
        expect(component.passwordCriteria.length).toBe(true);
        expect(component.passwordCriteria.uppercase).toBe(true);
        expect(component.passwordCriteria.number).toBe(true);
        expect(component.passwordCriteria.special).toBe(true);
      });

      it('should validate password strength requirements', () => {
        // Test password with only some criteria met
        component.signupData.password = 'TestPass';
        component.validatePassword();
        expect(component.validationErrors.password).toBe('Password does not meet all requirements');
      });
    });

    describe('Confirm Password Validation', () => {
      it('should validate matching passwords', () => {
        component.signupData.password = 'TestPassword123!';
        component.signupData.confirmPassword = 'TestPassword123!';
        component.validateConfirmPassword();
        expect(component.validationErrors.confirmPassword).toBe('');
      });

      it('should validate non-matching passwords', () => {
        component.signupData.password = 'TestPassword123!';
        component.signupData.confirmPassword = 'DifferentPassword123!';
        component.validateConfirmPassword();
        expect(component.validationErrors.confirmPassword).toBe('Passwords do not match');
      });

      it('should validate empty confirm password', () => {
        component.signupData.password = 'TestPassword123!';
        component.signupData.confirmPassword = '';
        component.validateConfirmPassword();
        expect(component.validationErrors.confirmPassword).toBe('Please confirm your password');
      });
    });

    describe('Terms Acceptance Validation', () => {
      it('should validate accepted terms', () => {
        component.signupData.acceptedTerms = true;
        component.validateAcceptedTerms();
        expect(component.validationErrors.acceptedTerms).toBe('');
      });

      it('should validate unaccepted terms', () => {
        component.signupData.acceptedTerms = false;
        component.validateAcceptedTerms();
        expect(component.validationErrors.acceptedTerms).toBe('You must accept the Terms and Conditions to continue');
      });
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

  describe('Form Submission Logic', () => {
    it('should not submit when form is invalid', () => {
      const signupSpy = jest.spyOn(mockAuthService, 'signup');
      
      component.onSignup();
      
      expect(signupSpy).not.toHaveBeenCalled();
    });

    it('should submit when form is valid', async () => {
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
    });

    it('should handle successful signup', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });

      // Ensure password is valid
      component.validatePassword();

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ next }) => {
          if (next) {
            // Simulate the setTimeout delay in the actual implementation
            setTimeout(() => next(), 600); // Slightly longer than the 500ms in the component
          }
        })
      });

      await component.onSignup();

      // Wait for the setTimeout delay in the component
      await new Promise(resolve => setTimeout(resolve, 700));

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login'], {
        queryParams: {
          returnUrl: '/welcome',
          role: 'player',
          email: 'test@example.com',
          pendingConfirmation: 'true'
        }
      });
    });

    it('should handle signup failure', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
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

      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
    });

    it('should handle network errors', async () => {
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
  });

  describe('Navigation', () => {
    it('should navigate to welcome page', () => {
      component.navigateToWelcome();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/welcome']);
    });
  });

  describe('Component State Management', () => {
    it('should update canSubmit when form becomes valid', () => {
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

    it('should not allow submission with validation errors', () => {
      // Set valid form data
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      
      // Add validation error
      component.validationErrors.email = 'Invalid email';

      expect(component.canSubmit).toBe(false);
    });
  });
});
