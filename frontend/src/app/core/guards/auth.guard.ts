import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    try {
      // Get user from localStorage
      const userJson = localStorage.getItem('user');
      const user: User | null = userJson ? JSON.parse(userJson) : null;
      
      // Check if user exists and has a role
      if (!user || !user.role) {
        this.router.navigate(['/auth/login']);
        return false;
      }

      // Get expected role from route data
      const expectedRole = route.data?.['expectedRole'];
      
      // If no expected role is specified, just check if user is authenticated
      if (!expectedRole) {
        return true;
      }

      // Check if user role matches expected role
      if (user.role === expectedRole) {
      return true;
    }

      // Role mismatch - redirect to login
      this.router.navigate(['/auth/login']);
      return false;
    } catch (error) {
      // Error parsing user data - redirect to login
      console.error('Error parsing user data from localStorage:', error);
    this.router.navigate(['/auth/login']);
    return false;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class NoAuthGuard {
  constructor(private router: Router) {}

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const userJson = localStorage.getItem('user');
      const user: User | null = userJson ? JSON.parse(userJson) : null;
      
      if (!user || !user.role) {
        return true; // No authenticated user, allow access to public routes
      }

      // User is authenticated, redirect to their appropriate route
      // Check if this is a first login to determine destination
      const isFirstLogin = user.firstLogin === true;
      
      if (isFirstLogin) {
        // First time user - redirect to first-time routes
        switch (user.role) {
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
        switch (user.role) {
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
      console.error('Error parsing user data from localStorage:', error);
      return true; // Allow access to public routes if there's an error
    }
  }
}
