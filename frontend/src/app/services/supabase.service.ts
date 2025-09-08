import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRole } from '../core/services/auth.service';

// Predict 3 Database Types
export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  first_login: boolean;
}

export interface PredictionGroup {
  id: string;
  name: string;
  code: string;
  description?: string;
  admin_id: string;
  max_members: number;
  current_members: number;
  season_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Match {
  id: string;
  home_team: string;
  away_team: string;
  home_team_logo?: string;
  away_team_logo?: string;
  kickoff_time: string;
  gameweek: number;
  season_id: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  home_score?: number;
  away_score?: number;
  created_at: string;
  updated_at: string;
}

export interface Prediction {
  id: string;
  user_id: string;
  match_id: string;
  group_id: string;
  home_score: number;
  away_score: number;
  points_earned?: number;
  created_at: string;
  updated_at: string;
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  joined_at: string;
  total_points: number;
  position?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private currentUser$ = new BehaviorSubject<User | null>(null);
  private currentSession$ = new BehaviorSubject<Session | null>(null);
  private currentProfile$ = new BehaviorSubject<Profile | null>(null);

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.key,
      {
        auth: {
          persistSession: true, // Enable session persistence for proper auth
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      }
    );

    // Initialize auth state
    this.initializeAuth();
  }

  private async initializeAuth() {
    // Get initial session
    const { data: { session } } = await this.supabase.auth.getSession();
    this.currentSession$.next(session);
    this.currentUser$.next(session?.user || null);

    // Load profile if user exists
    if (session?.user) {
      await this.loadUserProfile(session.user.id);
    }

    // Listen for auth changes
    this.supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔐 Supabase Auth State Change:', event, session?.user?.email);
      
      this.currentSession$.next(session);
      this.currentUser$.next(session?.user || null);

      if (session?.user) {
        await this.loadUserProfile(session.user.id);
      } else {
        this.currentProfile$.next(null);
      }
    });
  }

  private async loadUserProfile(userId: string) {
    try {
      const { data: profile, error } = await this.supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error loading user profile:', error);
        return;
      }

      this.currentProfile$.next(profile);
      console.log('✅ User profile loaded:', profile);
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
  }
  }

  // Getters for reactive state
  get client() {
    return this.supabase;
  }

  get user$(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  get session$(): Observable<Session | null> {
    return this.currentSession$.asObservable();
  }

  get profile$(): Observable<Profile | null> {
    return this.currentProfile$.asObservable();
  }

  get currentUser(): User | null {
    return this.currentUser$.value;
  }

  get currentSession(): Session | null {
    return this.currentSession$.value;
  }

  get currentProfile(): Profile | null {
    return this.currentProfile$.value;
  }

  // Authentication Methods
  async signUp(
    email: string,
    password: string,
    metadata: { username: string; first_name: string; last_name: string; role: UserRole },
    redirectTo?: string // optional; fallback to current origin
  ) {
    console.log('🔧 SupabaseService: Starting signUp...');
    console.log('🔧 SupabaseService: email =', email);
    console.log('🔧 SupabaseService: metadata =', metadata);
  
    try {
      console.log('🔧 SupabaseService: Calling supabase.auth.signUp...');
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata, // store profile metadata on the user
          emailRedirectTo: redirectTo ?? `${window.location.origin}/auth/email-confirmed`,
        },
      });

      if (error) {
        console.error('❌ SupabaseService: Auth signup error:', error);
        throw error;
      }

      console.log('✅ SupabaseService: Auth signup successful:', data);

      // Create profile after successful signup (non-blocking)
      if (data.user) {
        console.log('🔧 SupabaseService: Creating profile for user:', data.user.id);
        // Don't await - let it run in background
        this.createProfile(data.user.id, {
          email,
          ...metadata,
          first_login: true,
          // the following will be set in createProfile() anyway:
          // created_at / updated_at
        } as Omit<Profile, 'id' | 'created_at' | 'updated_at'>)
        .then(() => {
          console.log('✅ SupabaseService: Profile created successfully');
        })
        .catch((error) => {
          console.error('❌ SupabaseService: Profile creation failed:', error);
        });
      }

      console.log('✅ SupabaseService: SignUp completed successfully');
      return data;
    } catch (error) {
      console.error('❌ SupabaseService: SignUp failed:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
    
    // Clear local state
    this.currentUser$.next(null);
    this.currentSession$.next(null);
    this.currentProfile$.next(null);
  }

  // Profile Management
  async createProfile(userId: string, profileData: Omit<Profile, 'id' | 'created_at' | 'updated_at'>) {
    console.log('🔧 SupabaseService: Creating profile...');
    console.log('🔧 SupabaseService: userId =', userId);
    console.log('🔧 SupabaseService: profileData =', profileData);
    
    try {
      const { data, error } = await this.supabase
        .from('profiles')
        .insert([{
          id: userId,
          ...profileData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('❌ SupabaseService: Profile creation error:', error);
        throw error;
      }
      
      console.log('✅ SupabaseService: Profile created successfully:', data);
      return data;
    } catch (error) {
      console.error('❌ SupabaseService: Profile creation failed:', error);
      throw error;
    }
  }

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await this.supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Group Management
  async createGroup(groupData: Omit<PredictionGroup, 'id' | 'created_at' | 'updated_at' | 'current_members'>) {
    const { data, error } = await this.supabase
      .from('groups')
      .insert([{
        ...groupData,
        current_members: 1, // Admin counts as first member
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async joinGroup(groupCode: string, userId: string) {
    // First, find the group by code
    const { data: group, error: groupError } = await this.supabase
      .from('groups')
      .select('*')
      .eq('code', groupCode)
      .single();

    if (groupError) throw groupError;

    // Check if user is already a member
    const { data: existingMember } = await this.supabase
      .from('group_members')
      .select('*')
      .eq('group_id', group.id)
      .eq('user_id', userId)
      .single();

    if (existingMember) {
      throw new Error('User is already a member of this group');
    }

    // Add user to group
    const { data, error } = await this.supabase
      .from('group_members')
      .insert([{
        group_id: group.id,
        user_id: userId,
        joined_at: new Date().toISOString(),
        total_points: 0
      }])
      .select()
      .single();

    if (error) throw error;

    // Update group member count
    await this.supabase
      .from('groups')
      .update({
        current_members: group.current_members + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', group.id);

    return data;
  }

  // Prediction Management
  async createPrediction(predictionData: Omit<Prediction, 'id' | 'created_at' | 'updated_at' | 'points_earned'>) {
    const { data, error } = await this.supabase
      .from('predictions')
      .insert([{
        ...predictionData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updatePrediction(predictionId: string, updates: Partial<Prediction>) {
    const { data, error } = await this.supabase
      .from('predictions')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', predictionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Match Management
  async getMatches(gameweek?: number) {
    let query = this.supabase
      .from('matches')
      .select('*')
      .order('kickoff_time', { ascending: true });

    if (gameweek) {
      query = query.eq('gameweek', gameweek);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  // Utility Methods
  async checkSuperAdminExists(): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('id')
      .eq('role', 'super-admin')
      .limit(1);

    if (error) throw error;
    return data.length > 0;
  }

  // Real-time Subscriptions
  subscribeToGroupUpdates(groupId: string, callback: (payload: any) => void) {
    return this.supabase
      .channel(`group_${groupId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'group_members', filter: `group_id=eq.${groupId}` },
        callback
      )
      .subscribe();
  }

  subscribeToMatchUpdates(callback: (payload: any) => void) {
    return this.supabase
      .channel('matches')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'matches' },
        callback
      )
      .subscribe();
  }
}