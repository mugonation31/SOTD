import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonInput,
  IonSegment,
  IonSegmentButton,
  IonChip,
  IonAvatar,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonBadge,
  IonAlert,
} from '@ionic/angular/standalone';
import { DatePipe, NgIf, NgFor, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  chevronBack,
  chevronForward,
  star,
  checkmarkCircle,
  closeCircle,
  alertCircleOutline,
  timeOutline,
  refreshOutline,
  footballOutline,
  closeCircleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  personOutline,
  informationCircleOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import { MockDataService } from '../../../../core/services/mock-data.service';
import { Router } from '@angular/router';

interface GameWeek {
  number: number;
  isSpecial: boolean;
  specialType?: string;
  status: 'pending' | 'active' | 'completed';
  deadline: Date;
  matches: Match[];
}

interface Match {
  id: number;
  gameweek: number;
  homeTeam: string;
  awayTeam: string;
  kickoff: string;
  venue: string;
  homeScore?: number | null;
  awayScore?: number | null;
  liveScore?: {
    home: number;
    away: number;
    isLive: boolean;
    minute: number;
    additionalTime?: number;
  };
  finalScore?: {
    home: number;
    away: number;
  };
  status: 'scheduled' | 'live' | 'finished';
}

interface PlayerPrediction {
  playerName: string;
  avatar?: string;
  totalPoints: number;
  jokerUsed: boolean;
  predictions: PredictionWithResult[];
  isCurrentUser?: boolean;
}

interface PredictionWithResult extends Match {
  points?: number;
  isCorrectScore?: boolean;
  isCorrectResult?: boolean;
}

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.page.html',
  styleUrls: ['./predictions.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonButtons,
    IonCardTitle,
    IonInput,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonNote,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonList,
    IonItem,
    IonIcon,
    DatePipe,
    TitleCasePipe,
    NgIf,
    NgFor,
    FormsModule,
    IonChip,
    IonAvatar,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonBadge,
    IonAlert,
  ],
})
export class PredictionsPage implements OnInit {
  selectedTab = 'my';
  selectedSegment = 'current';
  searchTerm = '';
  filterStatus = 'all';
  currentGameweekIndex = 0;
  selectedGameweek: GameWeek;
  gameweeks: GameWeek[] = [];
  filteredPredictions: PlayerPrediction[] = [];
  allPredictions: PlayerPrediction[] = [];
  showTooManyPredictionsWarning = false;
  currentGameWeek: GameWeek;
  pastPredictions: Match[] = [];
  canSubmit = false;
  selectedPredictionCount = 0;
  currentGameweek: number;
  currentMatches: Match[] = [];
  historicalMatches: Match[] = [];
  selectedHistoryGameweek = 14;
  historicalGameweeks: number[] = [];
  liveScoreUpdateInterval: any;

  constructor(
    private mockDataService: MockDataService,
    private router: Router
  ) {
    addIcons({footballOutline,personOutline,chevronBackOutline,chevronForwardOutline,timeOutline,refreshOutline,chevronBack,star,chevronForward,informationCircleOutline,checkmarkCircleOutline,checkmarkCircle,closeCircle,alertCircleOutline,closeCircleOutline,});
    
    // Initialize current gameweek from MockDataService
    this.currentGameweek = this.mockDataService.getCurrentGameweek();
    
    this.gameweeks = this.getSampleGameweeks();
    this.selectedGameweek = this.gameweeks[0];
    this.allPredictions = [];
    this.filteredPredictions = [];
    this.currentGameWeek = this.mockDataService.getCurrentGameweekData();
    this.pastPredictions = [];
  }

  ngOnInit() {
    this.loadGameweekPredictions();
  }

  tabChanged() {
    if (this.selectedTab === 'all') {
      this.filterPredictions();
    }
  }

  onScoreChange(match: Match) {
    // Ensure scores are numbers or null
    match.homeScore =
      match.homeScore === null ||
      match.homeScore === undefined ||
      match.homeScore.toString() === ''
        ? null
        : Number(match.homeScore);
    match.awayScore =
      match.awayScore === null ||
      match.awayScore === undefined ||
      match.awayScore.toString() === ''
        ? null
        : Number(match.awayScore);

    // Count valid predictions (both home and away scores are filled)
    const validPredictions = this.currentGameWeek.matches.filter(
      (m) => m.homeScore !== null && m.awayScore !== null
    ).length;

    // Show warning if more than 3 predictions in regular gameweek
    this.showTooManyPredictionsWarning =
      !this.currentGameWeek.isSpecial && validPredictions > 3;

    // Update submit button state
    if (this.currentGameWeek.isSpecial) {
      // All matches must be predicted in special gameweeks
      this.canSubmit = validPredictions === this.currentGameWeek.matches.length;
    } else {
      // Exactly 3 predictions required in regular gameweeks
      this.canSubmit = validPredictions === 3;
    }

    // For debugging
    console.log('Valid predictions:', validPredictions);
    console.log('Show warning:', this.showTooManyPredictionsWarning);
  }

  private getSampleCurrentGameWeek(): GameWeek {
    return {
      number: 15,
      isSpecial: false,
      status: 'active',
      deadline: new Date('2024-01-20T11:30:00'),
      matches: [
        {
          id: 1,
          gameweek: 15,
          homeTeam: 'Manchester United',
          awayTeam: 'Liverpool',
          homeScore: null,
          awayScore: null,
          venue: 'Old Trafford',
          kickoff: '2024-01-20T15:00:00',
          status: 'scheduled',
        },
        {
          id: 2,
          gameweek: 15,
          homeTeam: 'Arsenal',
          awayTeam: 'Chelsea',
          homeScore: null,
          awayScore: null,
          venue: 'Emirates Stadium',
          kickoff: '2024-01-20T17:30:00',
          status: 'scheduled',
        },
        {
          id: 3,
          gameweek: 15,
          homeTeam: 'Manchester City',
          awayTeam: 'Tottenham',
          homeScore: null,
          awayScore: null,
          venue: 'Etihad Stadium',
          kickoff: '2024-01-20T20:00:00',
          status: 'scheduled',
        },
        {
          id: 4,
          gameweek: 15,
          homeTeam: 'Newcastle',
          awayTeam: 'Aston Villa',
          homeScore: null,
          awayScore: null,
          venue: 'St. James Park',
          kickoff: '2024-01-20T15:00:00',
          status: 'scheduled',
        },
        {
          id: 5,
          gameweek: 15,
          homeTeam: 'Brighton',
          awayTeam: 'Crystal Palace',
          homeScore: null,
          awayScore: null,
          venue: 'Amex Stadium',
          kickoff: '2024-01-20T15:00:00',
          status: 'scheduled',
        },
        {
          id: 6,
          gameweek: 15,
          homeTeam: 'Brentford',
          awayTeam: 'Nottingham Forest',
          homeScore: null,
          awayScore: null,
          venue: 'Gtech Community Stadium',
          kickoff: '2024-01-20T15:00:00',
          status: 'scheduled',
        },
        {
          id: 7,
          gameweek: 15,
          homeTeam: 'Sheffield United',
          awayTeam: 'West Ham',
          homeScore: null,
          awayScore: null,
          venue: 'Bramall Lane',
          kickoff: '2024-01-20T15:00:00',
          status: 'scheduled',
        },
        {
          id: 8,
          gameweek: 15,
          homeTeam: 'Bournemouth',
          awayTeam: 'Luton Town',
          homeScore: null,
          awayScore: null,
          venue: 'Vitality Stadium',
          kickoff: '2024-01-20T15:00:00',
          status: 'scheduled',
        },
        {
          id: 9,
          gameweek: 15,
          homeTeam: 'Wolves',
          awayTeam: 'Everton',
          homeScore: null,
          awayScore: null,
          venue: 'Molineux',
          kickoff: '2024-01-20T15:00:00',
          status: 'scheduled',
        },
        {
          id: 10,
          gameweek: 15,
          homeTeam: 'Burnley',
          awayTeam: 'Fulham',
          homeScore: null,
          awayScore: null,
          venue: 'Turf Moor',
          kickoff: '2024-01-20T15:00:00',
          status: 'scheduled',
        },
      ],
    };
  }

  previousGameweek() {
    if (this.currentGameweekIndex > 0) {
      this.currentGameweekIndex--;
      this.selectedGameweek = this.gameweeks[this.currentGameweekIndex];
      this.loadGameweekPredictions();
    }
  }

  nextGameweek() {
    if (this.currentGameweekIndex < this.gameweeks.length - 1) {
      this.currentGameweekIndex++;
      this.selectedGameweek = this.gameweeks[this.currentGameweekIndex];
      this.loadGameweekPredictions();
    }
  }

  getGameweekStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'primary';
      default:
        return 'medium';
    }
  }

  getSpecialWeekLabel(type: string | undefined): string {
    if (!type) return 'Special Week';

    switch (type) {
      case 'christmas':
        return 'Christmas Special';
      case 'endOfSeason':
        return 'End of Season Special';
      default:
        return 'Special Week';
    }
  }

  filterPredictions() {
    this.filteredPredictions = this.allPredictions.filter((player) => {
      const nameMatch = player.playerName
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      let statusMatch = true;
      switch (this.filterStatus) {
        case 'my':
          statusMatch = player.isCurrentUser === true;
          break;
        case 'submitted':
          statusMatch = player.predictions.length > 0;
          break;
        case 'pending':
          statusMatch = player.predictions.length === 0;
          break;
        default: // 'all'
          statusMatch = true;
      }

      return nameMatch && statusMatch;
    });
  }

  onSubmitPredictions() {
    // Get only the matches that have predictions
    const predictedMatches = this.currentGameWeek.matches
      .filter((match) => match.homeScore !== null && match.awayScore !== null)
      .map((match) => ({
        ...match,
        points: 0,
        isCorrectScore: false,
        isCorrectResult: false,
      }));

    // Create a prediction entry for the current user
    const currentUserPrediction: PlayerPrediction = {
      playerName: 'You (Group Admin)', // This should come from auth service in real implementation
      isCurrentUser: true,
      totalPoints: 0,
      jokerUsed: false,
      predictions: predictedMatches,
    };

    // Add to all predictions if not exists, or update if exists
    const existingUserIndex = this.allPredictions.findIndex(
      (p) => p.isCurrentUser
    );
    if (existingUserIndex >= 0) {
      this.allPredictions[existingUserIndex] = currentUserPrediction;
    } else {
      this.allPredictions.unshift(currentUserPrediction);
    }

    // Store the predictions in pastPredictions
    this.pastPredictions = [...predictedMatches];

    // Reset all match scores
    this.currentGameWeek.matches.forEach((match) => {
      match.homeScore = null;
      match.awayScore = null;
    });

    // Reset submit button state
    this.canSubmit = false;

    // Force UI update
    this.filterPredictions();
    console.log('Current predictions:', this.allPredictions);
    console.log('Filtered predictions:', this.filteredPredictions);
  }

  resetPredictions() {
    // Reset all match scores
    this.currentGameWeek.matches.forEach((match) => {
      match.homeScore = null;
      match.awayScore = null;
    });

    // Reset states
    this.canSubmit = false;
    this.showTooManyPredictionsWarning = false;
  }

  private loadGameweekPredictions() {
    // Load group admin predictions from MockDataService
    this.allPredictions = this.mockDataService.getGroupAdminPredictions(this.selectedGameweek.number);
    this.filterPredictions();
  }

  private getSampleGameweeks(): GameWeek[] {
    return [
      {
        number: 15,
        isSpecial: false,
        status: 'active',
        deadline: new Date('2024-01-20T11:30:00'),
        matches: [],
      },
      {
        number: 16,
        isSpecial: true,
        specialType: 'christmas',
        status: 'pending',
        deadline: new Date('2024-01-27T11:30:00'),
        matches: [],
      },
    ];
  }

  private getSamplePredictions(): PlayerPrediction[] {
    return [
      {
        playerName: 'John Smith',
        avatar: 'assets/avatars/john.jpg',
        totalPoints: 156,
        jokerUsed: true,
        predictions: [
          {
            id: 1,
            gameweek: 15,
            homeTeam: 'Manchester United',
            awayTeam: 'Liverpool',
            homeScore: 2,
            awayScore: 1,
            venue: 'Old Trafford',
            kickoff: '2024-01-20T15:00:00',
            points: 9,
            isCorrectScore: true,
            isCorrectResult: true,
            status: 'finished',
          },
          {
            id: 2,
            gameweek: 15,
            homeTeam: 'Arsenal',
            awayTeam: 'Chelsea',
            homeScore: 1,
            awayScore: 1,
            venue: 'Emirates Stadium',
            kickoff: '2024-01-20T17:30:00',
            points: 6,
            isCorrectScore: false,
            isCorrectResult: true,
            status: 'finished',
          },
          {
            id: 3,
            gameweek: 15,
            homeTeam: 'Manchester City',
            awayTeam: 'Tottenham',
            homeScore: 3,
            awayScore: 0,
            venue: 'Etihad Stadium',
            kickoff: '2024-01-20T20:00:00',
            points: 0,
            isCorrectScore: false,
            isCorrectResult: false,
            status: 'finished',
          },
        ],
      },
      {
        playerName: 'Sarah Johnson',
        avatar: 'assets/avatars/sarah.jpg',
        totalPoints: 178,
        jokerUsed: false,
        predictions: [
          {
            id: 1,
            gameweek: 15,
            homeTeam: 'Manchester United',
            awayTeam: 'Liverpool',
            homeScore: 1,
            awayScore: 2,
            venue: 'Old Trafford',
            kickoff: '2024-01-20T15:00:00',
            points: 6,
            isCorrectScore: false,
            isCorrectResult: true,
            status: 'finished',
          },
          {
            id: 2,
            gameweek: 15,
            homeTeam: 'Arsenal',
            awayTeam: 'Chelsea',
            homeScore: 2,
            awayScore: 2,
            venue: 'Emirates Stadium',
            kickoff: '2024-01-20T17:30:00',
            points: 9,
            isCorrectScore: true,
            isCorrectResult: true,
            status: 'finished',
          },
          {
            id: 3,
            gameweek: 15,
            homeTeam: 'Manchester City',
            awayTeam: 'Tottenham',
            homeScore: 4,
            awayScore: 1,
            venue: 'Etihad Stadium',
            kickoff: '2024-01-20T20:00:00',
            points: 6,
            isCorrectScore: false,
            isCorrectResult: true,
            status: 'finished',
          },
        ],
      },
    ];
  }

  navigateGameweek(delta: number) {
    const newGameweek = this.currentGameWeek.number + delta;
    if (newGameweek >= 1 && newGameweek <= 38) {
      // TODO: Load gameweek data from service
      this.currentGameWeek = {
        ...this.currentGameWeek,
        number: newGameweek,
      };
      this.loadGameweekMatches(newGameweek);
    }
  }

  loadGameweekMatches(gameweek: number) {
    // TODO: Implement service call to load matches for the gameweek
    console.log('Loading matches for gameweek:', gameweek);
  }

  ionViewWillEnter() {
    this.loadMatches();
    // Start live score updates
    this.startLiveScoreUpdates();
  }

  ionViewWillLeave() {
    // Clean up interval when leaving the page
    if (this.liveScoreUpdateInterval) {
      clearInterval(this.liveScoreUpdateInterval);
    }
  }

  loadMatches() {
    // Load current matches from MockDataService
    this.currentMatches = this.mockDataService.getMatchesForGameweek(this.currentGameweek);

    // Get available historical gameweeks from MockDataService
    this.historicalGameweeks = this.mockDataService.getAvailableHistoricalGameweeks();

    // If we have historical gameweeks, set the selected one
    if (this.historicalGameweeks.length > 0) {
      this.selectedHistoryGameweek = this.historicalGameweeks[0];
    }

    // Get matches for selected historical gameweek
    this.updateHistoricalMatches();
  }

  updateHistoricalMatches() {
    // Get historical matches from MockDataService
    this.historicalMatches = this.mockDataService.getMatchesForGameweek(this.selectedHistoryGameweek);
  }

  startLiveScoreUpdates() {
    // Update live scores every minute
    this.liveScoreUpdateInterval = setInterval(() => {
      this.updateLiveScores();
    }, 60000); // 60000ms = 1 minute

    // Initial update
    this.updateLiveScores();
  }

  updateLiveScores() {
    // Update live scores using MockDataService
    this.mockDataService.updateLiveScores();
    
    // Reload current matches with updated live scores
    this.currentMatches = this.mockDataService.getMatchesForGameweek(this.currentGameweek);
  }

  getMatchTime(match: any): string {
    return this.mockDataService.getMatchTime(match);
  }

  isMatchFinished(match: any): boolean {
    return this.mockDataService.isMatchFinished(match);
  }

  isMatchLive(match: any): boolean {
    return this.mockDataService.isMatchLive(match);
  }

  getScoreClass(match: any): string {
    if (this.isMatchFinished(match)) {
      return 'finished';
    }
    if (this.isMatchLive(match)) {
      return 'live';
    }
    return 'scheduled';
  }

  navigateHistoryGameweek(delta: number) {
    const currentIndex = this.historicalGameweeks.indexOf(
      this.selectedHistoryGameweek
    );
    const newIndex = currentIndex + delta;

    if (newIndex >= 0 && newIndex < this.historicalGameweeks.length) {
      this.selectedHistoryGameweek = this.historicalGameweeks[newIndex];
      this.updateHistoricalMatches();
    }
  }

  canNavigateHistory(direction: 'back' | 'forward'): boolean {
    const currentIndex = this.historicalGameweeks.indexOf(
      this.selectedHistoryGameweek
    );
    return direction === 'back'
      ? currentIndex < this.historicalGameweeks.length - 1
      : currentIndex > 0;
  }

  getShortTeamName(teamName: string): string {
    // Common team name abbreviations for better mobile display
    const abbreviations: { [key: string]: string } = {
      'Manchester United': 'Man Utd',
      'Manchester City': 'Man City',
      'Liverpool': 'Liverpool',
      'Arsenal': 'Arsenal',
      'Chelsea': 'Chelsea',
      'Tottenham': 'Spurs',
      'Newcastle': 'Newcastle',
      'Brighton': 'Brighton',
      'West Ham': 'West Ham',
      'Crystal Palace': 'Palace',
      'Aston Villa': 'Villa',
      'Sheffield United': 'Sheffield',
      'Wolverhampton': 'Wolves',
      'Leicester City': 'Leicester',
      'Everton': 'Everton',
      'Leeds United': 'Leeds',
      'Burnley': 'Burnley',
      'Southampton': 'Saints',
      'Watford': 'Watford',
      'Norwich City': 'Norwich',
      'Brentford': 'Brentford',
      'Fulham': 'Fulham',
      'Bournemouth': 'Bournemouth',
      'Nottingham Forest': 'Forest',
      'Luton Town': 'Luton'
    };

    // Return abbreviation if available, otherwise use first word or limit to 10 chars
    if (abbreviations[teamName]) {
      return abbreviations[teamName];
    }

    // If no abbreviation found, take first word or limit length
    const firstWord = teamName.split(' ')[0];
    return firstWord.length <= 10 ? firstWord : teamName.substring(0, 10);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  validateScore(match: Match, isHome: boolean, event: any) {
    const value = event.detail.value;
    if (value === '') {
      if (isHome) {
        match.homeScore = null;
      } else {
        match.awayScore = null;
      }
      this.onScoreChange(match);
      return;
    }

    const score = parseInt(value, 10);
    if (isNaN(score) || score < 0 || score > 99) {
      if (isHome) {
        match.homeScore = null;
      } else {
        match.awayScore = null;
      }
    } else {
      if (isHome) {
        match.homeScore = score;
      } else {
        match.awayScore = score;
      }
    }
    this.onScoreChange(match);
  }
}

