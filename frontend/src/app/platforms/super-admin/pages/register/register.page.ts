import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
  IonNote,
  IonCheckbox,
  IonSpinner,
  IonAlert,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService, SignupData } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-super-admin-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonText,
    IonNote,
    IonCheckbox,
    IonSpinner,
    IonAlert,
  ],
})
export class SuperAdminRegisterPage implements OnInit {
  registrationForm: FormGroup;
  isLoading = false;
  isCheckingExistingAdmin = true;
  superAdminExists = false;
  
  error?: {
    title: string;
    message: string;
    retry?: boolean;
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        acceptedTerms: [false, [Validators.requiredTrue]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  async ngOnInit() {
    await this.checkExistingSuperAdmin();
  }

  private async checkExistingSuperAdmin() {
    try {
      this.isCheckingExistingAdmin = true;
      
      // For development with dummy data, check localStorage
      // In production with Supabase, this would check the database
      const existingSuperAdmin = localStorage.getItem('superAdminCreated');
      this.superAdminExists = existingSuperAdmin === 'true';
      
      if (this.superAdminExists) {
        console.log('ℹ️ Super admin already exists (dummy data), redirecting to login');
        this.toastService.showToast('Super admin already exists. Please login instead.', 'warning');
        // Wait a moment then redirect
        setTimeout(() => {
          this.router.navigate(['/super-admin/login']);
        }, 2000);
      } else {
        console.log('✅ No super admin found, registration available');
      }
    } catch (error) {
      console.error('Error checking super admin existence:', error);
      this.error = {
        title: 'Connection Error',
        message: 'Unable to check registration status. Please try again.',
        retry: true,
      };
    } finally {
      this.isCheckingExistingAdmin = false;
    }
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  async onSubmit() {
    if (this.registrationForm.valid && !this.superAdminExists) {
      this.isLoading = true;
      this.error = undefined;

      try {
        const formData = this.registrationForm.value;
        
        console.log('🚀 Starting Super Admin Registration for Predict 3...');
        
        // Use AuthService signup (which defaults to mock mode for development)
        const signupData: SignupData = {
          email: formData.email,
          password: formData.password,
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: 'super-admin'
        };

        this.authService.signup(signupData).subscribe({
          next: (response) => {
            console.log('✅ Super Admin Registration successful:', response);
            
            // Mark super admin as created (for dummy data mode)
            localStorage.setItem('superAdminCreated', 'true');
            
            // Show success message
            this.toastService.showToast(
              `Welcome to Predict 3! Super Admin account created successfully.`,
              'success'
            );

            // Auto-login after registration
            console.log('🔄 Auto-logging in super admin...');
            this.autoLoginAfterRegistration(formData.email, formData.password);
          },
          error: (error) => {
            console.error('❌ Super Admin Registration failed:', error);
            
            this.error = {
              title: 'Registration Failed',
              message: this.getErrorMessage(error),
              retry: true,
            };
            this.isLoading = false;
          }
        });

      } catch (error: any) {
        console.error('❌ Super Admin Registration failed:', error);
        
        this.error = {
          title: 'Registration Failed',
          message: this.getErrorMessage(error),
          retry: true,
        };
        this.isLoading = false;
      }
    }
  }

  private async autoLoginAfterRegistration(email: string, password: string) {
    try {
      // Use the centralized AuthService for consistent login
      const loginData = {
        email,
        password,
        securityQuestion: 'N/A',
        securityAnswer: 'N/A'
      };

      // Set up the super-admin role for AuthService
      localStorage.setItem(`pendingRole_${email}`, 'super-admin');
      localStorage.setItem(`pendingUsername_${email}`, this.registrationForm.get('username')?.value);
      localStorage.setItem(`pendingFirstName_${email}`, this.registrationForm.get('firstName')?.value);
      localStorage.setItem(`pendingLastName_${email}`, this.registrationForm.get('lastName')?.value);

      // Login through AuthService
      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log('✅ Auto-login successful:', response);
          
          // Navigate to super-admin dashboard
          this.router.navigate(['/super-admin/dashboard']);
          
          this.toastService.showToast(
            'Welcome to Predict 3! You are now logged in as Super Admin.',
            'success'
          );
        },
        error: (error) => {
          console.error('❌ Auto-login failed:', error);
          
          // If auto-login fails, redirect to login page
          this.toastService.showToast(
            'Registration successful! Please login to continue.',
            'success'
          );
          this.router.navigate(['/super-admin/login']);
        }
      });

    } catch (error) {
      console.error('❌ Auto-login error:', error);
      
      // If auto-login fails, redirect to login page
      this.toastService.showToast(
        'Registration successful! Please login to continue.',
        'success'
      );
      this.router.navigate(['/super-admin/login']);
    }
  }

  private getErrorMessage(error: any): string {
    if (error?.message?.includes('already registered')) {
      return 'This email is already registered. Please use a different email or login instead.';
    }
    
    if (error?.message?.includes('invalid email')) {
      return 'Please enter a valid email address.';
    }
    
    if (error?.message?.includes('weak password')) {
      return 'Password must be at least 8 characters long and contain uppercase, lowercase, and numbers.';
    }
    
    return error?.message || 'An unexpected error occurred. Please try again.';
  }

  retryConnection() {
    this.error = undefined;
    this.checkExistingSuperAdmin();
  }

  // Field validation helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.registrationForm.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;
    if (errors['required']) return `${this.getFieldLabel(fieldName)} is required.`;
    if (errors['email']) return 'Please enter a valid email address.';
    if (errors['minlength']) return `${this.getFieldLabel(fieldName)} must be at least ${errors['minlength'].requiredLength} characters.`;
    if (errors['passwordMismatch']) return 'Passwords do not match.';
    
    return 'Invalid input.';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      firstName: 'First Name',
      lastName: 'Last Name',
      username: 'Username',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
    };
    return labels[fieldName] || fieldName;
  }

  // Development helper - reset registration state
  resetRegistrationState() {
    localStorage.removeItem('superAdminCreated');
    console.log('🔄 Registration state reset - super admin can be created again');
    this.checkExistingSuperAdmin();
  }
}
