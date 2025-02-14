import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WelcomePage } from './welcome.page';
import { WelcomePageRoutingModule } from './welcome-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule, WelcomePageRoutingModule],
  declarations: [WelcomePage],
})
export class WelcomePageModule {}
