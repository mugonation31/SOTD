import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { JoinGroupPage } from './join-group.page';
import { GroupService } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';
import { createMockRouter } from '../../../../../testing/test-utils';

/**
 * Task 9.1 — Multi-group join CTA.
 * Phase 12.1 (H3) — first-login flag must NOT flip on page load.
 *
 * Locks in:
 *  - successful join routes back to /player/standings (so the new group
 *    appears in the player's group list immediately);
 *  - failed join surfaces a toast and does NOT navigate;
 *  - first-login flag is flipped inside confirmJoinGroup() ONLY after a
 *    successful join — never on ngOnInit, never on a failed join. This
 *    prevents a first-time user who bounces from /player/join-group
 *    (closes tab, network drops) from being stranded with first_login=false
 *    and no group on next login.
 *
 * Phase 12.1 spec restructure note:
 *  The original Phase 9.1 ngOnInit specs asserted that markFirstLoginComplete
 *  fired on ngOnInit. That asserted the BUGGY behavior we're fixing here —
 *  not a kept behavior whose assertion we're tweaking. Per TDD rules we
 *  must not modify assertions for kept behavior, but we MAY restructure
 *  tests when we are intentionally changing behavior. The two ngOnInit
 *  specs from Phase 9.1 ("should call markFirstLoginComplete when
 *  isFirstTimeUser is true" and "should NOT call ... when false") have
 *  been replaced with the correct-behavior specs in this file.
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

    it('should call authService.markFirstLoginComplete exactly once when isFirstTimeUser is true', async () => {
      // Phase 12.1 (H3): the flip happens here — after a real join succeeds —
      // not on page load. Mirrors group-admin/pages/group/group.page.ts:215.
      component.foundGroup = stubFoundGroup as any;
      mockGroupService.joinGroup.mockResolvedValue(stubFoundGroup);
      mockAuthService.isFirstTimeUser.mockReturnValue(true);

      await component.confirmJoinGroup();

      expect(mockAuthService.markFirstLoginComplete).toHaveBeenCalledTimes(1);
    });

    it('should NOT call authService.markFirstLoginComplete when isFirstTimeUser is false (returning user joining additional group)', async () => {
      // A returning player who is joining an additional group already had
      // first_login=false long ago — no need to re-flip it.
      component.foundGroup = stubFoundGroup as any;
      mockGroupService.joinGroup.mockResolvedValue(stubFoundGroup);
      mockAuthService.isFirstTimeUser.mockReturnValue(false);

      await component.confirmJoinGroup();

      expect(mockAuthService.markFirstLoginComplete).not.toHaveBeenCalled();
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

    it('should NOT call authService.markFirstLoginComplete when joinGroup rejects (only flip on real success)', async () => {
      // Phase 12.1 (H3): if the join itself fails, the user has not actually
      // joined a group — flipping first_login=false here would strand them
      // exactly the same way the original ngOnInit bug did.
      component.foundGroup = stubFoundGroup as any;
      mockAuthService.isFirstTimeUser.mockReturnValue(true);
      mockGroupService.joinGroup.mockRejectedValue(
        new Error('Network error')
      );

      await component.confirmJoinGroup();

      expect(mockAuthService.markFirstLoginComplete).not.toHaveBeenCalled();
    });
  });

  describe('ngOnInit() — Phase 12.1 (H3) regression guard', () => {
    it('should NOT call authService.markFirstLoginComplete on page load even when isFirstTimeUser is true', async () => {
      // H3 fix: a first-time user landing on /player/join-group must not have
      // their first_login flag flipped just because the page rendered. If they
      // bounce (close tab, network drop) before joining, they would otherwise
      // be stranded with first_login=false and no group on next login.
      mockAuthService.isFirstTimeUser.mockReturnValue(true);

      component.ngOnInit();
      // Flush any fire-and-forget microtasks that previous (buggy)
      // implementations might have queued.
      await Promise.resolve();
      await Promise.resolve();

      expect(mockAuthService.markFirstLoginComplete).not.toHaveBeenCalled();
    });
  });
});
