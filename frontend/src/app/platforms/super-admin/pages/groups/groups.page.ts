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
  IonSearchbar,
  IonBadge,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonModal,
  IonList,
  IonListHeader,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  ModalController,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersPage } from '../users/users.page';
import { ToastService } from '@core/services/toast.service';
import { addIcons } from 'ionicons';
import { eyeOutline, trashOutline, shieldOutline } from 'ionicons/icons';

interface GroupMember {
  id: string;
  name: string;
  email: string;
  joinedAt: Date;
  status: 'active' | 'inactive';
  role: 'admin' | 'player';
}

interface Group {
  id: string;
  name: string;
  code: string;
  adminName: string;
  memberCount: number;
  members: GroupMember[];
  createdAt: Date;
}

@Component({
  selector: 'app-groups',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Groups & Users Management</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment [(ngModel)]="activeTab">
          <ion-segment-button value="groups">
            <ion-label>Groups</ion-label>
          </ion-segment-button>
          <ion-segment-button value="users">
            <ion-label>Users</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="ion-padding">
        <!-- Groups Tab -->
        <div *ngIf="activeTab === 'groups'">
          <ion-card>
            <ion-card-header>
              <ion-card-title>All Groups</ion-card-title>
              <ion-searchbar
                [(ngModel)]="groupSearchTerm"
                (ionInput)="filterGroups()"
                placeholder="Search groups..."
              ></ion-searchbar>
            </ion-card-header>
            <ion-card-content>
              <ion-list>
                <ion-item *ngFor="let group of filteredGroups">
                  <ion-label>
                    <h2>{{ group.name }}</h2>
                    <p>
                      Code: <strong>{{ group.code }}</strong>
                    </p>
                    <p>Admin: {{ group.adminName }}</p>
                    <p>
                      Members:
                      <ion-badge color="primary">{{
                        group.memberCount
                      }}</ion-badge>
                    </p>
                  </ion-label>
                  <ion-button fill="clear" (click)="viewGroupDetails(group)">
                    <ion-icon name="eye-outline"></ion-icon>
                  </ion-button>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>
        </div>

        <!-- Users Tab -->
        <div *ngIf="activeTab === 'users'" class="users-container">
          <app-users></app-users>
        </div>
      </div>

      <!-- Group Details Modal -->
      <ion-modal [isOpen]="!!selectedGroup" (didDismiss)="selectedGroup = null">
        <ng-template>
          <ion-header>
            <ion-toolbar>
              <ion-title>{{ selectedGroup?.name }} Management</ion-title>
              <ion-buttons slot="end">
                <ion-button (click)="selectedGroup = null">Close</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>

          <ion-content class="ion-padding" *ngIf="selectedGroup">
            <!-- Group Details -->
            <ion-card>
              <ion-card-header>
                <ion-card-title>Group Details</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <p>
                  Code: <strong>{{ selectedGroup.code }}</strong>
                </p>
                <p>Created: {{ selectedGroup.createdAt | date }}</p>
                <p>Admin: {{ selectedGroup.adminName }}</p>
              </ion-card-content>
            </ion-card>

            <!-- Members Management -->
            <ion-card>
              <ion-card-header>
                <ion-card-title>Members</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item *ngFor="let member of selectedGroup.members">
                    <ion-label>
                      <h2>{{ member.name }}</h2>
                      <p>{{ member.email }}</p>
                      <p>
                        Role:
                        <ion-badge color="primary">{{ member.role }}</ion-badge>
                      </p>
                      <p>Joined: {{ member.joinedAt | date }}</p>
                    </ion-label>
                    <ion-button
                      fill="clear"
                      color="warning"
                      (click)="overrideAccess(member)"
                      title="Override Role"
                    >
                      <ion-icon name="shield-outline"></ion-icon>
                    </ion-button>
                    <ion-button
                      fill="clear"
                      color="danger"
                      (click)="removeMember(member)"
                      title="Remove from Group"
                    >
                      <ion-icon name="trash-outline"></ion-icon>
                    </ion-button>
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-content>
        </ng-template>
      </ion-modal>
    </ion-content>
  `,
  styles: [
    `
      .users-container {
        height: 100%;
        width: 100%;
        display: block;
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
    IonSearchbar,
    IonBadge,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonModal,
    IonList,
    IonListHeader,
    IonButtons,
    IonSegment,
    IonSegmentButton,
    NgFor,
    NgIf,
    DatePipe,
    FormsModule,
    UsersPage,
  ],
})
export class GroupsPage {
  activeTab = 'groups';
  groupSearchTerm = '';
  filteredGroups: Group[] = [];
  groups: Group[] = [];
  selectedGroup: Group | null = null;

  constructor(private toastService: ToastService) {
    addIcons({
      eyeOutline,
      trashOutline,
      shieldOutline,
    });
    this.loadMockGroups();
  }

  private loadMockGroups() {
    this.groups = [
      {
        id: '1',
        name: 'Premier League A',
        code: 'PLA2024',
        adminName: 'John Admin',
        memberCount: 12,
        createdAt: new Date('2024-01-01'),
        members: [
          {
            id: '1',
            name: 'Player One',
            email: 'player1@example.com',
            joinedAt: new Date('2024-01-15'),
            status: 'active',
            role: 'player',
          },
          // ... more mock members
        ],
      },
      // ... more mock groups
    ];
    this.filterGroups();
  }

  filterGroups() {
    let filtered = [...this.groups];

    if (this.groupSearchTerm) {
      const term = this.groupSearchTerm.toLowerCase();
      filtered = filtered.filter(
        (group) =>
          group.name.toLowerCase().includes(term) ||
          group.code.toLowerCase().includes(term) ||
          group.adminName.toLowerCase().includes(term)
      );
    }

    this.filteredGroups = filtered;
  }

  viewGroupDetails(group: Group) {
    this.selectedGroup = group;
  }

  async deleteGroup(group: Group) {
    if (confirm(`Are you sure you want to delete group ${group.name}?`)) {
      try {
        this.groups = this.groups.filter((g) => g.id !== group.id);
        this.filterGroups();
        await this.toastService.showToast(
          'Group deleted successfully',
          'success'
        );
      } catch (error) {
        await this.toastService.showToast('Error deleting group', 'error');
      }
    }
  }

  async overrideAccess(member: GroupMember) {
    if (
      confirm(`Are you sure you want to override access for ${member.name}?`)
    ) {
      try {
        member.role = member.role === 'admin' ? 'player' : 'admin';
        await this.toastService.showToast(
          `Member role updated to ${member.role}`,
          'success'
        );
      } catch (error) {
        await this.toastService.showToast(
          'Error updating member role',
          'error'
        );
      }
    }
  }

  async removeMember(member: GroupMember) {
    if (confirm(`Are you sure you want to remove ${member.name}?`)) {
      try {
        if (this.selectedGroup) {
          this.selectedGroup.members = this.selectedGroup.members.filter(
            (m) => m.id !== member.id
          );
          this.selectedGroup.memberCount--;
        }
        await this.toastService.showToast(
          'Member removed successfully',
          'success'
        );
      } catch (error) {
        await this.toastService.showToast('Error removing member', 'error');
      }
    }
  }
}
