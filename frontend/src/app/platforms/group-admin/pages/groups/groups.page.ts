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
} from '@ionic/angular/standalone';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { copyOutline, addOutline } from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';

interface Group {
  id: string;
  name: string;
  code: string;
  memberCount: number;
  createdAt: Date;
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
      <ion-card>
        <ion-card-header>
          <ion-card-title>Create New Group</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <form [formGroup]="groupForm" (ngSubmit)="createGroup()">
            <ion-item>
              <ion-input
                type="text"
                formControlName="name"
                placeholder="Group Name"
                [clearInput]="true"
              ></ion-input>
            </ion-item>

            <div class="ion-margin-top">
              <ion-button
                expand="block"
                type="submit"
                [disabled]="!groupForm.valid || isLoading"
              >
                <ion-icon name="add-outline" slot="start"></ion-icon>
                <ion-spinner *ngIf="isLoading"></ion-spinner>
                <span *ngIf="!isLoading">Create Group</span>
              </ion-button>
            </div>
          </form>
        </ion-card-content>
      </ion-card>

      <!-- Existing Groups List -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>My Groups</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item *ngFor="let group of groups">
              <ion-label>
                <h2>{{ group.name }}</h2>
                <p>Created: {{ group.createdAt | date }}</p>
                <p>
                  Members:
                  <ion-badge color="primary">{{ group.memberCount }}</ion-badge>
                </p>
                <p>
                  Group Code:
                  <strong>{{ group.code }}</strong>
                  <ion-button
                    fill="clear"
                    size="small"
                    (click)="copyCode(group.code)"
                  >
                    <ion-icon name="copy-outline"></ion-icon>
                  </ion-button>
                </p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
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
  ],
})
export class GroupsPage {
  groupForm: FormGroup;
  isLoading = false;
  groups: Group[] = [];

  constructor(private fb: FormBuilder, private toastService: ToastService) {
    addIcons({ copyOutline, addOutline });

    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
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
      },
      {
        id: '2',
        name: 'Champions League Group',
        code: 'UCL2024',
        memberCount: 8,
        createdAt: new Date('2024-02-01'),
      },
    ];
  }

  async createGroup() {
    if (this.groupForm.valid) {
      this.isLoading = true;
      try {
        // Generate a unique code (this will be done by backend)
        const code =
          'GROUP' + Math.random().toString(36).substring(2, 7).toUpperCase();

        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newGroup: Group = {
          id: Date.now().toString(),
          name: this.groupForm.value.name,
          code: code,
          memberCount: 0,
          createdAt: new Date(),
        };

        this.groups.unshift(newGroup);
        this.groupForm.reset();

        await this.toastService.showToast(
          'Group created successfully! Share the code with players to join.',
          'success'
        );
      } catch (error) {
        await this.toastService.showToast(
          'Error creating group. Please try again.',
          'error'
        );
      } finally {
        this.isLoading = false;
      }
    }
  }

  async copyCode(code: string) {
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
}
