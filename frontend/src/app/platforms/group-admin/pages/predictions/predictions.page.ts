import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-group-admin-predictions',
  templateUrl: './predictions.page.html',
  styleUrls: ['./predictions.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class PredictionsPage {
  constructor() {}
}
