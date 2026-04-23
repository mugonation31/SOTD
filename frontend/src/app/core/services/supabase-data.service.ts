import { Injectable } from '@angular/core';
import {
  SupabaseService,
  PredictionGroup,
  Match,
  Gameweek,
  GroupMember,
  GroupMemberWithProfile,
  Prediction,
  PredictionWithMatch,
} from '../../services/supabase.service';
import { SupabaseError } from '../errors/supabase-error';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class SupabaseDataService {
  constructor(
    private supabaseService: SupabaseService,
    private logger: LoggerService,
  ) {}

  private get client() {
    return this.supabaseService.client;
  }

  /**
   * Wraps a raw Supabase error into a `SupabaseError` carrying a
   * user-safe message and an ops-friendly context. The raw message is
   * preserved on `rawMessage` for logging but never reaches UI copy.
   */
  private toSupabaseError(context: string, userMessage: string, raw: unknown): SupabaseError {
    return new SupabaseError({ context, userMessage, raw });
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

    if (memberError) throw this.toSupabaseError('supabase.getGroups', 'Unable to load groups', memberError);
    if (!memberships || memberships.length === 0) return [];

    const groupIds = memberships.map((m: any) => m.group_id);

    const { data: groups, error: groupError } = await this.client
      .from('groups')
      .select('*')
      .in('id', groupIds);

    if (groupError) throw this.toSupabaseError('supabase.getGroups', 'Unable to load groups', groupError);
    return groups || [];
  }

  async getGroup(groupId: string): Promise<PredictionGroup> {
    const { data, error } = await this.client
      .from('groups')
      .select('*')
      .eq('id', groupId)
      .single();

    if (error) throw this.toSupabaseError('supabase.getGroup', 'Unable to load group', error);
    return data;
  }

  async getGroupByCode(code: string): Promise<Partial<PredictionGroup>> {
    const { data, error } = await this.client
      .from('groups')
      .select('id, name, code, current_members, max_members, is_active')
      .eq('code', code)
      .single();

    if (error) throw this.toSupabaseError('supabase.getGroupByCode', 'Group not found', error);
    return data;
  }

  async createGroup(input: { name: string; description?: string }): Promise<PredictionGroup> {
    const userId = await this.getCurrentUserId();

    // Generate group code using DB function
    const { data: codeData, error: codeError } = await this.client
      .rpc('generate_group_code');
    if (codeError) throw this.toSupabaseError('supabase.createGroup', 'Unable to create group', codeError);

    const currentYear = new Date().getFullYear();
    const seasonYear = new Date().getMonth() >= 7
      ? `${currentYear}-${String(currentYear + 1).slice(2)}`
      : `${currentYear - 1}-${String(currentYear).slice(2)}`;

    const { data: group, error: groupError } = await this.client
      .from('groups')
      .insert([{
        ...input,
        admin_id: userId,
        code: codeData,
        season_year: seasonYear,
        current_members: 1,
      }])
      .select()
      .single();

    if (groupError) throw this.toSupabaseError('supabase.createGroup', 'Unable to create group', groupError);

    // Add creator as a member
    const { error: memberError } = await this.client
      .from('group_members')
      .insert([{ group_id: group.id, user_id: userId, total_points: 0 }]);

    if (memberError) throw this.toSupabaseError('supabase.createGroup', 'Unable to create group', memberError);

    return group;
  }

  async joinGroup(code: string): Promise<GroupMember> {
    const userId = await this.getCurrentUserId();

    // Find group by code
    const { data: group, error: findError } = await this.client
      .from('groups')
      .select('*')
      .eq('code', code)
      .single();

    if (findError) throw this.toSupabaseError('supabase.joinGroup', 'Unable to join group', findError);

    // Add user as member
    const { data: membership, error: joinError } = await this.client
      .from('group_members')
      .insert([{ group_id: group.id, user_id: userId, total_points: 0 }])
      .select()
      .single();

    if (joinError) throw this.toSupabaseError('supabase.joinGroup', 'Unable to join group', joinError);

    // Note: current_members is updated automatically by the
    // increment_member_count_on_join DB trigger (see migration 005).

    return membership;
  }

  async leaveGroup(groupId: string): Promise<void> {
    const userId = await this.getCurrentUserId();

    // Prevent admin from leaving their own group
    const { data: group } = await this.client
      .from('groups')
      .select('admin_id')
      .eq('id', groupId)
      .single();

    if (group && group.admin_id === userId) {
      throw new Error('Group admins cannot leave their own group');
    }

    const { data, error } = await this.client
      .from('group_members')
      .delete()
      .eq('group_id', groupId)
      .eq('user_id', userId)
      .select();

    if (error) throw this.toSupabaseError('supabase.leaveGroup', 'Unable to leave group', error);
    if (!data || data.length === 0) throw new Error('You are not a member of this group');
  }

  async getGroupMembers(groupId: string): Promise<GroupMemberWithProfile[]> {
    const { data, error } = await this.client
      .from('group_members')
      .select('*, profiles(username, avatar_url)')
      .eq('group_id', groupId)
      .order('total_points', { ascending: false });

    if (error) throw this.toSupabaseError('supabase.getGroupMembers', 'Unable to load members', error);
    return data || [];
  }

  // -----------------------------------------------------------------------
  // Gameweeks
  // -----------------------------------------------------------------------

  async getGameweeks(): Promise<Gameweek[]> {
    const { data, error } = await this.client
      .from('gameweeks')
      .select('*')
      .order('gameweek_number', { ascending: true });

    if (error) throw this.toSupabaseError('supabase.getGameweeks', 'Unable to load gameweeks', error);
    return data || [];
  }

  async getActiveGameweek(): Promise<Gameweek> {
    const { data, error } = await this.client
      .from('gameweeks')
      .select('*')
      .eq('is_active', true)
      .single();

    if (error) throw this.toSupabaseError('supabase.getActiveGameweek', 'Unable to load active gameweek', error);
    return data;
  }

  async getGameweek(gameweekId: string): Promise<Gameweek> {
    const { data, error } = await this.client
      .from('gameweeks')
      .select('*')
      .eq('id', gameweekId)
      .single();

    if (error) throw this.toSupabaseError('supabase.getGameweek', 'Unable to load gameweek', error);
    return data;
  }

  /**
   * Centralised "has the deadline passed?" check used by UI callers
   * (player group-standings, group-admin predictions) before attempting
   * to fetch group predictions. `getGroupPredictions` still enforces the
   * same check server-side (mirrored by RLS); this helper keeps the UI
   * decision in one place.
   *
   * Returns `{ deadline: '', isPast: false }` when the stored deadline is
   * null/empty — fail-open so we don't lock a UI based on unknown data.
   */
  async getGameweekDeadline(
    gameweekNumber: number
  ): Promise<{ deadline: string; isPast: boolean }> {
    const { data, error } = await this.client
      .from('gameweeks')
      .select('deadline')
      .eq('gameweek_number', gameweekNumber)
      .single();

    if (error) throw this.toSupabaseError('supabase.getGameweekDeadline', 'Unable to load deadline', error);

    const deadline = data?.deadline;
    if (!deadline) {
      this.logger.warn('supabase.getGameweekDeadline: null deadline', { gameweekNumber });
      return { deadline: '', isPast: false };
    }

    return {
      deadline,
      isPast: new Date(deadline).getTime() <= Date.now(),
    };
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

    if (error) throw this.toSupabaseError('supabase.getMatches', 'Unable to load matches', error);
    return data || [];
  }

  async getMatch(matchId: string): Promise<Match> {
    const { data, error } = await this.client
      .from('matches')
      .select('*')
      .eq('id', matchId)
      .single();

    if (error) throw this.toSupabaseError('supabase.getMatch', 'Unable to load match', error);
    return data;
  }

  // -----------------------------------------------------------------------
  // Predictions
  // -----------------------------------------------------------------------

  async getPredictions(gameweekNumber: number): Promise<Prediction[]> {
    const userId = await this.getCurrentUserId();

    const { data, error } = await this.client
      .from('predictions')
      .select('*')
      .eq('user_id', userId)
      .eq('gameweek_number', gameweekNumber);

    if (error) throw this.toSupabaseError('supabase.getPredictions', 'Unable to load predictions', error);
    return data || [];
  }

  /**
   * Return the current user's predictions for a gameweek joined with the
   * parent `matches` row. Shape: each element has `matches` populated with
   * the joined match columns (home_team, away_team, kickoff_time, status,
   * home_score, away_score, ...). Used by the predictions page to render
   * historical + current predictions without a second round-trip.
   */
  async getPredictionsWithMatches(gameweekNumber: number): Promise<PredictionWithMatch[]> {
    const userId = await this.getCurrentUserId();

    const { data, error } = await this.client
      .from('predictions')
      .select('*, matches(*)')
      .eq('user_id', userId)
      .eq('gameweek_number', gameweekNumber);

    if (error) throw this.toSupabaseError('supabase.getPredictionsWithMatches', 'Unable to load predictions', error);
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
  ): Promise<Prediction[]> {
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

    if (error) throw this.toSupabaseError('supabase.submitPredictions', 'Unable to save predictions', error);
    return data || [];
  }

  async getGroupPredictions(groupId: string, gameweekNumber: number): Promise<Prediction[]> {
    // Get group member user ids
    const { data: members, error: memberError } = await this.client
      .from('group_members')
      .select('user_id')
      .eq('group_id', groupId);

    if (memberError) throw this.toSupabaseError('supabase.getGroupPredictions', 'Unable to load group predictions', memberError);
    if (!members || members.length === 0) return [];

    // Client-side deadline check: UX convenience only. The real security
    // boundary is the RLS policy on the predictions table (migration 005)
    // which enforces group membership and deadline constraints at the DB level.
    const { data: gameweek, error: gwError } = await this.client
      .from('gameweeks')
      .select('*')
      .eq('gameweek_number', gameweekNumber)
      .single();

    if (gwError) throw this.toSupabaseError('supabase.getGroupPredictions', 'Unable to load group predictions', gwError);

    if (new Date(gameweek.deadline) > new Date()) {
      throw new Error('Predictions are not visible until after the deadline');
    }

    const userIds = members.map((m: any) => m.user_id);

    const { data: predictions, error: predError } = await this.client
      .from('predictions')
      .select('*')
      .in('user_id', userIds)
      .eq('gameweek_number', gameweekNumber);

    if (predError) throw this.toSupabaseError('supabase.getGroupPredictions', 'Unable to load group predictions', predError);
    return predictions || [];
  }

  // -----------------------------------------------------------------------
  // Joker state
  // -----------------------------------------------------------------------

  /**
   * Returns the current user's season-wide joker usage.
   *
   * Jokers are player-global (2 per season) but the underlying columns live
   * on `group_members` (one row per membership). We read all rows for the
   * user and take the MAX — this is defensive against sync drift. In a
   * healthy system every row has identical values.
   *
   * When the user has no memberships, returns zero/null defaults rather
   * than throwing.
   */
  async getJokerUsage(): Promise<{
    usedCount: number;
    firstJokerGameweek: number | null;
    secondJokerGameweek: number | null;
  }> {
    const userId = await this.getCurrentUserId();

    const { data, error } = await this.client
      .from('group_members')
      .select('jokers_used, first_joker_gameweek, second_joker_gameweek')
      .eq('user_id', userId);

    if (error) throw this.toSupabaseError('supabase.getJokerUsage', 'Unable to load joker state', error);
    if (!data || data.length === 0) {
      return { usedCount: 0, firstJokerGameweek: null, secondJokerGameweek: null };
    }

    let usedCount = 0;
    let firstJokerGameweek: number | null = null;
    let secondJokerGameweek: number | null = null;

    for (const row of data as Array<{
      jokers_used: number | null;
      first_joker_gameweek: number | null;
      second_joker_gameweek: number | null;
    }>) {
      if ((row.jokers_used ?? 0) > usedCount) usedCount = row.jokers_used ?? 0;
      if (firstJokerGameweek === null && row.first_joker_gameweek !== null) {
        firstJokerGameweek = row.first_joker_gameweek;
      }
      if (secondJokerGameweek === null && row.second_joker_gameweek !== null) {
        secondJokerGameweek = row.second_joker_gameweek;
      }
    }

    return { usedCount, firstJokerGameweek, secondJokerGameweek };
  }

  /**
   * For each known special gameweek type (`boxing-day`, `final-day`),
   * returns the highest-numbered regular gameweek strictly preceding it.
   *
   * Used by the auto-joker flow: when a player has unspent jokers heading
   * into a special GW, the joker is auto-assigned to the immediately
   * preceding regular gameweek.
   *
   * Returns null for a slot when either the special GW is absent or no
   * regular GW precedes it (e.g. season opens on Boxing Day).
   */
  async getLastRegularGameweekBeforeSpecial(): Promise<{
    beforeBoxingDay: number | null;
    beforeFinalDay: number | null;
  }> {
    const { data, error } = await this.client
      .from('gameweeks')
      .select('gameweek_number, is_special, special_type')
      .order('gameweek_number', { ascending: true });

    if (error) throw this.toSupabaseError('supabase.getLastRegularGameweekBeforeSpecial', 'Unable to load gameweeks', error);

    const rows = (data || []) as Array<{
      gameweek_number: number;
      is_special: boolean;
      special_type: string | null;
    }>;

    const findBefore = (type: string): number | null => {
      const special = rows.find(r => r.is_special && r.special_type === type);
      if (!special) return null;
      let last: number | null = null;
      for (const r of rows) {
        if (!r.is_special && r.gameweek_number < special.gameweek_number) {
          if (last === null || r.gameweek_number > last) last = r.gameweek_number;
        }
      }
      return last;
    };

    return {
      beforeBoxingDay: findBefore('boxing-day'),
      beforeFinalDay: findBefore('final-day'),
    };
  }

  /**
   * Records that the current user has played a joker on `gameweekNumber`.
   *
   * Delegates to the `mark_joker_used(p_gameweek_number)` Postgres RPC
   * (migration 007) which performs the read-modify-write atomically under
   * a row-level lock. This closes a race where two concurrent submits on
   * different gameweeks (e.g. two tabs) could both observe `jokers_used=0`
   * and each claim a joker slot — last write wins, one joker lost.
   *
   * Jokers are season-scoped and player-global (Decision 1): the RPC
   * updates every `group_members` row for the caller's `auth.uid()` so the
   * counter stays in sync across all their groups.
   *
   * The RPC is idempotent: calling it twice with the same gameweek is a
   * no-op after the first call. `jokers_used >= 2` is also a defensive
   * no-op (the UI prevents reaching it).
   *
   * Errors: rethrows any Supabase error as a plain Error so callers can
   * log them and show a generic toast.
   */
  async markJokerUsed(gameweekNumber: number): Promise<void> {
    const { error } = await this.client.rpc('mark_joker_used', {
      p_gameweek_number: gameweekNumber,
    });

    if (error) throw this.toSupabaseError('supabase.markJokerUsed', 'Unable to save joker state', error);
  }

  // -----------------------------------------------------------------------
  // Leaderboard
  // -----------------------------------------------------------------------

  async getLeaderboard(groupId: string): Promise<GroupMemberWithProfile[]> {
    // Tiebreakers per plan 4.1.3: total_points DESC, then correct_scores DESC,
    // then correct_results DESC. Chained .order() calls serialize into a single
    // PostgREST ORDER BY clause.
    const { data, error } = await this.client
      .from('group_members')
      .select('*, profiles(username, avatar_url)')
      .eq('group_id', groupId)
      .order('total_points', { ascending: false })
      .order('correct_scores', { ascending: false })
      .order('correct_results', { ascending: false });

    if (error) throw this.toSupabaseError('supabase.getLeaderboard', 'Unable to load leaderboard', error);
    return data || [];
  }

  // -----------------------------------------------------------------------
  // Super-admin (Task 4.0.5)
  // -----------------------------------------------------------------------

  /**
   * Returns counts only (no row payload) for the admin dashboard. Uses
   * PostgREST `head: true, count: 'exact'` so Supabase returns just the
   * count in the response header — no row bytes shipped. Cheap at scale.
   * Super-admin only via existing RLS policies.
   */
  async getAdminCounts(): Promise<{ userCount: number; groupCount: number }> {
    const [usersResult, groupsResult] = await Promise.all([
      this.client
        .from('profiles')
        .select('*', { count: 'exact', head: true }),
      this.client
        .from('groups')
        .select('*', { count: 'exact', head: true }),
    ]);

    if (usersResult.error) throw this.toSupabaseError('supabase.getAdminCounts', 'Unable to load admin counts', usersResult.error);
    if (groupsResult.error) throw this.toSupabaseError('supabase.getAdminCounts', 'Unable to load admin counts', groupsResult.error);

    return {
      userCount: usersResult.count ?? 0,
      groupCount: groupsResult.count ?? 0,
    };
  }

  /**
   * Returns every profile in the system, newest first. Super-admin only —
   * RLS on `profiles` (migration 001) gates this to callers whose JWT
   * resolves to `role = 'super-admin'`.
   *
   * Capped at 500 rows as a safety limit. Task 4.2 will replace this with
   * proper paginated `.range(offset, offset+pageSize-1)` + infinite scroll
   * on the admin list page.
   */
  async getAllUsers(): Promise<Array<{
    id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    role: string;
    is_active: boolean;
    created_at: string;
  }>> {
    const { data, error } = await this.client
      .from('profiles')
      .select('id, email, username, first_name, last_name, role, is_active, created_at')
      .order('created_at', { ascending: false })
      .limit(500);

    if (error) throw this.toSupabaseError('supabase.getAllUsers', 'Unable to load users', error);
    return data || [];
  }

  /**
   * Returns every group in the system, newest first. Super-admin only —
   * RLS on `groups` (migration 004) gates this to callers whose JWT
   * resolves to `role = 'super-admin'`.
   *
   * Capped at 500 rows as a safety limit. Task 4.2 will replace this with
   * proper paginated `.range(offset, offset+pageSize-1)` + infinite scroll
   * on the admin list page.
   */
  async getAllGroups(): Promise<Array<{
    id: string;
    name: string;
    code: string;
    admin_id: string;
    current_members: number;
    max_members: number;
    is_active: boolean;
    created_at: string;
  }>> {
    const { data, error } = await this.client
      .from('groups')
      .select('id, name, code, admin_id, current_members, max_members, is_active, created_at')
      .order('created_at', { ascending: false })
      .limit(500);

    if (error) throw this.toSupabaseError('supabase.getAllGroups', 'Unable to load groups', error);
    return data || [];
  }

  /**
   * Activates or deactivates a user account. The `is_active` flag (added in
   * migration 008) is the authoritative write-block: deactivated users can
   * still READ data (so leaderboards keep rendering their history) but
   * predictions / group_members RLS rejects all INSERT/UPDATE/DELETE.
   *
   * NOTE: existing JWTs continue to authenticate at the auth layer until
   * they expire. To force an immediate logout, the caller should also invoke
   * `signOutUser(userId)` after deactivating.
   */
  async toggleUserActive(userId: string, active: boolean): Promise<void> {
    const { error } = await this.client
      .from('profiles')
      .update({ is_active: active })
      .eq('id', userId);

    if (error) throw this.toSupabaseError('supabase.toggleUserActive', 'Unable to update user', error);
  }

  /**
   * Permanently deletes a group. `group_members` rows cascade delete via
   * `ON DELETE CASCADE` (migration 004). Predictions are NOT deleted —
   * they reference `user_id`/`match_id`/`gameweek_id` (migration 005) and
   * are per-player, so each member's season history survives the group
   * being removed. Super-admin RLS policy required.
   */
  async deleteGroup(groupId: string): Promise<void> {
    const { error } = await this.client
      .from('groups')
      .delete()
      .eq('id', groupId);

    if (error) throw this.toSupabaseError('supabase.deleteGroup', 'Unable to delete group', error);
  }

  /**
   * Reads the single-row `sync_metadata` table (id = 1) and computes the
   * remaining client-side cooldown window (5 minutes). The Edge Function
   * remains the authoritative gate (Decision 1) — this method only powers
   * the dashboard countdown.
   *
   * Returns zeros/nulls if the row hasn't been seeded yet (defensive — the
   * migration seeds it).
   */
  async getLastMatchSync(): Promise<{
    lastSyncAt: string | null;
    lastSyncStatus: 'ok' | 'error' | 'in_progress' | null;
    lastSyncError: string | null;
    cooldownRemainingSeconds: number;
  }> {
    const COOLDOWN_SECONDS = 300; // 5 minutes

    const { data, error } = await this.client
      .from('sync_metadata')
      .select('last_sync_at, last_sync_status, last_sync_error')
      .eq('id', 1)
      .single();

    if (error) throw this.toSupabaseError('supabase.getLastMatchSync', 'Unable to load sync status', error);

    if (!data) {
      return {
        lastSyncAt: null,
        lastSyncStatus: null,
        lastSyncError: null,
        cooldownRemainingSeconds: 0,
      };
    }

    const lastSyncAt = data.last_sync_at ?? null;
    let cooldownRemainingSeconds = 0;
    if (lastSyncAt) {
      const elapsedSeconds = (Date.now() - new Date(lastSyncAt).getTime()) / 1000;
      cooldownRemainingSeconds = Math.max(0, Math.floor(COOLDOWN_SECONDS - elapsedSeconds));
    }

    return {
      lastSyncAt,
      lastSyncStatus: data.last_sync_status ?? null,
      lastSyncError: data.last_sync_error ?? null,
      cooldownRemainingSeconds,
    };
  }

  /**
   * Triggers a match data sync via the `sync-matches` Edge Function. The
   * Edge Function enforces a server-side 5-minute cooldown (Task 4.0.6) —
   * a cooldown response is normal and surfaced to the caller as-is. Only
   * unexpected invoke errors are thrown.
   */
  async triggerMatchSync(): Promise<{
    ok: boolean;
    syncedAt?: string;
    reason?: string;
    cooldownRemainingSeconds?: number;
  }> {
    const { data, error } = await this.client.functions.invoke('sync-matches', {
      body: {},
    });

    if (error) throw this.toSupabaseError('supabase.triggerMatchSync', 'Unable to trigger sync', error);
    return data;
  }

  /**
   * Force-terminates the active session for `userId` via the `admin-signout`
   * Edge Function (Task 4.0.7). The Edge Function holds the `service_role`
   * key and verifies the caller is super-admin server-side — the client
   * never holds elevated credentials (Decision 2).
   */
  async signOutUser(userId: string): Promise<{ ok: boolean; reason?: string }> {
    const { data, error } = await this.client.functions.invoke('admin-signout', {
      body: { userId },
    });

    if (error) throw this.toSupabaseError('supabase.signOutUser', 'Unable to sign out user', error);
    return data;
  }
}
