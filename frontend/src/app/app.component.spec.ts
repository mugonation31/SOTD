import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { IonApp, IonRouterOutlet, ToastController } from '@ionic/angular/standalone';
import { NetworkService } from './core/services/network.service';
import { BehaviorSubject } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, IonApp, IonRouterOutlet],
      providers: [
        provideRouter([]),
        provideHttpClient()
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

describe('AppComponent — offline toast wiring', () => {
  let mockOnline$: BehaviorSubject<boolean>;
  let mockNetworkService: { isOnline$: BehaviorSubject<boolean> };
  let mockToast: { present: jest.Mock; dismiss: jest.Mock };
  let mockToastController: { create: jest.Mock };

  beforeEach(async () => {
    mockOnline$ = new BehaviorSubject<boolean>(true);
    mockNetworkService = { isOnline$: mockOnline$ };

    mockToast = {
      present: jest.fn().mockResolvedValue(undefined),
      dismiss: jest.fn().mockResolvedValue(undefined),
    };
    mockToastController = {
      create: jest.fn().mockResolvedValue(mockToast),
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent, IonApp, IonRouterOutlet],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: NetworkService, useValue: mockNetworkService },
        { provide: ToastController, useValue: mockToastController },
      ],
    }).compileComponents();
  });

  it('should create and present an offline toast when isOnline$ emits false', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.componentInstance.ngOnInit();

    mockOnline$.next(false);
    await Promise.resolve(); // flush microtasks

    expect(mockToastController.create).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'No internet connection — please check your network',
        color: 'danger',
        icon: 'wifi-outline',
        position: 'bottom',
      })
    );
    expect(mockToast.present).toHaveBeenCalled();
  });

  it('should not include a duration on the offline toast (persistent)', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.componentInstance.ngOnInit();

    mockOnline$.next(false);
    await Promise.resolve();

    const callArg = mockToastController.create.mock.calls[0][0];
    expect(callArg.duration).toBeUndefined();
  });

  it('should dismiss the toast when isOnline$ emits true after being offline', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.componentInstance.ngOnInit();

    mockOnline$.next(false);
    await Promise.resolve();
    mockOnline$.next(true);
    await Promise.resolve();

    expect(mockToast.dismiss).toHaveBeenCalled();
  });

  it('should stop reacting after ngOnDestroy — no toast created on further emissions', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    await component.ngOnInit();

    component.ngOnDestroy();
    mockToastController.create.mockClear();

    mockOnline$.next(false);
    await Promise.resolve();

    expect(mockToastController.create).not.toHaveBeenCalled();
  });
});
