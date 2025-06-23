import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GroupAdminAuthService } from '@core/services/group-admin-auth.service';

@Injectable({
  providedIn: 'root',
})
export class GroupAdminAuthGuard implements CanActivate {
  constructor(
    private groupAdminAuth: GroupAdminAuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.groupAdminAuth.isAuthenticated()) {
      return true;
    }

    // Redirect to centralized auth login
    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl: '/group-admin/dashboard' }
    });
    return false;
  }
}
