import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonTextarea,
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
  IonButtons,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, cloudUploadOutline } from 'ionicons/icons';

@Component({
  selector: 'app-bulk-invite-modal',
  templateUrl: './bulk-invite-modal.component.html',
  styleUrls: ['./bulk-invite-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonTextarea,
    IonItem,
    IonLabel,
    IonNote,
    IonIcon,
    IonButtons,
  ],
})
export class BulkInviteModalComponent {
  emailList: string = '';
  validationResults: Array<{
    email: string;
    isValid: boolean;
    message: string;
  }> = [];

  constructor(private modalCtrl: ModalController) {
    addIcons({
      closeOutline,
      cloudUploadOutline,
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  triggerFileInput() {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  async handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      try {
        const text = await file.text();
        const emails = text
          .split(/[\n,]/)
          .map((email: string) => email.trim())
          .filter((email: string) => email);
        this.emailList = emails.join('\n');
        this.validateEmails();
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  }

  validateEmails() {
    const emails = this.emailList
      .split('\n')
      .map((email) => email.trim())
      .filter((email) => email);

    this.validationResults = emails.map((email) => {
      const isValid = this.isValidEmail(email);
      return {
        email,
        isValid,
        message: isValid ? 'Valid' : 'Invalid email format',
      };
    });
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  hasValidEmails(): boolean {
    return this.validationResults.some((result) => result.isValid);
  }

  getValidEmailCount(): number {
    return this.validationResults.filter((result) => result.isValid).length;
  }

  processInvitations() {
    const validEmails = this.validationResults
      .filter((result) => result.isValid)
      .map((result) => result.email);

    this.modalCtrl.dismiss(validEmails);
  }
}
