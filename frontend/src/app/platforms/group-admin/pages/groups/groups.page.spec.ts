import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular/standalone';
import { GroupsPage } from './groups.page';
import { GroupService } from '@core/services/group.service';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';
import { LoggerService } from '@core/services/logger.service';
import { createMockRouter, createMockToastService } from '../../../../../testing/test-utils';

describe('GroupsPage (group-admin) — Task 4.2.4.2 loading spinner', () => {
  let mockRouter: ReturnType<typeof createMockRouter>;
  let mockGroupService: any;
  let mockToastService: ReturnType<typeof createMockToastService>;
  let mockAuthService: any;
  let mockAlertController: any;

  beforeEach(async () => {
    mockRouter = createMockRouter();
    mockToastService = createMockToastService();

    mockGroupService = {
      getAdminGroups: jest.fn().mockResolvedValue([]),
      createGroup: jest.fn(),
    };

    mockAuthService = {
      getCurrentUser: jest.fn().mockReturnValue({
        id: 'admin-1',
        email: 'admin@test.com',
        username: 'admin',
        firstName: 'Admin',
        lastName: 'User',
      }),
      isFirstTimeUser: jest.fn().mockReturnValue(false),
      markFirstLoginComplete: jest.fn().mockResolvedValue(undefined),
      currentUser: { subscribe: jest.fn() },
    };

    mockAlertController = {
      create: jest.fn().mockResolvedValue({
        present: jest.fn(),
        onDidDismiss: jest.fn().mockResolvedValue({ role: 'cancel' }),
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
  });

  it('Task 4.2.4.2 — renders a visible loading spinner while admin groups are being fetched and hides it after', async () => {
    let resolveFetch!: (value: any[]) => void;
    mockGroupService.getAdminGroups.mockReturnValue(
      new Promise<any[]>((resolve) => {
        resolveFetch = resolve;
      }),
    );

    const fixture = TestBed.createComponent(GroupsPage);
    const component = fixture.componentInstance;

    // First detectChanges triggers ngOnInit which kicks off the async fetch
    fixture.detectChanges();

    expect(component.isLoading).toBe(true);
    const hostEl: HTMLElement = fixture.nativeElement;
    const spinnerDuringLoad = hostEl.querySelector('.loading-state ion-spinner');
    expect(spinnerDuringLoad).not.toBeNull();

    resolveFetch([]);
    // Flush microtasks so the async loadGroups resolves.
    await new Promise((resolve) => setTimeout(resolve, 0));
    fixture.detectChanges();

    expect(component.isLoading).toBe(false);
    const spinnerAfterLoad = hostEl.querySelector('.loading-state ion-spinner');
    expect(spinnerAfterLoad).toBeNull();
  });
});
