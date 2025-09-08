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
  IonCheckbox,
} from '@ionic/angular/standalone';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  eye,
  eyeOff,
  checkmarkCircle,
  ellipseOutline,
  footballOutline,
  peopleOutline,
  personAddOutline
} from 'ionicons/icons';
import { AuthService, UserRole } from '../../../../core/services/auth.service';
import {
  validateEmail,
  validatePassword,
  getPasswordErrors,
} from '../../../../core/utils/validation.utils';
import { extractErrorMessage } from '../../../../core/utils/error.utils';

interface ValidationErrors {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: string;
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
    IonCheckbox,
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
    acceptedTerms: false,
  };

  validationErrors: ValidationErrors = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: '',
  };

  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  private returnUrl: string = '/welcome';
  isRoleForced = false; // Track if role selection was forced from welcome page

  passwordCriteria: PasswordCriteria = {
    length: false,
    uppercase: false,
    number: false,
    special: false,
  };

  get canSubmit(): boolean {
    const hasAllFields = Boolean(
      this.signupData.username &&
      this.signupData.firstName &&
      this.signupData.lastName &&
      this.signupData.email &&
      this.signupData.password &&
      this.signupData.confirmPassword &&
      this.signupData.acceptedTerms
    );
    
    const hasNoErrors = Boolean(
      !this.validationErrors.username &&
      !this.validationErrors.firstName &&
      !this.validationErrors.lastName &&
      !this.validationErrors.email &&
      !this.validationErrors.password &&
      !this.validationErrors.confirmPassword &&
      !this.validationErrors.acceptedTerms
    );
    
    const isPasswordValid = this.isPasswordValid();
    
    const canSubmit = hasAllFields && hasNoErrors && isPasswordValid;
    
    // Debug logging
    console.log('🔍 Signup Form Debug:', {
      hasAllFields,
      hasNoErrors,
      isPasswordValid,
      canSubmit,
      signupData: this.signupData,
      validationErrors: this.validationErrors
    });
    
    return canSubmit;
  }



  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({footballOutline,eye,eyeOff,checkmarkCircle,ellipseOutline,peopleOutline,personAddOutline});
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
    
    // Trigger initial validation to clear any default errors
    this.validateAllFields();
  }
  
  validateAllFields() {
    console.log('🔍 validateAllFields called');
    this.validateRequired('username', this.signupData.username);
    this.validateRequired('firstName', this.signupData.firstName);
    this.validateRequired('lastName', this.signupData.lastName);
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();
    this.validateAcceptedTerms();
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
    console.log('🚀 SignupPage: Starting signup process...');
    console.log('📝 SignupPage: Form data:', this.signupData);
    
    this.validateRequired('username', this.signupData.username);
    this.validateRequired('firstName', this.signupData.firstName);
    this.validateRequired('lastName', this.signupData.lastName);
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();
    this.validateAcceptedTerms();

    if (!this.canSubmit || this.isLoading) {
      console.log('❌ SignupPage: Cannot submit - canSubmit:', this.canSubmit, 'isLoading:', this.isLoading);
      return;
    }

    console.log('✅ SignupPage: Validation passed, starting signup...');
    this.isLoading = true;

    const { confirmPassword, acceptedTerms, ...signupPayload } = this.signupData;
    console.log('📤 SignupPage: Calling authService.signup with payload:', signupPayload);
    
    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (this.isLoading) {
        console.error('⏰ SignupPage: Signup timeout - taking too long');
        this.isLoading = false;
        alert('Signup is taking longer than expected. Please try again.');
      }
    }, 30000); // 30 second timeout
    
    this.authService.signup(signupPayload).subscribe({
      next: (response) => {
        console.log('✅ SignupPage: Signup successful:', response);
        clearTimeout(timeoutId); // Clear the timeout
        this.isLoading = false;
        
        // Add a small delay to ensure the loading state is visible
        setTimeout(() => {
          // After successful signup, redirect to login with role, return URL, and email confirmation info
          this.router.navigate(['/auth/login'], {
            queryParams: {
              returnUrl: this.returnUrl,
              role: this.signupData.role,
              email: this.signupData.email,
              pendingConfirmation: 'true'
            }
          });
        }, 500);
      },
      error: (error) => {
        console.error('❌ SignupPage: Signup error:', error);
        clearTimeout(timeoutId); // Clear the timeout
        this.isLoading = false;
        
        // Use the new error handling utility to extract meaningful error messages
        const errorMessage = extractErrorMessage(error);
        console.log('📝 SignupPage: Extracted error message:', errorMessage);
        alert(errorMessage);
      },
    });
  }

  validateAcceptedTerms() {
    console.log('🔍 validateAcceptedTerms called, acceptedTerms:', this.signupData.acceptedTerms);
    if (!this.signupData.acceptedTerms) {
      this.validationErrors.acceptedTerms = 'You must accept the Terms and Conditions to continue';
      console.log('❌ Terms not accepted, setting error');
    } else {
      this.validationErrors.acceptedTerms = '';
      console.log('✅ Terms accepted, clearing error');
    }
    console.log('🔍 validationErrors.acceptedTerms:', this.validationErrors.acceptedTerms);
  }

  openTerms(event: Event) {
    event.preventDefault();
    // TODO: Open Terms and Conditions modal or page
    console.log('Opening Terms and Conditions...');
  }

  openPrivacy(event: Event) {
    event.preventDefault();
    // TODO: Open Privacy Policy modal or page
    console.log('Opening Privacy Policy...');
  }

  navigateToWelcome() {
    this.router.navigate(['/welcome']);
  }

  // Debug method to enable Supabase for testing
  enableSupabaseForTesting() {
    console.log('🔧 SignupPage: Enabling Supabase for testing...');
    this.authService.enableSupabaseAuth();
    this.authService.debugAuthState();
    alert('Supabase enabled for testing. Please try signing up again.');
  }
}
