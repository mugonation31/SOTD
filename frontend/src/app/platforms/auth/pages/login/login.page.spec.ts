import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { SupabaseService } from '../../../../services/supabase.service';
import { LoginPage } from './login.page';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let mockRouter: any;
  let mockAuthService: any;
  let mockSupabaseService: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
      navigateByUrl: jest.fn(),
      url: '/auth/login',
      events: {
        subscribe: jest.fn(),
        pipe: jest.fn().mockReturnValue({ subscribe: jest.fn() })
      },
      createUrlTree: jest.fn(),
      serializeUrl: jest.fn(),
      parseUrl: jest.fn(),
      isActive: jest.fn(),
      routerState: { snapshot: { url: '/auth/login' } }
    };

    mockAuthService = {
      login: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
      logout: jest.fn(),
      clearSession: jest.fn(),
      getCurrentUser: jest.fn(),
      getUserRole: jest.fn(),
      isAuthenticated: jest.fn(),
      isFirstTimeUser: jest.fn().mockReturnValue(false),
      currentUserValue: null
    };

    mockSupabaseService = {
      signInWithGoogle: jest.fn().mockResolvedValue({ provider: 'google', url: 'https://accounts.google.com' })
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: {
          snapshot: { paramMap: { get: jest.fn() }, queryParamMap: { get: jest.fn() }, fragment: null },
          params: of({}),
          queryParams: of({}),
          fragment: of(null),
          url: of([]),
          data: of({})
        }},
        { provide: AuthService, useValue: mockAuthService },
        { provide: SupabaseService, useValue: mockSupabaseService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    global.alert = jest.fn();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Google Sign-In', () => {
    it('should have a signInWithGoogle method', () => {
      expect(component.signInWithGoogle).toBeDefined();
      expect(typeof component.signInWithGoogle).toBe('function');
    });

    it('should call supabaseService.signInWithGoogle when Google button is clicked', async () => {
      await component.signInWithGoogle();

      expect(mockSupabaseService.signInWithGoogle).toHaveBeenCalled();
    });
  });

  describe('Phase 12.2 (H4): returnUrl open-redirect allowlist', () => {
    /**
     * These specs build a fresh component instance with an ActivatedRoute whose
     * queryParams Observable carries a specific returnUrl value, then drive a
     * successful login through onLogin(). We then assert what router.navigate
     * was called with — either the honored safe returnUrl or the role-based
     * default (/player/home for the 'player' role used here).
     *
     * Why this matters: a pre-fix LoginPage navigates to whatever returnUrl
     * arrives in the query string, so http://evil.com or
     * /auth/reset-password#access_token=… would be honored as-is, enabling
     * phishing or recovery-token theft via a crafted ?returnUrl= link.
     */
    const buildLoginPageWithReturnUrl = async (returnUrl: string | null | undefined) => {
      // Tear down the outer fixture's TestBed so we can re-configure
      // ActivatedRoute with the specific returnUrl for this case.
      TestBed.resetTestingModule();

      // Fresh per-test mocks so jest call history is isolated.
      mockRouter = {
        navigate: jest.fn(),
        navigateByUrl: jest.fn(),
        url: '/auth/login',
        events: {
          subscribe: jest.fn(),
          pipe: jest.fn().mockReturnValue({ subscribe: jest.fn() })
        },
        createUrlTree: jest.fn(),
        serializeUrl: jest.fn(),
        parseUrl: jest.fn(),
        isActive: jest.fn(),
        routerState: { snapshot: { url: '/auth/login' } }
      };

      mockAuthService = {
        login: jest.fn().mockReturnValue(of({ user: { email: 'test@example.com' }, token: 't' })),
        logout: jest.fn(),
        clearSession: jest.fn(),
        getCurrentUser: jest.fn(),
        getUserRole: jest.fn().mockReturnValue('player'),
        isAuthenticated: jest.fn(),
        isFirstTimeUser: jest.fn().mockReturnValue(false),
        currentUserValue: null
      };

      mockSupabaseService = {
        signInWithGoogle: jest.fn().mockResolvedValue({ provider: 'google', url: '' })
      };

      const queryParams = returnUrl === undefined ? {} : { returnUrl };

      await TestBed.configureTestingModule({
        imports: [FormsModule],
        providers: [
          { provide: Router, useValue: mockRouter },
          { provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: { get: jest.fn() },
              queryParamMap: { get: jest.fn() },
              queryParams,
              fragment: null
            },
            params: of({}),
            queryParams: of(queryParams),
            fragment: of(null),
            url: of([]),
            data: of({})
          }},
          { provide: AuthService, useValue: mockAuthService },
          { provide: SupabaseService, useValue: mockSupabaseService }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(LoginPage);
      component = fixture.componentInstance;
      fixture.detectChanges();

      // Provide valid form values so canSubmit is true.
      component.loginData.email = 'test@example.com';
      component.loginData.password = 'Password123!';
      component.validationErrors = { email: '', password: '' };

      global.alert = jest.fn();
    };

    // ---------- Allowed in-app returnUrls ----------

    it('should navigate to /player/home when returnUrl is /player/home', async () => {
      await buildLoginPageWithReturnUrl('/player/home');
      component.onLogin();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/player/home'], { replaceUrl: true });
    });

    it('should navigate to /group-admin/group when returnUrl is /group-admin/group', async () => {
      await buildLoginPageWithReturnUrl('/group-admin/group');
      component.onLogin();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/group-admin/group'], { replaceUrl: true });
    });

    it('should navigate to /super-admin/dashboard when returnUrl is /super-admin/dashboard', async () => {
      await buildLoginPageWithReturnUrl('/super-admin/dashboard');
      component.onLogin();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/super-admin/dashboard'], { replaceUrl: true });
    });

    // ---------- Disallowed external/malformed returnUrls ----------

    it('should fall back to role default (/player/home) when returnUrl is http://evil.com', async () => {
      await buildLoginPageWithReturnUrl('http://evil.com');
      component.onLogin();
      expect(mockRouter.navigate).not.toHaveBeenCalledWith(['http://evil.com'], expect.anything());
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/player/home'], { replaceUrl: true });
    });

    it('should fall back to role default when returnUrl is https://evil.com/path', async () => {
      await buildLoginPageWithReturnUrl('https://evil.com/path');
      component.onLogin();
      expect(mockRouter.navigate).not.toHaveBeenCalledWith(['https://evil.com/path'], expect.anything());
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/player/home'], { replaceUrl: true });
    });

    it('should fall back to role default when returnUrl is protocol-relative //evil.com/path', async () => {
      await buildLoginPageWithReturnUrl('//evil.com/path');
      component.onLogin();
      expect(mockRouter.navigate).not.toHaveBeenCalledWith(['//evil.com/path'], expect.anything());
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/player/home'], { replaceUrl: true });
    });

    it('should fall back to role default when returnUrl carries a recovery-token fragment', async () => {
      await buildLoginPageWithReturnUrl('/auth/reset-password#access_token=AT_FAKE');
      component.onLogin();
      expect(mockRouter.navigate).not.toHaveBeenCalledWith(
        ['/auth/reset-password#access_token=AT_FAKE'],
        expect.anything()
      );
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/player/home'], { replaceUrl: true });
    });

    it('should fall back to role default when returnUrl is javascript:alert(1)', async () => {
      await buildLoginPageWithReturnUrl('javascript:alert(1)');
      component.onLogin();
      expect(mockRouter.navigate).not.toHaveBeenCalledWith(['javascript:alert(1)'], expect.anything());
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/player/home'], { replaceUrl: true });
    });

    it('should fall back to role default when returnUrl is a path-traversal string', async () => {
      await buildLoginPageWithReturnUrl('../../../etc/passwd');
      component.onLogin();
      expect(mockRouter.navigate).not.toHaveBeenCalledWith(['../../../etc/passwd'], expect.anything());
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/player/home'], { replaceUrl: true });
    });

    it('should fall back to role default when returnUrl is empty string', async () => {
      await buildLoginPageWithReturnUrl('');
      component.onLogin();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/player/home'], { replaceUrl: true });
    });

    it('should fall back to role default when returnUrl query param is absent', async () => {
      await buildLoginPageWithReturnUrl(undefined);
      component.onLogin();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/player/home'], { replaceUrl: true });
    });
  });
});
