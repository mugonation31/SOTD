import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailConfirmedPage } from './email-confirmed.page';

describe('EmailConfirmedPage', () => {
  let component: EmailConfirmedPage;
  let fixture: ComponentFixture<EmailConfirmedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailConfirmedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
