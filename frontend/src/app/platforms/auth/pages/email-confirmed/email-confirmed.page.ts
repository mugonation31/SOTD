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
    console.log('✅ Email confirmation page loaded');
    this.handleEmailConfirmation();
  }

  async handleEmailConfirmation() {
    try {
      console.log('🔍 Checking for Supabase session from email confirmation...');
      
      // Check if we have tokens in the URL fragment
      const url = new URL(window.location.href);
      const hashParams = new URLSearchParams(url.hash.slice(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      if (accessToken && refreshToken) {
        console.log('✅ Found tokens in URL, setting Supabase session...');
        
        // Set the session with the tokens from the email confirmation
        const { data, error } = await this.supabaseService.client.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        });
        
        if (error) {
          console.error('❌ Failed to set session:', error);
        } else {
          console.log('✅ Email confirmation successful, session established');
        }
      } else {
        console.log('ℹ️ No tokens found in URL, user may have already confirmed or accessed page directly');
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
