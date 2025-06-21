import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  cashOutline,
  trophyOutline,
  statsChartOutline,
  timeOutline,
  peopleCircleOutline,
  footballOutline,
  eyeOutline,
  starOutline,
  checkmarkCircleOutline,
  mailOutline,
  flashOutline,
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';

interface TopPerformer {
  name: string;
  weekPoints: number;
  correctPredictions: number;
  usedJoker: boolean;
}

interface PendingMember {
  id: string;
  name: string;
  email: string;
}

interface CurrentGameweek {
  number: number;
  deadline: string;
  submittedCount: number;
  totalMembers: number;
  allSubmitted: boolean;
  pendingMembers: PendingMember[];
}

interface GroupStats {
  activeMembers: number;
  totalMembers: number;
  prizePool: number;
  paidMembers: number;
  jokersAvailable: number;
  jokersUsed: number;
  engagementRate: number;
  averagePoints: number;
  perfectScores: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
    RouterLink,
    DatePipe,
    CurrencyPipe,
    NgFor,
    NgIf,
  ],
})
export class DashboardPage {
  // Top Performers
  topPerformers: TopPerformer[] = [
    {
      name: 'John Smith',
      weekPoints: 19,
      correctPredictions: 3,
      usedJoker: true,
    },
    {
      name: 'Sarah Wilson',
      weekPoints: 16,
      correctPredictions: 2,
      usedJoker: false,
    },
    {
      name: 'Mike Johnson',
      weekPoints: 15,
      correctPredictions: 2,
      usedJoker: false,
    },
  ];

  // Current Gameweek Status
  currentGameweek: CurrentGameweek = {
    number: 15,
    deadline: '2024-01-20T11:30:00',
    submittedCount: 8,
    totalMembers: 12,
    allSubmitted: false,
    pendingMembers: [
      {
        id: '1',
        name: 'David Brown',
        email: 'david@example.com',
      },
      {
        id: '2',
        name: 'Emma Davis',
        email: 'emma@example.com',
      },
      {
        id: '3',
        name: 'James Wilson',
        email: 'james@example.com',
      },
      {
        id: '4',
        name: 'Lisa Anderson',
        email: 'lisa@example.com',
      },
    ],
  };

  // Group Statistics
  groupStats: GroupStats = {
    activeMembers: 10,
    totalMembers: 12,
    prizePool: 240,
    paidMembers: 10,
    jokersAvailable: 14,
    jokersUsed: 10,
    engagementRate: 85,
    averagePoints: 12.5,
    perfectScores: 5,
  };

  constructor(private router: Router, private toastService: ToastService) {
    addIcons({
      peopleOutline,
      cashOutline,
      trophyOutline,
      statsChartOutline,
      timeOutline,
      peopleCircleOutline,
      footballOutline,
      eyeOutline,
      starOutline,
      checkmarkCircleOutline,
      mailOutline,
      flashOutline,
    });
  }

  async sendReminder(member: PendingMember) {
    try {
      // Mock API call to send reminder
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await this.toastService.showToast(
        `Reminder sent to ${member.name}`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Failed to send reminder', 'danger');
    }
  }
}
