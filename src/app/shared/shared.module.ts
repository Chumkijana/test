import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
// import { ContactListComponent } from '../contacts/shared/contact-list/contact-list.component';
import { ContactSearchButtonComponent } from '../contacts/shared/contact-search-button/contact-search-button.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,

    // ContactListComponent,
    ContactSearchButtonComponent
  ],
  providers: [
  ],
  declarations: [
    // ContactListComponent,
    ContactSearchButtonComponent
  ],
  entryComponents: [
  ]
})
export class SharedModule { }
