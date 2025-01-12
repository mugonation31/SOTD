import { Component } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
} from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  gridOutline,
  peopleOutline,
  footballOutline,
  settingsOutline,
  peopleCircleOutline,
  personOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-group-admin-layout',
  template: `
    <div class="page-wrapper">
      <ion-header>
        <ion-toolbar>
          <div
            class="logo-container"
            (click)="navigateTo('/group-admin/dashboard')"
          >
            <ion-icon name="football-outline" class="football-icon"></ion-icon>
            <div class="logo-text">
              <span class="logo-sotd">SOTD</span>
              <span class="logo-subtitle">Scores On The Doors</span>
            </div>
          </div>
          <ion-buttons slot="end">
            <ion-button (click)="navigateTo('/group-admin/settings')">
              <ion-icon name="person-outline" class="profile-icon"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-tabs>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="dashboard">
            <ion-icon name="grid-outline"></ion-icon>
            <ion-label>Dashboard</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="members">
            <ion-icon name="people-outline"></ion-icon>
            <ion-label>Members</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="predictions">
            <ion-icon name="football-outline"></ion-icon>
            <ion-label>Predictions</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="groups">
            <ion-icon name="people-circle-outline"></ion-icon>
            <ion-label>Groups</ion-label>
          </ion-tab-button>
        </ion-tab-bar>

        <ion-router-outlet></ion-router-outlet>
      </ion-tabs>
    </div>
  `,
  styles: [
    `
      .page-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .logo-container {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        cursor: pointer;
      }

      .football-icon {
        font-size: 24px;
        color: var(--ion-color-primary);
      }

      .logo-text {
        display: flex;
        flex-direction: column;
      }

      .logo-sotd {
        font-size: 18px;
        font-weight: 600;
        color: var(--ion-color-dark);
      }

      .logo-subtitle {
        font-size: 12px;
        color: var(--ion-color-medium);
      }

      .profile-icon {
        font-size: 20px;
      }
    `,
  ],
  standalone: true,
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    RouterModule,
  ],
})
export class GroupAdminLayoutPage {
  constructor(private router: Router) {
    addIcons({
      gridOutline,
      peopleOutline,
      footballOutline,
      settingsOutline,
      peopleCircleOutline,
      personOutline,
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
