import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService, UserRole } from '../../../../core/services/auth.service';
import { of } from 'rxjs';

export class SignupTestConfig {
  static mockRouter = {
    navigate: jest.fn(),
    navigateByUrl: jest.fn(),
    url: '/auth/signup',
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
        url: '/auth/signup'
      }
    }
  };

  static mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn(),
      },
      queryParamMap: {
        get: jest.fn(),
      },
      fragment: null,
    },
    params: of({}),
    queryParams: of({}),
    fragment: of(null),
    url: of([]),
    data: of({}),
  };

  static mockAuthService = {
    signup: jest.fn().mockReturnValue({
      subscribe: jest.fn().mockImplementation(({ next, error }) => {
        // Default to success
        if (next) next();
      })
    }),
    login: jest.fn().mockReturnValue({
      subscribe: jest.fn().mockImplementation(({ next, error }) => {
        // Default to success
        if (next) next();
      })
    }),
    logout: jest.fn(),
    logoutSilent: jest.fn(),
    getCurrentUser: jest.fn(),
    getUserRole: jest.fn(),
    isAuthenticated: jest.fn(),
    isFirstTimeUser: jest.fn().mockReturnValue(false),
    resetPassword: jest.fn(),
    updatePasswordWithTokens: jest.fn(),
    setSessionFromFragment: jest.fn(),
  };

  static configureTestBed() {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: SignupTestConfig.mockRouter },
        { provide: ActivatedRoute, useValue: SignupTestConfig.mockActivatedRoute },
        { provide: AuthService, useValue: SignupTestConfig.mockAuthService }
      ]
    });
  }

  static clearMocks() {
    jest.clearAllMocks();
  }
}

export class SignupTestUtils {
  static createValidSignupData() {
    return {
      username: 'testuser',
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'TestPassword123!',
      confirmPassword: 'TestPassword123!',
      role: 'player' as UserRole,
      acceptedTerms: true,
    };
  }

  static createInvalidSignupData() {
    return {
      username: '',
      firstName: '',
      lastName: '',
      email: 'invalid-email',
      password: 'weak',
      confirmPassword: 'different',
      role: 'player' as UserRole,
      acceptedTerms: false,
    };
  }

  static mockSuccessfulSignup() {
    return {
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        user_metadata: {
          username: 'testuser',
          firstName: 'John',
          lastName: 'Doe',
          role: 'player'
        }
      },
      error: null
    };
  }

  static mockFailedSignup(errorMessage: string = 'Signup failed') {
    return {
      user: null,
      error: {
        message: errorMessage,
        status: 400
      }
    };
  }

  static mockAuthServiceWithSuccess() {
    return {
      signup: jest.fn().mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ next }) => {
          if (next) next();
        })
      }),
      login: jest.fn(),
      logout: jest.fn(),
      getCurrentUser: jest.fn(),
      isAuthenticated: jest.fn(),
      resetPassword: jest.fn(),
      updatePasswordWithTokens: jest.fn(),
      setSessionFromFragment: jest.fn(),
    };
  }

  static mockAuthServiceWithError(errorMessage: string = 'Signup failed') {
    return {
      signup: jest.fn().mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error({ message: errorMessage });
        })
      }),
      login: jest.fn(),
      logout: jest.fn(),
      getCurrentUser: jest.fn(),
      isAuthenticated: jest.fn(),
      resetPassword: jest.fn(),
      updatePasswordWithTokens: jest.fn(),
      setSessionFromFragment: jest.fn(),
    };
  }

  static createValidEmail() {
    return 'test@example.com';
  }

  static createInvalidEmail() {
    return 'invalid-email';
  }

  static createValidPassword() {
    return 'TestPassword123!';
  }

  static createWeakPassword() {
    return 'weak';
  }

  static createValidUsername() {
    return 'testuser';
  }

  static createInvalidUsername() {
    return '';
  }
} 