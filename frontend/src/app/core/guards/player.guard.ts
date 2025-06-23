import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlayerGuard {
  constructor(private router: Router) {}

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    const hasJoinedGroup = localStorage.getItem('hasJoinedGroup') === 'true';

    if (hasJoinedGroup) {
      return true;
    }

    this.router.navigate(['/player/join-group']);
    return false;
  }
}
