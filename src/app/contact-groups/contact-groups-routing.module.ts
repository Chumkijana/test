import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { ContactGroupDetailPageComponent } from './contact-group-detail-page/contact-group-detail-page.component';
import { ContactGroupCollaborationPageComponent } from './contact-group-collaboration-page/contact-group-collaboration-page.component';
import { ContactGroupListPageComponent } from './contact-group-list-page/contact-group-list-page.component';

const contactGroupRoutes: Routes = [
  {
    path: 'contact-groups',
    component: ContactGroupListPageComponent,
    pathMatch: 'full',
    data: {
      title: 'Contact Groups'
    }
  },
  // {
  //   path: 'contact-groups/:id',
  //   component: ContactGroupDetailPageComponent
  // },
  {
    path: 'contact-groups/:id/collaboration',
    component: ContactGroupCollaborationPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(contactGroupRoutes)]
})
export class ContactGroupsRoutingModule { }
