import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, timer } from 'rxjs';
import { map, catchError, tap, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  encryptSensitiveData,
  hashSecurityAnswer,
} from '../utils/encryption.utils';
import { User } from '../interfaces/user.interface';
import { SupabaseService } from '../../services/supabase.service';

export type UserRole = 'super-admin' | 'group-admin' | 'player';

// Storage Keys - Centralized for easy management
const STORAGE_KEYS = {
  USER: 'user',
  CURRENT_USER: 'user',
  LAST_ACTIVITY: 'lastActivity',
  PENDING_USER_DATA: 'pendingUserData',
  IS_FIRST_LOGIN: 'isFirstLogin', // Legacy - will be migrated
  USE_SUPABASE: 'useSupabase', // Toggle between mock and Supabase
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
  private useSupabase = false; // Toggle between mock and Supabase

  constructor(
    private http: HttpClient,
    private supabaseService: SupabaseService
  ) {
    this.currentUserSubject = new BehaviorSubject<AuthResponse | null>(
      this.getStoredUser()
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.initializeAuth();
  }

  private async initializeAuth() {
    // Check if we should use Supabase
    this.useSupabase = localStorage.getItem(STORAGE_KEYS.USE_SUPABASE) === 'true';
    
    if (this.useSupabase) {
      console.log('🔧 AuthService: Using Supabase authentication');
      // Subscribe to Supabase auth state changes
      this.supabaseService.user$.subscribe(user => {
        if (user) {
          this.supabaseService.profile$.pipe(take(1)).subscribe(profile => {
            if (profile) {
              // Convert Supabase profile to AuthResponse format
              const authResponse: AuthResponse = {
                token: 'supabase-session-token',
                user: {
                  id: profile.id,
                  email: profile.email,
                  role: profile.role,
                  firstName: profile.first_name,
                  lastName: profile.last_name,
                }
              };
              
              // Store in localStorage for consistency
              localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(authResponse));
              
              // Update reactive state
              this.currentUserSubject.next(authResponse);
              
              console.log('✅ AuthService: Supabase user authenticated:', authResponse);
            }
          });
        } else {
          // User logged out
          this.currentUserSubject.next(null);
          localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        }
      });
    } else {
      console.log('🔧 AuthService: Using mock authentication for development');
      this.initializeSessionTimer();
    }
  }

  // Enable Supabase authentication
  enableSupabaseAuth(): void {
    this.useSupabase = true;
    localStorage.setItem(STORAGE_KEYS.USE_SUPABASE, 'true');
    console.log('🔄 AuthService: Switched to Supabase authentication');
  }

  // Disable Supabase authentication (for development)
  disableSupabaseAuth(): void {
    this.useSupabase = false;
    localStorage.removeItem(STORAGE_KEYS.USE_SUPABASE);
    console.log('🔄 AuthService: Switched to mock authentication');
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

    try {
      const user = JSON.parse(storedUser);
      const lastActivity = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);

      if (lastActivity && Date.now() - Number(lastActivity) > SESSION_TIMEOUT) {
        this.clearUserStorage();
        return null;
      }

      // Ensure the stored user has the correct AuthResponse structure
      if (user && user.user && user.token) {
        return user;
      }
      
      // If it's in the old User format, convert it to AuthResponse format
      if (user && user.role && !user.user) {
        return {
          token: 'mock-jwt-token',
          user: {
            id: user.id || 'mock-id',
            email: user.email || 'mock@example.com',
            role: user.role,
            firstName: user.firstName || 'Unknown',
            lastName: user.lastName || 'User'
          }
        };
      }

      return null;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      this.clearUserStorage();
      return null;
    }
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
    if (this.useSupabase) {
      return this.loginWithSupabase(loginData);
    } else {
      return this.loginWithMock(loginData);
    }
  }

  private loginWithSupabase(loginData: LoginData): Observable<AuthResponse> {
    return new Observable(subscriber => {
      this.supabaseService.signIn(loginData.email, loginData.password)
        .then(result => {
          console.log('✅ Supabase login successful:', result);
          
          // The auth state change will be handled by the subscription in initializeAuth
          // For now, we'll wait for the profile to be loaded
          setTimeout(() => {
            const currentUser = this.currentUserValue;
            if (currentUser) {
              subscriber.next(currentUser);
            } else {
              subscriber.error(new Error('Authentication failed'));
            }
            subscriber.complete();
          }, 1000);
        })
        .catch(error => {
          console.error('❌ Supabase login failed:', error);
          subscriber.error(error);
        });
    });
  }

  private loginWithMock(loginData: LoginData): Observable<AuthResponse> {
    // For mock purposes, try to determine user data from stored signup data or use defaults
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
        id: `user_${loginData.email.replace(/[^a-zA-Z0-9]/g, '_')}`,
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
        const hasCompletedFirstLogin = localStorage.getItem(`firstLoginComplete_${mockResponse.user.email}`) === 'true';
        const isFirstLogin = !hasCompletedFirstLogin;
        
        const user: User = {
          id: mockResponse.user.id,
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
  }

  signup(userData: SignupData): Observable<AuthResponse> {
    if (this.useSupabase) {
      return this.signupWithSupabase(userData);
    } else {
      return this.signupWithMock(userData);
    }
  }

  private signupWithSupabase(userData: SignupData): Observable<AuthResponse> {
    return new Observable(subscriber => {
      this.supabaseService.signUp(userData.email, userData.password, {
        username: userData.username || '',
        first_name: userData.firstName,
        last_name: userData.lastName,
        role: userData.role
      })
      .then(result => {
        console.log('✅ Supabase signup successful:', result);
        
        // Create mock AuthResponse for consistency
        const authResponse: AuthResponse = {
          token: 'supabase-signup-token',
          user: {
            id: result.user?.id || 'temp-id',
            email: userData.email,
            role: userData.role,
            firstName: userData.firstName,
            lastName: userData.lastName,
          }
        };
        
        subscriber.next(authResponse);
        subscriber.complete();
      })
      .catch(error => {
        console.error('❌ Supabase signup failed:', error);
        subscriber.error(error);
      });
    });
  }

  private signupWithMock(userData: SignupData): Observable<AuthResponse> {
    // Store the role and username temporarily for login (mock behavior)
    localStorage.setItem(`pendingRole_${userData.email}`, userData.role);
    localStorage.setItem(`pendingUsername_${userData.email}`, userData.username || '');
    localStorage.setItem(`pendingFirstName_${userData.email}`, userData.firstName);
    localStorage.setItem(`pendingLastName_${userData.email}`, userData.lastName);
    
    // Mock response for frontend development
    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token',
      user: {
        id: `user_${userData.email.replace(/[^a-zA-Z0-9]/g, '_')}`,
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
  }

  logout(): void {
    console.log('🚪 AuthService: Logout called, performing cleanup and triggering reactive updates...');
    
    if (this.useSupabase) {
      this.supabaseService.signOut().then(() => {
        console.log('✅ Supabase logout successful');
        this.performLogout();
      }).catch(error => {
        console.error('❌ Supabase logout failed:', error);
        this.performLogout(); // Still perform local cleanup
      });
    } else {
      this.performLogout();
    }
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
          key === 'pendingUserData' ||
          key.startsWith('sb-') ||  // Supabase keys
          key.includes('supabase')) {
        console.log(`🗑️ Removing key: ${key}`);
        localStorage.removeItem(key);
      }
    });
    
    // Clear session storage as well
    sessionStorage.clear();
    
    // Clear the current user subject
    this.currentUserSubject.next(null);
    
    console.log('✅ Complete user data cleanup finished');
  }

  /**
   * Debug method to check current authentication state
   */
  public debugAuthState(): void {
    console.log('🔍 Auth Debug State:');
    console.log('useSupabase:', this.useSupabase);
    console.log('currentUserSubject value:', this.currentUserSubject.value);
    console.log('getCurrentUser():', this.getCurrentUser());
    console.log('getUserFromStorage():', this.getUserFromStorage());
    console.log('isAuthenticated():', this.isAuthenticated());
    console.log('isSuperAdmin():', this.isSuperAdmin());
    console.log('localStorage user:', localStorage.getItem('user'));
    console.log('localStorage currentUser:', localStorage.getItem('currentUser'));
    
    if (this.useSupabase) {
      console.log('Supabase currentUser:', this.supabaseService.currentUser);
      console.log('Supabase currentProfile:', this.supabaseService.currentProfile);
    }
  }

  /**
   * Emergency auth reset - resolves Supabase lock conflicts
   */
  public emergencyAuthReset(): void {
    console.log('🚨 AuthService: Emergency auth reset initiated...');
    
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Reset current user
    this.currentUserSubject.next(null);
    
    // Clear session timer
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
      this.sessionTimer = null;
    }
    
    console.log('✅ Emergency auth reset completed - all state cleared');
  }
}
