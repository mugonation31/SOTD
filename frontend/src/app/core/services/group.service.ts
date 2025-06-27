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

interface GroupLeaderboardEntry {
  position: number;
  name: string;
  played: number;
  points: number;
  totalPoints: number;
  jokerUsed: number;
  memberId: string;
  memberName: string;
  rank: number;
  trend: 'up' | 'down' | 'same';
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
  leaderboard: GroupLeaderboardEntry[];
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
      group.members.some((member: GroupMember) => member.email === currentUser.email)
    );
  }

  // Get groups created by the current user (group admin)
  getAdminGroups(): Group[] {
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser?.email) {
      return [];
    }

    const allGroups = this.getAllGroups();
    return allGroups.filter(group => 
      group.members.some((member: GroupMember) => 
        member.email === currentUser.email && member.role === 'admin'
      )
    );
  }

  saveGroup(group: any): void {
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

    // Check if user already exists - use ID instead of email for more accurate checking
    const existingMember = group.members.find((m: GroupMember) => 
      m.id === currentUser.id || m.email === currentUser.email
    );
    
    if (existingMember) {
      // If user is already an admin, they can't join as a player
      if (existingMember.role === 'admin') {
        throw new Error('You are the admin of this group');
      }
      // If user is already a player member
      if (existingMember.role === 'player') {
        throw new Error('You are already a member of this group');
      }
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
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) throw new Error('User not authenticated');

    // Create admin member from current user
    const adminMember: GroupMember = {
      id: currentUser.id,
      name: currentUser.firstName && currentUser.lastName 
        ? `${currentUser.firstName} ${currentUser.lastName}`
        : currentUser.username,
      email: currentUser.email || '',
      joinedAt: new Date(),
      status: 'active',
      role: 'admin'
    };

    const newGroup: Group = {
      id: crypto.randomUUID(),
      name: data.name,
      code: this.generateGroupCode(),
      memberCount: 1,
      createdAt: new Date(),
      members: [adminMember], // Add the creator as admin
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
      adminName: adminMember.name,
      leaderboard: [],
    };

    this.saveGroup(newGroup);
    return of(newGroup);
  }

  // Get leaderboard for a specific group
  getGroupLeaderboard(groupId: string): GroupLeaderboardEntry[] {
    const group = this.getAllGroups().find(g => g.id === groupId);
    if (!group) return [];

    // If no leaderboard exists, generate mock data for members
    if (group.leaderboard.length === 0) {
      const mockLeaderboard = this.generateMockLeaderboard(group);
      // Update the group with the generated leaderboard
      group.leaderboard = mockLeaderboard;
      this.saveGroup(group);
      return mockLeaderboard;
    }

    return group.leaderboard;
  }

  // Generate mock leaderboard data for testing
  private generateMockLeaderboard(group: Group): GroupLeaderboardEntry[] {
    const currentUser = this.authService.getCurrentUser();
    
    const basePoints = Math.floor(Math.random() * 100) + 150;
    return group.members.map((member: GroupMember, index: number) => ({
      position: index + 1,
      memberId: member.id,
      memberName: member.id === currentUser?.id ? 'You' : member.name,
      name: member.id === currentUser?.id ? 'You' : member.name,
      played: Math.floor(Math.random() * 15) + 10, // 10-25 games
      points: basePoints + (index * 10), // 150-250 points
      totalPoints: basePoints + (index * 10), // Same as points for compatibility
      jokerUsed: Math.floor(Math.random() * 3) + 1, // 1-3 jokers used
      rank: index + 1,
      trend: 'same' as 'up' | 'down' | 'same',
    })).sort((a: any, b: any) => b.points - a.points) // Sort by points descending
      .map((entry: any, index: number) => ({ ...entry, position: index + 1, rank: index + 1 })); // Update positions
  }

  // Get all groups where the current user is a member (for standings page)
  getUserGroupsWithLeaderboards(): { group: Group; leaderboard: GroupLeaderboardEntry[]; userPosition: number | null }[] {
    const userGroups = this.getUserGroups();
    const currentUser = this.authService.getCurrentUser();
    
    return userGroups.map(group => {
      const leaderboard = this.getGroupLeaderboard(group.id);
      const userPosition = currentUser 
        ? leaderboard.findIndex(entry => entry.memberId === currentUser.id) + 1
        : null;
      
      return {
        group,
        leaderboard,
        userPosition: userPosition || null
      };
    });
  }

  // Get all groups where the current user is admin (for group-admin leaderboard page)
  getAdminGroupsWithLeaderboards(): { group: Group; leaderboard: GroupLeaderboardEntry[]; adminPosition: number | null }[] {
    const adminGroups = this.getAdminGroups();
    const currentUser = this.authService.getCurrentUser();
    
    return adminGroups.map(group => {
      const leaderboard = this.getGroupLeaderboard(group.id);
      // For admins, we might want to show their position too if they're also participating
      const adminPosition = currentUser 
        ? leaderboard.findIndex(entry => entry.memberId === currentUser.id) + 1
        : null;
      
      return {
        group,
        leaderboard,
        adminPosition: adminPosition || null
      };
    });
  }

  private generateGroupCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  // Helper method to create a test group for demonstration
  createTestGroup(): Group {
    const testGroup: Group = {
      id: crypto.randomUUID(),
      name: 'Test Football Group',
      code: 'TEST01',
      memberCount: 2,
      createdAt: new Date(),
      members: [
        {
          id: 'admin-1',
          name: 'John Admin',
          email: 'admin@test.com',
          joinedAt: new Date(),
          status: 'active',
          role: 'admin'
        },
        {
          id: 'player-1',
          name: 'Sarah Player',
          email: 'player@test.com',
          joinedAt: new Date(),
          status: 'active',
          role: 'player'
        }
      ],
      settings: {
        allowPlayerInvites: true,
        autoApproveJoins: true,
        showLeaderboard: true,
        allowMemberChat: true,
      },
      type: 'casual',
      entryFee: 0,
      paidMembers: 0,
      totalPrizePool: 0,
      adminName: 'John Admin',
      leaderboard: [],
    };

    this.saveGroup(testGroup);
    return testGroup;
  }

  // Create a test group that current user can join as player
  createJoinableTestGroup(): Group {
    const testGroup: Group = {
      id: crypto.randomUUID(),
      name: 'Joinable Test Group',
      code: 'JOIN01',
      memberCount: 1,
      createdAt: new Date(),
      members: [
        {
          id: 'different-admin-id',
          name: 'Test Admin',
          email: 'testadmin@example.com',
          joinedAt: new Date(),
          status: 'active',
          role: 'admin'
        }
      ],
      settings: {
        allowPlayerInvites: true,
        autoApproveJoins: true,
        showLeaderboard: true,
        allowMemberChat: true,
      },
      type: 'casual',
      entryFee: 0,
      paidMembers: 0,
      totalPrizePool: 0,
      adminName: 'Test Admin',
      leaderboard: [],
    };

    this.saveGroup(testGroup);
    console.log('Created joinable test group with code:', testGroup.code);
    return testGroup;
  }


}
