import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2Webstorage } from 'ngx-webstorage';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { StatusModule } from './status/status.module';
import { DialogModule } from './dialog/dialog.module';

import { ApiBaseUrlInterceptor } from './api-base-url.interceptor';
import { SyncService } from './sync.service';
import { ScrollService } from './scroll.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    Ng2Webstorage.forRoot({ prefix: 'app', separator: '|', caseSensitive: false }),

    DialogModule,
    SharedModule,
    StatusModule
  ],
  exports: [
    SharedModule,
    StatusModule,
    DialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiBaseUrlInterceptor,
      multi: true
    },
    ScrollService,
    SyncService
  ],
  declarations: []
})
export class CoreModule { }
