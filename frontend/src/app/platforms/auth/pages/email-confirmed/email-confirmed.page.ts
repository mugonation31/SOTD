import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardContent, 
  IonButton, 
  IonIcon,
  IonText
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, mail, arrowBack, footballOutline, home } from 'ionicons/icons';
import { SupabaseService } from '../../../../services/supabase.service';

@Component({
  selector: 'app-email-confirmed',
  templateUrl: './email-confirmed.page.html',
  styleUrls: ['./email-confirmed.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonCard, 
    IonCardContent, 
    IonButton, 
    IonIcon,
    IonText,
    CommonModule, 
    FormsModule
  ]
})
export class EmailConfirmedPage implements OnInit {

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {
    addIcons({footballOutline,checkmarkCircle,arrowBack,home,mail});
  }

  ngOnInit() {
    this.handleEmailConfirmation();
  }

  async handleEmailConfirmation() {
    try {
      console.log('📧 Handling email confirmation...');

      const url = new URL(window.location.href);
      const queryParams = url.searchParams;
      const hashParams = new URLSearchParams(url.hash.slice(1));

      // Case 1: Supabase redirected with an error (expired/invalid token,
      // prefetched by email scanner, etc.). Keep the static success UI
      // suppressed and surface the real reason.
      const errorCode =
        queryParams.get('error_code') || hashParams.get('error_code');
      const errorDescription =
        queryParams.get('error_description') || hashParams.get('error_description');
      if (errorCode) {
        console.error('❌ Email confirmation error:', errorCode, errorDescription);
        return;
      }

      // Case 2: PKCE flow (current). Supabase returned ?code=... — exchange
      // it for an access + refresh token pair, which also marks the email
      // confirmed server-side and establishes the client session so the
      // user doesn't have to log in a second time.
      const code = queryParams.get('code');
      if (code) {
        console.log('🔗 Found PKCE code, exchanging for session...');
        const { error } = await this.supabaseService.client.auth
          .exchangeCodeForSession(code);
        if (error) {
          console.error('❌ PKCE exchange failed:', error);
          return;
        }
        console.log('✅ Email confirmation successful — session established');
        return;
      }

      // Case 3: Legacy implicit flow. Supabase returned tokens directly in
      // the URL fragment. Preserved so older email templates / redirects
      // that haven't been cut over still work.
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      if (accessToken && refreshToken) {
        console.log('🔗 Found implicit-flow tokens, setting session...');
        const success = await this.supabaseService.handleDeepLinkSession(
          window.location.href
        );
        if (success) {
          console.log('✅ Email confirmation successful — session established');
        } else {
          console.error('❌ Failed to establish session from tokens');
        }
        return;
      }

      console.log('ℹ️ No auth material in URL — user must log in manually');
    } catch (error) {
      console.error('❌ Error handling email confirmation:', error);
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToWelcome() {
    this.router.navigate(['/welcome']);
  }
}
