import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SupabaseDataService } from './supabase-data.service';

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
  // True iff this user is the admin_id of the group whose leaderboard
  // this Standing belongs to. UI surfaces (group standings, members
  // list) render an "ADMIN" badge based on this flag.
  isAdmin: boolean;
}

// Standardized group with standings interface
export interface GroupWithStandings {
  group: {
    id: string;
    name: string;
    code: string;
    memberCount: number;
  };
  leaderboard: Standing[];
  userPosition: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(
    private authService: AuthService,
    private supabaseDataService: SupabaseDataService,
  ) {}

  async getUserGroups(): Promise<any[]> {
    try {
      return await this.supabaseDataService.getGroups();
    } catch {
      return [];
    }
  }

  async getAdminGroups(): Promise<any[]> {
    try {
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser) return [];
      const groups = await this.supabaseDataService.getGroups();
      const adminGroups = groups.filter((g: any) => g.admin_id === currentUser.id);
      // Attach members to each group for dashboard/members pages
      for (const group of adminGroups) {
        (group as any).members = await this.supabaseDataService.getGroupMembers(group.id);
      }
      return adminGroups;
    } catch {
      return [];
    }
  }

  async createGroup(data: { name: string; description?: string }): Promise<any> {
    return this.supabaseDataService.createGroup(data);
  }

  async joinGroup(code: string): Promise<any> {
    return this.supabaseDataService.joinGroup(code);
  }

  async leaveGroup(groupId: string): Promise<void> {
    return this.supabaseDataService.leaveGroup(groupId);
  }

  async findGroupByCode(code: string): Promise<any> {
    return this.supabaseDataService.getGroupByCode(code);
  }

  async getGroupLeaderboard(groupId: string): Promise<any[]> {
    return this.supabaseDataService.getLeaderboard(groupId);
  }

  async getUserGroupsWithStandings(): Promise<GroupWithStandings[]> {
    const groups = await this.getUserGroups();
    return Promise.all(groups.map(group => this.buildGroupWithStandings(group)));
  }

  async getGroupWithStandings(groupId: string): Promise<GroupWithStandings | null> {
    const group = await this.supabaseDataService.getGroup(groupId);
    if (!group) return null;
    return this.buildGroupWithStandings(group);
  }

  private async buildGroupWithStandings(group: any): Promise<GroupWithStandings> {
    const currentUser = this.authService.getCurrentUser();
    const rawLeaderboard = await this.supabaseDataService.getLeaderboard(group.id);
    const leaderboard = this.convertToStandings(rawLeaderboard, group.admin_id);
    const userPosition = currentUser
      ? leaderboard.findIndex(entry => entry.userId === currentUser.id) + 1
      : null;

    return {
      group: {
        id: group.id,
        name: group.name,
        code: group.code,
        memberCount: group.current_members,
      },
      leaderboard,
      userPosition: userPosition && userPosition > 0 ? userPosition : null,
    };
  }

  private convertToStandings(rawLeaderboard: any[], adminId: string | undefined): Standing[] {
    return rawLeaderboard.map((entry: any, index: number) => ({
      position: index + 1,
      previousPosition: index + 1,
      userId: entry.user_id,
      name: entry.profiles?.username || 'Unknown',
      avatar: entry.profiles?.avatar_url || undefined,
      played: entry.games_played || 0,
      points: entry.total_points || 0,
      correctScores: entry.correct_scores || 0,
      correctResults: entry.correct_results || 0,
      jokerUsed: entry.jokers_used || 0,
      isAdmin: adminId !== undefined && entry.user_id === adminId,
    }));
  }
}
