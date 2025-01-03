import { Component } from '@angular/core';
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
  IonSegment,
  IonSegmentButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  settingsOutline,
  keyOutline,
  personCircleOutline,
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';

interface SuperAdmin {
  name: string;
  email: string;
  role: 'super-admin';
  lastLogin: Date;
}

@Component({
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile & Settings</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment [(ngModel)]="activeTab">
          <ion-segment-button value="profile">
            <ion-icon name="person-circle-outline"></ion-icon>
            <ion-label>Profile</ion-label>
          </ion-segment-button>
          <ion-segment-button value="settings">
            <ion-icon name="settings-outline"></ion-icon>
            <ion-label>Settings</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="ion-padding">
        <!-- Profile Tab -->
        <div *ngIf="activeTab === 'profile'">
          <ion-card>
            <ion-card-header>
              <ion-card-title>Profile Details</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <form (ngSubmit)="updateProfile()">
                <ion-item>
                  <ion-label position="floating">Name</ion-label>
                  <ion-input
                    [(ngModel)]="profile.name"
                    name="name"
                    required
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="floating">Email</ion-label>
                  <ion-input
                    [(ngModel)]="profile.email"
                    name="email"
                    type="email"
                    required
                  ></ion-input>
                </ion-item>
                <ion-button expand="block" type="submit" class="ion-margin-top">
                  Update Profile
                </ion-button>
              </form>
            </ion-card-content>
          </ion-card>

          <ion-card>
            <ion-card-header>
              <ion-card-title>Change Password</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <form (ngSubmit)="changePassword()">
                <ion-item>
                  <ion-label position="floating">Current Password</ion-label>
                  <ion-input
                    [(ngModel)]="passwordForm.current"
                    name="currentPassword"
                    type="password"
                    required
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="floating">New Password</ion-label>
                  <ion-input
                    [(ngModel)]="passwordForm.new"
                    name="newPassword"
                    type="password"
                    required
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="floating"
                    >Confirm New Password</ion-label
                  >
                  <ion-input
                    [(ngModel)]="passwordForm.confirm"
                    name="confirmPassword"
                    type="password"
                    required
                  ></ion-input>
                </ion-item>
                <ion-button expand="block" type="submit" class="ion-margin-top">
                  Change Password
                </ion-button>
              </form>
            </ion-card-content>
          </ion-card>
        </div>

        <!-- Settings Tab -->
        <div *ngIf="activeTab === 'settings'">
          <ion-card>
            <ion-card-header>
              <ion-card-title>Application Settings</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <!-- Add your settings content here -->
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  `,
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
    IonSegment,
    IonSegmentButton,
    IonIcon,
    NgIf,
    FormsModule,
  ],
})
export class SettingsPage {
  activeTab = 'profile';
  profile: SuperAdmin = {
    name: 'John Super',
    email: 'super@example.com',
    role: 'super-admin',
    lastLogin: new Date(),
  };

  passwordForm = {
    current: '',
    new: '',
    confirm: '',
  };

  constructor(private toastService: ToastService) {
    addIcons({
      settingsOutline,
      keyOutline,
      personCircleOutline,
    });
  }

  async updateProfile() {
    try {
      // Add API call here
      await this.toastService.showToast(
        'Profile updated successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error updating profile', 'error');
    }
  }

  async changePassword() {
    if (this.passwordForm.new !== this.passwordForm.confirm) {
      await this.toastService.showToast('Passwords do not match', 'error');
      return;
    }

    try {
      // Add API call here
      await this.toastService.showToast(
        'Password changed successfully',
        'success'
      );
      this.passwordForm = { current: '', new: '', confirm: '' };
    } catch (error) {
      await this.toastService.showToast('Error changing password', 'error');
    }
  }
}
