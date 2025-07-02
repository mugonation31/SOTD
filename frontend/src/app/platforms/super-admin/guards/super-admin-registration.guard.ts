import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminRegistrationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    try {
      // This guard specifically checks for super-admin registration status
      // which is separate from user authentication state
      const hasRegisteredSuperAdmin = localStorage.getItem('superAdminRegistered');
      
      console.log('🔍 SuperAdminRegistrationGuard: Checking registration status...', {
        hasRegisteredSuperAdmin
      });

      if (hasRegisteredSuperAdmin === 'true') {
        console.log('🚫 SuperAdminRegistrationGuard: Super-admin already registered, redirecting to login');
        this.router.navigate(['/super-admin/login']);
        return of(false);
      }

      console.log('✅ SuperAdminRegistrationGuard: No super-admin registered, allowing access to registration');
      return of(true);
    } catch (error) {
      console.error('❌ SuperAdminRegistrationGuard: Error checking registration status:', error);
      // On error, allow access to registration page
      return of(true);
    }
  }
}
