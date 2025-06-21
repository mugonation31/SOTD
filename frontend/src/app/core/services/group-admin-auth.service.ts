import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

interface GroupAdminUser {
  id: string;
  email: string;
  role: 'group-admin';
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class GroupAdminAuthService {
  private currentUserSubject: BehaviorSubject<GroupAdminUser | null>;
  public currentUser: Observable<GroupAdminUser | null>;

  constructor(private router: Router) {
    this.currentUserSubject = new BehaviorSubject<GroupAdminUser | null>(
      this.getUserFromStorage()
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getUserFromStorage(): GroupAdminUser | null {
    try {
      const user = localStorage.getItem('group_admin_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  public get currentUserValue(): GroupAdminUser | null {
    return this.currentUserSubject.value;
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    // Implement actual login logic here
    return new Observable((subscriber) => {
      // Mock successful login
      const user = {
        id: '1',
        email: credentials.email,
        role: 'group-admin' as const,
        token: 'mock-token',
      };

      localStorage.setItem('group_admin_user', JSON.stringify(user));
      this.currentUserSubject.next(user);
      subscriber.next(user);
      subscriber.complete();
    });
  }

  logout() {
    localStorage.removeItem('group_admin_user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/group-admin/login'], { replaceUrl: true });
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}
