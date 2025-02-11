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
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonButtons,
  IonSpinner,
  IonAlert,
  IonBadge,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  peopleCircleOutline,
  arrowForwardOutline,
  footballOutline,
  personOutline,
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';
import { GroupService } from '@core/services/group.service';

interface Group {
  id: string;
  name: string;
  memberCount: number;
  adminName: string;
  type: 'casual' | 'prize';
  entryFee?: number;
}

@Component({
  selector: 'app-join-group',
  template: `
    <ion-header>
      <ion-toolbar>
        <div class="logo-container" (click)="navigateTo('/player/dashboard')">
          <ion-icon name="football-outline" class="football-icon"></ion-icon>
          <div class="logo-text">
            <span class="logo-sotd">SOTD</span>
            <span class="logo-subtitle">Predict 3</span>
          </div>
        </div>
        <ion-buttons slot="end">
          <ion-button (click)="navigateTo('/player/settings')">
            <ion-icon name="person-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            <ion-icon name="people-circle-outline"></ion-icon>
            Join a Group
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p class="description">
            Enter a group code to join an existing prediction group
          </p>
          <div class="join-form">
            <ion-input
              type="text"
              [(ngModel)]="groupCode"
              (ionInput)="onGroupCodeInput($event)"
              placeholder="Enter group code"
              class="group-code-input"
              [disabled]="isLoading"
              maxlength="6"
            ></ion-input>
            <ion-button
              expand="block"
              (click)="joinGroup()"
              [disabled]="!isValidCode || isLoading"
            >
              <ion-spinner name="dots" *ngIf="isLoading"></ion-spinner>
              <span *ngIf="!isLoading">
                <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>
                Join Group
              </span>
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>
            <ion-icon name="people-outline"></ion-icon>
            My Groups
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div *ngIf="myGroups.length === 0" class="no-groups">
            <p>You haven't joined any groups yet.</p>
          </div>
          <ion-list *ngIf="myGroups.length > 0">
            <ion-item *ngFor="let group of myGroups">
              <div class="group-item">
                <div class="group-info">
                  <h3>{{ group.name }}</h3>
                  <p class="admin">Admin: {{ group.adminName }}</p>
                  <p class="members">{{ group.memberCount }} Members</p>
                </div>
                <div class="group-type">
                  <ion-badge
                    [color]="group.type === 'prize' ? 'warning' : 'primary'"
                  >
                    {{ group.type === 'prize' ? 'Prize Pool' : 'Casual' }}
                  </ion-badge>
                  <span *ngIf="group.type === 'prize'" class="entry-fee">
                    Entry Fee: £{{ group.entryFee }}
                  </span>
                </div>
              </div>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>

    <ion-alert
      [isOpen]="showGroupDetails"
      header="Group Details"
      [message]="getGroupDetailsMessage()"
      [buttons]="alertButtons"
    ></ion-alert>
  `,
  styles: [
    `
      // Logo Styles
      .logo-container {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        cursor: pointer;

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

      ion-buttons {
        ion-button {
          --padding-start: 8px;
          --padding-end: 8px;
          height: 36px;
        }

        ion-icon {
          font-size: 18px;
          color: var(--ion-color-medium);
        }
      }

      // Existing styles
      ion-card {
        margin: 0;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      ion-card-header {
        padding: 16px;

        ion-card-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.2rem;
          font-weight: 600;

          ion-icon {
            font-size: 1.4rem;
            color: var(--ion-color-primary);
          }
        }
      }

      .description {
        color: var(--ion-color-medium);
        margin-bottom: 24px;
        font-size: 0.95rem;
        line-height: 1.4;
      }

      .join-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .group-code-input {
        --background: var(--ion-color-light);
        --padding-start: 16px;
        --padding-end: 16px;
        --padding-top: 12px;
        --padding-bottom: 12px;
        border-radius: 8px;
        font-size: 1rem;
        text-transform: uppercase;
      }

      ion-button {
        margin: 0;
        height: 48px;
        --border-radius: 8px;
        font-weight: 500;
        font-size: 1rem;

        ion-icon {
          font-size: 1.2rem;
          margin-left: 8px;
        }

        ion-spinner {
          margin: 0 24px;
        }
      }

      .no-groups {
        text-align: center;
        padding: 16px;
        color: var(--ion-color-medium);
      }

      .group-item {
        width: 100%;
        padding: 8px 0;

        .group-info {
          h3 {
            margin: 0 0 4px 0;
            font-size: 1rem;
            font-weight: 600;
            color: var(--ion-color-dark);
          }

          p {
            margin: 0;
            font-size: 0.9rem;
            color: var(--ion-color-medium);

            &.admin {
              margin-bottom: 2px;
            }
          }
        }

        .group-type {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;

          ion-badge {
            --padding-start: 8px;
            --padding-end: 8px;
            --padding-top: 4px;
            --padding-bottom: 4px;
          }

          .entry-fee {
            font-size: 0.9rem;
            color: var(--ion-color-warning);
          }
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
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonButtons,
    IonSpinner,
    IonAlert,
    IonBadge,
    FormsModule,
    NgIf,
    NgFor,
  ],
})
export class JoinGroupPage {
  groupCode: string = '';
  isLoading: boolean = false;
  isValidCode: boolean = false;
  showGroupDetails: boolean = false;
  foundGroup: Group | null = null;
  myGroups: Group[] = [];

  // Mock current player data - in a real app, this would come from an auth service
  currentPlayer = {
    id: crypto.randomUUID(),
    name: 'Player User',
    email: 'player@example.com',
  };

  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.showGroupDetails = false;
      },
    },
    {
      text: 'Join',
      handler: () => {
        this.confirmJoinGroup();
      },
    },
  ];

  constructor(
    private router: Router,
    private toastService: ToastService,
    private groupService: GroupService
  ) {
    addIcons({
      peopleCircleOutline,
      arrowForwardOutline,
      footballOutline,
      personOutline,
    });
    this.loadMyGroups();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  onGroupCodeInput(event: any) {
    const value = event.target.value.toUpperCase();
    this.groupCode = value;
    this.isValidCode = this.validateGroupCode(value);
  }

  validateGroupCode(code: string): boolean {
    // Group code should be 6 characters long, alphanumeric
    const regex = /^[A-Z0-9]{6}$/;
    return regex.test(code);
  }

  async joinGroup() {
    if (!this.isValidCode) return;

    this.isLoading = true;

    try {
      // Find group by code
      const group = this.groupService.findGroupByCode(this.groupCode);

      if (group) {
        this.foundGroup = group;
        this.showGroupDetails = true;
      } else {
        await this.toastService.showToast('Group not found', 'error');
        // Only clear the input if group is not found
        this.groupCode = '';
        this.isValidCode = false;
      }
    } catch (error) {
      await this.toastService.showToast('Error finding group', 'error');
      // Clear the input on error
      this.groupCode = '';
      this.isValidCode = false;
    } finally {
      this.isLoading = false;
    }
  }

  getGroupDetailsMessage(): string {
    if (!this.foundGroup) return '';

    let message = `Group Name: ${this.foundGroup.name}\n`;
    message += `Admin: ${this.foundGroup.adminName}\n`;
    message += `Members: ${this.foundGroup.memberCount}\n`;
    message += `Type: ${
      this.foundGroup.type === 'prize' ? 'Prize Pool' : 'Casual'
    }\n`;

    if (this.foundGroup.type === 'prize') {
      message += `Entry Fee: £${this.foundGroup.entryFee}\n`;
    }

    return message;
  }

  private loadMyGroups() {
    const allGroups = this.groupService.getAllGroups();
    this.myGroups = allGroups.filter((group) =>
      group.members.some((member) => member.email === this.currentPlayer.email)
    );
  }

  async confirmJoinGroup() {
    if (!this.foundGroup) return;

    this.isLoading = true;

    try {
      const newMember = {
        id: this.currentPlayer.id,
        name: this.currentPlayer.name,
        email: this.currentPlayer.email,
        joinedAt: new Date(),
        status: 'active' as const,
        role: 'player' as const,
      };

      const updatedGroup = this.groupService.joinGroup(
        this.groupCode,
        newMember
      );

      if (updatedGroup) {
        // Reload the groups list after joining
        this.loadMyGroups();
        await this.toastService.showToast(
          'Successfully joined group!',
          'success'
        );
      } else {
        throw new Error('Failed to join group');
      }
    } catch (error) {
      let message = 'Error joining group';
      if (error instanceof Error) {
        message = error.message;
      }
      await this.toastService.showToast(message, 'error');
    } finally {
      // Clear everything after the join attempt is complete
      this.groupCode = '';
      this.isValidCode = false;
      this.isLoading = false;
      this.showGroupDetails = false;
      this.foundGroup = null;
    }
  }
}
