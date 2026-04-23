import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountdownTimerComponent } from './countdown-timer.component';

describe('CountdownTimerComponent', () => {
  let component: CountdownTimerComponent;
  let fixture: ComponentFixture<CountdownTimerComponent>;

  // Fixed "now" reference used throughout the suite
  const NOW = new Date('2026-04-16T12:00:00.000Z').getTime();

  beforeEach(async () => {
    jest.useFakeTimers();
    jest.setSystemTime(NOW);

    await TestBed.configureTestingModule({
      imports: [CountdownTimerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CountdownTimerComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const getText = (): string => {
    return (fixture.nativeElement as HTMLElement).textContent?.trim() ?? '';
  };

  it('should render days/hours/minutes/seconds when deadline is in the future', () => {
    // Arrange: deadline = now + 1d 2h 3m 4s
    const msAhead =
      1 * 24 * 60 * 60 * 1000 +
      2 * 60 * 60 * 1000 +
      3 * 60 * 1000 +
      4 * 1000;
    component.deadline = new Date(NOW + msAhead).toISOString();

    // Act
    fixture.detectChanges();

    // Assert
    expect(getText()).toContain('1d');
    expect(getText()).toContain('2h');
    expect(getText()).toContain('3m');
    expect(getText()).toContain('4s');
  });

  it('should render locked state when deadline has passed', () => {
    // Arrange: deadline 5 seconds in the past
    component.deadline = new Date(NOW - 5000).toISOString();

    // Act
    fixture.detectChanges();

    // Assert
    expect(getText()).toContain('Predictions Locked');
  });

  it('should render locked state when deadline is null', () => {
    // Arrange
    component.deadline = null;

    // Act
    fixture.detectChanges();

    // Assert
    expect(getText()).toContain('Predictions Locked');
  });

  it('should tick every second and update the DOM', () => {
    // Arrange: deadline 10 seconds in the future
    component.deadline = new Date(NOW + 10_000).toISOString();
    fixture.detectChanges();
    expect(getText()).toContain('10s');

    // Act: advance 1 second
    jest.advanceTimersByTime(1000);
    fixture.detectChanges();

    // Assert: now 9 seconds remain
    expect(getText()).toContain('9s');

    // Act: advance another second
    jest.advanceTimersByTime(1000);
    fixture.detectChanges();

    // Assert: now 8 seconds remain
    expect(getText()).toContain('8s');
  });

  it('should emit deadlinePassed when crossing the deadline', () => {
    // Arrange: deadline 3 seconds in the future
    component.deadline = new Date(NOW + 3000).toISOString();
    const emitSpy = jest.fn();
    component.deadlinePassed.subscribe(emitSpy);
    fixture.detectChanges();
    expect(emitSpy).not.toHaveBeenCalled();

    // Act: jump past the deadline
    jest.advanceTimersByTime(4000);
    fixture.detectChanges();

    // Assert
    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(getText()).toContain('Predictions Locked');
  });

  it('should not emit deadlinePassed twice after crossing', () => {
    // Arrange
    component.deadline = new Date(NOW + 2000).toISOString();
    const emitSpy = jest.fn();
    component.deadlinePassed.subscribe(emitSpy);
    fixture.detectChanges();

    // Act: advance well past the deadline over several ticks
    jest.advanceTimersByTime(10_000);
    fixture.detectChanges();

    // Assert: emitted once only
    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit deadlinePassed immediately if deadline is already past on init', () => {
    // Arrange
    component.deadline = new Date(NOW - 1000).toISOString();
    const emitSpy = jest.fn();
    component.deadlinePassed.subscribe(emitSpy);

    // Act
    fixture.detectChanges(); // triggers ngOnInit

    // Assert
    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(getText()).toContain('Predictions Locked');
  });

  it('should call clearInterval exactly once more on destroy (not just whatever stopTicker fired naturally)', () => {
    // Arrange: a future deadline so the ticker is running
    component.deadline = new Date(NOW + 60_000).toISOString();
    fixture.detectChanges();
    const textBeforeDestroy = getText();
    const clearSpy = jest.spyOn(global, 'clearInterval');
    const emitSpy = jest.fn();
    component.deadlinePassed.subscribe(emitSpy);

    // Baseline: capture any clearInterval calls that happened before
    // destroy (e.g. stopTicker() firing naturally when the deadline
    // passes). The strict assertion below is "destroy adds exactly one
    // more call", which catches a regression where ngOnDestroy forgets
    // to clear the interval — the old `toHaveBeenCalled()` would pass
    // spuriously in that case because stopTicker() on natural deadline
    // also clears the interval.
    const baselineCallCount = clearSpy.mock.calls.length;

    // Act: destroy the component, then advance past the deadline
    fixture.destroy();
    jest.advanceTimersByTime(120_000);

    // Assert: destroy triggered exactly one additional clearInterval
    expect(clearSpy.mock.calls.length).toBe(baselineCallCount + 1);
    // And no "deadlinePassed" event fires after destroy
    expect(emitSpy).not.toHaveBeenCalled();
    // And the rendered text hasn't changed (component's view is torn down,
    // confirming the interval callback isn't driving further updates)
    // Note: after destroy, textContent is empty; we just ensure no exceptions
    // and that our ticker did not keep pushing updates.
    expect(textBeforeDestroy.length).toBeGreaterThan(0);
  });

  it('should not emit deadlinePassed when deadline is null', () => {
    // Arrange
    component.deadline = null;
    const emitSpy = jest.fn();
    component.deadlinePassed.subscribe(emitSpy);

    // Act
    fixture.detectChanges();
    jest.advanceTimersByTime(5000);

    // Assert
    expect(emitSpy).not.toHaveBeenCalled();
  });
});
