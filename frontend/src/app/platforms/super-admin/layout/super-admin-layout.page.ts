import { Component } from '@angular/core';
import {
  IonApp,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonTitle,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  settingsOutline,
  gridOutline,
  layersOutline,
  statsChartOutline,
  peopleCircleOutline,
  personCircleOutline,
  personOutline,
  cogOutline,
  footballOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-super-admin-layout',
  template: `
    <ion-app>
      <ion-menu contentId="main-content">
        <!-- Menu content -->
      </ion-menu>

      <div class="ion-page" id="main-content">
        <ion-header>
          <ion-toolbar>
            <div class="logo-container" routerLink="/super-admin/dashboard">
              <ion-icon
                name="football-outline"
                class="football-icon"
              ></ion-icon>
              <div class="logo-text">
                <span class="logo-sotd">SOTD</span>
                <span class="logo-subtitle">Scores On The Doors</span>
              </div>
            </div>
            <ion-buttons slot="end">
              <ion-button routerLink="/super-admin/settings">
                <ion-icon name="person-outline" class="profile-icon"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-tabs>
          <!-- ... rest of the tabs content ... -->
        </ion-tabs>
      </div>
    </ion-app>
  `,
  styles: [
    `
      .logo-container {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        cursor: pointer;
        transition: opacity 0.2s ease;
      }

      .logo-container:hover {
        opacity: 0.8;
      }

      .football-icon {
        font-size: 24px;
        color: var(--ion-color-primary);
        animation: spin 4s linear infinite;
      }

      .logo-text {
        display: flex;
        flex-direction: column;
      }

      .logo-sotd {
        font-size: 20px;
        font-weight: 700;
        color: var(--ion-color-primary);
        letter-spacing: 2px;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
      }

      .logo-subtitle {
        font-size: 10px;
        color: var(--ion-color-medium);
        letter-spacing: 0.5px;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        25% {
          transform: rotate(10deg);
        }
        75% {
          transform: rotate(-10deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }

      .profile-icon {
        font-size: 20px;
      }
    `,
  ],
  standalone: true,
  imports: [
    IonApp,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonTitle,
    RouterModule,
  ],
})
export class SuperAdminLayoutPage {
  constructor() {
    addIcons({
      settingsOutline,
      gridOutline,
      layersOutline,
      statsChartOutline,
      peopleCircleOutline,
      personCircleOutline,
      personOutline,
      cogOutline,
      footballOutline,
    });
  }
}
