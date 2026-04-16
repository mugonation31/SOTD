import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-countdown-timer',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="countdown-timer" *ngIf="!isPassed; else lockedTpl">
      {{ remaining.days }}d {{ remaining.hours }}h
      {{ remaining.minutes }}m {{ remaining.seconds }}s
    </span>
    <ng-template #lockedTpl>
      <span class="countdown-timer locked">Predictions Locked</span>
    </ng-template>
  `,
})
export class CountdownTimerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() deadline: string | Date | null = null;
  @Output() deadlinePassed = new EventEmitter<void>();

  remaining: TimeRemaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  isPassed = false;

  private intervalId: ReturnType<typeof setInterval> | null = null;
  private hasEmitted = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.restart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reset state when the parent rebinds [deadline] without destroying the element
    // (e.g., gameweek navigation on the matches page).
    if (changes['deadline'] && !changes['deadline'].firstChange) {
      this.restart();
    }
  }

  ngOnDestroy(): void {
    this.stopTicker();
  }

  private restart(): void {
    this.stopTicker();
    this.hasEmitted = false;
    this.tick();
    if (this.deadline && !this.isPassed) {
      this.intervalId = setInterval(() => {
        this.tick();
        this.cdr.markForCheck();
      }, 1000);
    }
  }

  private tick(): void {
    const deadlineMs = this.parseDeadline(this.deadline);

    if (deadlineMs === null) {
      // Null / invalid → locked, no emit
      this.isPassed = true;
      this.remaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return;
    }

    const diff = deadlineMs - Date.now();

    if (diff <= 0) {
      this.isPassed = true;
      this.remaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      this.emitPassedOnce();
      this.stopTicker();
      return;
    }

    this.isPassed = false;
    this.remaining = this.toTimeRemaining(diff);
  }

  private parseDeadline(value: string | Date | null): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const date = value instanceof Date ? value : new Date(value);
    const ms = date.getTime();
    return Number.isNaN(ms) ? null : ms;
  }

  private toTimeRemaining(diffMs: number): TimeRemaining {
    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / 86_400);
    const hours = Math.floor((totalSeconds % 86_400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
  }

  private emitPassedOnce(): void {
    if (this.hasEmitted) {
      return;
    }
    // Only emit when a real deadline was supplied (not null/invalid)
    if (this.parseDeadline(this.deadline) === null) {
      return;
    }
    this.hasEmitted = true;
    this.deadlinePassed.emit();
  }

  private stopTicker(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
