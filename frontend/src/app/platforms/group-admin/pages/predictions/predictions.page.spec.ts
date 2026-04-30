import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { PredictionsPage } from './predictions.page';
import { GroupService } from '@core/services/group.service';
import { SeasonService } from '@core/services/season.service';
import { SupabaseDataService } from '@core/services/supabase-data.service';
import { LoggerService } from '@core/services/logger.service';
import { createMockRouter } from '../../../../../testing/test-utils';

describe('PredictionsPage (Task 3.3.3 — All Predictions tab visibility)', () => {
  let component: PredictionsPage;
  let fixture: ComponentFixture<PredictionsPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockGroupService: any;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;
  let mockToast: { present: jest.Mock };
  let mockToastController: { create: jest.Mock };
  let mockLogger: { error: jest.Mock; warn: jest.Mock };
  let consoleErrorSpy: jest.SpyInstance;

  const makeAdminGroup = (id = 'group-abc') => ({
    id,
    name: 'Admin Group',
    code: 'ADM123',
    admin_id: 'admin-1',
    members: [],
  });

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockGroupService = {
      getAdminGroups: jest.fn().mockResolvedValue([makeAdminGroup()]),
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
      getMatches: jest.fn().mockResolvedValue([]),
      getGameweeks: jest.fn().mockResolvedValue([]),
      getJokerUsage: jest
        .fn()
        .mockResolvedValue({ usedCount: 0, firstJokerGameweek: null, secondJokerGameweek: null }),
      submitPredictions: jest.fn().mockResolvedValue([]),
      markJokerUsed: jest.fn().mockResolvedValue(undefined),
    };

    mockToast = { present: jest.fn().mockResolvedValue(undefined) };
    mockToastController = {
      create: jest.fn().mockResolvedValue(mockToast),
    };

    mockLogger = { error: jest.fn(), warn: jest.fn() };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [PredictionsPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: GroupService, useValue: mockGroupService },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: ToastController, useValue: mockToastController },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictionsPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    if ((component as any).liveScoreUpdateInterval) {
      clearInterval((component as any).liveScoreUpdateInterval);
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getGameweekDeadline with the current gameweek when the admin switches to the "All Predictions" tab and has a selected group', async () => {
    mockSeasonService.getCurrentGameweek.mockReturnValue(7);
    mockGroupService.getAdminGroups.mockResolvedValue([makeAdminGroup('group-abc')]);

    await component.ngOnInit();
    component.selectedTab = 'all';
    await component.tabChanged();

    expect(mockSupabaseDataService.getGameweekDeadline).toHaveBeenCalledWith(7);
  });

  it('should set predictionsLocked=true, leave groupPredictions=[], and NOT call getGroupPredictions when deadline has not passed', async () => {
    mockSupabaseDataService.getGameweekDeadline.mockResolvedValue({
      deadline: '2099-01-01T00:00:00Z',
      isPast: false,
    });

    await component.ngOnInit();
    component.selectedTab = 'all';
    await component.tabChanged();

    expect(component.predictionsLocked).toBe(true);
    expect(component.groupPredictions).toEqual([]);
    expect(mockSupabaseDataService.getGroupPredictions).not.toHaveBeenCalled();
  });

  it('should set predictionsLocked=false, call getGroupPredictions with groupId and gameweek, and populate groupPredictions when deadline has passed', async () => {
    mockSeasonService.getCurrentGameweek.mockReturnValue(7);
    mockGroupService.getAdminGroups.mockResolvedValue([makeAdminGroup('group-abc')]);
    mockSupabaseDataService.getGameweekDeadline.mockResolvedValue({
      deadline: '2020-01-01T00:00:00Z',
      isPast: true,
    });
    const predictionRows = [
      { username: 'alice', gameweek_number: 7, home_score: 2, away_score: 1 },
      { username: 'bob', gameweek_number: 7, home_score: 0, away_score: 0 },
    ];
    mockSupabaseDataService.getGroupPredictions.mockResolvedValue(predictionRows);

    await component.ngOnInit();
    component.selectedTab = 'all';
    await component.tabChanged();

    expect(component.predictionsLocked).toBe(false);
    expect(mockSupabaseDataService.getGroupPredictions).toHaveBeenCalledWith(
      'group-abc',
      7,
    );
    expect(component.groupPredictions).toEqual(predictionRows);
  });

  it('should short-circuit gracefully without calling getGameweekDeadline when the admin has no group', async () => {
    mockGroupService.getAdminGroups.mockResolvedValue([]);

    await component.ngOnInit();
    component.selectedTab = 'all';
    await component.tabChanged();

    expect(mockSupabaseDataService.getGameweekDeadline).not.toHaveBeenCalled();
    expect(mockSupabaseDataService.getGroupPredictions).not.toHaveBeenCalled();
    expect(component.groupPredictions).toEqual([]);
    expect(component.predictionsLocked).toBe(false);
  });

  it('should default predictionsLocked=false, log the error, and not crash when getGameweekDeadline rejects', async () => {
    const err = new Error('DB timeout');
    mockSupabaseDataService.getGameweekDeadline.mockRejectedValue(err);

    await component.ngOnInit();
    component.selectedTab = 'all';
    await expect(component.tabChanged()).resolves.not.toThrow();

    expect(component.predictionsLocked).toBe(false);
    expect(mockSupabaseDataService.getGroupPredictions).not.toHaveBeenCalled();
    expect(mockLogger.error).toHaveBeenCalledWith(
      'group-admin-predictions.loadGameweekDeadline',
      err,
    );
  });

  it('should show an error toast, set groupPredictions=[], and log the error when getGroupPredictions rejects', async () => {
    mockSupabaseDataService.getGameweekDeadline.mockResolvedValue({
      deadline: '2020-01-01T00:00:00Z',
      isPast: true,
    });
    const err = new Error('Network down');
    mockSupabaseDataService.getGroupPredictions.mockRejectedValue(err);

    await component.ngOnInit();
    component.selectedTab = 'all';
    await expect(component.tabChanged()).resolves.not.toThrow();

    expect(component.groupPredictions).toEqual([]);
    expect(mockToastController.create).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Unable to load group predictions',
      }),
    );
    expect(mockToast.present).toHaveBeenCalled();
    expect(mockLogger.error).toHaveBeenCalledWith(
      'group-admin-predictions.loadGroupPredictions',
      err,
    );
  });

  it('should NOT re-trigger loadVisibilityAndPredictions when switching AWAY from the "All Predictions" tab', async () => {
    // First switch to 'all' to establish a baseline
    await component.ngOnInit();
    component.selectedTab = 'all';
    await component.tabChanged();

    const deadlineCallsAfterFirst =
      mockSupabaseDataService.getGameweekDeadline.mock.calls.length;

    // Now switch back to 'my'
    component.selectedTab = 'my';
    await component.tabChanged();

    expect(mockSupabaseDataService.getGameweekDeadline.mock.calls.length).toBe(
      deadlineCallsAfterFirst,
    );
  });

  it('should render the predictions-locked placeholder card when predictionsLocked is true and the "All Predictions" tab is active', async () => {
    mockSupabaseDataService.getGameweekDeadline.mockResolvedValue({
      deadline: '2099-01-01T00:00:00Z',
      isPast: false,
    });

    await component.ngOnInit();
    component.selectedTab = 'all';
    await component.tabChanged();
    fixture.detectChanges();

    const hostEl: HTMLElement = fixture.nativeElement;
    const placeholder = hostEl.querySelector('.predictions-locked-card');
    expect(placeholder).not.toBeNull();
    const message = hostEl.querySelector('.predictions-locked-message');
    expect(message?.textContent).toMatch(
      /Predictions will be visible after the deadline/i,
    );
  });

  it('Task 4.2.4.2 — sets isLoading=true while resolveAdminGroupId is in flight and false after it resolves', async () => {
    let resolveFetch!: (value: any[]) => void;
    mockGroupService.getAdminGroups.mockReturnValue(
      new Promise<any[]>((resolve) => {
        resolveFetch = resolve;
      }),
    );

    const initPromise = component.ngOnInit();

    expect(component.isLoading).toBe(true);

    resolveFetch([]);
    await initPromise;

    expect(component.isLoading).toBe(false);
  });

  it('Task 4.2.4.2 — renders a visible loading spinner while admin groups are being fetched and hides it after', async () => {
    let resolveFetch!: (value: any[]) => void;
    mockGroupService.getAdminGroups.mockReturnValue(
      new Promise<any[]>((resolve) => {
        resolveFetch = resolve;
      }),
    );

    const initPromise = component.ngOnInit();
    fixture.detectChanges();

    const hostEl: HTMLElement = fixture.nativeElement;
    const spinnerDuringLoad = hostEl.querySelector('.loading-state ion-spinner');
    expect(spinnerDuringLoad).not.toBeNull();

    resolveFetch([]);
    await initPromise;
    fixture.detectChanges();

    const spinnerAfterLoad = hostEl.querySelector('.loading-state ion-spinner');
    expect(spinnerAfterLoad).toBeNull();
  });
});

describe('PredictionsPage (Task 4.2.11 — Supabase-backed matches + gameweeks)', () => {
  let component: PredictionsPage;
  let fixture: ComponentFixture<PredictionsPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockGroupService: any;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;
  let mockToast: { present: jest.Mock };
  let mockToastController: { create: jest.Mock };
  let mockLogger: { error: jest.Mock; warn: jest.Mock };
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockGroupService = {
      getAdminGroups: jest.fn().mockResolvedValue([
        { id: 'group-abc', name: 'Admin Group', code: 'ADM123', admin_id: 'admin-1', members: [] },
      ]),
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
      getMatches: jest.fn().mockResolvedValue([]),
      getGameweeks: jest.fn().mockResolvedValue([]),
      getJokerUsage: jest
        .fn()
        .mockResolvedValue({ usedCount: 0, firstJokerGameweek: null, secondJokerGameweek: null }),
      submitPredictions: jest.fn().mockResolvedValue([]),
      markJokerUsed: jest.fn().mockResolvedValue(undefined),
    };

    mockToast = { present: jest.fn().mockResolvedValue(undefined) };
    mockToastController = { create: jest.fn().mockResolvedValue(mockToast) };

    mockLogger = { error: jest.fn(), warn: jest.fn() };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [PredictionsPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: GroupService, useValue: mockGroupService },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: ToastController, useValue: mockToastController },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictionsPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    if ((component as any).liveScoreUpdateInterval) {
      clearInterval((component as any).liveScoreUpdateInterval);
    }
  });

  it('loadMatches populates currentMatches from supabaseDataService.getMatches with camelCase mapping and status completed->finished', async () => {
    mockSeasonService.getCurrentGameweek.mockReturnValue(7);
    mockSupabaseDataService.getMatches.mockResolvedValue([
      {
        id: 'm1',
        home_team: 'Arsenal',
        away_team: 'Chelsea',
        kickoff_time: '2024-08-17T14:00:00Z',
        gameweek: 7,
        season_id: 's',
        status: 'completed',
        home_score: 2,
        away_score: 1,
        created_at: 'x',
        updated_at: 'x',
      },
    ]);

    await component.ngOnInit();
    await component.loadMatches();

    expect(mockSupabaseDataService.getMatches).toHaveBeenCalledWith(7);
    expect(component.currentMatches.length).toBe(1);
    expect(component.currentMatches[0].homeTeam).toBe('Arsenal');
    expect(component.currentMatches[0].awayTeam).toBe('Chelsea');
    expect(component.currentMatches[0].kickoff).toBe('2024-08-17T14:00:00Z');
    expect(component.currentMatches[0].homeScore).toBe(2);
    expect(component.currentMatches[0].awayScore).toBe(1);
    expect(component.currentMatches[0].status).toBe('finished');
  });

  it('surfaces a toast and empties currentMatches when getMatches rejects during hydration', async () => {
    const err = new Error('Network down');
    mockSupabaseDataService.getMatches.mockRejectedValueOnce(err);

    // Review-fix for 4.2.11: match fetching moved from loadMatches() into
    // hydrateGameweekView() so that currentGameWeek.matches (template-bound)
    // is populated alongside currentMatches. ngOnInit triggers
    // loadCurrentGameweek → hydrateGameweekView → getMatches → reject here.
    await component.ngOnInit();

    expect(component.currentMatches).toEqual([]);
    expect(mockToastController.create).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Unable to load matches',
      }),
    );
    expect(mockToast.present).toHaveBeenCalled();
    expect(mockLogger.error).toHaveBeenCalledWith(
      'group-admin-predictions.hydrateGameweekView.matches',
      err,
    );
  });

  it('historicalGameweeks is derived from getGameweeks filtered by is_completed and sorted descending', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      { id: 'g1', gameweek_number: 1, is_completed: true },
      { id: 'g2', gameweek_number: 2, is_completed: false },
      { id: 'g3', gameweek_number: 3, is_completed: true },
      { id: 'g4', gameweek_number: 4, is_completed: false },
      { id: 'g5', gameweek_number: 5, is_completed: true },
    ]);

    await component.ngOnInit();
    await component.loadMatches();

    expect(component.historicalGameweeks).toEqual([5, 3, 1]);
  });

  // -------------------------------------------------------------------------
  // Phase 9 — Joker toggle & real Supabase submission
  // -------------------------------------------------------------------------

  describe('Phase 9 — canUseJoker()', () => {
    it('returns true when deadline has not passed, jokers remain, and not a special gameweek', async () => {
      await component.ngOnInit();
      component.predictionsLocked = false;
      component.jokersRemaining = 2;
      component.currentGameWeek = { ...component.currentGameWeek, isSpecial: false };
      expect(component.canUseJoker()).toBe(true);
    });

    it('returns false on a special gameweek', async () => {
      await component.ngOnInit();
      component.predictionsLocked = false;
      component.jokersRemaining = 2;
      component.currentGameWeek = { ...component.currentGameWeek, isSpecial: true };
      expect(component.canUseJoker()).toBe(false);
    });

    it('returns false when jokersRemaining is 0', async () => {
      await component.ngOnInit();
      component.predictionsLocked = false;
      component.jokersRemaining = 0;
      component.currentGameWeek = { ...component.currentGameWeek, isSpecial: false };
      expect(component.canUseJoker()).toBe(false);
    });

    it('returns false when predictionsLocked is true', async () => {
      await component.ngOnInit();
      component.predictionsLocked = true;
      component.jokersRemaining = 2;
      component.currentGameWeek = { ...component.currentGameWeek, isSpecial: false };
      expect(component.canUseJoker()).toBe(false);
    });
  });

  describe('Phase 9 — joker state initialised from getJokerUsage()', () => {
    it('sets jokersRemaining=2 when usedCount=0', async () => {
      mockSupabaseDataService.getJokerUsage.mockResolvedValue({
        usedCount: 0, firstJokerGameweek: null, secondJokerGameweek: null,
      });
      await component.ngOnInit();
      expect(component.jokersRemaining).toBe(2);
    });

    it('sets jokersRemaining=1 when usedCount=1', async () => {
      mockSupabaseDataService.getJokerUsage.mockResolvedValue({
        usedCount: 1, firstJokerGameweek: 5, secondJokerGameweek: null,
      });
      mockSupabaseDataService.getGameweeks.mockResolvedValue([
        { id: 'gw-uuid-7', gameweek_number: 7, deadline: '2099-01-01T00:00:00Z', is_special: false },
      ]);
      await component.ngOnInit();
      expect(component.jokersRemaining).toBe(1);
    });

    it('sets jokersRemaining=2 and does not crash when getJokerUsage rejects', async () => {
      mockSupabaseDataService.getJokerUsage.mockRejectedValue(new Error('DB err'));
      await expect(component.ngOnInit()).resolves.not.toThrow();
      expect(component.jokersRemaining).toBe(2);
    });
  });

  describe('Phase 9 — toMatchViewModel preserves matchUuid', () => {
    it('sets matchUuid from row.id (the UUID string)', async () => {
      const uuid = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
      mockSupabaseDataService.getMatches.mockResolvedValue([
        {
          id: uuid,
          gameweek: 7,
          home_team: 'Arsenal',
          away_team: 'Chelsea',
          kickoff_time: '2024-08-17T14:00:00Z',
          home_score: null,
          away_score: null,
          status: 'scheduled',
          external_id: 123,
        },
      ]);
      mockSupabaseDataService.getGameweeks.mockResolvedValue([
        { id: 'gw-uuid-7', gameweek_number: 7, deadline: '2099-01-01T00:00:00Z', is_special: false },
      ]);
      await component.ngOnInit();
      const match = component.currentGameWeek.matches[0];
      expect((match as any).matchUuid).toBe(uuid);
    });
  });

  describe('Phase 9 — onSubmitPredictions() real Supabase submission', () => {
    const gwUuid = 'gw-uuid-7';
    const matchUuid = 'match-uuid-1';

    beforeEach(async () => {
      mockSupabaseDataService.getGameweeks.mockResolvedValue([
        { id: gwUuid, gameweek_number: 7, deadline: '2099-01-01T00:00:00Z', is_special: false },
      ]);
      mockSupabaseDataService.getMatches.mockResolvedValue([
        {
          id: matchUuid,
          gameweek: 7,
          home_team: 'Arsenal',
          away_team: 'Chelsea',
          kickoff_time: '2024-08-17T14:00:00Z',
          home_score: null,
          away_score: null,
          status: 'scheduled',
          external_id: 456,
        },
      ]);
      await component.ngOnInit();
      // Fill in a valid prediction on the first match
      component.currentGameWeek.matches[0].homeScore = 2;
      component.currentGameWeek.matches[0].awayScore = 1;
      component.canSubmit = true;
      component.currentGameweekId = gwUuid;
    });

    it('calls submitPredictions with correct match_id UUID and scores', async () => {
      await component.onSubmitPredictions();
      expect(mockSupabaseDataService.submitPredictions).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            match_id: matchUuid,
            gameweek_id: gwUuid,
            gameweek_number: 7,
            home_score: 2,
            away_score: 1,
            joker_used: false,
          }),
        ]),
      );
    });

    it('sets joker_used:true in the payload when jokerUsedThisGameweek is on', async () => {
      component.jokerUsedThisGameweek = true;
      await component.onSubmitPredictions();
      expect(mockSupabaseDataService.submitPredictions).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ joker_used: true }),
        ]),
      );
    });

    it('calls markJokerUsed when joker is active', async () => {
      component.jokerUsedThisGameweek = true;
      await component.onSubmitPredictions();
      expect(mockSupabaseDataService.markJokerUsed).toHaveBeenCalledWith(7);
    });

    it('does NOT call markJokerUsed when joker is off', async () => {
      component.jokerUsedThisGameweek = false;
      await component.onSubmitPredictions();
      expect(mockSupabaseDataService.markJokerUsed).not.toHaveBeenCalled();
    });

    it('decrements jokersRemaining by 1 after a successful joker submission', async () => {
      component.jokersRemaining = 2;
      component.jokerUsedThisGameweek = true;
      await component.onSubmitPredictions();
      expect(component.jokersRemaining).toBe(1);
    });

    it('double-submit guard: second call while isSubmitting is a no-op', async () => {
      // Simulate in-flight first call
      let resolveFirst!: () => void;
      mockSupabaseDataService.submitPredictions.mockReturnValueOnce(
        new Promise<void>((resolve) => { resolveFirst = resolve; }),
      );
      const first = component.onSubmitPredictions();
      expect(component.isSubmitting).toBe(true);
      // Second call while first is still in flight
      await component.onSubmitPredictions();
      expect(mockSupabaseDataService.submitPredictions).toHaveBeenCalledTimes(1);
      resolveFirst();
      await first;
    });

    it('shows error toast and does NOT crash when submitPredictions rejects', async () => {
      mockSupabaseDataService.submitPredictions.mockRejectedValue(new Error('Network error'));
      await expect(component.onSubmitPredictions()).resolves.not.toThrow();
      expect(mockToastController.create).toHaveBeenCalledWith(
        expect.objectContaining({ color: 'danger' }),
      );
    });

    it('is a no-op when currentGameweekId is null', async () => {
      component.currentGameweekId = null;
      await component.onSubmitPredictions();
      expect(mockSupabaseDataService.submitPredictions).not.toHaveBeenCalled();
    });
  });
});
