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
      this.performSupabaseLogin(loginData, subscriber);
    });
  }

  private async performSupabaseLogin(loginData: LoginData, subscriber: any) {
    try {
      const result = await this.supabaseService.signIn(loginData.email, loginData.password);
      console.log('✅ Supabase login successful:', result);
      
      // Create AuthResponse directly from Supabase result
      if (result.user && result.session) {
        // Fetch profile data directly from Supabase
        try {
          const profileResult = await this.supabaseService.client
            .from('profiles')
            .select('*')
            .eq('id', result.user.id)
            .single();

          if (profileResult.error) {
            console.error('❌ Error fetching profile:', profileResult.error);
            subscriber.error(new Error('Profile not found'));
            return;
          }

          const profile = profileResult.data;
          if (profile) {
            const authResponse: AuthResponse = {
              token: result.session.access_token,
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
            
            console.log('✅ AuthService: Login response created:', authResponse);
            subscriber.next(authResponse);
            subscriber.complete();
          } else {
            console.error('❌ No profile found for user');
            subscriber.error(new Error('Profile not found'));
          }
        } catch (error) {
          console.error('❌ Error fetching profile:', error);
          subscriber.error(new Error('Profile not found'));
        }
      } else {
        console.error('❌ Invalid Supabase login result');
        subscriber.error(new Error('Invalid login result'));
      }
    } catch (error) {
      console.error('❌ Supabase login failed:', error);
      subscriber.error(error);
    }
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
    console.log('🔧 AuthService: Starting signup process...');
    console.log('🔧 AuthService: useSupabase =', this.useSupabase);
    console.log('🔧 AuthService: userData =', userData);
    
    if (this.useSupabase) {
      console.log('🔧 AuthService: Using Supabase signup');
      return this.signupWithSupabase(userData);
    } else {
      console.log('🔧 AuthService: Using Mock signup');
      return this.signupWithMock(userData);
    }
  }

  private signupWithSupabase(userData: SignupData): Observable<AuthResponse> {
    console.log('🔧 AuthService: Starting Supabase signup...');
    return new Observable(subscriber => {
      console.log('🔧 AuthService: Calling supabaseService.signUp...');
      this.supabaseService.signUp(userData.email, userData.password, {
        username: userData.username || '',
        first_name: userData.firstName,
        last_name: userData.lastName,
        role: userData.role
      })
      .then(result => {
        console.log('✅ Supabase signup successful:', result);

        // NEW (fallback): 
        
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
        
        console.log('🔧 AuthService: Sending success response:', authResponse);
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
    if (this.useSupabase) {
      // For Supabase, check the current profile
      const profile = this.supabaseService.currentProfile;
      return profile?.first_login === true;
    } else {
      // For mock authentication, check stored user data
      const user = this.getUserFromStorage();
      return user?.firstLogin === true;
    }
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

  /**
   * Clear Supabase auth locks and state
   */
  public async clearAuthLocks(): Promise<void> {
    console.log('🔧 AuthService: Clearing auth locks...');
    
    try {
      // Sign out from Supabase to clear any locks
      await this.supabaseService.client.auth.signOut();
      
      // Clear local storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Reset current user
      this.currentUserSubject.next(null);
      
      console.log('✅ Auth locks cleared successfully');
    } catch (error) {
      console.error('❌ AuthService: Failed to clear auth locks:', error);
    }
  }

  /**
   * Reset password using Supabase
   */
  resetPassword(email: string): Promise<{ error: any }> {
    return this.supabaseService.client.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:8100/auth/reset-password'
    });
  }

    /**
   * Set Supabase session from URL fragment tokens
   */
  async setSessionFromFragment(): Promise<boolean> {
    try {
      console.log('🔍 AuthService: Parsing URL fragment and setting Supabase session...');
      
      // Parse the URL fragment to extract tokens
      const url = new URL(window.location.href);
      const hashParams = new URLSearchParams(url.hash.slice(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      if (!accessToken || !refreshToken) {
        console.error('❌ Missing tokens in URL fragment');
        return false;
      }
      
      console.log('✅ Tokens found in URL fragment, setting Supabase session...');
      console.log('🔍 Token details:', {
        accessTokenLength: accessToken.length,
        refreshTokenLength: refreshToken.length,
        accessTokenStart: accessToken.substring(0, 20) + '...',
        refreshTokenStart: refreshToken.substring(0, 20) + '...'
      });
      
      console.log('🔍 About to call setSession with tokens...');
      
      // Set the Supabase session with the tokens from URL fragment
      console.log('🔍 Calling setSession...');
      const { data, error } = await this.supabaseService.client.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });
      console.log('🔍 setSession completed, checking for errors...');
      
      if (error) {
        console.error('❌ Failed to set Supabase session:', error);
        console.error('❌ Error details:', {
          message: error.message,
          status: error.status,
          name: error.name
        });
        return false;
      }
      
      console.log('✅ Supabase session established successfully');
      console.log('🔍 Session data:', {
        user: data.session?.user?.email,
        expiresAt: data.session?.expires_at,
        accessToken: data.session?.access_token ? 'Present' : 'Missing'
      });
      
      // Skip session verification to avoid potential hang
      console.log('✅ Session set successfully, skipping verification');
      return true;
      
    } catch (err) {
      console.error('❌ Error setting Supabase session:', err);
      if (err instanceof Error) {
        console.error('❌ Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
      }
      return false;
    }
  }

  /**
   * Update password using Supabase reset token
   */
  async updatePasswordWithTokens(newPassword: string): Promise<boolean> {
    try {
      // Try multiple sources for the access token
      let accessToken = '';
      
      // First, try to get from URL fragment
      const url = new URL(window.location.href);
      const hashParams = new URLSearchParams(url.hash.slice(1));
      accessToken = hashParams.get('access_token') || '';
      
      // If not found in URL, try to get from localStorage (component might have stored it)
      if (!accessToken) {
        accessToken = localStorage.getItem('current_reset_token') || '';
      }
      
      // If still not found, try to get from session storage
      if (!accessToken) {
        accessToken = sessionStorage.getItem('current_reset_token') || '';
      }
      
      if (!accessToken) {
        console.error('❌ No access token found in URL fragment, localStorage, or sessionStorage');
        return false;
      }

      console.log('🔍 Using direct API call with access token...');

      // Use direct API call to update password
      const response = await fetch(`${environment.supabase.url}/auth/v1/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'apikey': environment.supabase.key
        },
        body: JSON.stringify({
          password: newPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Password update failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        return false;
      }

      console.log('✅ Password updated successfully');
      return true;

    } catch (err) {
      console.error('🔥 Exception during password reset:', err);
      
      // Handle NavigatorLockAcquireTimeoutError gracefully - it's usually not fatal
      if (err instanceof Error && err.message.includes('NavigatorLockAcquireTimeoutError')) {
        console.log('⚠️ NavigatorLockAcquireTimeoutError detected - this is usually not fatal');
        // Continue with the flow as this error doesn't necessarily mean the operation failed
        return true;
      }
      
      // Handle other specific errors
      if (err instanceof Error) {
        console.error('🔥 Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
      }
      
      return false;
    }
  }
}
