import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonBadge,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonSegment,
  IonSegmentButton,
  IonNote,
} from '@ionic/angular/standalone';
import {
  NgFor,
  NgIf,
  DatePipe,
  CurrencyPipe,
  TitleCasePipe,
} from '@angular/common';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personOutline,
  peopleOutline,
  personAddOutline,
  filterOutline,
  searchOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  warningOutline,
  createOutline,
  trashOutline,
  trophyOutline,
} from 'ionicons/icons';

interface Member {
  id: string;
  name: string;
  email: string;
  joinedAt: Date;
  groupName: string;
  role: 'admin' | 'player';
  hasPaid?: boolean;
  predictions?: number;
}

@Component({
  selector: 'app-members',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Member Management</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <!-- Filters and Search -->
            <ion-card>
              <ion-card-content>
                <div class="filters-container">
                  <!-- Group Filter -->
                  <ion-select
                    [value]="selectedGroup"
                    (ionChange)="filterByGroup($event)"
                    placeholder="Select Group"
                  >
                    <ion-select-option value="all"
                      >All Groups</ion-select-option
                    >
                    <ion-select-option
                      *ngFor="let group of groups"
                      [value]="group.id"
                    >
                      {{ group.name }}
                    </ion-select-option>
                  </ion-select>

                  <!-- Status Filter -->
                  <ion-segment
                    [value]="selectedFilter"
                    (ionChange)="filterMembers($event)"
                  >
                    <ion-segment-button value="all">
                      <ion-label>All Members</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="admins">
                      <ion-label>Admins</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="players">
                      <ion-label>Players</ion-label>
                    </ion-segment-button>
                  </ion-segment>

                  <!-- Search -->
                  <ion-searchbar
                    placeholder="Search members"
                    (ionInput)="searchMembers($event)"
                  ></ion-searchbar>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <!-- Members List -->
        <ion-row>
          <ion-col size="12">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Members</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item *ngFor="let member of filteredMembers">
                    <ion-icon
                      slot="start"
                      [name]="
                        member.role === 'admin'
                          ? 'person-outline'
                          : 'people-outline'
                      "
                      [color]="member.role === 'admin' ? 'primary' : 'medium'"
                    ></ion-icon>

                    <ion-label>
                      <h2>{{ member.name }}</h2>
                      <p>{{ member.email }}</p>
                      <p class="member-meta">
                        Group: {{ member.groupName }} | Joined:
                        {{ member.joinedAt | date : 'mediumDate' }}
                      </p>
                    </ion-label>

                    <ion-badge
                      slot="end"
                      *ngIf="isPrizeGroup"
                      [color]="member.hasPaid ? 'success' : 'warning'"
                    >
                      {{ member.hasPaid ? 'Paid' : 'Not Paid' }}
                    </ion-badge>

                    <div class="member-stats" slot="end">
                      <ion-note>
                        <ion-icon name="trophy-outline"></ion-icon>
                        Predictions: {{ member.predictions || 0 }}
                      </ion-note>
                    </div>
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styles: [
    `
      .filters-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
      }

      ion-select {
        --padding-start: 16px;
        --padding-end: 16px;
        max-width: 200px;
        background: var(--ion-color-light);
        border-radius: 8px;
      }

      ion-segment {
        background: var(--ion-color-light);
        border-radius: 8px;
        min-width: 300px;
      }

      ion-searchbar {
        --box-shadow: none;
        --background: var(--ion-color-light);
        --border-radius: 8px;
        padding: 0;
      }

      .member-meta {
        font-size: 0.85rem;
        color: var(--ion-color-medium);
      }

      .member-stats {
        display: flex;
        gap: 0.5rem;
      }

      ion-badge {
        margin-right: 1rem;
      }

      @media (max-width: 768px) {
        .filters-container {
          flex-direction: column;
          align-items: stretch;
        }

        ion-select,
        ion-segment {
          max-width: 100%;
          width: 100%;
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
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonBadge,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonSegment,
    IonSegmentButton,
    IonNote,
    NgFor,
    NgIf,
    DatePipe,
    CurrencyPipe,
    TitleCasePipe,
    RouterLink,
  ],
})
export class MembersPage implements OnInit {
  selectedGroup = 'all';
  selectedFilter = 'all';
  isPrizeGroup = false;
  searchTerm = '';

  groups = [
    { id: '1', name: 'Premier League 2024' },
    { id: '2', name: 'Champions League' },
    { id: '3', name: 'World Cup Predictions' },
  ];

  members: Member[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      joinedAt: new Date(),
      groupName: 'Premier League 2024',
      role: 'admin',
      hasPaid: true,
      predictions: 15,
    },
    // ... more members
  ];

  filteredMembers: Member[] = [];

  constructor() {
    addIcons({
      personOutline,
      peopleOutline,
      personAddOutline,
      filterOutline,
      searchOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      warningOutline,
      createOutline,
      trashOutline,
      trophyOutline,
    });
  }

  ngOnInit() {
    this.filteredMembers = this.members;
  }

  filterByGroup(event: any) {
    this.selectedGroup = event.detail.value;
    this.applyFilters();
  }

  filterMembers(event: any) {
    this.selectedFilter = event.detail.value;
    this.applyFilters();
  }

  searchMembers(event: any) {
    this.searchTerm = event.detail.value?.toLowerCase() || '';
    this.applyFilters();
  }

  applyFilters() {
    this.filteredMembers = this.members.filter((member) => {
      const matchesRole =
        this.selectedFilter === 'all' ||
        (this.selectedFilter === 'admins' && member.role === 'admin') ||
        (this.selectedFilter === 'players' && member.role === 'player');

      const matchesSearch =
        !this.searchTerm ||
        member.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchesRole && matchesSearch;
    });
  }
}
