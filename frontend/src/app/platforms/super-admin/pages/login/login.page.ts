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
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      // Frontend-only implementation
      const isSuperAdmin =
        localStorage.getItem('superAdminRegistered') === 'true';

      if (isSuperAdmin) {
        // Simulate successful login
        localStorage.setItem('userRole', 'super-admin');
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/super-admin/dashboard']);
      } else {
        console.error('No super admin registered');
        // Show error message to user
      }

      this.isLoading = false;
    }
  }
}
