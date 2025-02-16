import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Group, GroupMember, CreateGroupData } from '../types/group.types';

interface GroupSettings {
  allowPlayerInvites: boolean;
  autoApproveJoins: boolean;
  showLeaderboard: boolean;
  allowMemberChat: boolean;
}

interface GroupLeaderboardEntry {
  memberId: string;
  memberName: string;
  points: number;
  rank: number;
  trend: 'up' | 'down' | 'same';
}

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private readonly STORAGE_KEY = 'sotd_groups';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
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
      updatedAt: new Date(group.updatedAt),
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

  createGroup(groupData: CreateGroupData): Observable<Group> {
    // Mock response for frontend development
    const mockResponse: Group = {
      id: 'mock-group-id',
      name: groupData.name,
      code: `G${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      description: groupData.description,
      entryFee: groupData.entryFee,
      isPrivate: groupData.isPrivate,
      rules: groupData.rules,
      adminId: 'mock-admin-id',
      createdAt: new Date(),
      updatedAt: new Date(),
      memberCount: 1, // Start with admin as member
      members: [
        {
          id: 'mock-admin-id',
          name: 'Admin User',
          email: 'admin@example.com',
          joinedAt: new Date(),
          status: 'active',
          role: 'admin',
        },
      ],
      settings: {
        allowPlayerInvites: false,
        autoApproveJoins: false,
        showLeaderboard: true,
        allowMemberChat: true,
      },
      type: 'casual',
      paidMembers: 0,
      totalPrizePool: 0,
      adminName: 'Admin User',
      leaderboard: [],
    };

    // Save the group to local storage
    this.saveGroup(mockResponse);

    // Return mock response
    return new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(mockResponse);
        subscriber.complete();
      }, 1000); // Simulate network delay
    });

    // TODO: Uncomment this when backend is ready
    // return this.http.post<Group>(`${this.apiUrl}/groups`, groupData);
  }
}
