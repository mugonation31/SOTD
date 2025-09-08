import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonBadge,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonSegment,
  IonSegmentButton,
  IonNote,
  IonAvatar,
  IonSkeletonText,
} from '@ionic/angular/standalone';
import {
  NgFor,
  NgIf,
  DatePipe,
  CurrencyPipe,
  TitleCasePipe,
} from '@angular/common';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personOutline,
  peopleOutline,
  personAddOutline,
  filterOutline,
  searchOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  warningOutline,
  createOutline,
  trashOutline,
  trophyOutline,
  shieldOutline,
  shieldCheckmarkOutline,
  personRemoveOutline,
  banOutline,
} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { GroupService } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';
import { Subscription } from 'rxjs';

interface Member {
  id: string;
  name: string;
  email: string;
  joinedAt: Date;
  groupName: string;
  role: 'admin' | 'player';
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
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
    IonIcon,
    IonBadge,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonSegment,
    IonSegmentButton,
    IonNote,
    IonAvatar,
    IonSkeletonText,
    NgFor,
    NgIf,
    DatePipe,
    CurrencyPipe,
    TitleCasePipe,
    RouterLink,
    FormsModule,
  ],
})
export class MembersPage implements OnInit, OnDestroy {
  selectedFilter = 'all';
  searchTerm = '';
  currentAdminId = '1';
  isLoading = false;

  members: Member[] = [];
  filteredMembers: Member[] = [];

  private subscription?: Subscription;

  constructor(
    private groupService: GroupService,
    private authService: AuthService
  ) {
    addIcons({
      personOutline,
      peopleOutline,
      personAddOutline,
      filterOutline,
      searchOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      warningOutline,
      createOutline,
      trashOutline,
      trophyOutline,
      shieldOutline,
      shieldCheckmarkOutline,
      personRemoveOutline,
      banOutline,
    });
  }

  ngOnInit() {

    this.loadMembersFromGroups();
    this.subscribeToGroupUpdates();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadMembersFromGroups() {

    const adminGroups = this.groupService.getAdminGroups();
    
    this.members = adminGroups.flatMap(group => 
      group.members.map(member => ({
          id: member.id,
          name: member.name,
          email: member.email,
          joinedAt: member.joinedAt,
          groupName: group.name,
          role: member.role,
        status: member.status,
      }))
    );
    

    this.applyFilters();
  }

  getMemberCount(filter: string): number {
    switch (filter) {
      case 'all':
        return this.members.filter(m => m.status === 'active').length;
      case 'admins':
        return this.members.filter(m => m.role === 'admin' && m.status === 'active').length;
      case 'players':
        return this.members.filter(m => m.role === 'player' && m.status === 'active').length;
      case 'removed':
        return this.members.filter(m => m.status === 'inactive').length;
      default:
        return 0;
    }
  }

  filterMembers(event: any) {
    this.selectedFilter = event.detail.value;
    this.applyFilters();
  }

  searchMembers(event: any) {
    this.searchTerm = event.detail.value;
    this.applyFilters();
  }

  applyFilters() {

      let filtered = [...this.members];

    // Apply segment filter
      switch (this.selectedFilter) {
      case 'all':
        filtered = filtered.filter(m => m.status === 'active');
        break;
        case 'admins':
        filtered = filtered.filter(m => m.role === 'admin' && m.status === 'active');
          break;
        case 'players':
        filtered = filtered.filter(m => m.role === 'player' && m.status === 'active');
          break;
        case 'removed':
        filtered = filtered.filter(m => m.status === 'inactive');
          break;
      }

      // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchLower) ||
        member.email.toLowerCase().includes(searchLower) ||
        member.groupName.toLowerCase().includes(searchLower)
        );
      }

      this.filteredMembers = filtered;

  }

  async makeAdmin(member: Member) {

    try {
      // In a real app, this would call the group service
      // await this.groupService.makeMemberAdmin(member.id, member.groupName);

    } catch (error) {
      console.error('❌ Members: Error making member admin:', error);
    }
  }

  async revokeAdminStatus(member: Member) {

    try {
      // In a real app, this would call the group service
      // await this.groupService.revokeAdminStatus(member.id, member.groupName);

    } catch (error) {
      console.error('❌ Members: Error revoking admin status:', error);
    }
  }

  async removeMember(member: Member) {

    try {
      // In a real app, this would call the group service
      // await this.groupService.removeMember(member.id, member.groupName);

    } catch (error) {
      console.error('❌ Members: Error removing member:', error);
    }
  }

  async readmitMember(member: Member) {

    try {
      // In a real app, this would call the group service
      // await this.groupService.readmitMember(member.id, member.groupName);

    } catch (error) {
      console.error('❌ Members: Error readmitting member:', error);
    }
  }

  private subscribeToGroupUpdates() {
    this.subscription = this.groupService.groups$.subscribe(() => {

      this.loadMembersFromGroups();
    });
  }
}
