import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonList,
  IonCard,
  IonCardContent,
  IonText,
  IonIcon,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { footballOutline } from 'ionicons/icons';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonList,
    IonCard,
    IonCardContent,
    IonText,
    IonIcon,
    RouterLink,
    FormsModule,
  ],
})
export class OtpPage {
  otp: string = '';

  constructor(private router: Router) {
    addIcons({ footballOutline });
  }

  onVerify() {
  }

  resendOTP() {
  }

  navigateToWelcome() {
    this.router.navigate(['/welcome']);
  }
}
