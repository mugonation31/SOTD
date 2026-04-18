import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { SuperAdminLayoutPage } from './super-admin-layout.page';
import { AuthService } from '@core/services/auth.service';
import { createMockAuthService } from '../../../../testing/test-utils';

describe('SuperAdminLayoutPage (Task 4.0.4 — simplified 2-tab layout + logout)', () => {
  let component: SuperAdminLayoutPage;
  let fixture: ComponentFixture<SuperAdminLayoutPage>;
  let router: Router;
  let mockAuthService: ReturnType<typeof createMockAuthService>;

  beforeEach(async () => {
    mockAuthService = createMockAuthService();

    await TestBed.configureTestingModule({
      imports: [SuperAdminLayoutPage],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture = TestBed.createComponent(SuperAdminLayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render exactly 2 tab buttons (Dashboard + Users & Groups)', () => {
    const tabButtons = fixture.nativeElement.querySelectorAll('ion-tab-button');
    expect(tabButtons.length).toBe(2);

    const labels = Array.from(tabButtons).map((btn: any) =>
      btn.querySelector('ion-label')?.textContent?.trim()
    );
    expect(labels).toEqual(['Dashboard', 'Users & Groups']);
  });

  it('should not render Metrics, Predictions, Groups (standalone), or Settings tab buttons', () => {
    const tabButtons = Array.from(
      fixture.nativeElement.querySelectorAll('ion-tab-button')
    ) as HTMLElement[];
    const tabAttrs = tabButtons.map((btn) => btn.getAttribute('tab'));

    expect(tabAttrs).not.toContain('metrics');
    expect(tabAttrs).not.toContain('predictions');
    expect(tabAttrs).not.toContain('groups');
    expect(tabAttrs).not.toContain('settings');
  });

  it('should render a logout button in the header with the log-out-outline icon', () => {
    const logoutIcon = fixture.nativeElement.querySelector(
      'ion-icon[name="log-out-outline"]'
    );
    expect(logoutIcon).toBeTruthy();
  });

  it('should call authService.logout() and navigate to /auth/login when logout is invoked', async () => {
    await component.logout();

    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should point the two tab buttons at /super-admin/dashboard and /super-admin/users-groups', () => {
    const tabButtons = Array.from(
      fixture.nativeElement.querySelectorAll('ion-tab-button')
    ) as HTMLElement[];
    const hrefs = tabButtons.map((btn) => btn.getAttribute('href'));

    expect(hrefs).toContain('/super-admin/dashboard');
    expect(hrefs).toContain('/super-admin/users-groups');
  });
});
