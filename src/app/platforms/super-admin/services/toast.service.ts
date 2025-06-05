import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async showToast(message: string, type: 'success' | 'error' | 'warning') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color:
        type === 'success'
          ? 'success'
          : type === 'error'
          ? 'danger'
          : 'warning',
      position: 'bottom',
    });

    await toast.present();
  }
}
