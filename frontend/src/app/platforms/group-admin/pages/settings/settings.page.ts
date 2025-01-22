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
  cameraOutline,
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-segment [(ngModel)]="activeTab" class="ion-margin-bottom">
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
      <div *ngIf="activeTab === 'profile'">
        <ion-card>
          <ion-card-content>
            <!-- Profile Picture (Centered) -->
            <div class="profile-picture-section">
              <div class="profile-picture-container">
                <div class="profile-picture">
                  <ng-container *ngIf="profilePicture; else defaultProfileIcon">
                    <img [src]="profilePicture" alt="Profile Picture" />
                  </ng-container>
                  <ng-template #defaultProfileIcon>
                    <ion-icon
                      name="person-outline"
                      class="default-profile-icon"
                    ></ion-icon>
                  </ng-template>
                </div>
                <div class="camera-icon" (click)="fileInput.click()">
                  <ion-icon name="camera-outline"></ion-icon>
                </div>
                <input
                  #fileInput
                  type="file"
                  accept="image/*"
                  (change)="onFileSelected($event)"
                  style="display: none"
                />
              </div>
            </div>

            <!-- Profile Information (Left-aligned) -->
            <div class="profile-info-section">
              <ion-item>
                <ion-label position="stacked">Name</ion-label>
                <ion-input
                  [(ngModel)]="profile.name"
                  placeholder="Your name"
                ></ion-input>
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
                <ion-input
                  [(ngModel)]="profile.phone"
                  type="tel"
                  placeholder="Your phone number"
                ></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Role</ion-label>
                <ion-input [(ngModel)]="profile.role" readonly></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Joined Date</ion-label>
                <ion-input
                  [(ngModel)]="profile.joinedDate"
                  readonly
                ></ion-input>
              </ion-item>

              <ion-button
                expand="block"
                (click)="updateProfile()"
                class="ion-margin-top"
              >
                Update Profile
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="key-outline"></ion-icon>
              Change Password
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="form-section">
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
                <ion-label position="stacked">Confirm New Password</ion-label>
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
            </div>
          </ion-card-content>
        </ion-card>

        <ion-button
          expand="block"
          color="danger"
          (click)="logout()"
          class="ion-margin-top"
        >
          <ion-icon name="log-out-outline" slot="start"></ion-icon>
          Logout
        </ion-button>
      </div>

      <!-- Settings Tab -->
      <div *ngIf="activeTab === 'settings'">
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

        <!-- Notification Settings -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="notifications-outline"></ion-icon>
              Notification Preferences
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label>Email Notifications</ion-label>
              <ion-toggle
                [(ngModel)]="
                  groupSettings.notificationPreferences.emailNotifications
                "
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Prediction Reminders</ion-label>
              <ion-toggle
                [(ngModel)]="
                  groupSettings.notificationPreferences.predictionReminders
                "
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Result Notifications</ion-label>
              <ion-toggle
                [(ngModel)]="
                  groupSettings.notificationPreferences.resultNotifications
                "
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Member Updates</ion-label>
              <ion-toggle
                [(ngModel)]="
                  groupSettings.notificationPreferences.memberUpdates
                "
              ></ion-toggle>
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
      .profile-picture-section {
        display: flex;
        justify-content: center;
        margin-bottom: 24px;
      }

      .profile-picture-container {
        position: relative;
        width: 120px;
        height: 120px;
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
        border: 1px solid var(--ion-color-medium-shade);
      }

      .profile-picture img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .default-profile-icon {
        font-size: 48px;
        color: var(--ion-color-medium);
      }

      .camera-icon {
        position: absolute;
        bottom: 0;
        right: 0;
        background: white;
        border: 1px solid var(--ion-color-medium-shade);
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .camera-icon ion-icon {
        font-size: 18px;
        color: var(--ion-color-dark);
      }

      .profile-info-section,
      .form-section {
        max-width: 100%;
      }

      ion-item {
        --padding-start: 0;
        --inner-padding-end: 0;
        --background: transparent;
        margin-bottom: 16px;
      }

      ion-card {
        margin: 0 0 16px 0;
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

      ion-button {
        margin: 8px 0;
      }

      @media (max-width: 576px) {
        ion-card-header {
          padding: 12px;
        }

        ion-card-content {
          padding: 12px;
        }
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
    IonSegment,
    IonSegmentButton,
    NgIf,
    FormsModule,
  ],
})
export class SettingsPage {
  activeTab = 'profile';
  profilePicture: string | null = null;
  profile = {
    name: 'John Smith',
    email: 'john.smith@groupadmin.com',
    phone: '+44 7123 456789',
    role: 'Group Admin',
    joinedDate: '2024-01-01',
  };

  passwordForm = {
    current: '',
    new: '',
    confirm: '',
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
    notificationPreferences: {
      emailNotifications: true,
      predictionReminders: true,
      resultNotifications: true,
      memberUpdates: true,
    },
  };

  constructor(private router: Router, private toastService: ToastService) {
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
      cameraOutline,
    });
  }

  async onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      await this.toastService.showToast('Please select an image file', 'error');
      return;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      await this.toastService.showToast('Image must be less than 5MB', 'error');
      return;
    }

    try {
      // Create a preview of the image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profilePicture = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      // TODO: Upload the file to your server
      // This is where you would typically make an API call to upload the image
      await this.simulateUpload();
      await this.toastService.showToast(
        'Profile picture updated successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast(
        'Error uploading profile picture',
        'error'
      );
      // Reset the profile picture if upload fails
      this.profilePicture = null;
    }
  }

  private async simulateUpload(): Promise<void> {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  async updateProfile() {
    try {
      // TODO: Implement actual profile update
      await this.toastService.showToast(
        'Profile updated successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error updating profile', 'error');
    }
  }

  async changePassword() {
    if (!this.passwordForm.current) {
      await this.toastService.showToast(
        'Current password is required',
        'error'
      );
      return;
    }

    if (this.passwordForm.new !== this.passwordForm.confirm) {
      await this.toastService.showToast('New passwords do not match', 'error');
      return;
    }

    try {
      // TODO: Implement actual password change
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
      // TODO: Implement settings save
      await this.toastService.showToast(
        'Settings saved successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error saving settings', 'error');
    }
  }

  async logout() {
    try {
      // TODO: Implement proper logout
      await this.toastService.showToast('Logging out...', 'warning');
      this.router.navigate(['/group-admin/login']);
    } catch (error) {
      await this.toastService.showToast('Error during logout', 'error');
    }
  }
}
