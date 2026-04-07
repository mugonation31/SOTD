import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { SupabaseService } from '../../../../services/supabase.service';
import { LoginPage } from './login.page';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let mockRouter: any;
  let mockAuthService: any;
  let mockSupabaseService: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
      navigateByUrl: jest.fn(),
      url: '/auth/login',
      events: {
        subscribe: jest.fn(),
        pipe: jest.fn().mockReturnValue({ subscribe: jest.fn() })
      },
      createUrlTree: jest.fn(),
      serializeUrl: jest.fn(),
      parseUrl: jest.fn(),
      isActive: jest.fn(),
      routerState: { snapshot: { url: '/auth/login' } }
    };

    mockAuthService = {
      login: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
      logout: jest.fn(),
      clearSession: jest.fn(),
      getCurrentUser: jest.fn(),
      getUserRole: jest.fn(),
      isAuthenticated: jest.fn(),
      isFirstTimeUser: jest.fn().mockReturnValue(false),
      currentUserValue: null
    };

    mockSupabaseService = {
      signInWithGoogle: jest.fn().mockResolvedValue({ provider: 'google', url: 'https://accounts.google.com' })
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: {
          snapshot: { paramMap: { get: jest.fn() }, queryParamMap: { get: jest.fn() }, fragment: null },
          params: of({}),
          queryParams: of({}),
          fragment: of(null),
          url: of([]),
          data: of({})
        }},
        { provide: AuthService, useValue: mockAuthService },
        { provide: SupabaseService, useValue: mockSupabaseService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    global.alert = jest.fn();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Google Sign-In', () => {
    it('should have a signInWithGoogle method', () => {
      expect(component.signInWithGoogle).toBeDefined();
      expect(typeof component.signInWithGoogle).toBe('function');
    });

    it('should call supabaseService.signInWithGoogle when Google button is clicked', async () => {
      await component.signInWithGoogle();

      expect(mockSupabaseService.signInWithGoogle).toHaveBeenCalled();
    });
  });
});
