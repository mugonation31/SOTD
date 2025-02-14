import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  peopleCircleOutline,
  trophyOutline,
  statsChartOutline,
  timeOutline,
  footballOutline,
  personOutline,
  arrowForwardOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-welcome',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="logo-container">
          <ion-icon name="football-outline" class="football-icon"></ion-icon>
          <div class="logo-text">
            <span class="logo-sotd">SOTD</span>
            <span class="logo-subtitle">Predict 3</span>
          </div>
        </div>
        <ion-buttons slot="end">
          <ion-button fill="clear" (click)="navigateTo('/auth/login')">
            Login
          </ion-button>
          <ion-button
            fill="solid"
            color="primary"
            (click)="navigateTo('/auth/register')"
          >
            Sign Up
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Hero Section -->
      <section class="hero-section">
        <h1>Premier League Predictions with Friends</h1>
        <p class="subtitle">
          Create or join prediction groups, compete for prizes, and climb the
          leaderboard
        </p>
        <div class="cta-buttons">
          <ion-button
            size="large"
            color="primary"
            (click)="navigateTo('/auth/register')"
          >
            Create a Group
            <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>
          </ion-button>
          <ion-button
            size="large"
            fill="outline"
            (click)="navigateTo('/auth/register')"
          >
            Join a Group
            <ion-icon name="people-circle-outline" slot="end"></ion-icon>
          </ion-button>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="how-it-works">
        <h2>How It Works</h2>
        <ion-grid>
          <ion-row>
            <ion-col size="12" size-md="4" *ngFor="let step of howItWorks">
              <ion-card>
                <ion-card-content>
                  <div class="step-icon">
                    <ion-icon [name]="step.icon"></ion-icon>
                  </div>
                  <h3>{{ step.title }}</h3>
                  <p>{{ step.description }}</p>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </section>

      <!-- Features Section -->
      <section class="features">
        <h2>Features</h2>
        <ion-grid>
          <ion-row>
            <ion-col size="12" size-md="6" *ngFor="let feature of features">
              <ion-card>
                <ion-card-content>
                  <div class="feature-icon">
                    <ion-icon [name]="feature.icon"></ion-icon>
                  </div>
                  <h3>{{ feature.title }}</h3>
                  <p>{{ feature.description }}</p>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </section>

      <!-- Footer -->
      <footer>
        <p>&copy; 2024 SOTD Predict 3. All rights reserved.</p>
      </footer>
    </ion-content>
  `,
  styles: [
    `
      // Header Styles
      ion-header {
        background: transparent;
        ion-toolbar {
          --background: transparent;
          --border-width: 0;
        }
      }

      .logo-container {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;

        .football-icon {
          font-size: 24px;
          color: var(--ion-color-primary);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;

          .logo-sotd {
            font-size: 16px;
            font-weight: 600;
            color: var(--ion-color-dark);
          }

          .logo-subtitle {
            font-size: 12px;
            color: var(--ion-color-medium);
          }
        }
      }

      // Hero Section
      .hero-section {
        text-align: center;
        padding: 48px 16px;
        max-width: 800px;
        margin: 0 auto;

        h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--ion-color-dark);
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .subtitle {
          font-size: 1.2rem;
          color: var(--ion-color-medium);
          margin-bottom: 32px;
          line-height: 1.5;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;

          ion-button {
            --padding-start: 24px;
            --padding-end: 24px;
            height: 48px;
            font-weight: 500;
          }
        }
      }

      // How It Works Section
      .how-it-works {
        padding: 48px 16px;
        background: var(--ion-color-light);
        border-radius: 24px;
        margin: 24px 0;

        h2 {
          text-align: center;
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 32px;
          color: var(--ion-color-dark);
        }

        ion-card {
          margin: 0;
          height: 100%;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

          ion-card-content {
            text-align: center;
            padding: 24px;
          }
        }

        .step-icon {
          width: 64px;
          height: 64px;
          background: var(--ion-color-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;

          ion-icon {
            font-size: 32px;
            color: white;
          }
        }

        h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 16px 0;
          color: var(--ion-color-dark);
        }

        p {
          color: var(--ion-color-medium);
          line-height: 1.5;
          margin: 0;
        }
      }

      // Features Section
      .features {
        padding: 48px 16px;

        h2 {
          text-align: center;
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 32px;
          color: var(--ion-color-dark);
        }

        ion-card {
          margin: 0;
          height: 100%;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-left: 4px solid var(--ion-color-primary);
          transition: transform 0.2s ease-in-out;

          &:hover {
            transform: translateY(-4px);
          }

          ion-card-content {
            padding: 24px;
          }
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          background: var(--ion-color-primary-tint);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;

          ion-icon {
            font-size: 24px;
            color: var(--ion-color-primary);
          }
        }

        h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 16px 0;
          color: var(--ion-color-dark);
        }

        p {
          color: var(--ion-color-medium);
          line-height: 1.5;
          margin: 0;
        }
      }

      // Footer
      footer {
        text-align: center;
        padding: 24px 16px;
        color: var(--ion-color-medium);
        font-size: 0.9rem;
      }

      // Responsive Adjustments
      @media (max-width: 768px) {
        .hero-section {
          h1 {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1.1rem;
          }
        }

        .how-it-works,
        .features {
          h2 {
            font-size: 1.8rem;
          }
        }
      }
    `,
  ],
})
export class WelcomePage {
  howItWorks = [
    {
      icon: 'people-circle-outline',
      title: 'Join or Create',
      description: 'Create your own group or join existing ones',
    },
    {
      icon: 'football-outline',
      title: 'Predict Matches',
      description: 'Make predictions for Premier League matches',
    },
    {
      icon: 'trophy-outline',
      title: 'Compete & Win',
      description: 'Score points and compete for prizes',
    },
  ];

  features = [
    {
      icon: 'trophy-outline',
      title: 'Prize Pools',
      description: 'Compete for cash prizes in premium groups',
    },
    {
      icon: 'stats-chart-outline',
      title: 'Leaderboards',
      description: 'Track your performance against friends',
    },
    {
      icon: 'people-circle-outline',
      title: 'Multiple Groups',
      description: 'Join different groups with varying stakes',
    },
    {
      icon: 'time-outline',
      title: 'Real-time Updates',
      description: 'Follow your predictions as matches unfold',
    },
  ];

  constructor(private router: Router) {
    addIcons({
      peopleCircleOutline,
      trophyOutline,
      statsChartOutline,
      timeOutline,
      footballOutline,
      personOutline,
      arrowForwardOutline,
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
