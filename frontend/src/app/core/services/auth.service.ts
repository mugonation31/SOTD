import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export type UserRole = 'player' | 'group-admin' | 'super-admin';

interface AuthResponse {
  token: string;
  role: UserRole;
}

export interface SignupData {
  username?: string;
  firstName: string;
  surname: string;
  email: string;
  password: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // This is a mock implementation - replace with real API calls
  login(email: string, password: string): Observable<AuthResponse> {
    // Mock response - replace with actual API call
    return of({
      token: 'mock-token',
      role: 'player' as UserRole,
    });
  }

  signup(userData: SignupData): Observable<AuthResponse> {
    // Mock response - replace with actual API call
    console.log('Signup data:', {
      ...userData,
      displayName: userData.username || userData.surname,
    });

    return of({
      token: 'mock-token',
      role: userData.role,
    });
  }

  logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
