import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonList,
  IonCard,
  IonCardContent,
  IonText,
  IonNote,
  IonIcon,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  arrowForwardOutline,
  footballOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.page.html',
  styleUrls: ['./join-group.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonList,
    IonCard,
    IonCardContent,
    IonText,
    IonNote,
    IonIcon,
    FormsModule,
    NgIf,
    RouterLink,
  ],
})
export class JoinGroupPage {
  groupCode: string = '';
  validationError: string = '';
  isLoading: boolean = false;

  constructor(private router: Router) {
    addIcons({ peopleOutline, arrowForwardOutline, footballOutline });
  }

  validateGroupCode() {
    if (!this.groupCode) {
      this.validationError = 'Group code is required';
      return false;
    }

    if (this.groupCode.length < 6) {
      this.validationError = 'Group code must be at least 6 characters';
      return false;
    }

    this.validationError = '';
    return true;
  }

  onJoinGroup() {
    if (!this.validateGroupCode()) return;

    this.isLoading = true;

    // TODO: Replace with actual group joining logic when backend is ready
    setTimeout(() => {
      this.isLoading = false;
      // Mock successful join
      localStorage.setItem('hasJoinedGroup', 'true');
      this.router.navigate(['/player/dashboard'], { replaceUrl: true });
    }, 1000);
  }
}
