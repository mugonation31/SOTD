import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardContent, 
  IonButton, 
  IonItem, 
  IonLabel, 
  IonInput,
  IonText,
  IonList
} from '@ionic/angular/standalone';
import { AuthService } from './core/services/auth.service';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-debug-auth',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Debug Authentication</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-content>
          <h2>Authentication Debug Panel</h2>
          
          <ion-item>
            <ion-label>Current Auth Mode:</ion-label>
            <ion-text color="primary">{{ authMode }}</ion-text>
          </ion-item>

          <ion-item>
            <ion-label>Supabase User:</ion-label>
            <ion-text color="primary">{{ supabaseUser ? supabaseUser.email : 'None' }}</ion-text>
          </ion-item>

          <ion-item>
            <ion-label>Supabase Session:</ion-label>
            <ion-text color="primary">{{ supabaseSession ? 'Active' : 'None' }}</ion-text>
          </ion-item>

          <ion-item>
            <ion-label>AuthService User:</ion-label>
            <ion-text color="primary">{{ authServiceUser ? authServiceUser.user.email : 'None' }}</ion-text>
          </ion-item>

          <div style="margin-top: 20px;">
            <ion-button (click)="enableSupabase()" color="primary" fill="outline">
              Enable Supabase Auth
            </ion-button>
            
            <ion-button (click)="clearLocks()" color="warning" fill="outline">
              Clear Auth Locks
            </ion-button>
            
            <ion-button (click)="emergencyReset()" color="danger" fill="outline">
              Emergency Reset
            </ion-button>
            
            <ion-button (click)="testLogin()" color="success" fill="outline">
              Test Login
            </ion-button>
          </div>

          <div style="margin-top: 20px;">
            <h3>Test Login</h3>
            <ion-item>
              <ion-label position="stacked">Email</ion-label>
              <ion-input [(ngModel)]="testEmail" placeholder="vofal40476@knilok.com"></ion-input>
            </ion-item>
            
            <ion-item>
              <ion-label position="stacked">Password</ion-label>
              <ion-input [(ngModel)]="testPassword" type="password" placeholder="Your password"></ion-input>
            </ion-item>
          </div>

          <div style="margin-top: 20px;">
            <ion-text color="medium">
              <p>Status: {{ status }}</p>
            </ion-text>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonText,
    IonList,
    CommonModule,
    FormsModule
  ]
})
export class DebugAuthPage {
  authMode = 'Mock';
  supabaseUser: any = null;
  supabaseSession: any = null;
  authServiceUser: any = null;
  status = 'Ready';
  
  testEmail = 'vofal40476@knilok.com';
  testPassword = '';

  constructor(
    private authService: AuthService,
    private supabaseService: SupabaseService
  ) {
    this.updateStatus();
  }

  updateStatus() {
    // Check auth mode
    const useSupabase = localStorage.getItem('useSupabase') === 'true';
    this.authMode = useSupabase ? 'Supabase' : 'Mock';
    
    // Get current users
    this.supabaseUser = this.supabaseService.currentUser;
    this.supabaseSession = this.supabaseService.currentSession;
    this.authServiceUser = this.authService.currentUserValue;
  }

  async enableSupabase() {
    this.status = 'Enabling Supabase...';
    this.authService.enableSupabaseAuth();
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.updateStatus();
    this.status = 'Supabase enabled!';
  }

  async clearLocks() {
    this.status = 'Clearing locks...';
    await this.authService.clearAuthLocks();
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.updateStatus();
    this.status = 'Locks cleared!';
  }

  async emergencyReset() {
    this.status = 'Emergency reset...';
    await this.authService.emergencyReset();
    await new Promise(resolve => setTimeout(resolve, 3000));
    this.updateStatus();
    this.status = 'Emergency reset complete!';
  }

  async testLogin() {
    if (!this.testEmail || !this.testPassword) {
      this.status = 'Please enter email and password';
      return;
    }

    this.status = 'Testing login...';
    
    try {
      const result = await this.authService.login({
        email: this.testEmail,
        password: this.testPassword,
        securityQuestion: '',
        securityAnswer: ''
      }).toPromise();
      
      this.updateStatus();
      this.status = `Login successful! User: ${result?.user.email}`;
    } catch (error) {
      this.status = `Login failed: ${error}`;
      console.error('Login error:', error);
    }
  }
}
