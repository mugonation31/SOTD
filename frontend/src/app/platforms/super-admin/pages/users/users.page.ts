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
  IonList,
} from '@ionic/angular/standalone';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { banOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'super-admin' | 'group-admin' | 'player';
  status: 'active' | 'inactive';
  joinedAt: Date;
}

@Component({
  selector: 'app-users',
  template: `
    <div class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>All System Users</ion-card-title>
          <ion-searchbar
            [(ngModel)]="searchTerm"
            (ionInput)="filterUsers()"
            placeholder="Search users..."
          ></ion-searchbar>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item *ngFor="let user of filteredUsers">
              <ion-label>
                <h2>{{ user.name }}</h2>
                <p>{{ user.email }}</p>
                <p>
                  Role: <ion-badge color="primary">{{ user.role }}</ion-badge>
                </p>
                <p>
                  Status:
                  <ion-badge
                    [color]="user.status === 'active' ? 'success' : 'warning'"
                    >{{ user.status }}</ion-badge
                  >
                </p>
              </ion-label>
              <ion-button
                fill="clear"
                [color]="user.status === 'active' ? 'danger' : 'success'"
                (click)="toggleUserStatus(user)"
                [title]="
                  user.status === 'active' ? 'Deactivate User' : 'Activate User'
                "
              >
                <ion-icon
                  [name]="
                    user.status === 'active'
                      ? 'ban-outline'
                      : 'checkmark-circle-outline'
                  "
                ></ion-icon>
              </ion-button>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </div>
  `,
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
    IonList,
    NgFor,
    NgIf,
    FormsModule,
  ],
})
export class UsersPage {
  searchTerm = '';
  users: SystemUser[] = [];
  filteredUsers: SystemUser[] = [];

  constructor(private toastService: ToastService) {
    addIcons({
      banOutline,
      checkmarkCircleOutline,
    });
    this.loadMockUsers();
  }

  private loadMockUsers() {
    this.users = [
      {
        id: '1',
        name: 'John Super',
        email: 'super@example.com',
        role: 'super-admin',
        status: 'active',
        joinedAt: new Date('2024-01-01'),
      },
      {
        id: '2',
        name: 'Sarah Admin',
        email: 'admin@example.com',
        role: 'group-admin',
        status: 'active',
        joinedAt: new Date('2024-01-15'),
      },
      {
        id: '3',
        name: 'Mike Player',
        email: 'player@example.com',
        role: 'player',
        status: 'inactive',
        joinedAt: new Date('2024-02-01'),
      },
    ];
    this.filterUsers();
  }

  filterUsers() {
    let filtered = [...this.users];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.role.toLowerCase().includes(term)
      );
    }

    this.filteredUsers = filtered;
  }

  async toggleUserStatus(user: SystemUser) {
    if (user.role === 'super-admin') {
      await this.toastService.showToast(
        'Cannot modify super admin status',
        'error'
      );
      return;
    }

    try {
      user.status = user.status === 'active' ? 'inactive' : 'active';
      await this.toastService.showToast(
        `User ${
          user.status === 'active' ? 'activated' : 'deactivated'
        } successfully`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error updating user status', 'error');
    }
  }
}
