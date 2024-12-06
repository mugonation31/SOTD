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

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
    RouterLink,
    FormsModule,
  ],
})
export class LoginPage {
  loginData = {
    email: '',
    password: '',
  };

  constructor() {
    addIcons({ logoGoogle, logoFacebook, logoTwitter, logoInstagram });
  }

  onLogin() {
    console.log('Login data:', this.loginData);
  }
}
