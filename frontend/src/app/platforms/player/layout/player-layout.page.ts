import { Component } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  gridOutline,
  footballOutline,
  analyticsOutline,
  trophyOutline,
  peopleCircleOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-player-layout',
  templateUrl: './player-layout.page.html',
  styleUrls: ['./player-layout.page.scss'],
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
      gridOutline,
      footballOutline,
      analyticsOutline,
      trophyOutline,
      peopleCircleOutline,
    });
  }
}
