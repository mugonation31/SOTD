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
  ellipseOutline, footballOutline } from 'ionicons/icons';
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
  private returnUrl: string = '/welcome';
  private isRoleForced = false; // Track if role selection was forced from welcome page

  passwordCriteria: PasswordCriteria = {
    length: false,
    uppercase: false,
    number: false,
    special: false,
  };

  get canSubmit(): boolean {
    return Boolean(
      this.signupData.username &&
      this.signupData.firstName &&
        this.signupData.lastName &&
        this.signupData.email &&
        this.signupData.password &&
        this.signupData.confirmPassword &&
        !this.validationErrors.username &&
        !this.validationErrors.firstName &&
        !this.validationErrors.lastName &&
        !this.validationErrors.email &&
        !this.validationErrors.password &&
        !this.validationErrors.confirmPassword &&
        this.isPasswordValid()
    );
  }

  get isGroupAdminSignup(): boolean {
    return this.signupData.role === 'group-admin';
  }

  get isPlayerSignup(): boolean {
    return this.signupData.role === 'player';
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({footballOutline,logoGoogle,logoFacebook,logoInstagram,logoX,eye,eyeOff,checkmarkCircle,ellipseOutline,});
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const requiredRole = params['role'] as UserRole;
      const returnUrl = params['returnUrl'] || '/welcome';
      const forceRole = params['forceRole'] === 'true';
      
      this.returnUrl = returnUrl;
      this.isRoleForced = forceRole;
      
      // Set the role based on the query parameter
      if (requiredRole) {
        this.signupData.role = requiredRole;
      }
      
      // If forceRole is true, always logout current user and force new signup
      // This ensures clean session separation between different user roles
      if (forceRole && this.authService.isAuthenticated()) {
        console.log('🔄 Force role signup detected - logging out current user silently');
        this.authService.logoutSilent();
        // Continue with signup flow after silent logout
      }
      
      // Check if user is already authenticated with the correct role
      if (this.authService.isAuthenticated() && !forceRole) {
        const currentRole = this.authService.getUserRole();
        
        if (currentRole === requiredRole || 
            (requiredRole === 'group-admin' && currentRole === 'super-admin')) {
          // User has the required role, redirect to destination
          this.router.navigate([returnUrl], { replaceUrl: true });
          return;
        }
      }
      
      // Continue with signup flow
      console.log('📝 Signup flow for role:', requiredRole);
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

  onSignup() {
    this.validateRequired('username', this.signupData.username);
    this.validateRequired('firstName', this.signupData.firstName);
    this.validateRequired('lastName', this.signupData.lastName);
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();

    if (!this.canSubmit) return;

    const { confirmPassword, ...signupPayload } = this.signupData;
    this.authService.signup(signupPayload).subscribe({
      next: () => {
        // After successful signup, redirect to login with role and return URL
        this.router.navigate(['/auth/login'], {
          queryParams: {
            returnUrl: this.returnUrl,
            role: this.signupData.role
          }
        });
      },
      error: (error) => {
        // TODO: Add proper error handling with Toast service
        console.error('Signup error:', error);
      },
    });
  }

  navigateToWelcome() {
    this.router.navigate(['/welcome']);
  }
}
