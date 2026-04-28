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
  IonTitle,
} from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  gridOutline,
  peopleOutline,
  footballOutline,
  peopleCircleOutline,
  personOutline,
  eyeOutline,
  addCircleOutline,
  calendarOutline,
  personCircleOutline,
  trophyOutline,
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
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    RouterModule,
  ],
})
export class GroupAdminLayoutPage {
  constructor(private router: Router) {
    addIcons({
      homeOutline,
      gridOutline,
      peopleOutline,
      footballOutline,
      peopleCircleOutline,
      personOutline,
      eyeOutline,
      addCircleOutline,
      calendarOutline,
      personCircleOutline,
      trophyOutline,
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path], { replaceUrl: true });
  }
}
