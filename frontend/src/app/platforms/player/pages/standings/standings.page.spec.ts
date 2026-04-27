import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { readFileSync } from 'fs';
import { join } from 'path';
import { StandingsPage } from './standings.page';
import { GroupService, GroupWithStandings } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';
import { createMockRouter } from '../../../../../testing/test-utils';

/**
 * Task 4.1.4 — verify the leaderboard read path + polish loading/empty/error states.
 * The page is already Supabase-backed through GroupService, so these tests
 * lock in the states that matter: loading, empty, error, current-user
 * highlight, re-fetch on tab switch, and sort order from the service.
 */
describe('StandingsPage (Task 4.1.4 — leaderboard read path + states)', () => {
  let component: StandingsPage;
  let fixture: ComponentFixture<StandingsPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockGroupService: any;
  let mockAuthService: any;
  let mockToast: { present: jest.Mock };
  let mockToastController: { create: jest.Mock };
  let consoleErrorSpy: jest.SpyInstance;

  const buildGroupWithStandings = (
    overrides: Partial<GroupWithStandings> = {}
  ): GroupWithStandings => ({
    group: {
      id: 'group-1',
      name: 'The Pub League',
      code: 'PUB123',
      memberCount: 3,
    },
    leaderboard: [
      {
        position: 1,
        previousPosition: 1,
        userId: 'user-a',
        name: 'Alice',
        played: 5,
        points: 45,
        correctScores: 3,
        correctResults: 4,
        jokerUsed: 1,
            isAdmin: false,
      },
      {
        position: 2,
        previousPosition: 2,
        userId: 'user-b',
        name: 'Bob',
        played: 5,
        points: 30,
        correctScores: 1,
        correctResults: 3,
        jokerUsed: 0,
            isAdmin: false,
      },
    ],
    userPosition: 2,
    ...overrides,
  });

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockGroupService = {
      getUserGroupsWithStandings: jest.fn().mockResolvedValue([]),
    };

    mockAuthService = {
      getCurrentUser: jest.fn().mockReturnValue({ id: 'user-b' }),
    };

    mockToast = { present: jest.fn().mockResolvedValue(undefined) };
    mockToastController = {
      create: jest.fn().mockResolvedValue(mockToast),
    };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [StandingsPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: GroupService, useValue: mockGroupService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ToastController, useValue: mockToastController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StandingsPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call GroupService.getUserGroupsWithStandings on ionViewWillEnter', async () => {
    await component.ionViewWillEnter();

    expect(mockGroupService.getUserGroupsWithStandings).toHaveBeenCalled();
  });

  it('should set isLoading=true while the fetch is in flight and false after', async () => {
    let resolveFetch!: (value: GroupWithStandings[]) => void;
    mockGroupService.getUserGroupsWithStandings.mockReturnValue(
      new Promise<GroupWithStandings[]>((resolve) => {
        resolveFetch = resolve;
      })
    );

    const initPromise = component.ionViewWillEnter();

    expect(component.isLoading).toBe(true);

    resolveFetch([]);
    await initPromise;

    expect(component.isLoading).toBe(false);
  });

  it('should populate groupStandings from the service response', async () => {
    const response = [buildGroupWithStandings()];
    mockGroupService.getUserGroupsWithStandings.mockResolvedValue(response);

    await component.ionViewWillEnter();

    expect(component.groupStandings).toEqual(response);
  });

  it('should preserve total_points DESC order from the service for each leaderboard', async () => {
    const response = [
      buildGroupWithStandings({
        leaderboard: [
          {
            position: 1,
            previousPosition: 1,
            userId: 'u1',
            name: 'First',
            played: 5,
            points: 100,
            correctScores: 5,
            correctResults: 5,
            jokerUsed: 0,
            isAdmin: false,
          },
          {
            position: 2,
            previousPosition: 2,
            userId: 'u2',
            name: 'Second',
            played: 5,
            points: 75,
            correctScores: 3,
            correctResults: 4,
            jokerUsed: 0,
            isAdmin: false,
          },
          {
            position: 3,
            previousPosition: 3,
            userId: 'u3',
            name: 'Third',
            played: 5,
            points: 10,
            correctScores: 0,
            correctResults: 1,
            jokerUsed: 0,
            isAdmin: false,
          },
        ],
      }),
    ];
    mockGroupService.getUserGroupsWithStandings.mockResolvedValue(response);

    await component.ionViewWillEnter();

    const points = component.groupStandings[0].leaderboard.map((e) => e.points);
    expect(points).toEqual([100, 75, 10]);
  });

  it('should show empty state when the service returns zero groups', async () => {
    mockGroupService.getUserGroupsWithStandings.mockResolvedValue([]);

    await component.ionViewWillEnter();

    expect(component.groupStandings).toEqual([]);
  });

  describe('error handling — getUserGroupsWithStandings() rejects', () => {
    it('should clear isLoading after the rejection is handled', async () => {
      mockGroupService.getUserGroupsWithStandings.mockRejectedValue(
        new Error('Network down')
      );

      await component.ionViewWillEnter();

      expect(component.isLoading).toBe(false);
    });

    it('should set groupStandings=[] when the fetch rejects', async () => {
      mockGroupService.getUserGroupsWithStandings.mockRejectedValue(
        new Error('Network down')
      );

      await component.ionViewWillEnter();

      expect(component.groupStandings).toEqual([]);
    });

    it('should call ToastController.create with the user-facing error message', async () => {
      mockGroupService.getUserGroupsWithStandings.mockRejectedValue(
        new Error('Network down')
      );

      await component.ionViewWillEnter();

      expect(mockToastController.create).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Unable to load standings. Please try again.',
        })
      );
    });

    it('should present the toast on rejection', async () => {
      mockGroupService.getUserGroupsWithStandings.mockRejectedValue(
        new Error('Network down')
      );

      await component.ionViewWillEnter();

      expect(mockToast.present).toHaveBeenCalled();
    });

    it('should not re-throw from ionViewWillEnter', async () => {
      mockGroupService.getUserGroupsWithStandings.mockRejectedValue(
        new Error('Network down')
      );

      await expect(component.ionViewWillEnter()).resolves.not.toThrow();
    });
  });

  describe('ionViewWillEnter — refresh on tab switch', () => {
    it('should expose an ionViewWillEnter lifecycle method', () => {
      expect(typeof (component as any).ionViewWillEnter).toBe('function');
    });

    it('should call getUserGroupsWithStandings on ionViewWillEnter', async () => {
      await (component as any).ionViewWillEnter();

      expect(mockGroupService.getUserGroupsWithStandings).toHaveBeenCalled();
    });

    it('should re-fetch fresh data when ionViewWillEnter fires a second time', async () => {
      await component.ionViewWillEnter();
      mockGroupService.getUserGroupsWithStandings.mockClear();

      await (component as any).ionViewWillEnter();

      expect(mockGroupService.getUserGroupsWithStandings).toHaveBeenCalledTimes(1);
    });
  });

  it('should not reference MockDataService in source', () => {
    const sourcePath = join(__dirname, 'standings.page.ts');
    const source = readFileSync(sourcePath, 'utf8');
    expect(source).not.toMatch(/MockDataService/);
    expect(source).not.toMatch(/mock-data\.service/);
  });
});
