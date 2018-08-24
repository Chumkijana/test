import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FacebookService } from 'ngx-facebook';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogService } from './dialog.service';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    DialogService,
    FacebookService
  ],
  declarations: [
    ConfirmDialogComponent,
    WelcomeDialogComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    InviteDialogComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    WelcomeDialogComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    InviteDialogComponent
  ]
})
export class DialogModule { }
