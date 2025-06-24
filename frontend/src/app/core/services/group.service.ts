import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

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
  leaderboard: any[];
}

interface CreateGroupDto {
  name: string;
  description: string;
  entryFee: number;
  isPrivate: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private readonly STORAGE_KEY = 'sotd_groups';
  private readonly USER_GROUPS_KEY = 'sotd_user_groups';
  
  // Observable for real-time group updates
  private groupsSubject = new BehaviorSubject<Group[]>([]);
  public groups$ = this.groupsSubject.asObservable();

  constructor(private authService: AuthService) {
    // Initialize storage if empty
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.USER_GROUPS_KEY)) {
      localStorage.setItem(this.USER_GROUPS_KEY, JSON.stringify([]));
    }
    
    // Load initial groups
    this.loadGroups();
  }

  private loadGroups(): void {
    const groups = this.getAllGroups();
    this.groupsSubject.next(groups);
  }

  getAllGroups(): Group[] {
    const groupsJson = localStorage.getItem(this.STORAGE_KEY);
    const groups = JSON.parse(groupsJson || '[]');
    return groups.map((group: any) => ({
      ...group,
      createdAt: new Date(group.createdAt),
      members: group.members.map((member: any) => ({
        ...member,
        joinedAt: new Date(member.joinedAt),
      })),
    }));
  }

  // Get groups that the current user is a member of
  getUserGroups(): Group[] {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser?.email) return [];

    const allGroups = this.getAllGroups();
    return allGroups.filter(group => 
      group.members.some(member => member.email === currentUser.email)
    );
  }

  // Get groups created by the current user (group admin)
  getAdminGroups(): Group[] {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser?.email) return [];

    const allGroups = this.getAllGroups();
    return allGroups.filter(group => 
      group.members.some(member => 
        member.email === currentUser.email && member.role === 'admin'
      )
    );
  }

  saveGroup(group: Group): void {
    const groups = this.getAllGroups();
    const existingIndex = groups.findIndex((g) => g.id === group.id);

    if (existingIndex >= 0) {
      groups[existingIndex] = group;
    } else {
      groups.push(group);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(groups));
    
    // Trigger real-time updates
    this.loadGroups();
  }

  findGroupByCode(code: string): Group | null {
    const groups = this.getAllGroups();
    const group = groups.find((g) => g.code === code);
    return group || null;
  }

  joinGroup(groupCode: string, customMember?: GroupMember): Group | null {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) throw new Error('User not authenticated');

    const groups = this.getAllGroups();
    const groupIndex = groups.findIndex((g) => g.code === groupCode);

    if (groupIndex === -1) return null;

    const group = groups[groupIndex];

    // Check if user already exists
    if (group.members.some((m) => m.email === currentUser.email)) {
      throw new Error('You are already a member of this group');
    }

    // Create member from current user data or use custom member
    const member: GroupMember = customMember || {
      id: currentUser.id,
      name: currentUser.firstName && currentUser.lastName 
        ? `${currentUser.firstName} ${currentUser.lastName}`
        : currentUser.username,
      email: currentUser.email || '',
      joinedAt: new Date(),
      status: 'active',
      role: 'player'
    };

    // Add member to group
    group.members.push(member);
    group.memberCount = group.members.length;

    // Update storage and trigger updates
    groups[groupIndex] = group;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(groups));
    this.loadGroups();

    return group;
  }

  deleteGroup(groupId: string): void {
    const groups = this.getAllGroups().filter((g) => g.id !== groupId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(groups));
  }

  createGroup(data: CreateGroupDto): Observable<Group> {
    const newGroup: Group = {
      id: crypto.randomUUID(),
      name: data.name,
      code: this.generateGroupCode(),
      memberCount: 1,
      createdAt: new Date(),
      members: [],
      settings: {
        allowPlayerInvites: true,
        autoApproveJoins: false,
        showLeaderboard: true,
        allowMemberChat: true,
      },
      type: data.entryFee > 0 ? 'prize' : 'casual',
      entryFee: data.entryFee,
      paidMembers: 0,
      totalPrizePool: 0,
      adminName: 'Current User', // Replace with actual user name
      leaderboard: [],
    };

    this.saveGroup(newGroup);
    return of(newGroup);
  }

  private generateGroupCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}
