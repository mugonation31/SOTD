import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { GroupService } from '@core/services/group.service';

@Injectable({ providedIn: 'root' })
export class PlayerGuard {
  constructor(
    private router: Router,
    private authService: AuthService,
    private groupService: GroupService
  ) {}

  async canActivate(): Promise<boolean> {
    try {
      // First check if user is authenticated
      const user = this.authService.getCurrentUser();

      if (!user) {
        this.router.navigate(['/auth/login']);
        return false;
      }

      // Check if user is a player
      if (user.role !== 'player') {
        this.router.navigate(['/auth/login']);
        return false;
      }

      // Check if player has joined any groups using GroupService
      const userGroups = await this.groupService.getUserGroups();

      if (userGroups.length > 0) {
        return true;
      }

      this.router.navigate(['/player/join-group']);
      return false;
    } catch (error) {
      console.error('PlayerGuard: Error checking player status:', error);
      this.router.navigate(['/player/join-group']);
      return false;
    }
  }
}
