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
  IonList,
  IonBadge,
} from '@ionic/angular/standalone';
import { NgIf, NgFor } from '@angular/common';
import { ToastService } from '@core/services/toast.service';
import { DatePipe } from '@angular/common';

interface PlayerGroup {
  id: string;
  name: string;
  code: string;
  memberCount: number;
  joinedAt: Date;
}

@Component({
  selector: 'app-join-group',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Join a Group</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Enter Group Code</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <form [formGroup]="joinForm" (ngSubmit)="onSubmit()">
            <ion-item>
              <ion-input
                type="text"
                formControlName="groupCode"
                placeholder="Enter your group code"
                [clearInput]="true"
              ></ion-input>
            </ion-item>

            <div class="ion-margin-top">
              <ion-button
                expand="block"
                type="submit"
                [disabled]="!joinForm.valid || isLoading"
              >
                <ion-spinner *ngIf="isLoading"></ion-spinner>
                <span *ngIf="!isLoading">Join Group</span>
              </ion-button>
            </div>
          </form>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>My Groups</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list *ngIf="myGroups.length > 0">
            <ion-item *ngFor="let group of myGroups">
              <ion-label>
                <h2>{{ group.name }}</h2>
                <p>Joined: {{ group.joinedAt | date }}</p>
                <p>
                  Members:
                  <ion-badge color="primary">{{ group.memberCount }}</ion-badge>
                </p>
                <p>
                  Group Code:
                  <strong>{{ group.code }}</strong>
                </p>
              </ion-label>
            </ion-item>
          </ion-list>

          <div
            *ngIf="myGroups.length === 0"
            class="ion-text-center ion-padding"
          >
            <p>You haven't joined any groups yet.</p>
            <p>Enter a group code above to join one!</p>
          </div>
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
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    IonList,
    IonBadge,
    NgFor,
    DatePipe,
  ],
})
export class JoinGroupPage {
  joinForm: FormGroup;
  isLoading = false;
  myGroups: PlayerGroup[] = [];

  constructor(private fb: FormBuilder, private toastService: ToastService) {
    this.joinForm = this.fb.group({
      groupCode: ['', [Validators.required, Validators.minLength(5)]],
    });

    // Load mock data
    this.loadMockGroups();
  }

  private loadMockGroups() {
    this.myGroups = [
      {
        id: '1',
        name: 'Premier League Predictions',
        code: 'PREM2024',
        memberCount: 12,
        joinedAt: new Date('2024-01-15'),
      },
    ];
  }

  async onSubmit() {
    if (this.joinForm.valid) {
      this.isLoading = true;
      try {
        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock adding new group
        const newGroup: PlayerGroup = {
          id: Date.now().toString(),
          name: 'New Joined Group',
          code: this.joinForm.value.groupCode,
          memberCount: 1,
          joinedAt: new Date(),
        };

        this.myGroups.unshift(newGroup);
        this.joinForm.reset();

        await this.toastService.showToast(
          'Successfully joined the group!',
          'success'
        );
      } catch (error) {
        await this.toastService.showToast(
          'Invalid group code. Please try again.',
          'error'
        );
      } finally {
        this.isLoading = false;
      }
    }
  }
}
