import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactListPageComponent } from './contact-list-page/contact-list-page.component';
import { ContactSearchPageComponent } from './contact-search-page/contact-search-page.component';
import { SharedContactListPageComponent } from './shared-contact-list-page/shared-contact-list-page.component';

const contactRoutes: Routes = [
  {
    path: 'contacts',
    component: ContactListPageComponent,
    pathMatch: 'full',
    data: {
      title: 'Contacts'
    }
  },
  {
    path: 'shared-contacts',
    component: SharedContactListPageComponent
  },
  {
    path: 'contacts/search',
    component: ContactSearchPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(contactRoutes)
  ]
})
export class ContactsRoutingModule { }
