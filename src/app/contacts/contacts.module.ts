import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactDetailDialogModule } from './contact-detail-dialog/contact-detail-dialog.module';

import { ContactListPageComponent } from './contact-list-page/contact-list-page.component';
import { ContactSearchPageComponent } from './contact-search-page/contact-search-page.component';

import { ContactService } from './shared/contact.service';
import { ContactStorage } from './shared/contact.storage';
import { SharedContactListPageComponent } from './shared-contact-list-page/shared-contact-list-page.component';

@NgModule({
  imports: [
    SharedModule,
    ContactsRoutingModule,
    ContactDetailDialogModule
  ],
  providers: [
    ContactService,
    ContactStorage
  ],
  declarations: [
    ContactListPageComponent,
    ContactSearchPageComponent,
    SharedContactListPageComponent,
  ],
  exports: [
  ],
  entryComponents: [
  ]
})
export class ContactsModule { }
