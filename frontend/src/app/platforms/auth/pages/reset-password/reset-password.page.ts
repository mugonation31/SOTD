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
import { validatePassword } from '../../../../core/utils/validation.utils';

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
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({ footballOutline, eye, eyeOff });
  }

  ngOnInit() {
    // Extract access token from URL query parameters
    this.route.queryParams.subscribe(params => {
      this.accessToken = params['access_token'] || '';
      
      if (!this.accessToken) {
        console.error('No access token found in URL');
        this.validationErrors.password = 'Invalid reset link. Please request a new password reset.';
      }
      
      console.log('🔍 Reset password page initialized with access token:', this.accessToken ? 'present' : 'missing');
    });
  }

  validatePassword() {
    if (!this.resetData.password) {
      this.validationErrors.password = 'Password is required';
    } else if (!validatePassword(this.resetData.password)) {
      this.validationErrors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
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
      // TODO: Call AuthService.updatePassword(token, newPassword) when method is available
      // const result = await this.authService.updatePassword(this.accessToken, this.resetData.password);
      
      // For now, simulate the password update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Password reset successful! You can now log in with your new password.');
      this.router.navigate(['/auth/login']);
    } catch (error) {
      this.isLoading = false;
      console.error('Password reset error:', error);
      
      const errorMessage = (error as any)?.message || 'Failed to reset password. Please try again.';
      this.validationErrors.password = errorMessage;
    }
  }

  navigateToWelcome() {
    this.router.navigate(['/welcome']);
  }
}