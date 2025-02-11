import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private readonly STORAGE_KEY = 'sotd_groups';

  constructor() {
    // Initialize storage if empty
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
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

  saveGroup(group: Group): void {
    const groups = this.getAllGroups();
    const existingIndex = groups.findIndex((g) => g.id === group.id);

    if (existingIndex >= 0) {
      groups[existingIndex] = group;
    } else {
      groups.push(group);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(groups));
  }

  findGroupByCode(code: string): Group | null {
    const groups = this.getAllGroups();
    const group = groups.find((g) => g.code === code);
    return group || null;
  }

  joinGroup(groupCode: string, member: GroupMember): Group | null {
    const groups = this.getAllGroups();
    const groupIndex = groups.findIndex((g) => g.code === groupCode);

    if (groupIndex === -1) return null;

    const group = groups[groupIndex];

    // Check if member already exists
    if (group.members.some((m) => m.email === member.email)) {
      throw new Error('You are already a member of this group');
    }

    // Add member to group
    group.members.push(member);
    group.memberCount = group.members.length;

    // Update storage
    groups[groupIndex] = group;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(groups));

    return group;
  }

  deleteGroup(groupId: string): void {
    const groups = this.getAllGroups().filter((g) => g.id !== groupId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(groups));
  }
}
