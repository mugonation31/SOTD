import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, timer } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  encryptSensitiveData,
  hashSecurityAnswer,
} from '../utils/encryption.utils';
import { User } from '../interfaces/user.interface';

export type UserRole = 'super-admin' | 'group-admin' | 'player';

// Storage Keys - Centralized for easy management
const STORAGE_KEYS = {
  USER: 'user',
  CURRENT_USER: 'user',
  LAST_ACTIVITY: 'lastActivity',
  PENDING_USER_DATA: 'pendingUserData',
  IS_FIRST_LOGIN: 'isFirstLogin', // Legacy - will be migrated
} as const;

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

  // Centralized storage methods
  private setUserInStorage(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  private getUserFromStorage(): User | null {
    try {
      const userJson = localStorage.getItem(STORAGE_KEYS.USER);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Error parsing user data from storage:', error);
      return null;
    }
  }

  private clearUserStorage(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.LAST_ACTIVITY);
    localStorage.removeItem(STORAGE_KEYS.PENDING_USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.IS_FIRST_LOGIN);
    
    // Clean up any pending signup data (mock behavior cleanup)
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('pendingRole_') || 
          key.startsWith('pendingUsername_') || 
          key.startsWith('pendingFirstName_') || 
          key.startsWith('pendingLastName_')) {
        localStorage.removeItem(key);
      }
    });
  }

  private getStoredUser(): AuthResponse | null {
    const storedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!storedUser) return null;

    const user = JSON.parse(storedUser);
    const lastActivity = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);

    if (lastActivity && Date.now() - Number(lastActivity) > SESSION_TIMEOUT) {
      this.clearUserStorage();
      return null;
    }

    return user;
  }

  private initializeSessionTimer() {
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
    }

    this.sessionTimer = setInterval(() => {
      const lastActivity = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
      if (lastActivity && Date.now() - Number(lastActivity) > SESSION_TIMEOUT) {
        this.logout();
      }
    }, 60000); // Check every minute
  }

  private updateLastActivity() {
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString());
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
    // For mock purposes, try to determine user data from stored signup data or use defaults
    // In a real app, this would come from the backend
    let userRole: UserRole = 'player';
    let username = 'User';
    let firstName = 'John';
    let lastName = 'Doe';
    
    // Check if we have stored user information from signup
    const storedRole = localStorage.getItem(`pendingRole_${loginData.email}`);
    const storedUsername = localStorage.getItem(`pendingUsername_${loginData.email}`);
    const storedFirstName = localStorage.getItem(`pendingFirstName_${loginData.email}`);
    const storedLastName = localStorage.getItem(`pendingLastName_${loginData.email}`);
    
    if (storedRole && ['player', 'group-admin', 'super-admin'].includes(storedRole)) {
      userRole = storedRole as UserRole;
    }
    if (storedUsername) {
      username = storedUsername;
    }
    if (storedFirstName) {
      firstName = storedFirstName;
    }
    if (storedLastName) {
      lastName = storedLastName;
    }

    // Mock response for frontend development
    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token',
      user: {
        id: `user_${loginData.email.replace(/[^a-zA-Z0-9]/g, '_')}`, // Generate unique ID based on email
        email: loginData.email,
        firstName: firstName,
        lastName: lastName,
        role: userRole,
      },
    };

    // Return mock response
    return new Observable((subscriber) => {
      setTimeout(() => {
        // Store in legacy format for compatibility
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(mockResponse));
        localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString());
        
        // Store in new format for AuthGuard
        // Check if this user has completed first login before
        const hasCompletedFirstLogin = localStorage.getItem(`firstLoginComplete_${mockResponse.user.email}`) === 'true';
        const isFirstLogin = !hasCompletedFirstLogin;
        
        const user: User = {
          id: mockResponse.user.id, // This now uses the unique ID we generated above
          role: mockResponse.user.role,
          firstLogin: isFirstLogin,
          username: username,
          firstName: mockResponse.user.firstName,
          lastName: mockResponse.user.lastName,
          email: mockResponse.user.email
        };
        this.setUserInStorage(user);
        
        // Clean up the temporary signup storage after successful login
        localStorage.removeItem(`pendingRole_${loginData.email}`);
        localStorage.removeItem(`pendingUsername_${loginData.email}`);
        localStorage.removeItem(`pendingFirstName_${loginData.email}`);
        localStorage.removeItem(`pendingLastName_${loginData.email}`);
        
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
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(response));
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
    // Store the role and username temporarily for login (mock behavior)
    localStorage.setItem(`pendingRole_${userData.email}`, userData.role);
    localStorage.setItem(`pendingUsername_${userData.email}`, userData.username || '');
    localStorage.setItem(`pendingFirstName_${userData.email}`, userData.firstName);
    localStorage.setItem(`pendingLastName_${userData.email}`, userData.lastName);
    
    // Mock response for frontend development
    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token',
      user: {
        id: `user_${userData.email.replace(/[^a-zA-Z0-9]/g, '_')}`, // Generate unique ID based on email
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
      },
    };

    // Return mock response - just return success without storing
    return new Observable((subscriber) => {
      setTimeout(() => {
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
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(response));
          localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString());
          this.currentUserSubject.next(response);
          return response;
        })
      );
    */
  }

  logout(): void {
    console.log('🚪 AuthService: Logout called, performing cleanup and triggering reactive updates...');
    this.performLogout();
    // Note: Don't redirect here - let the calling component handle navigation
    // This prevents issues with returnUrl and ensures clean navigation flow
  }

  // Logout without redirect (for use in signup flow)
  logoutSilent() {
    console.log('🔇 AuthService: Silent logout called, performing cleanup without logging...');
    this.performLogout();
  }

  private performLogout() {
    console.log('🧹 AuthService: Starting logout cleanup process...');
    
    // Store user email to track that they have completed first login
    const user = this.getUserFromStorage();
    if (user?.firstLogin && user.email) {
      console.log(`📝 AuthService: Marking first login complete for user: ${user.email}`);
      // Mark this user as having completed first login
      localStorage.setItem(`firstLoginComplete_${user.email}`, 'true');
    }
    
    console.log('🗑️ AuthService: Clearing user storage...');
    this.clearUserStorage();
    
    console.log('📡 AuthService: Triggering BehaviorSubject.next(null) for reactive guard updates...');
    this.currentUserSubject.next(null);
    
    if (this.sessionTimer) {
      console.log('⏰ AuthService: Clearing session timer...');
      clearInterval(this.sessionTimer);
    }
    
    console.log('✅ AuthService: Logout cleanup completed - guards should now react to auth state change');
  }

  // Method to mark first login as complete (called from first-time pages)
  markFirstLoginComplete(): void {
    const user = this.getUserFromStorage();
    if (user?.firstLogin) {
      const updatedUser: User = {
        ...user,
        firstLogin: false
      };
      this.setUserInStorage(updatedUser);
      console.log('First login marked as complete for user:', updatedUser);
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

  // Updated to use new storage format
  isFirstTimeUser(): boolean {
    const user = this.getUserFromStorage();
    return user?.firstLogin === true;
  }

  // Updated to use new storage format
  markUserAsReturning(): void {
    const user = this.getUserFromStorage();
    if (user) {
      const updatedUser: User = {
        ...user,
        firstLogin: false
      };
      this.setUserInStorage(updatedUser);
    }
  }

  getUserRole(): UserRole | null {
    const user = this.getUserFromStorage();
    return user?.role || this.currentUserValue?.user.role || null;
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

  // New method to get first-time routes
  getFirstTimeRoute(): string {
    const role = this.getUserRole();
    switch (role) {
      case 'group-admin':
        return '/group-admin/groups';
      case 'player':
        return '/player/join-group';
      case 'super-admin':
        return '/super-admin/dashboard'; // Super admin always goes to dashboard
      default:
        return '/welcome';
    }
  }

  // Get user display name for greetings
  getUserDisplayName(): string {
    const user = this.getUserFromStorage();
    // Use username for greetings (always available since it's required)
    return user?.username || 'User';
  }

  // Get time-based greeting
  getTimeBasedGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  // Get personalized greeting message using username
  getPersonalizedGreeting(): string {
    const username = this.getUserDisplayName();
    const timeGreeting = this.getTimeBasedGreeting();
    return `${timeGreeting}, ${username}!`;
  }

  // Public method to get current user data
  getCurrentUser(): User | null {
    return this.getUserFromStorage();
  }

  /**
   * Complete user data cleanup - ensures proper user switching
   */
  public clearAllUserData(): void {
    console.log('🧹 AuthService: Performing complete user data cleanup...');
    
    // Get all localStorage keys
    const allKeys = Object.keys(localStorage);
    
    // Remove all user-related keys
    allKeys.forEach(key => {
      if (key.startsWith('user') || 
          key.startsWith('pending') || 
          key.startsWith('firstLogin') || 
          key.includes('admin') ||
          key === 'lastActivity' ||
          key === 'isFirstLogin' ||
          key === 'pendingUserData') {
        console.log(`🗑️ Removing key: ${key}`);
        localStorage.removeItem(key);
      }
    });
    
    // Clear the current user subject
    this.currentUserSubject.next(null);
    
    console.log('✅ Complete user data cleanup finished');
  }
}
