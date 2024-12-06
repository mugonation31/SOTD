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
  peopleOutline,
  layersOutline,
  statsChartOutline,
  settingsOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-super-admin-layout',
  templateUrl: './super-admin-layout.page.html',
  styleUrls: ['./super-admin-layout.page.scss'],
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
export class SuperAdminLayoutPage {
  constructor() {
    addIcons({
      gridOutline,
      peopleOutline,
      layersOutline,
      statsChartOutline,
      settingsOutline,
    });
  }
}
