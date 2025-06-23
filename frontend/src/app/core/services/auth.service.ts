import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, timer } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  encryptSensitiveData,
  hashSecurityAnswer,
} from '../utils/encryption.utils';

export type UserRole = 'super-admin' | 'group-admin' | 'player';

export interface SignupData {
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
  };
}

interface LoginData {
  email: string;
  password: string;
  securityQuestion: string;
  securityAnswer: string;
}

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<AuthResponse | null>;
  public currentUser: Observable<AuthResponse | null>;
  private apiUrl = environment.apiUrl;
  private sessionTimer: any;
  private loginAttempts = new Map<
    string,
    { count: number; lockoutUntil?: number }
  >();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthResponse | null>(
      this.getStoredUser()
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.initializeSessionTimer();
  }

  private getStoredUser(): AuthResponse | null {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) return null;

    const user = JSON.parse(storedUser);
    const lastActivity = localStorage.getItem('lastActivity');

    if (lastActivity && Date.now() - Number(lastActivity) > SESSION_TIMEOUT) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('lastActivity');
      return null;
    }

    return user;
  }

  private initializeSessionTimer() {
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
    }

    this.sessionTimer = setInterval(() => {
      const lastActivity = localStorage.getItem('lastActivity');
      if (lastActivity && Date.now() - Number(lastActivity) > SESSION_TIMEOUT) {
        this.logout();
      }
    }, 60000); // Check every minute
  }

  private updateLastActivity() {
    localStorage.setItem('lastActivity', Date.now().toString());
  }

  private checkLoginAttempts(email: string): boolean {
    const attempts = this.loginAttempts.get(email);

    if (attempts?.lockoutUntil && Date.now() < attempts.lockoutUntil) {
      throw new Error(
        `Account locked. Try again after ${new Date(
          attempts.lockoutUntil
        ).toLocaleTimeString()}`
      );
    }

    const attemptCount = attempts?.count || 0;
    if (attemptCount >= MAX_LOGIN_ATTEMPTS) {
      const lockoutUntil = Date.now() + LOCKOUT_DURATION;
      this.loginAttempts.set(email, { count: 0, lockoutUntil });
      throw new Error(
        `Too many login attempts. Account locked until ${new Date(
          lockoutUntil
        ).toLocaleTimeString()}`
      );
    }

    return true;
  }

  public get currentUserValue(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  login(loginData: LoginData): Observable<AuthResponse> {
    // Get stored user data from signup (if exists) to preserve role
    const storedSignupData = localStorage.getItem('pendingUserData');
    let userRole: UserRole = 'player'; // Default role
    
    if (storedSignupData) {
      const signupData = JSON.parse(storedSignupData);
      userRole = signupData.role || 'player';
    }

    // Mock response for frontend development
    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token',
      user: {
        id: 'mock-user-id',
        email: loginData.email,
        firstName: 'John', // Mock name
        lastName: 'Doe', // Mock name
        role: userRole,
      },
    };

    // Return mock response
    return new Observable((subscriber) => {
      setTimeout(() => {
        localStorage.setItem('currentUser', JSON.stringify(mockResponse));
        localStorage.setItem('lastActivity', Date.now().toString());
        
        // Clear pending user data after successful login
        localStorage.removeItem('pendingUserData');
        
        this.currentUserSubject.next(mockResponse);
        subscriber.next(mockResponse);
        subscriber.complete();
      }, 500); // Simulate network delay
    });

    // TODO: Uncomment this when backend is ready
    /*
    try {
      this.checkLoginAttempts(loginData.email);
    } catch (error) {
      return throwError(() => error);
    }

    const secureData = {
      ...loginData,
      password: encryptSensitiveData(loginData, ['password']).password,
      securityAnswer: hashSecurityAnswer(loginData.securityAnswer),
    };

    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, secureData)
      .pipe(
        tap(() => {
          this.loginAttempts.delete(loginData.email);
          this.updateLastActivity();
        }),
        map((response) => {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          const attempts = this.loginAttempts.get(loginData.email) || {
            count: 0,
          };
          this.loginAttempts.set(loginData.email, {
            count: attempts.count + 1,
          });
          return throwError(() => error);
        })
      );
    */
  }

  signup(userData: SignupData): Observable<AuthResponse> {
    // Store user data temporarily for login to preserve role
    localStorage.setItem('pendingUserData', JSON.stringify(userData));
    
    // Set first-time user flag
    localStorage.setItem('isFirstLogin', 'true');

    // Mock response for frontend development
    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token',
      user: {
        id: 'mock-user-id',
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
      },
    };

    // Return mock response
    return new Observable((subscriber) => {
      setTimeout(() => {
        // Store both token and user data
        localStorage.setItem('currentUser', JSON.stringify(mockResponse));
        localStorage.setItem('lastActivity', Date.now().toString());
        this.currentUserSubject.next(mockResponse);
        subscriber.next(mockResponse);
        subscriber.complete();
      }, 500); // Simulate network delay
    });

    // TODO: Uncomment this when backend is ready
    /*
    const signupData = { ...userData, role: 'player' as UserRole };
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/signup`, signupData)
      .pipe(
        map((response) => {
          localStorage.setItem('currentUser', JSON.stringify(response));
          localStorage.setItem('lastActivity', Date.now().toString());
          this.currentUserSubject.next(response);
          return response;
        })
      );
    */
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('lastActivity');
    localStorage.removeItem('isFirstLogin');
    localStorage.removeItem('pendingUserData');
    this.currentUserSubject.next(null);
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
    }
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue?.token;
  }

  isSuperAdmin(): boolean {
    return this.currentUserValue?.user.role === 'super-admin';
  }

  getToken(): string | null {
    return this.currentUserValue?.token || null;
  }

  isFirstTimeUser(): boolean {
    return localStorage.getItem('isFirstLogin') === 'true';
  }

  markUserAsReturning(): void {
    localStorage.removeItem('isFirstLogin');
  }

  getUserRole(): UserRole | null {
    return this.currentUserValue?.user.role || null;
  }

  getDefaultDashboardRoute(): string {
    const role = this.getUserRole();
    switch (role) {
      case 'super-admin':
        return '/super-admin/dashboard';
      case 'group-admin':
        return '/group-admin/dashboard';
      case 'player':
        return '/player/dashboard';
      default:
        return '/welcome';
    }
  }
}
