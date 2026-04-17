import { TestBed } from '@angular/core/testing';
import { SupabaseDataService } from './supabase-data.service';
import { SupabaseService } from '../../services/supabase.service';

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
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: { user: { id: 'user-1' } },
        error: null,
      }),
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

  beforeEach(() => {
    mockClient = createMockSupabaseClient();
    mockSupabaseService = createMockSupabaseService(mockClient);

    TestBed.configureTestingModule({
      providers: [
        SupabaseDataService,
        { provide: SupabaseService, useValue: mockSupabaseService },
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
      expect(groupBuilder.insert).toHaveBeenCalled();
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

    it('should throw an error when joining a group with invalid code', async () => {
      const findBuilder = createMockQueryBuilder({
        data: null,
        error: { message: 'No rows found' },
      });
      mockClient.from.mockReturnValueOnce(findBuilder);

      await expect(service.joinGroup('INVALID')).rejects.toThrow('No rows found');
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
    it('should return group members ordered by total_points when getGroupMembers is called', async () => {
      const members = [
        { id: 'gm1', user_id: 'u1', group_id: 'g1', total_points: 100 },
        { id: 'gm2', user_id: 'u2', group_id: 'g1', total_points: 80 },
      ];
      const builder = createMockQueryBuilder({ data: members, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getGroupMembers('g1');

      expect(mockClient.from).toHaveBeenCalledWith('group_members');
      expect(builder.select).toHaveBeenCalledWith('*, profiles(username, avatar_url)');
      expect(builder.eq).toHaveBeenCalledWith('group_id', 'g1');
      expect(builder.order).toHaveBeenCalledWith('total_points', { ascending: false });
      expect(result).toEqual(members);
    });
  });

  // -----------------------------------------------------------------------
  // Gameweeks
  // -----------------------------------------------------------------------
  describe('getGameweeks', () => {
    it('should return all gameweeks when getGameweeks is called', async () => {
      const gameweeks = [
        { id: 'gw1', number: 1, deadline: '2026-01-10T12:00:00Z' },
        { id: 'gw2', number: 2, deadline: '2026-01-17T12:00:00Z' },
      ];
      const builder = createMockQueryBuilder({ data: gameweeks, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getGameweeks();

      expect(mockClient.from).toHaveBeenCalledWith('gameweeks');
      expect(builder.select).toHaveBeenCalledWith('*');
      expect(builder.order).toHaveBeenCalledWith('number', { ascending: true });
      expect(result).toEqual(gameweeks);
    });
  });

  describe('getActiveGameweek', () => {
    it('should return the active gameweek when getActiveGameweek is called', async () => {
      const activeGw = { id: 'gw2', number: 2, is_active: true };
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
      const gw = { id: 'gw1', number: 1 };
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

    it('should throw a meaningful error when the Supabase query fails', async () => {
      const builder = createMockQueryBuilder({
        data: null,
        error: { message: 'join failed' },
      });
      mockClient.from.mockReturnValueOnce(builder);

      await expect(service.getPredictionsWithMatches(1)).rejects.toThrow('join failed');
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
        data: { id: 'gw1', number: 1, deadline: '2020-01-01T00:00:00Z' }, // past deadline
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
        data: { id: 'gw1', number: 1, deadline: '2099-12-31T23:59:59Z' }, // future deadline
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

    it('should throw Error with the Supabase error message on DB failure', async () => {
      const builder = createMockQueryBuilder({
        data: null,
        error: { message: 'gameweek not found' },
      });
      mockClient.from.mockReturnValueOnce(builder);

      await expect(service.getGameweekDeadline(99)).rejects.toThrow(
        'gameweek not found'
      );
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
      expect(builder.eq).toHaveBeenCalledWith('number', 7);
      expect(builder.single).toHaveBeenCalled();
    });
  });

  // -----------------------------------------------------------------------
  // Leaderboard
  // -----------------------------------------------------------------------
  describe('getLeaderboard', () => {
    it('should return group members sorted by total_points descending when getLeaderboard is called', async () => {
      const leaderboard = [
        { id: 'gm1', user_id: 'u1', group_id: 'g1', total_points: 120, profiles: { username: 'alice' } },
        { id: 'gm2', user_id: 'u2', group_id: 'g1', total_points: 95, profiles: { username: 'bob' } },
        { id: 'gm3', user_id: 'u3', group_id: 'g1', total_points: 80, profiles: { username: 'carol' } },
      ];
      const builder = createMockQueryBuilder({ data: leaderboard, error: null });
      mockClient.from.mockReturnValueOnce(builder);

      const result = await service.getLeaderboard('g1');

      expect(mockClient.from).toHaveBeenCalledWith('group_members');
      expect(builder.select).toHaveBeenCalledWith('*, profiles(username, avatar_url)');
      expect(builder.eq).toHaveBeenCalledWith('group_id', 'g1');
      expect(builder.order).toHaveBeenCalledWith('total_points', { ascending: false });
      expect(result).toEqual(leaderboard);
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
    it('should throw a meaningful error when a Supabase query fails', async () => {
      const builder = createMockQueryBuilder({
        data: null,
        error: { message: 'relation "groups" does not exist' },
      });
      mockClient.from.mockReturnValueOnce(builder);

      await expect(service.getGroup('g1')).rejects.toThrow(
        'relation "groups" does not exist'
      );
    });
  });
});
