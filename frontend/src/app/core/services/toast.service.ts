import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

type ToastType = 'success' | 'error' | 'danger' | 'warning';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async showToast(
    message: string,
    type: ToastType = 'success',
    duration: number = 3000
  ) {
    // Convert 'error' type to 'danger' for Ionic color scheme
    const color = type === 'error' ? 'danger' : type;

    const toast = await this.toastController.create({
      message,
      color,
      duration,
      position: 'bottom',
    });

    await toast.present();
  }
}
