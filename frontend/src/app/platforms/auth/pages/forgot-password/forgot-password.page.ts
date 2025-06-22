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

  get canSubmit(): boolean {
    return Boolean(this.email && !this.validationError);
  }

  constructor(private authService: AuthService, private router: Router) {
    addIcons({ footballOutline });
  }

  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!this.email) {
      this.validationError = 'Email is required';
    } else if (!emailPattern.test(this.email)) {
      this.validationError = 'Please enter a valid email address';
    } else {
      this.validationError = '';
    }
  }

  onSubmit() {
    this.validateEmail();

    if (!this.canSubmit) return;

    // TODO: Implement password reset functionality
    console.log('Password reset requested for:', this.email);
  }

  navigateToWelcome() {
    this.router.navigate(['/welcome']);
  }
}
