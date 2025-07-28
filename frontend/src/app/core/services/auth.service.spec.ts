import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';
import { SupabaseService } from '../../services/supabase.service';
import { createMockToastService } from '../../../testing/test-utils';

describe('AuthService', () => {
  let service: AuthService;
  let mockToastService: ReturnType<typeof createMockToastService>;
  let mockHttpClient: any;
  let mockSupabaseService: any;

  beforeEach(() => {
    mockToastService = createMockToastService();
    mockHttpClient = {
      post: jest.fn()
    };
    mockSupabaseService = {
      user$: { subscribe: jest.fn() },
      profile$: { pipe: jest.fn().mockReturnValue({ subscribe: jest.fn() }) }
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: SupabaseService, useValue: mockSupabaseService },
        { provide: ToastService, useValue: mockToastService }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should call login method', () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
        securityQuestion: 'What is your favorite color?',
        securityAnswer: 'blue'
      };

      service.login(loginData).subscribe();

      // Add assertions based on your AuthService implementation
      expect(service).toBeTruthy();
    });
  });

  describe('logout', () => {
    it('should call logout method', () => {
      service.logout();

      // Add assertions based on your AuthService implementation
      expect(service).toBeTruthy();
    });
  });

  describe('signup', () => {
    it('should call signup method', () => {
      const signupData = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123',
        role: 'player' as const
      };

      service.signup(signupData).subscribe();

      // Add assertions based on your AuthService implementation
      expect(service).toBeTruthy();
    });
  });

  describe('isAuthenticated', () => {
    it('should return authentication status', () => {
      const result = service.isAuthenticated();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('getUserRole', () => {
    it('should return user role', () => {
      const result = service.getUserRole();
      expect(result).toBeDefined();
    });
  });
}); 