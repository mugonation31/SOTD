import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { MockDataService } from './services/mock-data.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService, MockDataService],
})
export class CoreModule {}
