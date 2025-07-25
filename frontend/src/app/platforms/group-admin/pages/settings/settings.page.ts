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
  IonNote,
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
  cameraOutline,
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

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
    IonNote,
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
    visibility: 'public',
    showLeaderboard: true,
    enableGroupChat: false,
    pointsSystem: 'standard',
    customPoints: {
      correctScore: 60,
      correctResult: 30,
      participation: 10,
    },
    jokerRules: 'once',
    notificationPreferences: {
      emailNotifications: true,
      predictionReminders: true,
      resultNotifications: true,
      memberUpdates: false,
    },
  };

  constructor(private router: Router, private toastService: ToastService, private authService: AuthService) {
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
      cameraOutline,
    });
  }

  async onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (file) {
      try {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          await this.toastService.showToast('Please select an image file', 'error');
          return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          await this.toastService.showToast('File size must be less than 5MB', 'error');
          return;
        }

        // Show loading state
        await this.toastService.showToast('Uploading image...', 'success');

        // Simulate upload process
        await this.simulateUpload();

        // Create preview URL
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profilePicture = e.target?.result as string;
        };
        reader.readAsDataURL(file);

        await this.toastService.showToast('Profile picture updated successfully!', 'success');
      } catch (error) {
        console.error('Error uploading file:', error);
        await this.toastService.showToast('Error uploading image. Please try again.', 'error');
      }
    }
  }

  private async simulateUpload(): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  async updateProfile() {
    try {
      await this.toastService.showToast('Profile updated successfully!', 'success');
    } catch (error) {
      await this.toastService.showToast('Error updating profile. Please try again.', 'error');
    }
  }

  async changePassword() {
    if (!this.passwordForm.current || !this.passwordForm.new || !this.passwordForm.confirm) {
      await this.toastService.showToast('Please fill in all password fields', 'error');
      return;
    }

    if (this.passwordForm.new !== this.passwordForm.confirm) {
      await this.toastService.showToast('New passwords do not match', 'error');
      return;
    }

    if (this.passwordForm.new.length < 8) {
      await this.toastService.showToast('New password must be at least 8 characters', 'error');
      return;
    }

    try {
      // Simulate password change
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.toastService.showToast('Password changed successfully!', 'success');
      
      // Clear form
      this.passwordForm = {
        current: '',
        new: '',
        confirm: '',
      };
    } catch (error) {
      await this.toastService.showToast('Error changing password. Please try again.', 'error');
    }
  }

  onPointsSystemChange() {
    if (this.groupSettings.pointsSystem === 'standard') {
      this.groupSettings.customPoints = {
        correctScore: 60,
        correctResult: 30,
        participation: 10,
      };
    }
  }

  calculatePointsTotal(): number {
    return (
      this.groupSettings.customPoints.correctScore +
      this.groupSettings.customPoints.correctResult +
      this.groupSettings.customPoints.participation
    );
  }

  validatePointsTotal() {
    const total = this.calculatePointsTotal();
    if (total !== 100) {
      console.log(`Points total is ${total}%, should be 100%`);
    }
  }

  async saveSettings() {
    try {
      // Validate custom points if using custom system
      if (this.groupSettings.pointsSystem === 'custom') {
        const total = this.calculatePointsTotal();
        if (total !== 100) {
          await this.toastService.showToast('Custom points must total 100%', 'error');
          return;
        }
      }

      // Simulate saving settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.toastService.showToast('Settings saved successfully!', 'success');
    } catch (error) {
      await this.toastService.showToast('Error saving settings. Please try again.', 'error');
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      await this.toastService.showToast('Logged out successfully', 'success');
      this.router.navigate(['/auth/login']);
    } catch (error) {
      await this.toastService.showToast('Error logging out. Please try again.', 'error');
    }
  }
}
