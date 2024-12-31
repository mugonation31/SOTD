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
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonBadge,
  IonToggle,
} from '@ionic/angular/standalone';
import { NgFor, DatePipe } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  peopleCircleOutline,
  trashOutline,
  banOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';
import { ToastService } from '@core/services/toast.service';

interface GroupAdmin {
  id: string;
  email: string;
  name: string;
  status: 'active' | 'inactive';
  lastLogin?: Date;
  groupsManaged: string[];
  joinedDate: Date;
}

@Component({
  selector: 'app-group-admins',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Group Admins Management</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Active Group Admins</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item *ngFor="let admin of groupAdmins">
              <ion-label>
                <h2>{{ admin.name }}</h2>
                <p>{{ admin.email }}</p>
                <p>Joined: {{ admin.joinedDate | date : 'mediumDate' }}</p>
                <p>
                  Groups Managed:
                  <ion-badge
                    color="primary"
                    *ngFor="let group of admin.groupsManaged"
                  >
                    {{ group }}
                  </ion-badge>
                </p>
              </ion-label>
              <ion-toggle
                [checked]="admin.status === 'active'"
                (ionChange)="toggleAdminStatus(admin)"
              ></ion-toggle>
              <ion-button
                fill="clear"
                color="danger"
                (click)="revokeAccess(admin)"
              >
                <ion-icon name="trash-outline"></ion-icon>
              </ion-button>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
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
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonBadge,
    IonToggle,
    NgFor,
    DatePipe,
  ],
})
export class GroupAdminsPage implements OnInit {
  groupAdmins: GroupAdmin[] = [];

  constructor(private toastService: ToastService) {
    addIcons({
      peopleCircleOutline,
      trashOutline,
      banOutline,
      checkmarkCircleOutline,
    });
  }

  ngOnInit() {
    // Load mock data for now
    this.loadMockGroupAdmins();
  }

  private loadMockGroupAdmins() {
    this.groupAdmins = [
      {
        id: '1',
        email: 'admin1@example.com',
        name: 'John Admin',
        status: 'active',
        lastLogin: new Date(),
        groupsManaged: ['Premier Group', 'Champions League'],
        joinedDate: new Date('2024-01-15'),
      },
      {
        id: '2',
        email: 'admin2@example.com',
        name: 'Sarah Manager',
        status: 'active',
        lastLogin: new Date(),
        groupsManaged: ['Europa League'],
        joinedDate: new Date('2024-02-01'),
      },
    ];
  }

  async toggleAdminStatus(admin: GroupAdmin) {
    try {
      admin.status = admin.status === 'active' ? 'inactive' : 'active';
      await this.toastService.showToast(
        `Admin status ${
          admin.status === 'active' ? 'activated' : 'deactivated'
        } successfully`,
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error updating admin status', 'error');
    }
  }

  async revokeAccess(admin: GroupAdmin) {
    try {
      this.groupAdmins = this.groupAdmins.filter((a) => a.id !== admin.id);
      await this.toastService.showToast(
        'Admin access revoked successfully',
        'success'
      );
    } catch (error) {
      await this.toastService.showToast('Error revoking admin access', 'error');
    }
  }
}
