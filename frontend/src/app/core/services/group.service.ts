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

// Standardized Standing interface for compatibility
export interface Standing {
  position: number;
  previousPosition: number;
  userId: string;
  name: string;
  avatar?: string;
  played: number;
  points: number;
  correctScores: number;
  correctResults: number;
  jokerUsed: number;
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

// Standardized group with standings interface
export interface GroupWithStandings {
  group: {
    id: string;
    name: string;
    code: string;
    memberCount: number;
    type: 'casual' | 'prize';
  };
  leaderboard: Standing[];
  userPosition: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private readonly STORAGE_KEY_PREFIX = 'sotd_groups';
  private readonly USER_GROUPS_KEY_PREFIX = 'sotd_user_groups'; // Legacy - for future use
  private readonly LEGACY_STORAGE_KEY = 'sotd_groups'; // For migration
  // Add global storage key for all groups
  private readonly GLOBAL_GROUPS_KEY = 'sotd_all_groups';
  
  private groupsSubject = new BehaviorSubject<Group[]>([]);
  public groups$ = this.groupsSubject.asObservable();

  constructor(private authService: AuthService) {
    console.log('🏗️ GroupService: Initializing service');
    
    // Initialize global storage
    this.initializeGlobalStorage();
    
    // Subscribe to auth changes
    this.authService.currentUser.subscribe((authResponse: any) => {
      console.log('👤 GroupService: User changed, reinitializing storage');
      this.handleUserChange(authResponse?.user || null);
    });
  }

  private handleUserChange(user: any | null): void {
    console.log('🔄 GroupService: Handling user change');
    if (user) {
      console.log('👤 GroupService: User authenticated, loading groups');
      this.loadGroups();
    } else {
      console.log('👤 GroupService: User logged out, clearing groups');
      this.groupsSubject.next([]);
    }
  }

  /**
   * Reinitialize storage for current user (useful when user logs in)
   */
  public reinitializeForCurrentUser(): void {
    console.log('🔄 GroupService: Manually reinitializing for current user');
    this.initializeGlobalStorage();
    this.loadGroups();
  }

  /**
   * Initialize global storage for all groups
   */
  private initializeGlobalStorage(): void {
    const globalData = localStorage.getItem(this.GLOBAL_GROUPS_KEY);
    const legacyData = localStorage.getItem(this.LEGACY_STORAGE_KEY);

    console.log(`🔄 GroupService: Initializing global storage`);
    console.log(`📂 Global data exists: ${!!globalData}`);
    console.log(`📂 Legacy data exists: ${!!legacyData}`);

    // If no global data but legacy data exists, migrate it
    if (!globalData && legacyData) {
      console.log('📦 GroupService: Migrating legacy group data to global storage');
      
      try {
        const legacyGroups = JSON.parse(legacyData);
        console.log(`📊 GroupService: Migrated ${legacyGroups.length} groups to global storage`);
        localStorage.setItem(this.GLOBAL_GROUPS_KEY, JSON.stringify(legacyGroups));
      } catch (error) {
        console.error('❌ GroupService: Error migrating legacy data:', error);
        localStorage.setItem(this.GLOBAL_GROUPS_KEY, JSON.stringify([]));
      }
    } else if (!globalData) {
      // Initialize empty array for new installation
      console.log('🆕 GroupService: Initializing empty global group storage');
      localStorage.setItem(this.GLOBAL_GROUPS_KEY, JSON.stringify([]));
    }
  }

  /**
   * Generate user-specific storage key (kept for future user preferences)
   * Falls back to legacy key if no user is authenticated
   */
  private getUserSpecificStorageKey(): string {
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser?.id) {
      console.log('⚠️ GroupService: No authenticated user, using legacy storage key');
      return this.LEGACY_STORAGE_KEY;
    }
    
    const userSpecificKey = `${this.STORAGE_KEY_PREFIX}_${currentUser.id}`;
    console.log(`🔑 GroupService: Using user-specific storage key: ${userSpecificKey}`);
    return userSpecificKey;
  }

  /**
   * Clear group data for current user (useful for logout cleanup)
   */
  public clearUserGroupData(): void {
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser?.id) {
      console.log('⚠️ GroupService: Cannot clear user data - no authenticated user');
      return;
    }

    // Note: We don't clear global groups on logout, only user-specific data
    console.log(`🗑️ GroupService: User logged out, clearing observable but keeping global groups`);
    
    // Clear the observable
    this.groupsSubject.next([]);
  }

  private loadGroups(): void {
    const groups = this.getAllGroups();
    this.groupsSubject.next(groups);
  }

  getAllGroups(): Group[] {
    const groupsJson = localStorage.getItem(this.GLOBAL_GROUPS_KEY);
    
    if (!groupsJson) {
      console.log(`📂 GroupService: No group data found in global storage`);
      return [];
    }

    try {
      const groups = JSON.parse(groupsJson);
      console.log(`📂 GroupService: Loaded ${groups.length} groups from global storage`);
      
      return groups.map((group: any) => ({
        ...group,
        createdAt: new Date(group.createdAt),
        members: group.members.map((member: any) => ({
          ...member,
          joinedAt: new Date(member.joinedAt),
        })),
      }));
    } catch (error) {
      console.error('❌ GroupService: Error parsing group data:', error);
      return [];
    }
  }

  // Get groups that the current user is a member of
  getUserGroups(): Group[] {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser?.email) {
      console.log('⚠️ GroupService: No authenticated user for getUserGroups');
      return [];
    }

    const allGroups = this.getAllGroups();
    const userGroups = allGroups.filter(group => 
      group.members.some((member: GroupMember) => member.email === currentUser.email)
    );

    console.log(`👤 GroupService: Found ${userGroups.length} groups for user ${currentUser.email}`);
    return userGroups;
  }

  // Get groups created by the current user (group admin)
  getAdminGroups(): Group[] {
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser?.email) {
      console.log('⚠️ GroupService: No authenticated user for getAdminGroups');
      return [];
    }

    const allGroups = this.getAllGroups();
    const adminGroups = allGroups.filter(group => 
      group.members.some((member: GroupMember) => 
        member.email === currentUser.email && member.role === 'admin'
      )
    );

    console.log(`👑 GroupService: Found ${adminGroups.length} admin groups for user ${currentUser.email}`);
    return adminGroups;
  }

  saveGroup(group: any): void {
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser?.id) {
      console.error('❌ GroupService: Cannot save group - no authenticated user');
      throw new Error('User not authenticated');
    }

    const groups = this.getAllGroups();
    const existingIndex = groups.findIndex((g) => g.id === group.id);

    if (existingIndex >= 0) {
      console.log(`🔄 GroupService: Updating existing group ${group.id}`);
      groups[existingIndex] = group;
    } else {
      console.log(`➕ GroupService: Adding new group ${group.id}`);
      groups.push(group);
    }

    // Save to global storage instead of user-specific
    localStorage.setItem(this.GLOBAL_GROUPS_KEY, JSON.stringify(groups));
    console.log(`💾 GroupService: Saved ${groups.length} groups to global storage`);
    
    // Trigger real-time updates
    this.loadGroups();
  }

  findGroupByCode(code: string): Group | null {
    console.log('🔍 Looking for group with code:', code);
    const groups = this.getAllGroups();
    console.log('📂 Available groups:', groups.length);
    console.log('📂 Available codes:', groups.map(g => g.code));
    
    const group = groups.find((g) => g.code === code);
    console.log('🎯 Found group by code search:', group ? 'YES' : 'NO');
    
    return group || null;
  }

  joinGroup(groupCode: string, customMember?: GroupMember): Group | null {
    console.log('🚀 Starting joinGroup process with code:', groupCode);
    
    const currentUser = this.authService.getCurrentUser();
    console.log('👤 Current user:', currentUser);
    console.log('👤 Current user ID:', currentUser?.id);
    console.log('👤 Current user email:', currentUser?.email);
    
    // Debug: Show detailed user information
    console.log('🔍 DETAILED USER DEBUG:');
    console.log('  - Full user object:', JSON.stringify(currentUser, null, 2));
    console.log('  - User ID type:', typeof currentUser?.id);
    console.log('  - User email type:', typeof currentUser?.email);
    
    if (!currentUser) {
      console.log('❌ User not authenticated');
      throw new Error('User not authenticated');
    }

    const groups = this.getAllGroups();
    console.log('📂 Total groups available:', groups.length);
    
    const groupIndex = groups.findIndex((g) => g.code === groupCode);
    console.log('🔍 Group index found:', groupIndex);

    if (groupIndex === -1) {
      console.log('❌ Group not found with code:', groupCode);
      return null;
    }

    const group = groups[groupIndex];
    console.log('🎯 Found group to join:', group);
    console.log('👑 Group admin member:', group.members.find(m => m.role === 'admin'));
    console.log('👥 All group members:', group.members.map(m => ({ id: m.id, email: m.email, role: m.role })));

    // Enhanced debugging for member matching
    console.log('🔍 MEMBER MATCHING DEBUG:');
    group.members.forEach((member, index) => {
      console.log(`  Member ${index + 1}:`);
      console.log(`    - ID: "${member.id}" (type: ${typeof member.id})`);
      console.log(`    - Email: "${member.email}" (type: ${typeof member.email})`);
      console.log(`    - Role: "${member.role}"`);
      console.log(`    - ID Match: ${member.id === currentUser.id}`);
      console.log(`    - Email Match: ${member.email === currentUser.email}`);
    });

    // Check if user already exists in this group
    // Use both ID and email for comprehensive checking, but prioritize ID for accuracy
    const existingMemberById = group.members.find((m: GroupMember) => m.id === currentUser.id);
    const existingMemberByEmail = group.members.find((m: GroupMember) => m.email === currentUser.email);
    console.log('👥 Existing member by ID:', existingMemberById);
    console.log('👥 Existing member by email:', existingMemberByEmail);
    
    // If found by ID (most accurate), use that
    const existingMember = existingMemberById || existingMemberByEmail;
    
    if (existingMember) {
      console.log('⚠️ User already exists in group with role:', existingMember.role);
      console.log('🔍 CONFLICT DETAILS:');
      console.log('  - Existing member ID:', existingMember.id);
      console.log('  - Current user ID:', currentUser.id);
      console.log('  - Existing member email:', existingMember.email);
      console.log('  - Current user email:', currentUser.email);
      console.log('  - Match type:', existingMemberById ? 'ID' : 'EMAIL');
      
      // If user is already an admin, they can't join as a player
      if (existingMember.role === 'admin') {
        throw new Error('You are the admin of this group and cannot join as a player');
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

    console.log('➕ Adding new member:', member);

    // Add member to group
    group.members.push(member);
    group.memberCount = group.members.length;
    console.log('📊 Updated group member count:', group.memberCount);

    // Clear existing leaderboard to force regeneration with new member
    group.leaderboard = [];

    // Update storage and trigger updates
    groups[groupIndex] = group;
    localStorage.setItem(this.GLOBAL_GROUPS_KEY, JSON.stringify(groups));
    this.loadGroups();

    console.log('✅ Successfully joined group, returning updated group');
    return group;
  }

  deleteGroup(groupId: string): void {
    const groups = this.getAllGroups().filter((g) => g.id !== groupId);
    localStorage.setItem(this.GLOBAL_GROUPS_KEY, JSON.stringify(groups));
    this.loadGroups();
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

    console.log('✅ Creating group:', newGroup);
    console.log('📝 Group code:', newGroup.code);
    console.log('👤 Admin member:', adminMember);
    
    this.saveGroup(newGroup);
    
    // Verify group was saved
    const savedGroups = this.getAllGroups();
    console.log('💾 All groups after save:', savedGroups);
    console.log('💾 Saved group codes:', savedGroups.map(g => ({ name: g.name, code: g.code })));
    
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

  // Generate mock leaderboard data for testing with better distribution
  private generateMockLeaderboard(group: Group): GroupLeaderboardEntry[] {
    const currentUser = this.authService.getCurrentUser();
    
    // More realistic point distribution
    const basePoints = 180 + Math.floor(Math.random() * 40); // 180-220 base range
    const pointsVariation = Math.floor(Math.random() * 30) + 10; // 10-40 variation
    
    return group.members.map((member: GroupMember, index: number) => {
      const pointVariation = Math.floor(Math.random() * pointsVariation) - (pointsVariation / 2);
      const memberPoints = Math.max(0, basePoints - (index * 15) + pointVariation);
      
      return {
        position: index + 1,
        memberId: member.id,
        memberName: member.id === currentUser?.id ? 'You' : member.name,
        name: member.id === currentUser?.id ? 'You' : member.name,
        played: Math.floor(Math.random() * 8) + 12, // 12-20 games played
        points: memberPoints,
        totalPoints: memberPoints, // Same as points for compatibility
        jokerUsed: Math.floor(Math.random() * 3) + 1, // 1-3 jokers used
        rank: index + 1,
        trend: index === 0 ? 'same' as const : 
               Math.random() > 0.7 ? 'up' as const : 
               Math.random() > 0.5 ? 'down' as const : 'same' as const,
      };
    }).sort((a: any, b: any) => b.points - a.points) // Sort by points descending
      .map((entry: any, index: number) => ({ 
        ...entry, 
        position: index + 1, 
        rank: index + 1 
      })); // Update positions after sorting
  }

  // Centralized conversion function to maintain consistency
  convertToStandings(entries: GroupLeaderboardEntry[]): Standing[] {
    return entries.map(entry => ({
      position: entry.position,
      previousPosition: entry.position, // Use same as position for now
      userId: entry.memberId,
      name: entry.name,
      played: entry.played,
      points: entry.points,
      correctScores: Math.floor(entry.points * 0.12) + Math.floor(Math.random() * 3), // More realistic calculation
      correctResults: Math.floor(entry.points * 0.25) + Math.floor(Math.random() * 2), // More realistic calculation
      jokerUsed: entry.jokerUsed
    }));
  }

  // Get all groups where the current user is a member (optimized for standings page)
  getUserGroupsWithStandings(): GroupWithStandings[] {
    const userGroups = this.getUserGroups();
    const currentUser = this.authService.getCurrentUser();
    
    return userGroups.map(group => {
      const leaderboard = this.getGroupLeaderboard(group.id);
      const standings = this.convertToStandings(leaderboard);
      const userPosition = currentUser 
        ? standings.findIndex(entry => entry.userId === currentUser.id) + 1
        : null;
      
      return {
        group: {
          id: group.id,
          name: group.name,
          code: group.code,
          memberCount: group.memberCount,
          type: group.type
        },
        leaderboard: standings,
        userPosition: userPosition || null
      };
    });
  }

  // Get specific group with standings (optimized for group-standings page)
  getGroupWithStandings(groupId: string): GroupWithStandings | null {
    const group = this.getAllGroups().find(g => g.id === groupId);
    if (!group) return null;

    const leaderboard = this.getGroupLeaderboard(groupId);
    const standings = this.convertToStandings(leaderboard);
    const currentUser = this.authService.getCurrentUser();
    const userPosition = currentUser 
      ? standings.findIndex(entry => entry.userId === currentUser.id) + 1
      : null;

    return {
      group: {
        id: group.id,
        name: group.name,
        code: group.code,
        memberCount: group.memberCount,
        type: group.type
      },
      leaderboard: standings,
      userPosition: userPosition || null
    };
  }

  // Legacy method for backward compatibility - now optimized
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
    
    // Ensure code is unique
    const existingCodes = this.getAllGroups().map(g => g.code);
    if (existingCodes.includes(code)) {
      return this.generateGroupCode(); // Recursively generate until unique
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

  /**
   * Debug method to show current storage state (useful for testing)
   */
  public debugStorageState(): void {
    const currentUser = this.authService.getCurrentUser();
    console.log('🔍 GroupService Debug Storage State:');
    console.log(`👤 Current User: ${currentUser?.id || 'None'} (${currentUser?.email || 'No email'})`);
    
    // Show global storage (new approach)
    const globalData = localStorage.getItem(this.GLOBAL_GROUPS_KEY);
    console.log(`🌍 Global Groups Count: ${globalData ? JSON.parse(globalData).length : 0}`);
    
    // Show legacy storage for comparison
    const legacyData = localStorage.getItem(this.LEGACY_STORAGE_KEY);
    console.log(`📂 Legacy Groups Count: ${legacyData ? JSON.parse(legacyData).length : 0}`);
    
    // Show all sotd_groups keys in localStorage
    const allKeys = Object.keys(localStorage).filter(key => key.startsWith('sotd_'));
    console.log(`🗝️ All SOTD Storage Keys:`, allKeys);
    
    // Show user-specific group filtering results
    if (currentUser) {
      const userGroups = this.getUserGroups();
      const adminGroups = this.getAdminGroups();
      console.log(`👤 User Groups (filtered): ${userGroups.length}`);
      console.log(`👑 Admin Groups (filtered): ${adminGroups.length}`);
    }
  }
}
