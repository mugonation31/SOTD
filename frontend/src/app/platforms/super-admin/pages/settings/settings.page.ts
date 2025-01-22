import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
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
  IonChip,
  IonList,
  IonNote,
} from '@ionic/angular/standalone';
import { NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  settingsOutline,
  keyOutline,
  personCircleOutline,
  notificationsOutline,
  timeOutline,
  globeOutline,
  statsChartOutline,
  logOutOutline,
  shieldOutline,
  alertCircleOutline,
  cameraOutline,
  personOutline,
  footballOutline,
  trophyOutline,
  calendarOutline,
  timerOutline,
  mailOutline,
  notificationsCircleOutline,
  saveOutline,
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

interface SystemMetrics {
  totalGroups: number;
  totalPlayers: number;
  activeGameweek: number;
  predictionsThisWeek: number;
  systemUptime: string;
  lastBackup: Date;
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
        <!-- Super Admin Profile -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Super Admin Profile</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="profile-header">
              <div class="profile-picture-container">
                <div class="profile-picture">
                  <img
                    *ngIf="profile.profilePicture"
                    [src]="profile.profilePicture"
                    alt="Profile picture"
                  />
                  <ion-icon
                    *ngIf="!profile.profilePicture"
                    name="person-outline"
                  ></ion-icon>
                </div>
                <input
                  type="file"
                  #fileInput
                  (change)="onFileSelected($event)"
                  accept="image/*"
                  style="display: none"
                />
                <div class="camera-icon" (click)="fileInput.click()">
                  <ion-icon name="camera-outline"></ion-icon>
                </div>
              </div>
              <div class="profile-info">
                <h2>{{ profile.name }}</h2>
                <p class="role">Super Administrator</p>
                <ion-chip color="primary">
                  <ion-icon name="shield-outline"></ion-icon>
                  <ion-label>Full System Access</ion-label>
                </ion-chip>
              </div>
            </div>

            <ion-list>
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
            </ion-list>

            <ion-button
              expand="block"
              (click)="updateProfile()"
              class="ion-margin-top"
            >
              Update Profile
            </ion-button>
          </ion-card-content>
        </ion-card>

        <!-- System Overview -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="stats-chart-outline"></ion-icon>
              System Overview
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-icon name="people-outline" slot="start"></ion-icon>
                <ion-label>
                  <h2>Total Groups</h2>
                  <p>{{ systemMetrics.totalGroups }} active groups</p>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-icon name="person-outline" slot="start"></ion-icon>
                <ion-label>
                  <h2>Total Players</h2>
                  <p>{{ systemMetrics.totalPlayers }} registered players</p>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-icon name="football-outline" slot="start"></ion-icon>
                <ion-label>
                  <h2>Current Gameweek</h2>
                  <p>Week {{ systemMetrics.activeGameweek }}</p>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-icon
                  name="checkmark-circle-outline"
                  slot="start"
                ></ion-icon>
                <ion-label>
                  <h2>Predictions This Week</h2>
                  <p>{{ systemMetrics.predictionsThisWeek }} submissions</p>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-icon name="time-outline" slot="start"></ion-icon>
                <ion-label>
                  <h2>System Uptime</h2>
                  <p>{{ systemMetrics.systemUptime }}</p>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-icon name="save-outline" slot="start"></ion-icon>
                <ion-label>
                  <h2>Last Backup</h2>
                  <p>{{ systemMetrics.lastBackup | date : 'medium' }}</p>
                </ion-label>
              </ion-item>
            </ion-list>

            <ion-button
              expand="block"
              color="tertiary"
              (click)="backupSystem()"
              class="ion-margin-top"
            >
              <ion-icon name="save-outline" slot="start"></ion-icon>
              Backup System
            </ion-button>
          </ion-card-content>
        </ion-card>

        <!-- Security Settings -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="shield-outline"></ion-icon>
              Security
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
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

              <ion-item lines="none">
                <ion-label>Enable Two-Factor Authentication</ion-label>
                <ion-toggle
                  [(ngModel)]="security.twoFactorEnabled"
                  (ionChange)="toggleTwoFactor()"
                ></ion-toggle>
              </ion-item>
            </ion-list>

            <ion-button
              expand="block"
              (click)="changePassword()"
              class="ion-margin-top"
            >
              <ion-icon name="key-outline" slot="start"></ion-icon>
              Change Password
            </ion-button>

            <ion-button
              expand="block"
              color="danger"
              (click)="logout()"
              class="ion-margin-top"
            >
              <ion-icon name="log-out-outline" slot="start"></ion-icon>
              Logout
            </ion-button>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Settings Tab -->
      <div *ngIf="activeTab === 'settings'" class="ion-padding">
        <!-- Game Rules Settings -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="football-outline"></ion-icon>
              Game Rules
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="settings-grid">
              <!-- Match Settings -->
              <div class="settings-group">
                <h4 class="settings-group-title">Match Settings</h4>
                <ion-item>
                  <ion-label position="stacked">Matches Per Gameweek</ion-label>
                  <ion-input type="number" value="3" readonly></ion-input>
                  <ion-note>Required predictions per week</ion-note>
                </ion-item>
              </div>

              <!-- Points System -->
              <div class="settings-group">
                <h4 class="settings-group-title">Points System</h4>
                <div class="points-grid">
                  <ion-item>
                    <ion-label position="stacked">Home Win</ion-label>
                    <ion-input
                      type="number"
                      [(ngModel)]="settings.scoring.homeWinPoints"
                    ></ion-input>
                  </ion-item>

                  <ion-item>
                    <ion-label position="stacked">Away Win</ion-label>
                    <ion-input
                      type="number"
                      [(ngModel)]="settings.scoring.awayWinPoints"
                    ></ion-input>
                  </ion-item>

                  <ion-item>
                    <ion-label position="stacked">Draw</ion-label>
                    <ion-input
                      type="number"
                      [(ngModel)]="settings.scoring.drawPoints"
                    ></ion-input>
                  </ion-item>

                  <ion-item>
                    <ion-label position="stacked">Correct Score</ion-label>
                    <ion-input
                      type="number"
                      [(ngModel)]="settings.scoring.correctScorePoints"
                    ></ion-input>
                  </ion-item>
                </div>
              </div>

              <!-- Bonus Points -->
              <div class="settings-group">
                <h4 class="settings-group-title">Bonus Points</h4>
                <ion-item>
                  <ion-label position="stacked">Perfect Week Bonus</ion-label>
                  <ion-input
                    type="number"
                    [(ngModel)]="settings.scoring.perfectWeekBonus"
                  ></ion-input>
                  <ion-note>Extra points for all correct predictions</ion-note>
                </ion-item>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Special Events Settings -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="trophy-outline"></ion-icon>
              Special Events
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-label>Boxing Day - All Matches Required</ion-label>
                <ion-toggle checked disabled></ion-toggle>
              </ion-item>

              <ion-item>
                <ion-label>Final Day - All Matches Required</ion-label>
                <ion-toggle checked disabled></ion-toggle>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Deadline Settings -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="timer-outline"></ion-icon>
              Deadlines & Jokers
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-label position="stacked">Default Deadline Time</ion-label>
                <ion-datetime-button
                  datetime="defaultDeadline"
                ></ion-datetime-button>
              </ion-item>
              <ion-modal [keepContentsMounted]="true">
                <ng-template>
                  <ion-datetime
                    id="defaultDeadline"
                    presentation="time"
                    [(ngModel)]="settings.predictionDeadlines.defaultTime"
                  ></ion-datetime>
                </ng-template>
              </ion-modal>

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

              <ion-item>
                <ion-label>First Joker - Before Boxing Day</ion-label>
                <ion-toggle checked disabled></ion-toggle>
              </ion-item>

              <ion-item>
                <ion-label>Second Joker - Before Final Day</ion-label>
                <ion-toggle checked disabled></ion-toggle>
              </ion-item>

              <ion-item>
                <ion-label>Auto-apply Unused Jokers</ion-label>
                <ion-toggle checked disabled></ion-toggle>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Notification Settings -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="notifications-circle-outline"></ion-icon>
              Notifications
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
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
                <ion-label>Notify Group Admins</ion-label>
                <ion-toggle
                  [(ngModel)]="
                    settings.notifications.notifyAdminsBeforeDeadline
                  "
                ></ion-toggle>
              </ion-item>

              <ion-item>
                <ion-label>Notify Players</ion-label>
                <ion-toggle
                  [(ngModel)]="
                    settings.notifications.notifyPlayersBeforeDeadline
                  "
                ></ion-toggle>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Display Settings -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="globe-outline"></ion-icon>
              Display Settings
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-label position="stacked">Timezone</ion-label>
                <ion-select [(ngModel)]="settings.display.timezone">
                  <ion-select-option value="UTC">UTC</ion-select-option>
                  <ion-select-option value="GMT"
                    >GMT (London)</ion-select-option
                  >
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
            </ion-list>
          </ion-card-content>
        </ion-card>

        <ion-button
          expand="block"
          (click)="saveSettings()"
          class="ion-margin-top ion-margin-bottom"
        >
          <ion-icon name="save-outline" slot="start"></ion-icon>
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

      .profile-header {
        display: flex;
        align-items: center;
        padding: 20px;
        background: var(--ion-color-light);
        border-radius: 8px;
        margin-bottom: 20px;
      }

      .profile-picture-container {
        position: relative;
        margin-right: 20px;
        width: 100px;
        height: 100px;
      }

      .profile-picture {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: var(--ion-color-light);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border: 1px solid var(--ion-color-medium-tint);
      }

      .profile-picture img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .profile-picture ion-icon {
        font-size: 48px;
        color: var(--ion-color-medium);
      }

      .camera-icon {
        position: absolute;
        bottom: 0;
        right: 0;
        background: white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 1px solid var(--ion-color-medium-tint);
      }

      .camera-icon ion-icon {
        font-size: 14px;
        color: var(--ion-color-medium);
      }

      .profile-info {
        flex: 1;
        padding-left: 8px;
      }

      .profile-info h2 {
        margin: 0 0 8px 0;
        font-size: 24px;
        font-weight: 600;
        color: var(--ion-color-dark);
      }

      .role {
        color: var(--ion-color-medium);
        margin: 0 0 12px 0;
        font-size: 16px;
        font-weight: 500;
      }

      ion-card-title ion-icon {
        vertical-align: middle;
        margin-right: 8px;
      }

      .settings-container {
        max-width: 800px;
        margin: 0 auto;
      }

      ion-card {
        margin-bottom: 20px;
        border-radius: 12px;
      }

      ion-card-header {
        padding: 16px;
        background: var(--ion-color-light);
        border-bottom: 1px solid var(--ion-color-light-shade);
      }

      ion-card-title {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 600;
        color: var(--ion-color-dark);
      }

      ion-card-title ion-icon {
        margin-right: 8px;
        font-size: 24px;
        color: var(--ion-color-primary);
      }

      ion-card-subtitle {
        margin-top: 4px;
        color: var(--ion-color-medium);
        font-size: 14px;
      }

      .settings-section {
        margin-bottom: 24px;
      }

      .settings-section:last-child {
        margin-bottom: 0;
      }

      .settings-section h3 {
        margin: 0 0 12px 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--ion-color-dark);
      }

      ion-item {
        --padding-start: 0;
        --inner-padding-end: 0;
        margin-bottom: 12px;
      }

      ion-item:last-child {
        margin-bottom: 0;
      }

      ion-note {
        font-size: 12px;
        color: var(--ion-color-medium);
        margin-top: 4px;
      }

      ion-toggle {
        padding-right: 0;
      }

      .save-button {
        margin: 20px;
      }

      @media (max-width: 576px) {
        ion-card-header {
          padding: 12px;
        }

        ion-card-content {
          padding: 16px;
        }

        .settings-section {
          margin-bottom: 20px;
        }
      }

      ion-card {
        margin-bottom: 16px;
        border-radius: 8px;
        box-shadow: none;
        border: 1px solid var(--ion-color-light-shade);
      }

      ion-card-header {
        padding: 16px;
        border-bottom: 1px solid var(--ion-color-light-shade);
      }

      ion-card-title {
        font-size: 18px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      ion-card-title ion-icon {
        font-size: 20px;
        color: var(--ion-color-primary);
      }

      ion-card-content {
        padding: 16px;
      }

      ion-item {
        --padding-start: 0;
        --inner-padding-end: 0;
        --background: transparent;
        --border-color: var(--ion-color-light-shade);
        margin-bottom: 8px;
      }

      ion-item:last-child {
        margin-bottom: 0;
      }

      ion-label {
        margin: 0;
        color: var(--ion-color-dark);
      }

      ion-input,
      ion-select {
        --padding-start: 0;
        margin-top: 4px;
      }

      ion-toggle {
        padding-right: 0;
      }

      ion-button {
        margin: 32px 16px !important;
        --padding-top: 16px;
        --padding-bottom: 16px;
        font-weight: 500;
      }

      @media (max-width: 576px) {
        ion-card-header {
          padding: 12px;
        }

        ion-card-content {
          padding: 12px;
        }
      }

      .settings-grid {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .settings-group {
        background: var(--ion-color-light-tint);
        border-radius: 8px;
        padding: 16px;
      }

      .settings-group-title {
        color: var(--ion-color-medium);
        font-size: 14px;
        font-weight: 600;
        margin: 0 0 12px 0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .points-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 16px;
      }

      .points-grid ion-item {
        margin: 0;
      }

      ion-note {
        font-size: 12px;
        color: var(--ion-color-medium);
        margin-top: 4px;
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
    IonCardSubtitle,
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
    IonChip,
    IonList,
    IonNote,
    NgIf,
    DatePipe,
    FormsModule,
  ],
})
export class SettingsPage {
  activeTab = 'profile';

  profile = {
    name: 'Super Admin',
    email: 'admin@example.com',
    phone: '',
    profilePicture: null as string | null,
  };

  passwordForm = {
    current: '',
    new: '',
    confirm: '',
  };

  security = {
    twoFactorEnabled: false,
  };

  systemMetrics: SystemMetrics = {
    totalGroups: 5,
    totalPlayers: 127,
    activeGameweek: 25,
    predictionsThisWeek: 98,
    systemUptime: '15 days, 7 hours',
    lastBackup: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
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
      statsChartOutline,
      logOutOutline,
      shieldOutline,
      alertCircleOutline,
      cameraOutline,
      personOutline,
      footballOutline,
      trophyOutline,
      calendarOutline,
      timerOutline,
      mailOutline,
      notificationsCircleOutline,
      saveOutline,
    });
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        await this.toastService.showToast(
          'Please select an image file',
          'error'
        );
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        await this.toastService.showToast(
          'Image size should be less than 5MB',
          'error'
        );
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profile.profilePicture = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async updateProfile() {
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await this.toastService.showToast(
        'Profile updated successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Failed to update profile', 'error');
    }
  }

  async changePassword() {
    if (!this.passwordForm.current) {
      await this.toastService.showToast(
        'Please enter your current password',
        'error'
      );
      return;
    }

    if (!this.passwordForm.new) {
      await this.toastService.showToast('Please enter a new password', 'error');
      return;
    }

    if (this.passwordForm.new !== this.passwordForm.confirm) {
      await this.toastService.showToast('New passwords do not match', 'error');
      return;
    }

    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.passwordForm = { current: '', new: '', confirm: '' };
      await this.toastService.showToast(
        'Password changed successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Failed to change password', 'error');
    }
  }

  async toggleTwoFactor() {
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const status = this.security.twoFactorEnabled ? 'enabled' : 'disabled';
      await this.toastService.showToast(
        `Two-factor authentication ${status}`,
        'success'
      );
    } catch (error) {
      this.security.twoFactorEnabled = !this.security.twoFactorEnabled; // Revert on error
      await this.toastService.showToast(
        'Failed to update two-factor authentication',
        'error'
      );
    }
  }

  async backupSystem() {
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.systemMetrics.lastBackup = new Date();
      await this.toastService.showToast(
        'System backup completed successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Failed to backup system', 'error');
    }
  }

  async logout() {
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      await this.toastService.showToast('Logged out successfully', 'success');
      // TODO: Redirect to login page
    } catch (error) {
      await this.toastService.showToast('Failed to logout', 'error');
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
