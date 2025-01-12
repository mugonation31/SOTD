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
  IonIcon,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonAvatar,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  personCircleOutline,
  keyOutline,
  notificationsOutline,
  globeOutline,
  mailOutline,
  phonePortraitOutline,
  logOutOutline,
  settingsOutline,
  peopleOutline,
  footballOutline,
  walletOutline,
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-settings',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-segment [(ngModel)]="selectedTab" class="ion-margin-bottom">
        <ion-segment-button value="profile">
          <ion-icon name="person-circle-outline"></ion-icon>
          <ion-label>Profile</ion-label>
        </ion-segment-button>
        <ion-segment-button value="settings">
          <ion-icon name="settings-outline"></ion-icon>
          <ion-label>Settings</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- Profile Tab -->
      <div *ngIf="selectedTab === 'profile'">
        <!-- Profile Information -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="person-circle-outline"></ion-icon>
              Profile Information
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="profile-avatar">
              <ion-avatar>
                <img
                  [src]="profile.avatar || 'assets/default-avatar.png'"
                  alt="Profile"
                />
              </ion-avatar>
              <ion-button size="small" fill="clear">Change Photo</ion-button>
            </div>

            <ion-item>
              <ion-label position="stacked">First Name</ion-label>
              <ion-input
                [(ngModel)]="profile.firstName"
                type="text"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Last Name</ion-label>
              <ion-input [(ngModel)]="profile.lastName" type="text"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Email</ion-label>
              <ion-input
                [(ngModel)]="profile.email"
                type="email"
                readonly
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Phone</ion-label>
              <ion-input [(ngModel)]="profile.phone" type="tel"></ion-input>
            </ion-item>

            <ion-button expand="block" (click)="updateProfile()">
              Save Profile Changes
            </ion-button>
          </ion-card-content>
        </ion-card>

        <!-- Security Settings -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="key-outline"></ion-icon>
              Security
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="stacked">Current Password</ion-label>
              <ion-input
                [(ngModel)]="passwordForm.current"
                type="password"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">New Password</ion-label>
              <ion-input
                [(ngModel)]="passwordForm.new"
                type="password"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Confirm New Password</ion-label>
              <ion-input
                [(ngModel)]="passwordForm.confirm"
                type="password"
              ></ion-input>
            </ion-item>

            <ion-button expand="block" (click)="changePassword()">
              Change Password
            </ion-button>
          </ion-card-content>
        </ion-card>

        <!-- Notification Preferences -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="notifications-outline"></ion-icon>
              Notifications
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label>Email Notifications</ion-label>
              <ion-toggle
                [(ngModel)]="preferences.emailNotifications"
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Prediction Reminders</ion-label>
              <ion-toggle
                [(ngModel)]="preferences.predictionReminders"
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Results Notifications</ion-label>
              <ion-toggle
                [(ngModel)]="preferences.resultNotifications"
              ></ion-toggle>
            </ion-item>
          </ion-card-content>
        </ion-card>

        <!-- Account Actions -->
        <ion-card>
          <ion-card-content>
            <ion-button expand="block" color="danger" (click)="logout()">
              <ion-icon name="log-out-outline" slot="start"></ion-icon>
              Logout
            </ion-button>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Settings Tab -->
      <div *ngIf="selectedTab === 'settings'">
        <!-- Group Settings -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="people-outline"></ion-icon>
              Group Settings
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label>Auto-approve Members</ion-label>
              <ion-toggle [(ngModel)]="groupSettings.autoApprove"></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Allow Member Invites</ion-label>
              <ion-toggle
                [(ngModel)]="groupSettings.allowMemberInvites"
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Points System</ion-label>
              <ion-select [(ngModel)]="groupSettings.pointsSystem">
                <ion-select-option value="standard"
                  >Standard (3-4-6)</ion-select-option
                >
                <ion-select-option value="custom">Custom</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-card-content>
        </ion-card>

        <!-- Prediction Settings -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="football-outline"></ion-icon>
              Prediction Settings
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label>Default Deadline</ion-label>
              <ion-select [(ngModel)]="groupSettings.defaultDeadline">
                <ion-select-option value="1">1 hour before</ion-select-option>
                <ion-select-option value="2">2 hours before</ion-select-option>
                <ion-select-option value="3">3 hours before</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label>Allow Late Submissions</ion-label>
              <ion-toggle
                [(ngModel)]="groupSettings.allowLateSubmissions"
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Joker Rules</ion-label>
              <ion-select [(ngModel)]="groupSettings.jokerRules">
                <ion-select-option value="none">Disabled</ion-select-option>
                <ion-select-option value="once"
                  >Once per season</ion-select-option
                >
                <ion-select-option value="multiple"
                  >Multiple times</ion-select-option
                >
              </ion-select>
            </ion-item>
          </ion-card-content>
        </ion-card>

        <!-- Payment Settings -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="wallet-outline"></ion-icon>
              Payment Settings
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label>Entry Fee</ion-label>
              <ion-input
                type="number"
                [(ngModel)]="groupSettings.entryFee"
                placeholder="£0"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label>Payment Due Date</ion-label>
              <ion-input
                type="date"
                [(ngModel)]="groupSettings.paymentDueDate"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label>Prize Distribution</ion-label>
              <ion-select [(ngModel)]="groupSettings.prizeDistribution">
                <ion-select-option value="winner"
                  >Winner Takes All</ion-select-option
                >
                <ion-select-option value="top3">Top 3 Places</ion-select-option>
                <ion-select-option value="custom"
                  >Custom Split</ion-select-option
                >
              </ion-select>
            </ion-item>
          </ion-card-content>
        </ion-card>

        <ion-button expand="block" (click)="saveSettings()">
          Save Settings
        </ion-button>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .profile-avatar {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
      }

      ion-avatar {
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
      }

      ion-card {
        margin-bottom: 16px;
      }

      ion-card-title {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      ion-icon {
        font-size: 20px;
      }

      ion-button {
        margin-top: 16px;
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
    IonIcon,
    IonToggle,
    IonSelect,
    IonSelectOption,
    IonAvatar,
    NgIf,
    FormsModule,
    IonSegment,
    IonSegmentButton,
  ],
})
export class SettingsPage {
  selectedTab = 'profile';

  profile = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '+44 7123 456789',
    avatar: '',
  };

  passwordForm = {
    current: '',
    new: '',
    confirm: '',
  };

  preferences = {
    emailNotifications: true,
    predictionReminders: true,
    resultNotifications: true,
  };

  groupSettings = {
    autoApprove: false,
    allowMemberInvites: true,
    pointsSystem: 'standard',
    defaultDeadline: '2',
    allowLateSubmissions: false,
    jokerRules: 'once',
    entryFee: 20,
    paymentDueDate: '',
    prizeDistribution: 'top3',
  };

  constructor(private toastService: ToastService) {
    addIcons({
      personCircleOutline,
      keyOutline,
      notificationsOutline,
      globeOutline,
      mailOutline,
      phonePortraitOutline,
      logOutOutline,
      settingsOutline,
      peopleOutline,
      footballOutline,
      walletOutline,
    });
  }

  async updateProfile() {
    try {
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
      await this.toastService.showToast(
        'Password changed successfully',
        'success'
      );
      this.passwordForm = { current: '', new: '', confirm: '' };
    } catch (error) {
      await this.toastService.showToast('Error changing password', 'error');
    }
  }

  async logout() {
    // Implement logout logic
    window.location.href = '/auth/login';
  }

  async saveSettings() {
    try {
      await this.toastService.showToast(
        'Settings saved successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error saving settings', 'error');
    }
  }
}
