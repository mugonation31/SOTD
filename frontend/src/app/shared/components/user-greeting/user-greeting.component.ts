import { Component, OnInit } from '@angular/core';
import { IonText, IonIcon } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-greeting',
  template: `
    <div class="greeting-container" *ngIf="greeting">
      <div class="greeting-content">
        <ion-icon name="person-circle-outline" class="greeting-icon"></ion-icon>
        <ion-text class="greeting-text">{{ greeting }}</ion-text>
      </div>
    </div>
  `,
  styles: [
    `
      .greeting-container {
        padding: 12px 16px;
        background: linear-gradient(135deg, var(--ion-color-primary-tint) 0%, var(--ion-color-primary) 100%);
        border-radius: 12px;
        margin-bottom: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        animation: slideInFade 0.6s ease-out;
      }

      .greeting-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .greeting-icon {
        font-size: 24px;
        color: white;
        opacity: 0.9;
      }

      .greeting-text {
        color: white;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 0.5px;
      }

      @keyframes slideInFade {
        0% {
          opacity: 0;
          transform: translateY(-10px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Responsive design */
      @media (max-width: 576px) {
        .greeting-container {
          padding: 10px 14px;
          margin-bottom: 12px;
        }

        .greeting-text {
          font-size: 15px;
        }

        .greeting-icon {
          font-size: 22px;
        }
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        .greeting-container {
          background: linear-gradient(135deg, var(--ion-color-primary-shade) 0%, var(--ion-color-primary-tint) 100%);
        }
      }
    `,
  ],
  standalone: true,
  imports: [IonText, IonIcon, NgIf],
})
export class UserGreetingComponent implements OnInit {
  greeting: string = '';

  constructor(private authService: AuthService) {
    addIcons({ personCircleOutline });
  }

  ngOnInit() {
    this.greeting = this.authService.getPersonalizedGreeting();
  }
} 