import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

import { AuthInterceptor } from './auth.interceptor';
import { AuthStorage } from './shared/auth.storage';
import { AuthService } from './shared/auth.service';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [],
  providers: [
    AuthService,
    AuthStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  declarations: []
})
export class AuthModule { }
