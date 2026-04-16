import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { readFileSync } from 'fs';
import { join } from 'path';
import { MatchesPage } from './matches.page';
import { SeasonService } from '@core/services/season.service';
import { SupabaseDataService } from '@core/services/supabase-data.service';
import { createMockRouter } from '../../../../../testing/test-utils';

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
    };

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
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
    };

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
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
    };

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
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
    };

    mockToast = { present: jest.fn().mockResolvedValue(undefined) };
    mockToastController = {
      create: jest.fn().mockResolvedValue(mockToast),
    };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [MatchesPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: ToastController, useValue: mockToastController },
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

    it('should log the error to console.error and not re-throw', async () => {
      const err = new Error('Network down');
      mockSupabaseDataService.getMatches.mockRejectedValue(err);

      await expect(component.ngOnInit()).resolves.not.toThrow();

      expect(consoleErrorSpy).toHaveBeenCalled();
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
