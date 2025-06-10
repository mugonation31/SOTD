import { Component, OnInit, ViewChild } from '@angular/core';
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
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  logoGoogle,
  logoFacebook,
  logoInstagram,
  logoX,
  eye,
  eyeOff,
} from 'ionicons/icons';
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
  @ViewChild('loginForm') loginForm!: NgForm;

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
  private returnUrl: string = '/welcome';
  private loginReturnUrl: string | null = null;

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
    addIcons({
      logoGoogle,
      logoFacebook,
      logoInstagram,
      logoX,
      eye,
      eyeOff,
    });
  }

  ngOnInit() {
    console.log('Login page initialized');
    this.route.queryParams.subscribe(params => {
      this.loginReturnUrl = params['loginReturnUrl'] || null;
      this.returnUrl = this.loginReturnUrl || '/welcome';
      console.log('Query params:', params);
      console.log('Login return URL:', this.loginReturnUrl);
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
    console.log('Login button clicked');
    this.validateEmail();
    this.validatePassword();

    if (!this.canSubmit) {
      console.log('Form validation failed:', this.validationErrors);
      return;
    }

    console.log('Attempting login with:', this.loginData);

    // Set default security question and answer for development
    this.loginData.securityQuestion = 'What is your favorite color?';
    this.loginData.securityAnswer = 'blue';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        const role = response.user?.role;
        console.log('User role:', role);
        
        // Always use loginReturnUrl if available
        if (this.loginReturnUrl) {
          console.log('Redirecting to loginReturnUrl:', this.loginReturnUrl);
          this.router.navigate([this.loginReturnUrl], { replaceUrl: true });
          return;
        }
        
        // If no loginReturnUrl, redirect based on role
        const redirectUrl = role === 'group-admin' 
          ? '/group-admin/groups'
          : '/player/join-group';
          
        console.log('No loginReturnUrl, redirecting based on role:', redirectUrl);
        this.router.navigate([redirectUrl], { replaceUrl: true });
      },
      error: (error) => {
        console.error('Login error:', error);
      },
    });
  }

  navigateToWelcome() {
    this.router.navigate(['/welcome']);
  }
}
