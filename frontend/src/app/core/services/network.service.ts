import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Sub-task 10.3 — Offline detection.
 *
 * Exposes a hot `isOnline$` observable backed by a BehaviorSubject that is
 * seeded with the current `navigator.onLine` value and updated whenever the
 * browser fires `online` or `offline` window events.
 *
 * Named handler references are required so removeEventListener can correctly
 * deregister them on service destroy (anonymous arrows cannot be removed).
 */
@Injectable({
  providedIn: 'root',
})
export class NetworkService implements OnDestroy {
  private readonly onlineSubject = new BehaviorSubject<boolean>(navigator.onLine);

  /** Observable of the current network reachability state. */
  readonly isOnline$ = this.onlineSubject.asObservable();

  /** Synchronous getter for the current online state. */
  get isOnline(): boolean {
    return this.onlineSubject.getValue();
  }

  private readonly onlineHandler  = () => this.onlineSubject.next(true);
  private readonly offlineHandler = () => this.onlineSubject.next(false);

  constructor() {
    window.addEventListener('online',  this.onlineHandler);
    window.addEventListener('offline', this.offlineHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('online',  this.onlineHandler);
    window.removeEventListener('offline', this.offlineHandler);
    this.onlineSubject.complete();
  }
}
