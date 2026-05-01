import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trophyOutline, arrowUpOutline, arrowDownOutline, removeOutline, peopleOutline } from 'ionicons/icons';
import { Standing } from '@core/services/group.service';

interface SeparatorRow { readonly isSeparator: true }
const SEPARATOR: SeparatorRow = { isSeparator: true };
type RowItem = Standing | SeparatorRow;

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  imports: [NgFor, NgIf, NgClass, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonBadge],
})
export class LeaderboardComponent {
  @Input() standings: Standing[] = [];
  @Input() currentUserId: string | null = null;
  @Input() userPosition: number | null = null;
  @Input() maxRows: number | null = null;
  @Output() viewAllClicked = new EventEmitter<void>();

  constructor() {
    addIcons({ trophyOutline, arrowUpOutline, arrowDownOutline, removeOutline, peopleOutline });
  }

  get visibleRows(): RowItem[] {
    if (this.maxRows === null) return this.standings;
    const top = this.standings.slice(0, this.maxRows);
    const userRow = this.standings.find(s => s.userId === this.currentUserId);
    const userInTop = top.some(s => s.userId === this.currentUserId);
    if (!userRow || userInTop) return top;
    return [...top, SEPARATOR, userRow];
  }

  isSeparator(row: RowItem): row is SeparatorRow {
    return 'isSeparator' in row && row.isSeparator === true;
  }

  isCurrentUser(userId: string): boolean {
    return userId === this.currentUserId;
  }

  getPositionChange(current: number, previous: number): string {
    if (current === previous) return 'same';
    return current < previous ? 'up' : 'down';
  }

  getPositionIcon(change: string): string {
    return change === 'up' ? 'arrow-up-outline' : change === 'down' ? 'arrow-down-outline' : 'remove-outline';
  }

  getPositionColor(change: string): string {
    return change === 'up' ? 'success' : change === 'down' ? 'danger' : 'medium';
  }

  onViewAll(): void {
    this.viewAllClicked.emit();
  }

  hasViewAllListener(): boolean {
    return this.viewAllClicked.observed;
  }
}
