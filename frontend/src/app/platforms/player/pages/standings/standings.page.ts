import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonAvatar,
  IonButtons,
  IonButton,
  IonSkeletonText,
  ToastController,
} from '@ionic/angular/standalone';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  trophyOutline,
  arrowUpOutline,
  arrowDownOutline,
  removeOutline,
  peopleOutline,
  footballOutline,
  personOutline, personAddOutline, chevronForwardOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { GroupService, Standing, GroupWithStandings } from '@core/services/group.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.page.html',
  styleUrls: ['./standings.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonAvatar,
    DatePipe,
    NgFor,
    NgIf,
    FormsModule,
    IonButtons,
    IonButton,
    IonSkeletonText,
  ],
})
export class StandingsPage implements OnInit {
  isLoading = false;
  groupStandings: GroupWithStandings[] = [];

  constructor(
    private router: Router,
    private groupService: GroupService,
    private toastController: ToastController
  ) {
    addIcons({footballOutline,personOutline,peopleOutline,personAddOutline,chevronForwardOutline,trophyOutline,arrowUpOutline,arrowDownOutline,removeOutline,});
  }

  // Ionic fires ionViewWillEnter on every entry (first + subsequent) so
  // it is the single refresh hook. ngOnInit intentionally no-ops to avoid
  // a double-fetch on first navigation.
  async ngOnInit(): Promise<void> {
    return;
  }

  async ionViewWillEnter() {
    await this.loadGroupStandings();
  }

  private async loadGroupStandings() {
    this.isLoading = true;
    try {
      this.groupStandings = await this.groupService.getUserGroupsWithStandings();
    } catch (error) {
      console.error('Error loading standings:', error);
      this.groupStandings = [];
      await this.showErrorToast('Unable to load standings. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  private async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'danger',
    });
    await toast.present();
  }

  // Track by function for better performance when rendering groups
  trackByGroupId(index: number, item: GroupWithStandings): string {
    return item.group.id;
  }

  viewGroupStandings(groupId: string) {
    this.router.navigate(['/player/group-standings', groupId]);
  }

  getPositionChange(current: number, previous: number): string {
    if (current === previous) return 'same';
    return current < previous ? 'up' : 'down';
  }

  getPositionIcon(change: string): string {
    switch (change) {
      case 'up':
        return 'arrow-up-outline';
      case 'down':
        return 'arrow-down-outline';
      default:
        return 'remove-outline';
    }
  }

  getPositionColor(change: string): string {
    switch (change) {
      case 'up':
        return 'success';
      case 'down':
        return 'danger';
      default:
        return 'medium';
    }
  }


  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
