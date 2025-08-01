import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, UserRole } from '../../../../core/services/auth.service';
import { SignupPage } from './signup.page';
import { SignupTestConfig, SignupTestUtils } from './signup.test.config';

describe('SignupPage Supabase Error Handling (Phase 4)', () => {
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

  describe('Supabase Authentication Errors', () => {
    it('should handle "User already registered" error', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const supabaseError = {
        message: 'User already registered',
        status: 422,
        name: 'AuthApiError',
        statusCode: 422
      };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(supabaseError);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('User already registered');
    });

    it('should handle "Invalid email" error', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const supabaseError = {
        message: 'Invalid email',
        status: 400,
        name: 'AuthApiError',
        statusCode: 400
      };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(supabaseError);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('Invalid email');
    });

    it('should handle "Password should be at least 6 characters" error', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const supabaseError = {
        message: 'Password should be at least 6 characters',
        status: 422,
        name: 'AuthApiError',
        statusCode: 422
      };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(supabaseError);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('Password should be at least 6 characters');
    });

    it('should handle "Email not confirmed" error', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const supabaseError = {
        message: 'Email not confirmed',
        status: 422,
        name: 'AuthApiError',
        statusCode: 422
      };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(supabaseError);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('Email not confirmed');
    });
  });

  describe('Supabase Database Errors', () => {
    it('should handle "duplicate key value violates unique constraint" error', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const supabaseError = {
        message: 'duplicate key value violates unique constraint "profiles_username_key"',
        status: 23505,
        name: 'PostgrestError',
        code: '23505',
        details: 'Key (username)=(testuser) already exists.',
        hint: 'You must choose a different username.'
      };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(supabaseError);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('Key (username)=(testuser) already exists.');
    });

    it('should handle "duplicate key value violates unique constraint" for email', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const supabaseError = {
        message: 'duplicate key value violates unique constraint "profiles_email_key"',
        status: 23505,
        name: 'PostgrestError',
        code: '23505',
        details: 'Key (email)=(test@example.com) already exists.',
        hint: 'This email is already registered.'
      };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(supabaseError);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('Key (email)=(test@example.com) already exists.');
    });

    it('should handle "violates not-null constraint" error', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const supabaseError = {
        message: 'null value in column "role" violates not-null constraint',
        status: 23502,
        name: 'PostgrestError',
        code: '23502',
        details: 'Failing row contains (id, email, role, username, first_name, last_name, avatar_url, created_at, updated_at, first_login) = (uuid, test@example.com, null, testuser, John, Doe, null, 2024-01-01, 2024-01-01, true).',
        hint: 'The role field is required.'
      };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(supabaseError);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('Failing row contains (id, email, role, username, first_name, last_name, avatar_url, created_at, updated_at, first_login) = (uuid, test@example.com, null, testuser, John, Doe, null, 2024-01-01, 2024-01-01, true).');
    });

    it('should handle "violates check constraint" error', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const supabaseError = {
        message: 'new row for relation "profiles" violates check constraint "profiles_role_check"',
        status: 23514,
        name: 'PostgrestError',
        code: '23514',
        details: 'Failing row contains (id, email, role, username, first_name, last_name, avatar_url, created_at, updated_at, first_login) = (uuid, test@example.com, invalid-role, testuser, John, Doe, null, 2024-01-01, 2024-01-01, true).',
        hint: 'The role must be one of: super-admin, group-admin, player.'
      };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(supabaseError);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('Failing row contains (id, email, role, username, first_name, last_name, avatar_url, created_at, updated_at, first_login) = (uuid, test@example.com, invalid-role, testuser, John, Doe, null, 2024-01-01, 2024-01-01, true).');
    });
  });

  describe('Network and Connection Errors', () => {
    it('should handle "Network Error"', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const networkError = new Error('Network Error');
      networkError.name = 'NetworkError';

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(networkError);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('Network Error');
    });

    it('should handle "Failed to fetch" error', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const fetchError = new Error('Failed to fetch');
      fetchError.name = 'TypeError';

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(fetchError);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('Failed to fetch');
    });

    it('should handle "Request timeout" error', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const timeoutError = {
        message: 'Request timeout',
        status: 408,
        name: 'TimeoutError'
      };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(timeoutError);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('Request timeout');
    });
  });

  describe('Server and API Errors', () => {
    it('should handle "Internal Server Error" (500)', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const serverError = {
        message: 'Internal Server Error',
        status: 500,
        name: 'HttpErrorResponse'
      };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(serverError);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('Internal Server Error');
    });

    it('should handle "Service Unavailable" (503)', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const serviceUnavailableError = {
        message: 'Service Unavailable',
        status: 503,
        name: 'HttpErrorResponse'
      };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(serviceUnavailableError);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('Service Unavailable');
    });

    it('should handle "Bad Gateway" (502)', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const badGatewayError = {
        message: 'Bad Gateway',
        status: 502,
        name: 'HttpErrorResponse'
      };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(badGatewayError);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('Bad Gateway');
    });
  });

  describe('Complex Error Scenarios', () => {
    it('should handle error with nested error object', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const nestedError = {
        error: {
          message: 'Email already exists',
          status: 422
        },
        message: 'Signup failed',
        status: 422
      };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(nestedError);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('Email already exists');
    });

    it('should handle error with different error message formats', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const errorWithDifferentFormat = {
        error: {
          error: {
            message: 'Deep nested error message'
          }
        },
        message: 'Outer error message'
      };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(errorWithDifferentFormat);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('Deep nested error message');
    });

    it('should handle error with no message property', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const errorWithoutMessage = {
        status: 500,
        name: 'ServerError'
      };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(errorWithoutMessage);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('Signup failed. Please try again.');
    });

    it('should handle completely empty error object', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const emptyError = {};

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(emptyError);
        })
      });

      await component.onSignup();

      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(component.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalledWith('Signup failed. Please try again.');
    });
  });

  describe('Error Recovery and State Management', () => {
    it('should reset loading state after error', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const error = { message: 'Test error' };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error: errorCallback }) => {
          if (errorCallback) errorCallback(error);
        })
      });

      await component.onSignup();

      expect(component.isLoading).toBe(false);
    });

    it('should maintain form data after error', async () => {
      const originalData = SignupTestUtils.createValidSignupData();
      Object.assign(component.signupData, originalData);
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const error = { message: 'Test error' };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error: errorCallback }) => {
          if (errorCallback) errorCallback(error);
        })
      });

      await component.onSignup();

      // Form data should remain unchanged
      expect(component.signupData.username).toBe(originalData.username);
      expect(component.signupData.email).toBe(originalData.email);
      expect(component.signupData.firstName).toBe(originalData.firstName);
      expect(component.signupData.lastName).toBe(originalData.lastName);
      expect(component.signupData.password).toBe(originalData.password);
      expect(component.signupData.confirmPassword).toBe(originalData.confirmPassword);
      expect(component.signupData.role).toBe(originalData.role);
      expect(component.signupData.acceptedTerms).toBe(originalData.acceptedTerms);
    });

    it('should maintain validation state after error', async () => {
      Object.assign(component.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(component.validationErrors).forEach(key => {
        component.validationErrors[key as keyof typeof component.validationErrors] = '';
      });
      component.validatePassword();

      const error = { message: 'Test error' };

      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error: errorCallback }) => {
          if (errorCallback) errorCallback(error);
        })
      });

      await component.onSignup();

      // Validation state should remain valid
      expect(component.validationErrors.username).toBe('');
      expect(component.validationErrors.email).toBe('');
      expect(component.validationErrors.password).toBe('');
      expect(component.validationErrors.confirmPassword).toBe('');
      expect(component.validationErrors.acceptedTerms).toBe('');
    });
  });
}); 