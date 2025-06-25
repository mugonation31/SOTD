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
      // Check if user has the right role for group creation
      const userRole = this.authService.getUserRole();
      if (userRole === 'group-admin' || userRole === 'super-admin') {
      this.router.navigate(['/group-admin/groups']);
      } else {
        // User is authenticated but doesn't have group-admin role
        // They need to signup as group-admin
        this.router.navigate(['/auth/signup'], {
          queryParams: { 
            role: 'group-admin',
            returnUrl: '/group-admin/groups' 
          }
        });
      }
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
      // Authenticated users who want to join groups always go to player journey
      this.router.navigate(['/player/join-group']);
    } else {
      // Not authenticated - go to signup as player first
      this.router.navigate(['/auth/signup'], {
        queryParams: { 
          role: 'player',
          returnUrl: '/player/join-group' 
        }
      });
    }
  }

  login() {
    this.router.navigate(['/auth/login']);
  }
} 