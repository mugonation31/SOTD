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
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonButtons,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  peopleCircleOutline,
  arrowForwardOutline,
  footballOutline,
  personOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-join-group',
  template: `
    <ion-header>
      <ion-toolbar>
        <div class="logo-container" (click)="navigateTo('/player/dashboard')">
          <ion-icon name="football-outline" class="football-icon"></ion-icon>
          <div class="logo-text">
            <span class="logo-sotd">SOTD</span>
            <span class="logo-subtitle">Predict 3</span>
          </div>
        </div>
        <ion-buttons slot="end">
          <ion-button (click)="navigateTo('/player/settings')">
            <ion-icon name="person-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            <ion-icon name="people-circle-outline"></ion-icon>
            Join a Group
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p class="description">
            Enter a group code to join an existing prediction group
          </p>
          <div class="join-form">
            <ion-input
              type="text"
              [(ngModel)]="groupCode"
              placeholder="Enter group code"
              class="group-code-input"
            ></ion-input>
            <ion-button
              expand="block"
              (click)="joinGroup()"
              [disabled]="!groupCode"
            >
              <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>
              Join Group
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styles: [
    `
      // Logo Styles
      .logo-container {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        cursor: pointer;

        .football-icon {
          font-size: 24px;
          color: var(--ion-color-primary);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;

          .logo-sotd {
            font-size: 16px;
            font-weight: 600;
            color: var(--ion-color-dark);
          }

          .logo-subtitle {
            font-size: 12px;
            color: var(--ion-color-medium);
          }
        }
      }

      ion-buttons {
        ion-button {
          --padding-start: 8px;
          --padding-end: 8px;
          height: 36px;
        }

        ion-icon {
          font-size: 18px;
          color: var(--ion-color-medium);
        }
      }

      // Existing styles
      ion-card {
        margin: 0;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      ion-card-header {
        padding: 16px;

        ion-card-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.2rem;
          font-weight: 600;

          ion-icon {
            font-size: 1.4rem;
            color: var(--ion-color-primary);
          }
        }
      }

      .description {
        color: var(--ion-color-medium);
        margin-bottom: 24px;
        font-size: 0.95rem;
        line-height: 1.4;
      }

      .join-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .group-code-input {
        --background: var(--ion-color-light);
        --padding-start: 16px;
        --padding-end: 16px;
        --padding-top: 12px;
        --padding-bottom: 12px;
        border-radius: 8px;
        font-size: 1rem;
      }

      ion-button {
        margin: 0;
        height: 48px;
        --border-radius: 8px;
        font-weight: 500;
        font-size: 1rem;

        ion-icon {
          font-size: 1.2rem;
          margin-left: 8px;
        }
      }
    `,
  ],
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
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonButtons,
    FormsModule,
  ],
})
export class JoinGroupPage {
  groupCode: string = '';

  constructor(private router: Router) {
    addIcons({
      peopleCircleOutline,
      arrowForwardOutline,
      footballOutline,
      personOutline,
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  joinGroup() {
    // TODO: Implement group joining logic
    console.log('Joining group with code:', this.groupCode);
  }
}
