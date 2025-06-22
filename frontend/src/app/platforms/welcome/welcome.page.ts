import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { NgFor } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  personAddOutline,
  footballOutline,
  trophyOutline,
  starOutline,
  cashOutline,
  logInOutline,
} from 'ionicons/icons';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonButton,
    IonButtons,
    NgFor,
  ],
})
export class WelcomePage {
  howItWorks = [
    {
      icon: 'people-outline',
      title: 'Create or Join',
      description: 'Start a new group or join an existing one',
    },
    {
      icon: 'football-outline',
      title: 'Make Predictions',
      description: 'Predict match outcomes for each gameweek',
    },
    {
      icon: 'trophy-outline',
      title: 'Compete',
      description: 'Earn points and climb the leaderboard',
    },
  ];

  features = [
    {
      icon: 'star-outline',
      title: 'Multiple Groups',
      description: 'Join different groups with friends or colleagues',
    },
    {
      icon: 'cash-outline',
      title: 'Prize Pools',
      description: 'Optional entry fees and prize distributions',
    },
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    addIcons({
      peopleOutline,
      personAddOutline,
      footballOutline,
      trophyOutline,
      starOutline,
      cashOutline,
      logInOutline,
    });
  }

  createGroup() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/group-admin/groups']);
    } else {
      this.router.navigate(['/auth/signup'], {
        queryParams: { 
          role: 'group-admin',
          returnUrl: '/group-admin/groups' 
        }
      });
    }
  }

  joinGroup() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/join-group']);
    } else {
      this.router.navigate(['/auth/signup'], {
        queryParams: { 
          role: 'player',
          returnUrl: '/join-group' 
        }
      });
    }
  }

  login() {
    this.router.navigate(['/auth/login']);
  }
} 