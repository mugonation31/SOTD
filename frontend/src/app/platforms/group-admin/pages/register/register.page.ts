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
  template: `
    <ion-content class="ion-padding">
      <div class="flex-center">
        <ion-card class="auth-card">
          <ion-card-header>
            <ion-card-title>Group Admin Registration</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
              <!-- Personal Information -->
              <div class="form-section">
                <h3>Personal Information</h3>
                <ion-item>
                  <ion-input
                    type="text"
                    formControlName="username"
                    placeholder="Username (optional)"
                    [clearInput]="true"
                  ></ion-input>
                </ion-item>

                <ion-item>
                  <ion-input
                    type="text"
                    formControlName="firstName"
                    placeholder="First Name"
                    [clearInput]="true"
                  ></ion-input>
                </ion-item>

                <ion-item>
                  <ion-input
                    type="text"
                    formControlName="lastName"
                    placeholder="Surname"
                    [clearInput]="true"
                  ></ion-input>
                </ion-item>

                <ion-item>
                  <ion-input
                    type="email"
                    formControlName="email"
                    placeholder="Email Address"
                    [readonly]="true"
                  ></ion-input>
                </ion-item>

                <ion-item>
                  <ion-input
                    type="tel"
                    formControlName="phone"
                    placeholder="Phone Number"
                    [clearInput]="true"
                  ></ion-input>
                </ion-item>
              </div>

              <!-- Security Information -->
              <div class="form-section">
                <h3>Security Information</h3>
                <ion-item>
                  <ion-input
                    type="password"
                    formControlName="password"
                    placeholder="Password"
                  ></ion-input>
                </ion-item>

                <!-- Password requirements feedback -->
                <div class="password-requirements" *ngIf="password?.touched">
                  <p
                    class="requirement"
                    [class.met]="!passwordErrors?.minLength"
                  >
                    <ion-icon
                      [name]="
                        !passwordErrors?.minLength
                          ? 'checkmark-circle'
                          : 'close-circle'
                      "
                    ></ion-icon>
                    At least 8 characters
                  </p>
                  <p
                    class="requirement"
                    [class.met]="!passwordErrors?.uppercase"
                  >
                    <ion-icon
                      [name]="
                        !passwordErrors?.uppercase
                          ? 'checkmark-circle'
                          : 'close-circle'
                      "
                    ></ion-icon>
                    One uppercase letter
                  </p>
                  <p
                    class="requirement"
                    [class.met]="!passwordErrors?.lowercase"
                  >
                    <ion-icon
                      [name]="
                        !passwordErrors?.lowercase
                          ? 'checkmark-circle'
                          : 'close-circle'
                      "
                    ></ion-icon>
                    One lowercase letter
                  </p>
                  <p class="requirement" [class.met]="!passwordErrors?.number">
                    <ion-icon
                      [name]="
                        !passwordErrors?.number
                          ? 'checkmark-circle'
                          : 'close-circle'
                      "
                    ></ion-icon>
                    One number
                  </p>
                  <p
                    class="requirement"
                    [class.met]="!passwordErrors?.specialChar"
                  >
                    <ion-icon
                      [name]="
                        !passwordErrors?.specialChar
                          ? 'checkmark-circle'
                          : 'close-circle'
                      "
                    ></ion-icon>
                    One special character
                  </p>
                </div>

                <ion-item>
                  <ion-input
                    type="password"
                    formControlName="confirmPassword"
                    placeholder="Confirm Password"
                  ></ion-input>
                </ion-item>

                <ion-item>
                  <ion-select
                    formControlName="securityQuestion1"
                    placeholder="Select Security Question 1"
                  >
                    <ion-select-option value="birthCity">
                      What city were you born in?
                    </ion-select-option>
                    <ion-select-option value="firstPet">
                      What was your first pet's name?
                    </ion-select-option>
                    <ion-select-option value="motherMaiden">
                      What is your mother's maiden name?
                    </ion-select-option>
                  </ion-select>
                </ion-item>

                <ion-item>
                  <ion-input
                    type="text"
                    formControlName="securityAnswer1"
                    placeholder="Answer to Security Question 1"
                    [clearInput]="true"
                  ></ion-input>
                </ion-item>

                <ion-item>
                  <ion-select
                    formControlName="securityQuestion2"
                    placeholder="Select Security Question 2"
                  >
                    <ion-select-option value="schoolName">
                      What was the name of your first school?
                    </ion-select-option>
                    <ion-select-option value="favoriteTeam">
                      What's your favorite football team?
                    </ion-select-option>
                    <ion-select-option value="childhoodHero">
                      Who was your childhood hero?
                    </ion-select-option>
                  </ion-select>
                </ion-item>

                <ion-item>
                  <ion-input
                    type="text"
                    formControlName="securityAnswer2"
                    placeholder="Answer to Security Question 2"
                    [clearInput]="true"
                  ></ion-input>
                </ion-item>
              </div>

              <!-- Player Preferences -->
              <div class="form-section">
                <h3>Player Preferences</h3>
                <ion-item>
                  <ion-input
                    type="text"
                    formControlName="favoriteTeam"
                    placeholder="Favorite Team"
                    [clearInput]="true"
                  ></ion-input>
                </ion-item>
              </div>

              <div class="ion-margin-top">
                <ion-button
                  expand="block"
                  type="submit"
                  [disabled]="!registrationForm.valid || isLoading"
                >
                  <ion-spinner *ngIf="isLoading"></ion-spinner>
                  <span *ngIf="!isLoading">Complete Registration</span>
                </ion-button>
              </div>
            </form>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100%;
      }
      .auth-card {
        max-width: 600px;
        width: 100%;
        margin: 20px;
      }
      .form-section {
        margin: 20px 0;
        padding-top: 10px;
        border-top: 1px solid var(--ion-color-light);
      }
      .form-section h3 {
        color: var(--ion-color-medium);
        font-size: 1.1em;
        margin-bottom: 15px;
      }
      ion-item {
        margin-bottom: 10px;
        --background: transparent;
      }
      .password-requirements {
        padding: 10px 16px;
        font-size: 0.9em;
      }
      .requirement {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--ion-color-danger);
        margin: 4px 0;
      }
      .requirement.met {
        color: var(--ion-color-success);
      }
      .requirement ion-icon {
        font-size: 1.1em;
      }
    `,
  ],
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
