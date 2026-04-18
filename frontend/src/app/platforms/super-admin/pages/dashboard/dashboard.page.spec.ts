import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastController } from '@ionic/angular/standalone';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DashboardPage } from './dashboard.page';
import { SupabaseDataService } from '@core/services/supabase-data.service';

describe('DashboardPage (Task 4.0.8 — real Supabase data + Sync)', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let mockSupabaseDataService: {
    getAdminCounts: jest.Mock;
    getActiveGameweek: jest.Mock;
    getLastMatchSync: jest.Mock;
    triggerMatchSync: jest.Mock;
  };
  let mockToast: { present: jest.Mock };
  let mockToastController: { create: jest.Mock };
  let consoleErrorSpy: jest.SpyInstance;

  const baseCounts = { userCount: 2, groupCount: 1 };
  const baseGameweek = { id: 'gw1', number: 7, deadline: '2026-04-20T12:00:00Z', is_active: true };
  const baseSync = {
    lastSyncAt: '2026-04-17T10:00:00Z',
    lastSyncStatus: 'ok' as const,
    lastSyncError: null,
    cooldownRemainingSeconds: 0,
  };

  beforeEach(async () => {
    mockSupabaseDataService = {
      getAdminCounts: jest.fn().mockResolvedValue(baseCounts),
      getActiveGameweek: jest.fn().mockResolvedValue(baseGameweek),
      getLastMatchSync: jest.fn().mockResolvedValue(baseSync),
      triggerMatchSync: jest.fn().mockResolvedValue({ ok: true, syncedAt: '2026-04-17T10:05:00Z' }),
    };

    mockToast = { present: jest.fn().mockResolvedValue(undefined) };
    mockToastController = {
      create: jest.fn().mockResolvedValue(mockToast),
    };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: ToastController, useValue: mockToastController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.useRealTimers();
  });

  describe('initial data load', () => {
    it('should call getAdminCounts, getActiveGameweek, getLastMatchSync on ionViewWillEnter', async () => {
      await component.ionViewWillEnter();

      expect(mockSupabaseDataService.getAdminCounts).toHaveBeenCalled();
      expect(mockSupabaseDataService.getActiveGameweek).toHaveBeenCalled();
      expect(mockSupabaseDataService.getLastMatchSync).toHaveBeenCalled();
    });

    it('should render totalUsers from getAdminCounts().userCount', async () => {
      await component.ionViewWillEnter();
      fixture.detectChanges();

      expect(component.totalUsers).toBe(2);
      const html = fixture.nativeElement.textContent || '';
      expect(html).toContain('2');
    });

    it('should render totalGroups from getAdminCounts().groupCount', async () => {
      await component.ionViewWillEnter();
      fixture.detectChanges();

      expect(component.totalGroups).toBe(1);
    });

    it('should render activeGameweek number', async () => {
      await component.ionViewWillEnter();
      fixture.detectChanges();

      expect(component.activeGameweekNumber).toBe(7);
      const html = fixture.nativeElement.textContent || '';
      expect(html).toContain('7');
    });

    it('should render last sync timestamp + status pill', async () => {
      await component.ionViewWillEnter();
      fixture.detectChanges();

      expect(component.lastSyncAt).toBe('2026-04-17T10:00:00Z');
      expect(component.lastSyncStatus).toBe('ok');
    });
  });

  describe('sync button visibility', () => {
    it('should show "Sync Matches Now" button when countdown is 0', async () => {
      await component.ionViewWillEnter();
      fixture.detectChanges();

      expect(component.syncCountdownSeconds).toBe(0);
      const html = fixture.nativeElement.textContent || '';
      expect(html).toContain('Sync Matches Now');
    });

    it('should hide button and show "Retry in Ns" when countdown > 0', async () => {
      mockSupabaseDataService.getLastMatchSync.mockResolvedValue({
        ...baseSync,
        cooldownRemainingSeconds: 42,
      });

      await component.ionViewWillEnter();
      fixture.detectChanges();

      expect(component.syncCountdownSeconds).toBe(42);
      const html = fixture.nativeElement.textContent || '';
      expect(html).toContain('Retry in 42s');
      expect(html).not.toContain('Sync Matches Now');
    });
  });

  describe('sync trigger flow', () => {
    it('clicking sync calls triggerMatchSync, shows success toast on { ok: true }, and starts a 30s countdown', async () => {
      jest.useFakeTimers();
      await component.ionViewWillEnter();

      await component.onSyncClick();

      expect(mockSupabaseDataService.triggerMatchSync).toHaveBeenCalled();
      expect(mockToastController.create).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Match data synced successfully' }),
      );
      expect(component.syncCountdownSeconds).toBe(30);

      jest.advanceTimersByTime(1000);
      expect(component.syncCountdownSeconds).toBe(29);
    });

    it('cooldown response starts countdown with server-provided cooldownRemainingSeconds', async () => {
      mockSupabaseDataService.triggerMatchSync.mockResolvedValue({
        ok: false,
        reason: 'cooldown',
        cooldownRemainingSeconds: 180,
      });

      await component.ionViewWillEnter();
      await component.onSyncClick();

      expect(component.syncCountdownSeconds).toBe(180);
      expect(mockToastController.create).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Sync on cooldown — try again in 180s',
        }),
      );
    });

    it('error response shows toast with sanitized reason', async () => {
      mockSupabaseDataService.triggerMatchSync.mockRejectedValue(
        new Error('Network down'),
      );

      await component.ionViewWillEnter();
      await component.onSyncClick();

      expect(mockToastController.create).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Sync failed: Network down',
        }),
      );
    });
  });

  describe('hygiene', () => {
    it('should not import MockDataService', () => {
      const filePath = join(
        __dirname,
        'dashboard.page.ts',
      );
      const source = readFileSync(filePath, 'utf-8');
      expect(source).not.toMatch(/MockDataService/);
      expect(source).not.toMatch(/mock-data\.service/);
    });

    it('clears countdown interval on ngOnDestroy', async () => {
      jest.useFakeTimers();
      const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
      await component.ionViewWillEnter();
      await component.onSyncClick();

      expect(component.syncCountdownSeconds).toBe(30);

      component.ngOnDestroy();

      expect(clearIntervalSpy).toHaveBeenCalled();
      clearIntervalSpy.mockRestore();
    });
  });
});
