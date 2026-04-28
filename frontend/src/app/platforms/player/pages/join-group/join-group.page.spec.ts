import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { JoinGroupPage } from './join-group.page';
import { GroupService } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';
import { createMockRouter } from '../../../../../testing/test-utils';

/**
 * Task 9.1 — Multi-group join CTA.
 *
 * Locks in:
 *  - successful join routes back to /player/standings (so the new group
 *    appears in the player's group list immediately);
 *  - failed join surfaces a toast and does NOT navigate;
 *  - first-login regression: ngOnInit still completes the first-login
 *    handshake when the auth service flags the user as first-time, and
 *    skips it otherwise.
 */
describe('JoinGroupPage (Task 9.1 — multi-group join)', () => {
  let component: JoinGroupPage;
  let fixture: ComponentFixture<JoinGroupPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockGroupService: any;
  let mockAuthService: any;
  let mockToastService: { showToast: jest.Mock };
  let consoleErrorSpy: jest.SpyInstance;

  const stubFoundGroup = {
    id: 'group-1',
    name: 'The Pub League',
    code: 'PUB123',
    memberCount: 4,
    createdAt: new Date('2025-01-01'),
    members: [],
    settings: {},
    adminName: 'Alice',
    leaderboard: [],
  };

  beforeEach(async () => {
    mockRouter = createMockRouter();

    mockGroupService = {
      findGroupByCode: jest.fn().mockResolvedValue(stubFoundGroup),
      joinGroup: jest.fn().mockResolvedValue(stubFoundGroup),
      getUserGroups: jest.fn().mockResolvedValue([]),
    };

    mockAuthService = {
      getCurrentUser: jest.fn().mockReturnValue({ id: 'user-1' }),
      isFirstTimeUser: jest.fn().mockReturnValue(false),
      markFirstLoginComplete: jest.fn().mockResolvedValue(undefined),
    };

    mockToastService = {
      showToast: jest.fn().mockResolvedValue(undefined),
    };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [JoinGroupPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: GroupService, useValue: mockGroupService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ToastService, useValue: mockToastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinGroupPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('confirmJoinGroup() — successful join', () => {
    it('should navigate to /player/standings when groupService.joinGroup resolves', async () => {
      component.foundGroup = stubFoundGroup as any;
      mockGroupService.joinGroup.mockResolvedValue(stubFoundGroup);

      await component.confirmJoinGroup();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/player/standings']);
    });
  });

  describe('confirmJoinGroup() — failed join', () => {
    it('should NOT navigate and should present an error toast when joinGroup rejects', async () => {
      component.foundGroup = stubFoundGroup as any;
      const failure = new Error("You're already in this group");
      mockGroupService.joinGroup.mockRejectedValue(failure);

      await component.confirmJoinGroup();

      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(mockToastService.showToast).toHaveBeenCalledWith(
        "You're already in this group",
        'error'
      );
    });
  });

  describe('ngOnInit() — first-login regression guard', () => {
    it('should call authService.markFirstLoginComplete when isFirstTimeUser is true', async () => {
      mockAuthService.isFirstTimeUser.mockReturnValue(true);

      component.ngOnInit();
      // handleFirstTimeUser is async-fire-and-forget; flush microtasks.
      await Promise.resolve();
      await Promise.resolve();

      expect(mockAuthService.markFirstLoginComplete).toHaveBeenCalled();
    });

    it('should NOT call authService.markFirstLoginComplete when isFirstTimeUser is false', async () => {
      mockAuthService.isFirstTimeUser.mockReturnValue(false);

      component.ngOnInit();
      await Promise.resolve();
      await Promise.resolve();

      expect(mockAuthService.markFirstLoginComplete).not.toHaveBeenCalled();
    });
  });
});
