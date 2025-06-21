import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-error-message',
  template: `
    <div class="error-container" *ngIf="error">
      <ion-card color="danger">
        <ion-card-header>
          <ion-card-title>{{ error.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>{{ error.message }}</p>
          <ion-button *ngIf="error.retry" (click)="retryAction()">
            Retry
          </ion-button>
        </ion-card-content>
      </ion-card>
    </div>
  `,
  styles: [
    `
      .error-container {
        padding: 1rem;
        text-align: center;
      }
    `,
  ],
  standalone: true,
  imports: [
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    CommonModule,
  ],
})
export class ErrorMessageComponent {
  @Input() error?: {
    title: string;
    message: string;
    retry?: boolean;
  };
  @Output() retry = new EventEmitter<void>();

  retryAction() {
    this.retry.emit();
  }
}
