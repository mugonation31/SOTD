import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
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
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-super-admin-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
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
    IonSelect,
    IonSelectOption,
  ],
})
export class SuperAdminLoginPage implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  currentSecurityQuestion: string = '';
  private securityQuestionsList: string[] = [
    "What was your first pet's name?",
    'In which city were you born?',
    "What was your mother's maiden name?",
    'What was the name of your first school?',
    'What is your favorite book?',
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      securityAnswer: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    // Randomly select a security question
    const randomIndex = Math.floor(
      Math.random() * this.securityQuestionsList.length
    );
    this.currentSecurityQuestion = this.securityQuestionsList[randomIndex];
    
    // Debug: Log current auth state
    console.log('🔍 Super Admin Login Page - Current Auth State:');
    console.log('isAuthenticated:', this.authService.isAuthenticated());
    console.log('isSuperAdmin:', this.authService.isSuperAdmin());
    console.log('currentUser:', this.authService.getCurrentUser());
  }

  // Debug method to check auth state
  debugAuthState() {
    console.log('🔍 Debug Auth State Called:');
    (this.authService as any).debugAuthState();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      // Get form values
      const loginData = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
        securityQuestion: this.currentSecurityQuestion,
        securityAnswer: this.loginForm.get('securityAnswer')?.value,
      };

      // For super-admin login, we need to set up the proper role first
      // Store the super-admin role so the AuthService can pick it up
      localStorage.setItem(`pendingRole_${loginData.email}`, 'super-admin');
      localStorage.setItem(`pendingUsername_${loginData.email}`, 'SuperAdmin');
      localStorage.setItem(`pendingFirstName_${loginData.email}`, 'Super');
      localStorage.setItem(`pendingLastName_${loginData.email}`, 'Admin');

      // Use the centralized AuthService for login
      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log('Super admin login successful:', response);
          
          // Navigate to super-admin dashboard
          this.router.navigate(['/super-admin/dashboard']);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Super admin login failed:', error);
          this.isLoading = false;
          // Here you would typically show an error message to the user
        }
      });
    }
  }
}
