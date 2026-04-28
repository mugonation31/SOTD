import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonIcon,
  IonItem,
  IonList,
  IonCard,
  IonCardContent,
  IonText,
  IonNote,
} from '@ionic/angular/standalone';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  eye,
  eyeOff,
  footballOutline, mailOutline } from 'ionicons/icons';
import { AuthService } from '../../../../core/services/auth.service';
import { SupabaseService } from '../../../../services/supabase.service';

interface ValidationErrors {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonIcon,
    IonItem,
    IonList,
    IonCard,
    IonCardContent,
    IonText,
    IonNote,
    RouterLink,
    FormsModule,
    NgIf,
  ],
})
export class LoginPage implements OnInit {
  // Phase 12.2 (H4): only allow returnUrls that point at an in-app
  // platform root. Anything else (absolute URLs, protocol-relative,
  // javascript:, path traversal, recovery-token fragments, etc.) is
  // silently dropped and the role-based default is used instead.
  // Whitelisted prefixes match every post-login destination today —
  // /player/*, /group-admin/*, /super-admin/*, /welcome/*. Auth/onboarding
  // are intentionally excluded so a captured /auth/reset-password URL can't
  // be replayed via ?returnUrl=.
  private static readonly RETURN_URL_ALLOWLIST = /^\/(player|group-admin|super-admin|welcome)\//;

  loginData = {
    email: '',
    password: '',
    securityQuestion: '',
    securityAnswer: '',
  };

  validationErrors: ValidationErrors = {
    email: '',
    password: '',
  };

  showPassword = false;
  isLoading = false;
  private returnUrl: string = '';
  
  // Email confirmation state
  pendingConfirmation = false;
  userEmail = '';

  get canSubmit(): boolean {
    return Boolean(
      this.loginData.email &&
        this.loginData.password &&
        !this.validationErrors.email &&
        !this.validationErrors.password
    );
  }

  constructor(
    private authService: AuthService,
    private supabaseService: SupabaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({footballOutline,mailOutline,eye,eyeOff});
  }

  ngOnInit() {
    // Get return URL and role from route parameters
    this.route.queryParams.subscribe(params => {
      
      this.returnUrl = params['returnUrl'] || '';
      const expectedRole = params['role'] || '';
      
      // Check for email confirmation parameters
      this.pendingConfirmation = params['pendingConfirmation'] === 'true';
      this.userEmail = params['email'] || '';
      
    });
  }

  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!this.loginData.email) {
      this.validationErrors.email = 'Email is required';
    } else if (!emailPattern.test(this.loginData.email)) {
      this.validationErrors.email = 'Please enter a valid email address';
    } else {
      this.validationErrors.email = '';
    }
  }

  validatePassword() {
    // Login only checks that a password was entered — not its complexity.
    // Complexity rules (uppercase/number/special char) belong on signup
    // and reset-password, where the user is creating a NEW password.
    // Re-checking on login would lock out anyone whose existing password
    // predates the current policy or doesn't match the exact char set.
    if (!this.loginData.password) {
      this.validationErrors.password = 'Password is required';
    } else {
      this.validationErrors.password = '';
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    this.validateEmail();
    this.validatePassword();

    if (!this.canSubmit || this.isLoading) {
      console.log('⚠️ Login: Already in progress or form invalid, ignoring duplicate submission');
      return;
    }

    this.isLoading = true;
    console.log('🔍 Login: Starting login process...');

    // Check if user is already authenticated with the same email
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.user.email === this.loginData.email) {
      console.log('✅ Login: User already authenticated, redirecting...');
      this.handleSuccessfulLogin();
      return;
    }

    // Only clear session if user is different or not authenticated
    this.authService.clearSession();

    // Set default security question and answer for development
    this.loginData.securityQuestion = 'What is your favorite color?';
    this.loginData.securityAnswer = 'blue';

 

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('✅ Login: Success response received:', response);
        this.handleSuccessfulLogin();
      },
      error: (error) => {
        console.error('❌ Login: Error occurred:', error);
        this.isLoading = false;
        
        // TODO: Replace with proper toast service when available
        // For now, use a simple alert for user feedback
        const errorMessage = error?.error?.message || error?.message || 'Login failed. Please check your credentials and try again.';
        alert(errorMessage);
      },
    });
  }

  private handleSuccessfulLogin() {
    this.isLoading = false;
    const userRole = this.authService.getUserRole();

    // Handle specific return URL from external navigation (e.g., guard redirects).
    // sanitiseReturnUrl() returns null for anything that isn't a known in-app
    // path so we don't honor http://evil.com, javascript:, or recovery-token
    // fragment URLs fed via ?returnUrl=.
    const safeReturnUrl = this.sanitiseReturnUrl(this.returnUrl);
    if (safeReturnUrl) {
      this.router.navigate([safeReturnUrl], { replaceUrl: true });
      return;
    }

    // Simple role-based redirection to dashboards
    this.redirectBasedOnRole(userRole);
  }

  private sanitiseReturnUrl(returnUrl: string | null | undefined): string | null {
    if (!returnUrl || typeof returnUrl !== 'string') return null;
    // Reject any URL carrying a fragment — recovery-token URLs of the form
    // /auth/reset-password#access_token=… are dangerous even though the path
    // segment is in-app, because the fragment travels with the navigation.
    if (returnUrl.includes('#')) return null;
    if (!LoginPage.RETURN_URL_ALLOWLIST.test(returnUrl)) return null;
    return returnUrl;
  }

  private redirectBasedOnRole(role: string | null) {
    let targetRoute: string;

    // Check if this is a first login - redirect to appropriate first-time route
    const isFirstLogin = this.authService.isFirstTimeUser();

    console.log('🔍 Login: Redirecting user with role:', role, 'isFirstLogin:', isFirstLogin);

    if (isFirstLogin) {
      console.log('🆕 Login: First-time user - redirecting to onboarding flow');
      switch (role) {
        case 'group-admin':
          // /group-admin/group has the "Create your group" empty-state
          // form inline. Was /group-admin/groups before Phase 1 cleanup.
          targetRoute = '/group-admin/group';
          break;
        case 'player':
          // Players land on the join-group form; the first-login flow
          // exists precisely so new players know to enter a code.
          targetRoute = '/player/join-group';
          break;
        case 'super-admin':
          targetRoute = '/super-admin/dashboard';
          break;
        default:
          targetRoute = '/welcome';
      }
    } else {
      console.log('🔄 Login: Returning user - redirecting to dashboard');
      // Returning user — direct to the new home routes, not the legacy
      // /dashboard ones (which only resolve via redirectTo today and may
      // be removed entirely later).
      switch (role) {
        case 'group-admin':
          targetRoute = '/group-admin/home';
          break;
        case 'player':
          targetRoute = '/player/home';
          break;
        case 'super-admin':
          targetRoute = '/super-admin/dashboard';
          break;
        default:
          targetRoute = '/welcome';
      }
    }

    console.log('🎯 Login: Navigating to:', targetRoute);
    this.router.navigate([targetRoute], { replaceUrl: true });
  }

  async signInWithGoogle() {
    await this.supabaseService.signInWithGoogle();
  }

  navigateToWelcome() {
    // Clear any stored returnUrl and navigate to welcome page
    // This ensures users always go to welcome when clicking logo
    this.returnUrl = '';
    this.router.navigate(['/welcome'], { replaceUrl: true });
  }
}
