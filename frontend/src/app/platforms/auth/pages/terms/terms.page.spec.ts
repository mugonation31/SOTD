import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TermsPage } from './terms.page';
import { createMockRouter } from '../../../../../testing/test-utils';

describe('TermsPage', () => {
  let component: TermsPage;
  let fixture: ComponentFixture<TermsPage>;
  let mockRouter: ReturnType<typeof createMockRouter>;

  beforeEach(async () => {
    mockRouter = createMockRouter();

    await TestBed.configureTestingModule({
      imports: [TermsPage],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TermsPage);
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
    expect(title.textContent).toContain('Terms');
  });

  it('should render the card title', () => {
    const compiled = fixture.nativeElement;
    const cardTitle = compiled.querySelector('ion-card-title');
    expect(cardTitle).toBeTruthy();
    expect(cardTitle.textContent).toContain('Predict3 Terms and Conditions');
  });

  it('should render all 15 sections', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('.terms-content section');
    expect(sections.length).toBe(15);
  });

  it('should have a back button', () => {
    const compiled = fixture.nativeElement;
    const backButtons = compiled.querySelectorAll('ion-button');
    expect(backButtons.length).toBeGreaterThan(0);
  });
});
