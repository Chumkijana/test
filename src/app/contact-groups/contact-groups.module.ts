import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContactGroupsRoutingModule } from './contact-groups-routing.module';

// import { ContactGroupDetailPageComponent } from './contact-group-detail-page/contact-group-detail-page.component';
import { ContactGroupCollaborationPageComponent } from './contact-group-collaboration-page/contact-group-collaboration-page.component';
import { ContactGroupFormDialogComponent } from './contact-group-form-dialog/contact-group-form-dialog.component';

import { ContactGroupService } from './shared/contact-group.service';
import { ContactGroupStorage } from './shared/contact-group.storage';
import { ContactGroupListPageComponent } from './contact-group-list-page/contact-group-list-page.component';

@NgModule({
  imports: [
    SharedModule,
    ContactGroupsRoutingModule
  ],
  providers: [
    ContactGroupService,
    ContactGroupStorage
  ],
  declarations: [
    // ContactGroupDetailPageComponent,
    ContactGroupCollaborationPageComponent,
    ContactGroupFormDialogComponent,
    ContactGroupListPageComponent
  ],
  exports: [
    ContactGroupListPageComponent
  ],
  entryComponents: [
    ContactGroupFormDialogComponent
  ]
})
export class ContactGroupsModule { }
