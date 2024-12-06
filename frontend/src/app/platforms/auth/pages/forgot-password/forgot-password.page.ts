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
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
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
    RouterLink,
    FormsModule,
  ],
})
export class ForgotPasswordPage {
  email: string = '';

  onSubmit() {
    console.log('Reset password for:', this.email);
  }
}
