import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { GroupStandingsPage } from './group-standings.page';
import { GroupService } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';
import { SeasonService } from '@core/services/season.service';
import { SupabaseDataService } from '@core/services/supabase-data.service';
import { createMockRouter } from '../../../../../testing/test-utils';

describe('GroupStandingsPage (Task 3.3.2 — visibility + group predictions)', () => {
  let component: GroupStandingsPage;
  let fixture: ComponentFixture<GroupStandingsPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockGroupService: any;
  let mockAuthService: any;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;
  let mockToast: { present: jest.Mock };
  let mockToastController: { create: jest.Mock };
  let consoleErrorSpy: jest.SpyInstance;

  const mockActivatedRoute = {
    snapshot: { paramMap: { get: (_key: string) => 'group-abc' } },
  };

  const stubGroupWithStandings = {
    group: {
      id: 'group-abc',
      name: 'Test Group',
      code: 'ABC123',
      memberCount: 5,
    },
    leaderboard: [],
    userPosition: null,
  };

  beforeEach(async () => {
    mockRouter = createMockRouter();
    // ion-back-button pulls in NavController which expects router.events.subscribe
    mockRouter.events = { subscribe: jest.fn(), pipe: jest.fn().mockReturnValue({ subscribe: jest.fn() }) } as any;

    mockGroupService = {
      getGroupWithStandings: jest.fn().mockResolvedValue(stubGroupWithStandings),
    };

    mockAuthService = {
      getCurrentUser: jest.fn().mockReturnValue({ id: 'user-1' }),
    };

    mockSeasonService = {
      init: jest.fn().mockResolvedValue(undefined),
      getCurrentGameweek: jest.fn().mockReturnValue(7),
    };

    mockSupabaseDataService = {
      getGameweekDeadline: jest
        .fn()
        .mockResolvedValue({ deadline: '2024-08-17T14:00:00Z', isPast: false }),
      getGroupPredictions: jest.fn().mockResolvedValue([]),
    };

    mockToast = { present: jest.fn().mockResolvedValue(undefined) };
    mockToastController = {
      create: jest.fn().mockResolvedValue(mockToast),
    };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [GroupStandingsPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: GroupService, useValue: mockGroupService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: ToastController, useValue: mockToastController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupStandingsPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should call SupabaseDataService.getGameweekDeadline with the current gameweek number on init', async () => {
    mockSeasonService.getCurrentGameweek.mockReturnValue(7);

    await component.ngOnInit();

    expect(mockSupabaseDataService.getGameweekDeadline).toHaveBeenCalledWith(7);
  });

  it('should set predictionsLocked=true, leave groupPredictions=[], and NOT call getGroupPredictions when deadline has not passed', async () => {
    mockSupabaseDataService.getGameweekDeadline.mockResolvedValue({
      deadline: '2099-01-01T00:00:00Z',
      isPast: false,
    });

    await component.ngOnInit();

    expect(component.predictionsLocked).toBe(true);
    expect(component.groupPredictions).toEqual([]);
    expect(mockSupabaseDataService.getGroupPredictions).not.toHaveBeenCalled();
  });

  it('should set predictionsLocked=false, call getGroupPredictions with groupId and gameweek, and populate groupPredictions when deadline has passed', async () => {
    mockSeasonService.getCurrentGameweek.mockReturnValue(7);
    mockSupabaseDataService.getGameweekDeadline.mockResolvedValue({
      deadline: '2020-01-01T00:00:00Z',
      isPast: true,
    });
    const predictionRows = [
      {
        username: 'alice',
        gameweek_number: 7,
        home_score: 2,
        away_score: 1,
      },
      {
        username: 'bob',
        gameweek_number: 7,
        home_score: 0,
        away_score: 0,
      },
    ];
    mockSupabaseDataService.getGroupPredictions.mockResolvedValue(predictionRows);

    await component.ngOnInit();

    expect(component.predictionsLocked).toBe(false);
    expect(mockSupabaseDataService.getGroupPredictions).toHaveBeenCalledWith(
      'group-abc',
      7,
    );
    expect(component.groupPredictions).toEqual(predictionRows);
  });

  it('should render the predictions-locked placeholder card when predictionsLocked is true', async () => {
    mockSupabaseDataService.getGameweekDeadline.mockResolvedValue({
      deadline: '2099-01-01T00:00:00Z',
      isPast: false,
    });

    await component.ngOnInit();
    fixture.detectChanges();

    const hostEl: HTMLElement = fixture.nativeElement;
    const placeholder = hostEl.querySelector('.predictions-locked-card');
    expect(placeholder).not.toBeNull();
    const message = hostEl.querySelector('.predictions-locked-message');
    expect(message?.textContent).toMatch(/Predictions will be visible after the deadline/i);
  });

  it('should hide the placeholder and render the group predictions list when predictionsLocked is false and predictions are present', async () => {
    mockSupabaseDataService.getGameweekDeadline.mockResolvedValue({
      deadline: '2020-01-01T00:00:00Z',
      isPast: true,
    });
    mockSupabaseDataService.getGroupPredictions.mockResolvedValue([
      { username: 'alice', gameweek_number: 7, home_score: 2, away_score: 1 },
      { username: 'bob', gameweek_number: 7, home_score: 0, away_score: 0 },
    ]);

    await component.ngOnInit();
    fixture.detectChanges();

    const hostEl: HTMLElement = fixture.nativeElement;
    expect(hostEl.querySelector('.predictions-locked-card')).toBeNull();

    const list = hostEl.querySelector('.group-predictions-list');
    expect(list).not.toBeNull();
    const items = hostEl.querySelectorAll('.group-predictions-list ion-item');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toMatch(/alice/);
    expect(items[0].textContent).toMatch(/2\s*:\s*1/);
    expect(items[1].textContent).toMatch(/bob/);
  });

  it('should show the error toast, set groupPredictions=[], log the error, and not crash when getGroupPredictions rejects', async () => {
    mockSupabaseDataService.getGameweekDeadline.mockResolvedValue({
      deadline: '2020-01-01T00:00:00Z',
      isPast: true,
    });
    const err = new Error('Network down');
    mockSupabaseDataService.getGroupPredictions.mockRejectedValue(err);

    await expect(component.ngOnInit()).resolves.not.toThrow();

    expect(component.groupPredictions).toEqual([]);
    expect(mockToastController.create).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Unable to load group predictions',
      }),
    );
    expect(mockToast.present).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should default predictionsLocked=false, log the error, and not crash when getGameweekDeadline rejects', async () => {
    const err = new Error('DB timeout');
    mockSupabaseDataService.getGameweekDeadline.mockRejectedValue(err);

    await expect(component.ngOnInit()).resolves.not.toThrow();

    expect(component.predictionsLocked).toBe(false);
    expect(mockSupabaseDataService.getGroupPredictions).not.toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
