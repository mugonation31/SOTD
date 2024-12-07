import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.authService.getCurrentUser();
    const requiredRole = route.data['role'];

    if (!user) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    if (requiredRole && user.role !== requiredRole) {
      // Redirect to appropriate dashboard based on role
      this.authService.navigateByRole(user.role);
      return false;
    }

    return true;
  }
}
