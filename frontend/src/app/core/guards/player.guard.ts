import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import { GroupService } from '@core/services/group.service';

@Injectable({ providedIn: 'root' })
export class PlayerGuard {
  constructor(
    private router: Router,
    private authService: AuthService,
    private groupService: GroupService
  ) {}

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.currentUser.pipe(
      take(1),
      map(authResponse => {
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
          const userGroups = this.groupService.getUserGroups();
          const hasJoinedGroup = userGroups.length > 0;

          // Also check legacy localStorage as fallback
          const legacyHasJoinedGroup = localStorage.getItem('hasJoinedGroup') === 'true';
          
          const playerHasJoinedGroup = hasJoinedGroup || legacyHasJoinedGroup;

            userEmail: user.email,
            userGroupsCount: userGroups.length,
            hasJoinedGroup,
            legacyHasJoinedGroup,
            playerHasJoinedGroup
          });

          if (playerHasJoinedGroup) {

            return true;
          }


          this.router.navigate(['/player/join-group']);
          return false;
        } catch (error) {
          console.error('❌ PlayerGuard: Error checking player status:', error);
          this.router.navigate(['/player/join-group']);
          return false;
        }
      })
    );
  }
}
