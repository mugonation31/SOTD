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
  saveOutline, peopleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';
import { AuthService } from '@core/services/auth.service';

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
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
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

  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService
  ) {
    addIcons({personCircleOutline,settingsOutline,personOutline,cameraOutline,shieldOutline,statsChartOutline,peopleOutline,footballOutline,checkmarkCircleOutline,timeOutline,saveOutline,keyOutline,logOutOutline,trophyOutline,timerOutline,notificationsCircleOutline,globeOutline,notificationsOutline,alertCircleOutline,calendarOutline,mailOutline,});
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
      // Mark first login as complete since user is logging out from first-time page
      this.authService.markFirstLoginComplete();
      
      // Perform logout
      this.authService.logout();
      
      await this.toastService.showToast('Logged out successfully', 'success');
      
      // Redirect to login page WITHOUT any returnUrl or query parameters
      // This ensures clean navigation and the logo will go to welcome page
      this.router.navigate(['/auth/login'], { 
        replaceUrl: true,
        queryParams: {} // Clear any existing query parameters
      });
    } catch (error) {
      console.error('Logout error:', error);
      await this.toastService.showToast('Error during logout', 'error');
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
