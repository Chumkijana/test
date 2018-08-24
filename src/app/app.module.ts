import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AddOptionModule } from './add-option/add-option.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { ContactsModule } from './contacts/contacts.module';
import { CoreModule } from './core/core.module';
import { ContactGroupsModule } from './contact-groups/contact-groups.module';
import { ContactGroupItemsModule } from './contact-group-items/contact-group-items.module';
import { DrawerModule } from './drawer/drawer.module';
import { HeaderModule } from './header/header.module';
import { WorkplacesModule } from './workplaces/workplaces.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { NewContactPageComponent } from './new-contact-page/new-contact-page.component';
import { ShareWithMePageComponent } from './share-with-me-page/share-with-me-page.component';
import { RecentPageComponent } from './recent-page/recent-page.component';
import { VipPageComponent } from './vip-page/vip-page.component';
import { BinPageComponent } from './bin-page/bin-page.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { SettingPageComponent } from './setting-page/setting-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { PlanPageComponent } from './plan-page/plan-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { NewGroupPageComponent } from './new-group-page/new-group-page.component';
import { NewPhotoPageComponent } from './new-photo-page/new-photo-page.component';
import { NewQrcodePageComponent } from './new-qrcode-page/new-qrcode-page.component';
import { ContactDetailPageComponent } from './contact-detail-page/contact-detail-page.component';
import { ContactListContainerComponent } from './contact-list-container/contact-list-container.component';
import { ContactGroupListComponent } from './contact-group-list/contact-group-list.component';
import { ContactGroupListContainerComponent } from './contact-group-list-container/contact-group-list-container.component';
import { ContactGroupDetailPageComponent } from './contact-group-detail-page/contact-group-detail-page.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonListContainerComponent } from './person-list-container/person-list-container.component';
import { ContactGroupShareDialogComponent } from './contact-group-share-dialog/contact-group-share-dialog.component';
import { PortalListDialogComponent } from './portal-list-dialog/portal-list-dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AddOptionModule,
    AuthModule,
    AccountsModule,
    CoreModule,
    ContactsModule,
    ContactGroupsModule,
    ContactGroupItemsModule,
    DrawerModule,
    HeaderModule,
    WorkplacesModule
  ],
  exports: [],
  providers: [],
  declarations: [
    AppComponent,
    HomePageComponent,
    AppLayoutComponent,
    SearchPageComponent,
    ResultPageComponent,
    NewContactPageComponent,
    ShareWithMePageComponent,
    RecentPageComponent,
    VipPageComponent,
    BinPageComponent,
    NotificationPageComponent,
    SettingPageComponent,
    HelpPageComponent,
    PlanPageComponent,
    ProfilePageComponent,
    NewPhotoPageComponent,
    NewGroupPageComponent,
    ContactListContainerComponent,
    NewQrcodePageComponent,
    ContactDetailPageComponent,
    ContactGroupListComponent,
    ContactGroupListContainerComponent,
    ContactGroupDetailPageComponent,
    ContactListComponent,
    PersonListComponent,
    PersonListContainerComponent,
    ContactGroupShareDialogComponent,
    PortalListDialogComponent
  ],
  entryComponents: [
    ContactGroupShareDialogComponent,
    PortalListDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
