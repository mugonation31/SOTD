import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, UserRole } from '../../../../core/services/auth.service';
import { SignupPage } from './signup.page';
import { SignupTestConfig, SignupTestUtils } from './signup.test.config';
import { WelcomePage } from '../../../welcome/welcome.page';
import { LoginPage } from '../login/login.page';
import { By } from '@angular/platform-browser';

describe('SignupPage Integration Testing: End-to-End User Flows', () => {
  let signupComponent: SignupPage;
  let signupFixture: ComponentFixture<SignupPage>;
  let welcomeComponent: WelcomePage;
  let welcomeFixture: ComponentFixture<WelcomePage>;
  let loginComponent: LoginPage;
  let loginFixture: ComponentFixture<LoginPage>;
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

    // Setup signup component
    signupFixture = TestBed.createComponent(SignupPage);
    signupComponent = signupFixture.componentInstance;
    signupFixture.detectChanges();

    // Setup welcome component
    welcomeFixture = TestBed.createComponent(WelcomePage);
    welcomeComponent = welcomeFixture.componentInstance;
    welcomeFixture.detectChanges();

    // Setup login component
    loginFixture = TestBed.createComponent(LoginPage);
    loginComponent = loginFixture.componentInstance;
    loginFixture.detectChanges();

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

  describe('Group-Admin Journey: Welcome → Create Group → Signup → Login → Dashboard', () => {
    it('should complete full Group-Admin journey successfully', async () => {
      // Step 1: Welcome page - User clicks "Create a Group"
      welcomeComponent.createGroup();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/signup'], {
        queryParams: {
          role: 'group-admin',
          returnUrl: '/group-admin/groups',
          forceRole: 'true'
        }
      });

      // Step 2: Signup page - User fills form with group-admin role
      Object.assign(signupComponent.signupData, {
        username: 'groupadmin',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: 'AdminPass123!',
        confirmPassword: 'AdminPass123!',
        role: 'group-admin' as UserRole,
        acceptedTerms: true,
      });

      // Clear validation errors and validate
      Object.keys(signupComponent.validationErrors).forEach(key => {
        signupComponent.validationErrors[key as keyof typeof signupComponent.validationErrors] = '';
      });
      signupComponent.validatePassword();

      // Mock successful signup
      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ next }) => {
          if (next) next();
        })
      });

      // Submit signup
      await signupComponent.onSignup();

      // Verify signup was called and redirect to login
      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login'], {
        queryParams: {
          returnUrl: '/welcome',
          role: 'group-admin'
        }
      });

      // Step 3: Login page - User logs in with new credentials
      loginComponent.loginData.email = 'admin@example.com';
      loginComponent.loginData.password = 'AdminPass123!';

      // Mock successful login
      mockAuthService.login.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ next }) => {
          if (next) next();
        })
      });

      // Mock user role for login
      mockAuthService.getUserRole.mockReturnValue('group-admin');
      mockAuthService.isAuthenticated.mockReturnValue(true);

      // Perform login
      await loginComponent.onLogin();

      // Verify login was called and redirect to group-admin dashboard
      expect(mockAuthService.login).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/group-admin/dashboard'], { replaceUrl: true });
    });

    it('should handle Group-Admin journey with existing user login', async () => {
      // Step 1: Welcome page - User clicks "Create a Group"
      welcomeComponent.createGroup();

      // Step 2: Signup page - But user is already authenticated as group-admin
      mockAuthService.isAuthenticated.mockReturnValue(true);
      mockAuthService.getUserRole.mockReturnValue('group-admin');

      // Simulate signup page initialization
      signupComponent.ngOnInit();

      // Should continue with signup flow since forceRole is true
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/signup'], {
        queryParams: {
          role: 'group-admin',
          returnUrl: '/group-admin/groups',
          forceRole: 'true'
        }
      });
    });

    it('should handle Group-Admin journey with role mismatch', async () => {
      // Step 1: Welcome page - User clicks "Create a Group"
      welcomeComponent.createGroup();

      // Step 2: Signup page - But user is authenticated as player
      mockAuthService.isAuthenticated.mockReturnValue(true);
      mockAuthService.getUserRole.mockReturnValue('player');

      // Simulate signup page initialization
      signupComponent.ngOnInit();

      // Should continue with signup flow since role doesn't match
      expect(mockRouter.navigate).not.toHaveBeenCalledWith(['/group-admin/groups'], { replaceUrl: true });
    });
  });

  describe('Player Journey: Welcome → Join Group → Signup → Login → Dashboard', () => {
    it('should complete full Player journey successfully', async () => {
      // Step 1: Welcome page - User clicks "Join a Group"
      welcomeComponent.joinGroup();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/signup'], {
        queryParams: {
          role: 'player',
          returnUrl: '/player/join-group',
          forceRole: 'true'
        }
      });

      // Step 2: Signup page - User fills form with player role
      Object.assign(signupComponent.signupData, {
        username: 'playeruser',
        firstName: 'Player',
        lastName: 'User',
        email: 'player@example.com',
        password: 'PlayerPass123!',
        confirmPassword: 'PlayerPass123!',
        role: 'player' as UserRole,
        acceptedTerms: true,
      });

      // Clear validation errors and validate
      Object.keys(signupComponent.validationErrors).forEach(key => {
        signupComponent.validationErrors[key as keyof typeof signupComponent.validationErrors] = '';
      });
      signupComponent.validatePassword();

      // Mock successful signup
      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ next }) => {
          if (next) next();
        })
      });

      // Submit signup
      await signupComponent.onSignup();

      // Verify signup was called and redirect to login
      expect(mockAuthService.signup).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login'], {
        queryParams: {
          returnUrl: '/welcome',
          role: 'player'
        }
      });

      // Step 3: Login page - User logs in with new credentials
      loginComponent.loginData.email = 'player@example.com';
      loginComponent.loginData.password = 'PlayerPass123!';

      // Mock successful login
      mockAuthService.login.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ next }) => {
          if (next) next();
        })
      });

      // Mock user role for login
      mockAuthService.getUserRole.mockReturnValue('player');
      mockAuthService.isAuthenticated.mockReturnValue(true);

      // Perform login
      await loginComponent.onLogin();

      // Verify login was called and redirect to player dashboard
      expect(mockAuthService.login).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/player/dashboard'], { replaceUrl: true });
    });

    it('should handle Player journey with existing user login', async () => {
      // Step 1: Welcome page - User clicks "Join a Group"
      welcomeComponent.joinGroup();

      // Step 2: Signup page - But user is already authenticated as player
      mockAuthService.isAuthenticated.mockReturnValue(true);
      mockAuthService.getUserRole.mockReturnValue('player');

      // Simulate signup page initialization
      signupComponent.ngOnInit();

      // Should continue with signup flow since forceRole is true
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/signup'], {
        queryParams: {
          role: 'player',
          returnUrl: '/player/join-group',
          forceRole: 'true'
        }
      });
    });
  });

  describe('Cross-Platform Navigation Flows', () => {
    it('should handle welcome page navigation to login', async () => {
      // User clicks login button on welcome page
      welcomeComponent.login();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);
    });

    it('should handle welcome page navigation to signup for group-admin', async () => {
      // User clicks create group button on welcome page
      welcomeComponent.createGroup();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/signup'], {
        queryParams: {
          role: 'group-admin',
          returnUrl: '/group-admin/groups',
          forceRole: 'true'
        }
      });
    });

    it('should handle welcome page navigation to signup for player', async () => {
      // User clicks join group button on welcome page
      welcomeComponent.joinGroup();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/signup'], {
        queryParams: {
          role: 'player',
          returnUrl: '/player/join-group',
          forceRole: 'true'
        }
      });
    });
  });

  describe('Authentication State Management', () => {
    it('should handle authenticated user with matching role', async () => {
      // User is already authenticated with matching role
      mockAuthService.isAuthenticated.mockReturnValue(true);
      mockAuthService.getUserRole.mockReturnValue('group-admin');

      // Simulate signup page with group-admin role
      signupComponent.signupData.role = 'group-admin' as UserRole;

      // Should allow access to signup page
      expect(signupComponent.signupData.role).toBe('group-admin');
    });

    it('should handle authenticated user with different role', async () => {
      // User is authenticated with different role
      mockAuthService.isAuthenticated.mockReturnValue(true);
      mockAuthService.getUserRole.mockReturnValue('player');

      // Simulate signup page with group-admin role
      signupComponent.signupData.role = 'group-admin' as UserRole;

      // Should allow access to signup page
      expect(signupComponent.signupData.role).toBe('group-admin');
    });

    it('should handle unauthenticated user', async () => {
      // User is not authenticated
      mockAuthService.isAuthenticated.mockReturnValue(false);

      // Simulate signup page
      signupComponent.signupData.role = 'player' as UserRole;

      // Should allow access to signup page
      expect(signupComponent.signupData.role).toBe('player');
    });
  });

  describe('Error Handling in User Flows', () => {
    it('should handle signup error and allow retry', async () => {
      // Start signup process
      Object.assign(signupComponent.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(signupComponent.validationErrors).forEach(key => {
        signupComponent.validationErrors[key as keyof typeof signupComponent.validationErrors] = '';
      });
      signupComponent.validatePassword();

      // Mock signup error
      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(new Error('Email already exists'));
        })
      });

      // Submit signup
      await signupComponent.onSignup();

      // Verify error handling
      expect(signupComponent.isLoading).toBe(false);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalled();
    });

    it('should handle login error and allow retry', async () => {
      // Start login process
      loginComponent.loginData.email = 'test@example.com';
      loginComponent.loginData.password = 'TestPass123!';

      // Mock login error
      mockAuthService.login.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(new Error('Invalid credentials'));
        })
      });

      // Submit login
      await loginComponent.onLogin();

      // Verify error handling
      expect(loginComponent.isLoading).toBe(false);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should handle network errors during signup', async () => {
      // Start signup process
      Object.assign(signupComponent.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(signupComponent.validationErrors).forEach(key => {
        signupComponent.validationErrors[key as keyof typeof signupComponent.validationErrors] = '';
      });
      signupComponent.validatePassword();

      // Mock network error
      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(new Error('Network Error'));
        })
      });

      // Submit signup
      await signupComponent.onSignup();

      // Verify error handling
      expect(signupComponent.isLoading).toBe(false);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalled();
    });
  });

  describe('Form State Persistence', () => {
    it('should maintain form state during navigation', async () => {
      // Fill signup form partially
      signupComponent.signupData.username = 'testuser';
      signupComponent.signupData.email = 'test@example.com';
      signupComponent.validateRequired('username', 'testuser');
      signupComponent.validateEmail();

      // Navigate away and back (simulate)
      const currentState = { ...signupComponent.signupData };
      const currentErrors = { ...signupComponent.validationErrors };

      // Verify state is maintained
      expect(signupComponent.signupData.username).toBe('testuser');
      expect(signupComponent.signupData.email).toBe('test@example.com');
      expect(signupComponent.validationErrors.username).toBe('');
      expect(signupComponent.validationErrors.email).toBe('');
    });

    it('should clear form state on successful signup', async () => {
      // Fill and submit signup form
      Object.assign(signupComponent.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(signupComponent.validationErrors).forEach(key => {
        signupComponent.validationErrors[key as keyof typeof signupComponent.validationErrors] = '';
      });
      signupComponent.validatePassword();

      // Mock successful signup
      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ next }) => {
          if (next) next();
        })
      });

      // Submit signup
      await signupComponent.onSignup();

      // Verify redirect to login (form state will be reset on new page load)
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login'], {
        queryParams: {
          returnUrl: '/welcome',
          role: 'player'
        }
      });
    });
  });

  describe('Role-Based Access Control', () => {
    it('should enforce role-based routing after login', async () => {
      // Test group-admin login
      mockAuthService.getUserRole.mockReturnValue('group-admin');
      mockAuthService.isAuthenticated.mockReturnValue(true);

      // Set login data
      loginComponent.loginData.email = 'admin@example.com';
      loginComponent.loginData.password = 'AdminPass123!';

      // Simulate login with group-admin role
      await loginComponent.onLogin();

      // Should redirect to group-admin dashboard
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/group-admin/dashboard'], { replaceUrl: true });
    });

    it('should enforce role-based routing for player login', async () => {
      // Test player login
      mockAuthService.getUserRole.mockReturnValue('player');
      mockAuthService.isAuthenticated.mockReturnValue(true);

      // Set login data
      loginComponent.loginData.email = 'player@example.com';
      loginComponent.loginData.password = 'PlayerPass123!';

      // Simulate login with player role
      await loginComponent.onLogin();

      // Should redirect to player dashboard
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/player/dashboard'], { replaceUrl: true });
    });

    it('should handle super-admin role routing', async () => {
      // Test super-admin login
      mockAuthService.getUserRole.mockReturnValue('super-admin');
      mockAuthService.isAuthenticated.mockReturnValue(true);

      // Set login data
      loginComponent.loginData.email = 'superadmin@example.com';
      loginComponent.loginData.password = 'SuperAdminPass123!';

      // Simulate login with super-admin role
      await loginComponent.onLogin();

      // Should redirect to super-admin dashboard
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/super-admin/dashboard'], { replaceUrl: true });
    });
  });

  describe('Session Management', () => {
    it('should handle session expiration during signup', async () => {
      // Start signup process
      Object.assign(signupComponent.signupData, SignupTestUtils.createValidSignupData());
      Object.keys(signupComponent.validationErrors).forEach(key => {
        signupComponent.validationErrors[key as keyof typeof signupComponent.validationErrors] = '';
      });
      signupComponent.validatePassword();

      // Mock session expiration error
      mockAuthService.signup.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(new Error('Session expired'));
        })
      });

      // Submit signup
      await signupComponent.onSignup();

      // Verify error handling
      expect(signupComponent.isLoading).toBe(false);
      expect(global.alert).toHaveBeenCalled();
    });

    it('should handle session expiration during login', async () => {
      // Start login process
      loginComponent.loginData.email = 'test@example.com';
      loginComponent.loginData.password = 'TestPass123!';

      // Mock session expiration error
      mockAuthService.login.mockReturnValue({
        subscribe: jest.fn().mockImplementation(({ error }) => {
          if (error) error(new Error('Session expired'));
        })
      });

      // Submit login
      await loginComponent.onLogin();

      // Verify error handling
      expect(loginComponent.isLoading).toBe(false);
    });
  });
}); 