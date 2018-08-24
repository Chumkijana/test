import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderService } from './header.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    HeaderService
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
