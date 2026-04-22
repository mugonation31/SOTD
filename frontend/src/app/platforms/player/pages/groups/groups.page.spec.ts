import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular/standalone';
import { GroupsPage } from './groups.page';
import { GroupService } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';
import { LoggerService } from '@core/services/logger.service';
import { createMockRouter, createMockToastService } from '../../../../../testing/test-utils';

describe('GroupsPage', () => {
  let component: GroupsPage;
  let fixture: ComponentFixture<GroupsPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockGroupService: any;
  let mockToastService: ReturnType<typeof createMockToastService>;
  let mockAuthService: any;
  let mockAlertController: any;

  beforeEach(async () => {
    mockRouter = createMockRouter();
    mockToastService = createMockToastService();

    mockGroupService = {
      getUserGroups: jest.fn().mockResolvedValue([]),
      findGroupByCode: jest.fn(),
      joinGroup: jest.fn(),
      leaveGroup: jest.fn(),
    };

    mockAuthService = {
      getCurrentUser: jest.fn().mockReturnValue({ id: 'user-1', email: 'test@test.com' }),
      currentUser: { subscribe: jest.fn() },
    };

    mockAlertController = {
      create: jest.fn().mockResolvedValue({
        present: jest.fn(),
        onDidDismiss: jest.fn().mockResolvedValue({ role: 'confirm' }),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [GroupsPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: GroupService, useValue: mockGroupService },
        { provide: ToastService, useValue: mockToastService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: AlertController, useValue: mockAlertController },
        { provide: LoggerService, useValue: { error: jest.fn(), warn: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a leaveGroup method', () => {
    expect(typeof component.leaveGroup).toBe('function');
  });

  const createTestGroup = () => ({
    id: 'g1', name: 'Test Group', code: 'ABC123', admin_id: 'other-user',
    adminName: 'admin', memberCount: 5, members: [] as any[], createdAt: new Date(),
  });

  it('should show confirmation dialog when leaveGroup is called', async () => {
    const group = createTestGroup();

    await component.leaveGroup(group);

    expect(mockAlertController.create).toHaveBeenCalledWith(
      expect.objectContaining({
        header: 'Leave Group',
        message: expect.stringContaining('Test Group'),
      })
    );
  });

  it('should call groupService.leaveGroup on confirm', async () => {
    const group = createTestGroup();
    mockGroupService.leaveGroup.mockResolvedValue(undefined);

    await component.leaveGroup(group);

    expect(mockGroupService.leaveGroup).toHaveBeenCalledWith('g1');
  });

  it('should show success toast after leaving', async () => {
    const group = createTestGroup();
    mockGroupService.leaveGroup.mockResolvedValue(undefined);

    await component.leaveGroup(group);

    expect(mockToastService.showToast).toHaveBeenCalledWith(
      expect.stringContaining('Test Group'),
      'success'
    );
  });

  it('should reload groups after leaving', async () => {
    const group = createTestGroup();
    mockGroupService.leaveGroup.mockResolvedValue(undefined);
    // getUserGroups is called once on init, clear that call
    mockGroupService.getUserGroups.mockClear();
    const updatedGroups = [{ id: 'g2', name: 'Other Group' }];
    mockGroupService.getUserGroups.mockResolvedValue(updatedGroups);

    await component.leaveGroup(group);

    expect(mockGroupService.getUserGroups).toHaveBeenCalled();
  });

  it('should show error toast if leave fails', async () => {
    const group = createTestGroup();
    mockGroupService.leaveGroup.mockRejectedValue(new Error('Network error'));

    await component.leaveGroup(group);

    expect(mockToastService.showToast).toHaveBeenCalledWith(
      'Failed to leave group. Please try again.',
      'error'
    );
  });

  it('should not show leave button for groups where user is admin', async () => {
    const adminGroup = { ...createTestGroup(), admin_id: 'user-1' };
    const memberGroup = { ...createTestGroup(), id: 'g2', name: 'Member Group', admin_id: 'other-user' };

    // Set up groups before creating component so ngOnInit loads them
    mockGroupService.getUserGroups.mockResolvedValue([adminGroup, memberGroup]);
    const testFixture = TestBed.createComponent(GroupsPage);
    // Initial render triggers ngOnInit -> loadUserGroups
    testFixture.detectChanges();
    // Flush microtasks so the async loadUserGroups resolves
    await new Promise(resolve => setTimeout(resolve, 0));
    // Now component.myGroups is populated; re-render
    // Override getUserPosition to avoid ExpressionChangedAfterItHasBeenCheckedError
    testFixture.componentInstance.getUserPosition = () => 1;
    testFixture.detectChanges();

    const leaveButtons = testFixture.nativeElement.querySelectorAll('.leave-group-btn');
    expect(leaveButtons.length).toBe(1);
  });

  it('Task 4.2.4.2 — renders a visible loading spinner while groups are being fetched and hides it after', async () => {
    let resolveFetch!: (value: any[]) => void;
    mockGroupService.getUserGroups.mockReturnValue(
      new Promise<any[]>((resolve) => {
        resolveFetch = resolve;
      }),
    );

    const testFixture = TestBed.createComponent(GroupsPage);
    const testComponent = testFixture.componentInstance;

    // Trigger ngOnInit (which kicks off the async fetch) and render once.
    testFixture.detectChanges();

    expect(testComponent.isLoading).toBe(true);
    const hostEl: HTMLElement = testFixture.nativeElement;
    const spinnerDuringLoad = hostEl.querySelector('.loading-state ion-spinner');
    expect(spinnerDuringLoad).not.toBeNull();

    resolveFetch([]);
    // Flush microtasks so the async loadUserGroups resolves.
    await new Promise((resolve) => setTimeout(resolve, 0));
    testFixture.detectChanges();

    expect(testComponent.isLoading).toBe(false);
    const spinnerAfterLoad = hostEl.querySelector('.loading-state ion-spinner');
    expect(spinnerAfterLoad).toBeNull();
  });
});
