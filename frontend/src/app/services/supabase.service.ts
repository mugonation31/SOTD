import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.key,
      {
        auth: {
          persistSession: false, // Disable session persistence to avoid locks
          autoRefreshToken: false,
          detectSessionInUrl: false
        }
      }
    );
  }

  get client() {
    return this.supabase;
  }
}