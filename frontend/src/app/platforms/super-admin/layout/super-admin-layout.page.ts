import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonApp,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonMenu,
  IonContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  gridOutline,
  layersOutline,
  peopleOutline,
  statsChartOutline,
  settingsOutline,
  homeOutline,
  personAddOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-super-admin-layout',
  templateUrl: './super-admin-layout.page.html',
  styleUrls: ['./super-admin-layout.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonApp,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonMenu,
    IonContent,
  ],
})
export class SuperAdminLayoutPage {
  constructor() {
    addIcons({
      gridOutline,
      layersOutline,
      peopleOutline,
      statsChartOutline,
      settingsOutline,
      homeOutline,
      personAddOutline,
    });
  }
}
