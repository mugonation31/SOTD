import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
}

@Injectable({ providedIn: 'root' })
export class NoAuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/welcome']);
    return false;
  }
}
