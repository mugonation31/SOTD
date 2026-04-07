import { TestBed } from '@angular/core/testing';
import { SupabaseService } from './supabase.service';
import { CrossPlatformStorageService } from '../core/services/cross-platform-storage.service';

describe('SupabaseService', () => {
  let service: SupabaseService;
  let mockStorageService: any;

  beforeEach(() => {
    mockStorageService = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
      remove: jest.fn().mockResolvedValue(undefined)
    };

    TestBed.configureTestingModule({
      providers: [
        SupabaseService,
        { provide: CrossPlatformStorageService, useValue: mockStorageService }
      ]
    });

    service = TestBed.inject(SupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signUp', () => {
    let mockSupabaseClient: any;

    beforeEach(() => {
      // Mock the private supabase client
      mockSupabaseClient = {
        auth: {
          signUp: jest.fn()
        },
        from: jest.fn()
      };
      (service as any).supabase = mockSupabaseClient;
    });

    it('should await createProfile in signUp and throw if profile creation fails', async () => {
      const mockUser = { id: 'user-123' };
      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { user: mockUser, session: null },
        error: null
      });

      // Mock createProfile to reject
      jest.spyOn(service, 'createProfile').mockRejectedValue(new Error('Profile creation failed'));

      await expect(
        service.signUp('test@example.com', 'password123', {
          username: 'testuser',
          first_name: 'Test',
          last_name: 'User',
          role: 'player' as any
        })
      ).rejects.toThrow('Profile creation failed');

      expect(service.createProfile).toHaveBeenCalledWith(
        'user-123',
        expect.objectContaining({
          email: 'test@example.com',
          username: 'testuser',
          first_name: 'Test',
          last_name: 'User',
          role: 'player',
          first_login: true
        })
      );
    });

    it('should return profile data from signUp when profile creation succeeds', async () => {
      const mockUser = { id: 'user-456' };
      const mockProfile = {
        id: 'user-456',
        email: 'success@example.com',
        username: 'successuser',
        first_name: 'Success',
        last_name: 'User',
        role: 'player',
        first_login: true,
        created_at: '2026-01-01',
        updated_at: '2026-01-01'
      };

      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { user: mockUser, session: null },
        error: null
      });

      jest.spyOn(service, 'createProfile').mockResolvedValue(mockProfile);

      const result = await service.signUp('success@example.com', 'password123', {
        username: 'successuser',
        first_name: 'Success',
        last_name: 'User',
        role: 'player' as any
      });

      expect(result).toEqual({ user: mockUser, session: null });
      expect(service.createProfile).toHaveBeenCalledWith(
        'user-456',
        expect.objectContaining({
          email: 'success@example.com',
          username: 'successuser',
          first_login: true
        })
      );
    });
  });

  describe('signInWithGoogle', () => {
    let mockSupabaseClient: any;

    beforeEach(() => {
      mockSupabaseClient = {
        auth: {
          signInWithOAuth: jest.fn()
        }
      };
      (service as any).supabase = mockSupabaseClient;
    });

    it('should throw error when signInWithOAuth fails', async () => {
      mockSupabaseClient.auth.signInWithOAuth.mockResolvedValue({
        data: null,
        error: { message: 'OAuth error' }
      });

      await expect(service.signInWithGoogle()).rejects.toEqual({ message: 'OAuth error' });
    });

    it('should return data when signInWithOAuth succeeds', async () => {
      const mockData = { provider: 'google', url: 'https://accounts.google.com/...' };
      mockSupabaseClient.auth.signInWithOAuth.mockResolvedValue({
        data: mockData,
        error: null
      });

      const result = await service.signInWithGoogle();

      expect(result).toEqual(mockData);
    });

    it('should call supabase.auth.signInWithOAuth with google provider and redirectTo (args check)', async () => {
      mockSupabaseClient.auth.signInWithOAuth.mockResolvedValue({
        data: { provider: 'google', url: 'https://accounts.google.com/...' },
        error: null
      });

      await service.signInWithGoogle();

      expect(mockSupabaseClient.auth.signInWithOAuth).toHaveBeenCalledWith({
        provider: 'google',
        options: { redirectTo: window.location.origin }
      });
    });
  });

  describe('Google profile handling', () => {
    let mockSupabaseClient: any;
    let selectMock: any;
    let eqMock: any;
    let singleMock: any;
    let insertMock: any;

    beforeEach(() => {
      singleMock = jest.fn();
      eqMock = jest.fn().mockReturnValue({ single: singleMock });
      selectMock = jest.fn().mockReturnValue({ eq: eqMock });
      insertMock = jest.fn().mockReturnValue({ select: jest.fn().mockReturnValue({ single: jest.fn().mockResolvedValue({ data: {}, error: null }) }) });

      mockSupabaseClient = {
        auth: {
          getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
          onAuthStateChange: jest.fn()
        },
        from: jest.fn().mockReturnValue({
          select: selectMock,
          insert: insertMock
        })
      };
      (service as any).supabase = mockSupabaseClient;
    });

    it('should create profile from Google metadata when loadUserProfile returns no profile', async () => {
      // loadUserProfile returns no profile (error means no row found)
      singleMock.mockResolvedValue({ data: null, error: { code: 'PGRST116', message: 'no rows' } });

      const googleUser = {
        id: 'google-user-123',
        email: 'jane.doe@gmail.com',
        app_metadata: { provider: 'google' },
        user_metadata: { full_name: 'Jane Doe' }
      };

      // Spy on createProfile
      const createProfileSpy = jest.spyOn(service, 'createProfile').mockResolvedValue({} as any);

      // Call the private method via the auth state change handler
      await (service as any).loadUserProfile(googleUser.id, googleUser);

      expect(createProfileSpy).toHaveBeenCalledWith(
        'google-user-123',
        expect.objectContaining({
          email: 'jane.doe@gmail.com',
          username: 'jane.doe',
          first_name: 'Jane',
          last_name: 'Doe',
          role: 'player',
          first_login: true
        })
      );
    });

    it('should derive username from email prefix for Google users', async () => {
      singleMock.mockResolvedValue({ data: null, error: { code: 'PGRST116', message: 'no rows' } });

      const googleUser = {
        id: 'google-user-456',
        email: 'cool.player2025@gmail.com',
        app_metadata: { provider: 'google' },
        user_metadata: { full_name: 'Cool Player' }
      };

      const createProfileSpy = jest.spyOn(service, 'createProfile').mockResolvedValue({} as any);

      await (service as any).loadUserProfile(googleUser.id, googleUser);

      expect(createProfileSpy).toHaveBeenCalledWith(
        'google-user-456',
        expect.objectContaining({
          username: 'cool.player2025'
        })
      );
    });

    it('should derive first_name and last_name from Google full_name', async () => {
      singleMock.mockResolvedValue({ data: null, error: { code: 'PGRST116', message: 'no rows' } });

      const googleUser = {
        id: 'google-user-789',
        email: 'mary.jane.watson@gmail.com',
        app_metadata: { provider: 'google' },
        user_metadata: { full_name: 'Mary Jane Watson' }
      };

      const createProfileSpy = jest.spyOn(service, 'createProfile').mockResolvedValue({} as any);

      await (service as any).loadUserProfile(googleUser.id, googleUser);

      expect(createProfileSpy).toHaveBeenCalledWith(
        'google-user-789',
        expect.objectContaining({
          first_name: 'Mary',
          last_name: 'Jane Watson'
        })
      );
    });

    it('should handle single-word full_name (no last name)', async () => {
      singleMock.mockResolvedValue({ data: null, error: { code: 'PGRST116', message: 'no rows' } });

      const googleUser = {
        id: 'google-user-solo',
        email: 'madonna@gmail.com',
        app_metadata: { provider: 'google' },
        user_metadata: { full_name: 'Madonna' }
      };

      const createProfileSpy = jest.spyOn(service, 'createProfile').mockResolvedValue({} as any);

      await (service as any).loadUserProfile(googleUser.id, googleUser);

      expect(createProfileSpy).toHaveBeenCalledWith(
        'google-user-solo',
        expect.objectContaining({
          first_name: 'Madonna',
          last_name: ''
        })
      );
    });
  });
});
