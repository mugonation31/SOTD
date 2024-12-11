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
  IonBadge,
  IonIcon,
  IonButton,
  IonFab,
  IonFabButton,
  IonModal,
  IonInput,
} from '@ionic/angular/standalone';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  trophyOutline,
  personAddOutline,
  addOutline,
  closeOutline,
  enterOutline,
} from 'ionicons/icons';

interface Group {
  id: string;
  name: string;
  adminName: string;
  memberCount: number;
  yourPosition: number;
  totalMembers: number;
  joinCode?: string;
}

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
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
    IonBadge,
    IonIcon,
    IonButton,
    IonFab,
    IonFabButton,
    IonModal,
    IonInput,
    NgFor,
    NgIf,
    FormsModule,
  ],
})
export class GroupsPage {
  isJoinModalOpen = false;
  joinCode = '';

  // Mock data for groups
  myGroups: Group[] = [
    {
      id: '1',
      name: 'Premier League Fanatics',
      adminName: 'John Smith',
      memberCount: 25,
      yourPosition: 3,
      totalMembers: 25,
    },
    {
      id: '2',
      name: 'Office League',
      adminName: 'Sarah Wilson',
      memberCount: 12,
      yourPosition: 1,
      totalMembers: 12,
    },
  ];

  constructor() {
    addIcons({
      peopleOutline,
      trophyOutline,
      personAddOutline,
      addOutline,
      closeOutline,
      enterOutline,
    });
  }

  openJoinModal() {
    this.isJoinModalOpen = true;
    this.joinCode = '';
  }

  closeJoinModal() {
    this.isJoinModalOpen = false;
  }

  joinGroup() {
    if (this.joinCode.trim()) {
      // TODO: Implement group joining logic
      console.log('Joining group with code:', this.joinCode);
      this.closeJoinModal();
    }
  }

  viewGroupDetails(groupId: string) {
    // TODO: Navigate to group details page
    console.log('Viewing group details:', groupId);
  }

  getPositionSuffix(position: number): string {
    if (position > 3 && position < 21) return 'th';
    switch (position % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}
