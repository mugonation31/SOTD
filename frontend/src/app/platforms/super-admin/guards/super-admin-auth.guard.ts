import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.currentUser.pipe(
      take(1),
      map(authResponse => {
        // Check if user is authenticated and has super-admin role
        const user = this.authService.getCurrentUser();
        const isAuthenticated = this.authService.isAuthenticated();
        const isSuperAdmin = this.authService.isSuperAdmin();

        console.log('🔍 SuperAdminAuthGuard: Checking access...', {
          isAuthenticated,
          isSuperAdmin,
          userRole: user?.role
        });

        if (isAuthenticated && isSuperAdmin) {
          console.log('✅ SuperAdminAuthGuard: Access granted to super-admin');
          return true;
        }

        console.log('🚫 SuperAdminAuthGuard: Access denied, redirecting to super-admin login');
        this.router.navigate(['/super-admin/login']);
        return false;
      })
    );
  }
}
