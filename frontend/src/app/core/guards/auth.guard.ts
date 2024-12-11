import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = localStorage.getItem('userRole');
  const requiredRole = route.data['role'];

  if (!userRole) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    router.navigate([`/${userRole}/dashboard`]);
    return false;
  }

  return true;
};
