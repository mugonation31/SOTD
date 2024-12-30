import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async showToast(
    message: string,
    type: 'success' | 'error' | 'warning' = 'success'
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color:
        type === 'success'
          ? 'success'
          : type === 'error'
          ? 'danger'
          : 'warning',
    });
    await toast.present();
  }
}
