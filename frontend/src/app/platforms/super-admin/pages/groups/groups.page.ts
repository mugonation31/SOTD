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
