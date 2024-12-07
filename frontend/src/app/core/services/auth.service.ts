import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export type UserRole = 'super-admin' | 'group-admin' | 'player';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}

@Injectable()
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(email: string, password: string) {
    // TODO: Replace with actual API call
    let user: User;

    // Temporary logic for super admin
    if (email === 'super@admin.com') {
      user = {
        id: '1',
        email,
        fullName: 'Super Admin',
        role: 'super-admin',
      };
    } else {
      // Simulate API response for other users
      user = {
        id: '2',
        email,
        fullName: 'Test User',
        role: 'player', // Default to player for now
      };
    }

    // Store user details
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);

    // Navigate based on role
    this.navigateByRole(user.role);
  }

  signup(userData: {
    email: string;
    fullName: string;
    password: string;
    role: UserRole;
  }) {
    // TODO: Replace with actual API call
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      fullName: userData.fullName,
      role: userData.role,
    };

    // Store user details
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);

    // Navigate based on role
    this.navigateByRole(user.role);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  private navigateByRole(role: UserRole) {
    switch (role) {
      case 'super-admin':
        this.router.navigate(['/super-admin/dashboard']);
        break;
      case 'group-admin':
        this.router.navigate(['/group-admin/dashboard']);
        break;
      case 'player':
        this.router.navigate(['/player/dashboard']);
        break;
      default:
        this.router.navigate(['/auth/login']);
    }
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  forgotPassword(email: string) {
    // TODO: Implement actual forgot password logic
    console.log('Password reset requested for:', email);
    this.router.navigate(['/auth/otp']);
  }

  verifyOTP(otp: string) {
    // TODO: Implement actual OTP verification
    console.log('OTP verification:', otp);
    this.router.navigate(['/auth/login']);
  }
}
