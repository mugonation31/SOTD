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
  footballOutline,
  gridOutline,
  peopleOutline,
  logOutOutline,
} from 'ionicons/icons';
import { AuthService } from '@core/services/auth.service';

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
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    addIcons({
      footballOutline,
      gridOutline,
      peopleOutline,
      logOutOutline,
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path], { replaceUrl: true });
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
