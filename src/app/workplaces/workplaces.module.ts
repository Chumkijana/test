import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

import { WorkplaceService } from './shared/workplace.service';
import { WorkplaceStorage } from './shared/workplace.storage';
import { WorkplaceInterceptor } from './workplace.interceptor';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    WorkplaceService,
    WorkplaceStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WorkplaceInterceptor,
      multi: true
    }
  ],
  declarations: []
})
export class WorkplacesModule { }
