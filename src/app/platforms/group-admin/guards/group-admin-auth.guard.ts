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

    this.router.navigate(['/group-admin/login']);
    return false;
  }
}
