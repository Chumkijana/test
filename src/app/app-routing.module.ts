import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
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
import { ContactGroupDetailPageComponent } from './contact-group-detail-page/contact-group-detail-page.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
        data: {
          title: 'Contacts'
        }
      },
      {
        path: 'group-detail/:id',
        component: ContactGroupDetailPageComponent,
        data: {
          title: 'Contacts'
        }
      },
      {
        path: 'share-with-me',
        component: ShareWithMePageComponent,
        data: {
          title: 'Share with me'
        }
      },
      {
        path: 'recent',
        component: RecentPageComponent,
        data: {
          title: 'Recent'
        }
      },
      {
        path: 'vip',
        component: VipPageComponent,
        data: {
          title: 'VIP'
        }
      },
      {
        path: 'bin',
        component: BinPageComponent,
        data: {
          title: 'Bin'
        }
      },
      {
        path: 'notifications',
        component: NotificationPageComponent,
        data: {
          title: 'Notifications'
        }
      },
      {
        path: 'settings',
        component: SettingPageComponent,
        data: {
          title: 'Settings'
        }
      },
      {
        path: 'help',
        component: HelpPageComponent,
        data: {
          title: 'Help & Feedback'
        }
      },
      {
        path: 'plan',
        component: PlanPageComponent,
        data: {
          title: 'Upgrade'
        }
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
        data: {
          title: 'Profile'
        }
      }
    ]
  },
  {
    path: 'search',
    component: SearchPageComponent
  },
  {
    path: 'result',
    component: ResultPageComponent
  },
  {
    path: 'contact-new',
    component: NewContactPageComponent
  },
  {
    path: 'group-new',
    component: NewGroupPageComponent
  },
  {
    path: 'photo-new',
    component: NewPhotoPageComponent
  },
  {
    path: 'qrcode-new',
    component: NewQrcodePageComponent
  },
  {
    path: 'contact-detail/:id',
    component: ContactDetailPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)]
})
export class AppRoutingModule { }
