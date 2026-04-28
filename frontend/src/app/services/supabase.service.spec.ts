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

    // Migration 014 moved profile creation to a handle_new_user() trigger on
    // auth.users (SECURITY DEFINER, bypasses RLS). The client no longer
    // calls createProfile after signUp — with "Confirm email" ON there is
    // no session at signUp time, so a client-side INSERT would hit RLS.
    it('should NOT call createProfile after signUp (trigger handles it)', async () => {
      const mockUser = { id: 'user-123' };
      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { user: mockUser, session: null },
        error: null
      });

      const createProfileSpy = jest.spyOn(service, 'createProfile');

      await service.signUp('test@example.com', 'password123', {
        username: 'testuser',
        first_name: 'Test',
        last_name: 'User',
        role: 'player' as any
      });

      expect(createProfileSpy).not.toHaveBeenCalled();
    });

    it('should pass metadata on options.data for trigger to read', async () => {
      const mockUser = { id: 'user-456' };
      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { user: mockUser, session: null },
        error: null
      });

      const result = await service.signUp('success@example.com', 'password123', {
        username: 'successuser',
        first_name: 'Success',
        last_name: 'User',
        role: 'player' as any
      });

      expect(result).toEqual({ user: mockUser, session: null });
      expect(mockSupabaseClient.auth.signUp).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'success@example.com',
          password: 'password123',
          options: expect.objectContaining({
            data: expect.objectContaining({
              username: 'successuser',
              first_name: 'Success',
              last_name: 'User',
              role: 'player'
            })
          })
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

  // Phase 11.1 — Token-leak redaction in console.log sites (B1 + H2).
  //
  // These specs lock in that the two specific token-leak sites in
  // signIn() and handleDeepLinkSession() never write
  // access_token / refresh_token / JWT-shaped strings to console.
  //
  // The redaction is in the LOG only — actual auth behaviour
  // (signInWithPassword call, setSession call) must be preserved.
  describe('token-leak redaction (Phase 11.1)', () => {
    const JWT_SHAPE = /eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/;

    /**
     * Walk all calls captured by a console spy, JSON.stringify each,
     * and return the concatenated string for substring/regex assertions.
     */
    const concatLoggedStrings = (spy: jest.SpyInstance): string => {
      return spy.mock.calls
        .map(args => {
          try {
            return JSON.stringify(args);
          } catch {
            // fall back to String() for circular refs etc.
            return args.map((a: any) => String(a)).join(' ');
          }
        })
        .join('\n');
    };

    let logSpy: jest.SpyInstance;
    let errorSpy: jest.SpyInstance;
    let mockSupabaseClient: any;

    beforeEach(() => {
      logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      mockSupabaseClient = {
        auth: {
          signInWithPassword: jest.fn(),
          setSession: jest.fn()
        }
      };
      (service as any).supabase = mockSupabaseClient;
    });

    afterEach(() => {
      logSpy.mockRestore();
      errorSpy.mockRestore();
    });

    describe('B1 — signIn must not log session tokens', () => {
      it('should not log access_token, refresh_token, or JWT-shape strings on successful signIn', async () => {
        const fixture = {
          data: {
            user: { id: 'u1' },
            session: {
              access_token: 'eyJfake.AT_FAKE.sig',
              refresh_token: 'RT_FAKE'
            }
          },
          error: null
        };
        mockSupabaseClient.auth.signInWithPassword.mockResolvedValue(fixture);

        await service.signIn('e@x', 'pw');

        const logged = concatLoggedStrings(logSpy) + '\n' + concatLoggedStrings(errorSpy);

        expect(logged).not.toContain('AT_FAKE');
        expect(logged).not.toContain('RT_FAKE');
        expect(logged).not.toContain('refresh_token');
        expect(logged).not.toContain('access_token');
        expect(logged).not.toMatch(JWT_SHAPE);
      });

      it('should not log session payload when signIn fails', async () => {
        mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
          data: null,
          error: { message: 'bad creds' }
        });

        await expect(service.signIn('e@x', 'pw')).rejects.toBeDefined();

        const logged = concatLoggedStrings(logSpy) + '\n' + concatLoggedStrings(errorSpy);

        expect(logged).not.toContain('access_token');
        expect(logged).not.toContain('refresh_token');
        expect(logged).not.toMatch(JWT_SHAPE);
      });
    });

    describe('H2 — handleDeepLinkSession must not log the URL fragment', () => {
      const DEEP_LINK_URL =
        'https://app.example/auth/callback#access_token=AT_FAKE&refresh_token=RT_FAKE&type=recovery';

      it('should not log access_token, refresh_token, or JWT-shape values from the URL', async () => {
        mockSupabaseClient.auth.setSession.mockResolvedValue({
          data: { session: { access_token: 'AT_FAKE', refresh_token: 'RT_FAKE' } },
          error: null
        });

        await service.handleDeepLinkSession(DEEP_LINK_URL);

        const logged = concatLoggedStrings(logSpy) + '\n' + concatLoggedStrings(errorSpy);

        expect(logged).not.toContain('AT_FAKE');
        expect(logged).not.toContain('RT_FAKE');
        expect(logged).not.toContain('access_token=');
        expect(logged).not.toMatch(JWT_SHAPE);
      });

      it('should still emit a useful diagnostic log (origin/pathname + type)', async () => {
        mockSupabaseClient.auth.setSession.mockResolvedValue({
          data: { session: { access_token: 'AT_FAKE', refresh_token: 'RT_FAKE' } },
          error: null
        });

        await service.handleDeepLinkSession(DEEP_LINK_URL);

        const logged = concatLoggedStrings(logSpy);

        expect(logged).toContain('app.example');
        expect(logged).toContain('recovery');
      });

      it('should still call auth.setSession with the parsed access_token and refresh_token (behaviour preserved)', async () => {
        mockSupabaseClient.auth.setSession.mockResolvedValue({
          data: { session: { access_token: 'AT_FAKE', refresh_token: 'RT_FAKE' } },
          error: null
        });

        const result = await service.handleDeepLinkSession(DEEP_LINK_URL);

        expect(result).toBe(true);
        expect(mockSupabaseClient.auth.setSession).toHaveBeenCalledWith({
          access_token: 'AT_FAKE',
          refresh_token: 'RT_FAKE'
        });
      });
    });
  });

  // Migration 014: the handle_new_user() trigger on auth.users creates the
  // profile row for BOTH email/password signups and OAuth (Google) signups.
  // loadUserProfile on the client should simply read the existing row — it
  // must NOT attempt a client-side INSERT fallback (that path used to race
  // with the trigger and could hit RLS depending on the auth state).
  describe('loadUserProfile (Google OAuth)', () => {
    let mockSupabaseClient: any;
    let selectMock: any;
    let eqMock: any;
    let singleMock: any;

    beforeEach(() => {
      singleMock = jest.fn();
      eqMock = jest.fn().mockReturnValue({ single: singleMock });
      selectMock = jest.fn().mockReturnValue({ eq: eqMock });

      mockSupabaseClient = {
        auth: {
          getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
          onAuthStateChange: jest.fn()
        },
        from: jest.fn().mockReturnValue({
          select: selectMock
        })
      };
      (service as any).supabase = mockSupabaseClient;
    });

    it('should NOT client-side create a profile when missing for a Google user (trigger owns creation)', async () => {
      singleMock.mockResolvedValue({ data: null, error: { code: 'PGRST116', message: 'no rows' } });

      const createProfileSpy = jest.spyOn(service, 'createProfile');

      await (service as any).loadUserProfile('google-user-123');

      expect(createProfileSpy).not.toHaveBeenCalled();
    });

    it('should publish the profile when the trigger-created row is present', async () => {
      const triggerCreatedProfile = {
        id: 'google-user-456',
        email: 'jane.doe@gmail.com',
        username: 'jane.doe',
        first_name: 'Jane',
        last_name: 'Doe',
        role: 'player',
        first_login: true,
        created_at: '2026-04-24',
        updated_at: '2026-04-24'
      };
      singleMock.mockResolvedValue({ data: triggerCreatedProfile, error: null });

      await (service as any).loadUserProfile('google-user-456');

      expect(service.currentProfile).toEqual(triggerCreatedProfile);
    });
  });
});
