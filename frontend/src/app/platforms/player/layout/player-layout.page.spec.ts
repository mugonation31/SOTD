import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, provideRouter } from '@angular/router';
import { PlayerLayoutPage } from './player-layout.page';

/**
 * Phase 10 — remove the redundant "Settings" bottom-nav tab from the
 * player layout. Settings remains reachable from the per-page profile
 * icon; this layout should expose only the three primary destinations.
 */
describe('PlayerLayoutPage (Phase 10 — Settings tab removal)', () => {
  let component: PlayerLayoutPage;
  let fixture: ComponentFixture<PlayerLayoutPage>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerLayoutPage],
      providers: [provideRouter([])],
    }).compileComponents();

    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture = TestBed.createComponent(PlayerLayoutPage);
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

  it('should render the home, predictions, and standings tabs with the correct hrefs', () => {
    const home = fixture.debugElement.query(
      By.css('ion-tab-button[tab="home"]')
    );
    const predictions = fixture.debugElement.query(
      By.css('ion-tab-button[tab="predictions"]')
    );
    const standings = fixture.debugElement.query(
      By.css('ion-tab-button[tab="standings"]')
    );

    expect(home).not.toBeNull();
    expect(predictions).not.toBeNull();
    expect(standings).not.toBeNull();

    expect(home.nativeElement.getAttribute('href')).toBe('/player/home');
    expect(predictions.nativeElement.getAttribute('href')).toBe(
      '/player/predictions'
    );
    expect(standings.nativeElement.getAttribute('href')).toBe(
      '/player/standings'
    );
  });
});
