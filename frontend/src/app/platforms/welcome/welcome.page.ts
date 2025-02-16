import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  peopleCircleOutline,
  trophyOutline,
  statsChartOutline,
  timeOutline,
  footballOutline,
  personOutline,
  arrowForwardOutline,
  peopleOutline,
  personAddOutline,
} from 'ionicons/icons';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonButtons,
    NgFor,
  ],
})
export class WelcomePage implements OnInit {
  user: any = null;

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

  constructor(private authService: AuthService, private router: Router) {
    addIcons({
      peopleCircleOutline,
      trophyOutline,
      statsChartOutline,
      timeOutline,
      footballOutline,
      personOutline,
      arrowForwardOutline,
      peopleOutline,
      personAddOutline,
    });
  }

  ngOnInit() {
    this.user = this.authService.currentUserValue?.user;
    if (!this.user) {
      this.router.navigate(['/auth/login']);
    }
  }

  createGroup() {
    this.router.navigate(['/group-admin/create']);
  }

  joinGroup() {
    this.router.navigate(['/join-group']);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
