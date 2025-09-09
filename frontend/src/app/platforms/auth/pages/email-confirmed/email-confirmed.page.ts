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
      
      // Check if we have tokens in the URL fragment
      const url = new URL(window.location.href);
      const hashParams = new URLSearchParams(url.hash.slice(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      if (accessToken && refreshToken) {
        console.log('🔗 Found auth tokens in URL, processing session...');
        
        // Set the session using the tokens from the email confirmation
        const success = await this.supabaseService.handleDeepLinkSession(window.location.href);
        
        if (success) {
          console.log('✅ Email confirmation successful, session established');
          // The app will automatically navigate based on the user's role and first login status
          // through the routing guards and session restoration flow
        } else {
          console.error('❌ Failed to establish session from email confirmation');
        }
      } else {
        console.log('ℹ️ No auth tokens found in URL - user may need to login manually');
      }
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
