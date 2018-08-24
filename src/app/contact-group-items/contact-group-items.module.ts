import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ContactGroupItemService } from './shared/contact-group-item.service';
import { ContactGroupItemStorage } from './shared/contact-group-item.storage';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
  ],
  providers: [
    ContactGroupItemService,
    ContactGroupItemStorage
  ],
  declarations: [
  ]
})
export class ContactGroupItemsModule { }
