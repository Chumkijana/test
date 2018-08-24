import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UnsavedToolbarComponent } from './unsaved-toolbar/unsaved-toolbar.component';
import { StatusService } from './status.service';
import { UnconfirmedToolbarComponent } from './unconfirmed-toolbar/unconfirmed-toolbar.component';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [StatusService],
  exports: [
    UnconfirmedToolbarComponent,
    UnsavedToolbarComponent
  ],
  declarations: [
    UnconfirmedToolbarComponent,
    UnsavedToolbarComponent
  ]
})
export class StatusModule { }
