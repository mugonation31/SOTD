import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { GroupAdminHomePage } from './home.page';
import { GroupService } from '@core/services/group.service';
import { SupabaseDataService } from '@core/services/supabase-data.service';
import { AuthService } from '@core/services/auth.service';
import { LoggerService } from '@core/services/logger.service';

describe('GroupAdminHomePage', () => {
  let component: GroupAdminHomePage;
  let fixture: ComponentFixture<GroupAdminHomePage>;

  const mockRouter = { navigate: jest.fn() };
  const mockGroupService = {
    getAdminGroups: jest.fn().mockResolvedValue([]),
    getUserGroupsWithStandings: jest.fn().mockResolvedValue([]),
  };
  const mockSupabaseDataService = {
    getGameweeks: jest.fn().mockResolvedValue([]),
    getPredictions: jest.fn().mockResolvedValue([]),
  };
  const mockAuthService = {
    getCurrentUser: jest.fn().mockReturnValue({ id: 'user-1' }),
  };
  const mockLogger = {
    error: jest.fn(),
    warn: jest.fn(),
  };
  const mockToast = { present: jest.fn().mockResolvedValue(undefined) };
  const mockToastController = {
    create: jest.fn().mockResolvedValue(mockToast),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    // Default: getAdminGroups returns empty so load() redirects early
    // without further async calls. Tests that need specific behaviour
    // override this mock before calling TestBed.createComponent.
    mockGroupService.getAdminGroups.mockResolvedValue([]);

    await TestBed.configureTestingModule({
      imports: [GroupAdminHomePage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: GroupService, useValue: mockGroupService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: LoggerService, useValue: mockLogger },
        { provide: ToastController, useValue: mockToastController },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupAdminHomePage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // -------------------------------------------------------------------------
  // Task 10.4 — skeleton loading state
  // -------------------------------------------------------------------------
  describe('Task 10.4 — skeleton loading state', () => {
    const skeletonSelector = '[data-testid="home-skeleton"]';
    const skeletonTextSelector = 'ion-skeleton-text';
    const spinnerSelector = 'ion-spinner';

    it('should show skeleton container when isLoading is true', () => {
      component.isLoading = true;
      fixture.detectChanges();

      const skeleton = fixture.nativeElement.querySelector(skeletonSelector);
      expect(skeleton).not.toBeNull();
    });

    it('should contain ion-skeleton-text elements when isLoading is true', () => {
      component.isLoading = true;
      fixture.detectChanges();

      const skeletonText = fixture.nativeElement.querySelector(skeletonTextSelector);
      expect(skeletonText).not.toBeNull();
    });

    it('should NOT render ion-spinner when isLoading is true', () => {
      component.isLoading = true;
      fixture.detectChanges();

      const spinner = fixture.nativeElement.querySelector(spinnerSelector);
      expect(spinner).toBeNull();
    });
  });
});
