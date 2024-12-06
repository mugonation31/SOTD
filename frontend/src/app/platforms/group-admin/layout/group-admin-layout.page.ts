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
  gridOutline,
  peopleOutline,
  footballOutline,
  settingsOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-group-admin-layout',
  templateUrl: './group-admin-layout.page.html',
  styleUrls: ['./group-admin-layout.page.scss'],
  standalone: true,
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
  ],
})
export class GroupAdminLayoutPage {
  constructor() {
    addIcons({
      gridOutline,
      peopleOutline,
      footballOutline,
      settingsOutline,
    });
  }
}
