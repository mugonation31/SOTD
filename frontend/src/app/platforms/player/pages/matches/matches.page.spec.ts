import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular/standalone';
import { readFileSync } from 'fs';
import { join } from 'path';
import { MatchesPage } from './matches.page';
import { SeasonService } from '@core/services/season.service';
import { SupabaseDataService } from '@core/services/supabase-data.service';
import { LoggerService } from '@core/services/logger.service';
import { GroupService } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';
import { createMockRouter } from '../../../../../testing/test-utils';

// Stubs for the home-card pipeline injected into MatchesPage. Both
// services are best-effort (matches.page.loadHomeCards swallows errors)
// so the simplest shape that satisfies DI is fine.
const buildGroupServiceStub = () => ({
  getUserGroupsWithStandings: jest.fn().mockResolvedValue([]),
});
const buildAuthServiceStub = () => ({
  getCurrentUser: jest.fn().mockReturnValue(null),
});

describe('MatchesPage (Task 2.2.2 — fetch matches for current gameweek)', () => {
  let component: MatchesPage;
  let fixture: ComponentFixture<MatchesPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;

  const buildSupabaseMatch = (overrides: Partial<any> = {}) => ({
    id: 'match-1',
    home_team: 'Arsenal',
    away_team: 'Chelsea',
    kickoff_time: '2024-08-17T14:00:00Z',
    gameweek: 7,
    season_id: 'season-1',
    status: 'scheduled',
    home_score: null,
    away_score: null,
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
    ...overrides,
  });

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockSeasonService = {
      init: jest.fn().mockResolvedValue(undefined),
      getCurrentGameweek: jest.fn().mockReturnValue(7),
      getTotalGameweeks: jest.fn().mockReturnValue(38),
    };

    mockSupabaseDataService = {
      getMatches: jest.fn().mockResolvedValue([]),
      getActiveGameweek: jest.fn().mockResolvedValue(null),
      getGameweeks: jest.fn().mockResolvedValue([]),
      getPredictions: jest.fn().mockResolvedValue([]),
      getJokerUsage: jest.fn().mockResolvedValue({ usedCount: 0, firstJokerGameweek: null, secondJokerGameweek: null }),
      getLastRegularGameweekBeforeSpecial: jest.fn().mockResolvedValue({ beforeBoxingDay: null, beforeFinalDay: null }),
    };

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: GroupService, useValue: buildGroupServiceStub() },
        { provide: AuthService, useValue: buildAuthServiceStub() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call SeasonService.init() on ngOnInit', async () => {
    await component.ngOnInit();
    expect(mockSeasonService.init).toHaveBeenCalled();
  });

  it('should call SupabaseDataService.getMatches with the current gameweek number', async () => {
    mockSeasonService.getCurrentGameweek.mockReturnValue(7);

    await component.ngOnInit();

    expect(mockSupabaseDataService.getMatches).toHaveBeenCalledWith(7);
  });

  it('should set currentGameweek.number to the SeasonService value after init', async () => {
    mockSeasonService.getCurrentGameweek.mockReturnValue(12);

    await component.ngOnInit();

    expect(component.currentGameweek.number).toBe(12);
  });

  it('should set isLoading = true before the fetch resolves and false after', async () => {
    let resolveFetch!: (value: any[]) => void;
    mockSupabaseDataService.getMatches.mockReturnValue(
      new Promise<any[]>((resolve) => {
        resolveFetch = resolve;
      })
    );

    const initPromise = component.ngOnInit();

    expect(component.isLoading).toBe(true);

    resolveFetch([]);
    await initPromise;

    expect(component.isLoading).toBe(false);
  });

  it('should populate matches view-model from Supabase rows after fetch resolves', async () => {
    const supabaseRows = [
      buildSupabaseMatch({
        id: 'm-1',
        home_team: 'Manchester United',
        away_team: 'Liverpool',
        kickoff_time: '2024-08-17T14:00:00Z',
        status: 'scheduled',
        home_score: null,
        away_score: null,
        gameweek: 7,
      }),
      buildSupabaseMatch({
        id: 'm-2',
        home_team: 'Arsenal',
        away_team: 'Chelsea',
        kickoff_time: '2024-08-17T16:30:00Z',
        status: 'completed',
        home_score: 2,
        away_score: 1,
        gameweek: 7,
      }),
    ];
    mockSupabaseDataService.getMatches.mockResolvedValue(supabaseRows);

    await component.ngOnInit();

    expect(component.matches.length).toBe(2);
    expect(component.matches[0]).toEqual(
      expect.objectContaining({
        id: 'm-1',
        homeTeam: 'Manchester United',
        awayTeam: 'Liverpool',
        kickoff: '2024-08-17T14:00:00Z',
        status: 'scheduled',
        homeScore: null,
        awayScore: null,
        gameweek: 7,
      })
    );
    expect(component.matches[1]).toEqual(
      expect.objectContaining({
        id: 'm-2',
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        kickoff: '2024-08-17T16:30:00Z',
        status: 'completed',
        homeScore: 2,
        awayScore: 1,
        gameweek: 7,
      })
    );
  });

  it('should not reference MockDataService in source', () => {
    const sourcePath = join(__dirname, 'matches.page.ts');
    const source = readFileSync(sourcePath, 'utf8');
    expect(source).not.toMatch(/MockDataService/);
    expect(source).not.toMatch(/mock-data\.service/);
  });
});

describe('MatchesPage (Task 2.2.3 — gameweek prev/next navigation fetches from Supabase)', () => {
  let component: MatchesPage;
  let fixture: ComponentFixture<MatchesPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;

  const buildSupabaseMatch = (overrides: Partial<any> = {}) => ({
    id: 'match-1',
    home_team: 'Arsenal',
    away_team: 'Chelsea',
    kickoff_time: '2024-08-17T14:00:00Z',
    gameweek: 15,
    season_id: 'season-1',
    status: 'scheduled',
    home_score: null,
    away_score: null,
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
    ...overrides,
  });

  /**
   * Drive the component into a state where it has finished its initial load
   * for the supplied gameweek number. Returns once `ngOnInit` resolves so
   * tests can then trigger `navigateGameweek` against a known starting point.
   */
  const initAtGameweek = async (gameweek: number) => {
    mockSeasonService.getCurrentGameweek.mockReturnValue(gameweek);
    mockSupabaseDataService.getMatches.mockResolvedValueOnce([]);
    await component.ngOnInit();
    mockSupabaseDataService.getMatches.mockClear();
  };

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockSeasonService = {
      init: jest.fn().mockResolvedValue(undefined),
      getCurrentGameweek: jest.fn().mockReturnValue(15),
      getTotalGameweeks: jest.fn().mockReturnValue(38),
    };

    mockSupabaseDataService = {
      getMatches: jest.fn().mockResolvedValue([]),
      getActiveGameweek: jest.fn().mockResolvedValue(null),
      getGameweeks: jest.fn().mockResolvedValue([]),
      getPredictions: jest.fn().mockResolvedValue([]),
      getJokerUsage: jest.fn().mockResolvedValue({ usedCount: 0, firstJokerGameweek: null, secondJokerGameweek: null }),
      getLastRegularGameweekBeforeSpecial: jest.fn().mockResolvedValue({ beforeBoxingDay: null, beforeFinalDay: null }),
    };

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: GroupService, useValue: buildGroupServiceStub() },
        { provide: AuthService, useValue: buildAuthServiceStub() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;
  });

  it('should call SupabaseDataService.getMatches(16) when navigating next from gameweek 15', async () => {
    await initAtGameweek(15);
    mockSupabaseDataService.getMatches.mockResolvedValueOnce([]);

    await component.navigateGameweek(1);

    expect(mockSupabaseDataService.getMatches).toHaveBeenCalledWith(16);
  });

  it('should update currentGameweek.number to 16 after navigating next from gameweek 15', async () => {
    await initAtGameweek(15);
    mockSupabaseDataService.getMatches.mockResolvedValueOnce([]);

    await component.navigateGameweek(1);

    expect(component.currentGameweek.number).toBe(16);
  });

  it('should populate matches with the new gameweek rows after navigating next', async () => {
    await initAtGameweek(15);
    mockSupabaseDataService.getMatches.mockResolvedValueOnce([
      buildSupabaseMatch({
        id: 'm-gw16-1',
        home_team: 'Liverpool',
        away_team: 'Spurs',
        gameweek: 16,
      }),
    ]);

    await component.navigateGameweek(1);

    expect(component.matches.length).toBe(1);
    expect(component.matches[0]).toEqual(
      expect.objectContaining({
        id: 'm-gw16-1',
        homeTeam: 'Liverpool',
        awayTeam: 'Spurs',
        gameweek: 16,
      })
    );
  });

  it('should call SupabaseDataService.getMatches(14) when navigating prev from gameweek 15', async () => {
    await initAtGameweek(15);
    mockSupabaseDataService.getMatches.mockResolvedValueOnce([]);

    await component.navigateGameweek(-1);

    expect(mockSupabaseDataService.getMatches).toHaveBeenCalledWith(14);
  });

  it('should NOT call getMatches when navigating prev at gameweek 1 (lower boundary)', async () => {
    await initAtGameweek(1);

    await component.navigateGameweek(-1);

    expect(mockSupabaseDataService.getMatches).not.toHaveBeenCalled();
    expect(component.currentGameweek.number).toBe(1);
  });

  it('should NOT call getMatches when navigating next at the total gameweek (upper boundary)', async () => {
    mockSeasonService.getTotalGameweeks.mockReturnValue(38);
    await initAtGameweek(38);

    await component.navigateGameweek(1);

    expect(mockSupabaseDataService.getMatches).not.toHaveBeenCalled();
    expect(component.currentGameweek.number).toBe(38);
  });

  it('should use SeasonService.getTotalGameweeks() (not hardcoded 38) for the upper boundary', async () => {
    mockSeasonService.getTotalGameweeks.mockReturnValue(20);
    await initAtGameweek(20);

    await component.navigateGameweek(1);

    expect(mockSupabaseDataService.getMatches).not.toHaveBeenCalled();
    expect(component.currentGameweek.number).toBe(20);
  });

  it('should set isLoading=true while the nav fetch is in flight and false after it resolves', async () => {
    await initAtGameweek(15);

    let resolveFetch!: (value: any[]) => void;
    mockSupabaseDataService.getMatches.mockReturnValueOnce(
      new Promise<any[]>((resolve) => {
        resolveFetch = resolve;
      })
    );

    const navPromise = component.navigateGameweek(1);

    expect(component.isLoading).toBe(true);

    resolveFetch([]);
    await navPromise;

    expect(component.isLoading).toBe(false);
  });

  it('should NOT write to localStorage during navigation', async () => {
    await initAtGameweek(15);
    mockSupabaseDataService.getMatches.mockResolvedValueOnce([]);
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    await component.navigateGameweek(1);

    expect(setItemSpy).not.toHaveBeenCalled();

    setItemSpy.mockRestore();
  });
});

describe('MatchesPage (Task 2.2.4 — match status display)', () => {
  let component: MatchesPage;
  let fixture: ComponentFixture<MatchesPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;

  const buildSupabaseMatch = (overrides: Partial<any> = {}) => ({
    id: 'match-1',
    home_team: 'Arsenal',
    away_team: 'Chelsea',
    kickoff_time: '2024-08-17T14:00:00Z',
    gameweek: 7,
    season_id: 'season-1',
    status: 'scheduled',
    home_score: null,
    away_score: null,
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
    ...overrides,
  });

  const makeViewModel = (overrides: Partial<any> = {}) => ({
    id: 'vm-1',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    kickoff: '2024-08-17T14:00:00Z',
    status: 'scheduled' as const,
    homeScore: null,
    awayScore: null,
    gameweek: 7,
    venue: '',
    prediction: { homeScore: null, awayScore: null },
    ...overrides,
  });

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockSeasonService = {
      init: jest.fn().mockResolvedValue(undefined),
      getCurrentGameweek: jest.fn().mockReturnValue(7),
      getTotalGameweeks: jest.fn().mockReturnValue(38),
    };

    mockSupabaseDataService = {
      getMatches: jest.fn().mockResolvedValue([]),
      getActiveGameweek: jest.fn().mockResolvedValue(null),
      getGameweeks: jest.fn().mockResolvedValue([]),
      getPredictions: jest.fn().mockResolvedValue([]),
      getJokerUsage: jest.fn().mockResolvedValue({ usedCount: 0, firstJokerGameweek: null, secondJokerGameweek: null }),
      getLastRegularGameweekBeforeSpecial: jest.fn().mockResolvedValue({ beforeBoxingDay: null, beforeFinalDay: null }),
    };

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: GroupService, useValue: buildGroupServiceStub() },
        { provide: AuthService, useValue: buildAuthServiceStub() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;
  });

  describe('helper methods', () => {
    it('isScheduled() should return true when match.status is "scheduled"', () => {
      const match = makeViewModel({ status: 'scheduled' });
      expect(component.isScheduled(match)).toBe(true);
    });

    it('isScheduled() should return false when match.status is not "scheduled"', () => {
      expect(component.isScheduled(makeViewModel({ status: 'live' }))).toBe(false);
      expect(component.isScheduled(makeViewModel({ status: 'completed' }))).toBe(false);
    });

    it('isLive() should return true when match.status is "live"', () => {
      const match = makeViewModel({ status: 'live' });
      expect(component.isLive(match)).toBe(true);
    });

    it('isLive() should return false when match.status is not "live"', () => {
      expect(component.isLive(makeViewModel({ status: 'scheduled' }))).toBe(false);
      expect(component.isLive(makeViewModel({ status: 'completed' }))).toBe(false);
    });

    it('isCompleted() should return true when match.status is "completed"', () => {
      const match = makeViewModel({ status: 'completed' });
      expect(component.isCompleted(match)).toBe(true);
    });

    it('isCompleted() should return false when match.status is not "completed"', () => {
      expect(component.isCompleted(makeViewModel({ status: 'scheduled' }))).toBe(false);
      expect(component.isCompleted(makeViewModel({ status: 'live' }))).toBe(false);
    });
  });

  describe('template rendering by status', () => {
    it('scheduled match: renders score inputs and shows neither LIVE badge nor final-score block', async () => {
      mockSupabaseDataService.getMatches.mockResolvedValue([
        buildSupabaseMatch({
          id: 'm-sched',
          status: 'scheduled',
          home_score: null,
          away_score: null,
        }),
      ]);

      await component.ngOnInit();
      fixture.detectChanges();

      const root: HTMLElement = fixture.nativeElement;
      const card = root.querySelector('.match-card');
      expect(card).not.toBeNull();
      expect(card!.querySelectorAll('input.score-input').length).toBe(2);
      expect(card!.querySelector('.final-score')).toBeNull();
      expect(card!.querySelector('ion-badge.live-badge')).toBeNull();
    });

    it('completed match: renders final score "homeScore - awayScore" and does NOT render score inputs', async () => {
      mockSupabaseDataService.getMatches.mockResolvedValue([
        buildSupabaseMatch({
          id: 'm-done',
          status: 'completed',
          home_score: 2,
          away_score: 1,
        }),
      ]);

      await component.ngOnInit();
      fixture.detectChanges();

      const root: HTMLElement = fixture.nativeElement;
      const card = root.querySelector('.match-card');
      expect(card).not.toBeNull();

      const finalScore = card!.querySelector('.final-score');
      expect(finalScore).not.toBeNull();
      expect(finalScore!.textContent!.replace(/\s+/g, ' ').trim()).toBe('2 - 1');

      expect(card!.querySelectorAll('input.score-input').length).toBe(0);
    });

    it('live match: renders a LIVE ion-badge and disables the score inputs', async () => {
      mockSupabaseDataService.getMatches.mockResolvedValue([
        buildSupabaseMatch({
          id: 'm-live',
          status: 'live',
          home_score: 1,
          away_score: 0,
        }),
      ]);

      await component.ngOnInit();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const root: HTMLElement = fixture.nativeElement;
      const card = root.querySelector('.match-card');
      expect(card).not.toBeNull();

      const liveBadge = card!.querySelector('ion-badge.live-badge');
      expect(liveBadge).not.toBeNull();
      expect(liveBadge!.textContent!.trim()).toBe('LIVE');

      const inputs = card!.querySelectorAll('input.score-input');
      expect(inputs.length).toBe(2);
      inputs.forEach((input) => {
        expect((input as HTMLInputElement).disabled).toBe(true);
      });
    });
  });
});

describe('MatchesPage (Task 2.2.5 — error handling + empty state)', () => {
  let component: MatchesPage;
  let fixture: ComponentFixture<MatchesPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;
  let mockToast: { present: jest.Mock };
  let mockToastController: { create: jest.Mock };
  let mockLogger: { error: jest.Mock; warn: jest.Mock };
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockSeasonService = {
      init: jest.fn().mockResolvedValue(undefined),
      getCurrentGameweek: jest.fn().mockReturnValue(7),
      getTotalGameweeks: jest.fn().mockReturnValue(38),
    };

    mockSupabaseDataService = {
      getMatches: jest.fn().mockResolvedValue([]),
      getActiveGameweek: jest.fn().mockResolvedValue(null),
      getGameweeks: jest.fn().mockResolvedValue([]),
      getPredictions: jest.fn().mockResolvedValue([]),
      getJokerUsage: jest.fn().mockResolvedValue({ usedCount: 0, firstJokerGameweek: null, secondJokerGameweek: null }),
      getLastRegularGameweekBeforeSpecial: jest.fn().mockResolvedValue({ beforeBoxingDay: null, beforeFinalDay: null }),
    };

    mockToast = { present: jest.fn().mockResolvedValue(undefined) };
    mockToastController = {
      create: jest.fn().mockResolvedValue(mockToast),
    };

    mockLogger = { error: jest.fn(), warn: jest.fn() };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: GroupService, useValue: buildGroupServiceStub() },
        { provide: AuthService, useValue: buildAuthServiceStub() },
        { provide: ToastController, useValue: mockToastController },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('error handling — getMatches() rejects', () => {
    it('should set isLoading=false after the rejection is handled', async () => {
      mockSupabaseDataService.getMatches.mockRejectedValue(
        new Error('Network down')
      );

      await component.ngOnInit();

      expect(component.isLoading).toBe(false);
    });

    it('should set matches=[] when getMatches rejects', async () => {
      mockSupabaseDataService.getMatches.mockRejectedValue(
        new Error('Network down')
      );

      await component.ngOnInit();

      expect(component.matches).toEqual([]);
    });

    it('should call ToastController.create with the user-facing error message', async () => {
      mockSupabaseDataService.getMatches.mockRejectedValue(
        new Error('Network down')
      );

      await component.ngOnInit();

      expect(mockToastController.create).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Unable to load matches. Please try again.',
        })
      );
    });

    it('should present the toast on rejection', async () => {
      mockSupabaseDataService.getMatches.mockRejectedValue(
        new Error('Network down')
      );

      await component.ngOnInit();

      expect(mockToast.present).toHaveBeenCalled();
    });

    it('should log the error via LoggerService and not re-throw', async () => {
      const err = new Error('Network down');
      mockSupabaseDataService.getMatches.mockRejectedValue(err);

      await expect(component.ngOnInit()).resolves.not.toThrow();

      expect(mockLogger.error).toHaveBeenCalledWith('matches.loadMatches', err);
    });
  });

  describe('error handling — getMatches() throws synchronously', () => {
    it('should still clear isLoading and set matches=[] when getMatches throws sync', async () => {
      mockSupabaseDataService.getMatches.mockImplementation(() => {
        throw new Error('Sync boom');
      });

      await expect(component.ngOnInit()).resolves.not.toThrow();

      expect(component.isLoading).toBe(false);
      expect(component.matches).toEqual([]);
      expect(mockToastController.create).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Unable to load matches. Please try again.',
        })
      );
    });
  });

  describe('error handling — navigation also handles errors', () => {
    it('should clear matches and show toast when navigateGameweek fetch rejects', async () => {
      // Initial load OK
      mockSupabaseDataService.getMatches.mockResolvedValueOnce([]);
      mockSeasonService.getCurrentGameweek.mockReturnValue(15);
      await component.ngOnInit();
      mockToastController.create.mockClear();

      // Navigation fails
      mockSupabaseDataService.getMatches.mockRejectedValueOnce(
        new Error('Boom')
      );

      await component.navigateGameweek(1);

      expect(component.isLoading).toBe(false);
      expect(component.matches).toEqual([]);
      expect(mockToastController.create).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Unable to load matches. Please try again.',
        })
      );
    });
  });

  describe('empty state — template rendering', () => {
    it('should render "No fixtures available for this gameweek" when matches is empty', async () => {
      mockSupabaseDataService.getMatches.mockResolvedValue([]);

      await component.ngOnInit();
      fixture.detectChanges();

      const root: HTMLElement = fixture.nativeElement;
      const emptyState = root.querySelector('.empty-state');
      expect(emptyState).not.toBeNull();
      expect(emptyState!.textContent).toContain(
        'No fixtures available for this gameweek'
      );
    });

    it('should NOT render the empty-state message when matches has items', async () => {
      mockSupabaseDataService.getMatches.mockResolvedValue([
        {
          id: 'm-1',
          home_team: 'Arsenal',
          away_team: 'Chelsea',
          kickoff_time: '2024-08-17T14:00:00Z',
          gameweek: 7,
          season_id: 'season-1',
          status: 'scheduled',
          home_score: null,
          away_score: null,
          created_at: '2024-08-01T00:00:00Z',
          updated_at: '2024-08-01T00:00:00Z',
        },
      ]);

      await component.ngOnInit();
      fixture.detectChanges();

      const root: HTMLElement = fixture.nativeElement;
      const emptyState = root.querySelector('.empty-state');
      expect(emptyState).toBeNull();
    });
  });

  describe('empty state — submit button', () => {
    it('canSubmit() should return false when matches is empty', async () => {
      mockSupabaseDataService.getMatches.mockResolvedValue([]);

      await component.ngOnInit();

      expect(component.canSubmit()).toBe(false);
    });

    it('submit button should be disabled in the DOM when matches is empty', async () => {
      mockSupabaseDataService.getMatches.mockResolvedValue([]);

      await component.ngOnInit();
      fixture.detectChanges();

      const root: HTMLElement = fixture.nativeElement;
      const submitBtn = root.querySelector('.submit-button') as HTMLElement & {
        disabled?: boolean;
      };
      expect(submitBtn).not.toBeNull();
      // Ionic ion-button reflects [disabled] as the `disabled` attribute / property
      const disabledAttr = submitBtn.getAttribute('disabled');
      expect(
        disabledAttr === '' ||
          disabledAttr === 'true' ||
          submitBtn.disabled === true
      ).toBe(true);
    });
  });
});

describe('MatchesPage (Task 3.1.2 — gameweek deadline wiring)', () => {
  let component: MatchesPage;
  let fixture: ComponentFixture<MatchesPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;
  let consoleErrorSpy: jest.SpyInstance;

  const buildGameweekRow = (overrides: Partial<any> = {}) => ({
    id: 'gw-id-7',
    gameweek_number: 7,
    deadline: '2024-08-17T11:00:00Z',
    is_special: false,
    special_type: null,
    is_active: true,
    ...overrides,
  });

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockSeasonService = {
      init: jest.fn().mockResolvedValue(undefined),
      getCurrentGameweek: jest.fn().mockReturnValue(7),
      getTotalGameweeks: jest.fn().mockReturnValue(38),
    };

    mockSupabaseDataService = {
      getMatches: jest.fn().mockResolvedValue([]),
      getActiveGameweek: jest.fn().mockResolvedValue(buildGameweekRow()),
      getGameweeks: jest.fn().mockResolvedValue([
        buildGameweekRow({ id: 'gw-id-7', gameweek_number: 7, deadline: '2024-08-17T11:00:00Z' }),
        buildGameweekRow({
          id: 'gw-id-8',
          gameweek_number: 8,
          deadline: '2024-08-24T11:00:00Z',
          is_active: false,
        }),
      ]),
      getPredictions: jest.fn().mockResolvedValue([]),
      getJokerUsage: jest.fn().mockResolvedValue({ usedCount: 0, firstJokerGameweek: null, secondJokerGameweek: null }),
      getLastRegularGameweekBeforeSpecial: jest.fn().mockResolvedValue({ beforeBoxingDay: null, beforeFinalDay: null }),
    };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: GroupService, useValue: buildGroupServiceStub() },
        { provide: AuthService, useValue: buildAuthServiceStub() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should populate currentGameweek.deadline from the current gameweek row', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-09-01T12:30:00Z' }),
    ]);

    await component.ngOnInit();

    expect(mockSupabaseDataService.getGameweeks).toHaveBeenCalled();
    expect(component.currentGameweek.deadline).toBe('2024-09-01T12:30:00Z');
  });

  it('should set currentGameweek.isSpecial from the current gameweek is_special flag', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, is_special: true, special_type: 'boxing-day' }),
    ]);

    await component.ngOnInit();

    expect(component.currentGameweek.isSpecial).toBe(true);
  });

  it('should update currentGameweek.deadline when navigating to the next gameweek', async () => {
    mockSupabaseDataService.getActiveGameweek.mockResolvedValue(
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T11:00:00Z' })
    );
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T11:00:00Z' }),
      buildGameweekRow({
        gameweek_number: 8,
        deadline: '2024-08-24T11:00:00Z',
        is_special: false,
      }),
    ]);

    await component.ngOnInit();
    await component.navigateGameweek(1);

    expect(component.currentGameweek.number).toBe(8);
    expect(component.currentGameweek.deadline).toBe('2024-08-24T11:00:00Z');
  });

  it('should fall back to empty-string deadline when getGameweeks rejects during navigation', async () => {
    await component.ngOnInit();

    // Clear cached gameweeks so navigation re-fetches; rejection should be swallowed.
    (component as any).allGameweeks = null;
    mockSupabaseDataService.getGameweeks.mockRejectedValueOnce(
      new Error('Network down')
    );

    await expect(component.navigateGameweek(1)).resolves.not.toThrow();

    expect(component.currentGameweek.deadline).toBe('');
  });

  it('should default deadline to empty string when current gameweek has no deadline field', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: null }),
    ]);

    await component.ngOnInit();

    expect(component.currentGameweek.deadline).toBe('');
  });
});

describe('MatchesPage (Task 3.1.3 — lock-state logic)', () => {
  let component: MatchesPage;
  let fixture: ComponentFixture<MatchesPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;
  let consoleErrorSpy: jest.SpyInstance;

  const NOW = new Date('2024-08-17T10:00:00Z').getTime();

  const buildGameweekRow = (overrides: Partial<any> = {}) => ({
    id: 'gw-id-7',
    gameweek_number: 7,
    deadline: '2024-08-17T11:00:00Z', // future relative to NOW
    is_special: false,
    special_type: null,
    is_active: true,
    ...overrides,
  });

  const makeViewModel = (overrides: Partial<any> = {}) => ({
    id: 'vm-1',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    kickoff: '2024-08-17T14:00:00Z',
    status: 'scheduled' as const,
    homeScore: null,
    awayScore: null,
    gameweek: 7,
    venue: '',
    prediction: { homeScore: null, awayScore: null },
    ...overrides,
  });

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockSeasonService = {
      init: jest.fn().mockResolvedValue(undefined),
      getCurrentGameweek: jest.fn().mockReturnValue(7),
      getTotalGameweeks: jest.fn().mockReturnValue(38),
    };

    mockSupabaseDataService = {
      getMatches: jest.fn().mockResolvedValue([]),
      getActiveGameweek: jest.fn().mockResolvedValue(buildGameweekRow()),
      getGameweeks: jest.fn().mockResolvedValue([
        buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T11:00:00Z' }),
        buildGameweekRow({
          gameweek_number: 8,
          deadline: '2024-08-24T11:00:00Z',
          is_active: false,
        }),
      ]),
      getPredictions: jest.fn().mockResolvedValue([]),
      getJokerUsage: jest.fn().mockResolvedValue({ usedCount: 0, firstJokerGameweek: null, secondJokerGameweek: null }),
      getLastRegularGameweekBeforeSpecial: jest.fn().mockResolvedValue({ beforeBoxingDay: null, beforeFinalDay: null }),
    };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(Date, 'now').mockReturnValue(NOW);

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: GroupService, useValue: buildGroupServiceStub() },
        { provide: AuthService, useValue: buildAuthServiceStub() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it('isLocked defaults to false before init', () => {
    expect(component.isLocked).toBe(false);
  });

  it('isLocked is false after init with a deadline in the future', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T11:00:00Z' }), // 1 hour in future
    ]);

    await component.ngOnInit();

    expect(component.isLocked).toBe(false);
  });

  it('isLocked is true after init with a deadline in the past', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T09:00:00Z' }), // 1 hour in past
    ]);

    await component.ngOnInit();

    expect(component.isLocked).toBe(true);
  });

  it('isLocked is false after init with an empty deadline (safe default)', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: null }),
    ]);

    await component.ngOnInit();

    expect(component.isLocked).toBe(false);
  });

  it('navigateGameweek to a future-deadline gameweek sets isLocked=false; to a past-deadline gameweek sets isLocked=true', async () => {
    mockSupabaseDataService.getActiveGameweek.mockResolvedValue(
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T11:00:00Z' })
    );
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 6, deadline: '2024-08-10T11:00:00Z' }), // past
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T11:00:00Z' }), // future
      buildGameweekRow({ gameweek_number: 8, deadline: '2024-08-24T11:00:00Z' }), // future
    ]);

    await component.ngOnInit();
    expect(component.isLocked).toBe(false);

    await component.navigateGameweek(1); // -> GW 8, future deadline
    expect(component.isLocked).toBe(false);

    await component.navigateGameweek(-1); // -> GW 7, future
    expect(component.isLocked).toBe(false);

    await component.navigateGameweek(-1); // -> GW 6, past deadline
    expect(component.isLocked).toBe(true);
  });

  it('onDeadlinePassed() sets isLocked=true', () => {
    expect(component.isLocked).toBe(false);

    component.onDeadlinePassed();

    expect(component.isLocked).toBe(true);
  });

  it('canSubmit() returns false when isLocked=true, even if all other conditions pass', async () => {
    // Set up a state where canSubmit would otherwise return true:
    // - matches loaded, 3 predictions selected, not completed, not special.
    mockSupabaseDataService.getMatches.mockResolvedValue([
      {
        id: 'm-1',
        home_team: 'A',
        away_team: 'B',
        kickoff_time: '2024-08-17T14:00:00Z',
        gameweek: 7,
        season_id: 's',
        status: 'scheduled',
        home_score: null,
        away_score: null,
        created_at: '2024-08-01T00:00:00Z',
        updated_at: '2024-08-01T00:00:00Z',
      },
      {
        id: 'm-2',
        home_team: 'C',
        away_team: 'D',
        kickoff_time: '2024-08-17T14:00:00Z',
        gameweek: 7,
        season_id: 's',
        status: 'scheduled',
        home_score: null,
        away_score: null,
        created_at: '2024-08-01T00:00:00Z',
        updated_at: '2024-08-01T00:00:00Z',
      },
      {
        id: 'm-3',
        home_team: 'E',
        away_team: 'F',
        kickoff_time: '2024-08-17T14:00:00Z',
        gameweek: 7,
        season_id: 's',
        status: 'scheduled',
        home_score: null,
        away_score: null,
        created_at: '2024-08-01T00:00:00Z',
        updated_at: '2024-08-01T00:00:00Z',
      },
    ]);
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T11:00:00Z' }), // future
    ]);

    await component.ngOnInit();

    // Fill in 3 valid predictions so selectedPredictionCount === 3
    component.matches.forEach((m) => {
      m.prediction.homeScore = 1;
      m.prediction.awayScore = 0;
    });
    component.updatePredictionCount();

    // Sanity: without lock, canSubmit() is true
    expect(component.canSubmit()).toBe(true);

    // Now lock
    component.onDeadlinePassed();

    expect(component.canSubmit()).toBe(false);
  });

  it('isInputDisabled(match) returns true when isLocked, regardless of match status', () => {
    component.onDeadlinePassed();

    expect(component.isInputDisabled(makeViewModel({ status: 'scheduled' }))).toBe(true);
    expect(component.isInputDisabled(makeViewModel({ status: 'live' }))).toBe(true);
    expect(component.isInputDisabled(makeViewModel({ status: 'completed' }))).toBe(true);
  });

  it('isInputDisabled(match) returns true when match is live (existing behaviour preserved)', () => {
    expect(component.isLocked).toBe(false);

    expect(component.isInputDisabled(makeViewModel({ status: 'live' }))).toBe(true);
  });

  it('isInputDisabled(match) returns false for a scheduled match when not locked', () => {
    expect(component.isLocked).toBe(false);

    expect(component.isInputDisabled(makeViewModel({ status: 'scheduled' }))).toBe(false);
  });
});

describe('MatchesPage (Task 3.1.4 — locked-state UI)', () => {
  let component: MatchesPage;
  let fixture: ComponentFixture<MatchesPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;
  let consoleErrorSpy: jest.SpyInstance;

  const NOW = new Date('2024-08-17T10:00:00Z').getTime();

  const buildGameweekRow = (overrides: Partial<any> = {}) => ({
    id: 'gw-id-7',
    gameweek_number: 7,
    deadline: '2024-08-17T11:00:00Z', // 1h in future relative to NOW
    is_special: false,
    special_type: null,
    is_active: true,
    ...overrides,
  });

  const buildSupabaseMatch = (overrides: Partial<any> = {}) => ({
    id: 'match-1',
    home_team: 'Arsenal',
    away_team: 'Chelsea',
    kickoff_time: '2024-08-17T14:00:00Z',
    gameweek: 7,
    season_id: 'season-1',
    status: 'scheduled',
    home_score: null,
    away_score: null,
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
    ...overrides,
  });

  beforeEach(async () => {
    // Task 4.2.8 — stabilise countdown-driven specs in this block. The
    // `CountdownTimerComponent` under the deadline card starts a 1s
    // setInterval in ngOnInit. Without fake timers that interval keeps
    // firing across test boundaries, which flakes locked-state specs.
    // `now: NOW` keeps the fake clock coherent with the existing
    // `Date.now()` spy below. `doNotFake` preserves microtasks so the
    // `fixture.whenStable()` call inside the disabled-input test does
    // not stall waiting for a never-resolving promise.
    jest.useFakeTimers({
      now: new Date(NOW),
      doNotFake: ['nextTick', 'setImmediate', 'queueMicrotask'],
    });

    mockRouter = createMockRouter();

    mockSeasonService = {
      init: jest.fn().mockResolvedValue(undefined),
      getCurrentGameweek: jest.fn().mockReturnValue(7),
      getTotalGameweeks: jest.fn().mockReturnValue(38),
    };

    mockSupabaseDataService = {
      getMatches: jest.fn().mockResolvedValue([]),
      getActiveGameweek: jest.fn().mockResolvedValue(buildGameweekRow()),
      getGameweeks: jest.fn().mockResolvedValue([buildGameweekRow()]),
      getPredictions: jest.fn().mockResolvedValue([]),
      getJokerUsage: jest.fn().mockResolvedValue({ usedCount: 0, firstJokerGameweek: null, secondJokerGameweek: null }),
      getLastRegularGameweekBeforeSpecial: jest.fn().mockResolvedValue({ beforeBoxingDay: null, beforeFinalDay: null }),
    };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(Date, 'now').mockReturnValue(NOW);

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: GroupService, useValue: buildGroupServiceStub() },
        { provide: AuthService, useValue: buildAuthServiceStub() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.restoreAllMocks();
    // Task 4.2.8 — clear any outstanding fake timers (the countdown
    // component's 1s interval on future-deadline specs where the
    // fixture was never explicitly destroyed) before swapping back to
    // real timers, so they do not bleed into subsequent describes.
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('renders <app-countdown-timer> inside the next-gw tile', async () => {
    // The countdown moved out of the legacy .deadline-card into the
    // .next-gw-tile when the matches page was repurposed as the player
    // home (see mvp-cut Phase 2). The deadline card now only carries the
    // joker section + reset button.
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T11:00:00Z' }),
    ]);

    await component.ngOnInit();
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;
    const tile = compiled.querySelector('ion-card.next-gw-tile');
    expect(tile).not.toBeNull();
    expect(tile!.querySelector('app-countdown-timer')).not.toBeNull();
  });

  it('binds the countdown timer [deadline] to currentGameweek.deadline', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-09-01T12:30:00Z' }),
    ]);

    await component.ngOnInit();
    fixture.detectChanges();

    const timerEl = fixture.debugElement.nativeElement.querySelector(
      'app-countdown-timer'
    );
    expect(timerEl).not.toBeNull();

    // The Angular property binding sets the component @Input, which
    // we can read via the DebugElement's componentInstance.
    const timerDebug = fixture.debugElement.query(
      (de) => de.nativeElement === timerEl
    );
    expect(timerDebug).toBeTruthy();
    expect(timerDebug.componentInstance.deadline).toBe('2024-09-01T12:30:00Z');
  });

  it('does NOT render the lock icon when isLocked is false', async () => {
    mockSupabaseDataService.getActiveGameweek.mockResolvedValue(
      buildGameweekRow({ deadline: '2024-08-17T11:00:00Z' }) // future
    );

    await component.ngOnInit();
    fixture.detectChanges();

    expect(component.isLocked).toBe(false);
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelector('.lock-icon')).toBeNull();
  });

  it('renders the lock icon in the gameweek title when isLocked is true', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T09:00:00Z' }), // past
    ]);

    await component.ngOnInit();
    fixture.detectChanges();

    expect(component.isLocked).toBe(true);
    const compiled: HTMLElement = fixture.nativeElement;
    const title = compiled.querySelector('.gameweek-title');
    expect(title).not.toBeNull();
    const lockIcon = title!.querySelector('.lock-icon');
    expect(lockIcon).not.toBeNull();
  });

  it('does NOT render the "Predictions Locked" banner when isLocked is false', async () => {
    mockSupabaseDataService.getActiveGameweek.mockResolvedValue(
      buildGameweekRow({ deadline: '2024-08-17T11:00:00Z' }) // future
    );

    await component.ngOnInit();
    fixture.detectChanges();

    expect(component.isLocked).toBe(false);
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelector('.locked-banner')).toBeNull();
  });

  it('renders the "Predictions Locked" banner when isLocked is true', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T09:00:00Z' }), // past
    ]);

    await component.ngOnInit();
    fixture.detectChanges();

    expect(component.isLocked).toBe(true);
    const compiled: HTMLElement = fixture.nativeElement;
    const banner = compiled.querySelector('.locked-banner');
    expect(banner).not.toBeNull();
    expect(banner!.textContent).toContain('Predictions Locked');
  });

  it('disables score inputs when isLocked is true (even for a scheduled match)', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T09:00:00Z' }), // past → locked
    ]);
    mockSupabaseDataService.getMatches.mockResolvedValue([
      buildSupabaseMatch({ id: 'm-1', status: 'scheduled' }),
    ]);

    await component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.isLocked).toBe(true);
    const compiled: HTMLElement = fixture.nativeElement;
    const inputs = compiled.querySelectorAll('input.score-input');
    expect(inputs.length).toBe(2);
    inputs.forEach((input) => {
      expect((input as HTMLInputElement).disabled).toBe(true);
    });
  });

  it('hides the RESET ALL button when isLocked is true', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T09:00:00Z' }), // past → locked
    ]);

    await component.ngOnInit();
    fixture.detectChanges();

    expect(component.isLocked).toBe(true);
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelector('.reset-button')).toBeNull();
  });
});

describe('MatchesPage (Task 3.2.1 — submit to Supabase)', () => {
  let component: MatchesPage;
  let fixture: ComponentFixture<MatchesPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;
  let mockToast: { present: jest.Mock };
  let mockToastController: { create: jest.Mock };
  let mockLogger: { error: jest.Mock; warn: jest.Mock };
  let consoleErrorSpy: jest.SpyInstance;

  const NOW = new Date('2024-08-17T10:00:00Z').getTime();

  const buildGameweekRow = (overrides: Partial<any> = {}) => ({
    id: 'gw-id-7',
    gameweek_number: 7,
    deadline: '2024-08-17T11:00:00Z', // future relative to NOW
    is_special: false,
    special_type: null,
    is_active: true,
    ...overrides,
  });

  const buildSupabaseMatch = (overrides: Partial<any> = {}) => ({
    id: 'match-1',
    home_team: 'Arsenal',
    away_team: 'Chelsea',
    kickoff_time: '2024-08-17T14:00:00Z',
    gameweek: 7,
    season_id: 'season-1',
    status: 'scheduled',
    home_score: null,
    away_score: null,
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
    ...overrides,
  });

  /**
   * Drive the component into a fully-initialised state with three scheduled
   * matches for gameweek 7 and a future deadline (unlocked). Returns once
   * ngOnInit resolves so tests can then populate predictions and call
   * onSubmit().
   */
  const initWithThreeMatches = async () => {
    mockSupabaseDataService.getMatches.mockResolvedValue([
      buildSupabaseMatch({ id: 'm-1', home_team: 'A', away_team: 'B' }),
      buildSupabaseMatch({ id: 'm-2', home_team: 'C', away_team: 'D' }),
      buildSupabaseMatch({ id: 'm-3', home_team: 'E', away_team: 'F' }),
    ]);
    await component.ngOnInit();
  };

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockSeasonService = {
      init: jest.fn().mockResolvedValue(undefined),
      getCurrentGameweek: jest.fn().mockReturnValue(7),
      getTotalGameweeks: jest.fn().mockReturnValue(38),
    };

    mockSupabaseDataService = {
      getMatches: jest.fn().mockResolvedValue([]),
      getActiveGameweek: jest.fn().mockResolvedValue(buildGameweekRow()),
      getGameweeks: jest.fn().mockResolvedValue([buildGameweekRow()]),
      submitPredictions: jest.fn().mockResolvedValue([]),
      getPredictions: jest.fn().mockResolvedValue([]),
      getJokerUsage: jest.fn().mockResolvedValue({ usedCount: 0, firstJokerGameweek: null, secondJokerGameweek: null }),
      getLastRegularGameweekBeforeSpecial: jest.fn().mockResolvedValue({ beforeBoxingDay: null, beforeFinalDay: null }),
    };

    mockToast = { present: jest.fn().mockResolvedValue(undefined) };
    mockToastController = {
      create: jest.fn().mockResolvedValue(mockToast),
    };

    mockLogger = { error: jest.fn(), warn: jest.fn() };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(Date, 'now').mockReturnValue(NOW);

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: GroupService, useValue: buildGroupServiceStub() },
        { provide: AuthService, useValue: buildAuthServiceStub() },
        { provide: ToastController, useValue: mockToastController },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it('should populate currentGameweekId from the matching gameweek row after init', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ id: 'gw-uuid-7', gameweek_number: 7 }),
      buildGameweekRow({ id: 'gw-uuid-8', gameweek_number: 8, is_active: false }),
    ]);

    await component.ngOnInit();

    expect((component as any).currentGameweekId).toBe('gw-uuid-7');
  });

  it('onSubmit() calls submitPredictions with rows shaped {match_id, home_score, away_score, gameweek_number, gameweek_id, joker_used:false}', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ id: 'gw-uuid-7', gameweek_number: 7 }),
    ]);
    await initWithThreeMatches();

    component.matches[0].prediction.homeScore = 2;
    component.matches[0].prediction.awayScore = 1;
    component.matches[1].prediction.homeScore = 0;
    component.matches[1].prediction.awayScore = 0;
    component.matches[2].prediction.homeScore = 3;
    component.matches[2].prediction.awayScore = 2;
    component.updatePredictionCount();

    await component.onSubmit();

    expect(mockSupabaseDataService.submitPredictions).toHaveBeenCalledTimes(1);
    const rows = mockSupabaseDataService.submitPredictions.mock.calls[0][0];
    expect(rows).toEqual([
      {
        match_id: 'm-1',
        home_score: 2,
        away_score: 1,
        gameweek_number: 7,
        gameweek_id: 'gw-uuid-7',
        joker_used: false,
      },
      {
        match_id: 'm-2',
        home_score: 0,
        away_score: 0,
        gameweek_number: 7,
        gameweek_id: 'gw-uuid-7',
        joker_used: false,
      },
      {
        match_id: 'm-3',
        home_score: 3,
        away_score: 2,
        gameweek_number: 7,
        gameweek_id: 'gw-uuid-7',
        joker_used: false,
      },
    ]);
  });

  it('onSubmit() only sends rows where BOTH home+away scores are non-null', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ id: 'gw-uuid-7', gameweek_number: 7 }),
    ]);
    await initWithThreeMatches();

    // Only match 1 and 3 fully populated; match 2 has only home score.
    component.matches[0].prediction.homeScore = 1;
    component.matches[0].prediction.awayScore = 0;
    component.matches[1].prediction.homeScore = 2;
    component.matches[1].prediction.awayScore = null;
    component.matches[2].prediction.homeScore = 0;
    component.matches[2].prediction.awayScore = 0;

    await component.onSubmit();

    const rows = mockSupabaseDataService.submitPredictions.mock.calls[0][0];
    expect(rows).toHaveLength(2);
    expect(rows.map((r: any) => r.match_id)).toEqual(['m-1', 'm-3']);
  });

  it('onSubmit() is a no-op when isLocked is true — submitPredictions NOT called', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ id: 'gw-uuid-7', gameweek_number: 7, deadline: '2024-08-17T09:00:00Z' }), // past → locked
    ]);
    await initWithThreeMatches();

    expect(component.isLocked).toBe(true);

    component.matches[0].prediction.homeScore = 1;
    component.matches[0].prediction.awayScore = 0;

    await component.onSubmit();

    expect(mockSupabaseDataService.submitPredictions).not.toHaveBeenCalled();
  });

  it('onSubmit() shows danger toast and does NOT call submitPredictions when currentGameweekId is empty', async () => {
    // getGameweeks returns an empty list → no matching row → currentGameweekId stays empty.
    mockSupabaseDataService.getGameweeks.mockResolvedValue([]);
    await initWithThreeMatches();

    expect((component as any).currentGameweekId).toBe('');

    component.matches[0].prediction.homeScore = 1;
    component.matches[0].prediction.awayScore = 0;
    component.matches[1].prediction.homeScore = 1;
    component.matches[1].prediction.awayScore = 0;
    component.matches[2].prediction.homeScore = 1;
    component.matches[2].prediction.awayScore = 0;

    await component.onSubmit();

    expect(mockSupabaseDataService.submitPredictions).not.toHaveBeenCalled();
    expect(mockToastController.create).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Gameweek not loaded — try again',
        color: 'danger',
      })
    );
  });

  it('on success: predictionsCompleted becomes true and showSuccessToast becomes true', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ id: 'gw-uuid-7', gameweek_number: 7 }),
    ]);
    await initWithThreeMatches();

    component.matches[0].prediction.homeScore = 1;
    component.matches[0].prediction.awayScore = 0;
    component.matches[1].prediction.homeScore = 1;
    component.matches[1].prediction.awayScore = 0;
    component.matches[2].prediction.homeScore = 1;
    component.matches[2].prediction.awayScore = 0;

    expect(component.predictionsCompleted).toBe(false);
    expect(component.showSuccessToast).toBe(false);

    await component.onSubmit();

    expect(component.predictionsCompleted).toBe(true);
    expect(component.showSuccessToast).toBe(true);
  });

  it('on failure: error toast shown, predictionsCompleted stays false, logger.error called', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ id: 'gw-uuid-7', gameweek_number: 7 }),
    ]);
    await initWithThreeMatches();

    const submitErr = new Error('Network down');
    mockSupabaseDataService.submitPredictions.mockRejectedValueOnce(submitErr);

    component.matches[0].prediction.homeScore = 1;
    component.matches[0].prediction.awayScore = 0;
    component.matches[1].prediction.homeScore = 1;
    component.matches[1].prediction.awayScore = 0;
    component.matches[2].prediction.homeScore = 1;
    component.matches[2].prediction.awayScore = 0;

    await expect(component.onSubmit()).resolves.not.toThrow();

    expect(component.predictionsCompleted).toBe(false);
    expect(mockToastController.create).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Unable to save predictions. Please try again.',
        color: 'danger',
      })
    );
    expect(mockLogger.error).toHaveBeenCalledWith(
      'matches.submitPredictions',
      submitErr,
    );
  });

  it('does NOT write to localStorage during submit', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ id: 'gw-uuid-7', gameweek_number: 7 }),
    ]);
    await initWithThreeMatches();

    component.matches[0].prediction.homeScore = 1;
    component.matches[0].prediction.awayScore = 0;
    component.matches[1].prediction.homeScore = 1;
    component.matches[1].prediction.awayScore = 0;
    component.matches[2].prediction.homeScore = 1;
    component.matches[2].prediction.awayScore = 0;

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    await component.onSubmit();

    expect(setItemSpy).not.toHaveBeenCalled();

    setItemSpy.mockRestore();
  });
});

describe('MatchesPage (Task 3.2.2 — pre-fill saved predictions)', () => {
  let component: MatchesPage;
  let fixture: ComponentFixture<MatchesPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;
  let mockToast: { present: jest.Mock };
  let mockToastController: { create: jest.Mock };
  let mockLogger: { error: jest.Mock; warn: jest.Mock };
  let consoleErrorSpy: jest.SpyInstance;

  const NOW = new Date('2024-08-17T10:00:00Z').getTime();

  const buildGameweekRow = (overrides: Partial<any> = {}) => ({
    id: 'gw-id-7',
    gameweek_number: 7,
    deadline: '2024-08-17T11:00:00Z', // future relative to NOW
    is_special: false,
    special_type: null,
    is_active: true,
    ...overrides,
  });

  const buildSupabaseMatch = (overrides: Partial<any> = {}) => ({
    id: 'match-1',
    home_team: 'Arsenal',
    away_team: 'Chelsea',
    kickoff_time: '2024-08-17T14:00:00Z',
    gameweek: 7,
    season_id: 'season-1',
    status: 'scheduled',
    home_score: null,
    away_score: null,
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
    ...overrides,
  });

  const buildPredictionRow = (overrides: Partial<any> = {}) => ({
    id: 'pred-1',
    user_id: 'user-1',
    match_id: 'm-1',
    home_score: 2,
    away_score: 1,
    gameweek_number: 7,
    gameweek_id: 'gw-id-7',
    joker_used: false,
    points_earned: 0,
    created_at: '2024-08-10T00:00:00Z',
    updated_at: '2024-08-10T00:00:00Z',
    ...overrides,
  });

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockSeasonService = {
      init: jest.fn().mockResolvedValue(undefined),
      getCurrentGameweek: jest.fn().mockReturnValue(7),
      getTotalGameweeks: jest.fn().mockReturnValue(38),
    };

    mockSupabaseDataService = {
      getMatches: jest.fn().mockResolvedValue([]),
      getActiveGameweek: jest.fn().mockResolvedValue(buildGameweekRow()),
      getGameweeks: jest.fn().mockResolvedValue([buildGameweekRow()]),
      submitPredictions: jest.fn().mockResolvedValue([]),
      getPredictions: jest.fn().mockResolvedValue([]),
      getJokerUsage: jest.fn().mockResolvedValue({ usedCount: 0, firstJokerGameweek: null, secondJokerGameweek: null }),
      getLastRegularGameweekBeforeSpecial: jest.fn().mockResolvedValue({ beforeBoxingDay: null, beforeFinalDay: null }),
    };

    mockToast = { present: jest.fn().mockResolvedValue(undefined) };
    mockToastController = {
      create: jest.fn().mockResolvedValue(mockToast),
    };

    mockLogger = { error: jest.fn(), warn: jest.fn() };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(Date, 'now').mockReturnValue(NOW);

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: GroupService, useValue: buildGroupServiceStub() },
        { provide: AuthService, useValue: buildAuthServiceStub() },
        { provide: ToastController, useValue: mockToastController },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it('should call getPredictions with the current gameweek number after init', async () => {
    mockSeasonService.getCurrentGameweek.mockReturnValue(7);
    mockSupabaseDataService.getMatches.mockResolvedValue([]);

    await component.ngOnInit();
    await component.ionViewWillEnter();

    expect(mockSupabaseDataService.getPredictions).toHaveBeenCalledWith(7);
  });

  it('should populate matching MatchViewModel prediction scores from saved rows by match_id', async () => {
    mockSupabaseDataService.getMatches.mockResolvedValue([
      buildSupabaseMatch({ id: 'm-1' }),
      buildSupabaseMatch({ id: 'm-2' }),
      buildSupabaseMatch({ id: 'm-3' }),
    ]);
    mockSupabaseDataService.getPredictions.mockResolvedValue([
      buildPredictionRow({ match_id: 'm-1', home_score: 2, away_score: 1 }),
      buildPredictionRow({ match_id: 'm-3', home_score: 0, away_score: 0 }),
    ]);

    await component.ngOnInit();
    await component.ionViewWillEnter();

    const byId = (id: string) => component.matches.find((m) => m.id === id)!;
    expect(byId('m-1').prediction.homeScore).toBe(2);
    expect(byId('m-1').prediction.awayScore).toBe(1);
    expect(byId('m-2').prediction.homeScore).toBeNull();
    expect(byId('m-2').prediction.awayScore).toBeNull();
    expect(byId('m-3').prediction.homeScore).toBe(0);
    expect(byId('m-3').prediction.awayScore).toBe(0);
  });

  it('should ignore prediction rows whose match_id is not in the current gameweek (no crash)', async () => {
    mockSupabaseDataService.getMatches.mockResolvedValue([
      buildSupabaseMatch({ id: 'm-1' }),
    ]);
    mockSupabaseDataService.getPredictions.mockResolvedValue([
      buildPredictionRow({ match_id: 'm-1', home_score: 3, away_score: 3 }),
      buildPredictionRow({ match_id: 'does-not-exist', home_score: 9, away_score: 9 }),
    ]);

    await expect(component.ngOnInit()).resolves.not.toThrow();
    await expect(component.ionViewWillEnter()).resolves.not.toThrow();

    expect(component.matches).toHaveLength(1);
    expect(component.matches[0].prediction.homeScore).toBe(3);
    expect(component.matches[0].prediction.awayScore).toBe(3);
  });

  it('should reflect the hydrated count in selectedPredictionCount (2 rows → 2)', async () => {
    mockSupabaseDataService.getMatches.mockResolvedValue([
      buildSupabaseMatch({ id: 'm-1' }),
      buildSupabaseMatch({ id: 'm-2' }),
      buildSupabaseMatch({ id: 'm-3' }),
    ]);
    mockSupabaseDataService.getPredictions.mockResolvedValue([
      buildPredictionRow({ match_id: 'm-1', home_score: 1, away_score: 0 }),
      buildPredictionRow({ match_id: 'm-2', home_score: 2, away_score: 2 }),
    ]);

    await component.ngOnInit();
    await component.ionViewWillEnter();

    expect(component.selectedPredictionCount).toBe(2);
  });

  it('should set predictionsCompleted=true when hydrated count equals 3 on a regular gameweek', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, is_special: false }),
    ]);
    mockSupabaseDataService.getMatches.mockResolvedValue([
      buildSupabaseMatch({ id: 'm-1' }),
      buildSupabaseMatch({ id: 'm-2' }),
      buildSupabaseMatch({ id: 'm-3' }),
      buildSupabaseMatch({ id: 'm-4' }),
    ]);
    mockSupabaseDataService.getPredictions.mockResolvedValue([
      buildPredictionRow({ match_id: 'm-1', home_score: 1, away_score: 0 }),
      buildPredictionRow({ match_id: 'm-2', home_score: 1, away_score: 0 }),
      buildPredictionRow({ match_id: 'm-3', home_score: 1, away_score: 0 }),
    ]);

    await component.ngOnInit();
    await component.ionViewWillEnter();

    expect(component.predictionsCompleted).toBe(true);
  });

  it('should set predictionsCompleted=false when hydrated count is less than 3 on a regular gameweek', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, is_special: false }),
    ]);
    mockSupabaseDataService.getMatches.mockResolvedValue([
      buildSupabaseMatch({ id: 'm-1' }),
      buildSupabaseMatch({ id: 'm-2' }),
      buildSupabaseMatch({ id: 'm-3' }),
    ]);
    mockSupabaseDataService.getPredictions.mockResolvedValue([
      buildPredictionRow({ match_id: 'm-1', home_score: 1, away_score: 0 }),
      buildPredictionRow({ match_id: 'm-2', home_score: 1, away_score: 0 }),
    ]);

    await component.ngOnInit();
    await component.ionViewWillEnter();

    expect(component.predictionsCompleted).toBe(false);
  });

  it('on a special gameweek with 10 matches, predictionsCompleted=true only when hydrated count=10', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, is_special: true, special_type: 'boxing-day' }),
    ]);
    const matches = Array.from({ length: 10 }, (_, i) =>
      buildSupabaseMatch({ id: `m-${i + 1}` })
    );
    mockSupabaseDataService.getMatches.mockResolvedValue(matches);

    // First assertion: 9 saved predictions → not completed
    mockSupabaseDataService.getPredictions.mockResolvedValueOnce(
      Array.from({ length: 9 }, (_, i) =>
        buildPredictionRow({ match_id: `m-${i + 1}`, home_score: 1, away_score: 0 })
      )
    );
    await component.ngOnInit();
    await component.ionViewWillEnter();
    expect(component.predictionsCompleted).toBe(false);

    // Re-init with 10 saved predictions → completed
    mockSupabaseDataService.getPredictions.mockResolvedValueOnce(
      Array.from({ length: 10 }, (_, i) =>
        buildPredictionRow({ match_id: `m-${i + 1}`, home_score: 1, away_score: 0 })
      )
    );
    // Reset cache so init re-runs cleanly
    (component as any).allGameweeks = null;
    await component.ngOnInit();
    await component.ionViewWillEnter();
    expect(component.predictionsCompleted).toBe(true);
  });

  it('should swallow getPredictions rejection — page still renders, matches load, error logged', async () => {
    mockSupabaseDataService.getMatches.mockResolvedValue([
      buildSupabaseMatch({ id: 'm-1' }),
      buildSupabaseMatch({ id: 'm-2' }),
    ]);
    const hydrateErr = new Error('Network down');
    mockSupabaseDataService.getPredictions.mockRejectedValue(hydrateErr);

    await expect(component.ngOnInit()).resolves.not.toThrow();
    await expect(component.ionViewWillEnter()).resolves.not.toThrow();

    expect(component.matches).toHaveLength(2);
    expect(mockLogger.error).toHaveBeenCalledWith(
      'matches.hydratePredictions',
      hydrateErr,
    );
  });

  it('should call getPredictions(newGameweek) after navigateGameweek(+1)', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T11:00:00Z' }),
      buildGameweekRow({ gameweek_number: 8, deadline: '2024-08-24T11:00:00Z' }),
    ]);
    mockSupabaseDataService.getMatches.mockResolvedValue([]);

    await component.ngOnInit();
    await component.ionViewWillEnter();
    mockSupabaseDataService.getPredictions.mockClear();

    await component.navigateGameweek(1);

    expect(mockSupabaseDataService.getPredictions).toHaveBeenCalledWith(8);
  });

  it('should leave inputs blank (all null) when navigating to a gameweek with zero saved predictions', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T11:00:00Z' }),
      buildGameweekRow({ gameweek_number: 8, deadline: '2024-08-24T11:00:00Z' }),
    ]);
    // Initial load: no matches, no predictions.
    mockSupabaseDataService.getMatches.mockResolvedValueOnce([]);
    mockSupabaseDataService.getPredictions.mockResolvedValueOnce([]);
    await component.ngOnInit();
    await component.ionViewWillEnter();

    // Navigation target: matches exist but NO saved predictions for GW8.
    mockSupabaseDataService.getMatches.mockResolvedValueOnce([
      buildSupabaseMatch({ id: 'm-gw8-1', gameweek: 8 }),
      buildSupabaseMatch({ id: 'm-gw8-2', gameweek: 8 }),
    ]);
    mockSupabaseDataService.getPredictions.mockResolvedValueOnce([]);

    await component.navigateGameweek(1);

    expect(component.matches).toHaveLength(2);
    component.matches.forEach((m) => {
      expect(m.prediction.homeScore).toBeNull();
      expect(m.prediction.awayScore).toBeNull();
    });
    expect(component.selectedPredictionCount).toBe(0);
    expect(component.predictionsCompleted).toBe(false);
  });
});

describe('MatchesPage (Task 3.2.3 — regular vs special gating)', () => {
  let component: MatchesPage;
  let fixture: ComponentFixture<MatchesPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;
  let mockToast: { present: jest.Mock };
  let mockToastController: { create: jest.Mock };
  let consoleErrorSpy: jest.SpyInstance;

  const NOW = new Date('2024-08-17T10:00:00Z').getTime();

  const buildGameweekRow = (overrides: Partial<any> = {}) => ({
    id: 'gw-id-7',
    gameweek_number: 7,
    deadline: '2024-08-17T11:00:00Z', // future relative to NOW
    is_special: false,
    special_type: null,
    is_active: true,
    ...overrides,
  });

  const buildSupabaseMatch = (overrides: Partial<any> = {}) => ({
    id: 'match-1',
    home_team: 'Arsenal',
    away_team: 'Chelsea',
    kickoff_time: '2024-08-17T14:00:00Z',
    gameweek: 7,
    season_id: 'season-1',
    status: 'scheduled',
    home_score: null,
    away_score: null,
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
    ...overrides,
  });

  /**
   * Populate `component.matches` with `count` view-model rows, each with the
   * supplied prediction scores (or null for "not predicted"). Lets each test
   * arrange an arbitrary number of filled-in predictions without relying on
   * ngOnInit hydration.
   */
  const seedMatches = (
    count: number,
    predictedUpTo: number,
  ): void => {
    const vms = Array.from({ length: count }, (_, i) => ({
      id: `m-${i + 1}`,
      homeTeam: 'Home',
      awayTeam: 'Away',
      kickoff: '2024-08-17T14:00:00Z',
      status: 'scheduled' as const,
      homeScore: null,
      awayScore: null,
      gameweek: 7,
      venue: '',
      prediction: {
        homeScore: i < predictedUpTo ? 1 : null,
        awayScore: i < predictedUpTo ? 0 : null,
      },
    }));
    component.matches = vms as any;
  };

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockSeasonService = {
      init: jest.fn().mockResolvedValue(undefined),
      getCurrentGameweek: jest.fn().mockReturnValue(7),
      getTotalGameweeks: jest.fn().mockReturnValue(38),
    };

    mockSupabaseDataService = {
      getMatches: jest.fn().mockResolvedValue([]),
      getActiveGameweek: jest.fn().mockResolvedValue(buildGameweekRow()),
      getGameweeks: jest.fn().mockResolvedValue([buildGameweekRow()]),
      submitPredictions: jest.fn().mockResolvedValue([]),
      getPredictions: jest.fn().mockResolvedValue([]),
      getJokerUsage: jest.fn().mockResolvedValue({ usedCount: 0, firstJokerGameweek: null, secondJokerGameweek: null }),
      getLastRegularGameweekBeforeSpecial: jest.fn().mockResolvedValue({ beforeBoxingDay: null, beforeFinalDay: null }),
    };

    mockToast = { present: jest.fn().mockResolvedValue(undefined) };
    mockToastController = {
      create: jest.fn().mockResolvedValue(mockToast),
    };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(Date, 'now').mockReturnValue(NOW);

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: GroupService, useValue: buildGroupServiceStub() },
        { provide: AuthService, useValue: buildAuthServiceStub() },
        { provide: ToastController, useValue: mockToastController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;

    // Resolve a valid gameweek id so canSubmit isn't blocked by an
    // unrelated precondition.
    component.currentGameweekId = 'gw-id-7';
    component.isLocked = false;
    component.predictionsCompleted = false;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it('canSubmit() is false on a regular gameweek with 2 predictions', () => {
    component.currentGameweek = { ...component.currentGameweek, isSpecial: false };
    seedMatches(3, 2);
    (component as any).updatePredictionCount();

    expect(component.canSubmit()).toBe(false);
  });

  it('canSubmit() is true on a regular gameweek with exactly 3 predictions', () => {
    component.currentGameweek = { ...component.currentGameweek, isSpecial: false };
    seedMatches(10, 3);
    (component as any).updatePredictionCount();

    expect(component.canSubmit()).toBe(true);
  });

  it('showTooManyPredictionsWarning is true on a regular gameweek when 4 predictions are filled', () => {
    component.currentGameweek = { ...component.currentGameweek, isSpecial: false };
    seedMatches(10, 4);
    (component as any).updatePredictionCount();

    expect(component.showTooManyPredictionsWarning).toBe(true);
  });

  it('canSubmit() is false on a special gameweek with 10 matches and 5 predictions', () => {
    component.currentGameweek = { ...component.currentGameweek, isSpecial: true };
    seedMatches(10, 5);
    (component as any).updatePredictionCount();

    expect(component.canSubmit()).toBe(false);
  });

  it('canSubmit() is true on a special gameweek with 10 matches and all 10 predicted', () => {
    component.currentGameweek = { ...component.currentGameweek, isSpecial: true };
    seedMatches(10, 10);
    (component as any).updatePredictionCount();

    expect(component.canSubmit()).toBe(true);
  });

  it('showTooManyPredictionsWarning is false on a special gameweek with 5 predictions (warning never fires on special)', () => {
    component.currentGameweek = { ...component.currentGameweek, isSpecial: true };
    seedMatches(10, 5);
    (component as any).updatePredictionCount();

    expect(component.showTooManyPredictionsWarning).toBe(false);
  });

  it('showTooManyPredictionsWarning is false on a special gameweek with all 10 predicted (no over-limit possible)', () => {
    component.currentGameweek = { ...component.currentGameweek, isSpecial: true };
    seedMatches(10, 10);
    (component as any).updatePredictionCount();

    expect(component.showTooManyPredictionsWarning).toBe(false);
  });

  it('onScoreChange does NOT flip showTooManyPredictionsWarning on a special gameweek even when predictionsCompleted', () => {
    component.currentGameweek = { ...component.currentGameweek, isSpecial: true };
    seedMatches(10, 10);
    component.predictionsCompleted = true;
    component.showTooManyPredictionsWarning = false;

    // Simulate the user tweaking a score after completion on a special GW.
    const match = component.matches[0];
    match.prediction.homeScore = 5;
    component.onScoreChange(match);

    expect(component.showTooManyPredictionsWarning).toBe(false);
  });

  it('getRequiredPredictionCount() returns 3 on a regular gameweek regardless of matches.length', () => {
    component.currentGameweek = { ...component.currentGameweek, isSpecial: false };
    seedMatches(10, 0);

    expect((component as any).getRequiredPredictionCount()).toBe(3);
  });

  it('getRequiredPredictionCount() returns matches.length on a special gameweek', () => {
    component.currentGameweek = { ...component.currentGameweek, isSpecial: true };
    seedMatches(10, 0);

    expect((component as any).getRequiredPredictionCount()).toBe(10);
  });
});

describe('MatchesPage (Task 3.4.2 — joker page state)', () => {
  let component: MatchesPage;
  let fixture: ComponentFixture<MatchesPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;
  let mockToast: { present: jest.Mock };
  let mockToastController: { create: jest.Mock };
  let consoleErrorSpy: jest.SpyInstance;

  const NOW = new Date('2024-08-17T10:00:00Z').getTime();

  const buildGameweekRow = (overrides: Partial<any> = {}) => ({
    id: 'gw-id-7',
    gameweek_number: 7,
    deadline: '2024-08-17T11:00:00Z', // future relative to NOW → unlocked
    is_special: false,
    special_type: null,
    is_active: true,
    ...overrides,
  });

  const buildSupabaseMatch = (overrides: Partial<any> = {}) => ({
    id: 'match-1',
    home_team: 'Arsenal',
    away_team: 'Chelsea',
    kickoff_time: '2024-08-17T14:00:00Z',
    gameweek: 7,
    season_id: 'season-1',
    status: 'scheduled',
    home_score: null,
    away_score: null,
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
    ...overrides,
  });

  const buildPredictionRow = (overrides: Partial<any> = {}) => ({
    id: 'pred-1',
    user_id: 'user-1',
    match_id: 'm-1',
    home_score: 2,
    away_score: 1,
    gameweek_number: 7,
    gameweek_id: 'gw-id-7',
    joker_used: false,
    points_earned: 0,
    created_at: '2024-08-10T00:00:00Z',
    updated_at: '2024-08-10T00:00:00Z',
    ...overrides,
  });

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockSeasonService = {
      init: jest.fn().mockResolvedValue(undefined),
      getCurrentGameweek: jest.fn().mockReturnValue(7),
      getTotalGameweeks: jest.fn().mockReturnValue(38),
    };

    mockSupabaseDataService = {
      getMatches: jest.fn().mockResolvedValue([]),
      getActiveGameweek: jest.fn().mockResolvedValue(buildGameweekRow()),
      getGameweeks: jest.fn().mockResolvedValue([buildGameweekRow()]),
      getPredictions: jest.fn().mockResolvedValue([]),
      submitPredictions: jest.fn().mockResolvedValue([]),
      getJokerUsage: jest.fn().mockResolvedValue({
        usedCount: 0,
        firstJokerGameweek: null,
        secondJokerGameweek: null,
      }),
      getLastRegularGameweekBeforeSpecial: jest.fn().mockResolvedValue({
        beforeBoxingDay: 18,
        beforeFinalDay: 37,
      }),
    };

    mockToast = { present: jest.fn().mockResolvedValue(undefined) };
    mockToastController = {
      create: jest.fn().mockResolvedValue(mockToast),
    };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(Date, 'now').mockReturnValue(NOW);

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: GroupService, useValue: buildGroupServiceStub() },
        { provide: AuthService, useValue: buildAuthServiceStub() },
        { provide: ToastController, useValue: mockToastController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it('should call getJokerUsage on ngOnInit', async () => {
    await component.ngOnInit();

    expect(mockSupabaseDataService.getJokerUsage).toHaveBeenCalled();
  });

  it('should call getLastRegularGameweekBeforeSpecial on ngOnInit', async () => {
    await component.ngOnInit();

    expect(
      mockSupabaseDataService.getLastRegularGameweekBeforeSpecial,
    ).toHaveBeenCalled();
  });

  it('jokersRemaining reflects 2 - usedCount (0 → 2, 1 → 1, 2 → 0)', async () => {
    // Case A: usedCount = 0 → remaining = 2
    mockSupabaseDataService.getJokerUsage.mockResolvedValueOnce({
      usedCount: 0,
      firstJokerGameweek: null,
      secondJokerGameweek: null,
    });
    await component.ngOnInit();
    expect((component as any).jokersRemaining).toBe(2);

    // Case B: usedCount = 1 → remaining = 1
    mockSupabaseDataService.getJokerUsage.mockResolvedValueOnce({
      usedCount: 1,
      firstJokerGameweek: 5,
      secondJokerGameweek: null,
    });
    (component as any).allGameweeks = null; // force re-init path
    await component.ngOnInit();
    expect((component as any).jokersRemaining).toBe(1);

    // Case C: usedCount = 2 → remaining = 0
    mockSupabaseDataService.getJokerUsage.mockResolvedValueOnce({
      usedCount: 2,
      firstJokerGameweek: 5,
      secondJokerGameweek: 20,
    });
    (component as any).allGameweeks = null;
    await component.ngOnInit();
    expect((component as any).jokersRemaining).toBe(0);
  });

  it('canUseJoker() returns false on a special gameweek', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, is_special: true, special_type: 'boxing-day' }),
    ]);

    await component.ngOnInit();

    expect(component.currentGameweek.isSpecial).toBe(true);
    expect((component as any).canUseJoker()).toBe(false);
  });

  it('canUseJoker() returns false when isLocked is true', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T09:00:00Z' }), // past → locked
    ]);

    await component.ngOnInit();

    expect(component.isLocked).toBe(true);
    expect((component as any).canUseJoker()).toBe(false);
  });

  it('canUseJoker() returns false when predictionsCompleted is true', async () => {
    await component.ngOnInit();
    component.predictionsCompleted = true;

    expect((component as any).canUseJoker()).toBe(false);
  });

  it('canUseJoker() returns false when jokersRemaining is 0', async () => {
    mockSupabaseDataService.getJokerUsage.mockResolvedValue({
      usedCount: 2,
      firstJokerGameweek: 5,
      secondJokerGameweek: 12,
    });

    await component.ngOnInit();

    expect((component as any).jokersRemaining).toBe(0);
    expect((component as any).canUseJoker()).toBe(false);
  });

  it('canUseJoker() returns true on a regular unlocked GW with jokers remaining and no completion', async () => {
    // Defaults: regular GW (is_special=false), future deadline (unlocked),
    // usedCount=0 → jokersRemaining=2, predictionsCompleted starts false.
    await component.ngOnInit();

    expect(component.currentGameweek.isSpecial).toBe(false);
    expect(component.isLocked).toBe(false);
    expect(component.predictionsCompleted).toBe(false);
    expect((component as any).jokersRemaining).toBe(2);
    expect((component as any).canUseJoker()).toBe(true);
  });

  it('jokerDeadlineWarning is set with correct GW number when currentGW is 2 away from beforeBoxingDay and usedCount=0', async () => {
    // currentGW = 16, beforeBoxingDay = 18 → diff = 2
    mockSeasonService.getCurrentGameweek.mockReturnValue(16);
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 16, deadline: '2024-08-17T11:00:00Z' }),
    ]);
    mockSupabaseDataService.getJokerUsage.mockResolvedValue({
      usedCount: 0,
      firstJokerGameweek: null,
      secondJokerGameweek: null,
    });
    mockSupabaseDataService.getLastRegularGameweekBeforeSpecial.mockResolvedValue({
      beforeBoxingDay: 18,
      beforeFinalDay: 37,
    });

    await component.ngOnInit();

    expect((component as any).jokerDeadlineWarning).toBe(
      'Play your 1st joker by Gameweek 18 or it will be auto-applied',
    );
  });

  it('jokerDeadlineWarning is null when usedCount is already 1 approaching Boxing Day', async () => {
    // currentGW = 17, beforeBoxingDay = 18 → diff = 1, but user has already used
    // 1 joker, so the 1st-joker warning should not apply and we are NOT yet
    // approaching the Final Day deadline (diff to 37 is 20).
    mockSeasonService.getCurrentGameweek.mockReturnValue(17);
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 17, deadline: '2024-08-17T11:00:00Z' }),
    ]);
    mockSupabaseDataService.getJokerUsage.mockResolvedValue({
      usedCount: 1,
      firstJokerGameweek: 5,
      secondJokerGameweek: null,
    });
    mockSupabaseDataService.getLastRegularGameweekBeforeSpecial.mockResolvedValue({
      beforeBoxingDay: 18,
      beforeFinalDay: 37,
    });

    await component.ngOnInit();

    expect((component as any).jokerDeadlineWarning).toBeNull();
  });

  it('jokerDeadlineWarning is set for Final Day approach when usedCount=1', async () => {
    // currentGW = 35, beforeFinalDay = 37 → diff = 2, usedCount = 1 → show
    // the 2nd-joker warning.
    mockSeasonService.getCurrentGameweek.mockReturnValue(35);
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 35, deadline: '2024-08-17T11:00:00Z' }),
    ]);
    mockSupabaseDataService.getJokerUsage.mockResolvedValue({
      usedCount: 1,
      firstJokerGameweek: 5,
      secondJokerGameweek: null,
    });
    mockSupabaseDataService.getLastRegularGameweekBeforeSpecial.mockResolvedValue({
      beforeBoxingDay: 18,
      beforeFinalDay: 37,
    });

    await component.ngOnInit();

    expect((component as any).jokerDeadlineWarning).toBe(
      'Play your 2nd joker by Gameweek 37 or it will be auto-applied',
    );
  });

  it('jokerDeadlineWarning is null when more than 2 GWs away from any special', async () => {
    // currentGW = 10, beforeBoxingDay = 18 → diff = 8, beforeFinalDay = 37 → diff = 27
    mockSeasonService.getCurrentGameweek.mockReturnValue(10);
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 10, deadline: '2024-08-17T11:00:00Z' }),
    ]);

    await component.ngOnInit();

    expect((component as any).jokerDeadlineWarning).toBeNull();
  });

  it('navigating between gameweeks recomputes jokerDeadlineWarning', async () => {
    // Start well clear of any special deadline (GW 10 → no warning).
    mockSeasonService.getCurrentGameweek.mockReturnValue(10);
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 10, deadline: '2024-08-17T11:00:00Z' }),
      buildGameweekRow({ gameweek_number: 16, deadline: '2024-09-17T11:00:00Z' }),
    ]);
    mockSupabaseDataService.getJokerUsage.mockResolvedValue({
      usedCount: 0,
      firstJokerGameweek: null,
      secondJokerGameweek: null,
    });
    mockSupabaseDataService.getLastRegularGameweekBeforeSpecial.mockResolvedValue({
      beforeBoxingDay: 18,
      beforeFinalDay: 37,
    });

    await component.ngOnInit();
    expect((component as any).jokerDeadlineWarning).toBeNull();

    // Jump forward 6 GWs → GW 16, now diff to 18 is 2 → warning fires.
    await component.navigateGameweek(6);

    expect((component as any).jokerDeadlineWarning).toBe(
      'Play your 1st joker by Gameweek 18 or it will be auto-applied',
    );
  });

  it('hydration: sets jokerUsedThisGameweek=true when any saved prediction has joker_used=true', async () => {
    mockSupabaseDataService.getMatches.mockResolvedValue([
      buildSupabaseMatch({ id: 'm-1' }),
      buildSupabaseMatch({ id: 'm-2' }),
    ]);
    mockSupabaseDataService.getPredictions.mockResolvedValue([
      buildPredictionRow({ match_id: 'm-1', joker_used: false }),
      buildPredictionRow({ match_id: 'm-2', joker_used: true }),
    ]);

    await component.ngOnInit();
    await component.ionViewWillEnter();

    expect((component as any).jokerUsedThisGameweek).toBe(true);
  });

  it('hydration: resets jokerUsedThisGameweek to false when no saved predictions have joker_used', async () => {
    // Pre-set to simulate lingering state from a previous gameweek.
    (component as any).jokerUsedThisGameweek = true;

    mockSupabaseDataService.getMatches.mockResolvedValue([
      buildSupabaseMatch({ id: 'm-1' }),
    ]);
    mockSupabaseDataService.getPredictions.mockResolvedValue([
      buildPredictionRow({ match_id: 'm-1', joker_used: false }),
    ]);

    await component.ngOnInit();
    await component.ionViewWillEnter();

    expect((component as any).jokerUsedThisGameweek).toBe(false);
  });
});

describe('MatchesPage (Task 3.4.3 — joker template UI)', () => {
  let component: MatchesPage;
  let fixture: ComponentFixture<MatchesPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;
  let mockToast: { present: jest.Mock };
  let mockToastController: { create: jest.Mock };
  let consoleErrorSpy: jest.SpyInstance;

  const NOW = new Date('2024-08-17T10:00:00Z').getTime();

  const buildGameweekRow = (overrides: Partial<any> = {}) => ({
    id: 'gw-id-7',
    gameweek_number: 7,
    deadline: '2024-08-17T11:00:00Z', // future relative to NOW → unlocked
    is_special: false,
    special_type: null,
    is_active: true,
    ...overrides,
  });

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockSeasonService = {
      init: jest.fn().mockResolvedValue(undefined),
      getCurrentGameweek: jest.fn().mockReturnValue(7),
      getTotalGameweeks: jest.fn().mockReturnValue(38),
    };

    mockSupabaseDataService = {
      getMatches: jest.fn().mockResolvedValue([]),
      getActiveGameweek: jest.fn().mockResolvedValue(buildGameweekRow()),
      getGameweeks: jest.fn().mockResolvedValue([buildGameweekRow()]),
      getPredictions: jest.fn().mockResolvedValue([]),
      submitPredictions: jest.fn().mockResolvedValue([]),
      getJokerUsage: jest.fn().mockResolvedValue({
        usedCount: 0,
        firstJokerGameweek: null,
        secondJokerGameweek: null,
      }),
      getLastRegularGameweekBeforeSpecial: jest.fn().mockResolvedValue({
        beforeBoxingDay: 18,
        beforeFinalDay: 37,
      }),
    };

    mockToast = { present: jest.fn().mockResolvedValue(undefined) };
    mockToastController = {
      create: jest.fn().mockResolvedValue(mockToast),
    };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(Date, 'now').mockReturnValue(NOW);

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: GroupService, useValue: buildGroupServiceStub() },
        { provide: AuthService, useValue: buildAuthServiceStub() },
        { provide: ToastController, useValue: mockToastController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it('renders .joker-indicator when isLocked is false', async () => {
    await component.ngOnInit();
    fixture.detectChanges();

    const root: HTMLElement = fixture.nativeElement;
    const indicator = root.querySelector('.joker-indicator');

    expect(component.isLocked).toBe(false);
    expect(indicator).not.toBeNull();
  });

  it('does NOT render .joker-indicator when isLocked is true', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T09:00:00Z' }), // past → locked
    ]);

    await component.ngOnInit();
    fixture.detectChanges();

    const root: HTMLElement = fixture.nativeElement;
    const indicator = root.querySelector('.joker-indicator');

    expect(component.isLocked).toBe(true);
    expect(indicator).toBeNull();
  });

  it('.joker-indicator shows correct jokersRemaining value (2, 1, 0)', async () => {
    // Case A: 2 remaining (usedCount = 0)
    await component.ngOnInit();
    fixture.detectChanges();
    let root: HTMLElement = fixture.nativeElement;
    let indicator = root.querySelector('.joker-indicator');
    expect(indicator).not.toBeNull();
    expect(indicator!.textContent).toContain('2/2 jokers remaining');

    // Case B: 1 remaining (usedCount = 1)
    mockSupabaseDataService.getJokerUsage.mockResolvedValue({
      usedCount: 1,
      firstJokerGameweek: 5,
      secondJokerGameweek: null,
    });
    (component as any).allGameweeks = null;
    await component.ngOnInit();
    fixture.detectChanges();
    root = fixture.nativeElement;
    indicator = root.querySelector('.joker-indicator');
    expect(indicator).not.toBeNull();
    expect(indicator!.textContent).toContain('1/2 jokers remaining');

    // Case C: 0 remaining (usedCount = 2)
    mockSupabaseDataService.getJokerUsage.mockResolvedValue({
      usedCount: 2,
      firstJokerGameweek: 5,
      secondJokerGameweek: 20,
    });
    (component as any).allGameweeks = null;
    await component.ngOnInit();
    fixture.detectChanges();
    root = fixture.nativeElement;
    indicator = root.querySelector('.joker-indicator');
    expect(indicator).not.toBeNull();
    expect(indicator!.textContent).toContain('0/2 jokers remaining');
  });

  it('renders .joker-toggle-row when canUseJoker() returns true', async () => {
    // Defaults: regular GW, future deadline, 2 jokers, not completed.
    await component.ngOnInit();
    fixture.detectChanges();

    expect(component.canUseJoker()).toBe(true);
    const root: HTMLElement = fixture.nativeElement;
    const toggleRow = root.querySelector('.joker-toggle-row');
    expect(toggleRow).not.toBeNull();
  });

  it('does NOT render .joker-toggle-row when currentGameweek.isSpecial is true', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, is_special: true, special_type: 'boxing-day' }),
    ]);

    await component.ngOnInit();
    fixture.detectChanges();

    expect(component.currentGameweek.isSpecial).toBe(true);
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('.joker-toggle-row')).toBeNull();
  });

  it('does NOT render .joker-toggle-row when jokersRemaining is 0', async () => {
    mockSupabaseDataService.getJokerUsage.mockResolvedValue({
      usedCount: 2,
      firstJokerGameweek: 5,
      secondJokerGameweek: 20,
    });

    await component.ngOnInit();
    fixture.detectChanges();

    expect((component as any).jokersRemaining).toBe(0);
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('.joker-toggle-row')).toBeNull();
  });

  it('does NOT render .joker-toggle-row when isLocked is true', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, deadline: '2024-08-17T09:00:00Z' }), // past
    ]);

    await component.ngOnInit();
    fixture.detectChanges();

    expect(component.isLocked).toBe(true);
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('.joker-toggle-row')).toBeNull();
  });

  it('does NOT render .joker-toggle-row when predictionsCompleted is true', async () => {
    await component.ngOnInit();
    component.predictionsCompleted = true;
    fixture.detectChanges();

    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('.joker-toggle-row')).toBeNull();
  });

  it('renders .joker-warning with the correct text when jokerDeadlineWarning is non-null', async () => {
    mockSeasonService.getCurrentGameweek.mockReturnValue(16);
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 16, deadline: '2024-08-17T11:00:00Z' }),
    ]);

    await component.ngOnInit();
    fixture.detectChanges();

    expect((component as any).jokerDeadlineWarning).toBe(
      'Play your 1st joker by Gameweek 18 or it will be auto-applied',
    );
    const root: HTMLElement = fixture.nativeElement;
    const warning = root.querySelector('.joker-warning');
    expect(warning).not.toBeNull();
    expect(warning!.textContent).toContain(
      'Play your 1st joker by Gameweek 18 or it will be auto-applied',
    );
  });

  it('does NOT render .joker-warning when jokerDeadlineWarning is null', async () => {
    // Default GW 7 is well clear of specials → warning stays null.
    await component.ngOnInit();
    fixture.detectChanges();

    expect((component as any).jokerDeadlineWarning).toBeNull();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('.joker-warning')).toBeNull();
  });

  it('renders .joker-disabled-note when currentGameweek.isSpecial is true and not locked', async () => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([
      buildGameweekRow({ gameweek_number: 7, is_special: true, special_type: 'boxing-day' }),
    ]);

    await component.ngOnInit();
    fixture.detectChanges();

    expect(component.currentGameweek.isSpecial).toBe(true);
    expect(component.isLocked).toBe(false);
    const root: HTMLElement = fixture.nativeElement;
    const note = root.querySelector('.joker-disabled-note');
    expect(note).not.toBeNull();
    expect(note!.textContent).toContain(
      'Jokers cannot be played on special rounds',
    );
  });

  it('does NOT render .joker-disabled-note on regular gameweeks', async () => {
    await component.ngOnInit();
    fixture.detectChanges();

    expect(component.currentGameweek.isSpecial).toBe(false);
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('.joker-disabled-note')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Task 3.4.4 — Submit: confirmation dialog, auto-assign, mark joker used
// ---------------------------------------------------------------------------

/**
 * Creates a jest-friendly mock of Ionic's AlertController.
 * Ionic's `alertController.create(...)` returns a Promise<HTMLIonAlertElement>
 * which in turn exposes `.present()` and `.onDidDismiss()`. Tests drive the
 * dialog's outcome by stubbing the value resolved by `onDidDismiss`.
 */
function createMockAlertController(dismissRole: string = 'confirm') {
  const present = jest.fn().mockResolvedValue(undefined);
  const onDidDismiss = jest.fn().mockResolvedValue({ role: dismissRole });
  const alertInstance = { present, onDidDismiss };
  const create = jest.fn().mockResolvedValue(alertInstance);
  return { create, alertInstance, present, onDidDismiss };
}

describe('MatchesPage (Task 3.4.4 — joker submit flow)', () => {
  let component: MatchesPage;
  let fixture: ComponentFixture<MatchesPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;
  let mockToast: { present: jest.Mock };
  let mockToastController: { create: jest.Mock };
  let mockAlertController: ReturnType<typeof createMockAlertController>;
  let mockLogger: { error: jest.Mock; warn: jest.Mock };
  let consoleErrorSpy: jest.SpyInstance;

  const NOW = new Date('2024-08-17T10:00:00Z').getTime();

  const buildGameweekRow = (overrides: Partial<any> = {}) => ({
    id: 'gw-id-7',
    gameweek_number: 7,
    deadline: '2024-08-17T11:00:00Z', // future relative to NOW → unlocked
    is_special: false,
    special_type: null,
    is_active: true,
    ...overrides,
  });

  const buildSupabaseMatch = (overrides: Partial<any> = {}) => ({
    id: 'match-1',
    home_team: 'Arsenal',
    away_team: 'Chelsea',
    kickoff_time: '2024-08-17T14:00:00Z',
    gameweek: 7,
    season_id: 'season-1',
    status: 'scheduled',
    home_score: null,
    away_score: null,
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
    ...overrides,
  });

  /**
   * Drive the component into a fully-initialised state with three scheduled
   * matches for the default gameweek, all three populated with valid scores
   * so `canSubmit()` is true.
   */
  const initAndFillThree = async (
    gameweekRow: any = buildGameweekRow({ id: 'gw-uuid-7', gameweek_number: 7 }),
  ) => {
    mockSupabaseDataService.getGameweeks.mockResolvedValue([gameweekRow]);
    mockSupabaseDataService.getMatches.mockResolvedValue([
      buildSupabaseMatch({ id: 'm-1' }),
      buildSupabaseMatch({ id: 'm-2' }),
      buildSupabaseMatch({ id: 'm-3' }),
    ]);
    mockSeasonService.getCurrentGameweek.mockReturnValue(gameweekRow.gameweek_number);
    await component.ngOnInit();
    component.matches[0].prediction.homeScore = 2;
    component.matches[0].prediction.awayScore = 1;
    component.matches[1].prediction.homeScore = 0;
    component.matches[1].prediction.awayScore = 0;
    component.matches[2].prediction.homeScore = 3;
    component.matches[2].prediction.awayScore = 2;
    component.updatePredictionCount();
  };

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockSeasonService = {
      init: jest.fn().mockResolvedValue(undefined),
      getCurrentGameweek: jest.fn().mockReturnValue(7),
      getTotalGameweeks: jest.fn().mockReturnValue(38),
    };

    mockSupabaseDataService = {
      getMatches: jest.fn().mockResolvedValue([]),
      getActiveGameweek: jest.fn().mockResolvedValue(buildGameweekRow()),
      getGameweeks: jest.fn().mockResolvedValue([buildGameweekRow()]),
      getPredictions: jest.fn().mockResolvedValue([]),
      submitPredictions: jest.fn().mockResolvedValue([]),
      getJokerUsage: jest.fn().mockResolvedValue({
        usedCount: 0,
        firstJokerGameweek: null,
        secondJokerGameweek: null,
      }),
      getLastRegularGameweekBeforeSpecial: jest.fn().mockResolvedValue({
        beforeBoxingDay: 18,
        beforeFinalDay: 37,
      }),
      markJokerUsed: jest.fn().mockResolvedValue(undefined),
    };

    mockToast = { present: jest.fn().mockResolvedValue(undefined) };
    mockToastController = {
      create: jest.fn().mockResolvedValue(mockToast),
    };

    mockAlertController = createMockAlertController('confirm');

    mockLogger = { error: jest.fn(), warn: jest.fn() };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(Date, 'now').mockReturnValue(NOW);

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: GroupService, useValue: buildGroupServiceStub() },
        { provide: AuthService, useValue: buildAuthServiceStub() },
        { provide: ToastController, useValue: mockToastController },
        { provide: AlertController, useValue: mockAlertController },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it('buildPredictionRows flags joker_used=true on every row when jokerUsedThisGameweek is true', async () => {
    await initAndFillThree();
    component.jokerUsedThisGameweek = true;

    const rows: any[] = (component as any).buildPredictionRows();

    expect(rows).toHaveLength(3);
    expect(rows.every((r) => r.joker_used === true)).toBe(true);
  });

  it('buildPredictionRows flags joker_used=false on every row when jokerUsedThisGameweek is false', async () => {
    await initAndFillThree();
    component.jokerUsedThisGameweek = false;

    const rows: any[] = (component as any).buildPredictionRows();

    expect(rows).toHaveLength(3);
    expect(rows.every((r) => r.joker_used === false)).toBe(true);
  });

  it('auto-assigns 1st joker (no dialog) when currentGameweek=beforeBoxingDay and usedCount=0', async () => {
    await initAndFillThree(
      buildGameweekRow({ id: 'gw-uuid-18', gameweek_number: 18 }),
    );
    // Sanity: cached state matches
    expect((component as any).beforeBoxingDay).toBe(18);
    expect((component as any).jokerUsageUsedCount).toBe(0);
    expect(component.jokerUsedThisGameweek).toBe(false);

    await component.onSubmit();

    expect(mockAlertController.create).not.toHaveBeenCalled();
    expect(mockSupabaseDataService.submitPredictions).toHaveBeenCalledTimes(1);
    const rows = mockSupabaseDataService.submitPredictions.mock.calls[0][0];
    expect(rows.every((r: any) => r.joker_used === true)).toBe(true);
    expect(mockSupabaseDataService.markJokerUsed).toHaveBeenCalledWith(18);
  });

  it('auto-assigns 2nd joker (no dialog) when currentGameweek=beforeFinalDay and usedCount=1', async () => {
    mockSupabaseDataService.getJokerUsage.mockResolvedValue({
      usedCount: 1,
      firstJokerGameweek: 18,
      secondJokerGameweek: null,
    });
    await initAndFillThree(
      buildGameweekRow({ id: 'gw-uuid-37', gameweek_number: 37 }),
    );
    expect((component as any).beforeFinalDay).toBe(37);
    expect((component as any).jokerUsageUsedCount).toBe(1);

    await component.onSubmit();

    expect(mockAlertController.create).not.toHaveBeenCalled();
    expect(mockSupabaseDataService.submitPredictions).toHaveBeenCalledTimes(1);
    const rows = mockSupabaseDataService.submitPredictions.mock.calls[0][0];
    expect(rows.every((r: any) => r.joker_used === true)).toBe(true);
    expect(mockSupabaseDataService.markJokerUsed).toHaveBeenCalledWith(37);
  });

  it('opens the confirmation dialog with correct header/message/buttons when user toggles joker ON and submits', async () => {
    await initAndFillThree();
    component.jokerUsedThisGameweek = true;

    await component.onSubmit();

    expect(mockAlertController.create).toHaveBeenCalledTimes(1);
    const arg = mockAlertController.create.mock.calls[0][0];
    expect(arg.header).toBe('Play Your Joker?');
    expect(arg.message).toContain('double');
    expect(arg.message).toContain('cannot be reversed');
    expect(arg.buttons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ text: 'Cancel', role: 'cancel' }),
        expect.objectContaining({ text: 'Play Joker', role: 'confirm' }),
      ]),
    );
    expect(mockAlertController.present).toHaveBeenCalled();
  });

  it('Cancel on confirmation dialog: submitPredictions is NOT called and no state changes', async () => {
    mockAlertController = createMockAlertController('cancel');
    // Rewire provider for this test case
    await TestBed.resetTestingModule()
      .configureTestingModule({
        imports: [MatchesPage],
        providers: [
          { provide: Router, useValue: mockRouter },
          { provide: SeasonService, useValue: mockSeasonService },
          { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: GroupService, useValue: buildGroupServiceStub() },
        { provide: AuthService, useValue: buildAuthServiceStub() },
          { provide: ToastController, useValue: mockToastController },
          { provide: AlertController, useValue: mockAlertController },
        ],
      })
      .compileComponents();
    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;

    await initAndFillThree();
    component.jokerUsedThisGameweek = true;

    const completedBefore = component.predictionsCompleted;

    await component.onSubmit();

    expect(mockAlertController.create).toHaveBeenCalledTimes(1);
    expect(mockSupabaseDataService.submitPredictions).not.toHaveBeenCalled();
    expect(mockSupabaseDataService.markJokerUsed).not.toHaveBeenCalled();
    expect(component.predictionsCompleted).toBe(completedBefore);
  });

  it('Confirm on confirmation dialog: submitPredictions is called with joker_used=true rows and markJokerUsed is called afterwards', async () => {
    await initAndFillThree();
    component.jokerUsedThisGameweek = true;

    await component.onSubmit();

    expect(mockSupabaseDataService.submitPredictions).toHaveBeenCalledTimes(1);
    const rows = mockSupabaseDataService.submitPredictions.mock.calls[0][0];
    expect(rows.every((r: any) => r.joker_used === true)).toBe(true);
    expect(mockSupabaseDataService.markJokerUsed).toHaveBeenCalledWith(7);

    // markJokerUsed must run AFTER submitPredictions
    const submitOrder =
      mockSupabaseDataService.submitPredictions.mock.invocationCallOrder[0];
    const markOrder =
      mockSupabaseDataService.markJokerUsed.mock.invocationCallOrder[0];
    expect(markOrder).toBeGreaterThan(submitOrder);
  });

  it('markJokerUsed is NOT called when jokerUsedThisGameweek is false', async () => {
    await initAndFillThree();
    // Default: toggle off, no auto-assign (GW 7, usedCount=0, beforeBoxingDay=18)
    expect(component.jokerUsedThisGameweek).toBe(false);

    await component.onSubmit();

    expect(mockSupabaseDataService.submitPredictions).toHaveBeenCalledTimes(1);
    expect(mockSupabaseDataService.markJokerUsed).not.toHaveBeenCalled();
  });

  it('markJokerUsed rejection: predictions still succeed — toast shown, error logged, predictionsCompleted=true', async () => {
    const jokerErr = new Error('joker write failed');
    mockSupabaseDataService.markJokerUsed.mockRejectedValueOnce(jokerErr);
    await initAndFillThree();
    component.jokerUsedThisGameweek = true;

    await expect(component.onSubmit()).resolves.not.toThrow();

    expect(mockSupabaseDataService.submitPredictions).toHaveBeenCalledTimes(1);
    expect(component.predictionsCompleted).toBe(true);
    expect(mockLogger.error).toHaveBeenCalledWith(
      'matches.markJokerUsed',
      jokerErr,
    );
    expect(mockToastController.create).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining('joker tracking failed'),
        color: 'danger',
      }),
    );
  });

  it('after successful joker submit: jokerUsageUsedCount++, jokersRemaining--, jokerAlreadyLockedForGameweek=true', async () => {
    await initAndFillThree();
    component.jokerUsedThisGameweek = true;
    expect((component as any).jokerUsageUsedCount).toBe(0);
    expect((component as any).jokersRemaining).toBe(2);

    await component.onSubmit();

    expect((component as any).jokerUsageUsedCount).toBe(1);
    expect((component as any).jokersRemaining).toBe(1);
    expect((component as any).jokerAlreadyLockedForGameweek).toBe(true);
  });

  it('resubmit of an already-joker-marked gameweek does NOT double-decrement local counters', async () => {
    await initAndFillThree();
    component.jokerUsedThisGameweek = true;

    // First submit — fresh joker spend
    await component.onSubmit();
    expect((component as any).jokerUsageUsedCount).toBe(1);
    expect((component as any).jokersRemaining).toBe(1);
    expect((component as any).jokerAlreadyLockedForGameweek).toBe(true);

    // Simulate user revisiting the same GW (predictions not locked yet —
    // pretend they could re-submit). The DB-level markJokerUsed is
    // idempotent; local counters must NOT advance again.
    component.predictionsCompleted = false;
    await component.onSubmit();

    expect((component as any).jokerUsageUsedCount).toBe(1);
    expect((component as any).jokersRemaining).toBe(1);
    expect((component as any).jokerAlreadyLockedForGameweek).toBe(true);
  });
});

describe('MatchesPage (Task 4.2.4.1 — hydrate lifecycle + empty-venue + null-score guard)', () => {
  let component: MatchesPage;
  let fixture: ComponentFixture<MatchesPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;
  let mockToast: { present: jest.Mock };
  let mockToastController: { create: jest.Mock };
  let mockLogger: { error: jest.Mock; warn: jest.Mock };
  let consoleErrorSpy: jest.SpyInstance;

  const NOW = new Date('2024-08-17T10:00:00Z').getTime();

  const buildGameweekRow = (overrides: Partial<any> = {}) => ({
    id: 'gw-id-7',
    gameweek_number: 7,
    deadline: '2024-08-17T11:00:00Z', // future relative to NOW
    is_special: false,
    special_type: null,
    is_active: true,
    ...overrides,
  });

  const buildSupabaseMatch = (overrides: Partial<any> = {}) => ({
    id: 'match-1',
    home_team: 'Arsenal',
    away_team: 'Chelsea',
    kickoff_time: '2024-08-17T14:00:00Z',
    gameweek: 7,
    season_id: 'season-1',
    status: 'scheduled',
    home_score: null,
    away_score: null,
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
    ...overrides,
  });

  const buildPredictionRow = (overrides: Partial<any> = {}) => ({
    id: 'pred-1',
    user_id: 'user-1',
    match_id: 'm-1',
    home_score: 2,
    away_score: 1,
    gameweek_number: 7,
    gameweek_id: 'gw-id-7',
    joker_used: false,
    points_earned: 0,
    created_at: '2024-08-10T00:00:00Z',
    updated_at: '2024-08-10T00:00:00Z',
    ...overrides,
  });

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockSeasonService = {
      init: jest.fn().mockResolvedValue(undefined),
      getCurrentGameweek: jest.fn().mockReturnValue(7),
      getTotalGameweeks: jest.fn().mockReturnValue(38),
    };

    mockSupabaseDataService = {
      getMatches: jest.fn().mockResolvedValue([]),
      getActiveGameweek: jest.fn().mockResolvedValue(buildGameweekRow()),
      getGameweeks: jest.fn().mockResolvedValue([buildGameweekRow()]),
      submitPredictions: jest.fn().mockResolvedValue([]),
      getPredictions: jest.fn().mockResolvedValue([]),
    };

    mockToast = { present: jest.fn().mockResolvedValue(undefined) };
    mockToastController = {
      create: jest.fn().mockResolvedValue(mockToast),
    };

    mockLogger = { error: jest.fn(), warn: jest.fn() };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(Date, 'now').mockReturnValue(NOW);

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: GroupService, useValue: buildGroupServiceStub() },
        { provide: AuthService, useValue: buildAuthServiceStub() },
        { provide: ToastController, useValue: mockToastController },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it('calls hydrate (getPredictions) on ionViewWillEnter — fires on cached re-entry', async () => {
    mockSupabaseDataService.getMatches.mockResolvedValue([
      buildSupabaseMatch({ id: 'm-1' }),
    ]);

    // First entry: ngOnInit sets up, then ionViewWillEnter hydrates.
    await component.ngOnInit();
    await component.ionViewWillEnter();
    expect(mockSupabaseDataService.getPredictions).toHaveBeenCalledTimes(1);

    // Second entry: component cached by Ionic. ngOnInit does NOT re-run,
    // but ionViewWillEnter fires again and must re-hydrate.
    await component.ionViewWillEnter();
    expect(mockSupabaseDataService.getPredictions).toHaveBeenCalledTimes(2);
    expect(mockSupabaseDataService.getPredictions).toHaveBeenLastCalledWith(7);
  });

  it('ngOnInit alone does NOT call getPredictions — hydration lives in ionViewWillEnter', async () => {
    mockSupabaseDataService.getMatches.mockResolvedValue([
      buildSupabaseMatch({ id: 'm-1' }),
    ]);

    await component.ngOnInit();

    expect(mockSupabaseDataService.getPredictions).not.toHaveBeenCalled();
  });

  it('renders NO venue block (icon + text) when match.venue is empty string', async () => {
    mockSupabaseDataService.getMatches.mockResolvedValue([
      buildSupabaseMatch({ id: 'm-1' }),
    ]);

    await component.ngOnInit();
    await component.ionViewWillEnter();
    // venue defaults to '' in toViewModel; be explicit for this test.
    component.matches[0].venue = '';
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelector('.venue')).toBeNull();
  });

  it('renders the venue block when match.venue is non-empty', async () => {
    mockSupabaseDataService.getMatches.mockResolvedValue([
      buildSupabaseMatch({ id: 'm-1' }),
    ]);

    await component.ngOnInit();
    await component.ionViewWillEnter();
    component.matches[0].venue = 'Old Trafford';
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;
    const venueEl = compiled.querySelector('.venue');
    expect(venueEl).toBeTruthy();
    expect(venueEl?.textContent).toContain('Old Trafford');
  });

  it('null-score guard: hydrateSavedPredictions sets homeScore=0 when saved row home_score is null', async () => {
    mockSupabaseDataService.getMatches.mockResolvedValue([
      buildSupabaseMatch({ id: 'm-1' }),
    ]);
    mockSupabaseDataService.getPredictions.mockResolvedValue([
      buildPredictionRow({ match_id: 'm-1', home_score: null, away_score: null }),
    ]);

    await component.ngOnInit();
    await component.ionViewWillEnter();

    expect(component.matches[0].prediction.homeScore).toBe(0);
    expect(component.matches[0].prediction.awayScore).toBe(0);
  });

  it('Task 4.2.4.2 — renders a visible loading spinner while matches are being fetched and hides it after', async () => {
    let resolveFetch!: (value: any[]) => void;
    mockSupabaseDataService.getMatches.mockReturnValue(
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

// ---------------------------------------------------------------------------
// Task 4.2.7 — isLocked short-circuit regression lock
// ---------------------------------------------------------------------------
// Tripwire: onSubmit() MUST fail closed when the deadline has passed. The UI
// already hides the submit button when isLocked=true, but any direct caller
// (test harness, keyboard shortcut, future refactor) must never reach
// SupabaseDataService.submitPredictions once the gameweek is locked. If this
// spec starts failing it means someone removed or reordered the `if
// (this.isLocked) return;` guard at the top of onSubmit() — DO NOT relax the
// assertion; fix the guard.
//
// Sanity-tested during Phase 2 by temporarily deleting the guard; this spec
// correctly flipped to red.
// ---------------------------------------------------------------------------
describe('MatchesPage (Task 4.2.7 — isLocked short-circuit regression)', () => {
  let component: MatchesPage;
  let fixture: ComponentFixture<MatchesPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;
  let mockToast: { present: jest.Mock };
  let mockToastController: { create: jest.Mock };
  let mockLogger: { error: jest.Mock; warn: jest.Mock };

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockSeasonService = {
      init: jest.fn().mockResolvedValue(undefined),
      getCurrentGameweek: jest.fn().mockReturnValue(7),
      getTotalGameweeks: jest.fn().mockReturnValue(38),
    };

    mockSupabaseDataService = {
      getMatches: jest.fn().mockResolvedValue([]),
      getActiveGameweek: jest.fn().mockResolvedValue(null),
      getGameweeks: jest.fn().mockResolvedValue([]),
      getPredictions: jest.fn().mockResolvedValue([]),
      submitPredictions: jest.fn().mockResolvedValue([]),
      getJokerUsage: jest.fn().mockResolvedValue({
        usedCount: 0,
        firstJokerGameweek: null,
        secondJokerGameweek: null,
      }),
      getLastRegularGameweekBeforeSpecial: jest.fn().mockResolvedValue({
        beforeBoxingDay: null,
        beforeFinalDay: null,
      }),
    };

    mockToast = { present: jest.fn().mockResolvedValue(undefined) };
    mockToastController = {
      create: jest.fn().mockResolvedValue(mockToast),
    };
    mockLogger = { error: jest.fn(), warn: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: GroupService, useValue: buildGroupServiceStub() },
        { provide: AuthService, useValue: buildAuthServiceStub() },
        { provide: ToastController, useValue: mockToastController },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;
  });

  it('onSubmit() does NOT call submitPredictions when isLocked=true, even with a valid match and populated predictions', async () => {
    // Arrange — locked state with an otherwise-submittable form:
    // - One valid match with populated scores
    // - currentGameweekId set (FK would be resolvable)
    // - selectedPredictionCount=3 (quota met for a regular GW)
    // - predictionsCompleted=false (hasn't already been submitted)
    // If the guard at the top of onSubmit() ever regresses, this test will
    // flip red because submitPredictions would be called.
    component.isLocked = true;
    component.currentGameweekId = 'gw-uuid-1';
    component.selectedPredictionCount = 3;
    component.predictionsCompleted = false;
    component.matches = [
      {
        id: 'm-1',
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        kickoff: '2024-08-17T14:00:00Z',
        status: 'scheduled',
        homeScore: null,
        awayScore: null,
        gameweek: 7,
        venue: '',
        prediction: { homeScore: 2, awayScore: 1 },
      } as any,
    ];

    // Act
    await component.onSubmit();

    // Assert — the guard must short-circuit before any network call
    expect(mockSupabaseDataService.submitPredictions).not.toHaveBeenCalled();
  });
});
