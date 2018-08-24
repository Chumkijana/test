import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { DrawerService } from './drawer.service';
import { DrawerComponent } from './drawer/drawer.component';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    DrawerService
  ],
  declarations: [
    DrawerComponent
  ],
  exports: [
    DrawerComponent
  ]
})
export class DrawerModule { }
