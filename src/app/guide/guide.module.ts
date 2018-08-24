import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GuideRoutingModule } from './guide-routing.module';

@NgModule({
  imports: [
    SharedModule,
    GuideRoutingModule
  ],
  declarations: []
})
export class GuideModule { }
