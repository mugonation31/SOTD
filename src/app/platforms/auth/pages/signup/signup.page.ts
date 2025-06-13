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
  IonSelect,
  IonSelectOption,
  IonNote,
} from '@ionic/angular/standalone';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  logoGoogle,
  logoFacebook,
  logoInstagram,
  logoX,
  eye,
  eyeOff,
  checkmarkCircle,
  ellipseOutline,
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
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface PasswordCriteria {
  length: boolean;
  uppercase: boolean;
  number: boolean;
  special: boolean;
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
export class SignupPage implements OnInit {
  signupData = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'player' as UserRole,
  };

  validationErrors: ValidationErrors = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  showPassword = false;
  showConfirmPassword = false;
  private returnUrl: string = '/';
  private loginReturnUrl: string = '/';

  passwordCriteria: PasswordCriteria = {
    length: false,
    uppercase: false,
    number: false,
    special: false,
  };

  get canSubmit(): boolean {
    return Boolean(
      this.signupData.firstName &&
        this.signupData.lastName &&
        this.signupData.email &&
        this.signupData.password &&
        this.signupData.confirmPassword &&
        !this.validationErrors.firstName &&
        !this.validationErrors.lastName &&
        !this.validationErrors.email &&
        !this.validationErrors.password &&
        !this.validationErrors.confirmPassword &&
        this.isPasswordValid()
    );
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({
      logoGoogle,
      logoFacebook,
      logoInstagram,
      logoX,
      eye,
      eyeOff,
      checkmarkCircle,
      ellipseOutline,
    });
  }

  ngOnInit() {
    const role = localStorage.getItem('selectedRole');
    if (!role) { 
      // if no role is set, redirect to welcome page
      this.router.navigate(['/welcome']);
    };

    // get return url from query params
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
      this.loginReturnUrl = params['loginReturnUrl'];
      this.signupData.role = params['role'] || 'player';
    });
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
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!this.signupData.email) {
      this.validationErrors.email = 'Email is required';
    } else if (!emailPattern.test(this.signupData.email)) {
      this.validationErrors.email = 'Please enter a valid email address';
    } else {
      this.validationErrors.email = '';
    }
  }

  validatePassword() {
    const password = this.signupData.password;

    // Update criteria checks
    this.passwordCriteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    if (!password) {
      this.validationErrors.password = 'Password is required';
    } else if (!this.isPasswordValid()) {
      this.validationErrors.password =
        'Password does not meet all requirements';
    } else {
      this.validationErrors.password = '';
    }

    this.validateConfirmPassword();
  }

  isPasswordValid(): boolean {
    return Object.values(this.passwordCriteria).every((criterion) => criterion);
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  navigateToWelcome() {
    this.router.navigate(['/welcome']);
  }

  onSignup() {
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();

    if (!this.canSubmit) return;

    this.authService.signup(this.signupData).subscribe({
      next: () => {
        this.router.navigate([this.returnUrl], { replaceUrl: true });
      },
      error: (error) => {
        console.error('Signup error:', error);
      },
    });
  }
}
