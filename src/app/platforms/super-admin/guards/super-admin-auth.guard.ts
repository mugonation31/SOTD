import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Frontend-only implementation
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isSuperAdmin = localStorage.getItem('userRole') === 'super-admin';

    if (isLoggedIn && isSuperAdmin) {
      return true;
    }

    this.router.navigate(['/super-admin/login']);
    return false;
  }
}
