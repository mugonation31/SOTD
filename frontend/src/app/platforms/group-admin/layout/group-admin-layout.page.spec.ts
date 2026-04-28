import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, provideRouter } from '@angular/router';
import { GroupAdminLayoutPage } from './group-admin-layout.page';

/**
 * Phase 10 — remove the redundant "Settings" bottom-nav tab from the
 * group-admin layout. Settings stays reachable via the header profile
 * icon, so we lock that invariant in alongside the tab removal.
 */
describe('GroupAdminLayoutPage (Phase 10 — Settings tab removal)', () => {
  let component: GroupAdminLayoutPage;
  let fixture: ComponentFixture<GroupAdminLayoutPage>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupAdminLayoutPage],
      providers: [provideRouter([])],
    }).compileComponents();

    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture = TestBed.createComponent(GroupAdminLayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render exactly 3 bottom-nav tabs', () => {
    const tabButtons = fixture.debugElement.queryAll(By.css('ion-tab-button'));
    expect(tabButtons.length).toBe(3);
  });

  it('should NOT render a Settings tab', () => {
    const settingsTab = fixture.debugElement.query(
      By.css('ion-tab-button[tab="settings"]')
    );
    expect(settingsTab).toBeNull();
  });

  it('should render the home, predictions, and group tabs', () => {
    const home = fixture.debugElement.query(
      By.css('ion-tab-button[tab="home"]')
    );
    const predictions = fixture.debugElement.query(
      By.css('ion-tab-button[tab="predictions"]')
    );
    const group = fixture.debugElement.query(
      By.css('ion-tab-button[tab="group"]')
    );

    expect(home).not.toBeNull();
    expect(predictions).not.toBeNull();
    expect(group).not.toBeNull();
  });

  it('should navigate to /group-admin/settings when the header profile icon is clicked', () => {
    const headerEndButtons = fixture.debugElement.queryAll(
      By.css('ion-buttons[slot="end"] ion-button')
    );
    expect(headerEndButtons.length).toBeGreaterThan(0);

    headerEndButtons[0].nativeElement.click();

    expect(router.navigate).toHaveBeenCalledWith(
      ['/group-admin/settings'],
      expect.objectContaining({ replaceUrl: true })
    );
  });
});
