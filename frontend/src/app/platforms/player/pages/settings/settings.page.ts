import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
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
import { LoggerService } from '@core/services/logger.service';
import { SupabaseService } from '../../../../services/supabase.service';

@Component({
  selector: 'app-player-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  providers: [DatePipe],
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
export class SettingsPage implements OnInit {
  profilePicture: string | null = null;

  // Real profile state — populated in ngOnInit from Supabase. Defaults
  // are empty strings so template bindings never hit `undefined`.
  // `firstName` + `lastName` are split for the form; the underlying
  // profiles table stores them separately.
  profile = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    joinedDate: '',
    username: '',
  };
  isProfileLoading = true;
  isUpdatingProfile = false;
  profileUserId: string | null = null;

  passwordForm = {
    current: '',
    new: '',
    confirm: '',
  };

  constructor(
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService,
    private supabaseService: SupabaseService,
    private logger: LoggerService,
    private datePipe: DatePipe,
  ) {
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

  async ngOnInit(): Promise<void> {
    await this.loadProfile();
  }

  /**
   * Pull the caller's profile row from Supabase and bind it to the form.
   * Uses the same `profiles` query the rest of the app uses; relies on
   * the owner-only SELECT policy from migration 001.
   */
  private async loadProfile(): Promise<void> {
    this.isProfileLoading = true;
    try {
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser?.id) {
        this.router.navigate(['/auth/login']);
        return;
      }
      this.profileUserId = currentUser.id;

      const { data, error } = await this.supabaseService.client
        .from('profiles')
        .select('email, first_name, last_name, role, username, created_at, avatar_url')
        .eq('id', currentUser.id)
        .single();

      if (error || !data) {
        this.logger.error('player-settings.loadProfile', error ?? 'no row');
        await this.toastService.showToast('Could not load profile', 'error');
        return;
      }

      this.profile = {
        firstName: data.first_name ?? '',
        lastName: data.last_name ?? '',
        email: data.email ?? '',
        role: data.role ?? '',
        joinedDate:
          this.datePipe.transform(data.created_at, 'mediumDate') ?? '',
        username: data.username ?? '',
      };
      this.profilePicture = data.avatar_url ?? null;
    } catch (error) {
      this.logger.error('player-settings.loadProfile', error);
    } finally {
      this.isProfileLoading = false;
    }
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
    if (!this.profileUserId || this.isUpdatingProfile) return;
    this.isUpdatingProfile = true;
    try {
      // Only first_name and last_name are user-editable here. Email is
      // managed by Supabase Auth (changes require re-verification);
      // role + username + created_at are read-only by design — RLS on
      // profiles refuses role updates regardless.
      const { error } = await this.supabaseService.client
        .from('profiles')
        .update({
          first_name: this.profile.firstName.trim(),
          last_name: this.profile.lastName.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', this.profileUserId);

      if (error) {
        this.logger.error('player-settings.updateProfile', error);
        await this.toastService.showToast('Could not update profile', 'error');
        return;
      }
      await this.toastService.showToast('Profile updated', 'success');
    } catch (error) {
      this.logger.error('player-settings.updateProfile', error);
      await this.toastService.showToast('Error updating profile. Please try again.', 'error');
    } finally {
      this.isUpdatingProfile = false;
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
      // Real Supabase password update. Note: we don't ask Supabase to
      // verify the current password (it can't); the form UX still asks
      // for it as a basic mistake guard. Supabase enforces session
      // validity — if the user's session is stale they get an auth
      // error from updateUser anyway.
      const { error } = await this.supabaseService.client.auth.updateUser({
        password: this.passwordForm.new,
      });
      if (error) {
        this.logger.error('player-settings.changePassword', error);
        await this.toastService.showToast(
          error.message || 'Could not change password',
          'error',
        );
        return;
      }
      await this.toastService.showToast('Password changed', 'success');
      this.passwordForm = {
        current: '',
        new: '',
        confirm: '',
      };
    } catch (error) {
      this.logger.error('player-settings.changePassword', error);
      await this.toastService.showToast('Error changing password. Please try again.', 'error');
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

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
