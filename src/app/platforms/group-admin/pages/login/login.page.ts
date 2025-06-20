import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSpinner,
  IonText,
} from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-group-admin-login',
  template: `
    <ion-content class="ion-padding">
      <div class="flex-center">
        <ion-card class="auth-card">
          <ion-card-header>
            <ion-card-title>Group Admin Login</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <!-- Step 1: Email and Password -->
            <form
              *ngIf="!showSecurityQuestion"
              [formGroup]="loginForm"
              (ngSubmit)="onSubmit()"
            >
              <ion-item>
                <ion-input
                  type="email"
                  formControlName="email"
                  placeholder="Email"
                  [clearInput]="true"
                ></ion-input>
              </ion-item>

              <ion-item>
                <ion-input
                  type="password"
                  formControlName="password"
                  placeholder="Password"
                ></ion-input>
              </ion-item>

              <div class="ion-margin-top">
                <ion-button
                  expand="block"
                  type="submit"
                  [disabled]="!loginForm.valid || isLoading"
                >
                  <ion-spinner *ngIf="isLoading"></ion-spinner>
                  <span *ngIf="!isLoading">Continue</span>
                </ion-button>
              </div>

              <div class="forgot-password ion-text-center ion-margin-top">
                <a (click)="forgotPassword()">Forgot Password?</a>
              </div>
            </form>

            <!-- Step 2: Security Question -->
            <form
              *ngIf="showSecurityQuestion"
              [formGroup]="securityForm"
              (ngSubmit)="onSecuritySubmit()"
            >
              <div class="security-question">
                <ion-text color="medium">
                  <p>{{ currentSecurityQuestion }}</p>
                </ion-text>
                <ion-item>
                  <ion-input
                    type="text"
                    formControlName="answer"
                    placeholder="Your Answer"
                    [clearInput]="true"
                  ></ion-input>
                </ion-item>
              </div>

              <div class="ion-margin-top">
                <ion-button
                  expand="block"
                  type="submit"
                  [disabled]="!securityForm.valid || isLoading"
                >
                  <ion-spinner *ngIf="isLoading"></ion-spinner>
                  <span *ngIf="!isLoading">Login</span>
                </ion-button>

                <ion-button
                  expand="block"
                  fill="clear"
                  (click)="backToCredentials()"
                  [disabled]="isLoading"
                >
                  Back
                </ion-button>
              </div>
            </form>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100%;
      }
      .auth-card {
        max-width: 400px;
        width: 100%;
        margin: 20px;
      }
      ion-item {
        margin-bottom: 10px;
        --background: transparent;
      }
      .forgot-password {
        margin-top: 1rem;
      }
      .forgot-password a {
        color: var(--ion-color-primary);
        cursor: pointer;
      }
      .security-question {
        margin: 1rem 0;
      }
      .security-question p {
        margin-bottom: 1rem;
        font-size: 1.1em;
      }
    `,
  ],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSpinner,
    IonText,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
})
export class GroupAdminLoginPage {
  loginForm: FormGroup;
  securityForm: FormGroup;
  isLoading = false;
  showSecurityQuestion = false;
  currentSecurityQuestion = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.securityForm = this.fb.group({
      answer: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      try {
        // TODO: Implement actual credential validation
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

        // Mock security question (this would come from the backend)
        this.currentSecurityQuestion = 'What city were you born in?';
        this.showSecurityQuestion = true;
      } catch (error) {
        await this.toastService.showToast('Invalid email or password', 'error');
      } finally {
        this.isLoading = false;
      }
    }
  }

  async onSecuritySubmit() {
    if (this.securityForm.valid) {
      this.isLoading = true;
      try {
        // TODO: Implement actual security answer validation
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        await this.toastService.showToast(
          'Login successful! Redirecting...',
          'success'
        );
        this.router.navigate(['/group-admin/dashboard']);
      } catch (error) {
        await this.toastService.showToast('Incorrect answer', 'error');
      } finally {
        this.isLoading = false;
      }
    }
  }

  backToCredentials() {
    this.showSecurityQuestion = false;
    this.securityForm.reset();
  }

  async forgotPassword() {
    await this.toastService.showToast(
      'Password reset functionality coming soon',
      'warning'
    );
  }
}
