import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { ToastController } from '@ionic/angular/standalone';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { SupabaseService, Profile } from '../../services/supabase.service';

// Task 4.2.6: the Task 4.0.2 specs at lines 112-122 and 124-146 exercise the
// super-admin branch where `profile$` never emits a non-null value. Under the
// new implementation they resolve via the 5s profile-hydration timeout path,
// which exceeds Jest's default 5000ms per-test budget. Bump the budget file-wide
// rather than modifying the (passing) specs themselves.
jest.setTimeout(10000);

describe('AuthGuard (Task 4.0.2 — Supabase profile role source)', () => {
  let guard: AuthGuard;
  let mockRouter: any;
  let mockAuthService: any;
  let mockSupabaseService: any;
  let profileSubject: BehaviorSubject<Profile | null>;

  const buildRoute = (
    expectedRole: string | undefined,
    url: string = ''
  ): ActivatedRouteSnapshot => {
    return {
      data: expectedRole ? { expectedRole } : {},
      url: url
        ? url
            .replace(/^\//, '')
            .split('/')
            .filter(Boolean)
            .map(seg => ({ path: seg, parameters: {} }))
        : []
    } as unknown as ActivatedRouteSnapshot;
  };

  beforeEach(() => {
    profileSubject = new BehaviorSubject<Profile | null>(null);

    mockRouter = {
      navigate: jest.fn()
    };

    // Default: authenticated AuthService user (so super-admin tests focus on profile)
    mockAuthService = {
      currentUser: of({
        user: {
          id: 'user-1',
          role: 'player',
          firstLogin: false,
          username: 'tester',
          email: 'tester@example.com'
        }
      })
    };

    mockSupabaseService = {
      profile$: profileSubject.asObservable(),
      get currentProfile() {
        return profileSubject.value;
      },
      // Hard-refresh recovery (auth.guard canActivate): the guard now
      // asks supabase-js directly whether a session sits in localStorage
      // when the BehaviorSubject is still null. Mock returns "no
      // session" by default; specs that exercise the recovery path can
      // override via mockResolvedValueOnce.
      client: {
        auth: {
          getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
        },
      },
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
        { provide: SupabaseService, useValue: mockSupabaseService }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should allow access to /super-admin/dashboard when currentProfile role is super-admin', async () => {
    profileSubject.next({
      id: 'sa-1',
      email: 'sa@example.com',
      role: 'super-admin',
      username: 'admin',
      first_name: 'Super',
      last_name: 'Admin',
      created_at: '',
      updated_at: '',
      first_login: false
    } as Profile);

    const route = buildRoute('super-admin', '/super-admin/dashboard');
    const result = await firstValueOf(guard.canActivate(route));

    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should deny access and redirect to /auth/login when currentProfile role is player on a super-admin route', async () => {
    profileSubject.next({
      id: 'p-1',
      email: 'p@example.com',
      role: 'player',
      username: 'p',
      first_name: 'P',
      last_name: 'L',
      created_at: '',
      updated_at: '',
      first_login: false
    } as Profile);

    const route = buildRoute('super-admin', '/super-admin/dashboard');
    const result = await firstValueOf(guard.canActivate(route));

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalled();
    const [path] = mockRouter.navigate.mock.calls[0];
    expect(path).toEqual(['/auth/login']);
  });

  it('should deny access and redirect to /auth/login when currentProfile is null on a super-admin route', async () => {
    profileSubject.next(null);

    const route = buildRoute('super-admin', '/super-admin/dashboard');
    const result = await firstValueOf(guard.canActivate(route));

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalled();
    const [path] = mockRouter.navigate.mock.calls[0];
    expect(path).toEqual(['/auth/login']);
  });

  it('should redirect unauthenticated users hitting /super-admin/** to /auth/login (NOT /super-admin/login)', async () => {
    // Unauthenticated AuthService
    mockAuthService.currentUser = of(null);
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
        { provide: SupabaseService, useValue: mockSupabaseService }
      ]
    });
    guard = TestBed.inject(AuthGuard);

    const route = buildRoute('super-admin', '/super-admin/dashboard');
    const result = await firstValueOf(guard.canActivate(route));

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalled();
    const [path] = mockRouter.navigate.mock.calls[0];
    expect(path).toEqual(['/auth/login']);
    expect(path).not.toEqual(['/super-admin/login']);
  });

  it('should include the attempted URL as returnUrl query param on role mismatch redirect', async () => {
    profileSubject.next({
      id: 'p-1',
      email: 'p@example.com',
      role: 'player',
      username: 'p',
      first_name: 'P',
      last_name: 'L',
      created_at: '',
      updated_at: '',
      first_login: false
    } as Profile);

    const route = buildRoute('super-admin', '/super-admin/dashboard');
    const result = await firstValueOf(guard.canActivate(route));

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalled();
    const [, extras] = mockRouter.navigate.mock.calls[0];
    expect(extras).toBeDefined();
    expect(extras.queryParams).toBeDefined();
    expect(extras.queryParams.returnUrl).toBe('/super-admin/dashboard');
  });

  it('should preserve existing behaviour for /player/** routes — allow when authService user is a player', async () => {
    mockAuthService.currentUser = of({
      user: {
        id: 'user-1',
        role: 'player',
        firstLogin: false,
        username: 'player',
        email: 'player@example.com'
      }
    });
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
        { provide: SupabaseService, useValue: mockSupabaseService }
      ]
    });
    guard = TestBed.inject(AuthGuard);

    const route = buildRoute('player', '/player/dashboard');
    const result = await firstValueOf(guard.canActivate(route));

    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should preserve existing behaviour for /group-admin/** routes — allow when authService user is group-admin', async () => {
    mockAuthService.currentUser = of({
      user: {
        id: 'user-2',
        role: 'group-admin',
        firstLogin: false,
        username: 'ga',
        email: 'ga@example.com'
      }
    });
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
        { provide: SupabaseService, useValue: mockSupabaseService }
      ]
    });
    guard = TestBed.inject(AuthGuard);

    const route = buildRoute('group-admin', '/group-admin/dashboard');
    const result = await firstValueOf(guard.canActivate(route));

    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});

describe('AuthGuard cold-start race (Task 4.2.6)', () => {
  let guard: AuthGuard;
  let mockRouter: any;
  let mockAuthService: any;
  let mockSupabaseService: any;
  let mockToastController: any;
  let toastPresentSpy: jest.Mock;
  let profileSubject: BehaviorSubject<Profile | null>;

  const buildRoute = (
    expectedRole: string | undefined,
    url: string = ''
  ): ActivatedRouteSnapshot => {
    return {
      data: expectedRole ? { expectedRole } : {},
      url: url
        ? url
            .replace(/^\//, '')
            .split('/')
            .filter(Boolean)
            .map(seg => ({ path: seg, parameters: {} }))
        : []
    } as unknown as ActivatedRouteSnapshot;
  };

  const buildSuperAdminProfile = (overrides: Partial<Profile> = {}): Profile =>
    ({
      id: 'sa-1',
      email: 'sa@example.com',
      role: 'super-admin',
      username: 'admin',
      first_name: 'Super',
      last_name: 'Admin',
      created_at: '',
      updated_at: '',
      first_login: false,
      ...overrides
    } as Profile);

  const buildPlayerProfile = (): Profile =>
    ({
      id: 'p-1',
      email: 'p@example.com',
      role: 'player',
      username: 'p',
      first_name: 'P',
      last_name: 'L',
      created_at: '',
      updated_at: '',
      first_login: false
    } as Profile);

  beforeEach(() => {
    jest.useFakeTimers();

    profileSubject = new BehaviorSubject<Profile | null>(null);

    mockRouter = { navigate: jest.fn() };

    mockAuthService = {
      currentUser: of({
        user: {
          id: 'user-1',
          role: 'player',
          firstLogin: false,
          username: 'tester',
          email: 'tester@example.com'
        }
      })
    };

    mockSupabaseService = {
      profile$: profileSubject.asObservable(),
      get currentProfile() {
        return profileSubject.value;
      },
      // See parent describe — same mock for the hard-refresh recovery
      // path the guard exercises when the BehaviorSubject is null.
      client: {
        auth: {
          getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
        },
      },
    };

    toastPresentSpy = jest.fn().mockResolvedValue(undefined);
    mockToastController = {
      create: jest.fn().mockResolvedValue({ present: toastPresentSpy })
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
        { provide: SupabaseService, useValue: mockSupabaseService },
        { provide: ToastController, useValue: mockToastController }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('(a) allows access when profile is already hydrated as super-admin at guard-entry', async () => {
    profileSubject.next(buildSuperAdminProfile());

    const route = buildRoute('super-admin', '/super-admin/dashboard');
    const result = await firstValueOf(guard.canActivate(route));

    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(mockToastController.create).not.toHaveBeenCalled();
  });

  it('(b) waits for late profile hydration and allows access when super-admin arrives within 5s', async () => {
    const route = buildRoute('super-admin', '/super-admin/dashboard');

    // Subscribe first (profile$ is still null), then emit after a simulated 2s delay.
    const resultPromise = firstValueOf<boolean>(guard.canActivate(route));
    jest.advanceTimersByTime(2000);
    profileSubject.next(buildSuperAdminProfile());

    const result = await resultPromise;

    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(mockToastController.create).not.toHaveBeenCalled();
  });

  it('(c) redirects to /auth/login with diagnostic toast when profile never hydrates within 5s', async () => {
    const route = buildRoute('super-admin', '/super-admin/dashboard');

    const resultPromise = firstValueOf<boolean>(guard.canActivate(route));
    jest.advanceTimersByTime(5001);
    const result = await resultPromise;

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(
      ['/auth/login'],
      { queryParams: { returnUrl: '/super-admin/dashboard' } }
    );

    // Toast convention mirrors matches.page.ts:1054-1062.
    // Asserting `create` was called with the right config is sufficient —
    // `present()` is internal plumbing and double-flush microtasks to reach
    // it would couple the spec to presentTimeoutToast's await count.
    expect(mockToastController.create).toHaveBeenCalledTimes(1);
    const createArgs = mockToastController.create.mock.calls[0][0];
    expect(createArgs.message).toBe((AuthGuard as any)['PROFILE_TIMEOUT_MESSAGE']);
    expect(createArgs.color).toBe('danger');
    expect(createArgs.position).toBe('top');
    expect(createArgs.duration).toBe(3000);
  });

  it('(d) denies wrong-role access when profile hydrates as player on a super-admin route', async () => {
    profileSubject.next(buildPlayerProfile());

    const route = buildRoute('super-admin', '/super-admin/dashboard');
    const result = await firstValueOf(guard.canActivate(route));

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(
      ['/auth/login'],
      { queryParams: { returnUrl: '/super-admin/dashboard' } }
    );
    expect(mockToastController.create).not.toHaveBeenCalled();
  });

  it('(e) fails closed when profile$ errors out', async () => {
    const route = buildRoute('super-admin', '/super-admin/dashboard');

    const resultPromise = firstValueOf<boolean>(guard.canActivate(route));
    profileSubject.error(new Error('profile fetch failed'));
    const result = await resultPromise;

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(
      ['/auth/login'],
      { queryParams: { returnUrl: '/super-admin/dashboard' } }
    );
    expect(mockToastController.create).not.toHaveBeenCalled();
  });

  // Regression: unauthenticated deep-link to a super-admin route MUST NOT
  // enter the profile$ wait. Before the unauth-check hoist, an unauth visitor
  // pasting /super-admin/dashboard would hang 5s on profile$, then redirect
  // with a misleading "Session taking too long to load" toast — a UX bug
  // this spec locks out. Pairs with the ordering in auth.guard.ts:52-58.
  it('(f) redirects unauthenticated super-admin deep-link immediately without toast or 5s wait', async () => {
    mockAuthService.currentUser = of(null);

    // Re-inject so the guard picks up the overridden currentUser observable.
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
        { provide: SupabaseService, useValue: mockSupabaseService },
        { provide: ToastController, useValue: mockToastController }
      ]
    });
    guard = TestBed.inject(AuthGuard);

    const route = buildRoute('super-admin', '/super-admin/dashboard');
    const result = await firstValueOf(guard.canActivate(route));

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(
      ['/auth/login'],
      { queryParams: { returnUrl: '/super-admin/dashboard' } }
    );
    expect(mockToastController.create).not.toHaveBeenCalled();
  });
});

// Helper: convert Observable | Promise | boolean into a Promise of the value
async function firstValueOf<T>(value: any): Promise<T> {
  if (value && typeof value.subscribe === 'function') {
    return new Promise<T>((resolve, reject) => {
      value.subscribe({
        next: (v: T) => resolve(v),
        error: (e: any) => reject(e)
      });
    });
  }
  return value;
}
