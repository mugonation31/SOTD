import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { readFileSync } from 'fs';
import { join } from 'path';
import { LeaderboardPage } from './leaderboard.page';
import { GroupService } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';
import { createMockRouter } from '../../../../../testing/test-utils';

/**
 * Task 4.1.4 — mirror the player standings polish on the group-admin leaderboard
 * page: loading + empty + error states, current-user (admin) row highlight,
 * re-fetch on tab switch. The page was already Supabase-backed via
 * GroupService.getAdminGroups + getGroupLeaderboard; these specs lock in the
 * states so future refactors don't regress them.
 */
describe('LeaderboardPage (Task 4.1.4 — leaderboard read path + states)', () => {
  let component: LeaderboardPage;
  let fixture: ComponentFixture<LeaderboardPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockGroupService: any;
  let mockAuthService: any;
  let mockToast: { present: jest.Mock };
  let mockToastController: { create: jest.Mock };
  let consoleErrorSpy: jest.SpyInstance;

  const buildAdminGroup = (overrides: Partial<any> = {}) => ({
    id: 'group-1',
    name: 'The Pub League',
    code: 'PUB123',
    admin_id: 'admin-1',
    current_members: 3,
    ...overrides,
  });

  const buildLeaderboardRow = (overrides: Partial<any> = {}) => ({
    user_id: 'user-x',
    total_points: 50,
    correct_scores: 2,
    correct_results: 4,
    games_played: 5,
    jokers_used: 1,
    profiles: {
      username: 'PlayerX',
      avatar_url: null,
    },
    ...overrides,
  });

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockGroupService = {
      getAdminGroups: jest.fn().mockResolvedValue([]),
      getGroupLeaderboard: jest.fn().mockResolvedValue([]),
    };

    mockAuthService = {
      getCurrentUser: jest.fn().mockReturnValue({ id: 'admin-1' }),
    };

    mockToast = { present: jest.fn().mockResolvedValue(undefined) };
    mockToastController = {
      create: jest.fn().mockResolvedValue(mockToast),
    };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [LeaderboardPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: GroupService, useValue: mockGroupService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ToastController, useValue: mockToastController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaderboardPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call GroupService.getAdminGroups on ionViewWillEnter', async () => {
    await component.ionViewWillEnter();

    expect(mockGroupService.getAdminGroups).toHaveBeenCalled();
  });

  it('should call GroupService.getGroupLeaderboard with each admin groupId', async () => {
    const groups = [
      buildAdminGroup({ id: 'group-a' }),
      buildAdminGroup({ id: 'group-b' }),
    ];
    mockGroupService.getAdminGroups.mockResolvedValue(groups);

    await component.ionViewWillEnter();

    expect(mockGroupService.getGroupLeaderboard).toHaveBeenCalledWith('group-a');
    expect(mockGroupService.getGroupLeaderboard).toHaveBeenCalledWith('group-b');
  });

  it('should set isLoading=true while the fetch is in flight and false after', async () => {
    let resolveFetch!: (value: any[]) => void;
    mockGroupService.getAdminGroups.mockReturnValue(
      new Promise<any[]>((resolve) => {
        resolveFetch = resolve;
      })
    );

    const initPromise = component.ionViewWillEnter();

    expect(component.isLoading).toBe(true);

    resolveFetch([]);
    await initPromise;

    expect(component.isLoading).toBe(false);
  });

  it('should populate groupStandings with leaderboard rows mapped from the service response', async () => {
    const group = buildAdminGroup();
    mockGroupService.getAdminGroups.mockResolvedValue([group]);
    mockGroupService.getGroupLeaderboard.mockResolvedValue([
      buildLeaderboardRow({
        user_id: 'user-a',
        total_points: 90,
        correct_scores: 5,
        correct_results: 6,
        games_played: 7,
        profiles: { username: 'Alice', avatar_url: null },
      }),
      buildLeaderboardRow({
        user_id: 'admin-1',
        total_points: 60,
        correct_scores: 3,
        correct_results: 4,
        games_played: 7,
        profiles: { username: 'AdminUser', avatar_url: null },
      }),
    ]);

    await component.ionViewWillEnter();

    expect(component.groupStandings.length).toBe(1);
    expect(component.groupStandings[0].leaderboard.length).toBe(2);
    expect(component.groupStandings[0].leaderboard[0]).toEqual(
      expect.objectContaining({
        position: 1,
        userId: 'user-a',
        name: 'Alice',
        points: 90,
        correctScores: 5,
        correctResults: 6,
        played: 7,
      })
    );
  });

  it('should preserve the total_points DESC order from the service response', async () => {
    mockGroupService.getAdminGroups.mockResolvedValue([buildAdminGroup()]);
    mockGroupService.getGroupLeaderboard.mockResolvedValue([
      buildLeaderboardRow({ user_id: 'u1', total_points: 100 }),
      buildLeaderboardRow({ user_id: 'u2', total_points: 50 }),
      buildLeaderboardRow({ user_id: 'u3', total_points: 10 }),
    ]);

    await component.ionViewWillEnter();

    const points = component.groupStandings[0].leaderboard.map((e) => e.points);
    expect(points).toEqual([100, 50, 10]);
  });

  it('should compute adminPosition from the leaderboard', async () => {
    mockGroupService.getAdminGroups.mockResolvedValue([buildAdminGroup()]);
    mockGroupService.getGroupLeaderboard.mockResolvedValue([
      buildLeaderboardRow({ user_id: 'other-1', total_points: 90 }),
      buildLeaderboardRow({ user_id: 'admin-1', total_points: 60 }),
      buildLeaderboardRow({ user_id: 'other-2', total_points: 10 }),
    ]);

    await component.ionViewWillEnter();

    expect(component.groupStandings[0].adminPosition).toBe(2);
  });

  it('should render an empty array when the admin has no groups', async () => {
    mockGroupService.getAdminGroups.mockResolvedValue([]);

    await component.ionViewWillEnter();

    expect(component.groupStandings).toEqual([]);
  });

  it('should still produce a group entry with an empty leaderboard when no members have points', async () => {
    mockGroupService.getAdminGroups.mockResolvedValue([buildAdminGroup()]);
    mockGroupService.getGroupLeaderboard.mockResolvedValue([]);

    await component.ionViewWillEnter();

    expect(component.groupStandings.length).toBe(1);
    expect(component.groupStandings[0].leaderboard).toEqual([]);
    expect(component.groupStandings[0].adminPosition).toBeNull();
  });

  describe('error handling — fetch rejects', () => {
    it('should clear isLoading after rejection of getAdminGroups', async () => {
      mockGroupService.getAdminGroups.mockRejectedValue(new Error('Network down'));

      await component.ionViewWillEnter();

      expect(component.isLoading).toBe(false);
    });

    it('should set groupStandings=[] on rejection', async () => {
      mockGroupService.getAdminGroups.mockRejectedValue(new Error('Network down'));

      await component.ionViewWillEnter();

      expect(component.groupStandings).toEqual([]);
    });

    it('should call ToastController.create with the user-facing error message', async () => {
      mockGroupService.getAdminGroups.mockRejectedValue(new Error('Network down'));

      await component.ionViewWillEnter();

      expect(mockToastController.create).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Unable to load standings. Please try again.',
        })
      );
    });

    it('should present the toast on rejection', async () => {
      mockGroupService.getAdminGroups.mockRejectedValue(new Error('Network down'));

      await component.ionViewWillEnter();

      expect(mockToast.present).toHaveBeenCalled();
    });

    it('should also toast when getGroupLeaderboard rejects', async () => {
      mockGroupService.getAdminGroups.mockResolvedValue([buildAdminGroup()]);
      mockGroupService.getGroupLeaderboard.mockRejectedValue(new Error('Boom'));

      await component.ionViewWillEnter();

      expect(mockToastController.create).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Unable to load standings. Please try again.',
        })
      );
      expect(component.groupStandings).toEqual([]);
      expect(component.isLoading).toBe(false);
    });

    it('should not re-throw from ionViewWillEnter', async () => {
      mockGroupService.getAdminGroups.mockRejectedValue(new Error('Boom'));

      await expect(component.ionViewWillEnter()).resolves.not.toThrow();
    });
  });

  describe('ionViewWillEnter — refresh on tab switch', () => {
    it('should expose an ionViewWillEnter lifecycle method', () => {
      expect(typeof (component as any).ionViewWillEnter).toBe('function');
    });

    it('should call getAdminGroups on ionViewWillEnter', async () => {
      await (component as any).ionViewWillEnter();

      expect(mockGroupService.getAdminGroups).toHaveBeenCalled();
    });

    it('should re-fetch fresh data when ionViewWillEnter fires a second time', async () => {
      await component.ionViewWillEnter();
      mockGroupService.getAdminGroups.mockClear();

      await (component as any).ionViewWillEnter();

      expect(mockGroupService.getAdminGroups).toHaveBeenCalledTimes(1);
    });
  });

  it('should not reference MockDataService in source', () => {
    const sourcePath = join(__dirname, 'leaderboard.page.ts');
    const source = readFileSync(sourcePath, 'utf8');
    expect(source).not.toMatch(/MockDataService/);
    expect(source).not.toMatch(/mock-data\.service/);
  });
});
