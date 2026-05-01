import { TestBed } from '@angular/core/testing';
import { NetworkService } from './network.service';

// ---------------------------------------------------------------------------
// Sub-task 10.3 — NetworkService unit tests
// ---------------------------------------------------------------------------

describe('NetworkService', () => {
  let service: NetworkService;

  // Capture and restore window event listeners between tests
  let addEventListenerSpy: jest.SpyInstance;
  let onlineHandler: EventListenerOrEventListenerObject | null = null;
  let offlineHandler: EventListenerOrEventListenerObject | null = null;

  beforeEach(() => {
    // Intercept window.addEventListener so we can fire synthetic events
    addEventListenerSpy = jest
      .spyOn(window, 'addEventListener')
      .mockImplementation((event: string, handler: EventListenerOrEventListenerObject) => {
        if (event === 'online')  onlineHandler  = handler;
        if (event === 'offline') offlineHandler = handler;
      });

    TestBed.configureTestingModule({
      providers: [NetworkService],
    });

    service = TestBed.inject(NetworkService);
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    onlineHandler  = null;
    offlineHandler = null;
  });

  // -----------------------------------------------------------------------
  // Test 1: initial state mirrors navigator.onLine
  // -----------------------------------------------------------------------
  it('should start with the current navigator.onLine value on init', () => {
    // navigator.onLine is true in jsdom by default.
    // Whatever the current value is, the service must reflect it.
    let initialValue: boolean | undefined;
    service.isOnline$.subscribe((v) => (initialValue = v)).unsubscribe();

    expect(initialValue).toBe(navigator.onLine);
  });

  // -----------------------------------------------------------------------
  // Test 2: emits false when the offline window event fires
  // -----------------------------------------------------------------------
  it('should emit false when the offline window event fires', () => {
    const values: boolean[] = [];
    const sub = service.isOnline$.subscribe((v) => values.push(v));

    // Trigger the offline handler that the service registered
    expect(offlineHandler).not.toBeNull();
    (offlineHandler as EventListener)(new Event('offline'));

    sub.unsubscribe();

    expect(values[values.length - 1]).toBe(false);
  });

  // -----------------------------------------------------------------------
  // Test 3: emits true when the online window event fires
  // -----------------------------------------------------------------------
  it('should emit true when the online window event fires', () => {
    const values: boolean[] = [];
    const sub = service.isOnline$.subscribe((v) => values.push(v));

    // First go offline, then come back online
    (offlineHandler as EventListener)(new Event('offline'));
    (onlineHandler  as EventListener)(new Event('online'));

    sub.unsubscribe();

    expect(values[values.length - 1]).toBe(true);
  });

  // -----------------------------------------------------------------------
  // Test 4: registers both window event listeners on construction
  // -----------------------------------------------------------------------
  it('should register online and offline window event listeners on construction', () => {
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'online',
      expect.any(Function),
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'offline',
      expect.any(Function),
    );
  });

  // -----------------------------------------------------------------------
  // Test 5: isOnline$ is a hot observable (replays latest value to new subs)
  // -----------------------------------------------------------------------
  it('should replay the latest value to new subscribers after a state change', () => {
    // Force offline via the handler
    (offlineHandler as EventListener)(new Event('offline'));

    // A brand-new subscriber should immediately receive false
    let received: boolean | undefined;
    service.isOnline$.subscribe((v) => (received = v)).unsubscribe();

    expect(received).toBe(false);
  });
});
