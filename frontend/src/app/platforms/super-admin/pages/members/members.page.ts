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
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonBadge,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  personOutline,
  mailOutline,
  banOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  filterOutline,
} from 'ionicons/icons';

interface Member {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  joinedDate: Date;
  groups: string[];
  lastActive: Date;
}

@Component({
  selector: 'app-members',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Members Management</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Search and Filters -->
      <ion-card>
        <ion-card-content>
          <div class="filters-container">
            <ion-searchbar
              [(ngModel)]="searchTerm"
              (ionInput)="filterMembers()"
              placeholder="Search by name or email"
            ></ion-searchbar>
            <ion-segment
              [(ngModel)]="statusFilter"
              (ionChange)="filterMembers()"
            >
              <ion-segment-button value="all">
                <ion-label>All</ion-label>
              </ion-segment-button>
              <ion-segment-button value="active">
                <ion-label>Active</ion-label>
              </ion-segment-button>
              <ion-segment-button value="inactive">
                <ion-label>Inactive</ion-label>
              </ion-segment-button>
            </ion-segment>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Members List -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Members List</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item *ngFor="let member of filteredMembers">
              <ion-label>
                <h2>{{ member.name }}</h2>
                <p>{{ member.email }}</p>
                <p>Joined: {{ member.joinedDate | date : 'mediumDate' }}</p>
                <p>
                  Last Active: {{ member.lastActive | date : 'mediumDate' }}
                </p>
                <p>
                  Groups:
                  <ion-badge
                    color="primary"
                    *ngFor="let group of member.groups"
                    class="group-badge"
                  >
                    {{ group }}
                  </ion-badge>
                </p>
              </ion-label>
              <ion-badge
                [color]="member.status === 'active' ? 'success' : 'medium'"
                slot="end"
              >
                {{ member.status | titlecase }}
              </ion-badge>
              <ion-buttons slot="end">
                <ion-button
                  fill="clear"
                  [color]="member.status === 'active' ? 'danger' : 'success'"
                  (click)="toggleMemberStatus(member)"
                >
                  <ion-icon
                    [name]="
                      member.status === 'active'
                        ? 'ban-outline'
                        : 'checkmark-circle-outline'
                    "
                  ></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styles: [
    `
      .filters-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      ion-searchbar {
        --background: var(--ion-color-light);
        --border-radius: 8px;
      }

      ion-segment {
        --background: var(--ion-color-light);
        border-radius: 8px;
      }

      .group-badge {
        margin-right: 4px;
        margin-top: 4px;
      }

      ion-item {
        --padding-start: 1rem;
        --padding-end: 1rem;
        --padding-top: 0.5rem;
        --padding-bottom: 0.5rem;

        ion-label {
          h2 {
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 4px;
          }

          p {
            margin: 2px 0;
            color: var(--ion-color-medium);
          }
        }

        ion-badge {
          font-weight: 500;
          padding: 4px 8px;
        }

        ion-buttons {
          margin-left: 1rem;
        }
      }
    `,
  ],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    DatePipe,
    TitleCasePipe,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonBadge,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonButtons,
  ],
})
export class MembersPage {
  members: Member[] = [];
  filteredMembers: Member[] = [];
  searchTerm = '';
  statusFilter = 'all';

  constructor() {
    addIcons({
      peopleOutline,
      personOutline,
      mailOutline,
      banOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      filterOutline,
    });

    // Load mock data
    this.loadMockMembers();
    this.filteredMembers = this.members;
  }

  private loadMockMembers() {
    this.members = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        status: 'active',
        joinedDate: new Date('2024-01-15'),
        groups: ['Premier League A', 'Champions League'],
        lastActive: new Date('2024-03-15'),
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        status: 'active',
        joinedDate: new Date('2024-02-01'),
        groups: ['Premier League B'],
        lastActive: new Date('2024-03-14'),
      },
      {
        id: '3',
        name: 'Bob Wilson',
        email: 'bob@example.com',
        status: 'inactive',
        joinedDate: new Date('2024-01-20'),
        groups: ['Premier League A'],
        lastActive: new Date('2024-02-28'),
      },
    ];
  }

  filterMembers() {
    this.filteredMembers = this.members.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus =
        this.statusFilter === 'all' || member.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  toggleMemberStatus(member: Member) {
    member.status = member.status === 'active' ? 'inactive' : 'active';
    this.filterMembers();
  }
}
