import { Component } from '@angular/core';
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonLabel,
  IonTitle,
  IonRouterOutlet,
  IonFooter,
  IonContent,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  settingsOutline,
  personOutline,
  footballOutline,
  logoTwitter,
  logoFacebook,
  logoInstagram,
} from 'ionicons/icons';

@Component({
  selector: 'app-super-admin-layout',
  template: `
    <div class="page-wrapper">
      <ion-header>
        <ion-toolbar>
          <div class="logo-container" routerLink="/super-admin/dashboard">
            <ion-icon name="football-outline" class="football-icon"></ion-icon>
            <div class="logo-text">
              <span class="logo-sotd">SOTD</span>
              <span class="logo-subtitle">Scores On The Doors</span>
            </div>
          </div>
          <ion-buttons slot="end">
            <ion-button routerLink="/super-admin/settings">
              <ion-icon name="person-outline" class="profile-icon"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <div class="content-wrapper">
          <div class="main-content">
            <ion-router-outlet></ion-router-outlet>
          </div>

          <ion-footer class="footer-container">
            <ion-toolbar>
              <div class="footer-content">
                <nav class="footer-nav">
                  <a href="/about">About</a>
                  <span>•</span>
                  <a href="/contact">Contact</a>
                  <span>•</span>
                  <a href="/help">Help</a>
                  <span>•</span>
                  <a href="/privacy">Privacy</a>
                </nav>
                <div class="social">
                  <a href="https://twitter.com/sotd" target="_blank">
                    <ion-icon name="logo-twitter"></ion-icon>
                  </a>
                  <a href="https://facebook.com/sotd" target="_blank">
                    <ion-icon name="logo-facebook"></ion-icon>
                  </a>
                  <a href="https://instagram.com/sotd" target="_blank">
                    <ion-icon name="logo-instagram"></ion-icon>
                  </a>
                </div>
                <div class="copyright">
                  © {{ getCurrentYear() }} Scores On The Doors
                </div>
              </div>
            </ion-toolbar>
          </ion-footer>
        </div>
      </ion-content>
    </div>
  `,
  styles: [
    `
      .page-wrapper {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background: white;
      }

      .content-wrapper {
        min-height: 100%;
        display: flex;
        flex-direction: column;
        padding-right: calc(100vw - 100%);
      }

      .main-content {
        flex: 1;
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }

      .footer-container {
        position: relative !important;
        margin-top: auto;
        width: 100%;
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
        font-size: 20px;
        font-weight: 700;
        color: var(--ion-color-primary);
      }

      .logo-subtitle {
        font-size: 10px;
        color: var(--ion-color-medium);
      }

      .profile-icon {
        font-size: 20px;
      }

      .footer-content {
        text-align: center;
        padding: 1rem;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }

      .footer-nav {
        margin-bottom: 1rem;
      }

      .footer-nav a {
        color: var(--ion-color-medium);
        text-decoration: none;
        padding: 0 0.5rem;
        font-size: 0.9rem;
      }

      .footer-nav span {
        color: var(--ion-color-medium);
        font-size: 0.8rem;
      }

      .social {
        margin: 0.5rem 0;
      }

      .social a {
        color: var(--ion-color-medium);
        margin: 0 0.5rem;
        font-size: 1.2rem;
      }

      .copyright {
        color: var(--ion-color-medium);
        font-size: 0.8rem;
      }

      .footer-nav a:hover,
      .social a:hover {
        color: var(--ion-color-primary);
      }
    `,
  ],
  standalone: true,
  imports: [
    IonApp,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonLabel,
    IonTitle,
    IonRouterOutlet,
    IonFooter,
    IonContent,
    RouterModule,
  ],
})
export class SuperAdminLayoutPage {
  constructor() {
    addIcons({
      settingsOutline,
      personOutline,
      footballOutline,
      logoTwitter,
      logoFacebook,
      logoInstagram,
    });
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
