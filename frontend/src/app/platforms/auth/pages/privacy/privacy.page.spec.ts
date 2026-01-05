import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PrivacyPage } from './privacy.page';
import { createMockRouter } from '../../../../../testing/test-utils';

describe('PrivacyPage', () => {
  let component: PrivacyPage;
  let fixture: ComponentFixture<PrivacyPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;

  beforeEach(async () => {
    mockRouter = createMockRouter();

    await TestBed.configureTestingModule({
      imports: [PrivacyPage],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have lastUpdated date', () => {
    expect(component.lastUpdated).toBe('2026-01-04');
  });

  it('should navigate back to signup when goBack is called', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/signup']);
  });

  it('should render the page title', () => {
    const compiled = fixture.nativeElement;
    const title = compiled.querySelector('ion-title');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Privacy Policy');
  });

  it('should render the card title', () => {
    const compiled = fixture.nativeElement;
    const cardTitle = compiled.querySelector('ion-card-title');
    expect(cardTitle).toBeTruthy();
    expect(cardTitle.textContent).toContain('Predict3 Privacy Policy');
  });

  it('should render all 15 sections', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('.privacy-content section');
    expect(sections.length).toBe(15);
  });

  it('should have GDPR-related content', () => {
    const compiled = fixture.nativeElement;
    const content = compiled.textContent;
    expect(content).toContain('GDPR');
    expect(content).toContain('Data Controller');
    expect(content).toContain('Right to Access');
  });

  it('should have contact information', () => {
    const compiled = fixture.nativeElement;
    const content = compiled.textContent;
    expect(content).toContain('privacy@predict3.app');
  });

  it('should have a back button', () => {
    const compiled = fixture.nativeElement;
    const backButtons = compiled.querySelectorAll('ion-button');
    expect(backButtons.length).toBeGreaterThan(0);
  });
});
