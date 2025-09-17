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
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  eye,
  eyeOff,
  footballOutline, mailOutline } from 'ionicons/icons';
import { AuthService } from '../../../../core/services/auth.service';
import {
  validateEmail,
  validatePassword,
} from '../../../../core/utils/validation.utils';

interface ValidationErrors {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
    RouterLink,
    FormsModule,
    NgIf,
  ],
})
export class LoginPage implements OnInit {
  loginData = {
    email: '',
    password: '',
    securityQuestion: '',
    securityAnswer: '',
  };

  validationErrors: ValidationErrors = {
    email: '',
    password: '',
  };

  showPassword = false;
  isLoading = false;
  private returnUrl: string = '';
  
  // Email confirmation state
  pendingConfirmation = false;
  userEmail = '';

  get canSubmit(): boolean {
    return Boolean(
      this.loginData.email &&
        this.loginData.password &&
        !this.validationErrors.email &&
        !this.validationErrors.password
    );
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({footballOutline,mailOutline,eye,eyeOff});
  }

  ngOnInit() {
    // Get return URL and role from route parameters
    this.route.queryParams.subscribe(params => {
      
      this.returnUrl = params['returnUrl'] || '';
      const expectedRole = params['role'] || '';
      
      // Check for email confirmation parameters
      this.pendingConfirmation = params['pendingConfirmation'] === 'true';
      this.userEmail = params['email'] || '';
      
    });
  }

  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!this.loginData.email) {
      this.validationErrors.email = 'Email is required';
    } else if (!emailPattern.test(this.loginData.email)) {
      this.validationErrors.email = 'Please enter a valid email address';
    } else {
      this.validationErrors.email = '';
    }
  }

  validatePassword() {
    if (!this.loginData.password) {
      this.validationErrors.password = 'Password is required';
    } else if (!validatePassword(this.loginData.password)) {
      this.validationErrors.password = 'Please enter a valid password';
    } else {
      this.validationErrors.password = '';
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    this.validateEmail();
    this.validatePassword();

    if (!this.canSubmit || this.isLoading) {
      console.log('⚠️ Login: Already in progress or form invalid, ignoring duplicate submission');
      return;
    }

    this.isLoading = true;
    console.log('🔍 Login: Starting login process...');

    // Check if user is already authenticated with the same email
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.user.email === this.loginData.email) {
      console.log('✅ Login: User already authenticated, redirecting...');
      this.handleSuccessfulLogin();
      return;
    }

    // Only clear session if user is different or not authenticated
    this.authService.clearSession();

    // Set default security question and answer for development
    this.loginData.securityQuestion = 'What is your favorite color?';
    this.loginData.securityAnswer = 'blue';

 

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('✅ Login: Success response received:', response);
        this.handleSuccessfulLogin();
      },
      error: (error) => {
        console.error('❌ Login: Error occurred:', error);
        this.isLoading = false;
        
        // TODO: Replace with proper toast service when available
        // For now, use a simple alert for user feedback
        const errorMessage = error?.error?.message || error?.message || 'Login failed. Please check your credentials and try again.';
        alert(errorMessage);
      },
    });
  }

  private handleSuccessfulLogin() {
    this.isLoading = false;
    const userRole = this.authService.getUserRole();
    
    // Handle specific return URL from external navigation (e.g., guard redirects)
    if (this.returnUrl && this.returnUrl.trim() !== '') {
      this.router.navigate([this.returnUrl], { replaceUrl: true });
      return;
    }

    // Simple role-based redirection to dashboards
    this.redirectBasedOnRole(userRole);
  }

  private redirectBasedOnRole(role: string | null) {
    let targetRoute: string;

    // Check if this is a first login - redirect to appropriate first-time route
    const isFirstLogin = this.authService.isFirstTimeUser();

    console.log('🔍 Login: Redirecting user with role:', role, 'isFirstLogin:', isFirstLogin);

    if (isFirstLogin) {
      console.log('🆕 Login: First-time user - redirecting to onboarding flow');
      switch (role) {
        case 'group-admin':
          targetRoute = '/group-admin/groups';
          break;
        case 'player':
          targetRoute = '/player/join-group';
          break;
        case 'super-admin':
          targetRoute = '/super-admin/dashboard';
          break;
        default:
          targetRoute = '/welcome';
      }
    } else {
      console.log('🔄 Login: Returning user - redirecting to dashboard');
      // Returning user - redirect to dashboard
      switch (role) {
        case 'group-admin':
          targetRoute = '/group-admin/dashboard';
          break;
        case 'player':
          targetRoute = '/player/dashboard';
          break;
        case 'super-admin':
          targetRoute = '/super-admin/dashboard';
          break;
        default:
          targetRoute = '/welcome';
      }
    }

    console.log('🎯 Login: Navigating to:', targetRoute);
    this.router.navigate([targetRoute], { replaceUrl: true });
  }

  navigateToWelcome() {
    // Clear any stored returnUrl and navigate to welcome page
    // This ensures users always go to welcome when clicking logo
    this.returnUrl = '';
    this.router.navigate(['/welcome'], { replaceUrl: true });
  }
}
