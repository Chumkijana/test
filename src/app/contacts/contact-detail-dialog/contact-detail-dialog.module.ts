import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ContactDetailDialogComponent } from './contact-detail-dialog.component';
import { ContactDetailDialogDescriptionComponent } from './contact-detail-dialog-description/contact-detail-dialog-description.component';
import { ContactDetailDialogInfoComponent } from './contact-detail-dialog-info/contact-detail-dialog-info.component';
import { ContactDetailDialogToolbarComponent } from './contact-detail-dialog-toolbar/contact-detail-dialog-toolbar.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
  ],
  providers: [
  ],
  declarations: [
    ContactDetailDialogDescriptionComponent,
    ContactDetailDialogInfoComponent,
    ContactDetailDialogToolbarComponent,
    ContactDetailDialogComponent
  ],
  entryComponents: [
    ContactDetailDialogComponent
  ]
})
export class ContactDetailDialogModule { }
