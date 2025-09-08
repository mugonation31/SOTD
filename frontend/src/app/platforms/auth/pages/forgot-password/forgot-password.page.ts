import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonList,
  IonCard,
  IonCardContent,
  IonText,
  IonNote,
  IonIcon,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { addIcons } from 'ionicons';
import { footballOutline } from 'ionicons/icons';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonList,
    IonCard,
    IonCardContent,
    IonText,
    IonNote,
    IonIcon,
    RouterLink,
    FormsModule,
    NgIf,
  ],
})
export class ForgotPasswordPage {
  email = '';
  validationError = '';
  private validationTimeout: any;

  get canSubmit(): boolean {
    return Boolean(this.email && !this.validationError);
  }

  constructor(private authService: AuthService, private router: Router) {
    addIcons({ footballOutline });
  }

  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Clear previous error when user starts typing
    if (!this.email || this.email.trim() === '') {
      this.validationError = 'Email is required';
    } else if (!emailPattern.test(this.email)) {
      this.validationError = 'Please enter a valid email address';
    } else {
      this.validationError = '';
    }
  }

  onEmailInput() {
    // Trigger validation on every input change with minimal delay for better UX
    // Clear any existing timeout to prevent multiple validations
    if (this.validationTimeout) {
      clearTimeout(this.validationTimeout);
    }
    this.validationTimeout = setTimeout(() => {
      this.validateEmail();
    }, 10);
  }

  onEmailBlur() {
    // Trigger validation when user clicks outside the field
    this.validateEmail();
  }

  async onSubmit() {
    // Validate email before submission
    this.validateEmail();

    if (!this.canSubmit) {
      return;
    }

    try {
      const { error } = await this.authService.resetPassword(this.email);
      if (error) {
        this.validationError = 'Failed to send reset email. Please try again.';
        console.error('Reset error:', error.message);
      } else {
        alert('Check your inbox for a password reset link!');
        this.router.navigate(['/login']); // Adjust if you want a different redirect
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      this.validationError = 'Something went wrong. Please try again later.';
    }
  }

  navigateToWelcome() {
    this.router.navigate(['/welcome']);
  }
}
