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
} from 'ionicons/icons';

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
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Predictions</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment [(ngModel)]="selectedTab" (ionChange)="tabChanged()">
          <ion-segment-button value="my">
            <ion-label>Make Predictions</ion-label>
          </ion-segment-button>
          <ion-segment-button value="all">
            <ion-label>All Predictions</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Warning Message -->
      <ion-item
        *ngIf="showTooManyPredictionsWarning"
        color="danger"
        lines="none"
        class="warning-item"
      >
        <ion-icon
          slot="start"
          name="alert-circle-outline"
          color="danger"
        ></ion-icon>
        <ion-label
          >You can't make more than 3 predictions for this game week</ion-label
        >
      </ion-item>

      <!-- Make Predictions Tab -->
      <div *ngIf="selectedTab === 'my'" class="content-wrapper">
        <!-- Gameweek Navigation and Info Tile -->
        <div class="gameweek-navigation">
          <ion-button
            fill="clear"
            class="nav-button"
            [disabled]="currentGameWeek.number <= 1"
            (click)="navigateGameweek(-1)"
          >
            <ion-icon slot="icon-only" name="chevron-back"></ion-icon>
          </ion-button>

          <div class="gameweek-title">
            <h2>Game Week {{ currentGameWeek.number }}</h2>
            <ion-badge color="primary" class="prediction-badge"
              >Predict 3</ion-badge
            >
          </div>

          <ion-button
            fill="clear"
            class="nav-button"
            [disabled]="currentGameWeek.number >= 38"
            (click)="navigateGameweek(1)"
          >
            <ion-icon slot="icon-only" name="chevron-forward"></ion-icon>
          </ion-button>
        </div>

        <!-- Deadline Info Card -->
        <ion-card class="deadline-card">
          <ion-card-content>
            <div class="deadline-info">
              <div class="deadline-section">
                <p class="deadline">
                  <ion-icon name="time-outline"></ion-icon>
                  Deadline:
                  {{ currentGameWeek.deadline | date : 'MMM d, yyyy, h:mm a' }}
                </p>
                <p class="selection-info">
                  Make any 3 predictions for this game week
                </p>
                <div
                  *ngIf="showTooManyPredictionsWarning"
                  class="warning-message"
                >
                  <ion-icon
                    name="alert-circle-outline"
                    color="danger"
                  ></ion-icon>
                  <span
                    >You can't make more than 3 predictions for this game
                    week</span
                  >
                </div>
              </div>
              <ion-button
                fill="clear"
                class="reset-button"
                (click)="resetPredictions()"
              >
                <ion-icon name="refresh-outline" slot="start"></ion-icon>
                RESET ALL
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Rest of the predictions content -->
        <div class="matches-container">
          <div class="predictions-list">
            <ion-grid
              class="match-row"
              *ngFor="let match of currentGameWeek.matches; let i = index"
            >
              <!-- Match Info Row -->
              <ion-row class="match-info-row">
                <ion-col size="7" size-md="8" class="venue-col">
                  <div class="venue">{{ match.venue }}</div>
                </ion-col>
                <ion-col size="5" size-md="4" class="kickoff-col">
                  <div class="kickoff">
                    {{ match.kickoff | date : 'EEEE d MMM HH:mm' }}
                  </div>
                </ion-col>
              </ion-row>

              <!-- Match Prediction Row -->
              <ion-row class="match-prediction-row">
                <ion-col size="4" size-md="4" class="team-col">
                  <span class="team home">{{ match.homeTeam }}</span>
                </ion-col>
                <ion-col size="4" size-md="4" class="score-col">
                  <div class="score-container">
                    <ion-input
                      type="number"
                      class="score-input"
                      maxlength="2"
                      min="0"
                      max="99"
                      [(ngModel)]="match.homeScore"
                      [name]="'home' + i"
                      (ionInput)="onScoreChange(match)"
                      placeholder="0"
                    ></ion-input>
                    <span class="separator">-</span>
                    <ion-input
                      type="number"
                      class="score-input"
                      maxlength="2"
                      min="0"
                      max="99"
                      [(ngModel)]="match.awayScore"
                      [name]="'away' + i"
                      (ionInput)="onScoreChange(match)"
                      placeholder="0"
                    ></ion-input>
                  </div>
                </ion-col>
                <ion-col size="4" size-md="4" class="team-col">
                  <span class="team away">{{ match.awayTeam }}</span>
                </ion-col>
              </ion-row>
            </ion-grid>
          </div>

          <div class="button-container">
            <ion-button
              expand="full"
              type="submit"
              class="submit-button"
              [disabled]="!canSubmit"
              (click)="onSubmitPredictions()"
            >
              SUBMIT PREDICTIONS
            </ion-button>
          </div>
        </div>

        <!-- Past Predictions Section -->
        <div class="past-predictions" *ngIf="pastPredictions.length > 0">
          <h3>Previous Predictions</h3>
          <div class="predictions-list">
            <div class="match-row" *ngFor="let prediction of pastPredictions">
              <div class="match-info">
                <div class="venue">{{ prediction.venue }}</div>
                <div class="kickoff">
                  {{ prediction.kickoff | date : 'EEEE d MMM HH:mm' }}
                </div>
              </div>

              <div class="match-prediction">
                <span class="team home">{{ prediction.homeTeam }}</span>
                <div class="score-container">
                  <span class="past-score">
                    {{ prediction.homeScore }} - {{ prediction.awayScore }}
                  </span>
                </div>
                <span class="team away">{{ prediction.awayTeam }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- All Predictions Tab -->
      <div
        *ngIf="selectedTab === 'all'"
        class="content-wrapper all-predictions"
      >
        <!-- Gameweek Navigation -->
        <div class="gameweek-navigation">
          <ion-button
            fill="clear"
            (click)="previousGameweek()"
            [disabled]="currentGameweekIndex === 0"
          >
            <ion-icon name="chevron-back"></ion-icon>
          </ion-button>
          <div class="gameweek-info">
            <h2>Gameweek {{ selectedGameweek.number }}</h2>
            <ion-chip [color]="getGameweekStatusColor(selectedGameweek.status)">
              {{ selectedGameweek.status | titlecase }}
            </ion-chip>
            <div *ngIf="selectedGameweek.isSpecial" class="special-indicator">
              <ion-icon name="star" color="warning"></ion-icon>
              {{ getSpecialWeekLabel(selectedGameweek.specialType) }}
            </div>
          </div>
          <ion-button
            fill="clear"
            (click)="nextGameweek()"
            [disabled]="currentGameweekIndex === gameweeks.length - 1"
          >
            <ion-icon name="chevron-forward"></ion-icon>
          </ion-button>
        </div>

        <!-- Search and Filter -->
        <div class="search-filter">
          <ion-searchbar
            [(ngModel)]="searchTerm"
            placeholder="Search players..."
            (ionInput)="filterPredictions()"
            class="player-search"
          >
          </ion-searchbar>
          <ion-select
            [(ngModel)]="filterStatus"
            (ionChange)="filterPredictions()"
            placeholder="Filter by status"
            interface="popover"
          >
            <ion-select-option value="all">All Predictions</ion-select-option>
            <ion-select-option value="my">My Predictions</ion-select-option>
            <ion-select-option value="submitted">Submitted</ion-select-option>
            <ion-select-option value="pending">Pending</ion-select-option>
          </ion-select>
        </div>

        <!-- Players Predictions List -->
        <div class="players-list">
          <ion-card
            *ngFor="let player of filteredPredictions"
            class="player-card"
          >
            <ion-card-header>
              <div class="player-header">
                <div class="name-section">
                  <div class="name-and-avatar">
                    <ion-avatar *ngIf="player.avatar">
                      <img [src]="player.avatar" alt="avatar" />
                    </ion-avatar>
                    <h3>{{ player.playerName }}</h3>
                  </div>
                  <ion-chip *ngIf="player.jokerUsed" color="warning">
                    <ion-icon name="star"></ion-icon>
                    <ion-label>Joker Used</ion-label>
                  </ion-chip>
                </div>
                <div class="player-info">
                  <div class="total-points">
                    Total Points: {{ player.totalPoints }}
                  </div>
                </div>
              </div>
            </ion-card-header>

            <ion-card-content>
              <div
                class="predictions-grid"
                [class.special-week]="selectedGameweek.isSpecial"
              >
                <div
                  *ngFor="let pred of player.predictions"
                  class="prediction-item"
                >
                  <div class="match-info">
                    <div class="venue-info">
                      <span class="venue-name">{{ pred.venue }}</span>
                      <span class="kickoff">{{
                        pred.kickoff | date : 'EEE d MMM, HH:mm'
                      }}</span>
                    </div>
                  </div>
                  <div class="teams-score">
                    <span class="team home">{{ pred.homeTeam }}</span>
                    <div
                      class="score"
                      [class.pending]="!pred.homeScore && !pred.awayScore"
                    >
                      {{ pred.homeScore ?? '-' }} - {{ pred.awayScore ?? '-' }}
                    </div>
                    <span class="team away">{{ pred.awayTeam }}</span>
                  </div>
                </div>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  `,
  styles: [
    `
      :host {
        --page-margin: 16px;
        --card-border-radius: 8px;
        --card-background: #ffffff;
      }

      ion-content {
        --background: #f4f5f8;
      }

      ion-content::part(scroll) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .content-wrapper {
        width: 100%;
        max-width: 800px;
        padding: var(--page-margin);
        margin: 0 auto;

        &.all-predictions {
          max-width: 100%;
          padding: 8px 16px;
          margin: 0;
        }
      }

      .gameweek-navigation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--page-margin);
        width: 100%;
      }

      .nav-button {
        --padding-start: 8px;
        --padding-end: 8px;
        height: 36px;
        --color: var(--ion-color-medium);

        &[disabled] {
          opacity: 0.5;
        }

        ion-icon {
          font-size: 24px;
        }
      }

      .gameweek-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: var(--ion-color-dark);
        }
      }

      .prediction-badge {
        font-size: 12px;
        font-weight: 500;
        padding: 4px 8px;
        border-radius: 4px;
      }

      .deadline-card {
        margin-bottom: var(--page-margin);
        border-radius: var(--card-border-radius);
        box-shadow: none;
        border: 1px solid var(--ion-color-light-shade);
        background: var(--card-background);
      }

      .deadline-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 12px;
      }

      .deadline-section {
        flex: 1;
      }

      .deadline {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 500;
        color: var(--ion-color-dark);
        margin: 0 0 8px;

        ion-icon {
          font-size: 18px;
          color: var(--ion-color-medium);
        }
      }

      .selection-info {
        color: var(--ion-color-medium);
        font-size: 14px;
        margin: 0;
      }

      .reset-button {
        --color: var(--ion-color-medium);
        text-transform: uppercase;
        font-weight: 500;
        font-size: 14px;
        height: 36px;
        margin: 0;
      }

      .predictions-list {
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        margin-bottom: 20px;
      }

      .match-row {
        border-bottom: 1px solid #e0e0e0;
      }

      .match-row:last-child {
        border-bottom: none;
      }

      .match-info {
        display: flex;
        justify-content: space-between;
        padding: 8px 16px;
        background: #f8f9fa;
        border-bottom: 1px solid #e0e0e0;
        font-size: 13px;
      }

      .venue {
        color: #000000;
        font-weight: 600;
      }

      .kickoff {
        color: #000000;
        margin-top: 2px;
        font-weight: 500;
      }

      .match-prediction {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 16px;
        width: 100%;
        min-width: 600px;
      }

      .team {
        width: 150px;
        font-size: 14px;
        font-weight: 500;
        color: #424242;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .home {
        text-align: right;
        padding-right: 24px;
      }

      .away {
        text-align: left;
        padding-left: 24px;
      }

      .score-container {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 90px;
        justify-content: center;
      }

      .score-input {
        width: 45px;
        height: 45px;
        text-align: center;
        border: 1px solid #d1d1d1;
        border-radius: 4px;
        background: #f5f5f5;
        color: #000000;
        font-size: 18px;
        font-weight: 500;
      }

      .separator {
        color: #424242;
        font-weight: 500;
        font-size: 18px;
      }

      .submit-button {
        --background: #4a90e2;
        --background-activated: #2171cd;
        --background-hover: #357abd;
        --border-radius: 4px;
        margin: 20px 0;
        height: 44px;
        transition: all 0.2s ease;

        &:not([disabled]) {
          opacity: 1;
          --background: #2171cd;
        }

        &[disabled] {
          opacity: 0.6;
        }
      }

      .admin-note {
        text-align: center;
        background: #f8f9fa;
        padding: 12px;
        margin-bottom: 24px;
        border-radius: 4px;
      }

      h2 {
        text-align: center;
        margin-bottom: 4px;
        color: #000000;
        font-weight: 600;
      }

      .deadline {
        text-align: center;
        margin-bottom: 24px;
        color: #333333;
      }

      ion-segment {
        padding: 16px;
      }

      .all-predictions {
        margin-top: 16px;
      }

      .deadline-message {
        text-align: center;
        padding: 32px 16px;
        background: #f8f9fa;
        border-radius: 4px;
        margin-top: 16px;
      }

      .match-header {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        padding: 12px;
        background: #f8f9fa;
        border-bottom: 1px solid #e0e0e0;
        font-weight: 500;
      }

      .predictions-grid {
        padding: 12px 16px;
      }

      .prediction-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
      }

      .prediction-row:last-child {
        border-bottom: none;
      }

      .player-name {
        color: #666;
        font-size: 14px;
      }

      .prediction-score {
        font-weight: 500;
        color: #333;
        font-size: 14px;
      }

      .selection-info {
        text-align: center;
        color: #333333;
        margin-bottom: 16px;
      }

      .match-row {
        cursor: pointer;
        opacity: 0.6;
        transition: all 0.2s ease;
      }

      .match-row.selected {
        opacity: 1;
        background: white;
      }

      .match-row.disabled {
        cursor: not-allowed;
      }

      .gameweek-info {
        padding: 16px;
        border-bottom: 1px solid #e0e0e0;
        background: #f8f9fa;
      }

      .match-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

      .warning-message {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        max-width: 600px;
        margin: 0 auto;
        padding: 12px 16px;
        border-radius: 8px;
        background: var(--ion-color-danger-contrast);
        box-shadow: 0 2px 8px rgba(var(--ion-color-danger-rgb), 0.2);
        border: 1px solid rgba(var(--ion-color-danger-rgb), 0.2);
        color: var(--ion-color-danger-shade);
        font-weight: 500;
        font-size: 14px;
      }

      .gameweek-navigation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        background: #f8f9fa;
        border-bottom: 1px solid #e0e0e0;
      }

      .gameweek-info {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .special-indicator {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #e65100;
        font-size: 12px;
        font-weight: 500;
      }

      .search-filter {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 16px;
        background: #f8f9fa;
        border-radius: 4px;
        margin-bottom: 16px;
        gap: 16px;
      }

      .player-search {
        width: 500px;
        margin-right: 16px;
      }

      .players-list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      .player-card {
        width: 100%;
        max-width: 600px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 16px;
      }

      .player-header {
        display: flex;
        flex-direction: column;
        padding: 8px;
        background: #f8f9fa;
        border-bottom: 1px solid #e0e0e0;
        gap: 6px;
      }

      .name-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .name-and-avatar {
        display: flex;
        align-items: center;
        gap: 12px;

        h3 {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
        }
      }

      .player-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

      .total-points {
        padding: 2px 8px;
        font-size: 0.8125rem;
      }

      .prediction-item {
        padding: 8px 12px;
        border-bottom: 1px solid #e0e0e0;

        &:last-child {
          border-bottom: none;
        }
      }

      .match-info {
        margin-bottom: 6px;
      }

      .teams-score {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        padding: 4px;

        .team {
          flex: 1;
          font-size: 0.875rem;
          font-weight: 500;

          &.home {
            text-align: right;
          }

          &.away {
            text-align: left;
          }
        }

        .score {
          font-size: 0.875rem;
          font-weight: 600;
          color: #424242;
          padding: 2px 8px;
          background: #f8f9fa;
          border-radius: 4px;
          min-width: 50px;
          text-align: center;

          &.pending {
            color: #9e9e9e;
          }
        }
      }

      .venue-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
        width: 100%;

        .venue-name {
          font-size: 0.8125rem;
          font-weight: 500;
          color: #424242;
        }

        .kickoff {
          font-size: 0.8125rem;
          color: #666666;
          margin-left: auto;
          white-space: nowrap;
        }
      }

      .button-container {
        display: flex;
        gap: 16px;
        margin: 20px 0;
      }

      .submit-button,
      .reset-button {
        flex: 1;
        height: 44px;
      }

      .submit-button {
        --background: #4a90e2;
        --background-activated: #2171cd;
        --background-hover: #357abd;
        --border-radius: 4px;
        transition: all 0.2s ease;

        &:not([disabled]) {
          opacity: 1;
          --background: #2171cd;
        }

        &[disabled] {
          opacity: 0.6;
        }
      }

      .reset-button {
        --border-radius: 4px;
        --color: #4a90e2;
        --color-activated: #2171cd;
        --color-hover: #357abd;
        --border-color: #4a90e2;
        --border-color-activated: #2171cd;
        --border-color-hover: #357abd;
      }

      .gameweek-header {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        margin-bottom: 4px;
        position: relative;
      }

      .reset-button {
        --padding-start: 12px;
        --padding-end: 12px;
        --color: #666666;
        --color-activated: #4a4a4a;
        --color-hover: #4a4a4a;
        --border-color: #666666;
        --border-color-activated: #4a4a4a;
        --border-color-hover: #4a4a4a;
        font-size: 12px;
        height: 28px;
        position: absolute;
        right: 0;
      }

      .warning-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        padding: 16px;
        background: rgba(var(--ion-color-danger-rgb), 0.1);
        animation: slideDown 0.3s ease-out;
      }

      .warning-message {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        max-width: 600px;
        margin: 0 auto;
        padding: 12px 16px;
        border-radius: 8px;
        background: var(--ion-color-danger-contrast);
        box-shadow: 0 2px 8px rgba(var(--ion-color-danger-rgb), 0.2);
        border: 1px solid rgba(var(--ion-color-danger-rgb), 0.2);
        color: var(--ion-color-danger-shade);
        font-weight: 500;
        font-size: 14px;
      }

      .warning-message ion-icon {
        font-size: 20px;
        flex-shrink: 0;
      }

      @keyframes slideDown {
        from {
          transform: translateY(-100%);
        }
        to {
          transform: translateY(0);
        }
      }

      .warning-item {
        margin-bottom: 16px;
        --background: rgba(var(--ion-color-danger-rgb), 0.1);
        --border-radius: 8px;
        --min-height: auto;
        --padding-start: 16px;
        --padding-end: 16px;
        --padding-top: 12px;
        --padding-bottom: 12px;

        ion-label {
          margin: 0;
          color: var(--ion-color-danger-shade);
          font-weight: 500;
          font-size: 14px;
        }

        ion-icon {
          font-size: 20px;
          margin-right: 8px;
        }
      }
    `,
  ],
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
    IonCardTitle,
    IonInput,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonNote,
    IonCard,
    IonCardHeader,
    IonCardContent,
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
    IonItem,
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
  currentGameweek = 15; // This should come from a service
  currentMatches: Match[] = [];
  historicalMatches: Match[] = [];
  selectedHistoryGameweek = 14;
  historicalGameweeks: number[] = [];
  liveScoreUpdateInterval: any;

  constructor() {
    addIcons({
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
    });
    this.gameweeks = this.getSampleGameweeks();
    this.selectedGameweek = this.gameweeks[0];
    this.allPredictions = [];
    this.filteredPredictions = [];
    this.currentGameWeek = this.getSampleCurrentGameWeek();
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
    // Only load sample predictions if we don't have any predictions yet
    if (this.allPredictions.length === 0) {
      this.allPredictions = this.getSamplePredictions();
    }
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
    // Mock current matches data
    const mockCurrentMatches: Match[] = [
      {
        id: 1,
        gameweek: 15,
        homeTeam: 'Manchester United',
        awayTeam: 'Liverpool',
        kickoff: '2024-01-20T15:00:00',
        venue: 'Old Trafford',
        status: 'scheduled',
      },
      // Add more mock matches as needed
    ];

    this.currentMatches = mockCurrentMatches;

    // Mock historical matches data
    const mockHistoricalMatches = [
      {
        gameweek: 14,
        matches: [
          {
            id: 1,
            gameweek: 14,
            homeTeam: 'Arsenal',
            awayTeam: 'Brighton',
            kickoff: '2024-01-17T19:45:00',
            venue: 'Emirates Stadium',
            finalScore: {
              home: 2,
              away: 1,
            },
            status: 'finished',
          },
          {
            id: 2,
            gameweek: 14,
            homeTeam: 'Brentford',
            awayTeam: 'Chelsea',
            kickoff: '2024-01-17T20:00:00',
            venue: 'Gtech Community Stadium',
            finalScore: {
              home: 0,
              away: 2,
            },
            status: 'finished',
          },
          {
            id: 3,
            gameweek: 14,
            homeTeam: 'Manchester City',
            awayTeam: 'Tottenham',
            kickoff: '2024-01-17T20:15:00',
            venue: 'Etihad Stadium',
            finalScore: {
              home: 3,
              away: 3,
            },
            status: 'finished',
          },
        ],
      },
    ];

    // Store mock historical data
    localStorage.setItem(
      'historicalMatches',
      JSON.stringify(mockHistoricalMatches)
    );

    // Get unique gameweeks from history
    this.historicalGameweeks = Array.from(
      new Set(mockHistoricalMatches.map((gw) => gw.gameweek))
    ).sort((a, b) => b - a);

    // If we have historical gameweeks, set the selected one
    if (this.historicalGameweeks.length > 0) {
      this.selectedHistoryGameweek = this.historicalGameweeks[0];
    }

    // Get matches for selected historical gameweek
    this.updateHistoricalMatches();
  }

  updateHistoricalMatches() {
    const historicalMatches = JSON.parse(
      localStorage.getItem('historicalMatches') || '[]'
    );
    const selectedGameweekMatches = historicalMatches.find(
      (gw: any) => gw.gameweek === this.selectedHistoryGameweek
    );

    this.historicalMatches = selectedGameweekMatches
      ? selectedGameweekMatches.matches
      : [];
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
    // TODO: Replace with actual API call
    // For now, using mock data to demonstrate
    const mockLiveScores = [
      {
        homeTeam: 'Manchester United',
        awayTeam: 'Liverpool',
        home: 1,
        away: 0,
        isLive: true,
        minute: this.calculateMatchMinute('2024-01-20T15:00:00'),
        additionalTime: 2,
      },
    ];

    // Update current matches with live scores
    this.currentMatches = this.currentMatches.map((match) => {
      const liveMatch = mockLiveScores.find(
        (score) =>
          score.homeTeam === match.homeTeam && score.awayTeam === match.awayTeam
      );

      if (liveMatch) {
        return {
          ...match,
          liveScore: {
            home: liveMatch.home,
            away: liveMatch.away,
            isLive: true,
            minute: liveMatch.minute,
            additionalTime: liveMatch.additionalTime,
          },
          status: this.isMatchFinished(match) ? 'finished' : 'live',
        };
      }
      return match;
    });
  }

  calculateMatchMinute(kickoff: string): number {
    const kickoffTime = new Date(kickoff);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - kickoffTime.getTime()) / 60000
    );

    // Handle half time (45-60 minutes shows as 45+)
    if (diffInMinutes >= 45 && diffInMinutes < 60) {
      return 45;
    }

    // Handle full time (90+ minutes)
    if (diffInMinutes >= 90) {
      return 90;
    }

    // Handle second half (subtract 15 minutes for half time)
    if (diffInMinutes > 60) {
      return diffInMinutes - 15;
    }

    return diffInMinutes;
  }

  getMatchTime(match: Match): string {
    if (!match.liveScore?.isLive) return '';

    // Check if match is finished
    if (this.isMatchFinished(match)) {
      return 'FT';
    }

    const minute = match.liveScore.minute;
    const additionalTime = match.liveScore.additionalTime;

    if (minute === 45 && additionalTime) {
      return `45+${additionalTime}'`;
    }
    if (minute === 90 && additionalTime) {
      return `90+${additionalTime}'`;
    }
    return `${minute}'`;
  }

  isMatchFinished(match: Match): boolean {
    const kickoff = new Date(match.kickoff);
    const now = new Date();
    // Match is finished if it's more than 2 hours after kickoff
    return now > new Date(kickoff.getTime() + 2 * 60 * 60 * 1000);
  }

  isMatchLive(match: Match): boolean {
    const kickoff = new Date(match.kickoff);
    const now = new Date();
    // Match is live if it's within the 2-hour window after kickoff and not finished
    return (
      now >= kickoff &&
      now <= new Date(kickoff.getTime() + 2 * 60 * 60 * 1000) &&
      !this.isMatchFinished(match)
    );
  }

  getScoreClass(match: Match): string {
    if (this.isMatchFinished(match)) {
      return 'finished';
    }
    return 'live';
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
}
