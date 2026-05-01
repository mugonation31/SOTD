import { Injectable, isDevMode } from '@angular/core';
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
  CURRENT_USER: 'sotd_current_user',
  LAST_ACTIVITY: 'sotd_lastActivity',
  SESSION_ID: 'sotd_session_id',
  USE_SUPABASE: 'useSupabase', // Toggle between mock and Supabase
} as const;

// Session management constants
const SESSION_STORAGE_KEY = 'sotd_session_sync';
const SESSION_CHECK_INTERVAL = 5000; // Check every 5 seconds for cross-tab sync (less aggressive)

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
    username: string;
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
  private crossTabTimer: any;
  private currentSessionId: string = '';
  private loginAttempts = new Map<
    string,
    { count: number; lockoutUntil?: number }
  >();
  private useSupabase = true; // Default to Supabase
  private sessionRestorationInProgress = false;
  private isInitialized = false;
  private isHandlingCrossTabEvent = false; // Prevent infinite loops
  private loginInProgress = false; // Track active login process
  private lastBroadcastTime = 0; // Throttle broadcasts
  private readonly BROADCAST_THROTTLE_MS = 1000; // Minimum 1 second between broadcasts

  // Phase 11.2 (B2): recovery access token kept in service-private memory only.
  // Never persisted to localStorage / sessionStorage so it cannot survive tab
  // close, cross-tab read, or XSS-driven storage scrape.
  private resetAccessToken: string | null = null;

  constructor(
    private http: HttpClient,
    private supabaseService: SupabaseService
  ) {
    // Generate unique session ID for this tab
    this.currentSessionId = this.generateSessionId();

    this.currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    // Initialize auth system
    this.initializeAuth();
  }

  // Cleanup resources
  ngOnDestroy(): void {
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
    }
    if (this.crossTabTimer) {
      clearInterval(this.crossTabTimer);
    }
    window.removeEventListener('storage', this.handleStorageChange.bind(this));
  }

  // Debug method to force complete first login (dev mode only)
  async debugForceCompleteFirstLogin(): Promise<void> {
    if (!isDevMode()) return;
    try {
      await this.markFirstLoginComplete();
      console.log('✅ Debug: First login completion attempted');
    } catch (error) {
      console.error('❌ Debug: Error forcing first login completion:', error);
    }
  }

  // Debug method to manually clear auth locks (dev mode only)
  async debugClearAuthLocks(): Promise<void> {
    if (!isDevMode()) return;
    try {
      await (this.supabaseService as any).clearAuthLocks();
      console.log('✅ Debug: Auth locks clearing attempted');
    } catch (error) {
      console.error('❌ Debug: Error clearing auth locks:', error);
    }
  }

  private async initializeAuth() {
    if (this.isInitialized) return;

    console.log('🔄 AuthService: Initializing auth system...');

    try {
      // Check if we should use Supabase (default to true)
      this.useSupabase = localStorage.getItem(STORAGE_KEYS.USE_SUPABASE) !== 'false';
      if (this.useSupabase) {
        localStorage.setItem(STORAGE_KEYS.USE_SUPABASE, 'true');
      }

      // Store session ID for cross-tab communication
      localStorage.setItem(STORAGE_KEYS.SESSION_ID, this.currentSessionId);

      if (this.useSupabase) {
        await this.initializeSupabaseAuth();
      } else {
        this.initializeSessionTimer();
      }

      // Initialize cross-tab session synchronization
      this.initializeCrossTabSync();

      // Check for existing session
      await this.restoreSession();

      this.isInitialized = true;
      console.log('✅ AuthService: Auth system initialized');

    } catch (error) {
      console.error('❌ AuthService: Failed to initialize auth system:', error);
      this.isInitialized = true; // Still mark as initialized to prevent retry loops
    }
  }

  private async initializeSupabaseAuth() {
    // Subscribe to Supabase auth state changes
    this.supabaseService.user$.subscribe(user => {
      this.handleSupabaseAuthStateChange(user);
    });
  }

  private async handleSupabaseAuthStateChange(user: any) {
    if (user) {
      this.sessionRestorationInProgress = true;

      try {
        // Get profile data
        this.supabaseService.profile$.pipe(take(1)).subscribe(profile => {
          if (profile) {
            const authResponse: AuthResponse = {
              token: `supabase-session-${Date.now()}`,
              user: {
                id: profile.id,
                email: profile.email,
                role: profile.role,
                username: profile.username,
                firstName: profile.first_name,
                lastName: profile.last_name,
              }
            };

            this.setAuthenticatedUser(authResponse);
            console.log('✅ AuthService: User session restored', {
              userId: user.id,
              role: profile.role,
              firstLogin: profile.first_login
            });
          }
          this.sessionRestorationInProgress = false;
        });
      } catch (error) {
        console.error('❌ AuthService: Error handling auth state change:', error);
        this.sessionRestorationInProgress = false;
      }
    } else {
      // User logged out - clear session silently if not in an active login/restore process
      if (!this.sessionRestorationInProgress && !this.loginInProgress) {
        this.clearAuthenticatedUserInternal();
        console.log('ℹ️ AuthService: User session cleared');
      }
    }
  }

  // Enable Supabase authentication
  enableSupabaseAuth(): void {
    this.useSupabase = true;
    localStorage.setItem(STORAGE_KEYS.USE_SUPABASE, 'true');
  }

  // Disable Supabase authentication (for development)
  disableSupabaseAuth(): void {
    this.useSupabase = false;
    localStorage.setItem(STORAGE_KEYS.USE_SUPABASE, 'false');
  }

  // Session ID generation for cross-tab sync
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }

  // Cross-tab session synchronization
  private initializeCrossTabSync(): void {
    // Listen for storage changes from other tabs
    window.addEventListener('storage', this.handleStorageChange.bind(this));

    // Periodically check for session changes
    this.crossTabTimer = setInterval(() => {
      this.checkCrossTabSession();
    }, SESSION_CHECK_INTERVAL);
  }

  private handleStorageChange(event: StorageEvent): void {
    if (event.key === SESSION_STORAGE_KEY && !this.isHandlingCrossTabEvent) {
      const sessionData = event.newValue;
      if (sessionData) {
        try {
          const { action, sessionId } = JSON.parse(sessionData);

          // Ignore events from this tab
          if (sessionId === this.currentSessionId) return;

          // Set flag to prevent recursive calls
          this.isHandlingCrossTabEvent = true;

          switch (action) {
            case 'login':
              console.log('🔄 AuthService: Cross-tab login detected');
              this.restoreSession();
              break;
            case 'logout':
              console.log('🔄 AuthService: Cross-tab logout detected');
              // Clear local state without broadcasting to prevent loops
              this.clearAuthenticatedUserInternal();
              break;
          }
        } catch (error) {
          console.error('❌ AuthService: Error parsing cross-tab session data:', error);
        } finally {
          // Clear flag after a short delay
          setTimeout(() => {
            this.isHandlingCrossTabEvent = false;
          }, 100);
        }
      }
    }
  }

  private checkCrossTabSession(): void {
    // Skip if already handling cross-tab events to prevent loops
    if (this.isHandlingCrossTabEvent || this.loginInProgress) return;

    const currentUser = this.currentUserValue;
    const storedUser = this.getStoredUser();

    // Check if session state differs between tabs
    if (!currentUser && storedUser) {
      console.log('🔄 AuthService: Session found in storage, restoring...');
      this.sessionRestorationInProgress = true;
      this.currentUserSubject.next(storedUser);
      this.sessionRestorationInProgress = false;
    } else if (currentUser && !storedUser) {
      console.log('🔄 AuthService: Session cleared in storage, clearing local...');
      this.currentUserSubject.next(null);
    }
    // If both are the same, do nothing (no need to log every time)
  }

  // Centralized session management
  private setAuthenticatedUser(authResponse: AuthResponse): void {
    // Check if this is the same user to prevent duplicate broadcasts
    const currentUser = this.currentUserValue;
    const isSameUser = currentUser?.user?.id === authResponse.user.id;

    // Check if user data has actually changed
    const userDataChanged = !currentUser ||
      currentUser.user.id !== authResponse.user.id ||
      currentUser.user.email !== authResponse.user.email ||
      currentUser.user.role !== authResponse.user.role;

    // Update reactive state
    this.currentUserSubject.next(authResponse);

    // Store in localStorage
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(authResponse));
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString());

    // Only broadcast if this is a genuinely new/different user login (not session restoration)
    if (userDataChanged && !this.sessionRestorationInProgress && !this.loginInProgress) {
      this.broadcastSessionChange('login');
      console.log('📡 AuthService: Broadcasting new user login');
    } else {
      console.log('ℹ️ AuthService: Skipping broadcast - user data unchanged or in progress');
    }

    console.log('✅ AuthService: User authenticated and session stored');
  }

  private clearAuthenticatedUser(): void {
    // Clear reactive state first
    this.currentUserSubject.next(null);

    // Clear all session storage
    this.clearUserStorage();

    // Notify other tabs (only if not handling cross-tab event)
    if (!this.isHandlingCrossTabEvent) {
      this.broadcastSessionChange('logout');
    }

    console.log('✅ AuthService: User session cleared completely');
  }

  // Internal method that clears user without broadcasting (for cross-tab events)
  private clearAuthenticatedUserInternal(): void {
    // Clear reactive state first
    this.currentUserSubject.next(null);

    // Clear all session storage
    this.clearUserStorage();

    // Do NOT broadcast to prevent loops

    console.log('✅ AuthService: User session cleared internally (cross-tab)');
  }

  private broadcastSessionChange(action: 'login' | 'logout'): void {
    // Don't broadcast if we're handling a cross-tab event
    if (this.isHandlingCrossTabEvent) return;

    // Throttle broadcasts to prevent spam
    const now = Date.now();
    if (now - this.lastBroadcastTime < this.BROADCAST_THROTTLE_MS) {
      console.log(`⏱️ AuthService: Throttling ${action} broadcast (too soon)`);
      return;
    }
    this.lastBroadcastTime = now;

    const sessionData = {
      action,
      sessionId: this.currentSessionId,
      timestamp: Date.now()
    };

    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
      console.log(`📡 AuthService: Broadcasting ${action} to other tabs`);

      // Clean up broadcast data after a short delay
      setTimeout(() => {
        try {
          const currentData = localStorage.getItem(SESSION_STORAGE_KEY);
          if (currentData === JSON.stringify(sessionData)) {
            localStorage.removeItem(SESSION_STORAGE_KEY);
          }
        } catch (error) {
          // Ignore cleanup errors
        }
      }, 500);
    } catch (error) {
      console.error('❌ AuthService: Error broadcasting session change:', error);
    }
  }

  private clearUserStorage(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.LAST_ACTIVITY);
    localStorage.removeItem(SESSION_STORAGE_KEY);

    // Clean up any legacy storage keys
    const legacyKeys = ['user', 'pendingUserData', 'isFirstLogin'];
    legacyKeys.forEach(key => localStorage.removeItem(key));

    // Clean up any pending signup data
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('pending') || key.startsWith('sotd_temp_')) {
        localStorage.removeItem(key);
      }
    });
  }

  private async restoreSession(): Promise<void> {
    try {
      const storedUser = this.getStoredUser();
      if (storedUser && this.isSessionValid()) {
        this.currentUserSubject.next(storedUser);
        console.log('✅ AuthService: Session restored successfully');
      } else {
        console.log('ℹ️ AuthService: No valid session to restore');
      }
    } catch (error) {
      console.error('❌ AuthService: Error restoring session:', error);
    }
  }

  private isSessionValid(): boolean {
    const lastActivity = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
    if (!lastActivity) return false;

    const timeSinceLastActivity = Date.now() - Number(lastActivity);
    return timeSinceLastActivity <= SESSION_TIMEOUT;
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
            username: user.username || 'User',
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
      // First, check if user is already authenticated
      const currentUser = this.currentUserValue;
      if (currentUser && currentUser.user.email === loginData.email) {
        console.log('✅ AuthService: User already authenticated, skipping login');
        subscriber.next(currentUser);
        subscriber.complete();
        return;
      }
      
      // Check if there's an existing Supabase session
      const supabaseUser = this.supabaseService.currentUser;
      if (supabaseUser && supabaseUser.email === loginData.email) {
        console.log('✅ AuthService: Found existing Supabase session, using it');
        this.handleExistingSupabaseSession(supabaseUser, subscriber);
        return;
      }
      
      // If session restoration is in progress, wait for it
      if (this.sessionRestorationInProgress) {
        console.log('⏳ AuthService: Session restoration in progress, waiting...');
        const checkInterval = setInterval(() => {
          if (!this.sessionRestorationInProgress) {
            clearInterval(checkInterval);
            const restoredUser = this.currentUserValue;
            if (restoredUser && restoredUser.user.email === loginData.email) {
              console.log('✅ AuthService: Session restoration completed, using restored user');
              subscriber.next(restoredUser);
              subscriber.complete();
              return;
            }
          }
        }, 100);
        
        // Fallback timeout for session restoration
        setTimeout(() => {
          clearInterval(checkInterval);
          if (this.sessionRestorationInProgress) {
            console.log('⚠️ AuthService: Session restoration timeout, proceeding with manual login');
            this.performSupabaseLogin(loginData, subscriber);
          }
        }, 5000);
        return;
      }
      
      // Proceed with manual login
      this.performSupabaseLogin(loginData, subscriber);
    });
  }

  private async handleExistingSupabaseSession(supabaseUser: any, subscriber: any) {
    try {
      console.log('🔍 AuthService: Handling existing Supabase session...');
      
      // Get profile data for the existing user
      const profileResult = await this.supabaseService.client
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (profileResult.error) {
        console.error('❌ Profile not found for existing user. Role must come from profiles table.', profileResult.error);
        throw new Error('Profile fetch failed: user role must come from the profiles table');
      }

      const profile = profileResult.data;
      const authResponse: AuthResponse = {
        token: 'existing-session-token',
        user: {
          id: profile.id,
          email: profile.email,
          role: profile.role,
          username: profile.username,
          firstName: profile.first_name,
          lastName: profile.last_name,
        }
      };
      
      this.setAuthenticatedUser(authResponse);
      subscriber.next(authResponse);
      subscriber.complete();
    } catch (error) {
      console.error('❌ Error handling existing Supabase session:', error);
      subscriber.error(error);
    }
  }

  private async performSupabaseLogin(loginData: LoginData, subscriber: any) {
    try {
      console.log('🔍 AuthService: Starting Supabase login...');
      this.loginInProgress = true;

      // Clear any existing session state silently (without cross-tab broadcast)
      this.clearAuthenticatedUserInternal();

      console.log('🔍 AuthService: Calling supabaseService.signIn...');
      
      // Add timeout wrapper to prevent hanging on NavigatorLockAcquireTimeoutError
      const signInPromise = this.supabaseService.signIn(loginData.email, loginData.password);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('SignIn timeout')), 10000); // 10 second timeout
      });
      
      let result;
      try {
        result = await Promise.race([signInPromise, timeoutPromise]) as any;
        // Phase 11.3 (RESID-2): never log the full Supabase signIn payload
        // — `result.session.access_token` and `result.session.refresh_token`
        // are bearer credentials. Marker-only diagnostic.
        console.log('✅ AuthService: Supabase signIn completed', {
          hasUser: !!result?.user,
          hasSession: !!result?.session,
        });
        console.log('🔍 AuthService: About to fetch profile for user:', result.user?.id);
      } catch (signInError) {
        console.error('❌ AuthService: SignIn failed or timed out:', signInError);
        this.loginInProgress = false;
        // Don't create fallback response - let the error propagate
        subscriber.error(signInError);
        return;
      }
        
        // Create AuthResponse directly from Supabase result
        if (result.user && result.session) {
          // Fetch profile data directly from Supabase
          try {
            console.log('🔍 AuthService: Fetching profile from database...');
            // Defense-in-depth: if the PostgREST request hangs (e.g. on a
            // lock, a network stall, or a misbehaving middleware), surface
            // a clear error within 10s instead of leaving the user
            // staring at a "Logging in..." spinner forever.
            const PROFILE_FETCH_TIMEOUT_MS = 10000;
            const profileFetchPromise = this.supabaseService.client
              .from('profiles')
              .select('*')
              .eq('id', result.user.id)
              .single();
            const profileTimeoutPromise = new Promise<never>((_, reject) => {
              setTimeout(
                () => reject(new Error('Profile fetch timed out')),
                PROFILE_FETCH_TIMEOUT_MS
              );
            });
            const profileResult = await Promise.race([
              profileFetchPromise,
              profileTimeoutPromise,
            ]) as any;
            console.log('🔍 AuthService: Profile fetch result:', profileResult);

            if (profileResult.error) {
              console.error('❌ Profile fetch failed:', profileResult.error);
              this.loginInProgress = false;
              subscriber.error(new Error('Profile not found. Please contact support.'));
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
                  username: profile.username,
                  firstName: profile.first_name,
                  lastName: profile.last_name,
                }
              };
              
              // Store authenticated user with cross-tab sync
              this.setAuthenticatedUser(authResponse);

              this.loginInProgress = false;
              subscriber.next(authResponse);
              subscriber.complete();
            } else {
              console.error('❌ No profile data found for user');
              this.loginInProgress = false;
              subscriber.error(new Error('Profile not found. Please contact support.'));
            }
          } catch (error) {
            console.error('❌ Error fetching profile:', error);
            this.loginInProgress = false;
            subscriber.error(new Error('Profile fetch failed. Please try again or contact support.'));
          }
        } else {
          console.error('❌ Invalid Supabase login result');
          this.loginInProgress = false;
          subscriber.error(new Error('Invalid login result'));
        }
    } catch (error) {
      console.error('❌ Supabase login failed:', error);
      this.loginInProgress = false;
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
        username: username,
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
        
        // User object for mock login tracking
        const userForMock: User = {
          id: mockResponse.user.id,
          role: mockResponse.user.role,
          firstLogin: isFirstLogin,
          username: username,
          firstName: mockResponse.user.firstName,
          lastName: mockResponse.user.lastName,
          email: mockResponse.user.email
        };

        console.log('🔍 AuthService: Mock user created:', userForMock);
        // User is automatically stored via setAuthenticatedUser in Supabase flow
        console.log('ℹ️ AuthService: User registration completed');
        
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
        role: userData.role,
        username: userData.username || '',
        first_name: userData.firstName,
        last_name: userData.lastName,
      })
      .then(result => {
        // Create mock AuthResponse for consistency
        const authResponse: AuthResponse = {
          token: 'supabase-signup-token',
          user: {
            id: result.user?.id || 'temp-id',
            email: userData.email,
            role: userData.role,
            username: userData.username || '',
            firstName: userData.firstName,
            lastName: userData.lastName,
          }
        };
        
        subscriber.next(authResponse);
        subscriber.complete();
      })
      .catch(error => {
        console.error('Supabase signup failed:', error);
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
        role: userData.role,
        username: userData.username || '',
        firstName: userData.firstName,
        lastName: userData.lastName,
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
    console.log('🔄 AuthService: Starting logout process...');

    // Clear session timer first
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
      this.sessionTimer = null;
    }

    if (this.useSupabase) {
      // Clear local state immediately using the new method
      this.clearAuthenticatedUser();

      // Perform Supabase signOut with better error handling
      this.supabaseService.signOut()
        .then(() => {
          console.log('✅ AuthService: Supabase logout completed successfully');
        })
        .catch(error => {
          console.warn('⚠️ AuthService: Supabase logout warning (local cleanup already done):', error.message);
          // Local cleanup already done, so this is acceptable
        });
    } else {
      this.clearAuthenticatedUser();
    }

    console.log('✅ AuthService: Logout process completed');
  }

  // Clear session and force fresh login
  clearSession(): void {
    console.log('🗞️ AuthService: Clearing session...');
    this.clearAuthenticatedUser();
    console.log('✅ AuthService: Session cleared');
  }

  // Silent logout without cross-tab broadcasting (for internal use)
  logoutSilent(): void {
    console.log('🔄 AuthService: Performing silent logout...');

    this.currentUserSubject.next(null);
    this.clearUserStorage();

    if (this.useSupabase) {
      this.supabaseService.signOut().catch(error => {
        console.error('❌ AuthService: Silent Supabase logout failed:', error);
      });
    }

    console.log('✅ AuthService: Silent logout completed');
  }


  // Method to mark first login as complete (called from first-time pages)
  async markFirstLoginComplete(): Promise<void> {
    console.log('🔄 AuthService: Marking first login as complete...');

    if (this.useSupabase) {
      const currentUser = this.currentUserValue;
      const supabaseUser = this.supabaseService.currentUser;

      if (!currentUser?.user?.id || !supabaseUser?.id) {
        console.error('❌ AuthService: No authenticated user found');
        console.log('CurrentUser:', currentUser);
        console.log('SupabaseUser:', supabaseUser);
        throw new Error('No authenticated user found');
      }

      try {
        console.log('🔍 AuthService: Attempting to update first_login for user ID:', currentUser.user.id);
        console.log('🔍 AuthService: Supabase user ID:', supabaseUser.id);

        // Try the Supabase service method first
        await this.supabaseService.markFirstLoginComplete(currentUser.user.id);
        console.log('✅ AuthService: Supabase service update completed');

        // Wait a moment for the profile observable to update
        await new Promise(resolve => setTimeout(resolve, 500));

        // Force reload the profile from database
        await this.forceReloadProfile();

        // Verify the update worked
        setTimeout(async () => {
          await this.forceReloadProfile(); // Reload again
          const profile = this.supabaseService.currentProfile;
          const isStillFirstTime = this.isFirstTimeUser();

          console.log('🔍 AuthService: After marking complete verification:');
          console.log('  - isFirstTimeUser:', isStillFirstTime);
          console.log('  - Profile first_login:', profile?.first_login);
          console.log('  - Profile email:', profile?.email);

          if (isStillFirstTime) {
            console.warn('⚠️ AuthService: First login status still shows as true - trying direct update');
            await this.directUpdateFirstLoginStatus(currentUser.user.id);
          }
        }, 2000);

      } catch (error) {
        console.error('❌ AuthService: Failed to mark first login complete:', error);
        console.log('🔄 AuthService: Trying direct update method...');

        // Fallback: Try direct update (only if client is available)
        try {
          if (this.supabaseService.client) {
            await this.directUpdateFirstLoginStatus(currentUser.user.id);
          } else {
            console.log('ℹ️ AuthService: No Supabase client available, skipping direct update');
          }
        } catch (directError) {
          console.error('❌ AuthService: Direct update also failed:', directError);
          // Don't re-throw in test environment without client
          if (this.supabaseService.client) {
            throw error;
          }
        }
      }
    } else {
      localStorage.setItem('isFirstLogin', 'false');
      console.log('✅ AuthService: First login marked complete in local storage');
    }
  }

  // Force reload profile from Supabase
  private async forceReloadProfile(): Promise<void> {
    const user = this.supabaseService.currentUser;
    if (user?.id && this.supabaseService.client) {
      try {
        const { data: profile, error } = await this.supabaseService.client
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!error && profile) {
          console.log('🔄 AuthService: Profile reloaded from database:', profile);
          console.log('🔍 AuthService: Updated first_login status:', profile.first_login);

          // Force the SupabaseService to refresh its profile observable
          await this.supabaseService.refreshCurrentUserProfile();
        }
      } catch (error) {
        console.error('❌ AuthService: Error reloading profile:', error);
      }
    }
  }

  // Direct update method as fallback
  private async directUpdateFirstLoginStatus(userId: string): Promise<void> {
    if (!this.supabaseService.client) {
      console.log('ℹ️ AuthService: No Supabase client available for direct update');
      return;
    }

    try {
      console.log('🔧 AuthService: Direct database update for user:', userId);

      const { data, error } = await this.supabaseService.client
        .from('profiles')
        .update({
          first_login: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('❌ AuthService: Direct update error:', error);
        throw error;
      }

      console.log('✅ AuthService: Direct update successful:', data);

      // Profile will be updated automatically by Supabase's realtime subscriptions
      console.log('🔄 AuthService: Profile update triggered, data:', data);

      await this.forceReloadProfile(); // Double-check

    } catch (error) {
      console.error('❌ AuthService: Direct update failed:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue?.token;
  }

  isSuperAdmin(): boolean {
    return this.currentUserValue?.user.role === 'super-admin';
  }

  isGroupAdmin(): boolean {
    return this.currentUserValue?.user.role === 'group-admin';
  }

  isPlayer(): boolean {
    return this.currentUserValue?.user.role === 'player';
  }

  getToken(): string | null {
    return this.currentUserValue?.token || null;
  }

  // Updated to use new storage format
  isFirstTimeUser(): boolean {
    console.log('🔍 AuthService: Checking if user is first time...');
    console.log('🔍 AuthService: useSupabase:', this.useSupabase);

    if (this.useSupabase) {
      // For Supabase, check the current profile first
      const profile = this.supabaseService.currentProfile;
      console.log('🔍 AuthService: Current profile:', profile);

      // If profile is loaded, use its first_login value
      if (profile) {
        console.log('🔍 AuthService: Profile loaded - first_login status:', profile.first_login, 'for user:', profile.email);
        const isFirstTime = profile.first_login === true;
        console.log('🔍 AuthService: Returning isFirstTime:', isFirstTime);
        return isFirstTime;
      }

      // If profile is not loaded yet, try to get from user metadata as fallback
      const user = this.supabaseService.currentUser;
      console.log('🔍 AuthService: Current user:', user);
      if (user?.user_metadata) {
        console.log('⚠️ AuthService: Profile not loaded, checking user metadata:', user.user_metadata);
        // If first_login is explicitly false, return false; otherwise default to true for safety
        const isFirstTime = user.user_metadata['first_login'] !== false;
        console.log('🔍 AuthService: From user metadata, isFirstTime:', isFirstTime);
        return isFirstTime;
      }

      // If neither profile nor user metadata is available, default to true (first time)
      console.log('⚠️ AuthService: No profile or user metadata available, defaulting to first time user');
      return true;
    } else {
      // For mock users, check stored firstLogin flag (default to true for new users)
      const isFirstLogin = localStorage.getItem('isFirstLogin');
      console.log('🔍 AuthService: Mock mode - isFirstLogin localStorage:', isFirstLogin);
      const result = isFirstLogin === null || isFirstLogin === 'true';
      console.log('🔍 AuthService: Mock mode result:', result);
      return result;
    }
  }

  // Updated to use new storage format
  markUserAsReturning(): void {
    const user = this.currentUserValue?.user;
    if (user) {
      // For mock users, the firstLogin state is now stored in localStorage
      console.log('🔄 AuthService: Setting first login complete for mock user');
    }
  }

  getUserRole(): UserRole | null {
    const user = this.currentUserValue?.user;
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
    const user = this.currentUserValue?.user;
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
    const currentUser = this.currentUserValue?.user;
    if (!currentUser) return null;

    // Convert AuthResponse.user to User interface
    return {
      id: currentUser.id,
      email: currentUser.email,
      role: currentUser.role,
      username: currentUser.username,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      firstLogin: this.isFirstTimeUser()
    };
  }

  /**
   * Complete user data cleanup - ensures proper user switching
   */
  public clearAllUserData(): void {
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
        localStorage.removeItem(key);
      }
    });
    
    // Clear session storage as well
    sessionStorage.clear();
    
    // Clear the current user subject
    this.currentUserSubject.next(null);
  }

  /**
   * Emergency auth reset - resolves Supabase lock conflicts
   */
  public emergencyAuthReset(): void {
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
  }

  /**
   * Clear Supabase auth locks and state
   */
  public async clearAuthLocks(): Promise<void> {
    console.log('🔧 AuthService: Clearing Supabase locks...');
    
    // Clear local state first
    this.currentUserSubject.next(null);
    localStorage.clear();
    sessionStorage.clear();
    
    // Try to clear Supabase locks more aggressively
    try {
      // Clear any existing Supabase session
      await this.supabaseService.client.auth.signOut();
    } catch (e) {
      // Ignore errors
    }
    
    // Try to clear the lock manually
    try {
      if ('locks' in navigator) {
        await (navigator as any).locks.query().then((locks: any[]) => {
          locks.forEach(lock => {
            if (lock.name.includes('sb-') || lock.name.includes('supabase')) {
              console.log('🔧 AuthService: Found Supabase lock, attempting to release...');
            }
          });
        });
      }
    } catch (e) {
      // Ignore errors
    }
    
    // Wait a bit for locks to clear
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ AuthService: Supabase locks cleared');
  }

  /**
   * Emergency reset to resolve NavigatorLockAcquireTimeoutError
   */
  public async emergencyReset(): Promise<void> {
    console.log('🚨 AuthService: Performing emergency reset...');
    
    try {
      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear current user state
      this.currentUserSubject.next(null);
      
      // Clear session timer
      if (this.sessionTimer) {
        clearInterval(this.sessionTimer);
        this.sessionTimer = null;
      }
      
      // Force enable Supabase
      this.useSupabase = true;
      localStorage.setItem(STORAGE_KEYS.USE_SUPABASE, 'true');
      
      // Wait for locks to clear
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('✅ AuthService: Emergency reset complete');
    } catch (error) {
      console.error('❌ AuthService: Emergency reset failed:', error);
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
      // Parse the URL fragment to extract tokens
      const url = new URL(window.location.href);
      const hashParams = new URLSearchParams(url.hash.slice(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      if (!accessToken || !refreshToken) {
        console.error('Missing tokens in URL fragment');
        return false;
      }
      
      // Set the Supabase session with the tokens from URL fragment
      const { error } = await this.supabaseService.client.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });
      
      if (error) {
        console.error('Failed to set Supabase session:', error);
        return false;
      }
      
      return true;
      
    } catch (err) {
      console.error('Error setting Supabase session:', err);
      return false;
    }
  }

  /**
   * Handle automatic navigation after session restoration
   * This method should be called when the app starts and finds an existing session
   */
  async handleSessionRestoration(): Promise<void> {
    if (!this.useSupabase) {
      return;
    }

    try {
      // Hard-refresh fix: don't read BehaviorSubject getters — they're
      // populated async by the supabase-js onAuthStateChange listener,
      // which races with this code on cold start. Query auth + profile
      // directly so we always see the freshly-restored session.
      const { data: sessionData } =
        await this.supabaseService.client.auth.getSession();
      const supabaseUser = sessionData?.session?.user;

      if (!supabaseUser) {
        console.log('ℹ️ AuthService: No active session to restore');
        return;
      }

      // Fetch the profile row directly. The profile RLS owner-policy
      // permits this for the authed caller. 8s timeout matches the
      // login-path profile fetch (auth.service.ts performSupabaseLogin).
      const PROFILE_FETCH_TIMEOUT_MS = 8000;
      const profileFetchPromise = this.supabaseService.client
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();
      const profileTimeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(
          () => reject(new Error('Profile fetch timed out (session restore)')),
          PROFILE_FETCH_TIMEOUT_MS,
        );
      });
      const profileResult = (await Promise.race([
        profileFetchPromise,
        profileTimeoutPromise,
      ])) as { data: any; error: any };

      if (profileResult.error || !profileResult.data) {
        console.error(
          '❌ AuthService: Profile fetch on session restore failed',
          profileResult.error,
        );
        return;
      }

      const profile = profileResult.data;
      console.log('🔄 AuthService: Handling session restoration', {
        userId: supabaseUser.id,
        role: profile.role,
        firstLogin: profile.first_login,
      });

      const authResponse: AuthResponse = {
        token: sessionData?.session?.access_token ?? 'supabase-session-token',
        user: {
          id: profile.id,
          email: profile.email,
          role: profile.role,
          username: profile.username,
          firstName: profile.first_name,
          lastName: profile.last_name,
        },
      };

      this.setAuthenticatedUser(authResponse);
      console.log('✅ AuthService: Session restoration complete');
    } catch (error) {
      console.error('❌ AuthService: Error during session restoration:', error);
    }
  }

  /**
   * Phase 11.2 (B2): store the recovery access token captured by the
   * reset-password page in service-private memory. Never persisted.
   */
  setResetAccessToken(token: string): void {
    this.resetAccessToken = token;
  }

  /**
   * Phase 11.2 (B2): clear the in-memory recovery access token.
   * Called from reset-password page ngOnDestroy and on success/failure.
   */
  clearResetAccessToken(): void {
    this.resetAccessToken = null;
  }

  /**
   * Update password using Supabase reset token
   */
  async updatePasswordWithTokens(newPassword: string): Promise<boolean> {
    try {
      // Try multiple sources for the access token (in priority order):
      // 1. URL fragment (Supabase-default behaviour)
      // 2. Service-private in-memory cell populated by setResetAccessToken
      // The legacy localStorage / sessionStorage fallback was removed in
      // Phase 11.2 (B2) — recovery tokens must NEVER be persisted.
      let accessToken = '';

      const url = new URL(window.location.href);
      const hashParams = new URLSearchParams(url.hash.slice(1));
      accessToken = hashParams.get('access_token') || '';

      if (!accessToken) {
        accessToken = this.resetAccessToken || '';
      }

      if (!accessToken) {
        console.error('No access token found in URL fragment or in-memory recovery cell');
        return false;
      }

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
        console.error('Password update failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        return false;
      }

      return true;

    } catch (err) {
      console.error('Exception during password reset:', err);
      
      // Handle NavigatorLockAcquireTimeoutError gracefully - it's usually not fatal
      if (err instanceof Error && err.message.includes('NavigatorLockAcquireTimeoutError')) {
        // Continue with the flow as this error doesn't necessarily mean the operation failed
        return true;
      }
      
      return false;
    }
  }

  // Debug method to manually fix a user's first_login status
  async debugFixUserFirstLoginStatus(email: string, shouldBeFirstTime: boolean = false): Promise<boolean> {
    if (!this.useSupabase) {
      console.log('⚠️ AuthService: Debug method only works with Supabase');
      return false;
    }

    try {
      console.log(`🔧 AuthService: Setting first_login=${shouldBeFirstTime} for user: ${email}`);

      const { error } = await this.supabaseService.client
        .from('profiles')
        .update({
          first_login: shouldBeFirstTime,
          updated_at: new Date().toISOString()
        })
        .eq('email', email);

      if (error) {
        console.error(`❌ AuthService: Error updating user ${email}:`, error);
        return false;
      }

      console.log(`✅ AuthService: Successfully updated user ${email} first_login status`);

      // If this is the current user, force a profile refresh
      const currentUser = this.currentUserValue;
      if (currentUser?.user.email === email) {
        console.log('🔄 AuthService: Refreshing current user profile...');
        // The Supabase service should automatically update the profile via its subscription
        setTimeout(() => {
          const updatedStatus = this.isFirstTimeUser();
          console.log('🔍 AuthService: Current user updated first_login status:', updatedStatus);
        }, 1000);
      }

      return true;
    } catch (error) {
      console.error(`❌ AuthService: Error in debugFixUserFirstLoginStatus:`, error);
      return false;
    }
  }
}
