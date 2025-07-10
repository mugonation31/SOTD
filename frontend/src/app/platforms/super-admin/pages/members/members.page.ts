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
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
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
