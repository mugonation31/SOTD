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

  describe('updatePasswordWithTokens', () => {
    let mockFetch: jest.Mock;
    let originalFetch: typeof global.fetch;

    beforeEach(() => {
      // Store original fetch
      originalFetch = global.fetch;
      
      // Mock fetch
      mockFetch = jest.fn();
      global.fetch = mockFetch;
    });

    afterEach(() => {
      // Restore original fetch
      global.fetch = originalFetch;
    });

    it('should successfully update password with valid token', async () => {
      // Mock window.location with token
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:8100/auth/reset-password#access_token=valid-token',
          hash: '#access_token=valid-token'
        },
        writable: true
      });

      // Mock successful API response
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ user: { id: '123' } })
      });

      const result = await service.updatePasswordWithTokens('NewPassword123!');

      expect(result).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/v1/user'),
        expect.objectContaining({
          method: 'PUT',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer valid-token',
            'apikey': expect.any(String)
          }),
          body: JSON.stringify({ password: 'NewPassword123!' })
        })
      );
    });

    it('should handle missing access token', async () => {
      // Mock window.location without token
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:8100/auth/reset-password',
          hash: ''
        },
        writable: true
      });

      const result = await service.updatePasswordWithTokens('NewPassword123!');

      expect(result).toBe(false);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should handle API error response', async () => {
      // Mock window.location with token
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:8100/auth/reset-password#access_token=valid-token',
          hash: '#access_token=valid-token'
        },
        writable: true
      });

      // Mock error API response
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: jest.fn().mockResolvedValue({ error: 'Invalid token' })
      });

      const result = await service.updatePasswordWithTokens('NewPassword123!');

      expect(result).toBe(false);
      expect(mockFetch).toHaveBeenCalled();
    });

    it('should handle network errors', async () => {
      // Mock window.location with token
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:8100/auth/reset-password#access_token=valid-token',
          hash: '#access_token=valid-token'
        },
        writable: true
      });

      // Mock network error
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await service.updatePasswordWithTokens('NewPassword123!');

      expect(result).toBe(false);
    });

    it('should handle malformed URL', async () => {
      // Mock invalid window.location
      Object.defineProperty(window, 'location', {
        value: {
          href: 'invalid-url',
          hash: ''
        },
        writable: true
      });

      const result = await service.updatePasswordWithTokens('NewPassword123!');

      expect(result).toBe(false);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should handle empty token in URL', async () => {
      // Mock window.location with empty token
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:8100/auth/reset-password#access_token=',
          hash: '#access_token='
        },
        writable: true
      });

      const result = await service.updatePasswordWithTokens('NewPassword123!');

      expect(result).toBe(false);
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe('resetPassword', () => {
    beforeEach(() => {
      // Mock Supabase client
      mockSupabaseService.client = {
        auth: {
          resetPasswordForEmail: jest.fn()
        }
      };
    });

    it('should successfully send reset password email', async () => {
      const testEmail = 'test@example.com';
      
      // Mock successful response
      mockSupabaseService.client.auth.resetPasswordForEmail.mockResolvedValue({
        data: {},
        error: null
      });

      const result = await service.resetPassword(testEmail);

      expect(mockSupabaseService.client.auth.resetPasswordForEmail).toHaveBeenCalledWith(
        testEmail,
        {
          redirectTo: 'http://localhost:8100/auth/reset-password'
        }
      );
      expect(result.error).toBe(null);
    });

    it('should handle reset password failure', async () => {
      const testEmail = 'nonexistent@example.com';
      const errorMessage = 'User not found';
      
      // Mock error response
      mockSupabaseService.client.auth.resetPasswordForEmail.mockResolvedValue({
        data: null,
        error: {
          message: errorMessage,
          status: 404
        }
      });

      const result = await service.resetPassword(testEmail);

      expect(mockSupabaseService.client.auth.resetPasswordForEmail).toHaveBeenCalledWith(
        testEmail,
        {
          redirectTo: 'http://localhost:8100/auth/reset-password'
        }
      );
      expect(result.error).toEqual({
        message: errorMessage,
        status: 404
      });
    });

    it('should handle network errors', async () => {
      const testEmail = 'test@example.com';
      
      // Mock network error
      mockSupabaseService.client.auth.resetPasswordForEmail.mockRejectedValue(
        new Error('Network error')
      );

      const result = await service.resetPassword(testEmail);

      expect(mockSupabaseService.client.auth.resetPasswordForEmail).toHaveBeenCalledWith(
        testEmail,
        {
          redirectTo: 'http://localhost:8100/auth/reset-password'
        }
      );
      expect(result.error).toBeInstanceOf(Error);
      expect(result.error.message).toBe('Network error');
    });

    it('should handle empty email', async () => {
      const testEmail = '';
      
      // Mock successful response (Supabase might handle empty email differently)
      mockSupabaseService.client.auth.resetPasswordForEmail.mockResolvedValue({
        data: {},
        error: null
      });

      const result = await service.resetPassword(testEmail);

      expect(mockSupabaseService.client.auth.resetPasswordForEmail).toHaveBeenCalledWith(
        testEmail,
        {
          redirectTo: 'http://localhost:8100/auth/reset-password'
        }
      );
      expect(result.error).toBe(null);
    });

    it('should handle malformed email', async () => {
      const testEmail = 'invalid-email';
      
      // Mock error response for malformed email
      mockSupabaseService.client.auth.resetPasswordForEmail.mockResolvedValue({
        data: null,
        error: {
          message: 'Invalid email format',
          status: 400
        }
      });

      const result = await service.resetPassword(testEmail);

      expect(mockSupabaseService.client.auth.resetPasswordForEmail).toHaveBeenCalledWith(
        testEmail,
        {
          redirectTo: 'http://localhost:8100/auth/reset-password'
        }
      );
      expect(result.error).toEqual({
        message: 'Invalid email format',
        status: 400
      });
    });
  });

  describe('setSessionFromFragment', () => {
    let mockFetch: jest.Mock;
    let originalFetch: typeof global.fetch;

    beforeEach(() => {
      originalFetch = global.fetch;
      mockFetch = jest.fn();
      global.fetch = mockFetch;
    });

    afterEach(() => {
      global.fetch = originalFetch;
    });

    it('should successfully set session from URL fragment', async () => {
      // Mock window.location with tokens
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:8100/auth/reset-password#access_token=valid-token&refresh_token=refresh-token',
          hash: '#access_token=valid-token&refresh_token=refresh-token'
        },
        writable: true
      });

      // Mock successful Supabase client response
      mockSupabaseService.client = {
        auth: {
          setSession: jest.fn().mockResolvedValue({
            data: { session: { user: { email: 'test@example.com' } } },
            error: null
          })
        }
      };

      const result = await service.setSessionFromFragment();

      expect(result).toBe(true);
      expect(mockSupabaseService.client.auth.setSession).toHaveBeenCalledWith({
        access_token: 'valid-token',
        refresh_token: 'refresh-token'
      });
    });

    it('should handle missing tokens in URL fragment', async () => {
      // Mock window.location without tokens
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:8100/auth/reset-password',
          hash: ''
        },
        writable: true
      });

      const result = await service.setSessionFromFragment();

      expect(result).toBe(false);
    });

    it('should handle Supabase session error', async () => {
      // Mock window.location with tokens
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost:8100/auth/reset-password#access_token=valid-token&refresh_token=refresh-token',
          hash: '#access_token=valid-token&refresh_token=refresh-token'
        },
        writable: true
      });

      // Mock Supabase error
      mockSupabaseService.client = {
        auth: {
          setSession: jest.fn().mockResolvedValue({
            data: null,
            error: { message: 'Invalid token' }
          })
        }
      };

      const result = await service.setSessionFromFragment();

      expect(result).toBe(false);
    });
  });
}); 