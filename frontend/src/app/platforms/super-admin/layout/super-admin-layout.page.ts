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
} from 'ionicons/icons';

@Component({
  selector: 'app-super-admin-layout',
  templateUrl: './super-admin-layout.page.html',
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
    });
  }
}
