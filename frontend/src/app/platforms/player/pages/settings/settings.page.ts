import { Component } from '@angular/core';
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
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonInput,
  IonToggle,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonNote,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  personOutline,
  mailOutline,
  notificationsOutline,
  colorPaletteOutline,
  logOutOutline,
  footballOutline,
  personCircleOutline,
  keyOutline,
  phonePortraitOutline,
  settingsOutline,
  cameraOutline,
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-player-settings',
  template: `
    <ion-header>
      <ion-toolbar>
        <div class="logo-container" (click)="navigateTo('/player/dashboard')">
          <ion-icon name="football-outline" class="football-icon"></ion-icon>
          <div class="logo-text">
            <span class="logo-sotd">SOTD</span>
            <span class="logo-subtitle">Predict 3</span>
          </div>
        </div>
        <ion-buttons slot="end">
          <ion-button (click)="navigateTo('/player/settings')">
            <ion-icon name="person-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
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
            <!-- Profile Picture -->
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

            <!-- Profile Information -->
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
                [(ngModel)]="settings.notifications.email"
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Prediction Reminders</ion-label>
              <ion-toggle
                [(ngModel)]="settings.notifications.predictions"
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Result Notifications</ion-label>
              <ion-toggle
                [(ngModel)]="settings.notifications.results"
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Group Updates</ion-label>
              <ion-toggle
                [(ngModel)]="settings.notifications.groupUpdates"
              ></ion-toggle>
            </ion-item>
          </ion-card-content>
        </ion-card>

        <!-- App Settings -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon name="settings-outline"></ion-icon>
              App Settings
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label>Dark Mode</ion-label>
              <ion-toggle [(ngModel)]="settings.darkMode"></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-label>Language</ion-label>
              <ion-select [(ngModel)]="settings.language">
                <ion-select-option value="en">English</ion-select-option>
                <ion-select-option value="es">Spanish</ion-select-option>
                <ion-select-option value="fr">French</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-card-content>
        </ion-card>

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

      .logo-container {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        cursor: pointer;
      }

      .football-icon {
        font-size: 24px;
        color: var(--ion-color-primary);
      }

      .logo-text {
        display: flex;
        flex-direction: column;
        line-height: 1;
      }

      .logo-sotd {
        font-size: 16px;
        font-weight: 600;
        color: var(--ion-color-dark);
      }

      .logo-subtitle {
        font-size: 12px;
        color: var(--ion-color-medium);
      }

      ion-buttons {
        ion-button {
          --padding-start: 8px;
          --padding-end: 8px;
          height: 36px;
        }

        ion-icon {
          font-size: 18px;
          color: var(--ion-color-medium);
        }
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
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonInput,
    IonToggle,
    IonButtons,
    IonSegment,
    IonSegmentButton,
    IonSelect,
    IonSelectOption,
    FormsModule,
    NgIf,
    IonNote,
  ],
})
export class SettingsPage {
  activeTab = 'profile';
  profilePicture: string | null = null;
  profile = {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+44 7123 456789',
    role: 'Player',
    joinedDate: '2024-01-01',
  };

  passwordForm = {
    current: '',
    new: '',
    confirm: '',
  };

  settings = {
    notifications: {
      email: true,
      predictions: true,
      results: true,
      groupUpdates: true,
    },
    darkMode: false,
    language: 'en',
  };

  constructor(private router: Router, private toastService: ToastService, private authService: AuthService) {
    addIcons({
      personOutline,
      mailOutline,
      notificationsOutline,
      colorPaletteOutline,
      logOutOutline,
      footballOutline,
      personCircleOutline,
      keyOutline,
      phonePortraitOutline,
      settingsOutline,
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
      this.profilePicture = null;
    }
  }

  private async simulateUpload(): Promise<void> {
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
      // Mark first login as complete since user is logging out from first-time page
      this.authService.markFirstLoginComplete();
      
      // Perform logout
      this.authService.logout();
      
      await this.toastService.showToast('Logged out successfully', 'success');
      
      // Redirect to centralized auth login
      this.router.navigate(['/auth/login'], { replaceUrl: true });
    } catch (error) {
      console.error('Logout error:', error);
      await this.toastService.showToast('Error during logout', 'error');
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
