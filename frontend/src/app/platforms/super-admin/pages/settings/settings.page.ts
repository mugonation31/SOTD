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
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonDatetimeButton,
  IonDatetime,
  IonModal,
} from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  settingsOutline,
  keyOutline,
  personCircleOutline,
  notificationsOutline,
  timeOutline,
  globeOutline,
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';

interface SystemSettings {
  predictionDeadlines: {
    defaultTime: string;
    reminderHours: number;
    allowLateSubmissions: boolean;
  };
  scoring: {
    homeWinPoints: number;
    awayWinPoints: number;
    drawPoints: number;
    correctScorePoints: number;
    perfectWeekBonus: number;
  };
  notifications: {
    enableEmailNotifications: boolean;
    enablePushNotifications: boolean;
    notifyAdminsBeforeDeadline: boolean;
    notifyPlayersBeforeDeadline: boolean;
  };
  display: {
    timezone: string;
    dateFormat: string;
    language: string;
  };
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

    <ion-content class="ion-padding">
      <!-- Profile Tab -->
      <div *ngIf="activeTab === 'profile'">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Profile Details</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="stacked">Name</ion-label>
              <ion-input [(ngModel)]="profile.name"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Email</ion-label>
              <ion-input type="email" [(ngModel)]="profile.email"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Phone</ion-label>
              <ion-input type="tel" [(ngModel)]="profile.phone"></ion-input>
            </ion-item>

            <ion-button
              expand="block"
              (click)="updateProfile()"
              class="ion-margin-top"
            >
              Update Profile
            </ion-button>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-title>Change Password</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="stacked">Current Password</ion-label>
              <ion-input
                type="password"
                [(ngModel)]="passwordForm.current"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">New Password</ion-label>
              <ion-input
                type="password"
                [(ngModel)]="passwordForm.new"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Confirm Password</ion-label>
              <ion-input
                type="password"
                [(ngModel)]="passwordForm.confirm"
              ></ion-input>
            </ion-item>

            <ion-button
              expand="block"
              (click)="changePassword()"
              class="ion-margin-top"
            >
              Change Password
            </ion-button>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Settings Tab -->
      <div *ngIf="activeTab === 'settings'">
        <!-- Prediction Settings -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Prediction Settings</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="stacked">Default Deadline Time</ion-label>
              <ion-datetime-button
                datetime="defaultDeadline"
              ></ion-datetime-button>
              <ion-modal [keepContentsMounted]="true">
                <ng-template>
                  <ion-datetime
                    id="defaultDeadline"
                    presentation="time"
                    [(ngModel)]="settings.predictionDeadlines.defaultTime"
                  ></ion-datetime>
                </ng-template>
              </ion-modal>
            </ion-item>

            <ion-item>
              <ion-label position="stacked"
                >Reminder Hours Before Deadline</ion-label
              >
              <ion-select
                [(ngModel)]="settings.predictionDeadlines.reminderHours"
              >
                <ion-select-option value="1">1 hour</ion-select-option>
                <ion-select-option value="2">2 hours</ion-select-option>
                <ion-select-option value="4">4 hours</ion-select-option>
                <ion-select-option value="12">12 hours</ion-select-option>
                <ion-select-option value="24">24 hours</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-card-content>
        </ion-card>

        <!-- Scoring Settings -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Points System</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="stacked">Home Win Points</ion-label>
              <ion-input
                type="number"
                [(ngModel)]="settings.scoring.homeWinPoints"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Away Win Points</ion-label>
              <ion-input
                type="number"
                [(ngModel)]="settings.scoring.awayWinPoints"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Draw Points</ion-label>
              <ion-input
                type="number"
                [(ngModel)]="settings.scoring.drawPoints"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Correct Score Points</ion-label>
              <ion-input
                type="number"
                [(ngModel)]="settings.scoring.correctScorePoints"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Perfect Week Bonus</ion-label>
              <ion-input
                type="number"
                [(ngModel)]="settings.scoring.perfectWeekBonus"
              ></ion-input>
            </ion-item>
          </ion-card-content>
        </ion-card>

        <!-- Notification Settings -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Notifications</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label>Enable Email Notifications</ion-label>
              <ion-toggle
                [(ngModel)]="settings.notifications.enableEmailNotifications"
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Enable Push Notifications</ion-label>
              <ion-toggle
                [(ngModel)]="settings.notifications.enablePushNotifications"
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Notify Admins Before Deadline</ion-label>
              <ion-toggle
                [(ngModel)]="settings.notifications.notifyAdminsBeforeDeadline"
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Notify Players Before Deadline</ion-label>
              <ion-toggle
                [(ngModel)]="settings.notifications.notifyPlayersBeforeDeadline"
              ></ion-toggle>
            </ion-item>
          </ion-card-content>
        </ion-card>

        <!-- Display Settings -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Display Settings</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="stacked">Timezone</ion-label>
              <ion-select [(ngModel)]="settings.display.timezone">
                <ion-select-option value="UTC">UTC</ion-select-option>
                <ion-select-option value="GMT">GMT (London)</ion-select-option>
                <ion-select-option value="EST"
                  >EST (New York)</ion-select-option
                >
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Date Format</ion-label>
              <ion-select [(ngModel)]="settings.display.dateFormat">
                <ion-select-option value="DD/MM/YYYY"
                  >DD/MM/YYYY</ion-select-option
                >
                <ion-select-option value="MM/DD/YYYY"
                  >MM/DD/YYYY</ion-select-option
                >
                <ion-select-option value="YYYY-MM-DD"
                  >YYYY-MM-DD</ion-select-option
                >
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Language</ion-label>
              <ion-select [(ngModel)]="settings.display.language">
                <ion-select-option value="en">English</ion-select-option>
                <ion-select-option value="es">Spanish</ion-select-option>
                <ion-select-option value="fr">French</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-card-content>
        </ion-card>

        <!-- Save Button -->
        <ion-button
          expand="block"
          (click)="saveSettings()"
          class="ion-margin-top"
        >
          Save Settings
        </ion-button>
      </div>
    </ion-content>
  `,
  styles: [
    `
      ion-segment {
        --background: var(--ion-color-light);
      }

      ion-card {
        margin-bottom: 1rem;
      }

      ion-item {
        --padding-start: 0;
        margin-bottom: 1rem;
      }

      ion-datetime {
        margin: auto;
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
    IonSegment,
    IonSegmentButton,
    IonIcon,
    IonToggle,
    IonSelect,
    IonSelectOption,
    IonDatetimeButton,
    IonDatetime,
    IonModal,
    NgIf,
    FormsModule,
  ],
})
export class SettingsPage {
  activeTab = 'profile';

  profile = {
    name: 'John Super',
    email: 'super@example.com',
    phone: '+44 123 456 7890',
  };

  passwordForm = {
    current: '',
    new: '',
    confirm: '',
  };

  settings: SystemSettings = {
    predictionDeadlines: {
      defaultTime: '11:30',
      reminderHours: 24,
      allowLateSubmissions: false,
    },
    scoring: {
      homeWinPoints: 3,
      awayWinPoints: 4,
      drawPoints: 6,
      correctScorePoints: 3,
      perfectWeekBonus: 10,
    },
    notifications: {
      enableEmailNotifications: true,
      enablePushNotifications: true,
      notifyAdminsBeforeDeadline: true,
      notifyPlayersBeforeDeadline: true,
    },
    display: {
      timezone: 'GMT',
      dateFormat: 'DD/MM/YYYY',
      language: 'en',
    },
  };

  constructor(private toastService: ToastService) {
    addIcons({
      settingsOutline,
      keyOutline,
      personCircleOutline,
      notificationsOutline,
      timeOutline,
      globeOutline,
    });
  }

  async updateProfile() {
    try {
      // TODO: Implement profile update
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
      // TODO: Implement password change
      await this.toastService.showToast(
        'Password changed successfully',
        'success'
      );
      this.passwordForm = { current: '', new: '', confirm: '' };
    } catch (error) {
      await this.toastService.showToast('Error changing password', 'error');
    }
  }

  async saveSettings() {
    try {
      // TODO: Implement API call to save settings
      await this.toastService.showToast(
        'Settings saved successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error saving settings', 'error');
    }
  }
}
