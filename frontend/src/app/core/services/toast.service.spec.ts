import { TestBed } from '@angular/core/testing';
import { ToastController } from '@ionic/angular/standalone';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  let mockToastController: any;

  beforeEach(() => {
    mockToastController = {
      create: jest.fn().mockResolvedValue({
        present: jest.fn()
      })
    };

    TestBed.configureTestingModule({
      providers: [
        ToastService,
        { provide: ToastController, useValue: mockToastController }
      ]
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have showToast method', () => {
    expect(typeof service.showToast).toBe('function');
  });

  it('should call toastController.create when showToast is called', async () => {
    await service.showToast('Test message', 'success');
    
    expect(mockToastController.create).toHaveBeenCalledWith({
      message: 'Test message',
      color: 'success',
      duration: 3000,
      position: 'bottom'
    });
  });

  it('should convert error type to danger color', async () => {
    await service.showToast('Error message', 'error');
    
    expect(mockToastController.create).toHaveBeenCalledWith({
      message: 'Error message',
      color: 'danger',
      duration: 3000,
      position: 'bottom'
    });
  });
}); 