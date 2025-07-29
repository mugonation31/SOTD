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
    
    // Extract access token from URL query parameters
    this.route.queryParams.subscribe(params => {
      console.log('📋 ResetPasswordPage: Received query parameters:', params);
      
      // Check for multiple possible parameter names that Supabase might send
      this.accessToken = params['code'] || 
                        params['access_token'] || 
                        params['token'] || 
                        params['reset_token'] || 
                        '';
      
      if (!this.accessToken) {
        console.error('❌ ResetPasswordPage: No access token found in URL');
        console.log('🔍 Available query parameters:', params);
        this.validationErrors.password = 'Invalid reset link. Please request a new password reset.';
      } else {
        console.log('✅ ResetPasswordPage: Access token found:', this.accessToken.substring(0, 10) + '...');
      }
      
      console.log('🔍 Reset password page initialized with access token:', this.accessToken ? 'present' : 'missing');
    });
    
    // Also check for token in URL hash fragment (Supabase sometimes sends it there)
    this.checkHashFragment();
    
    // Also log the current route for debugging
    console.log('📍 ResetPasswordPage: Current route:', this.router.url);
  }

  private checkHashFragment() {
    // Check if there's a hash fragment with the access token
    const hash = window.location.hash;
    if (hash) {
      console.log('🔍 ResetPasswordPage: Found hash fragment:', hash);
      
      // Parse the hash fragment for access_token
      const hashParams = new URLSearchParams(hash.substring(1)); // Remove the # and parse
      const hashToken = hashParams.get('access_token');
      
      if (hashToken && !this.accessToken) {
        console.log('✅ ResetPasswordPage: Found access token in hash fragment');
        this.accessToken = hashToken;
        this.validationErrors.password = ''; // Clear any previous error
      }
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

    if (!this.canSubmit || this.isLoading) return;

    this.isLoading = true;

    try {
      // Call AuthService.updatePassword with the access token and new password
      const success = await this.authService.updatePassword(this.accessToken, this.resetData.password);
      
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
          const retrySuccess = await this.authService.updatePassword(this.accessToken, this.resetData.password);
          
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
    }
  }

  navigateToWelcome() {
    this.router.navigate(['/welcome']);
  }
}