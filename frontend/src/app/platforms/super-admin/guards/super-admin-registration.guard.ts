import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminRegistrationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    // Frontend-only implementation
    const hasRegisteredSuperAdmin = localStorage.getItem(
      'superAdminRegistered'
    );

    if (hasRegisteredSuperAdmin === 'true') {
      this.router.navigate(['/super-admin/login']);
      return of(false);
    }

    return of(true);
  }
}
