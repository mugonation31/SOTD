import { Component, OnInit } from '@angular/core';
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
  AlertController,
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
  peopleOutline,
  trophyOutline,
  cashOutline,
  createOutline,
  closeOutline,
  personOutline,
  personAddOutline,
  lockClosedOutline,
  lockOpenOutline,
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';
import { Router } from '@angular/router';
import { GroupService } from '@core/services/group.service';

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

interface GroupLeaderboardEntry {
  position: number;
  name: string;
  played: number;
  jokerUsed: number;
  totalPoints: number;
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
  leaderboard: GroupLeaderboardEntry[];
}

interface CurrentAdmin {
  id: string;
  name: string;
  email: string;
  members: GroupMember[];
}

@Component({
  selector: 'app-groups',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>My Group</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Create New Group Card - Only show if no existing group -->
      <ion-card class="create-group-card" *ngIf="!hasExistingGroup">
        <ion-card-header>
          <ion-card-title>Create Your Group</ion-card-title>
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
                      [min]="1"
                      [max]="100"
                      [step]="1"
                      [pin]="true"
                      [ticks]="true"
                      [snaps]="true"
                      formControlName="entryFee"
                      (ionChange)="onEntryFeeChange($event)"
                    >
                      <div slot="start" class="range-label">£1</div>
                      <div slot="end" class="range-label">£100</div>
                    </ion-range>
                  </div>

                  <!-- Manual Input -->
                  <div class="manual-fee-input">
                    <div class="currency-symbol">£</div>
                    <ion-input
                      type="number"
                      [min]="1"
                      [max]="100"
                      formControlName="entryFee"
                      (ionInput)="onManualFeeInput($event)"
                      class="fee-input"
                      clearInput="true"
                      placeholder="0"
                    >
                    </ion-input>
                  </div>
                </div>

                <ion-note>Set entry fee between £1 and £100</ion-note>
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
                  <p>
                    Set an entry fee (£1 - £100) to see potential prize
                    distribution
                  </p>
                  <p class="prize-note">
                    Prize breakdown adjusts based on number of members:
                    <br />• 3-5 members: Winner takes all <br />• 6-10 members:
                    1st (70%), 2nd (30%) <br />• 11-20 members: 1st (50%), 2nd
                    (30%), 3rd (20%) <br />• 21+ members: 1st (45%), 2nd (35%),
                    3rd (20%)
                  </p>
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

      <!-- No Group Message -->
      <ion-card *ngIf="!hasExistingGroup && !isCreateModalOpen">
        <ion-card-header>
          <ion-card-title>Welcome to Group Admin</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            You haven't created a group yet. Use the form above to create your
            first group!
          </p>
        </ion-card-content>
      </ion-card>

      <!-- Existing Group Card -->
      <ion-card *ngIf="hasExistingGroup">
        <ion-card-header>
          <ion-card-title>My Group</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="group-list-item" *ngFor="let group of groups">
            <div class="group-main-info">
              <h2>{{ group.name }}</h2>
              <div class="group-meta">
                <span class="group-type">
                  <ion-badge
                    [color]="group.type === 'prize' ? 'primary' : 'medium'"
                  >
                    {{
                      group.type === 'prize' ? 'Prize Group' : 'Casual Group'
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
                <span class="members" (click)="viewGroupMembers(group)">
                  <ion-icon name="people-outline"></ion-icon>
                  {{ group.memberCount }} Members
                </span>

                <span class="leaderboard" (click)="viewGroupLeaderboard(group)">
                  <ion-icon name="trophy-outline"></ion-icon>
                  View Leaderboard
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
                      color="primary"
                      (click)="manageMemberRole(member)"
                      [title]="
                        member.role === 'admin'
                          ? 'Demote to Player'
                          : 'Promote to Admin'
                      "
                      class="role-button"
                    >
                      <ion-icon
                        [name]="
                          member.role === 'admin'
                            ? 'person-remove-outline'
                            : 'person-add-outline'
                        "
                        slot="icon-only"
                        style="font-size: 22px; color: var(--ion-color-warning)"
                      ></ion-icon>
                    </ion-button>
                    <ion-button
                      fill="clear"
                      [color]="
                        member.status === 'active' ? 'success' : 'warning'
                      "
                      (click)="toggleMemberStatus(member)"
                      title="Toggle Status"
                    >
                      <ion-icon
                        [name]="
                          member.status === 'active'
                            ? 'lock-open-outline'
                            : 'lock-closed-outline'
                        "
                        slot="icon-only"
                        style="font-size: 22px; color: var(--ion-color-success)"
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
                        style="font-size: 22px; color: var(--ion-color-danger)"
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

        ion-item {
          --background: transparent;
          --padding-start: 0;
          --inner-padding-end: 0;
        }

        .fee-selector {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1rem 0;
        }

        .range-container {
          flex: 1;
          padding: 0 0.5rem;
        }

        .fee-range {
          --bar-height: 4px;
          --bar-border-radius: 2px;
          --knob-size: 20px;
          --pin-background: var(--ion-color-primary);
          --pin-color: white;
          --bar-background: var(--ion-color-medium-tint);
          --bar-background-active: var(--ion-color-primary);
        }

        .manual-fee-input {
          width: 120px;
          display: flex;
          align-items: center;
          background: white;
          border-radius: 8px;
          border: 1px solid var(--ion-color-medium-shade);
          overflow: hidden;

          .currency-symbol {
            padding: 8px 4px 8px 8px;
            color: var(--ion-color-medium);
            font-weight: 500;
          }

          ion-input {
            --padding-start: 0;
            --padding-end: 8px;
            --padding-top: 8px;
            --padding-bottom: 8px;
            font-size: 1rem;
            font-weight: 500;
          }
        }

        ion-note {
          margin-top: 0.5rem;
          color: var(--ion-color-medium);
          font-size: 0.875rem;
        }
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
        width: 90px;
        position: relative;
        display: flex;
        align-items: center;
        background: var(--ion-color-light);
        border-radius: 8px;
        border: 1px solid var(--ion-color-light-shade);
      }

      .currency-symbol {
        padding-left: 8px;
        color: var(--ion-color-medium);
        font-weight: 500;
        font-size: 0.95rem;
      }

      .fee-input {
        --background: transparent;
        --border-radius: 8px;
        --padding-start: 4px;
        --padding-end: 8px;
        --padding-top: 8px;
        --padding-bottom: 8px;
        --placeholder-color: var(--ion-color-medium);
        --placeholder-opacity: 0.6;
        --placeholder-font-weight: 400;
        font-size: 0.95rem;
        font-weight: 500;
      }

      /* Hide spinner buttons */
      .fee-input input[type='number']::-webkit-outer-spin-button,
      .fee-input input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      .fee-input input[type='number'] {
        -moz-appearance: textfield;
      }

      /* Style clear button */
      .fee-input ::part(clear-button) {
        color: var(--ion-color-medium);
        opacity: 0.7;
      }

      .fee-input ::part(clear-button):hover {
        opacity: 1;
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

      .members,
      .leaderboard {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--ion-color-medium);
        cursor: pointer;
        transition: color 0.2s ease;
      }

      .members:hover,
      .leaderboard:hover {
        color: var(--ion-color-primary);
      }

      .members ion-icon,
      .leaderboard ion-icon {
        font-size: 1.1rem;
      }

      // Member action buttons styles
      ion-buttons {
        display: flex;
        gap: 12px;
        align-items: center;

        ion-button {
          --padding-start: 4px;
          --padding-end: 4px;
          height: 35px;

          ion-icon {
            font-size: 20px;
            opacity: 1;
          }

          &:hover ion-icon {
            opacity: 0.8;
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
export class GroupsPage implements OnInit {
  groupForm!: FormGroup;
  isLoading = false;
  isCreateModalOpen = false;
  groups: Group[] = [];
  selectedGroup: Group | null = null;
  selectedTab = 'members';
  searchTerm = '';
  filteredMembers: GroupMember[] = [];
  entryFeeOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  currentMemberCount = 0;
  currentAdmin: CurrentAdmin = {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    members: [
      {
        id: '1',
        name: 'John Smith',
        email: 'john@example.com',
        joinedAt: new Date(),
        status: 'active',
        role: 'admin',
      },
    ],
  };

  get hasExistingGroup(): boolean {
    return this.groups.length > 0;
  }

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private alertController: AlertController,
    private groupService: GroupService
  ) {
    addIcons({
      peopleOutline,
      trophyOutline,
      cashOutline,
      createOutline,
      trashOutline,
      addOutline,
      closeOutline,
      personOutline,
      personAddOutline,
      personRemoveOutline,
      lockClosedOutline,
      lockOpenOutline,
      copyOutline,
    });
    this.initForm();
    this.loadGroups();
  }

  ngOnInit() {
    this.initForm();
    this.loadGroups();
  }

  private initForm() {
    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['casual', Validators.required],
      entryFee: [{ value: 10, disabled: true }],
      settings: this.fb.group({
        allowPlayerInvites: [true],
        autoApproveJoins: [false],
        showLeaderboard: [true],
        allowMemberChat: [true],
      }),
    });

    // Listen to type changes to enable/disable entry fee
    this.groupForm.get('type')?.valueChanges.subscribe((type) => {
      const entryFeeControl = this.groupForm.get('entryFee');
      if (type === 'prize') {
        entryFeeControl?.enable();
      } else {
        entryFeeControl?.disable();
      }
    });
  }

  showCreateGroupModal() {
    this.groupForm.reset({
      name: '',
      type: 'casual',
      entryFee: 10,
      settings: {
        allowPlayerInvites: true,
        autoApproveJoins: false,
        showLeaderboard: true,
        allowMemberChat: true,
      },
    });
    this.isCreateModalOpen = true;
  }

  private loadGroups() {
    this.groups = this.groupService.getAllGroups();
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
    // For very small groups (3-5 members)
    if (memberCount <= 5) {
      return {
        1: 1.0, // 100% for first place when very few members
        2: 0, // No second place prize
        3: 0, // No third place prize
      };
    }
    // For small groups (6-10 members)
    else if (memberCount <= 10) {
      return {
        1: 0.7, // 70% for first place
        2: 0.3, // 30% for second place
        3: 0, // No third place prize
      };
    }
    // For medium groups (11-20 members)
    else if (memberCount <= 20) {
      return {
        1: 0.5, // 50% for first place
        2: 0.3, // 30% for second place
        3: 0.2, // 20% for third place
      };
    }
    // For large groups (21+ members)
    else {
      return {
        1: 0.45, // 45% for first place
        2: 0.35, // 35% for second place
        3: 0.2, // 20% for third place
      };
    }
  }

  async createGroup() {
    if (this.hasExistingGroup) {
      await this.toastService.showToast(
        'You can only manage one group at a time.',
        'warning'
      );
      return;
    }

    if (this.groupForm.valid) {
      try {
        this.isLoading = true;
        const formValue = this.groupForm.value;

        // Create initial leaderboard with members in alphabetical order
        const initialLeaderboard: GroupLeaderboardEntry[] = [];

        const newGroup: Group = {
          id: crypto.randomUUID(),
          name: formValue.name,
          code: this.generateGroupCode(),
          memberCount: 1,
          createdAt: new Date(),
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
          settings: {
            allowPlayerInvites: true,
            autoApproveJoins: false,
            showLeaderboard: true,
            allowMemberChat: true,
          },
          type: formValue.type,
          entryFee: formValue.type === 'prize' ? formValue.entryFee : undefined,
          paidMembers: 0,
          totalPrizePool: 0,
          adminName: this.currentAdmin.name,
          leaderboard: initialLeaderboard,
        };

        // Save group to storage
        this.groupService.saveGroup(newGroup);

        // Update local groups array
        this.groups = [newGroup];

        // Show success message and close modal
        await this.toastService.showToast(
          'Group created successfully!',
          'success'
        );
        this.isCreateModalOpen = false;
        this.groupForm.reset();
      } catch (error) {
        console.error('Error creating group:', error);
        await this.toastService.showToast(
          'Failed to create group. Please try again.',
          'danger'
        );
      } finally {
        this.isLoading = false;
      }
    } else {
      await this.toastService.showToast(
        'Please fill in all required fields.',
        'warning'
      );
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

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update member's role
      member.role = newRole;

      // Update the filteredMembers array to reflect the change
      this.filteredMembers = this.filteredMembers.map((m) =>
        m.id === member.id ? { ...m, role: newRole } : m
      );

      // Update the selected group's members array
      if (this.selectedGroup) {
        this.selectedGroup.members = this.selectedGroup.members.map((m) =>
          m.id === member.id ? { ...m, role: newRole } : m
        );
      }

      await this.toastService.showToast(
        `Member ${action}d to ${newRole} successfully`,
        'success'
      );
    } catch (error) {
      console.error(`Error ${action}ing member:`, error);
      await this.toastService.showToast(
        `Failed to ${action} member. Please try again.`,
        'danger'
      );

      // Revert the role change in case of error
      member.role = isPromotion ? 'player' : 'admin';
    }
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

    // Allow empty value
    if (value === '' || value === null) {
      this.groupForm.patchValue({ entryFee: null }, { emitEvent: false });
      const input = event.target;
      input.classList.remove('has-value');
      return;
    }

    // Convert to number and validate
    value = Number(value);
    if (value < 1) value = 1;
    if (value > 100) value = 100;

    const input = event.target;
    input.classList.add('has-value');
    this.groupForm.patchValue({ entryFee: value }, { emitEvent: false });
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
    const alert = await this.alertController.create({
      header: 'Delete Group',
      subHeader: `Are you sure you want to delete "${group.name}"?`,
      message:
        'This action cannot be undone. All group data including members and predictions will be permanently deleted.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            try {
              // Delete group from storage
              this.groupService.deleteGroup(group.id);

              // Update local groups array
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
              console.error('Error deleting group:', error);
              await this.toastService.showToast(
                'Failed to delete group. Please try again.',
                'danger'
              );
            }
          },
        },
      ],
    });

    await alert.present();
  }

  viewGroupMembers(group: Group) {
    this.selectedGroup = group;
    this.selectedTab = 'members';
    this.filteredMembers = [...group.members];
  }

  viewGroupLeaderboard(group: Group) {
    this.router.navigate(['/group-admin/groups', group.id, 'leaderboard']);
  }
}
