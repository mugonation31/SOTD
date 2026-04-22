import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { SeasonService } from './season.service';
import { SupabaseDataService } from './supabase-data.service';
import { LoggerService } from './logger.service';

describe('SeasonService', () => {
  let service: SeasonService;
  let mockSupabaseDataService: any;
  let mockLogger: { error: jest.Mock; warn: jest.Mock };

  beforeEach(() => {
    mockSupabaseDataService = {
      getActiveGameweek: jest.fn(),
      getGameweeks: jest.fn(),
    };
    mockLogger = { error: jest.fn(), warn: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        SeasonService,
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: LoggerService, useValue: mockLogger },
      ],
    });
  });

  it('should be created', () => {
    mockSupabaseDataService.getActiveGameweek.mockResolvedValue({ id: 'gw-1', number: 1 });
    mockSupabaseDataService.getGameweeks.mockResolvedValue([{ id: 'gw-1', number: 1 }]);

    service = TestBed.inject(SeasonService);

    expect(service).toBeTruthy();
  });

  it('should call SupabaseDataService.getActiveGameweek() on init()', async () => {
    mockSupabaseDataService.getActiveGameweek.mockResolvedValue({ id: 'gw-5', number: 5 });
    mockSupabaseDataService.getGameweeks.mockResolvedValue([]);

    service = TestBed.inject(SeasonService);
    await service.init();

    expect(mockSupabaseDataService.getActiveGameweek).toHaveBeenCalled();
  });

  it('should emit currentGameweek from the active gameweek number after init resolves', async () => {
    mockSupabaseDataService.getActiveGameweek.mockResolvedValue({ id: 'gw-7', number: 7 });
    mockSupabaseDataService.getGameweeks.mockResolvedValue([]);

    service = TestBed.inject(SeasonService);
    await service.init();

    const info = await firstValueFrom(service.getSeasonInfo());
    expect(info.currentGameweek).toBe(7);
    expect(service.getCurrentGameweek()).toBe(7);
  });

  it('should set totalGameweeks from getGameweeks() length after init', async () => {
    mockSupabaseDataService.getActiveGameweek.mockResolvedValue({ id: 'gw-1', number: 1 });
    const gameweeks = Array.from({ length: 38 }, (_, i) => ({ id: `gw-${i + 1}`, number: i + 1 }));
    mockSupabaseDataService.getGameweeks.mockResolvedValue(gameweeks);

    service = TestBed.inject(SeasonService);
    await service.init();

    const info = await firstValueFrom(service.getSeasonInfo());
    expect(info.totalGameweeks).toBe(38);
    expect(mockSupabaseDataService.getGameweeks).toHaveBeenCalled();
  });

  it('should default currentGameweek to 1 when getActiveGameweek() rejects (no active gameweek)', async () => {
    mockSupabaseDataService.getActiveGameweek.mockRejectedValue(new Error('No rows'));
    mockSupabaseDataService.getGameweeks.mockResolvedValue([]);

    service = TestBed.inject(SeasonService);
    await service.init();

    const info = await firstValueFrom(service.getSeasonInfo());
    expect(info.currentGameweek).toBe(1);
    expect(service.getCurrentGameweek()).toBe(1);
  });

  it('should mark season as started when an active gameweek exists', async () => {
    mockSupabaseDataService.getActiveGameweek.mockResolvedValue({ id: 'gw-3', number: 3 });
    mockSupabaseDataService.getGameweeks.mockResolvedValue([]);

    service = TestBed.inject(SeasonService);
    await service.init();

    expect(service.isSeasonStarted()).toBe(true);
    expect(service.isSeasonEnded()).toBe(false);
  });

  it('should not reference hardcoded SEASON_START / SEASON_END dates', () => {
    // Behavioural guarantee: no date constants drive gameweek calc.
    // Compile-time safety: the tests above pass without any time mocking.
    const source = SeasonService.toString();
    expect(source).not.toMatch(/2024-08-10/);
    expect(source).not.toMatch(/2025-05-19/);
  });

  it('should call logger.warn with the active-gameweek context and raw error when getActiveGameweek rejects', async () => {
    const rawErr = new Error('No rows');
    mockSupabaseDataService.getActiveGameweek.mockRejectedValue(rawErr);
    mockSupabaseDataService.getGameweeks.mockResolvedValue([]);

    service = TestBed.inject(SeasonService);
    await service.init();

    expect(mockLogger.warn).toHaveBeenCalledWith(
      'season.safeGetActiveGameweek',
      rawErr,
    );
  });

  it('should call logger.warn with the gameweeks context and raw error when getGameweeks rejects', async () => {
    mockSupabaseDataService.getActiveGameweek.mockResolvedValue({ id: 'gw-1', number: 1 });
    const rawErr = new Error('table unreachable');
    mockSupabaseDataService.getGameweeks.mockRejectedValue(rawErr);

    service = TestBed.inject(SeasonService);
    await service.init();

    expect(mockLogger.warn).toHaveBeenCalledWith(
      'season.safeGetGameweeks',
      rawErr,
    );
  });

  it('should not call logger.warn when both calls succeed', async () => {
    mockSupabaseDataService.getActiveGameweek.mockResolvedValue({ id: 'gw-1', number: 1 });
    mockSupabaseDataService.getGameweeks.mockResolvedValue([]);

    service = TestBed.inject(SeasonService);
    await service.init();

    expect(mockLogger.warn).not.toHaveBeenCalled();
  });
});
