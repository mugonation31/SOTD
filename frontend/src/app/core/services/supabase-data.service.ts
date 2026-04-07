import { Injectable } from '@angular/core';
import { SupabaseService, PredictionGroup, Match } from '../../services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class SupabaseDataService {
  constructor(private supabaseService: SupabaseService) {}

  private get client() {
    return this.supabaseService.client;
  }

  private async getCurrentUserId(): Promise<string> {
    const { data, error } = await this.client.auth.getUser();
    if (error || !data.user) {
      throw new Error('Not authenticated');
    }
    return data.user.id;
  }

  async getGroups(): Promise<PredictionGroup[]> {
    const userId = await this.getCurrentUserId();

    const { data: memberships, error: memberError } = await this.client
      .from('group_members')
      .select('group_id')
      .eq('user_id', userId);

    if (memberError) throw new Error(memberError.message);
    if (!memberships || memberships.length === 0) return [];

    const groupIds = memberships.map((m: any) => m.group_id);

    const { data: groups, error: groupError } = await this.client
      .from('groups')
      .select('*')
      .in('id', groupIds);

    if (groupError) throw new Error(groupError.message);
    return groups || [];
  }

  async getGroup(groupId: string): Promise<PredictionGroup> {
    const { data, error } = await this.client
      .from('groups')
      .select('*')
      .eq('id', groupId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async createGroup(input: { name: string; description?: string }): Promise<PredictionGroup> {
    const userId = await this.getCurrentUserId();

    const { data: group, error: groupError } = await this.client
      .from('groups')
      .insert([{ ...input, admin_id: userId, current_members: 1 }])
      .select()
      .single();

    if (groupError) throw new Error(groupError.message);

    // Add creator as a member
    const { error: memberError } = await this.client
      .from('group_members')
      .insert([{ group_id: group.id, user_id: userId, total_points: 0 }]);

    if (memberError) throw new Error(memberError.message);

    return group;
  }

  async joinGroup(code: string): Promise<any> {
    const userId = await this.getCurrentUserId();

    // Find group by code
    const { data: group, error: findError } = await this.client
      .from('groups')
      .select('*')
      .eq('code', code)
      .single();

    if (findError) throw new Error(findError.message);

    // Add user as member
    const { data: membership, error: joinError } = await this.client
      .from('group_members')
      .insert([{ group_id: group.id, user_id: userId, total_points: 0 }])
      .select()
      .single();

    if (joinError) throw new Error(joinError.message);

    // Note: current_members is updated automatically by the
    // increment_member_count_on_join DB trigger (see migration 005).

    return membership;
  }

  async leaveGroup(groupId: string): Promise<void> {
    const userId = await this.getCurrentUserId();

    const { error } = await this.client
      .from('group_members')
      .delete()
      .eq('group_id', groupId)
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
  }

  async getGroupMembers(groupId: string): Promise<any[]> {
    const { data, error } = await this.client
      .from('group_members')
      .select('*, profiles(username, avatar_url)')
      .eq('group_id', groupId)
      .order('total_points', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  }

  // -----------------------------------------------------------------------
  // Gameweeks
  // -----------------------------------------------------------------------

  async getGameweeks(): Promise<any[]> {
    const { data, error } = await this.client
      .from('gameweeks')
      .select('*')
      .order('number', { ascending: true });

    if (error) throw new Error(error.message);
    return data || [];
  }

  async getActiveGameweek(): Promise<any> {
    const { data, error } = await this.client
      .from('gameweeks')
      .select('*')
      .eq('is_active', true)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async getGameweek(gameweekId: string): Promise<any> {
    const { data, error } = await this.client
      .from('gameweeks')
      .select('*')
      .eq('id', gameweekId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // -----------------------------------------------------------------------
  // Matches
  // -----------------------------------------------------------------------

  async getMatches(gameweek: number): Promise<Match[]> {
    const { data, error } = await this.client
      .from('matches')
      .select('*')
      .eq('gameweek', gameweek)
      .order('kickoff_time', { ascending: true });

    if (error) throw new Error(error.message);
    return data || [];
  }

  async getMatch(matchId: string): Promise<Match> {
    const { data, error } = await this.client
      .from('matches')
      .select('*')
      .eq('id', matchId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // -----------------------------------------------------------------------
  // Predictions
  // -----------------------------------------------------------------------

  async getPredictions(gameweekNumber: number): Promise<any[]> {
    const userId = await this.getCurrentUserId();

    const { data, error } = await this.client
      .from('predictions')
      .select('*')
      .eq('user_id', userId)
      .eq('gameweek_number', gameweekNumber);

    if (error) throw new Error(error.message);
    return data || [];
  }

  async submitPredictions(
    predictions: Array<{
      match_id: string;
      home_score: number;
      away_score: number;
      gameweek_number: number;
      gameweek_id: string;
      joker_used?: boolean;
    }>
  ): Promise<any[]> {
    const userId = await this.getCurrentUserId();

    const rows = predictions.map(p => ({
      user_id: userId,
      match_id: p.match_id,
      home_score: p.home_score,
      away_score: p.away_score,
      gameweek_number: p.gameweek_number,
      gameweek_id: p.gameweek_id,
      joker_used: p.joker_used ?? false,
    }));

    const { data, error } = await this.client
      .from('predictions')
      .upsert(rows, { onConflict: 'user_id,match_id' })
      .select();

    if (error) throw new Error(error.message);
    return data || [];
  }

  async getGroupPredictions(groupId: string, gameweekNumber: number): Promise<any[]> {
    // Get group member user ids
    const { data: members, error: memberError } = await this.client
      .from('group_members')
      .select('user_id')
      .eq('group_id', groupId);

    if (memberError) throw new Error(memberError.message);
    if (!members || members.length === 0) return [];

    // Client-side deadline check: UX convenience only. The real security
    // boundary is the RLS policy on the predictions table (migration 006)
    // which enforces group membership and deadline constraints at the DB level.
    const { data: gameweek, error: gwError } = await this.client
      .from('gameweeks')
      .select('*')
      .eq('number', gameweekNumber)
      .single();

    if (gwError) throw new Error(gwError.message);

    if (new Date(gameweek.deadline) > new Date()) {
      throw new Error('Predictions are not visible until after the deadline');
    }

    const userIds = members.map((m: any) => m.user_id);

    const { data: predictions, error: predError } = await this.client
      .from('predictions')
      .select('*')
      .in('user_id', userIds)
      .eq('gameweek_number', gameweekNumber);

    if (predError) throw new Error(predError.message);
    return predictions || [];
  }

  // -----------------------------------------------------------------------
  // Leaderboard
  // -----------------------------------------------------------------------

  async getLeaderboard(groupId: string): Promise<any[]> {
    const { data, error } = await this.client
      .from('group_members')
      .select('*, profiles(username, avatar_url)')
      .eq('group_id', groupId)
      .order('total_points', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  }
}
