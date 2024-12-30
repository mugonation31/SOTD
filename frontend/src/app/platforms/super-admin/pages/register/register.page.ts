import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
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
  IonItemGroup,
  IonItemDivider,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { SuperAdminAuthService } from '@core/services/super-admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-admin-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    IonItemGroup,
    IonItemDivider,
    IonNote,
    IonSelect,
    IonSelectOption,
    IonCheckbox,
  ],
})
export class SuperAdminRegisterPage {
  registrationForm: FormGroup;
  securityQuestionsList: string[] = [
    "What was your first pet's name?",
    'In which city were you born?',
    "What was your mother's maiden name?",
    'What was the name of your first school?',
    'What is your favorite book?',
  ];
  error?: {
    title: string;
    message: string;
    retry?: boolean;
  };

  get securityQuestions() {
    return this.registrationForm.get('securityQuestions') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private superAdminAuthService: SuperAdminAuthService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required]],
        organizationName: ['', [Validators.required]],
        organizationRole: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        registrationKey: ['', [Validators.required]],
        acceptedTerms: [false, [Validators.requiredTrue]],
        timezone: [Intl.DateTimeFormat().resolvedOptions().timeZone],
        securityQuestions: this.fb.array([
          this.createSecurityQuestion(),
          this.createSecurityQuestion(),
          this.createSecurityQuestion(),
        ]),
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  private createSecurityQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // Simulate successful registration
      localStorage.setItem('superAdminRegistered', 'true');
      this.router.navigate(['/super-admin/login']);
    }
  }

  checkRegistration() {
    this.superAdminAuthService.checkRegistrationStatus().subscribe({
      next: (isAvailable: boolean) => {
        if (!isAvailable) {
          this.error = {
            title: 'Registration Unavailable',
            message: 'Super admin has already been registered.',
          };
        }
      },
      error: (error: Error) => {
        this.error = {
          title: 'Connection Error',
          message: 'Unable to connect to the server. Please try again later.',
          retry: true,
        };
      },
    });
  }

  retryConnection() {
    this.error = undefined;
    this.checkRegistration();
  }
}
