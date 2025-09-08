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
      
      // Check if we have tokens in the URL fragment (for logging purposes only)
      const url = new URL(window.location.href);
      const hashParams = new URLSearchParams(url.hash.slice(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      if (accessToken && refreshToken) {
        // Note: We intentionally do NOT set the session here to prevent auto-login
        // The user must manually login after email confirmation
      } else {
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
