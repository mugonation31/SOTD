import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonSpinner,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { ToastService } from '@core/services/toast.service';
import { TokenService } from '@core/services/token.service';
import { addIcons } from 'ionicons';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';

interface PasswordErrors {
  minLength?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  number?: boolean;
  specialChar?: boolean;
}

@Component({
  selector: 'app-group-admin-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonSpinner,
    IonSelect,
    IonSelectOption,
    IonIcon,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
})
export class GroupAdminRegisterPage implements OnInit {
  registrationForm: FormGroup;
  isLoading = false;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private tokenService: TokenService
  ) {
    addIcons({
      checkmarkCircle,
      closeCircle,
    });

    this.registrationForm = this.fb.group(
      {
        // Personal Information
        username: [''],
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9+\\s-]+$')]],

        // Security Information
        password: ['', [Validators.required, this.passwordValidator()]],
        confirmPassword: ['', [Validators.required]],
        securityQuestion1: ['', Validators.required],
        securityAnswer1: ['', Validators.required],
        securityQuestion2: ['', Validators.required],
        securityAnswer2: ['', Validators.required],

        // Player Preferences
        favoriteTeam: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  ngOnInit() {
    // Get token from URL
    this.token = this.route.snapshot.queryParamMap.get('token');
    console.log('Token from URL:', this.token);

    // For frontend development, use mock data if no token
    if (!this.token) {
      console.log('Using mock data for development');
      this.registrationForm.patchValue({
        email: 'test@example.com',
      });
      return;
    }

    // If there is a token, try to validate it
    const isValid = this.tokenService.validateToken(this.token);
    console.log('Token validation result:', isValid);

    if (!isValid) {
      console.log('Token validation failed, using mock data');
      this.registrationForm.patchValue({
        email: 'test@example.com',
      });
      return;
    }

    // Pre-fill email from token if available
    const email = this.getEmailFromToken(this.token);
    console.log('Email from token:', email);
    if (email) {
      this.registrationForm.patchValue({ email });
    }
  }

  private passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  private getEmailFromToken(token: string): string {
    // This is a placeholder - actual implementation will depend on token structure
    return '';
  }

  async onSubmit() {
    if (this.registrationForm.valid) {
      this.isLoading = true;
      try {
        // Mock successful registration
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        await this.toastService.showToast(
          'Registration successful! Please log in.',
          'success'
        );
        this.router.navigate(['/auth/login']);
      } catch (error) {
        await this.toastService.showToast(
          'Error during registration. Please try again.',
          'error'
        );
      } finally {
        this.isLoading = false;
      }
    }
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get passwordErrors(): PasswordErrors | null {
    if (!this.password) return null;

    const value = this.password.value;
    if (!value) return null;

    return {
      minLength: value.length < 8,
      uppercase: !/[A-Z]/.test(value),
      lowercase: !/[a-z]/.test(value),
      number: !/[0-9]/.test(value),
      specialChar: !/[!@#$%^&*(),.?":{}|<>]/.test(value),
    };
  }

  private passwordValidator(): any {
    return (control: any): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) return null;

      const errors: PasswordErrors = {};
      let hasError = false;

      if (value.length < 8) {
        errors.minLength = true;
        hasError = true;
      }
      if (!/[A-Z]/.test(value)) {
        errors.uppercase = true;
        hasError = true;
      }
      if (!/[a-z]/.test(value)) {
        errors.lowercase = true;
        hasError = true;
      }
      if (!/[0-9]/.test(value)) {
        errors.number = true;
        hasError = true;
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        errors.specialChar = true;
        hasError = true;
      }

      return hasError ? { passwordRequirements: errors } : null;
    };
  }
}
