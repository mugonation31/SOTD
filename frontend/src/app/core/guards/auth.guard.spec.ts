import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { SupabaseService, Profile } from '../../services/supabase.service';

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
      }
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
