import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { AuthService } from '@core/services/auth.service';
import { Subscription } from 'rxjs';

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
  ],
})
export class StandingsPage implements OnInit, OnDestroy {
  currentUserId: string | null = null;
  groupStandings: GroupWithStandings[] = [];
  private groupsSubscription?: Subscription;

  constructor(
    private router: Router,
    private groupService: GroupService,
    private authService: AuthService
  ) {
    addIcons({footballOutline,personOutline,peopleOutline,personAddOutline,chevronForwardOutline,trophyOutline,arrowUpOutline,arrowDownOutline,removeOutline,});
  }

  ngOnInit() {
    this.currentUserId = this.authService.getCurrentUser()?.id || null;
    this.loadGroupStandings();
    
    // Subscribe to group updates
    this.groupsSubscription = this.groupService.groups$.subscribe(() => {
      this.loadGroupStandings();
    });
  }

  ngOnDestroy() {
    if (this.groupsSubscription) {
      this.groupsSubscription.unsubscribe();
    }
  }

  private loadGroupStandings() {
    // Use the new optimized method from group service
    this.groupStandings = this.groupService.getUserGroupsWithStandings();
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

  isCurrentUser(userId: string): boolean {
    return userId === this.currentUserId;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
