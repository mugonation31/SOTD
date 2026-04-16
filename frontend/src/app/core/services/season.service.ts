import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SupabaseDataService } from './supabase-data.service';

export interface SeasonInfo {
  currentGameweek: number;
  totalGameweeks: number;
  isSeasonStarted: boolean;
  isSeasonEnded: boolean;
}

const DEFAULT_GAMEWEEK = 1;
const DEFAULT_TOTAL_GAMEWEEKS = 38;

@Injectable({
  providedIn: 'root',
})
export class SeasonService {
  private seasonInfo = new BehaviorSubject<SeasonInfo>({
    currentGameweek: DEFAULT_GAMEWEEK,
    totalGameweeks: DEFAULT_TOTAL_GAMEWEEKS,
    isSeasonStarted: false,
    isSeasonEnded: false,
  });

  private initPromise?: Promise<void>;

  constructor(private supabaseDataService: SupabaseDataService) {
    // Fire-and-forget init so existing consumers don't have to await.
    void this.init();
  }

  init(): Promise<void> {
    return (this.initPromise ??= this.doInit());
  }

  private async doInit(): Promise<void> {
    const [activeGameweek, allGameweeks] = await Promise.all([
      this.safeGetActiveGameweek(),
      this.safeGetGameweeks(),
    ]);

    const currentGameweek = activeGameweek?.number ?? DEFAULT_GAMEWEEK;
    const totalGameweeks = allGameweeks.length || DEFAULT_TOTAL_GAMEWEEKS;
    const isSeasonStarted = !!activeGameweek;
    const isSeasonEnded = false;

    this.seasonInfo.next({
      currentGameweek,
      totalGameweeks,
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

  getTotalGameweeks(): number {
    return this.seasonInfo.value.totalGameweeks;
  }

  isSeasonStarted(): boolean {
    return this.seasonInfo.value.isSeasonStarted;
  }

  isSeasonEnded(): boolean {
    return this.seasonInfo.value.isSeasonEnded;
  }

  private async safeGetActiveGameweek(): Promise<{ number: number } | null> {
    try {
      return await this.supabaseDataService.getActiveGameweek();
    } catch {
      return null;
    }
  }

  private async safeGetGameweeks(): Promise<Array<{ number: number }>> {
    try {
      return await this.supabaseDataService.getGameweeks();
    } catch {
      return [];
    }
  }
}
