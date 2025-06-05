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
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Bulk Invite Group Admins</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">
            <ion-icon name="close-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="upload-section">
        <ion-button expand="block" (click)="triggerFileInput()">
          <ion-icon name="cloud-upload-outline" slot="start"></ion-icon>
          Upload CSV File
        </ion-button>
        <input
          type="file"
          #fileInput
          accept=".csv"
          (change)="handleFileUpload($event)"
          style="display: none"
        />
        <ion-note>or</ion-note>
      </div>

      <ion-item>
        <ion-label position="stacked">
          Paste Email Addresses (one per line)
        </ion-label>
        <ion-textarea
          [(ngModel)]="emailList"
          rows="6"
          placeholder="john@example.com&#10;jane@example.com"
          class="email-textarea"
        ></ion-textarea>
      </ion-item>

      <div class="validation-summary" *ngIf="validationResults.length > 0">
        <h4>Validation Results:</h4>
        <ul>
          <li
            *ngFor="let result of validationResults"
            [class.valid]="result.isValid"
            [class.invalid]="!result.isValid"
          >
            {{ result.email }} - {{ result.message }}
          </li>
        </ul>
      </div>

      <div class="action-buttons">
        <ion-button
          expand="block"
          (click)="processInvitations()"
          [disabled]="!hasValidEmails()"
        >
          Send {{ getValidEmailCount() }} Invitations
        </ion-button>
        <ion-button expand="block" fill="outline" (click)="dismiss()">
          Cancel
        </ion-button>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .upload-section {
        text-align: center;
        margin-bottom: 1rem;

        ion-note {
          display: block;
          margin: 1rem 0;
          text-align: center;
        }
      }

      .email-textarea {
        --padding-top: 0.5rem;
        --padding-bottom: 0.5rem;
        margin-top: 0.5rem;
      }

      .validation-summary {
        margin: 1rem 0;

        h4 {
          margin: 0 0 0.5rem;
          color: var(--ion-color-medium);
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            padding: 0.25rem 0;
            font-size: 0.875rem;

            &.valid {
              color: var(--ion-color-success);
            }

            &.invalid {
              color: var(--ion-color-danger);
            }
          }
        }
      }

      .action-buttons {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
    `,
  ],
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
