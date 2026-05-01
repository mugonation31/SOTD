import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular/standalone';
import { GroupAdminGroupPage } from './group.page';
import { GroupService } from '@core/services/group.service';
import { SupabaseDataService } from '@core/services/supabase-data.service';
import { AuthService } from '@core/services/auth.service';
import { LoggerService } from '@core/services/logger.service';

describe('GroupAdminGroupPage', () => {
  let component: GroupAdminGroupPage;
  let fixture: ComponentFixture<GroupAdminGroupPage>;

  const mockRouter = { navigate: jest.fn() };
  const mockGroupService = {
    getAdminGroups: jest.fn().mockResolvedValue([]),
    getUserGroupsWithStandings: jest.fn().mockResolvedValue([]),
    createGroup: jest.fn().mockResolvedValue({}),
  };
  const mockSupabaseDataService = {
    promoteMemberToAdmin: jest.fn().mockResolvedValue(undefined),
    demoteAdminToMember: jest.fn().mockResolvedValue(undefined),
  };
  const mockAuthService = {
    getCurrentUser: jest.fn().mockReturnValue({ id: 'user-1' }),
    markFirstLoginComplete: jest.fn().mockResolvedValue(undefined),
  };
  const mockLogger = {
    error: jest.fn(),
    warn: jest.fn(),
  };
  const mockToast = { present: jest.fn().mockResolvedValue(undefined) };
  const mockToastController = {
    create: jest.fn().mockResolvedValue(mockToast),
  };
  const mockAlert = {
    present: jest.fn().mockResolvedValue(undefined),
    onDidDismiss: jest.fn().mockResolvedValue({ role: 'cancel' }),
  };
  const mockAlertController = {
    create: jest.fn().mockResolvedValue(mockAlert),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    mockGroupService.getAdminGroups.mockResolvedValue([]);

    await TestBed.configureTestingModule({
      imports: [GroupAdminGroupPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: GroupService, useValue: mockGroupService },
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: LoggerService, useValue: mockLogger },
        { provide: AlertController, useValue: mockAlertController },
        { provide: ToastController, useValue: mockToastController },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupAdminGroupPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // -------------------------------------------------------------------------
  // Task 10.4 — skeleton loading state
  // -------------------------------------------------------------------------
  describe('Task 10.4 — skeleton loading state', () => {
    const skeletonSelector = '[data-testid="group-skeleton"]';
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
