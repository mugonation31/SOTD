import { Component } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  footballOutline,
  checkmarkDoneOutline,
  trophyOutline,
  peopleOutline,
} from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-player-layout',
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="dashboard">
          <ion-icon name="home-outline"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="matches">
          <ion-icon name="football-outline"></ion-icon>
          <ion-label>Matches</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="predictions">
          <ion-icon name="checkmark-done-outline"></ion-icon>
          <ion-label>Predictions</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="standings">
          <ion-icon name="trophy-outline"></ion-icon>
          <ion-label>Standings</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="groups">
          <ion-icon name="people-outline"></ion-icon>
          <ion-label>Groups</ion-label>
        </ion-tab-button>
      </ion-tab-bar>

      <ion-router-outlet></ion-router-outlet>
    </ion-tabs>
  `,
  standalone: true,
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    RouterModule,
  ],
})
export class PlayerLayoutPage {
  constructor() {
    addIcons({
      homeOutline,
      footballOutline,
      checkmarkDoneOutline,
      trophyOutline,
      peopleOutline,
    });
  }
}
