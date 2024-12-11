import { Component } from '@angular/core';
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
  IonSelect,
  IonSelectOption,
  IonNote,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  logoGoogle,
  logoFacebook,
  logoInstagram,
  logoXbox,
} from 'ionicons/icons';
import { AuthService, UserRole } from '../../../../core/services/auth.service';
import {
  validateEmail,
  validatePassword,
  getPasswordErrors,
} from '../../../../core/utils/validation.utils';

interface ValidationErrors {
  username: string;
  firstName: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
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
    IonSelect,
    IonSelectOption,
    IonNote,
    RouterLink,
    FormsModule,
    NgIf,
  ],
})
export class SignupPage {
  signupData = {
    username: '',
    firstName: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'player' as UserRole,
  };

  validationErrors: ValidationErrors = {
    username: '',
    firstName: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  get canSubmit(): boolean {
    return Boolean(
      this.signupData.firstName &&
        this.signupData.surname &&
        this.signupData.email &&
        this.signupData.password &&
        this.signupData.confirmPassword &&
        this.signupData.role &&
        !this.validationErrors.firstName &&
        !this.validationErrors.surname &&
        !this.validationErrors.email &&
        !this.validationErrors.password &&
        !this.validationErrors.confirmPassword
    );
  }

  validateRequired(field: keyof ValidationErrors, value: string) {
    if (!value) {
      this.validationErrors[field] = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } is required`;
    } else {
      this.validationErrors[field] = '';
    }
  }

  validateEmail() {
    if (!this.signupData.email) {
      this.validationErrors.email = 'Email is required';
    } else if (!validateEmail(this.signupData.email)) {
      this.validationErrors.email = 'Please enter a valid email address';
    } else {
      this.validationErrors.email = '';
    }
  }

  validatePassword() {
    if (!this.signupData.password) {
      this.validationErrors.password = 'Password is required';
    } else {
      const errors = getPasswordErrors(this.signupData.password);
      this.validationErrors.password = errors.length ? errors.join(', ') : '';
    }
    this.validateConfirmPassword();
  }

  validateConfirmPassword() {
    if (!this.signupData.confirmPassword) {
      this.validationErrors.confirmPassword = 'Please confirm your password';
    } else if (this.signupData.password !== this.signupData.confirmPassword) {
      this.validationErrors.confirmPassword = 'Passwords do not match';
    } else {
      this.validationErrors.confirmPassword = '';
    }
  }

  constructor(private authService: AuthService, private router: Router) {
    addIcons({
      logoGoogle,
      logoFacebook,
      logoInstagram,
      logoXbox,
    });
  }

  onSignup() {
    this.validateRequired('firstName', this.signupData.firstName);
    this.validateRequired('surname', this.signupData.surname);
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();

    if (!this.canSubmit) return;

    const { confirmPassword, ...signupPayload } = this.signupData;
    this.authService.signup(signupPayload).subscribe((response) => {
      localStorage.setItem('userRole', response.role);
      localStorage.setItem('token', response.token);

      switch (response.role) {
        case 'player':
          this.router.navigate(['/player/dashboard']);
          break;
        case 'group-admin':
          this.router.navigate(['/group-admin/dashboard']);
          break;
        case 'super-admin':
          this.router.navigate(['/super-admin/dashboard']);
          break;
        default:
          this.router.navigate(['/auth/login']);
      }
    });
  }
}
