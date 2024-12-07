import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonBadge,
  IonCheckbox,
  IonAlert,
} from '@ionic/angular/standalone';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  timeOutline,
  footballOutline,
  checkmarkCircleOutline,
  informationCircleOutline,
} from 'ionicons/icons';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  kickoff: string;
  prediction: {
    homeScore: number | null;
    awayScore: number | null;
  };
}

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
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
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonBadge,
    IonCheckbox,
    IonAlert,
    DatePipe,
    NgFor,
    NgIf,
    FormsModule,
  ],
})
export class MatchesPage {
  currentGameweek = {
    number: 15,
    deadline: '2024-01-20T11:30:00',
  };

  showAlert = false;
  alertMessage = '';

  // Mock data for available matches
  matches: Match[] = [
    {
      id: 1,
      homeTeam: 'Arsenal',
      awayTeam: 'Chelsea',
      kickoff: '2024-01-20T15:00:00',
      prediction: { homeScore: null, awayScore: null },
    },
    {
      id: 2,
      homeTeam: 'Liverpool',
      awayTeam: 'Man City',
      kickoff: '2024-01-20T17:30:00',
      prediction: { homeScore: null, awayScore: null },
    },
    {
      id: 3,
      homeTeam: 'Man United',
      awayTeam: 'Tottenham',
      kickoff: '2024-01-21T14:00:00',
      prediction: { homeScore: null, awayScore: null },
    },
    {
      id: 4,
      homeTeam: 'Newcastle',
      awayTeam: 'Aston Villa',
      kickoff: '2024-01-21T16:30:00',
      prediction: { homeScore: null, awayScore: null },
    },
    {
      id: 5,
      homeTeam: 'Brighton',
      awayTeam: 'Crystal Palace',
      kickoff: '2024-01-21T14:00:00',
      prediction: { homeScore: null, awayScore: null },
    },
  ];

  constructor() {
    addIcons({
      timeOutline,
      footballOutline,
      checkmarkCircleOutline,
      informationCircleOutline,
    });
  }

  onScoreChange(match: Match) {
    const selectedCount = this.getSelectedMatchesCount();
    const isMatchSelected = this.isMatchSelected(match);
    const isNewSelection =
      !isMatchSelected &&
      (match.prediction.homeScore !== null ||
        match.prediction.awayScore !== null);

    if (isNewSelection && selectedCount >= 3) {
      this.showAlert = true;
      this.alertMessage = 'You can only predict 3 matches per gameweek';
      match.prediction = { homeScore: null, awayScore: null };
      return;
    }
  }

  validateScore(match: Match, isHome: boolean, event: any) {
    const value = event.detail.value;

    // Clear if empty
    if (value === '') {
      if (isHome) {
        match.prediction.homeScore = null;
      } else {
        match.prediction.awayScore = null;
      }
      return;
    }

    // Only allow numbers
    if (!/^\d+$/.test(value)) {
      if (isHome) {
        match.prediction.homeScore = null;
      } else {
        match.prediction.awayScore = null;
      }
      return;
    }

    const score = parseInt(value);
    if (score < 0 || score > 99) {
      if (isHome) {
        match.prediction.homeScore = null;
      } else {
        match.prediction.awayScore = null;
      }
      return;
    }

    // Check if this would exceed 3 predictions
    const currentPredictions = this.getSelectedMatchesCount();
    const isNewPrediction = !this.isMatchSelected(match);

    if (isNewPrediction && currentPredictions >= 3) {
      this.showAlert = true;
      this.alertMessage =
        'You can only predict 3 matches per gameweek. Please clear an existing prediction first.';
      if (isHome) {
        match.prediction.homeScore = null;
      } else {
        match.prediction.awayScore = null;
      }
      return;
    }

    // Update score
    if (isHome) {
      match.prediction.homeScore = score;
    } else {
      match.prediction.awayScore = score;
    }
  }

  private isMatchSelected(match: Match): boolean {
    return (
      match.prediction.homeScore !== null && match.prediction.awayScore !== null
    );
  }

  private getSelectedMatchesCount(): number {
    return this.matches.filter(
      (m) => m.prediction.homeScore !== null && m.prediction.awayScore !== null
    ).length;
  }

  canSubmit(): boolean {
    const selectedMatches = this.matches.filter(
      (m) => m.prediction.homeScore !== null && m.prediction.awayScore !== null
    );
    return selectedMatches.length === 3;
  }

  onSubmit() {
    const predictions = this.matches
      .filter(
        (m) =>
          m.prediction.homeScore !== null && m.prediction.awayScore !== null
      )
      .map((m) => {
        const homeScore = m.prediction.homeScore;
        const awayScore = m.prediction.awayScore;

        if (
          homeScore === undefined ||
          homeScore === null ||
          awayScore === undefined ||
          awayScore === null
        ) {
          return null;
        }

        return {
          matchId: m.id,
          homeTeam: m.homeTeam,
          awayTeam: m.awayTeam,
          homeScore,
          awayScore,
          points: this.calculatePotentialPoints(homeScore, awayScore),
        };
      })
      .filter((pred): pred is NonNullable<typeof pred> => pred !== null);

    console.log('Submitting predictions:', predictions);
    // TODO: Submit predictions to backend
  }

  private calculatePotentialPoints(
    homeScore: number,
    awayScore: number
  ): string {
    let points = '';

    // Result points
    if (homeScore > awayScore) {
      points = '3 pts (home win)';
    } else if (awayScore > homeScore) {
      points = '4 pts (away win)';
    } else {
      points = '6 pts (draw)';
    }

    points += ' + 3 pts for correct score';
    return points;
  }
}
