import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonIcon,
  IonItem,
  IonList,
  IonCard,
  IonCardContent,
  IonText,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  logoGoogle,
  logoFacebook,
  logoTwitter,
  logoInstagram,
} from 'ionicons/icons';
import { AuthService, UserRole } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonIcon,
    IonItem,
    IonList,
    IonCard,
    IonCardContent,
    IonText,
    IonSelect,
    IonSelectOption,
    RouterLink,
    FormsModule,
  ],
})
export class SignupPage {
  signupData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'player' as UserRole,
  };

  constructor(private authService: AuthService) {
    addIcons({
      logoGoogle,
      logoFacebook,
      logoTwitter,
      logoInstagram,
    });
  }

  onSignup() {
    if (this.signupData.password !== this.signupData.confirmPassword) {
      // TODO: Show error message
      console.error('Passwords do not match');
      return;
    }

    this.authService.signup(this.signupData);
  }
}
