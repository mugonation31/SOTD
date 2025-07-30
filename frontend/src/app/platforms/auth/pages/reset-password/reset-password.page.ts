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
export class ResetPasswordPage implements OnInit {
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
    console.log('🏗️ ResetPasswordPage: Component constructed');
    addIcons({ footballOutline, eye, eyeOff });
  }

  ngOnInit() {
    console.log('🔄 ResetPasswordPage: ngOnInit called');
    
    // Clear any old test tokens
    localStorage.removeItem('test_reset_token');
    
    // Log the full URL for debugging
    console.log('🌐 ResetPasswordPage: Full URL:', window.location.href);
    console.log('🔗 ResetPasswordPage: Current location:', window.location.toString());
    
    // Extract access token from URL query parameters
    this.route.queryParams.subscribe(params => {
      console.log('📋 ResetPasswordPage: Received query parameters:', params);

      if (!this.accessToken) {
        this.accessToken = params['code'] ||
                          params['access_token'] ||
                          params['token'] ||
                          params['reset_token'] || 
                          '';

        if (this.accessToken) {
          console.log('✅ ResetPasswordPage: Access token set from query params');
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
    console.log('📍 ResetPasswordPage: Current route:', this.router.url);
    
    // Check if Supabase has auto-detected the session from URL fragment
    this.checkSupabaseSession();
  }

  private async checkSupabaseSession() {
    try {
      console.log('🔍 ResetPasswordPage: Checking for auto-detected Supabase session...');
      // We'll check the session in the auth service instead
      console.log('✅ Session check will be handled by auth service');
    } catch (err) {
      console.error('❌ Error checking Supabase session:', err);
    }
  }

  private checkUrlPathForToken() {
    // Sometimes Supabase puts the token in the URL path
    const pathSegments = this.router.url.split('/');
    console.log('🔍 ResetPasswordPage: URL path segments:', pathSegments);
    
    // Look for segments that might be tokens (long strings)
    for (const segment of pathSegments) {
      if (segment.length > 50 && !this.accessToken) {
        console.log('🔍 ResetPasswordPage: Found potential token in URL path:', segment.substring(0, 20) + '...');
        this.accessToken = segment;
        this.validationErrors.password = ''; // Clear any previous error
        break;
      }
    }
  }

  private checkRawUrlForToken() {
    // Check the raw URL for any token-like patterns
    const fullUrl = window.location.href;
    console.log('🔍 ResetPasswordPage: Checking raw URL for tokens:', fullUrl);
    
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
        console.log('🔍 ResetPasswordPage: Found token in raw URL with pattern:', pattern);
        this.accessToken = decodeURIComponent(match[1]);
        this.validationErrors.password = '';
        break;
      }
    }
  }

  // TEMPORARY: For testing purposes
  // Remove this method in production
  setTestToken(token: string) {
    localStorage.setItem('test_reset_token', token);
    this.accessToken = token;
    this.validationErrors.password = '';
    console.log('🧪 ResetPasswordPage: Test token set:', token.substring(0, 20) + '...');
  }

  private checkHashFragment() {
    // Check if there's a hash fragment with the access token
    const hash = window.location.hash;
    if (hash) {
      console.log('🔍 ResetPasswordPage: Found hash fragment:', hash);
      
      // Parse the hash fragment for access_token
      const hashParams = new URLSearchParams(hash.substring(1)); // Remove the # and parse
      const hashToken = hashParams.get('access_token');
      
      if (hashToken) {
        console.log('✅ ResetPasswordPage: Found access token in hash fragment');
        this.accessToken = hashToken;
        
        // Also extract refresh token if present
        const refreshToken = hashParams.get('refresh_token');
        if (refreshToken) {
          this.refreshToken = refreshToken;
          console.log('✅ ResetPasswordPage: Found refresh token in hash fragment');
        }
        
        this.validationErrors.password = ''; // Clear any previous error
        return; // Exit early if we found the access token
      }
      
      // Also check for other possible token parameter names in hash
      const possibleTokens = ['code', 'token', 'reset_token', 'auth_token'];
      for (const param of possibleTokens) {
        const token = hashParams.get(param);
        if (token) {
          console.log(`✅ ResetPasswordPage: Found ${param} in hash fragment`);
          this.accessToken = token;
          this.validationErrors.password = ''; // Clear any previous error
          return;
        }
      }
    } else {
      console.log('🔍 ResetPasswordPage: No hash fragment found');
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
    console.log('🚀 ResetPasswordPage: Submit button clicked');
    this.validatePassword();
    this.validateConfirmPassword();

    if (!this.canSubmit || this.isLoading) {
      console.log('❌ ResetPasswordPage: Cannot submit - canSubmit:', this.canSubmit, 'isLoading:', this.isLoading);
      return;
    }

    console.log('✅ ResetPasswordPage: Validation passed, starting reset process');
    this.isLoading = true;

    // Enable Supabase auth for password reset
    this.authService.enableSupabaseAuth();

    try {
      // Call AuthService.updatePasswordWithTokens with the new password and access token
      // Add timeout to prevent hanging
      const updatePromise = this.authService.updatePasswordWithTokens(this.resetData.password);
      const timeoutPromise = new Promise<boolean>((_, reject) => 
        setTimeout(() => reject(new Error('Password reset timeout')), 12000)
      );
      
      const success = await Promise.race([updatePromise, timeoutPromise]);
      
      if (success) {
        // Show success message
        await this.toastService.showToast('Password reset successful! You can now log in with your new password.', 'success');
        
        // Redirect to login page
        this.router.navigate(['/auth/login']);
      } else {
        throw new Error('Password update failed');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      
      // Handle specific lock error
      if (error instanceof Error && error.message.includes('NavigatorLockAcquireTimeoutError')) {
        console.log('🔧 ResetPasswordPage: Detected lock error, attempting to clear locks...');
        
        try {
          // Clear auth locks
          await this.authService.clearAuthLocks();
          
          // Wait a moment and retry
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          console.log('🔄 ResetPasswordPage: Retrying password update after lock clearance...');
          const retrySuccess = await this.authService.updatePasswordWithTokens(this.resetData.password);
          
          if (retrySuccess) {
            await this.toastService.showToast('Password reset successful! You can now log in with your new password.', 'success');
            this.router.navigate(['/auth/login']);
            return;
          }
        } catch (retryError) {
          console.error('ResetPasswordPage: Lock recovery failed:', retryError);
          await this.toastService.showToast('Authentication error. Please try again in a few moments.', 'error');
          this.validationErrors.password = 'Authentication error. Please try again in a few moments.';
          return;
        }
      }
      
      // Show error message
      const errorMessage = (error as any)?.message || 'Failed to reset password. Please try again.';
      await this.toastService.showToast(errorMessage, 'error');
      
      // Set validation error for user feedback
      this.validationErrors.password = errorMessage;
    } finally {
      // Stop loading regardless of success or failure
      this.isLoading = false;
      console.log('🏁 ResetPasswordPage: Reset operation completed, loading state cleared');
    }
  }

  navigateToWelcome() {
    this.router.navigate(['/welcome']);
  }
}