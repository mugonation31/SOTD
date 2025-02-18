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
  settingsOutline,
  personOutline,
  footballOutline,
  gridOutline,
  layersOutline,
  statsChartOutline,
  peopleOutline,
  personAddOutline,
  speedometerOutline,
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
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    RouterModule,
  ],
})
export class SuperAdminLayoutPage {
  constructor(private router: Router) {
    addIcons({
      settingsOutline,
      personOutline,
      footballOutline,
      gridOutline,
      layersOutline,
      statsChartOutline,
      peopleOutline,
      personAddOutline,
      speedometerOutline,
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path], { replaceUrl: true });
  }
}
