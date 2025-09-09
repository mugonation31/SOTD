import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SupabaseService } from './services/supabase.service';
import { AuthService } from './core/services/auth.service';
import { DeepLinkService } from './core/services/deep-link.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  private isNative = Capacitor.isNativePlatform();

  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService,
    private deepLinkService: DeepLinkService,
    private router: Router
  ) {}

  async ngOnInit() {
    console.log('🚀 App initializing...');
    
    // Initialize deep link service (this will set up listeners for native platforms)
    // The DeepLinkService constructor already handles initialization
    
    // Handle session restoration
    await this.initializeSession();
    
    console.log('✅ App initialization complete');
  }

  /**
   * Initialize session on app startup
   */
  private async initializeSession(): Promise<void> {
    try {
      console.log('🔄 Initializing session...');
      
      // For web platform, check if there are auth tokens in the URL
      if (!this.isNative) {
        const hasTokensInUrl = this.supabaseService.hasAuthTokensInUrl();
        if (hasTokensInUrl) {
          console.log('🔗 Found auth tokens in URL, processing...');
          const success = await this.supabaseService.setSessionFromUrl();
          if (success) {
            console.log('✅ Session restored from URL tokens');
            return;
          }
        }
      }
      
      // Check if we have an existing session
      const session = this.supabaseService.currentSession;
      const user = this.supabaseService.currentUser;
      
      if (session && user) {
        console.log('✅ Existing session found, user is authenticated');
        // Handle session restoration in AuthService
        await this.authService.handleSessionRestoration();
      } else {
        console.log('ℹ️ No existing session found');
      }
      
    } catch (error) {
      console.error('❌ Error initializing session:', error);
    }
  }

  /**
   * Sync AuthService with SupabaseService state
   */
  private async syncAuthService(): Promise<void> {
    try {
      const user = this.supabaseService.currentUser;
      const profile = this.supabaseService.currentProfile;
      
      if (user && profile) {
        // Convert Supabase profile to AuthResponse format for AuthService
        const authResponse = {
          token: 'supabase-session-token',
          user: {
            id: profile.id,
            email: profile.email,
            role: profile.role,
            firstName: profile.first_name,
            lastName: profile.last_name,
          }
        };
        
        // Update AuthService state
        this.authService['currentUserSubject'].next(authResponse);
        
        console.log('✅ AuthService synced with Supabase session');
      }
    } catch (error) {
      console.error('❌ Error syncing AuthService:', error);
    }
  }
}
