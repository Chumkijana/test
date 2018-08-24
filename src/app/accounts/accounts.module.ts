import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AccountService } from './shared/account.service';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    AccountService
  ],
  declarations: []
})
export class AccountsModule { }
