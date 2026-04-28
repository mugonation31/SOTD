import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, timeout } from 'rxjs/operators';
import { ToastController } from '@ionic/angular/standalone';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { SupabaseService, Profile } from '../../services/supabase.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService,
    private supabaseService: SupabaseService,
    private toastController: ToastController
  ) {}

  // Task 4.0.2: super-admin no longer has a dedicated login page;
  // all unauthenticated/role-mismatch redirects go to /auth/login.
  private static readonly LOGIN_ROUTE = '/auth/login';

  // Task 4.2.6: cold-start race — wait up to 5s for profile$ to hydrate
  // before failing closed on a super-admin deep-link.
  private static readonly PROFILE_HYDRATION_TIMEOUT_MS = 5000;
  private static readonly PROFILE_TIMEOUT_MESSAGE =
    'Session taking too long to load. Please sign in again.';

  private redirectToLogin(route: ActivatedRouteSnapshot): void {
    const attemptedUrl = '/' + route.url.map(seg => seg.path).join('/');
    if (attemptedUrl && attemptedUrl !== '/') {
      this.router.navigate([AuthGuard.LOGIN_ROUTE], {
        queryParams: { returnUrl: attemptedUrl }
      });
    } else {
      this.router.navigate([AuthGuard.LOGIN_ROUTE]);
    }
  }

  canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.currentUser.pipe(
      take(1),
      switchMap(authResponse => {
        // Hard-refresh fix: AuthService.currentUser is fed by an
        // RxJS BehaviorSubject that starts as `null`. On a cold-start
        // hard refresh, this guard fires BEFORE app.component's
        // handleSessionRestoration has populated the subject — so a
        // logged-in user with a valid session in localStorage gets a
        // false-negative and bounces to /auth/login.
        //
        // When the BehaviorSubject's first emission is falsy, do a
        // side-channel check: ask supabase-js directly whether a
        // session exists in localStorage. If yes, kick off restoration
        // and re-evaluate. If no, fall through to the original
        // redirect path.
        if (!authResponse || !authResponse.user) {
          return from(this.supabaseService.client.auth.getSession()).pipe(
            switchMap(({ data }) => {
              if (!data?.session?.user) {
                this.redirectToLogin(route);
                return of(false);
              }
              // Session exists in localStorage but the AuthService
              // BehaviorSubject hadn't been told yet. Restore now,
              // then re-run the guard against the freshly populated
              // BehaviorSubject.
              return from(this.authService.handleSessionRestoration()).pipe(
                switchMap(() => this.authService.currentUser.pipe(take(1))),
                switchMap(restored => this.evaluateAccess(route, restored)),
              );
            }),
            catchError(err => {
              console.error('AuthGuard: session restore check failed', err);
              this.redirectToLogin(route);
              return of(false);
            }),
          );
        }
        return this.evaluateAccess(route, authResponse);
      }),
    );
  }

  /**
   * Original guard logic, extracted so the hard-refresh recovery path
   * above can call back into it after restoring the session.
   */
  private evaluateAccess(
    route: ActivatedRouteSnapshot,
    authResponse: any,
  ): Observable<boolean> {
    return of(authResponse).pipe(
      switchMap(() => {
        try {
          const expectedRole = route.data?.['expectedRole'];

          // Unauthenticated even after the recovery attempt → redirect.
          if (!authResponse || !authResponse.user) {
            this.redirectToLogin(route);
            return of(false);
          }

          // Super-admin routes: source role from Supabase profile (Task 4.0.2).
          // Task 4.2.6: subscribe to profile$ so cold-start deep-links don't race
          // the in-flight `SELECT role FROM profiles` query. Wait up to 5s for
          // the first non-null emission; fail closed on timeout or error.
          if (expectedRole === 'super-admin') {
            return this.supabaseService.profile$.pipe(
              filter((p): p is Profile => p !== null),
              take(1),
              timeout(AuthGuard.PROFILE_HYDRATION_TIMEOUT_MS),
              map(profile => {
                if (profile.role === 'super-admin') {
                  return true;
                }
                this.redirectToLogin(route);
                return false;
              }),
              catchError(err => {
                this.redirectToLogin(route);
                if (err?.name === 'TimeoutError') {
                  // Fire-and-forget: redirect already dispatched; toast is
                  // purely diagnostic UX so we don't await it here.
                  void this.presentTimeoutToast();
                }
                return of(false);
              })
            );
          }

          // Get user role from the auth response
          const userRole = authResponse.user.role;

          // If no expected role is specified, just check if user is authenticated
          if (!expectedRole) {
            return of(true);
          }

          // Check if user role matches expected role
          if (userRole === expectedRole) {
            return of(true);
          }

          // Role mismatch - redirect to login with returnUrl
          this.redirectToLogin(route);
          return of(false);
        } catch (error) {
          // Error parsing user data - redirect to default login
          console.error('AuthGuard: Error getting user data, redirecting to login:', error);
          this.redirectToLogin(route);
          return of(false);
        }
      })
    );
  }

  private async presentTimeoutToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: AuthGuard.PROFILE_TIMEOUT_MESSAGE,
      duration: 3000,
      color: 'danger',
      position: 'top',
    });
    await toast.present();
  }
}

@Injectable({ providedIn: 'root' })
export class NoAuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.currentUser.pipe(
      take(1),
      map(authResponse => {
        try {
          // Special case: Allow access to reset-password page even for authenticated users
          if (route.routeConfig?.path === 'reset-password') {
            return true;
          }
          
          // Also check the full URL path for reset-password
          const currentUrl = this.router.url;
          if (currentUrl.includes('reset-password')) {
            return true;
          }
          
          if (!authResponse || !authResponse.user) {
            return true; // No authenticated user, allow access to public routes
          }

          // User is authenticated, redirect to their appropriate route
          const userRole = authResponse.user.role;
          
          // For Supabase users, we'll use the first-time route logic from AuthService
          // Check if this is a first login by looking at the user data
          const isFirstLogin = this.authService.isFirstTimeUser();
          
          if (isFirstLogin) {
            // First time user - redirect to first-time routes
            switch (userRole) {
              case 'super-admin':
                this.router.navigate(['/super-admin/dashboard']);
                break;
              case 'group-admin':
                this.router.navigate(['/group-admin/groups']);
                break;
              case 'player':
                this.router.navigate(['/player/join-group']);
                break;
              default:
                this.router.navigate(['/welcome']);
            }
          } else {
            // Returning user - redirect to dashboard
            switch (userRole) {
              case 'super-admin':
                this.router.navigate(['/super-admin/dashboard']);
                break;
              case 'group-admin':
                this.router.navigate(['/group-admin/dashboard']);
                break;
              case 'player':
                this.router.navigate(['/player/dashboard']);
                break;
              default:
                this.router.navigate(['/welcome']);
            }
          }
          
          return false;
        } catch (error) {
          console.error('NoAuthGuard: Error getting user data:', error);
          return true; // Allow access to public routes if there's an error
        }
      })
    );
  }
}
