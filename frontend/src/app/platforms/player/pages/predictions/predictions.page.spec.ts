import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { readFileSync } from 'fs';
import { join } from 'path';
import { PredictionsPage } from './predictions.page';
import { SeasonService } from '@core/services/season.service';
import { SupabaseDataService } from '@core/services/supabase-data.service';
import { createMockRouter } from '../../../../../testing/test-utils';

describe('PredictionsPage (Task 3.2.4 — wire to Supabase)', () => {
  let component: PredictionsPage;
  let fixture: ComponentFixture<PredictionsPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;

  const buildPredictionRow = (overrides: Partial<any> = {}) => ({
    id: 'pred-uuid-1',
    user_id: 'user-1',
    match_id: 'match-1',
    home_score: 2,
    away_score: 1,
    gameweek_number: 7,
    points_earned: 5,
    matches: {
      id: 'match-1',
      home_team: 'Arsenal',
      away_team: 'Chelsea',
      kickoff_time: '2025-01-01T15:00:00Z',
      status: 'completed',
      home_score: 2,
      away_score: 1,
      gameweek: 7,
    },
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
      getPredictionsWithMatches: jest.fn().mockResolvedValue([]),
    };

    await TestBed.configureTestingModule({
      imports: [PredictionsPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictionsPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call SeasonService.init() on ionViewWillEnter', async () => {
    await component.ionViewWillEnter();
    expect(mockSeasonService.init).toHaveBeenCalled();
  });

  it('should call getPredictionsWithMatches with the current gameweek number on ionViewWillEnter', async () => {
    mockSeasonService.getCurrentGameweek.mockReturnValue(12);

    await component.ionViewWillEnter();

    expect(mockSupabaseDataService.getPredictionsWithMatches).toHaveBeenCalledWith(12);
  });

  it('should populate currentPredictions view-model from returned rows', async () => {
    mockSupabaseDataService.getPredictionsWithMatches.mockResolvedValue([
      buildPredictionRow({
        id: 'pred-uuid-A',
        home_score: 3,
        away_score: 0,
        points_earned: 5,
        matches: {
          id: 'match-A',
          home_team: 'Manchester United',
          away_team: 'Liverpool',
          kickoff_time: '2025-02-01T14:00:00Z',
          status: 'completed',
          home_score: 3,
          away_score: 0,
          gameweek: 7,
        },
      }),
    ]);

    await component.ionViewWillEnter();

    expect(component.currentPredictions.length).toBe(1);
    expect(component.currentPredictions[0]).toEqual(
      expect.objectContaining({
        id: 'pred-uuid-A',
        gameweek: 7,
        match: expect.objectContaining({
          homeTeam: 'Manchester United',
          awayTeam: 'Liverpool',
          kickoff: '2025-02-01T14:00:00Z',
        }),
        prediction: { home: 3, away: 0 },
        points: 5,
      })
    );
  });

  it('should derive status "correct" when match completed and points > 0', async () => {
    mockSupabaseDataService.getPredictionsWithMatches.mockResolvedValue([
      buildPredictionRow({
        points_earned: 5,
        matches: {
          id: 'm1',
          home_team: 'A',
          away_team: 'B',
          kickoff_time: '2025-01-01T15:00:00Z',
          status: 'completed',
          home_score: 2,
          away_score: 1,
          gameweek: 7,
        },
      }),
    ]);

    await component.ionViewWillEnter();

    expect(component.currentPredictions[0].status).toBe('correct');
  });

  it('should derive status "incorrect" when match completed and points === 0', async () => {
    mockSupabaseDataService.getPredictionsWithMatches.mockResolvedValue([
      buildPredictionRow({
        points_earned: 0,
        matches: {
          id: 'm1',
          home_team: 'A',
          away_team: 'B',
          kickoff_time: '2025-01-01T15:00:00Z',
          status: 'completed',
          home_score: 0,
          away_score: 5,
          gameweek: 7,
        },
      }),
    ]);

    await component.ionViewWillEnter();

    expect(component.currentPredictions[0].status).toBe('incorrect');
  });

  it('should derive status "pending" when match is not completed', async () => {
    mockSupabaseDataService.getPredictionsWithMatches.mockResolvedValue([
      buildPredictionRow({
        points_earned: null,
        matches: {
          id: 'm1',
          home_team: 'A',
          away_team: 'B',
          kickoff_time: '2025-01-01T15:00:00Z',
          status: 'scheduled',
          home_score: null,
          away_score: null,
          gameweek: 7,
        },
      }),
    ]);

    await component.ionViewWillEnter();

    expect(component.currentPredictions[0].status).toBe('pending');
  });

  it('should default points to 0 when points_earned is null/undefined', async () => {
    mockSupabaseDataService.getPredictionsWithMatches.mockResolvedValue([
      buildPredictionRow({ points_earned: null }),
    ]);

    await component.ionViewWillEnter();

    expect(component.currentPredictions[0].points).toBe(0);
  });

  it('should populate match.finalScore when the match is completed', async () => {
    mockSupabaseDataService.getPredictionsWithMatches.mockResolvedValue([
      buildPredictionRow({
        matches: {
          id: 'm1',
          home_team: 'A',
          away_team: 'B',
          kickoff_time: '2025-01-01T15:00:00Z',
          status: 'completed',
          home_score: 4,
          away_score: 2,
          gameweek: 7,
        },
      }),
    ]);

    await component.ionViewWillEnter();

    expect(component.currentPredictions[0].match.finalScore).toEqual({
      home: 4,
      away: 2,
    });
  });

  it('should leave match.finalScore as null/undefined when the match is not completed', async () => {
    mockSupabaseDataService.getPredictionsWithMatches.mockResolvedValue([
      buildPredictionRow({
        matches: {
          id: 'm1',
          home_team: 'A',
          away_team: 'B',
          kickoff_time: '2025-01-01T15:00:00Z',
          status: 'scheduled',
          home_score: null,
          away_score: null,
          gameweek: 7,
        },
      }),
    ]);

    await component.ionViewWillEnter();

    expect(component.currentPredictions[0].match.finalScore).toBeNull();
  });

  it('should set currentPredictions to [] when user has zero predictions (empty state)', async () => {
    mockSupabaseDataService.getPredictionsWithMatches.mockResolvedValue([]);

    await expect(component.ionViewWillEnter()).resolves.not.toThrow();

    expect(component.currentPredictions).toEqual([]);
  });

  it('should toggle isLoading true before fetch and false after', async () => {
    let resolveFetch!: (value: any[]) => void;
    mockSupabaseDataService.getPredictionsWithMatches.mockReturnValue(
      new Promise<any[]>((resolve) => {
        resolveFetch = resolve;
      })
    );

    const enterPromise = component.ionViewWillEnter();

    expect(component.isLoading).toBe(true);

    resolveFetch([]);
    await enterPromise;

    expect(component.isLoading).toBe(false);
  });

  it('should log error and show empty state when fetch rejects', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockSupabaseDataService.getPredictionsWithMatches.mockRejectedValue(
      new Error('boom')
    );

    await expect(component.ionViewWillEnter()).resolves.not.toThrow();

    expect(errorSpy).toHaveBeenCalled();
    expect(component.currentPredictions).toEqual([]);
    expect(component.isLoading).toBe(false);

    errorSpy.mockRestore();
  });

  it('should produce a Prediction whose id is a string (UUID)', async () => {
    mockSupabaseDataService.getPredictionsWithMatches.mockResolvedValue([
      buildPredictionRow({ id: '550e8400-e29b-41d4-a716-446655440000' }),
    ]);

    await component.ionViewWillEnter();

    expect(typeof component.currentPredictions[0].id).toBe('string');
    expect(component.currentPredictions[0].id).toBe(
      '550e8400-e29b-41d4-a716-446655440000'
    );
  });

  it('should not reference MockDataService in the predictions page source', () => {
    const source = readFileSync(
      join(__dirname, 'predictions.page.ts'),
      'utf-8'
    );
    expect(source).not.toMatch(/MockDataService/);
  });
});

describe('PredictionsPage (Task 3.2.5 — group context selector)', () => {
  let component: PredictionsPage;
  let fixture: ComponentFixture<PredictionsPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockSeasonService: any;
  let mockSupabaseDataService: any;

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockSeasonService = {
      init: jest.fn().mockResolvedValue(undefined),
      getCurrentGameweek: jest.fn().mockReturnValue(7),
      getTotalGameweeks: jest.fn().mockReturnValue(38),
    };

    mockSupabaseDataService = {
      getPredictionsWithMatches: jest.fn().mockResolvedValue([]),
      getGroups: jest.fn().mockResolvedValue([
        { id: 'group-1', name: 'Group One' },
        { id: 'group-2', name: 'Group Two' },
      ]),
    };

    await TestBed.configureTestingModule({
      imports: [PredictionsPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SeasonService, useValue: mockSeasonService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictionsPage);
    component = fixture.componentInstance;
  });

  it('should call getGroups() on ionViewWillEnter', async () => {
    await component.ionViewWillEnter();
    expect(mockSupabaseDataService.getGroups).toHaveBeenCalled();
  });

  it('should populate availableGroups from the returned array', async () => {
    mockSupabaseDataService.getGroups.mockResolvedValue([
      { id: 'g-A', name: 'Alpha' },
      { id: 'g-B', name: 'Beta' },
    ]);

    await component.ionViewWillEnter();

    expect(component.availableGroups).toEqual([
      { id: 'g-A', name: 'Alpha' },
      { id: 'g-B', name: 'Beta' },
    ]);
  });

  it('should default selectedGroupId to the first group id', async () => {
    mockSupabaseDataService.getGroups.mockResolvedValue([
      { id: 'first-group', name: 'First' },
      { id: 'second-group', name: 'Second' },
    ]);

    await component.ionViewWillEnter();

    expect(component.selectedGroupId).toBe('first-group');
  });

  it('should set hasNoGroups === true when getGroups() returns []', async () => {
    mockSupabaseDataService.getGroups.mockResolvedValue([]);

    await component.ionViewWillEnter();

    expect(component.hasNoGroups).toBe(true);
  });

  it('should NOT call getPredictionsWithMatches when the user has no groups', async () => {
    mockSupabaseDataService.getGroups.mockResolvedValue([]);

    await component.ionViewWillEnter();

    expect(mockSupabaseDataService.getPredictionsWithMatches).not.toHaveBeenCalled();
  });

  it('should set hasNoGroups === true and log an error when getGroups() rejects', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockSupabaseDataService.getGroups.mockRejectedValue(new Error('network down'));

    await expect(component.ionViewWillEnter()).resolves.not.toThrow();

    expect(component.hasNoGroups).toBe(true);
    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
  });

  it('should update selectedGroupId when onGroupChange is called', () => {
    component.selectedGroupId = 'group-1';

    component.onGroupChange('xyz');

    expect(component.selectedGroupId).toBe('xyz');
  });

  it('should render the group select when groups exist', async () => {
    await component.ionViewWillEnter();
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelector('.group-select')).toBeTruthy();
  });

  it('should render the no-groups state when hasNoGroups === true', async () => {
    mockSupabaseDataService.getGroups.mockResolvedValue([]);

    await component.ionViewWillEnter();
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelector('.no-groups-state')).toBeTruthy();
  });

  it('should NOT render the segment control when hasNoGroups === true', async () => {
    mockSupabaseDataService.getGroups.mockResolvedValue([]);

    await component.ionViewWillEnter();
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelector('.predictions-segment')).toBeNull();
  });
});
