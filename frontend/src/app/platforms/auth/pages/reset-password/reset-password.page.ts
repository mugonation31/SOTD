import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  eye,
  eyeOff,
  footballOutline
} from 'ionicons/icons';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { validatePassword, getPasswordErrors } from '../../../../core/utils/validation.utils';

interface ValidationErrors {
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
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
    FormsModule,
    NgIf,
  ],
})
export class ResetPasswordPage implements OnInit, OnDestroy {
  resetData = {
    password: '',
    confirmPassword: '',
  };

  validationErrors: ValidationErrors = {
    password: '',
    confirmPassword: '',
  };

  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  accessToken: string = '';
  refreshToken: string = '';

  get canSubmit(): boolean {
    return Boolean(
      this.resetData.password &&
        this.resetData.confirmPassword &&
        !this.validationErrors.password &&
        !this.validationErrors.confirmPassword &&
        this.accessToken
    );
  }

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({ footballOutline, eye, eyeOff });
  }

  ngOnInit() {


    // Log the full URL for debugging


    
    // Extract access token from URL query parameters
    this.route.queryParams.subscribe(params => {


      if (!this.accessToken) {
        this.accessToken = params['code'] ||
                          params['access_token'] ||
                          params['token'] ||
                          params['reset_token'] || 
                          '';

        if (this.accessToken) {

          // Phase 11.2 (B2): hand the recovery token to AuthService in-memory
          // only. Never persist it to localStorage / sessionStorage.
          this.authService.setResetAccessToken(this.accessToken);
          this.validationErrors.password = '';
        } else {
          console.error('❌ ResetPasswordPage: No access token found in query params');
          this.validationErrors.password = 'Invalid reset link. Please request a new password reset.';
        }
      }
    });
    
    // Also check for token in URL hash fragment (Supabase sometimes sends it there)
    this.checkHashFragment();
    
    // Also check if token might be in the URL path itself
    this.checkUrlPathForToken();
    
    // Also check the raw URL for any token-like strings
    this.checkRawUrlForToken();
    
    // Also log the current route for debugging

    
    // Check if Supabase has auto-detected the session from URL fragment
    this.checkSupabaseSession();
  }

  private async checkSupabaseSession() {
    try {

      
      const success = await this.authService.setSessionFromFragment();
      
      if (success) {

      } else {
        console.error('❌ Failed to establish Supabase session');
      }
    } catch (err) {
      console.error('❌ Error setting Supabase session:', err);
    }
  }

  private checkUrlPathForToken() {
    // Sometimes Supabase puts the token in the URL path
    const pathSegments = this.router.url.split('/');

    
    // Look for segments that might be tokens (long strings)
    for (const segment of pathSegments) {
      if (segment.length > 50 && !this.accessToken) {

        this.accessToken = segment;
        // Phase 11.2 (B2): in-memory only.
        this.authService.setResetAccessToken(segment);
        this.validationErrors.password = ''; // Clear any previous error
        break;
      }
    }
  }

  private checkRawUrlForToken() {
    // Check the raw URL for any token-like patterns
    const fullUrl = window.location.href;

    
    // Look for common token patterns in the URL
    const tokenPatterns = [
      /[?&]token=([^&]+)/,
      /[?&]access_token=([^&]+)/,
      /[?&]code=([^&]+)/,
      /[?&]reset_token=([^&]+)/,
      /#access_token=([^&]+)/,
      /#token=([^&]+)/
    ];
    
    for (const pattern of tokenPatterns) {
      const match = fullUrl.match(pattern);
      if (match && match[1] && !this.accessToken) {

        this.accessToken = decodeURIComponent(match[1]);
        // Phase 11.2 (B2): in-memory only.
        this.authService.setResetAccessToken(this.accessToken);
        this.validationErrors.password = '';
        break;
      }
    }
  }

  // Phase 11.3 (RESID-1): the legacy setTestToken debug helper was
  // removed because it persisted the recovery bearer to localStorage
  // (same threat class as B2). The recovery token must only ever live
  // in-memory inside AuthService.

  private checkHashFragment() {
    // Check if there's a hash fragment with the access token
    const hash = window.location.hash;
    if (hash) {

      
      // Parse the hash fragment for access_token
      const hashParams = new URLSearchParams(hash.substring(1)); // Remove the # and parse
      const hashToken = hashParams.get('access_token');
      
      if (hashToken) {

        this.accessToken = hashToken;

        // Phase 11.2 (B2): in-memory only.
        this.authService.setResetAccessToken(hashToken);

        // Also extract refresh token if present
        const refreshToken = hashParams.get('refresh_token');
        if (refreshToken) {
          this.refreshToken = refreshToken;

        }
        
        this.validationErrors.password = ''; // Clear any previous error
        return; // Exit early if we found the access token
      }
      
      // Also check for other possible token parameter names in hash
      const possibleTokens = ['code', 'token', 'reset_token', 'auth_token'];
      for (const param of possibleTokens) {
        const token = hashParams.get(param);
        if (token) {

        this.accessToken = token;
        // Phase 11.2 (B2): in-memory only.
        this.authService.setResetAccessToken(token);
        this.validationErrors.password = ''; // Clear any previous error
        return;
        }
      }
    } else {

    }
  }

  validatePassword() {
    if (!this.resetData.password) {
      this.validationErrors.password = 'Password is required';
    } else if (!validatePassword(this.resetData.password)) {
      const errors = getPasswordErrors(this.resetData.password);
      this.validationErrors.password = errors.join(', ');
    } else {
      this.validationErrors.password = '';
    }
  }

  validateConfirmPassword() {
    if (!this.resetData.confirmPassword) {
      this.validationErrors.confirmPassword = 'Please confirm your password';
    } else if (this.resetData.password !== this.resetData.confirmPassword) {
      this.validationErrors.confirmPassword = 'Passwords do not match';
    } else {
      this.validationErrors.confirmPassword = '';
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async onSubmit() {

    this.validatePassword();
    this.validateConfirmPassword();

    if (!this.canSubmit || this.isLoading) {

      return;
    }


    this.isLoading = true;

    // Enable Supabase auth for password reset
    this.authService.enableSupabaseAuth();

    try {
      // Call AuthService.updatePasswordWithTokens with the new password
      const success = await this.authService.updatePasswordWithTokens(this.resetData.password);
      
      if (success) {
        // Phase 11.2 (B2): clear in-memory recovery token on success.
        this.authService.clearResetAccessToken();

        // Show success message
        await this.toastService.showToast('Password reset successful! You can now log in with your new password.', 'success');
        
        // Redirect to login page
        this.router.navigate(['/auth/login']);
      } else {
        throw new Error('Password update failed');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      
      // Phase 11.2 (B2): clear in-memory recovery token on error.
      this.authService.clearResetAccessToken();

      // Show error message
      const errorMessage = (error as any)?.message || 'Failed to reset password. Please try again.';
      await this.toastService.showToast(errorMessage, 'error');
      
      // Set validation error for user feedback
      this.validationErrors.password = errorMessage;
    } finally {
      // Stop loading regardless of success or failure
      this.isLoading = false;

    }
  }

  navigateToWelcome() {
    this.router.navigate(['/welcome']);
  }

  /**
   * Phase 11.2 (B2): always clear the in-memory recovery token when the
   * reset-password page is destroyed (navigation away, tab close, etc.).
   */
  ngOnDestroy(): void {
    this.authService.clearResetAccessToken();
  }
}