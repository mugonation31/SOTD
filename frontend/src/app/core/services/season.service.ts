import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SeasonInfo {
  currentGameweek: number;
  totalGameweeks: number;
  seasonStartDate: Date;
  seasonEndDate: Date;
  isSeasonStarted: boolean;
  isSeasonEnded: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SeasonService {
  private seasonInfo = new BehaviorSubject<SeasonInfo>({
    currentGameweek: 0,
    totalGameweeks: 38,
    seasonStartDate: new Date('2024-08-10'),
    seasonEndDate: new Date('2025-05-19'),
    isSeasonStarted: false,
    isSeasonEnded: false,
  });

  constructor() {
    // Initialize season status
    this.updateSeasonStatus();
    // Update status every hour
    setInterval(() => this.updateSeasonStatus(), 3600000);
  }

  private updateSeasonStatus() {
    const now = new Date();
    const currentInfo = this.seasonInfo.value;

    const isSeasonStarted = now >= currentInfo.seasonStartDate;
    const isSeasonEnded = now >= currentInfo.seasonEndDate;

    // Calculate current gameweek based on season progress
    let currentGameweek = 0;
    if (isSeasonStarted && !isSeasonEnded) {
      const totalDays =
        (currentInfo.seasonEndDate.getTime() -
          currentInfo.seasonStartDate.getTime()) /
        (1000 * 60 * 60 * 24);
      const daysElapsed =
        (now.getTime() - currentInfo.seasonStartDate.getTime()) /
        (1000 * 60 * 60 * 24);
      currentGameweek =
        Math.floor((daysElapsed / totalDays) * currentInfo.totalGameweeks) + 1;
    } else if (isSeasonEnded) {
      currentGameweek = currentInfo.totalGameweeks;
    }

    this.seasonInfo.next({
      ...currentInfo,
      currentGameweek,
      isSeasonStarted,
      isSeasonEnded,
    });
  }

  getSeasonInfo(): Observable<SeasonInfo> {
    return this.seasonInfo.asObservable();
  }

  getCurrentGameweek(): number {
    return this.seasonInfo.value.currentGameweek;
  }

  isSeasonStarted(): boolean {
    return this.seasonInfo.value.isSeasonStarted;
  }

  isSeasonEnded(): boolean {
    return this.seasonInfo.value.isSeasonEnded;
  }
}
