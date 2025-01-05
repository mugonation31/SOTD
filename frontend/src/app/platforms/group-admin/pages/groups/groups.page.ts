import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSpinner,
  IonBadge,
  IonIcon,
  IonList,
  IonModal,
  IonListHeader,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonSearchbar,
  IonToggle,
  IonAlert,
  IonRippleEffect,
  IonCardSubtitle,
  IonSelect,
  IonSelectOption,
  IonNote,
  IonRange,
} from '@ionic/angular/standalone';
import { NgIf, NgFor, DatePipe, CurrencyPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  copyOutline,
  addOutline,
  starOutline,
  trashOutline,
  settingsOutline,
  searchOutline,
  banOutline,
  checkmarkCircleOutline,
  personRemoveOutline,
  shieldOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';

interface GroupMember {
  id: string;
  name: string;
  email: string;
  joinedAt: Date;
  status: 'active' | 'inactive';
  role: 'admin' | 'player';
}

interface GroupSettings {
  allowPlayerInvites: boolean;
  autoApproveJoins: boolean;
  showLeaderboard: boolean;
  allowMemberChat: boolean;
}

interface Group {
  id: string;
  name: string;
  code: string;
  memberCount: number;
  createdAt: Date;
  members: GroupMember[];
  settings: GroupSettings;
  type: 'casual' | 'prize';
  entryFee?: number;
  paidMembers: number;
  totalPrizePool?: number;
  adminName: string;
}

@Component({
  selector: 'app-groups',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>My Groups</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Create New Group Card -->
      <ion-card class="create-group-card">
        <ion-card-header>
          <ion-card-title>Create New Group</ion-card-title>
          <ion-card-subtitle>Set up your prediction group</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <form [formGroup]="groupForm" (ngSubmit)="createGroup()">
            <!-- Group Type Selection -->
            <div class="group-type-selection">
              <ion-segment
                formControlName="type"
                (ionChange)="onGroupTypeChange()"
              >
                <ion-segment-button value="casual">
                  <ion-label>
                    <div class="segment-content">
                      <ion-icon name="trophy-outline"></ion-icon>
                      <div class="segment-text">
                        <h3>Casual Group</h3>
                        <p>Play for bragging rights</p>
                      </div>
                    </div>
                  </ion-label>
                </ion-segment-button>

                <ion-segment-button value="prize">
                  <ion-label>
                    <div class="segment-content">
                      <ion-icon name="cash-outline"></ion-icon>
                      <div class="segment-text">
                        <h3>Prize Group</h3>
                        <p>Play for cash prizes</p>
                      </div>
                    </div>
                  </ion-label>
                </ion-segment-button>
              </ion-segment>
            </div>

            <!-- Entry Fee Selection -->
            <div
              class="entry-fee-section"
              *ngIf="groupForm.get('type')?.value === 'prize'"
            >
              <ion-item lines="none">
                <ion-label position="stacked">Entry Fee</ion-label>

                <div class="fee-selector">
                  <!-- Range Slider -->
                  <div class="range-container">
                    <ion-range
                      class="fee-range"
                      [min]="5"
                      [max]="100"
                      [step]="5"
                      [pin]="true"
                      [ticks]="true"
                      [snaps]="true"
                      formControlName="entryFee"
                      (ionChange)="onEntryFeeChange($event)"
                    >
                      <div slot="start" class="range-label">£5</div>
                      <div slot="end" class="range-label">£100</div>
                    </ion-range>
                  </div>

                  <!-- Manual Input -->
                  <div class="manual-fee-input">
                    <ion-input
                      type="number"
                      [min]="5"
                      [max]="100"
                      [step]="5"
                      formControlName="entryFee"
                      (ionInput)="onManualFeeInput($event)"
                      class="fee-input"
                      placeholder="Enter fee"
                    >
                      <div slot="start">£</div>
                    </ion-input>
                  </div>
                </div>

                <ion-note>Move the slider or enter amount (£5 - £100)</ion-note>
              </ion-item>

              <div
                class="prize-breakdown"
                *ngIf="groupForm.get('type')?.value === 'prize'"
              >
                <h4>Prize Breakdown</h4>

                <!-- Show this when entry fee is set -->
                <div
                  class="prize-distribution"
                  *ngIf="groupForm.get('entryFee')?.value"
                >
                  <div class="current-pool">
                    <p>
                      Entry Fee:
                      {{ groupForm.get('entryFee')?.value | currency : 'GBP' }}
                    </p>
                    <p>Current Members: {{ currentMemberCount }}</p>
                    <p class="pool-total">
                      Potential Prize Pool:
                      {{ calculateTotalPool() | currency : 'GBP' }}
                    </p>
                  </div>

                  <div class="prize-items">
                    <div class="prize-item">
                      <ion-badge color="gold">1st</ion-badge>
                      <span>{{ calculatePrize(1) | currency : 'GBP' }}</span>
                    </div>
                    <div class="prize-item">
                      <ion-badge color="silver">2nd</ion-badge>
                      <span>{{ calculatePrize(2) | currency : 'GBP' }}</span>
                    </div>
                    <div class="prize-item">
                      <ion-badge color="bronze">3rd</ion-badge>
                      <span>{{ calculatePrize(3) | currency : 'GBP' }}</span>
                    </div>
                  </div>

                  <div class="prize-note">
                    <ion-note>
                      * Prize amounts will be finalized once all members have
                      joined and paid
                    </ion-note>
                  </div>
                </div>

                <!-- Show this when no entry fee is set -->
                <div
                  class="prize-info"
                  *ngIf="!groupForm.get('entryFee')?.value"
                >
                  <p>Set an entry fee to see potential prize distribution</p>
                </div>
              </div>
            </div>

            <!-- Group Name -->
            <ion-item class="group-name-input">
              <ion-label position="stacked">Group Name</ion-label>
              <ion-input
                formControlName="name"
                placeholder="Enter a memorable name for your group"
                [clearInput]="true"
              ></ion-input>
            </ion-item>

            <div class="form-actions">
              <ion-button
                expand="block"
                type="submit"
                [disabled]="!groupForm.valid || isLoading"
                class="create-button"
              >
                <ion-spinner *ngIf="isLoading"></ion-spinner>
                <span *ngIf="!isLoading">
                  <ion-icon name="add-circle-outline"></ion-icon>
                  Create Group
                </span>
              </ion-button>
            </div>
          </form>
        </ion-card-content>
      </ion-card>

      <div class="group-details" *ngIf="selectedGroup">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Group Details</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <div class="details-grid">
              <div class="detail-item">
                <label>Group Name</label>
                <p>{{ selectedGroup.name }}</p>
              </div>

              <div class="detail-item">
                <label>Group Admin</label>
                <p>{{ selectedGroup.adminName }}</p>
              </div>

              <div class="detail-item">
                <label>Created</label>
                <p>{{ selectedGroup.createdAt | date : 'medium' }}</p>
              </div>

              <div class="detail-item">
                <label>Type</label>
                <p>
                  {{
                    selectedGroup.type === 'prize'
                      ? 'Prize Group'
                      : 'Casual Group'
                  }}
                </p>
              </div>

              <div class="detail-item" *ngIf="selectedGroup.type === 'prize'">
                <label>Entry Fee</label>
                <p>{{ selectedGroup.entryFee | currency : 'GBP' }}</p>
              </div>

              <div class="detail-item group-code">
                <label>Group Code</label>
                <div class="code-container">
                  <p class="code">{{ selectedGroup.code }}</p>
                  <ion-button
                    fill="clear"
                    (click)="copyGroupCode(selectedGroup.code)"
                  >
                    <ion-icon name="copy-outline"></ion-icon>
                  </ion-button>
                </div>
                <ion-note
                  >Share this code with players to join the group</ion-note
                >
              </div>
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Existing Groups List -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>My Groups</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item *ngFor="let group of groups">
              <div class="group-list-item">
                <div class="group-main-info">
                  <h2>{{ group.name }}</h2>
                  <div class="group-meta">
                    <span class="group-type">
                      <ion-badge
                        [color]="group.type === 'prize' ? 'primary' : 'medium'"
                      >
                        {{
                          group.type === 'prize'
                            ? 'Prize Group'
                            : 'Casual Group'
                        }}
                      </ion-badge>
                    </span>
                    <span class="group-admin">
                      <ion-icon name="person-outline"></ion-icon>
                      Admin: {{ group.adminName }}
                    </span>
                    <span class="group-date">
                      <ion-icon name="calendar-outline"></ion-icon>
                      Created: {{ group.createdAt | date : 'medium' }}
                    </span>
                    <span *ngIf="group.type === 'prize'" class="group-fee">
                      <ion-icon name="cash-outline"></ion-icon>
                      Entry Fee: {{ group.entryFee | currency : 'GBP' }}
                    </span>
                  </div>
                </div>

                <div class="group-details">
                  <div class="group-code-section">
                    <span class="label">Group Code:</span>
                    <span class="code">{{ group.code }}</span>
                    <ion-button
                      fill="clear"
                      size="small"
                      (click)="copyGroupCode(group.code)"
                    >
                      <ion-icon name="copy-outline"></ion-icon>
                    </ion-button>
                  </div>

                  <div class="group-stats">
                    <span class="members">
                      <ion-icon name="people-outline"></ion-icon>
                      {{ group.memberCount }} Members
                    </span>

                    <span *ngIf="group.type === 'prize'" class="entry-fee">
                      <ion-icon name="cash-outline"></ion-icon>
                      Entry Fee: {{ group.entryFee | currency : 'GBP' }}
                    </span>

                    <span *ngIf="group.type === 'prize'" class="paid-members">
                      <ion-icon name="checkmark-circle-outline"></ion-icon>
                      {{ group.paidMembers }}/{{ group.memberCount }} Paid
                    </span>
                  </div>
                </div>

                <div class="group-actions">
                  <ion-button
                    fill="clear"
                    color="primary"
                    (click)="viewGroupDetails(group)"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                    View
                  </ion-button>
                  <ion-button
                    fill="clear"
                    color="danger"
                    (click)="deleteGroup(group)"
                  >
                    <ion-icon name="trash-outline"></ion-icon>
                    Delete
                  </ion-button>
                </div>
              </div>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <!-- Enhanced Group Details Modal -->
      <ion-modal [isOpen]="!!selectedGroup" (didDismiss)="selectedGroup = null">
        <ng-template>
          <ion-header>
            <ion-toolbar>
              <ion-title>{{ selectedGroup?.name }}</ion-title>
              <ion-buttons slot="end">
                <ion-button (click)="selectedGroup = null">Close</ion-button>
              </ion-buttons>
            </ion-toolbar>
            <ion-toolbar>
              <ion-segment [(ngModel)]="selectedTab">
                <ion-segment-button value="members">
                  <ion-label>Members</ion-label>
                </ion-segment-button>
                <ion-segment-button value="settings">
                  <ion-label>Settings</ion-label>
                </ion-segment-button>
              </ion-segment>
            </ion-toolbar>
          </ion-header>

          <ion-content class="ion-padding" *ngIf="selectedGroup">
            <!-- Members Tab -->
            <div *ngIf="selectedTab === 'members'">
              <ion-searchbar
                placeholder="Search members"
                [(ngModel)]="searchTerm"
                (ionInput)="filterMembers()"
              ></ion-searchbar>

              <ion-list>
                <ion-list-header>
                  <ion-label>Members ({{ filteredMembers.length }})</ion-label>
                </ion-list-header>

                <ion-item *ngFor="let member of filteredMembers">
                  <ion-label>
                    <h2>{{ member.name }}</h2>
                    <p>{{ member.email }}</p>
                    <p>Joined: {{ member.joinedAt | date }}</p>
                    <p>Status: {{ member.status }}</p>
                  </ion-label>
                  <ion-badge
                    slot="end"
                    [color]="member.role === 'admin' ? 'warning' : 'primary'"
                  >
                    {{ member.role }}
                  </ion-badge>
                  <ion-buttons slot="end">
                    <ion-button
                      fill="clear"
                      (click)="manageMemberRole(member)"
                      [title]="
                        member.role === 'admin'
                          ? 'Demote to Player'
                          : 'Promote to Admin'
                      "
                      class="role-button"
                      [class.admin-role]="member.role === 'admin'"
                    >
                      <ion-icon
                        [name]="
                          member.role === 'admin'
                            ? 'shield-checkmark-outline'
                            : 'shield-outline'
                        "
                        slot="icon-only"
                      ></ion-icon>
                      <ion-ripple-effect></ion-ripple-effect>
                    </ion-button>
                    <ion-button
                      fill="clear"
                      [color]="
                        member.status === 'active' ? 'warning' : 'success'
                      "
                      (click)="toggleMemberStatus(member)"
                      title="Toggle Status"
                    >
                      <ion-icon
                        [name]="
                          member.status === 'active'
                            ? 'ban-outline'
                            : 'checkmark-circle-outline'
                        "
                        slot="icon-only"
                      ></ion-icon>
                    </ion-button>
                    <ion-button
                      fill="clear"
                      color="danger"
                      (click)="removeMember(member)"
                      title="Remove Member"
                    >
                      <ion-icon
                        name="trash-outline"
                        slot="icon-only"
                      ></ion-icon>
                    </ion-button>
                  </ion-buttons>
                </ion-item>
              </ion-list>
            </div>

            <!-- Settings Tab -->
            <div *ngIf="selectedTab === 'settings'" class="ion-padding">
              <ion-list>
                <ion-item>
                  <ion-label>Allow Player Invites</ion-label>
                  <ion-toggle
                    [(ngModel)]="selectedGroup.settings.allowPlayerInvites"
                    (ionChange)="saveSettings()"
                  ></ion-toggle>
                </ion-item>

                <ion-item>
                  <ion-label>Auto-approve Joins</ion-label>
                  <ion-toggle
                    [(ngModel)]="selectedGroup.settings.autoApproveJoins"
                    (ionChange)="saveSettings()"
                  ></ion-toggle>
                </ion-item>

                <ion-item>
                  <ion-label>Show Leaderboard</ion-label>
                  <ion-toggle
                    [(ngModel)]="selectedGroup.settings.showLeaderboard"
                    (ionChange)="saveSettings()"
                  ></ion-toggle>
                </ion-item>

                <ion-item>
                  <ion-label>Allow Member Chat</ion-label>
                  <ion-toggle
                    [(ngModel)]="selectedGroup.settings.allowMemberChat"
                    (ionChange)="saveSettings()"
                  ></ion-toggle>
                </ion-item>
              </ion-list>
            </div>
          </ion-content>
        </ng-template>
      </ion-modal>
    </ion-content>
  `,
  styles: [
    `
      ion-item {
        margin-bottom: 10px;
        --background: transparent;
      }
      ion-badge {
        margin-right: 8px;
      }
      ion-segment {
        --background: var(--ion-color-light);
      }
      ion-searchbar {
        margin-bottom: 1rem;
      }
      .settings-section {
        margin-bottom: 2rem;
      }
      ion-toggle {
        padding-right: 1rem;
      }
      .role-button {
        transition: all 0.3s ease;
      }
      .role-button.admin-role {
        color: var(--ion-color-warning);
      }
      @keyframes roleChange {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
        }
      }
      .role-changed {
        animation: roleChange 0.5s ease;
      }
      .create-group-card {
        margin-bottom: 2rem;
        border-radius: 16px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      ion-card-header {
        background: var(--ion-color-primary);
        color: white;
        border-radius: 16px 16px 0 0;
      }

      ion-card-title {
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
      }

      ion-card-subtitle {
        color: rgba(255, 255, 255, 0.8);
      }

      .group-type-selection {
        margin: 1.5rem 0;
      }

      .segment-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
      }

      .segment-text {
        text-align: left;
      }

      .segment-text h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
      }

      .segment-text p {
        margin: 0;
        font-size: 0.8rem;
        opacity: 0.8;
      }

      .entry-fee-section {
        margin: 1.5rem 0;
        padding: 1rem;
        background: var(--ion-color-light);
        border-radius: 8px;
      }

      .prize-breakdown {
        margin-top: 1rem;
        padding: 1rem;
        background: var(--ion-color-light);
        border-radius: 8px;
      }

      .current-pool {
        text-align: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--ion-color-light-shade);
      }

      .current-pool p {
        margin: 0.5rem 0;
        color: var(--ion-color-medium);
      }

      .pool-total {
        font-weight: 600;
        color: var(--ion-color-dark) !important;
        font-size: 1.1rem;
      }

      .prize-items {
        display: flex;
        justify-content: space-around;
        gap: 1rem;
      }

      .prize-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }

      .prize-item span {
        font-weight: 600;
      }

      ion-badge[color='gold'] {
        --background: #ffd700;
        --color: #000;
      }

      ion-badge[color='silver'] {
        --background: #c0c0c0;
        --color: #000;
      }

      ion-badge[color='bronze'] {
        --background: #cd7f32;
        --color: #fff;
      }

      .prize-note {
        margin-top: 1rem;
        text-align: center;
      }

      .group-name-input {
        margin: 1.5rem 0;
      }

      .form-actions {
        margin-top: 2rem;
      }

      .create-button {
        --border-radius: 8px;
        height: 48px;
      }

      .fee-selector {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin: 1rem 0;
        width: 100%;
      }

      .range-container {
        flex: 1;
        padding: 0 0.5rem;
      }

      .fee-range {
        --bar-height: 3px;
        --bar-border-radius: 2px;
        --knob-size: 20px;
        --knob-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        --pin-background: var(--ion-color-primary);
        --pin-color: var(--ion-color-primary-contrast);
        --bar-background: var(--ion-color-light-shade);
        --bar-background-active: var(--ion-color-primary);
        --knob-background: var(--ion-color-primary);
        --knob-border-radius: 50%;
      }

      .fee-range::part(tick) {
        background: var(--ion-color-medium);
        width: 1px;
        height: 8px;
      }

      .fee-range::part(tick-active) {
        background: var(--ion-color-primary);
      }

      .range-label {
        font-size: 0.8rem;
        color: var(--ion-color-medium);
      }

      .manual-fee-input {
        width: 100px;
        margin-left: 1rem;
      }

      .fee-input {
        --background: var(--ion-color-light);
        --border-radius: 8px;
        --padding-start: 8px;
        --padding-end: 8px;
        --padding-top: 6px;
        --padding-bottom: 6px;
        font-weight: 500;
        font-size: 1rem;
        border: 1px solid var(--ion-color-light-shade);
      }

      .fee-input:focus {
        border-color: var(--ion-color-primary);
      }

      .group-details {
        margin-top: 2rem;
      }

      .details-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
      }

      .detail-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .detail-item label {
        color: var(--ion-color-medium);
        font-size: 0.9rem;
      }

      .detail-item p {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 500;
        color: var(--ion-color-dark);
      }

      .group-code {
        grid-column: 1 / -1;
      }

      .code-container {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .code {
        font-family: monospace;
        font-size: 1.2rem !important;
        letter-spacing: 2px;
        background: var(--ion-color-light);
        padding: 0.5rem 1rem;
        border-radius: 4px;
      }

      .group-list-item {
        width: 100%;
        padding: 1rem 0;
      }

      .group-main-info h2 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--ion-color-dark);
      }

      .group-meta {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: 0.5rem;
        font-size: 0.9rem;
        color: var(--ion-color-medium);
      }

      .group-details {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--ion-color-light-shade);
      }

      .group-code-section {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }

      .group-code-section .label {
        color: var(--ion-color-medium);
      }

      .group-code-section .code {
        font-family: monospace;
        font-weight: 600;
        letter-spacing: 1px;
        background: var(--ion-color-light);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
      }

      .group-stats {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-top: 0.5rem;
        color: var(--ion-color-medium);
      }

      .group-stats ion-icon {
        margin-right: 0.25rem;
        vertical-align: middle;
      }

      .group-actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        margin-top: 1rem;
      }

      ion-item {
        --padding-start: 1rem;
        --padding-end: 1rem;
        --inner-padding-end: 0;
      }

      .group-meta ion-icon {
        margin-right: 4px;
        vertical-align: middle;
        font-size: 16px;
      }

      .group-fee {
        font-weight: 500;
        color: var(--ion-color-success);
      }

      .group-admin {
        font-weight: 500;
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
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSpinner,
    IonBadge,
    IonIcon,
    IonList,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    DatePipe,
    IonModal,
    IonListHeader,
    IonButtons,
    IonSegment,
    IonSegmentButton,
    IonSearchbar,
    IonToggle,
    IonAlert,
    IonRippleEffect,
    IonCardSubtitle,
    IonSelect,
    IonSelectOption,
    IonNote,
    IonRange,
    CurrencyPipe,
  ],
})
export class GroupsPage {
  groupForm: FormGroup;
  isLoading = false;
  groups: Group[] = [];
  selectedGroup: Group | null = null;
  selectedTab = 'members';
  searchTerm = '';
  filteredMembers: GroupMember[] = [];
  entryFeeOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  currentMemberCount = 0;
  currentAdmin = {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
  };

  constructor(private fb: FormBuilder, private toastService: ToastService) {
    addIcons({
      copyOutline,
      addOutline,
      starOutline,
      trashOutline,
      settingsOutline,
      searchOutline,
      banOutline,
      checkmarkCircleOutline,
      personRemoveOutline,
      shieldOutline,
      shieldCheckmarkOutline,
    });

    this.groupForm = this.fb.group({
      type: ['casual', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      entryFee: [null],
    });

    // Load mock data
    this.loadMockGroups();
  }

  private loadMockGroups() {
    this.groups = [
      {
        id: '1',
        name: 'Premier League Predictions',
        code: 'PREM2024',
        memberCount: 12,
        createdAt: new Date('2024-01-15'),
        members: [],
        settings: {
          allowPlayerInvites: true,
          autoApproveJoins: false,
          showLeaderboard: true,
          allowMemberChat: true,
        },
        type: 'casual',
        paidMembers: 0,
        totalPrizePool: 0,
        adminName: 'Current Admin',
      },
      {
        id: '2',
        name: 'Champions League Group',
        code: 'UCL2024',
        memberCount: 8,
        createdAt: new Date('2024-02-01'),
        members: [],
        settings: {
          allowPlayerInvites: true,
          autoApproveJoins: false,
          showLeaderboard: true,
          allowMemberChat: true,
        },
        type: 'casual',
        paidMembers: 0,
        totalPrizePool: 0,
        adminName: 'Current Admin',
      },
    ];
  }

  onGroupTypeChange() {
    const type = this.groupForm.get('type')?.value;
    if (type === 'casual') {
      this.groupForm.get('entryFee')?.setValue(null);
      this.groupForm.get('entryFee')?.clearValidators();
    } else {
      this.groupForm.get('entryFee')?.setValidators(Validators.required);
    }
    this.groupForm.get('entryFee')?.updateValueAndValidity();
  }

  calculatePrize(position: number): number {
    const totalPool = this.calculateTotalPool();
    const distribution = this.getPrizeDistribution(this.currentMemberCount);
    return totalPool * distribution[position];
  }

  calculateTotalPool(): number {
    const entryFee = this.groupForm.get('entryFee')?.value || 0;
    return entryFee * this.currentMemberCount;
  }

  getPrizeDistribution(memberCount: number): { [key: number]: number } {
    if (memberCount <= 5) {
      return {
        1: 0.7,
        2: 0.3,
        3: 0,
      };
    } else if (memberCount <= 10) {
      return {
        1: 0.5,
        2: 0.3,
        3: 0.2,
      };
    } else {
      return {
        1: 0.45,
        2: 0.35,
        3: 0.2,
      };
    }
  }

  async createGroup() {
    if (this.groupForm.valid) {
      this.isLoading = true;
      try {
        const groupData: Group = {
          ...this.groupForm.value,
          id: Date.now().toString(),
          code: this.generateGroupCode(),
          createdAt: new Date(),
          memberCount: 1,
          members: [
            {
              id: this.currentAdmin.id,
              name: this.currentAdmin.name,
              email: this.currentAdmin.email,
              joinedAt: new Date(),
              status: 'active',
              role: 'admin',
            },
          ],
          paidMembers: 0,
          totalPrizePool: 0,
          adminName: this.currentAdmin.name,
          settings: {
            allowPlayerInvites: true,
            autoApproveJoins: false,
            showLeaderboard: true,
            allowMemberChat: true,
          },
        };

        if (groupData.type === 'prize' && groupData.entryFee) {
          groupData.totalPrizePool = 0;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        this.groups.unshift(groupData);
        this.selectedGroup = groupData;
        this.groupForm.reset({ type: 'casual' });

        const message =
          groupData.type === 'prize'
            ? `Group "${groupData.name}" created successfully! Entry fee: ${groupData.entryFee} GBP. Share code: ${groupData.code}`
            : `Group "${groupData.name}" created successfully! Share code: ${groupData.code}`;

        await this.toastService.showToast(message, 'success');
      } catch (error) {
        await this.toastService.showToast('Failed to create group', 'error');
      } finally {
        this.isLoading = false;
      }
    }
  }

  private generateGroupCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  async copyCode(event: Event, code: string) {
    event.stopPropagation(); // Prevent group details from opening
    try {
      await navigator.clipboard.writeText(code);
      await this.toastService.showToast(
        'Group code copied to clipboard',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error copying code', 'error');
    }
  }

  async showGroupDetails(group: Group) {
    this.selectedGroup = group;
    this.filteredMembers = [...group.members];
  }

  filterMembers() {
    if (!this.selectedGroup) return;

    const term = this.searchTerm.toLowerCase();
    this.filteredMembers = this.selectedGroup.members.filter(
      (member) =>
        member.name.toLowerCase().includes(term) ||
        member.email.toLowerCase().includes(term)
    );
  }

  async manageMemberRole(member: GroupMember) {
    const isPromotion = member.role === 'player';
    const action = isPromotion ? 'promote' : 'demote';
    const newRole = isPromotion ? 'admin' : 'player';

    const alert = document.createElement('ion-alert');
    alert.header = `${isPromotion ? 'Promote' : 'Demote'} Member`;
    alert.message = `
      <p>Are you sure you want to ${action} <strong>${
      member.name
    }</strong> to ${newRole}?</p>
      ${
        isPromotion
          ? `
        <p>As an admin, they will be able to:</p>
        <ul>
          <li>Manage group members</li>
          <li>Change group settings</li>
          <li>View all predictions</li>
          <li>Manage deadlines</li>
        </ul>
      `
          : `
        <p>They will lose all admin privileges and become a regular player.</p>
      `
      }
    `;
    alert.buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Confirm',
        role: 'confirm',
        handler: async () => {
          try {
            // Mock API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Update role
            member.role = newRole;

            // Add animation class
            const memberElement = document.querySelector(
              `[data-member-id="${member.id}"]`
            );
            memberElement?.classList.add('role-changed');
            setTimeout(() => {
              memberElement?.classList.remove('role-changed');
            }, 500);

            await this.toastService.showToast(
              `${member.name} has been ${action}d to ${newRole}`,
              'success'
            );
          } catch (error) {
            await this.toastService.showToast(
              `Failed to ${action} member`,
              'error'
            );
          }
        },
      },
    ];

    document.body.appendChild(alert);
    await alert.present();
  }

  async removeMember(member: GroupMember) {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
      await this.toastService.showToast('Failed to remove member', 'error');
    }
  }

  async toggleMemberStatus(member: GroupMember) {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      member.status = member.status === 'active' ? 'inactive' : 'active';
      await this.toastService.showToast(
        `Member ${member.status === 'active' ? 'activated' : 'deactivated'}`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast(
        'Failed to update member status',
        'error'
      );
    }
  }

  async saveSettings() {
    if (!this.selectedGroup) return;

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await this.toastService.showToast(
        'Settings saved successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Failed to save settings', 'error');
    }
  }

  onEntryFeeChange(event: any) {
    const value = event.detail.value;
    // Ensure the value is a multiple of 5
    const roundedValue = Math.round(value / 5) * 5;
    this.groupForm.patchValue({ entryFee: roundedValue }, { emitEvent: false });
  }

  onManualFeeInput(event: any) {
    let value = event.detail.value;
    // Ensure the value is within bounds
    if (value < 5) value = 5;
    if (value > 100) value = 100;
    // Round to nearest £5
    const roundedValue = Math.round(value / 5) * 5;
    if (value !== roundedValue) {
      this.groupForm.patchValue(
        { entryFee: roundedValue },
        { emitEvent: false }
      );
    }
  }

  async copyGroupCode(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      await this.toastService.showToast(
        'Group code copied to clipboard',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Failed to copy code', 'error');
    }
  }

  viewGroupDetails(group: Group) {
    this.selectedGroup = group;
    // You could also navigate to a details view or show a modal
    // this.router.navigate(['/group-admin/groups', group.id]);
  }

  async deleteGroup(group: Group) {
    // Show confirmation dialog
    const alert = document.createElement('ion-alert');
    alert.header = 'Confirm Delete';
    alert.message = `Are you sure you want to delete the group "${group.name}"?`;
    alert.buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler: async () => {
          try {
            // Remove group from the list
            this.groups = this.groups.filter((g) => g.id !== group.id);

            // Clear selected group if it was the deleted one
            if (this.selectedGroup?.id === group.id) {
              this.selectedGroup = null;
            }

            await this.toastService.showToast(
              'Group deleted successfully',
              'success'
            );
          } catch (error) {
            await this.toastService.showToast(
              'Failed to delete group',
              'error'
            );
          }
        },
      },
    ];

    document.body.appendChild(alert);
    await alert.present();
  }
}
