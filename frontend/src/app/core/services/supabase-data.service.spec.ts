import { TestBed } from '@angular/core/testing';
import { SupabaseDataService } from './supabase-data.service';
import { SupabaseService } from '../../services/supabase.service';
import { SupabaseError } from '../errors/supabase-error';
import { LoggerService } from './logger.service';

// ---------------------------------------------------------------------------
// Helpers: mock Supabase query builder
// ---------------------------------------------------------------------------
function createMockQueryBuilder(resolvedValue: { data: any; error: any }) {
  const builder: any = {};
  const methods = [
    'select', 'insert', 'update', 'delete', 'upsert',
    'eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'in',
    'order', 'limit', 'single', 'maybeSingle',
    'is', 'filter', 'match', 'range',
  ];
  for (const m of methods) {
    builder[m] = jest.fn().mockReturnValue(builder);
  }
  // Make the builder thenable so `await` resolves it
  builder.then = (resolve: Function) => resolve(resolvedValue);
  return builder;
}

function createMockSupabaseClient() {
  const defaultBuilder = createMockQueryBuilder({ data: null, error: null });
  return {
    from: jest.fn().mockReturnValue(defaultBuilder),
    rpc: jest.fn().mockResolvedValue({ data: null, error: null }),
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: { user: { id: 'user-1' } },
        error: null,
      }),
    },
    functions: {
      invoke: jest.fn().mockResolvedValue({ data: null, error: null }),
    },
    // Expose helper so individual tests can override
    __mockBuilder: defaultBuilder,
  };
}

function createMockSupabaseService(client: any) {
  return { client } as any;
}

describe('SupabaseDataService', () => {
  let service: SupabaseDataService;
  let mockClient: ReturnType<typeof createMockSupabaseClient>;
  let mockSupabaseService: any;
  let mockLogger: { error: jest.Mock; warn: jest.Mock };

  beforeEach(() => {
    mockClient = createMockSupabaseClient();
    mockSupabaseService = createMockSupabaseService(mockClient);
    mockLogger = { error: jest.fn(), warn: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        SupabaseDataService,
        { provide: SupabaseService, useValue: mockSupabaseService },
        { provide: LoggerService, useValue: mockLogger },
      ],
    });

    service = TestBed.inject(SupabaseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // -----------------------------------------------------------------------
  // Groups
  // -----------------------------------------------------------------------
  describe('getGroups', () => {
    it('should return groups for the current user when getGroups is called', async () => {
      const groups = [
        { id: 'g1', name: 'Group A', code: 'ABC', admin_id: 'user-1' },
        { id: 'g2', name: 'Group B', code: 'DEF', admin_id: 'user-2' },
      ];

      // Mock group_members query to return group ids for the user
      const memberBuilder = createMockQueryBuilder({
        data: [{ group_id: 'g1' }, { group_id: 'g2' }],
        error: null,
      });
      // Mock groups query to return groups matching those ids
      const groupsBuilder = createMockQueryBuilder({
        data: groups,
        error: null,
      });

      mockClient.from
        .mockReturnValueOnce(memberBuilder)  // first call: group_members
        .mockReturnValueOnce(groupsBuilder); // second call: groups

      const result = await service.getGroups();

      expect(mockClient.from).toHaveBeenCalledWith('group_members');
      expect(memberBuilder.select).toHaveBeenCalledWith('group_id');
      expect(memberBuilder.eq).toHaveBeenCalledWith('user_id', 'user-1');
      expect(mockClient.from).toHaveBeenCalledWith('groups');
      expect(result).toEqual(groups);
    });
  });

  describe('getGroups - empty memberships', () => {
    it('should return empty array without querying groups table when user has no memberships', async () => {
      const memberBuilder = createMockQueryBuilder({
        data: [],
        error: null,
      });
      mockClient.from.mockReturnValueOnce(memberBuilder);

      const result = await service.getGroups();

      expect(result).toEqual([]);
      // Should only have called from('group_members'), NOT from('groups')
      expect(mockClient.from).toHaveBeenCalledTimes(1);
      expect(mockClient.from).toHaveBeenCalledWith('group_members');
    });
  });

  describe('getGroup', () => {
    it('should return a single group by id when getGroup is called', async () => {
      const group = { id: 'g1', name: 'Group A', code: 'ABC', admin_id: 'user-1' };
      const builder = createMockQueryBuilder({ data: group, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getGroup('g1');

      expect(mockClient.from).toHaveBeenCalledWith('groups');
      expect(builder.select).toHaveBeenCalledWith('*');
      expect(builder.eq).toHaveBeenCalledWith('id', 'g1');
      expect(builder.single).toHaveBeenCalled();
      expect(result).toEqual(group);
    });
  });

  describe('createGroup', () => {
    it('should create a group and return it when createGroup is called', async () => {
      const input = { name: 'New Group', description: 'A test group' };
      const created = { id: 'g-new', name: 'New Group', code: 'XYZ', admin_id: 'user-1' };

      // First call: insert into groups
      const groupBuilder = createMockQueryBuilder({ data: created, error: null });
      // Second call: insert into group_members
      const memberBuilder = createMockQueryBuilder({ data: { id: 'gm-1' }, error: null });

      mockClient.from
        .mockReturnValueOnce(groupBuilder)
        .mockReturnValueOnce(memberBuilder);

      const result = await service.createGroup(input);

      expect(mockClient.from).toHaveBeenCalledWith('groups');
      // Migration 016: createGroup must insert with current_members: 0.
      // The increment_member_count_on_join trigger lands the +1 when we
      // insert the admin's group_members row in the same flow. If we
      // pre-set current_members to 1 here the trigger pushes it to 2 and
      // every group is born off-by-one.
      expect(groupBuilder.insert).toHaveBeenCalledWith([
        expect.objectContaining({ current_members: 0 }),
      ]);
      expect(groupBuilder.select).toHaveBeenCalled();
      expect(groupBuilder.single).toHaveBeenCalled();
      expect(result).toEqual(created);
    });
  });

  describe('joinGroup', () => {
    it('should find a group by code and add user as member when joinGroup is called', async () => {
      const group = { id: 'g1', name: 'Group A', code: 'JOIN1', current_members: 2 };
      const membership = { id: 'gm-new', group_id: 'g1', user_id: 'user-1', total_points: 0 };

      // 1st call: find group by code
      const findBuilder = createMockQueryBuilder({ data: group, error: null });
      // 2nd call: insert into group_members
      // (DB trigger handles current_members increment — no 3rd call needed)
      const insertBuilder = createMockQueryBuilder({ data: membership, error: null });

      mockClient.from
        .mockReturnValueOnce(findBuilder)
        .mockReturnValueOnce(insertBuilder);

      const result = await service.joinGroup('JOIN1');

      expect(mockClient.from).toHaveBeenCalledWith('groups');
      expect(findBuilder.eq).toHaveBeenCalledWith('code', 'JOIN1');
      expect(findBuilder.single).toHaveBeenCalled();
      expect(mockClient.from).toHaveBeenCalledWith('group_members');
      expect(result).toEqual(membership);
    });

    it('should throw a SupabaseError with sanitized userMessage when joining a group with invalid code', async () => {
      const rawMsg = 'No rows found';
      const findBuilder = createMockQueryBuilder({
        data: null,
        error: { message: rawMsg },
      });
      mockClient.from.mockReturnValueOnce(findBuilder);

      try {
        await service.joinGroup('INVALID');
        fail('expected joinGroup to throw');
      } catch (err) {
        expect(err).toBeInstanceOf(SupabaseError);
        const se = err as SupabaseError;
        expect(se.context).toBe('supabase.joinGroup');
        expect(se.userMessage).toBe('Unable to join group');
        expect(se.rawMessage).toBe(rawMsg);
      }
    });
  });

  describe('leaveGroup', () => {
    it('should remove the user from a group when leaveGroup is called', async () => {
      // First call: admin check (select from groups)
      const adminCheckBuilder = createMockQueryBuilder({ data: { admin_id: 'other-user' }, error: null });
      // Second call: delete from group_members (returns deleted rows)
      const deleteBuilder = createMockQueryBuilder({ data: [{ id: 'row1' }], error: null });
      mockClient.from.mockReturnValueOnce(adminCheckBuilder).mockReturnValueOnce(deleteBuilder);

      await service.leaveGroup('g1');

      expect(mockClient.from).toHaveBeenCalledWith('groups');
      expect(mockClient.from).toHaveBeenCalledWith('group_members');
      expect(deleteBuilder.delete).toHaveBeenCalled();
    });
  });

  describe('getGroupMembers', () => {
    it('should query group_members and member_profiles separately and merge them when getGroupMembers is called', async () => {
      // Migration 015 introduced the column-firewalled member_profiles view.
      // The data service no longer embeds profiles via PostgREST — it does
      // two queries (group_members, then member_profiles by user_ids) and
      // merges in JS, so the leaderboard renders co-members' usernames
      // without exposing email/role/etc.
      const members = [
        { id: 'gm1', user_id: 'u1', group_id: 'g1', total_points: 100 },
        { id: 'gm2', user_id: 'u2', group_id: 'g1', total_points: 80 },
      ];
      const slimProfiles = [
        { id: 'u1', username: 'alice', avatar_url: null },
        { id: 'u2', username: 'bob', avatar_url: null },
      ];
      const membersBuilder = createMockQueryBuilder({ data: members, error: null });
      const profilesBuilder = createMockQueryBuilder({ data: slimProfiles, error: null });
      mockClient.from
        .mockReturnValueOnce(membersBuilder)
        .mockReturnValueOnce(profilesBuilder);

      const result = await service.getGroupMembers('g1');

      expect(mockClient.from).toHaveBeenNthCalledWith(1, 'group_members');
      expect(membersBuilder.select).toHaveBeenCalledWith('*');
      expect(membersBuilder.eq).toHaveBeenCalledWith('group_id', 'g1');
      expect(membersBuilder.order).toHaveBeenCalledWith('total_points', { ascending: false });

      expect(mockClient.from).toHaveBeenNthCalledWith(2, 'member_profiles');
      expect(profilesBuilder.select).toHaveBeenCalledWith('id, username, avatar_url');
      expect(profilesBuilder.in).toHaveBeenCalledWith('id', ['u1', 'u2']);

      expect(result).toEqual([
        { ...members[0], profiles: { username: 'alice', avatar_url: null } },
        { ...members[1], profiles: { username: 'bob', avatar_url: null } },
      ]);
    });

    it('should skip the second query and return [] when the group has no members', async () => {
      const membersBuilder = createMockQueryBuilder({ data: [], error: null });
      mockClient.from.mockReturnValueOnce(membersBuilder);

      const result = await service.getGroupMembers('empty-group');

      expect(result).toEqual([]);
      expect(mockClient.from).toHaveBeenCalledTimes(1);
    });

    it('should attach profiles: null when a member has no matching member_profiles row', async () => {
      const members = [{ id: 'gm1', user_id: 'u1', group_id: 'g1', total_points: 50 }];
      const membersBuilder = createMockQueryBuilder({ data: members, error: null });
      const profilesBuilder = createMockQueryBuilder({ data: [], error: null });
      mockClient.from
        .mockReturnValueOnce(membersBuilder)
        .mockReturnValueOnce(profilesBuilder);

      const result = await service.getGroupMembers('g1');

      expect(result).toEqual([{ ...members[0], profiles: null }]);
    });
  });

  // -----------------------------------------------------------------------
  // Gameweeks
  // -----------------------------------------------------------------------
  describe('getGameweeks', () => {
    it('should return all gameweeks when getGameweeks is called', async () => {
      const gameweeks = [
        { id: 'gw1', gameweek_number: 1, deadline: '2026-01-10T12:00:00Z' },
        { id: 'gw2', gameweek_number: 2, deadline: '2026-01-17T12:00:00Z' },
      ];
      const builder = createMockQueryBuilder({ data: gameweeks, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getGameweeks();

      expect(mockClient.from).toHaveBeenCalledWith('gameweeks');
      expect(builder.select).toHaveBeenCalledWith('*');
      expect(builder.order).toHaveBeenCalledWith('gameweek_number', { ascending: true });
      expect(result).toEqual(gameweeks);
    });
  });

  describe('getActiveGameweek', () => {
    it('should return the active gameweek when getActiveGameweek is called', async () => {
      const activeGw = { id: 'gw2', gameweek_number: 2, is_active: true };
      const builder = createMockQueryBuilder({ data: activeGw, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getActiveGameweek();

      expect(mockClient.from).toHaveBeenCalledWith('gameweeks');
      expect(builder.eq).toHaveBeenCalledWith('is_active', true);
      expect(builder.single).toHaveBeenCalled();
      expect(result).toEqual(activeGw);
    });
  });

  describe('getGameweek', () => {
    it('should return a single gameweek by id when getGameweek is called', async () => {
      const gw = { id: 'gw1', gameweek_number: 1 };
      const builder = createMockQueryBuilder({ data: gw, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getGameweek('gw1');

      expect(mockClient.from).toHaveBeenCalledWith('gameweeks');
      expect(builder.eq).toHaveBeenCalledWith('id', 'gw1');
      expect(builder.single).toHaveBeenCalled();
      expect(result).toEqual(gw);
    });
  });

  // -----------------------------------------------------------------------
  // Matches
  // -----------------------------------------------------------------------
  describe('getMatches', () => {
    it('should return matches for a gameweek when getMatches is called', async () => {
      const matches = [
        { id: 'm1', home_team: 'Arsenal', away_team: 'Chelsea', gameweek: 1 },
        { id: 'm2', home_team: 'Liverpool', away_team: 'Spurs', gameweek: 1 },
      ];
      const builder = createMockQueryBuilder({ data: matches, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getMatches(1);

      expect(mockClient.from).toHaveBeenCalledWith('matches');
      expect(builder.select).toHaveBeenCalledWith('*');
      expect(builder.eq).toHaveBeenCalledWith('gameweek', 1);
      expect(builder.order).toHaveBeenCalledWith('kickoff_time', { ascending: true });
      expect(result).toEqual(matches);
    });
  });

  describe('getMatch', () => {
    it('should return a single match by id when getMatch is called', async () => {
      const match = { id: 'm1', home_team: 'Arsenal', away_team: 'Chelsea' };
      const builder = createMockQueryBuilder({ data: match, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getMatch('m1');

      expect(mockClient.from).toHaveBeenCalledWith('matches');
      expect(builder.eq).toHaveBeenCalledWith('id', 'm1');
      expect(builder.single).toHaveBeenCalled();
      expect(result).toEqual(match);
    });
  });

  // -----------------------------------------------------------------------
  // Predictions
  // -----------------------------------------------------------------------
  describe('getPredictions', () => {
    it('should return predictions for a user and gameweek number when getPredictions is called', async () => {
      const predictions = [
        { id: 'p1', user_id: 'user-1', match_id: 'm1', home_score: 2, away_score: 1, gameweek_number: 1 },
      ];
      const builder = createMockQueryBuilder({ data: predictions, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getPredictions(1);

      expect(mockClient.from).toHaveBeenCalledWith('predictions');
      expect(builder.select).toHaveBeenCalledWith('*');
      expect(builder.eq).toHaveBeenCalledWith('user_id', 'user-1');
      expect(builder.eq).toHaveBeenCalledWith('gameweek_number', 1);
      expect(result).toEqual(predictions);
    });
  });

  describe('submitPredictions', () => {
    it('should upsert predictions without group_id when submitPredictions is called', async () => {
      const input = [
        { match_id: 'm1', home_score: 2, away_score: 1, gameweek_number: 1, gameweek_id: 'gw1' },
        { match_id: 'm2', home_score: 0, away_score: 0, gameweek_number: 1, gameweek_id: 'gw1' },
      ];
      const upserted = input.map((p, i) => ({ id: `p${i}`, user_id: 'user-1', ...p }));
      const builder = createMockQueryBuilder({ data: upserted, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.submitPredictions(input);

      expect(mockClient.from).toHaveBeenCalledWith('predictions');
      expect(builder.upsert).toHaveBeenCalled();
      // Verify no group_id in the upserted data
      const upsertArg = builder.upsert.mock.calls[0][0];
      for (const row of upsertArg) {
        expect(row).not.toHaveProperty('group_id');
        expect(row).toHaveProperty('user_id', 'user-1');
      }
      expect(result).toEqual(upserted);
    });
  });

  describe('getPredictionsWithMatches', () => {
    it('should return predictions joined with matches for a user and gameweek when getPredictionsWithMatches is called', async () => {
      const rows = [
        {
          id: 'p1',
          user_id: 'user-1',
          match_id: 'm1',
          home_score: 2,
          away_score: 1,
          gameweek_number: 5,
          points_earned: 5,
          matches: {
            id: 'm1',
            home_team: 'Arsenal',
            away_team: 'Chelsea',
            kickoff_time: '2025-01-01T15:00:00Z',
            status: 'completed',
            home_score: 2,
            away_score: 1,
            gameweek: 5,
          },
        },
      ];
      const builder = createMockQueryBuilder({ data: rows, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getPredictionsWithMatches(5);

      expect(mockClient.from).toHaveBeenCalledWith('predictions');
      expect(builder.select).toHaveBeenCalledWith('*, matches(*)');
      expect(builder.eq).toHaveBeenCalledWith('user_id', 'user-1');
      expect(builder.eq).toHaveBeenCalledWith('gameweek_number', 5);
      expect(result).toEqual(rows);
    });

    it('should throw a SupabaseError with sanitized userMessage when the Supabase query fails', async () => {
      const rawMsg = 'join failed';
      const builder = createMockQueryBuilder({
        data: null,
        error: { message: rawMsg },
      });
      mockClient.from.mockReturnValueOnce(builder);

      try {
        await service.getPredictionsWithMatches(1);
        fail('expected getPredictionsWithMatches to throw');
      } catch (err) {
        expect(err).toBeInstanceOf(SupabaseError);
        const se = err as SupabaseError;
        expect(se.context).toBe('supabase.getPredictionsWithMatches');
        expect(se.userMessage).toBe('Unable to load predictions');
        expect(se.rawMessage).toBe(rawMsg);
      }
    });

    it('should return an empty array when no predictions exist for the gameweek', async () => {
      const builder = createMockQueryBuilder({ data: null, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getPredictionsWithMatches(99);

      expect(result).toEqual([]);
    });
  });

  describe('getGroupPredictions', () => {
    it('should return group member predictions after deadline when getGroupPredictions is called', async () => {
      const predictions = [
        { id: 'p1', user_id: 'u1', match_id: 'm1', home_score: 2, away_score: 1 },
        { id: 'p2', user_id: 'u2', match_id: 'm1', home_score: 1, away_score: 1 },
      ];

      // 1st call: get group members
      const membersBuilder = createMockQueryBuilder({
        data: [{ user_id: 'u1' }, { user_id: 'u2' }],
        error: null,
      });
      // 2nd call: get gameweek to check deadline
      const gameweekBuilder = createMockQueryBuilder({
        data: { id: 'gw1', gameweek_number: 1, deadline: '2020-01-01T00:00:00Z' }, // past deadline
        error: null,
      });
      // 3rd call: get predictions for those users
      const predBuilder = createMockQueryBuilder({ data: predictions, error: null });

      mockClient.from
        .mockReturnValueOnce(membersBuilder)
        .mockReturnValueOnce(gameweekBuilder)
        .mockReturnValueOnce(predBuilder);

      const result = await service.getGroupPredictions('g1', 1);

      expect(mockClient.from).toHaveBeenCalledWith('group_members');
      expect(mockClient.from).toHaveBeenCalledWith('gameweeks');
      expect(mockClient.from).toHaveBeenCalledWith('predictions');
      expect(result).toEqual(predictions);
    });

    it('should throw when getGroupPredictions is called before deadline', async () => {
      const membersBuilder = createMockQueryBuilder({
        data: [{ user_id: 'u1' }],
        error: null,
      });
      const gameweekBuilder = createMockQueryBuilder({
        data: { id: 'gw1', gameweek_number: 1, deadline: '2099-12-31T23:59:59Z' }, // future deadline
        error: null,
      });

      mockClient.from
        .mockReturnValueOnce(membersBuilder)
        .mockReturnValueOnce(gameweekBuilder);

      await expect(service.getGroupPredictions('g1', 1)).rejects.toThrow(
        'Predictions are not visible until after the deadline'
      );
    });
  });

  describe('getGameweekDeadline', () => {
    // Fixed reference time: 2026-06-15T12:00:00Z
    const NOW = new Date('2026-06-15T12:00:00Z').getTime();

    beforeEach(() => {
      jest.spyOn(Date, 'now').mockReturnValue(NOW);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return deadline and isPast=true when deadline is in the past', async () => {
      const pastDeadline = '2020-01-01T00:00:00Z';
      const builder = createMockQueryBuilder({
        data: { deadline: pastDeadline },
        error: null,
      });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getGameweekDeadline(1);

      expect(result).toEqual({ deadline: pastDeadline, isPast: true });
    });

    it('should return deadline and isPast=false when deadline is in the future', async () => {
      const futureDeadline = '2099-12-31T23:59:59Z';
      const builder = createMockQueryBuilder({
        data: { deadline: futureDeadline },
        error: null,
      });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getGameweekDeadline(2);

      expect(result).toEqual({ deadline: futureDeadline, isPast: false });
    });

    it('should return empty deadline and isPast=false when deadline is null', async () => {
      const builder = createMockQueryBuilder({
        data: { deadline: null },
        error: null,
      });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getGameweekDeadline(3);

      expect(result).toEqual({ deadline: '', isPast: false });
    });

    it('should call logger.warn when deadline is null (fail-open diagnostic)', async () => {
      const builder = createMockQueryBuilder({
        data: { deadline: null },
        error: null,
      });
      mockClient.from.mockReturnValueOnce(builder);

      await service.getGameweekDeadline(5);

      expect(mockLogger.warn).toHaveBeenCalledWith(
        'supabase.getGameweekDeadline: null deadline',
        { gameweekNumber: 5 },
      );
    });

    it('should NOT call logger.warn when deadline is set', async () => {
      const builder = createMockQueryBuilder({
        data: { deadline: '2099-12-31T23:59:59Z' },
        error: null,
      });
      mockClient.from.mockReturnValueOnce(builder);

      await service.getGameweekDeadline(6);

      expect(mockLogger.warn).not.toHaveBeenCalled();
    });

    it('should throw a SupabaseError with sanitized userMessage on DB failure', async () => {
      const rawMsg = 'gameweek not found';
      const builder = createMockQueryBuilder({
        data: null,
        error: { message: rawMsg },
      });
      mockClient.from.mockReturnValueOnce(builder);

      try {
        await service.getGameweekDeadline(99);
        fail('expected getGameweekDeadline to throw');
      } catch (err) {
        expect(err).toBeInstanceOf(SupabaseError);
        const se = err as SupabaseError;
        expect(se.context).toBe('supabase.getGameweekDeadline');
        expect(se.userMessage).toBe('Unable to load deadline');
        expect(se.rawMessage).toBe(rawMsg);
      }
    });

    it('should query gameweeks table, filter by number and use single()', async () => {
      const builder = createMockQueryBuilder({
        data: { deadline: '2026-06-20T10:00:00Z' },
        error: null,
      });
      mockClient.from.mockReturnValueOnce(builder);

      await service.getGameweekDeadline(7);

      expect(mockClient.from).toHaveBeenCalledWith('gameweeks');
      expect(builder.select).toHaveBeenCalledWith('deadline');
      expect(builder.eq).toHaveBeenCalledWith('gameweek_number', 7);
      expect(builder.single).toHaveBeenCalled();
    });
  });

  // -----------------------------------------------------------------------
  // Joker usage
  // -----------------------------------------------------------------------
  describe('getJokerUsage', () => {
    it('should return usedCount=0 and both nulls when user has no group_members rows', async () => {
      const builder = createMockQueryBuilder({ data: [], error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getJokerUsage();

      expect(mockClient.from).toHaveBeenCalledWith('group_members');
      expect(builder.eq).toHaveBeenCalledWith('user_id', 'user-1');
      expect(result).toEqual({
        usedCount: 0,
        firstJokerGameweek: null,
        secondJokerGameweek: null,
      });
    });

    it('should return usedCount=0 when rows exist but jokers_used is 0 across them', async () => {
      const builder = createMockQueryBuilder({
        data: [
          { jokers_used: 0, first_joker_gameweek: null, second_joker_gameweek: null },
          { jokers_used: 0, first_joker_gameweek: null, second_joker_gameweek: null },
        ],
        error: null,
      });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getJokerUsage();

      expect(result).toEqual({
        usedCount: 0,
        firstJokerGameweek: null,
        secondJokerGameweek: null,
      });
    });

    it('should return usedCount=1 with firstJokerGameweek=18 when player has played 1 joker', async () => {
      const builder = createMockQueryBuilder({
        data: [
          { jokers_used: 1, first_joker_gameweek: 18, second_joker_gameweek: null },
          { jokers_used: 1, first_joker_gameweek: 18, second_joker_gameweek: null },
        ],
        error: null,
      });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getJokerUsage();

      expect(result).toEqual({
        usedCount: 1,
        firstJokerGameweek: 18,
        secondJokerGameweek: null,
      });
    });

    it('should return usedCount=2 with both gameweeks when both jokers played', async () => {
      const builder = createMockQueryBuilder({
        data: [
          { jokers_used: 2, first_joker_gameweek: 18, second_joker_gameweek: 37 },
          { jokers_used: 2, first_joker_gameweek: 18, second_joker_gameweek: 37 },
        ],
        error: null,
      });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getJokerUsage();

      expect(result).toEqual({
        usedCount: 2,
        firstJokerGameweek: 18,
        secondJokerGameweek: 37,
      });
    });

    it('should return MAX across rows when values differ (drift scenario)', async () => {
      const builder = createMockQueryBuilder({
        data: [
          { jokers_used: 1, first_joker_gameweek: 18, second_joker_gameweek: null },
          { jokers_used: 2, first_joker_gameweek: 18, second_joker_gameweek: 37 },
          { jokers_used: 0, first_joker_gameweek: null, second_joker_gameweek: null },
        ],
        error: null,
      });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getJokerUsage();

      expect(result).toEqual({
        usedCount: 2,
        firstJokerGameweek: 18,
        secondJokerGameweek: 37,
      });
    });

    it('should throw a SupabaseError with sanitized userMessage on DB failure', async () => {
      const rawMsg = 'permission denied for table group_members';
      const builder = createMockQueryBuilder({
        data: null,
        error: { message: rawMsg },
      });
      mockClient.from.mockReturnValueOnce(builder);

      try {
        await service.getJokerUsage();
        fail('expected getJokerUsage to throw');
      } catch (err) {
        expect(err).toBeInstanceOf(SupabaseError);
        const se = err as SupabaseError;
        expect(se.context).toBe('supabase.getJokerUsage');
        expect(se.userMessage).toBe('Unable to load joker state');
        expect(se.rawMessage).toBe(rawMsg);
      }
    });
  });

  // -----------------------------------------------------------------------
  // Last regular gameweek before special
  // -----------------------------------------------------------------------
  describe('getLastRegularGameweekBeforeSpecial', () => {
    it('should return beforeBoxingDay=18, beforeFinalDay=37 when GW 19 is boxing-day and GW 38 is final-day', async () => {
      const rows: Array<{ gameweek_number: number; is_special: boolean; special_type: string | null }> = [];
      for (let n = 1; n <= 38; n++) {
        if (n === 19) {
          rows.push({ gameweek_number: n, is_special: true, special_type: 'boxing-day' });
        } else if (n === 38) {
          rows.push({ gameweek_number: n, is_special: true, special_type: 'final-day' });
        } else {
          rows.push({ gameweek_number: n, is_special: false, special_type: null });
        }
      }
      const builder = createMockQueryBuilder({ data: rows, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getLastRegularGameweekBeforeSpecial();

      expect(mockClient.from).toHaveBeenCalledWith('gameweeks');
      expect(builder.select).toHaveBeenCalledWith('gameweek_number, is_special, special_type');
      expect(builder.order).toHaveBeenCalledWith('gameweek_number', { ascending: true });
      expect(result).toEqual({ beforeBoxingDay: 18, beforeFinalDay: 37 });
    });

    it('should return beforeBoxingDay=null when Boxing Day is GW 1 (no prior regular)', async () => {
      const rows = [
        { gameweek_number: 1, is_special: true, special_type: 'boxing-day' },
        { gameweek_number: 2, is_special: false, special_type: null },
        { gameweek_number: 3, is_special: false, special_type: null },
        { gameweek_number: 4, is_special: true, special_type: 'final-day' },
      ];
      const builder = createMockQueryBuilder({ data: rows, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getLastRegularGameweekBeforeSpecial();

      expect(result).toEqual({ beforeBoxingDay: null, beforeFinalDay: 3 });
    });

    it('should return both null when no special gameweeks exist', async () => {
      const rows = [
        { gameweek_number: 1, is_special: false, special_type: null },
        { gameweek_number: 2, is_special: false, special_type: null },
        { gameweek_number: 3, is_special: false, special_type: null },
      ];
      const builder = createMockQueryBuilder({ data: rows, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getLastRegularGameweekBeforeSpecial();

      expect(result).toEqual({ beforeBoxingDay: null, beforeFinalDay: null });
    });

    it('should ignore other special_type values if present', async () => {
      const rows = [
        { gameweek_number: 1, is_special: false, special_type: null },
        { gameweek_number: 2, is_special: true, special_type: 'mystery_cup' },
        { gameweek_number: 3, is_special: false, special_type: null },
        { gameweek_number: 4, is_special: true, special_type: 'boxing-day' },
        { gameweek_number: 5, is_special: false, special_type: null },
        { gameweek_number: 6, is_special: true, special_type: 'final-day' },
      ];
      const builder = createMockQueryBuilder({ data: rows, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getLastRegularGameweekBeforeSpecial();

      expect(result).toEqual({ beforeBoxingDay: 3, beforeFinalDay: 5 });
    });

    it('should throw a SupabaseError with sanitized userMessage on DB failure', async () => {
      const rawMsg = 'gameweeks table is unreachable';
      const builder = createMockQueryBuilder({
        data: null,
        error: { message: rawMsg },
      });
      mockClient.from.mockReturnValueOnce(builder);

      try {
        await service.getLastRegularGameweekBeforeSpecial();
        fail('expected getLastRegularGameweekBeforeSpecial to throw');
      } catch (err) {
        expect(err).toBeInstanceOf(SupabaseError);
        const se = err as SupabaseError;
        expect(se.context).toBe('supabase.getLastRegularGameweekBeforeSpecial');
        expect(se.userMessage).toBe('Unable to load gameweeks');
        expect(se.rawMessage).toBe(rawMsg);
      }
    });
  });

  // -----------------------------------------------------------------------
  // markJokerUsed (Task 3.4.4)
  // -----------------------------------------------------------------------
  describe('markJokerUsed', () => {
    // The client now delegates to the atomic `mark_joker_used` Postgres RPC
    // (migration 007). Branch logic (0→1, 1→2, idempotency, >=2 no-op) lives
    // in the function body — tested by the migration itself, not here. These
    // unit tests verify the RPC call shape and error surfacing only.

    beforeEach(() => {
      mockClient.rpc = jest.fn().mockResolvedValue({ data: null, error: null });
    });

    it('invokes the mark_joker_used RPC with the gameweek number as p_gameweek_number', async () => {
      await service.markJokerUsed(18);

      expect(mockClient.rpc).toHaveBeenCalledWith('mark_joker_used', {
        p_gameweek_number: 18,
      });
    });

    it('resolves silently on success (no return value)', async () => {
      await expect(service.markJokerUsed(18)).resolves.toBeUndefined();
    });

    it('throws a SupabaseError with sanitized userMessage when the RPC fails', async () => {
      const rawMsg = 'permission denied for function mark_joker_used';
      mockClient.rpc.mockResolvedValueOnce({
        data: null,
        error: { message: rawMsg },
      });

      try {
        await service.markJokerUsed(10);
        fail('expected markJokerUsed to throw');
      } catch (err) {
        expect(err).toBeInstanceOf(SupabaseError);
        const se = err as SupabaseError;
        expect(se.context).toBe('supabase.markJokerUsed');
        expect(se.userMessage).toBe('Unable to save joker state');
        expect(se.rawMessage).toBe(rawMsg);
      }
    });

    it('does not query group_members directly — authorization is enforced by the RPC under auth.uid()', async () => {
      await service.markJokerUsed(18);

      expect(mockClient.from).not.toHaveBeenCalledWith('group_members');
    });
  });

  // -----------------------------------------------------------------------
  // Leaderboard
  // -----------------------------------------------------------------------
  describe('getLeaderboard', () => {
    it('should query group_members + member_profiles separately and merge them with full tiebreaker ordering when getLeaderboard is called', async () => {
      // Migration 015: the slim member_profiles view replaces the embedded
      // profiles join. Tiebreakers per plan 4.1.3: total_points DESC,
      // correct_scores DESC, correct_results DESC.
      const members = [
        { id: 'gm1', user_id: 'u1', group_id: 'g1', total_points: 120, correct_scores: 8, correct_results: 12 },
        { id: 'gm2', user_id: 'u2', group_id: 'g1', total_points: 95,  correct_scores: 5, correct_results: 10 },
        { id: 'gm3', user_id: 'u3', group_id: 'g1', total_points: 80,  correct_scores: 4, correct_results: 9 },
      ];
      const slimProfiles = [
        { id: 'u1', username: 'alice', avatar_url: null },
        { id: 'u2', username: 'bob', avatar_url: null },
        { id: 'u3', username: 'carol', avatar_url: null },
      ];
      const membersBuilder = createMockQueryBuilder({ data: members, error: null });
      const profilesBuilder = createMockQueryBuilder({ data: slimProfiles, error: null });
      mockClient.from
        .mockReturnValueOnce(membersBuilder)
        .mockReturnValueOnce(profilesBuilder);

      const result = await service.getLeaderboard('g1');

      expect(mockClient.from).toHaveBeenNthCalledWith(1, 'group_members');
      expect(membersBuilder.select).toHaveBeenCalledWith('*');
      expect(membersBuilder.eq).toHaveBeenCalledWith('group_id', 'g1');
      expect(membersBuilder.order).toHaveBeenNthCalledWith(1, 'total_points', { ascending: false });
      expect(membersBuilder.order).toHaveBeenNthCalledWith(2, 'correct_scores', { ascending: false });
      expect(membersBuilder.order).toHaveBeenNthCalledWith(3, 'correct_results', { ascending: false });

      expect(mockClient.from).toHaveBeenNthCalledWith(2, 'member_profiles');
      expect(profilesBuilder.select).toHaveBeenCalledWith('id, username, avatar_url');
      expect(profilesBuilder.in).toHaveBeenCalledWith('id', ['u1', 'u2', 'u3']);

      expect(result).toEqual([
        { ...members[0], profiles: { username: 'alice', avatar_url: null } },
        { ...members[1], profiles: { username: 'bob', avatar_url: null } },
        { ...members[2], profiles: { username: 'carol', avatar_url: null } },
      ]);
    });
  });

  // -----------------------------------------------------------------------
  // Authentication
  // -----------------------------------------------------------------------
  describe('authentication', () => {
    it('should throw Not authenticated when getUser returns null', async () => {
      mockClient.auth.getUser.mockResolvedValueOnce({
        data: { user: null },
        error: null,
      });

      await expect(service.getGroups()).rejects.toThrow('Not authenticated');
    });
  });

  // -----------------------------------------------------------------------
  // Error handling
  // -----------------------------------------------------------------------
  describe('error handling', () => {
    it('should throw a SupabaseError with sanitized userMessage and raw details when a Supabase query fails', async () => {
      const rawMsg = 'relation "groups" does not exist';
      const builder = createMockQueryBuilder({
        data: null,
        error: { message: rawMsg },
      });
      mockClient.from.mockReturnValueOnce(builder);

      await expect(service.getGroup('g1')).rejects.toThrow(SupabaseError);

      // Re-run to inspect error properties
      const builder2 = createMockQueryBuilder({
        data: null,
        error: { message: rawMsg },
      });
      mockClient.from.mockReturnValueOnce(builder2);
      try {
        await service.getGroup('g1');
        fail('expected getGroup to throw');
      } catch (err) {
        expect(err).toBeInstanceOf(SupabaseError);
        const se = err as SupabaseError;
        expect(se.context).toBe('supabase.getGroup');
        expect(se.userMessage).toBe('Unable to load group');
        expect(se.message).toBe('Unable to load group');
        expect(se.rawMessage).toBe(rawMsg);
      }
    });
  });
});

// ---------------------------------------------------------------------------
// Task 4.0.5 — Admin service methods
// ---------------------------------------------------------------------------
describe('SupabaseDataService (Task 4.0.5 — admin methods)', () => {
  let service: SupabaseDataService;
  let mockClient: ReturnType<typeof createMockSupabaseClient>;
  let mockSupabaseService: any;
  let mockLogger: { error: jest.Mock; warn: jest.Mock };

  beforeEach(() => {
    mockClient = createMockSupabaseClient();
    mockSupabaseService = createMockSupabaseService(mockClient);
    mockLogger = { error: jest.fn(), warn: jest.fn() };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        SupabaseDataService,
        { provide: SupabaseService, useValue: mockSupabaseService },
        { provide: LoggerService, useValue: mockLogger },
      ],
    });

    service = TestBed.inject(SupabaseDataService);
  });

  // -----------------------------------------------------------------------
  // getAllUsers
  // -----------------------------------------------------------------------
  describe('getAllUsers', () => {
    it('should query profiles ordered by created_at DESC and return all rows', async () => {
      const users = [
        {
          id: 'u2', email: 'b@x.com', username: 'beta', first_name: 'B', last_name: 'B',
          role: 'player', is_active: true, created_at: '2026-04-02T00:00:00Z',
        },
        {
          id: 'u1', email: 'a@x.com', username: 'alpha', first_name: 'A', last_name: 'A',
          role: 'group_admin', is_active: false, created_at: '2026-04-01T00:00:00Z',
        },
      ];
      const builder = createMockQueryBuilder({ data: users, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getAllUsers();

      expect(mockClient.from).toHaveBeenCalledWith('profiles');
      expect(builder.select).toHaveBeenCalledWith(
        'id, email, username, first_name, last_name, role, is_active, created_at'
      );
      expect(builder.order).toHaveBeenCalledWith('created_at', { ascending: false });
      expect(result).toEqual(users);
    });

    it('should throw a SupabaseError with sanitized userMessage on DB failure', async () => {
      const rawMsg = 'permission denied for table profiles';
      const builder = createMockQueryBuilder({
        data: null,
        error: { message: rawMsg },
      });
      mockClient.from.mockReturnValueOnce(builder);

      try {
        await service.getAllUsers();
        fail('expected getAllUsers to throw');
      } catch (err) {
        expect(err).toBeInstanceOf(SupabaseError);
        const se = err as SupabaseError;
        expect(se.context).toBe('supabase.getAllUsers');
        expect(se.userMessage).toBe('Unable to load users');
        expect(se.rawMessage).toBe(rawMsg);
      }
    });
  });

  // -----------------------------------------------------------------------
  // getAllGroups
  // -----------------------------------------------------------------------
  describe('getAllGroups', () => {
    it('should query groups ordered by created_at DESC and return all rows', async () => {
      const groups = [
        {
          id: 'g2', name: 'Beta', code: 'BBB', admin_id: 'u2',
          current_members: 5, max_members: 10, is_active: true,
          created_at: '2026-04-02T00:00:00Z',
        },
        {
          id: 'g1', name: 'Alpha', code: 'AAA', admin_id: 'u1',
          current_members: 3, max_members: 10, is_active: false,
          created_at: '2026-04-01T00:00:00Z',
        },
      ];
      const builder = createMockQueryBuilder({ data: groups, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getAllGroups();

      expect(mockClient.from).toHaveBeenCalledWith('groups');
      expect(builder.select).toHaveBeenCalledWith(
        'id, name, code, admin_id, current_members, max_members, is_active, created_at'
      );
      expect(builder.order).toHaveBeenCalledWith('created_at', { ascending: false });
      expect(result).toEqual(groups);
    });

    it('should throw a SupabaseError with sanitized userMessage on DB failure', async () => {
      const rawMsg = 'permission denied for table groups';
      const builder = createMockQueryBuilder({
        data: null,
        error: { message: rawMsg },
      });
      mockClient.from.mockReturnValueOnce(builder);

      try {
        await service.getAllGroups();
        fail('expected getAllGroups to throw');
      } catch (err) {
        expect(err).toBeInstanceOf(SupabaseError);
        const se = err as SupabaseError;
        expect(se.context).toBe('supabase.getAllGroups');
        expect(se.userMessage).toBe('Unable to load groups');
        expect(se.rawMessage).toBe(rawMsg);
      }
    });
  });

  // -----------------------------------------------------------------------
  // toggleUserActive
  // -----------------------------------------------------------------------
  describe('toggleUserActive', () => {
    it('should update profiles with is_active=true and filter by id when called with true', async () => {
      const builder = createMockQueryBuilder({ data: null, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      await service.toggleUserActive('user-42', true);

      expect(mockClient.from).toHaveBeenCalledWith('profiles');
      expect(builder.update).toHaveBeenCalledWith({ is_active: true });
      expect(builder.eq).toHaveBeenCalledWith('id', 'user-42');
    });

    it('should update profiles with is_active=false when called with false', async () => {
      const builder = createMockQueryBuilder({ data: null, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      await service.toggleUserActive('user-42', false);

      expect(builder.update).toHaveBeenCalledWith({ is_active: false });
      expect(builder.eq).toHaveBeenCalledWith('id', 'user-42');
    });

    it('should throw a SupabaseError with sanitized userMessage on update failure', async () => {
      const rawMsg = 'permission denied';
      const builder = createMockQueryBuilder({
        data: null,
        error: { message: rawMsg },
      });
      mockClient.from.mockReturnValueOnce(builder);

      try {
        await service.toggleUserActive('user-42', true);
        fail('expected toggleUserActive to throw');
      } catch (err) {
        expect(err).toBeInstanceOf(SupabaseError);
        const se = err as SupabaseError;
        expect(se.context).toBe('supabase.toggleUserActive');
        expect(se.userMessage).toBe('Unable to update user');
        expect(se.rawMessage).toBe(rawMsg);
      }
    });
  });

  // -----------------------------------------------------------------------
  // deleteGroup
  // -----------------------------------------------------------------------
  describe('deleteGroup', () => {
    it('should call delete on groups table filtered by id', async () => {
      const builder = createMockQueryBuilder({ data: null, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      await service.deleteGroup('g-1');

      expect(mockClient.from).toHaveBeenCalledWith('groups');
      expect(builder.delete).toHaveBeenCalled();
      expect(builder.eq).toHaveBeenCalledWith('id', 'g-1');
    });

    it('should throw a SupabaseError with sanitized userMessage on delete failure', async () => {
      const rawMsg = 'foreign key violation';
      const builder = createMockQueryBuilder({
        data: null,
        error: { message: rawMsg },
      });
      mockClient.from.mockReturnValueOnce(builder);

      try {
        await service.deleteGroup('g-1');
        fail('expected deleteGroup to throw');
      } catch (err) {
        expect(err).toBeInstanceOf(SupabaseError);
        const se = err as SupabaseError;
        expect(se.context).toBe('supabase.deleteGroup');
        expect(se.userMessage).toBe('Unable to delete group');
        expect(se.rawMessage).toBe(rawMsg);
      }
    });
  });

  // -----------------------------------------------------------------------
  // getLastMatchSync
  // -----------------------------------------------------------------------
  describe('getLastMatchSync', () => {
    // Fix Date.now to a stable reference point so cooldown math is deterministic
    const NOW = new Date('2026-06-15T12:00:00Z').getTime();

    beforeEach(() => {
      jest.spyOn(Date, 'now').mockReturnValue(NOW);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return cooldownRemainingSeconds=0 when last sync is older than 5 minutes', async () => {
      const tenMinutesAgo = new Date(NOW - 10 * 60 * 1000).toISOString();
      const builder = createMockQueryBuilder({
        data: {
          id: 1,
          last_sync_at: tenMinutesAgo,
          last_sync_status: 'ok',
          last_sync_error: null,
        },
        error: null,
      });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getLastMatchSync();

      expect(mockClient.from).toHaveBeenCalledWith('sync_metadata');
      expect(builder.eq).toHaveBeenCalledWith('id', 1);
      expect(builder.single).toHaveBeenCalled();
      expect(result).toEqual({
        lastSyncAt: tenMinutesAgo,
        lastSyncStatus: 'ok',
        lastSyncError: null,
        cooldownRemainingSeconds: 0,
      });
    });

    it('should return positive cooldownRemainingSeconds when last sync is fresh', async () => {
      // 2 minutes ago → 300 - 120 = 180 seconds remaining
      const twoMinutesAgo = new Date(NOW - 2 * 60 * 1000).toISOString();
      const builder = createMockQueryBuilder({
        data: {
          id: 1,
          last_sync_at: twoMinutesAgo,
          last_sync_status: 'ok',
          last_sync_error: null,
        },
        error: null,
      });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getLastMatchSync();

      expect(result.cooldownRemainingSeconds).toBe(180);
      expect(result.lastSyncAt).toBe(twoMinutesAgo);
      expect(result.lastSyncStatus).toBe('ok');
      expect(result.lastSyncError).toBeNull();
    });

    it('should return zeros/nulls when no row exists', async () => {
      const builder = createMockQueryBuilder({ data: null, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getLastMatchSync();

      expect(result).toEqual({
        lastSyncAt: null,
        lastSyncStatus: null,
        lastSyncError: null,
        cooldownRemainingSeconds: 0,
      });
    });

    it('should throw a SupabaseError with sanitized userMessage on DB failure', async () => {
      const rawMsg = 'sync_metadata not accessible';
      const builder = createMockQueryBuilder({
        data: null,
        error: { message: rawMsg },
      });
      mockClient.from.mockReturnValueOnce(builder);

      try {
        await service.getLastMatchSync();
        fail('expected getLastMatchSync to throw');
      } catch (err) {
        expect(err).toBeInstanceOf(SupabaseError);
        const se = err as SupabaseError;
        expect(se.context).toBe('supabase.getLastMatchSync');
        expect(se.userMessage).toBe('Unable to load sync status');
        expect(se.rawMessage).toBe(rawMsg);
      }
    });
  });

  // -----------------------------------------------------------------------
  // triggerMatchSync
  // -----------------------------------------------------------------------
  describe('triggerMatchSync', () => {
    it('should invoke sync-matches Edge Function with empty body and return payload as-is', async () => {
      const payload = { ok: true, syncedAt: '2026-06-15T12:00:00Z' };
      mockClient.functions.invoke.mockResolvedValueOnce({ data: payload, error: null });

      const result = await service.triggerMatchSync();

      expect(mockClient.functions.invoke).toHaveBeenCalledWith('sync-matches', { body: {} });
      expect(result).toEqual(payload);
    });

    it('should return cooldown payload as-is (cooldown is a normal response, not an error)', async () => {
      const payload = { ok: false, reason: 'cooldown', cooldownRemainingSeconds: 180 };
      mockClient.functions.invoke.mockResolvedValueOnce({ data: payload, error: null });

      const result = await service.triggerMatchSync();

      expect(result).toEqual(payload);
    });

    it('should throw a SupabaseError with sanitized userMessage on unexpected failure', async () => {
      const rawMsg = 'edge function unreachable';
      mockClient.functions.invoke.mockResolvedValueOnce({
        data: null,
        error: { message: rawMsg },
      });

      try {
        await service.triggerMatchSync();
        fail('expected triggerMatchSync to throw');
      } catch (err) {
        expect(err).toBeInstanceOf(SupabaseError);
        const se = err as SupabaseError;
        expect(se.context).toBe('supabase.triggerMatchSync');
        expect(se.userMessage).toBe('Unable to trigger sync');
        expect(se.rawMessage).toBe(rawMsg);
      }
    });
  });

  // -----------------------------------------------------------------------
  // signOutUser
  // -----------------------------------------------------------------------
  describe('signOutUser', () => {
    it('should invoke admin-signout Edge Function with {userId} and return payload', async () => {
      const payload = { ok: true };
      mockClient.functions.invoke.mockResolvedValueOnce({ data: payload, error: null });

      const result = await service.signOutUser('user-42');

      expect(mockClient.functions.invoke).toHaveBeenCalledWith('admin-signout', {
        body: { userId: 'user-42' },
      });
      expect(result).toEqual(payload);
    });

    it('should throw a SupabaseError with sanitized userMessage on unexpected failure', async () => {
      const rawMsg = 'forbidden';
      mockClient.functions.invoke.mockResolvedValueOnce({
        data: null,
        error: { message: rawMsg },
      });

      try {
        await service.signOutUser('user-42');
        fail('expected signOutUser to throw');
      } catch (err) {
        expect(err).toBeInstanceOf(SupabaseError);
        const se = err as SupabaseError;
        expect(se.context).toBe('supabase.signOutUser');
        expect(se.userMessage).toBe('Unable to sign out user');
        expect(se.rawMessage).toBe(rawMsg);
      }
    });
  });
});
