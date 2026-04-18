import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertController, ToastController } from '@ionic/angular/standalone';
import { UsersGroupsPage } from './users-groups.page';
import { SupabaseDataService } from '@core/services/supabase-data.service';
import { SupabaseService } from '../../../../services/supabase.service';

/**
 * Reuses the alert-mock pattern from `matches.page.spec.ts` (Task 3.4.4).
 * `alertController.create(...)` returns a Promise<HTMLIonAlertElement>;
 * the resolved object exposes `.present()` and `.onDidDismiss()`.
 * Tests drive the dialog's outcome by stubbing the value resolved by
 * `onDidDismiss`, mirroring an admin clicking "Confirm" or "Cancel".
 */
function createMockAlertController(dismissRole: string = 'confirm') {
  const present = jest.fn().mockResolvedValue(undefined);
  const onDidDismiss = jest.fn().mockResolvedValue({ role: dismissRole });
  const alertInstance = { present, onDidDismiss };
  const create = jest.fn().mockResolvedValue(alertInstance);
  return { create, alertInstance, present, onDidDismiss };
}

describe('UsersGroupsPage (Task 4.0.9 — combined Users + Groups admin page)', () => {
  let component: UsersGroupsPage;
  let fixture: ComponentFixture<UsersGroupsPage>;
  let mockSupabaseDataService: {
    getAllUsers: jest.Mock;
    getAllGroups: jest.Mock;
    toggleUserActive: jest.Mock;
    deleteGroup: jest.Mock;
    signOutUser: jest.Mock;
  };
  let mockToast: { present: jest.Mock };
  let mockToastController: { create: jest.Mock };
  let mockAlertController: ReturnType<typeof createMockAlertController>;
  let consoleErrorSpy: jest.SpyInstance;

  /**
   * Re-built fresh in `beforeEach` so per-test mutations (e.g. flipping
   * `is_active`) don't bleed between tests via shared object refs.
   */
  let baseUsers: Array<{
    id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    role: string;
    is_active: boolean;
    created_at: string;
  }>;
  let baseGroups: Array<{
    id: string;
    name: string;
    code: string;
    admin_id: string;
    current_members: number;
    max_members: number;
    is_active: boolean;
    created_at: string;
  }>;

  const buildFixtures = () => {
    baseUsers = [
      {
        id: 'u1',
        email: 'alice@example.com',
        username: 'alice',
        first_name: 'Alice',
        last_name: 'A',
        role: 'player',
        is_active: true,
        created_at: '2026-04-01T00:00:00Z',
      },
      {
        id: 'u2',
        email: 'bob@example.com',
        username: 'bob',
        first_name: 'Bob',
        last_name: 'B',
        role: 'group_admin',
        is_active: true,
        created_at: '2026-04-02T00:00:00Z',
      },
    ];
    baseGroups = [
      {
        id: 'g1',
        name: 'Group One',
        code: 'AAA111',
        admin_id: 'u1',
        current_members: 3,
        max_members: 50,
        is_active: true,
        created_at: '2026-04-01T00:00:00Z',
      },
      {
        id: 'g2',
        name: 'Group Two',
        code: 'BBB222',
        admin_id: 'u2',
        current_members: 5,
        max_members: 50,
        is_active: true,
        created_at: '2026-04-02T00:00:00Z',
      },
    ];
  };

  const buildMocks = (alertRole: string = 'confirm') => {
    mockSupabaseDataService = {
      getAllUsers: jest.fn().mockResolvedValue(baseUsers),
      getAllGroups: jest.fn().mockResolvedValue(baseGroups),
      toggleUserActive: jest.fn().mockResolvedValue(undefined),
      deleteGroup: jest.fn().mockResolvedValue(undefined),
      signOutUser: jest.fn().mockResolvedValue({ ok: true }),
    };
    mockToast = { present: jest.fn().mockResolvedValue(undefined) };
    mockToastController = {
      create: jest.fn().mockResolvedValue(mockToast),
    };
    mockAlertController = createMockAlertController(alertRole);
  };

  const configureModule = async (currentUserId: string | null = 'admin-xyz') => {
    const mockSupabaseService = {
      currentProfile: currentUserId ? { id: currentUserId } : null,
    };
    await TestBed.configureTestingModule({
      imports: [UsersGroupsPage],
      providers: [
        { provide: SupabaseDataService, useValue: mockSupabaseDataService },
        { provide: ToastController, useValue: mockToastController },
        { provide: AlertController, useValue: mockAlertController },
        { provide: SupabaseService, useValue: mockSupabaseService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(UsersGroupsPage);
    component = fixture.componentInstance;
  };

  beforeEach(async () => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    buildFixtures();
    buildMocks('confirm');
    await configureModule();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.restoreAllMocks();
  });

  // -------------------------------------------------------------------------
  // 1. Component creation
  // -------------------------------------------------------------------------
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // -------------------------------------------------------------------------
  // 2. Initial parallel fetch
  // -------------------------------------------------------------------------
  it('should call getAllUsers and getAllGroups in parallel on ionViewWillEnter', async () => {
    await component.ionViewWillEnter();

    expect(mockSupabaseDataService.getAllUsers).toHaveBeenCalledTimes(1);
    expect(mockSupabaseDataService.getAllGroups).toHaveBeenCalledTimes(1);
  });

  // -------------------------------------------------------------------------
  // 3. Default segment is "users"
  // -------------------------------------------------------------------------
  it('should default to the "users" segment', async () => {
    await component.ionViewWillEnter();
    fixture.detectChanges();

    expect(component.activeSegment).toBe('users');
  });

  // -------------------------------------------------------------------------
  // 4. Renders users count + list items
  // -------------------------------------------------------------------------
  it('should render every user from getAllUsers in the users list', async () => {
    await component.ionViewWillEnter();
    fixture.detectChanges();

    expect(component.users.length).toBe(2);
    const html = fixture.nativeElement.textContent || '';
    expect(html).toContain('alice@example.com');
    expect(html).toContain('bob@example.com');
  });

  // -------------------------------------------------------------------------
  // 5. Renders groups count when on groups segment
  // -------------------------------------------------------------------------
  it('should render every group from getAllGroups when on the groups segment', async () => {
    await component.ionViewWillEnter();
    component.activeSegment = 'groups';
    fixture.detectChanges();

    expect(component.groups.length).toBe(2);
    const html = fixture.nativeElement.textContent || '';
    expect(html).toContain('Group One');
    expect(html).toContain('Group Two');
  });

  // -------------------------------------------------------------------------
  // 6. Switching segment to groups
  // -------------------------------------------------------------------------
  it('should switch the active segment to "groups" when onSegmentChanged is called with groups', async () => {
    await component.ionViewWillEnter();

    component.onSegmentChanged({ detail: { value: 'groups' } } as any);

    expect(component.activeSegment).toBe('groups');
  });

  // -------------------------------------------------------------------------
  // 7. Empty state for users
  // -------------------------------------------------------------------------
  it('should show "No users found" empty state when users list is empty', async () => {
    mockSupabaseDataService.getAllUsers.mockResolvedValue([]);

    await component.ionViewWillEnter();
    fixture.detectChanges();

    const html = fixture.nativeElement.textContent || '';
    expect(html).toContain('No users found');
  });

  // -------------------------------------------------------------------------
  // 8. Empty state for groups
  // -------------------------------------------------------------------------
  it('should show "No groups found" empty state when groups list is empty', async () => {
    mockSupabaseDataService.getAllGroups.mockResolvedValue([]);

    await component.ionViewWillEnter();
    component.activeSegment = 'groups';
    fixture.detectChanges();

    const html = fixture.nativeElement.textContent || '';
    expect(html).toContain('No groups found');
  });

  // -------------------------------------------------------------------------
  // 9. Toggling a user OFF calls toggleUserActive(id, false) AND signOutUser(id)
  // -------------------------------------------------------------------------
  it('toggling a user OFF should call toggleUserActive(id, false) AND signOutUser(id)', async () => {
    await component.ionViewWillEnter();

    // u1 is currently active=true; toggling means new value=false
    await component.onUserToggle(baseUsers[0]);

    expect(mockSupabaseDataService.toggleUserActive).toHaveBeenCalledWith(
      'u1',
      false,
    );
    expect(mockSupabaseDataService.signOutUser).toHaveBeenCalledWith('u1');
  });

  // -------------------------------------------------------------------------
  // 10. Toggling a user ON calls toggleUserActive(id, true) only
  // -------------------------------------------------------------------------
  it('toggling a user ON should call toggleUserActive(id, true) but NOT signOutUser', async () => {
    const inactiveUser = { ...baseUsers[0], is_active: false };
    mockSupabaseDataService.getAllUsers.mockResolvedValue([
      inactiveUser,
      baseUsers[1],
    ]);

    await component.ionViewWillEnter();
    await component.onUserToggle(inactiveUser);

    expect(mockSupabaseDataService.toggleUserActive).toHaveBeenCalledWith(
      'u1',
      true,
    );
    expect(mockSupabaseDataService.signOutUser).not.toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------
  // 11. Deactivation success shows confirmation toast
  // -------------------------------------------------------------------------
  it('should show success toast after a successful deactivate + signout', async () => {
    await component.ionViewWillEnter();

    await component.onUserToggle(baseUsers[0]);

    expect(mockToastController.create).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining('deactivated'),
      }),
    );
  });

  // -------------------------------------------------------------------------
  // 12. Delete group opens AlertController; on confirm calls deleteGroup
  // -------------------------------------------------------------------------
  it('delete group opens AlertController confirm; on confirm calls deleteGroup', async () => {
    await component.ionViewWillEnter();

    await component.onDeleteGroup(baseGroups[0]);

    expect(mockAlertController.create).toHaveBeenCalledTimes(1);
    const arg = mockAlertController.create.mock.calls[0][0];
    expect(arg.message).toContain('cannot be undone');
    expect(arg.buttons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ role: 'cancel' }),
        expect.objectContaining({ role: 'confirm' }),
      ]),
    );
    expect(mockSupabaseDataService.deleteGroup).toHaveBeenCalledWith('g1');
  });

  it('delete group on cancel does NOT call deleteGroup', async () => {
    // Re-build with a "cancel" alert
    buildMocks('cancel');
    await TestBed.resetTestingModule();
    await configureModule();

    await component.ionViewWillEnter();

    await component.onDeleteGroup(baseGroups[0]);

    expect(mockAlertController.create).toHaveBeenCalledTimes(1);
    expect(mockSupabaseDataService.deleteGroup).not.toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------
  // 13. Delete success refreshes the list
  // -------------------------------------------------------------------------
  it('delete group success refreshes the groups list', async () => {
    await component.ionViewWillEnter();
    expect(mockSupabaseDataService.getAllGroups).toHaveBeenCalledTimes(1);

    await component.onDeleteGroup(baseGroups[0]);

    // refresh = a second getAllGroups call
    expect(mockSupabaseDataService.getAllGroups).toHaveBeenCalledTimes(2);
  });

  // -------------------------------------------------------------------------
  // 14. toggleUserActive rejection shows error toast, row state unchanged
  // -------------------------------------------------------------------------
  it('toggleUserActive rejection shows error toast and leaves is_active unchanged', async () => {
    mockSupabaseDataService.toggleUserActive.mockRejectedValue(
      new Error('RLS denied'),
    );

    await component.ionViewWillEnter();
    const userBefore = { ...component.users[0] };

    await component.onUserToggle(component.users[0]);

    expect(mockToastController.create).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringMatching(/(failed|error)/i),
      }),
    );
    expect(mockSupabaseDataService.signOutUser).not.toHaveBeenCalled();
    // Row state should not have flipped — local `is_active` is unchanged
    expect(component.users[0].is_active).toBe(userBefore.is_active);
  });

  // -------------------------------------------------------------------------
  // 15. signOutUser rejection: warning toast, but is_active stays flipped
  //     (toggle already persisted)
  // -------------------------------------------------------------------------
  it('signOutUser rejection shows warning toast but keeps is_active flipped', async () => {
    mockSupabaseDataService.signOutUser.mockRejectedValue(
      new Error('Edge Function timeout'),
    );

    await component.ionViewWillEnter();

    // u1 starts active=true → toggle deactivates it
    await component.onUserToggle(component.users[0]);

    expect(mockSupabaseDataService.toggleUserActive).toHaveBeenCalledWith(
      'u1',
      false,
    );
    expect(mockSupabaseDataService.signOutUser).toHaveBeenCalledWith('u1');

    // Warning toast surfaced
    expect(mockToastController.create).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringMatching(/session not terminated|may still be active/i),
      }),
    );

    // is_active is already persisted server-side — UI must reflect the flip
    expect(component.users[0].is_active).toBe(false);
  });

  it('blocks a super-admin from deactivating their own account', async () => {
    // Re-configure with the current user id matching u1 so the self-guard fires
    TestBed.resetTestingModule();
    await configureModule('u1');

    await component.ionViewWillEnter();

    // u1 starts active=true → would-be deactivation
    await component.onUserToggle(component.users[0]);

    expect(mockSupabaseDataService.toggleUserActive).not.toHaveBeenCalled();
    expect(mockSupabaseDataService.signOutUser).not.toHaveBeenCalled();
    expect(mockToastController.create).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringMatching(/cannot deactivate your own account/i),
      }),
    );
  });
});
