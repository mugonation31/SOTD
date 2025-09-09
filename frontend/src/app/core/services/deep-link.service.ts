import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';

/**
 * Service to handle deep links for authentication flows
 * Primarily used for email confirmation on native platforms
 */
@Injectable({
  providedIn: 'root'
})
export class DeepLinkService {
  private isNative = Capacitor.isNativePlatform();

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.initializeDeepLinkListener();
  }

  /**
   * Initialize deep link listener for native platforms
   */
  private initializeDeepLinkListener(): void {
    if (!this.isNative) {
      console.log('🌐 Web platform detected - deep link listener not needed');
      return;
    }

    console.log('📱 Native platform detected - initializing deep link listener');

    // Listen for app state changes and deep links
    App.addListener('appStateChange', ({ isActive }) => {
      console.log('📱 App state changed. Is active?', isActive);
    });

    // Listen for deep links when app is already running
    App.addListener('appUrlOpen', async (event) => {
      console.log('🔗 Deep link received:', event.url);
      await this.handleDeepLink(event.url);
    });

    // Check for initial deep link when app starts
    this.checkInitialDeepLink();
  }

  /**
   * Check for initial deep link when app starts
   */
  private async checkInitialDeepLink(): Promise<void> {
    try {
      const launchUrl = await App.getLaunchUrl();
      if (launchUrl && launchUrl.url) {
        console.log('🚀 Initial deep link detected:', launchUrl.url);
        await this.handleDeepLink(launchUrl.url);
      }
    } catch (error) {
      // No initial deep link or error getting it
      console.log('🚀 No initial deep link detected');
    }
  }

  /**
   * Handle incoming deep link
   */
  private async handleDeepLink(url: string): Promise<void> {
    try {
      console.log('🔗 Processing deep link:', url);

      // Check if this is an auth-related deep link
      if (this.isAuthDeepLink(url)) {
        const success = await this.supabaseService.handleDeepLinkSession(url);
        
        if (success) {
          console.log('✅ Auth deep link processed successfully');
          // Navigate to appropriate page after successful auth
          await this.navigateAfterAuth();
        } else {
          console.error('❌ Failed to process auth deep link');
          // Navigate to error page or login
          this.router.navigate(['/auth/login'], { 
            queryParams: { error: 'auth_failed' } 
          });
        }
      } else {
        console.log('🔗 Non-auth deep link, handling as regular navigation');
        // Handle other types of deep links here if needed
      }
    } catch (error) {
      console.error('❌ Error handling deep link:', error);
      // Navigate to error page or login
      this.router.navigate(['/auth/login'], { 
        queryParams: { error: 'deep_link_failed' } 
      });
    }
  }

  /**
   * Check if the deep link is auth-related
   */
  private isAuthDeepLink(url: string): boolean {
    return url.includes('access_token') && url.includes('refresh_token');
  }

  /**
   * Navigate to appropriate page after successful authentication
   */
  private async navigateAfterAuth(): Promise<void> {
    try {
      // Wait a moment for the session to be fully established
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get the current user to determine where to navigate
      const user = this.supabaseService.currentUser;
      const profile = this.supabaseService.currentProfile;
      
      if (user && profile) {
        // Navigate based on user role and first login status
        if (profile.first_login) {
          // First time user
          switch (profile.role) {
            case 'group-admin':
              this.router.navigate(['/group-admin/groups']);
              break;
            case 'player':
              this.router.navigate(['/player/join-group']);
              break;
            case 'super-admin':
              this.router.navigate(['/super-admin/dashboard']);
              break;
            default:
              this.router.navigate(['/welcome']);
          }
        } else {
          // Returning user - go to dashboard
          switch (profile.role) {
            case 'group-admin':
              this.router.navigate(['/group-admin/dashboard']);
              break;
            case 'player':
              this.router.navigate(['/player/dashboard']);
              break;
            case 'super-admin':
              this.router.navigate(['/super-admin/dashboard']);
              break;
            default:
              this.router.navigate(['/welcome']);
          }
        }
      } else {
        // Fallback to welcome page
        this.router.navigate(['/welcome']);
      }
    } catch (error) {
      console.error('❌ Error navigating after auth:', error);
      this.router.navigate(['/welcome']);
    }
  }

  /**
   * Manually trigger deep link handling (useful for testing)
   */
  async handleUrl(url: string): Promise<void> {
    await this.handleDeepLink(url);
  }
}
