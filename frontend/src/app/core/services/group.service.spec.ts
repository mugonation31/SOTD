import { TestBed } from '@angular/core/testing';
import { GroupService } from './group.service';
import { SupabaseDataService } from './supabase-data.service';
import { AuthService } from './auth.service';

describe('GroupService', () => {
  let service: GroupService;
  let mockSupabaseDataService: any;
  let mockAuthService: any;

  beforeEach(() => {
    mockSupabaseDataService = {
      getGroups: jest.fn(),
      getGroup: jest.fn(),
      getGroupByCode: jest.fn(),
      createGroup: jest.fn(),
      joinGroup: jest.fn(),
      getGroupMembers: jest.fn(),
      getLeaderboard: jest.fn(),
    };

    mockAuthService = {
      getCurrentUser: jest.fn().mockReturnValue({ id: 'user-1', email: 'test@test.com', username: 'testuser' }),
      currentUser: { subscribe: jest.fn() },
    };

    TestBed.configureTestingModule({
      providers: [
        GroupService,
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    });

    service = TestBed.inject(GroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call SupabaseDataService.getGroups() when getUserGroups() is called', async () => {
    const mockGroups = [
      { id: 'g1', name: 'Group 1', code: 'ABC123', admin_id: 'user-1', current_members: 3 },
      { id: 'g2', name: 'Group 2', code: 'DEF456', admin_id: 'user-2', current_members: 5 },
    ];
    mockSupabaseDataService.getGroups.mockResolvedValue(mockGroups);

    const result = await service.getUserGroups();

    expect(mockSupabaseDataService.getGroups).toHaveBeenCalled();
    expect(result).toEqual(mockGroups);
  });

  it('should call SupabaseDataService.getGroups() and filter by admin_id when getAdminGroups() is called', async () => {
    const mockGroups = [
      { id: 'g1', name: 'Group 1', code: 'ABC123', admin_id: 'user-1', current_members: 3 },
      { id: 'g2', name: 'Group 2', code: 'DEF456', admin_id: 'user-2', current_members: 5 },
      { id: 'g3', name: 'Group 3', code: 'GHI789', admin_id: 'user-1', current_members: 2 },
    ];
    const mockMembers = [{ user_id: 'user-1', total_points: 10 }];
    mockSupabaseDataService.getGroups.mockResolvedValue(mockGroups);
    mockSupabaseDataService.getGroupMembers.mockResolvedValue(mockMembers);

    const result = await service.getAdminGroups();

    expect(mockSupabaseDataService.getGroups).toHaveBeenCalled();
    expect(mockSupabaseDataService.getGroupMembers).toHaveBeenCalledTimes(2);
    expect(result.length).toBe(2);
    expect(result[0].id).toBe('g1');
    expect(result[0].members).toEqual(mockMembers);
    expect(result[1].id).toBe('g3');
  });

  it('should call SupabaseDataService.createGroup() when createGroup() is called', async () => {
    const input = { name: 'New Group', description: 'A test group' };
    const mockCreated = { id: 'g-new', name: 'New Group', code: 'XYZ999', admin_id: 'user-1', current_members: 1 };
    mockSupabaseDataService.createGroup.mockResolvedValue(mockCreated);

    const result = await service.createGroup(input);

    expect(mockSupabaseDataService.createGroup).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockCreated);
  });

  it('should call SupabaseDataService.joinGroup() when joinGroup() is called', async () => {
    const mockMembership = { group_id: 'g1', user_id: 'user-1', total_points: 0 };
    mockSupabaseDataService.joinGroup.mockResolvedValue(mockMembership);

    const result = await service.joinGroup('ABC123');

    expect(mockSupabaseDataService.joinGroup).toHaveBeenCalledWith('ABC123');
    expect(result).toEqual(mockMembership);
  });

  it('should call SupabaseDataService.getGroupByCode() when findGroupByCode() is called', async () => {
    const mockGroup = { id: 'g1', name: 'Group 1', code: 'ABC123', admin_id: 'user-1', current_members: 3 };
    mockSupabaseDataService.getGroupByCode.mockResolvedValue(mockGroup);

    const result = await service.findGroupByCode('ABC123');

    expect(mockSupabaseDataService.getGroupByCode).toHaveBeenCalledWith('ABC123');
    expect(result).toEqual(mockGroup);
  });

  it('should call SupabaseDataService.getLeaderboard() when getGroupLeaderboard() is called', async () => {
    const mockLeaderboard = [
      { user_id: 'user-1', total_points: 100, profiles: { username: 'alice', avatar_url: null } },
      { user_id: 'user-2', total_points: 80, profiles: { username: 'bob', avatar_url: null } },
    ];
    mockSupabaseDataService.getLeaderboard.mockResolvedValue(mockLeaderboard);

    const result = await service.getGroupLeaderboard('g1');

    expect(mockSupabaseDataService.getLeaderboard).toHaveBeenCalledWith('g1');
    expect(result).toEqual(mockLeaderboard);
  });

  it('should return GroupWithStandings when getUserGroupsWithStandings() is called', async () => {
    const mockGroups = [
      { id: 'g1', name: 'Group 1', code: 'ABC123', admin_id: 'user-1', current_members: 2 },
    ];
    const mockLeaderboard = [
      { user_id: 'user-1', total_points: 100, profiles: { username: 'alice', avatar_url: null } },
      { user_id: 'user-2', total_points: 80, profiles: { username: 'bob', avatar_url: null } },
    ];
    mockSupabaseDataService.getGroups.mockResolvedValue(mockGroups);
    mockSupabaseDataService.getLeaderboard.mockResolvedValue(mockLeaderboard);

    const result = await service.getUserGroupsWithStandings();

    expect(result).toHaveLength(1);
    expect(result[0].group).toEqual({
      id: 'g1',
      name: 'Group 1',
      code: 'ABC123',
      memberCount: 2,
    });
    expect(result[0].leaderboard).toHaveLength(2);
    expect(result[0].leaderboard[0].userId).toBe('user-1');
    expect(result[0].leaderboard[0].name).toBe('alice');
    expect(result[0].leaderboard[0].points).toBe(100);
    expect(result[0].leaderboard[0].position).toBe(1);
    expect(result[0].userPosition).toBe(1);
  });

  it('should return GroupWithStandings for a single group when getGroupWithStandings() is called', async () => {
    const mockGroup = { id: 'g1', name: 'Group 1', code: 'ABC123', admin_id: 'user-1', current_members: 3 };
    const mockLeaderboard = [
      { user_id: 'user-2', total_points: 120, profiles: { username: 'bob', avatar_url: null } },
      { user_id: 'user-1', total_points: 90, profiles: { username: 'alice', avatar_url: null } },
    ];
    mockSupabaseDataService.getGroup.mockResolvedValue(mockGroup);
    mockSupabaseDataService.getLeaderboard.mockResolvedValue(mockLeaderboard);

    const result = await service.getGroupWithStandings('g1');

    expect(result).not.toBeNull();
    expect(result!.group).toEqual({
      id: 'g1',
      name: 'Group 1',
      code: 'ABC123',
      memberCount: 3,
    });
    expect(result!.leaderboard).toHaveLength(2);
    expect(result!.userPosition).toBe(2);
  });

  it('should return empty array when getUserGroups() fails', async () => {
    mockSupabaseDataService.getGroups.mockRejectedValue(new Error('Network error'));

    const result = await service.getUserGroups();

    expect(result).toEqual([]);
  });

  it('should propagate error when createGroup() fails', async () => {
    mockSupabaseDataService.createGroup.mockRejectedValue(new Error('DB error'));

    await expect(service.createGroup({ name: 'Fail Group' })).rejects.toThrow('DB error');
  });

  it('should propagate error when joinGroup() fails', async () => {
    mockSupabaseDataService.joinGroup.mockRejectedValue(new Error('Group not found'));

    await expect(service.joinGroup('BADCODE')).rejects.toThrow('Group not found');
  });

  it('should not contain any localStorage calls', () => {
    const fs = require('fs');
    const source = fs.readFileSync(
      require.resolve('./group.service'),
      'utf-8'
    );
    expect(source).not.toContain('localStorage');
  });
});
