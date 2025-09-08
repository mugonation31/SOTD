import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  private getLoginRoute(expectedRole?: string): string {
    switch (expectedRole) {
      case 'super-admin':
        return '/super-admin/login';
      default:
        return '/auth/login';
    }
  }

  canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.currentUser.pipe(
      take(1),
      map(authResponse => {
        try {
          // Get expected role from route data
          const expectedRole = route.data?.['expectedRole'];
          
          // Check if user is authenticated using the reactive state
          if (!authResponse || !authResponse.user) {
            const loginRoute = this.getLoginRoute(expectedRole);
            console.log(`🚫 AuthGuard: No authenticated user, redirecting to ${loginRoute}`);
            this.router.navigate([loginRoute]);
            return false;
          }
          
          // Get user role from the auth response
          const userRole = authResponse.user.role;
          
          // If no expected role is specified, just check if user is authenticated
          if (!expectedRole) {
            console.log('✅ AuthGuard: User authenticated, no specific role required');
            return true;
          }

          // Check if user role matches expected role
          if (userRole === expectedRole) {
            console.log(`✅ AuthGuard: User role "${userRole}" matches expected role "${expectedRole}"`);
            return true;
          }

          // Role mismatch - redirect to appropriate login
          const loginRoute = this.getLoginRoute(expectedRole);
          console.log(`🚫 AuthGuard: Role mismatch. User role: "${userRole}", Expected: "${expectedRole}". Redirecting to ${loginRoute}`);
          this.router.navigate([loginRoute]);
          return false;
        } catch (error) {
          // Error parsing user data - redirect to default login
          const loginRoute = this.getLoginRoute(route.data?.['expectedRole']);
          console.error(`❌ AuthGuard: Error getting user data, redirecting to ${loginRoute}:`, error);
          this.router.navigate([loginRoute]);
          return false;
        }
      })
    );
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
            console.log('✅ NoAuthGuard: Allowing access to reset-password page for all users');
            return true;
          }
          
          // Also check the full URL path for reset-password
          const currentUrl = this.router.url;
          if (currentUrl.includes('reset-password')) {
            console.log('✅ NoAuthGuard: Allowing access to reset-password page via URL check');
            return true;
          }
          
          if (!authResponse || !authResponse.user) {
            console.log('✅ NoAuthGuard: No authenticated user, allowing access to public routes');
            return true; // No authenticated user, allow access to public routes
          }

          console.log('🔄 NoAuthGuard: User is authenticated, redirecting to appropriate route');

          // User is authenticated, redirect to their appropriate route
          const userRole = authResponse.user.role;
          
          // For Supabase users, we'll use the first-time route logic from AuthService
          // Check if this is a first login by looking at the user data
          const isFirstLogin = this.authService.isFirstTimeUser();
          
          if (isFirstLogin) {
            // First time user - redirect to first-time routes
            console.log(`🆕 NoAuthGuard: First-time ${userRole} user, redirecting to first-time route`);
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
            console.log(`🏠 NoAuthGuard: Returning ${userRole} user, redirecting to dashboard`);
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
          console.error('❌ NoAuthGuard: Error getting user data:', error);
          return true; // Allow access to public routes if there's an error
        }
      })
    );
  }
}
