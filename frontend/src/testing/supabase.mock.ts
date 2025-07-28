import { BehaviorSubject } from 'rxjs';
import { User, Session } from '@supabase/supabase-js';

// Mock data factories
export const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: 'mock-user-id',
  email: 'test@example.com',
  aud: 'authenticated',
  role: 'authenticated',
  email_confirmed_at: '2024-01-01T00:00:00.000Z',
  phone_confirmed_at: undefined,
  confirmation_sent_at: undefined,
  recovery_sent_at: undefined,
  email_change_sent_at: undefined,
  new_email: undefined,
  invited_at: undefined,
  action_link: undefined,
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z',
  is_anonymous: false,
  app_metadata: {},
  user_metadata: {},
  identities: [],
  factors: [],
  ...overrides
});

// Mock Supabase service for testing
export const mockSupabaseService = () => ({
  user$: new BehaviorSubject<User | null>(null),
  session$: new BehaviorSubject<Session | null>(null),
  profile$: new BehaviorSubject<any>(null),
  currentUser: null,
  currentSession: null,
  currentProfile: null,
  signUp: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
  createProfile: jest.fn(),
  updateProfile: jest.fn(),
  createGroup: jest.fn(),
  joinGroup: jest.fn()
});