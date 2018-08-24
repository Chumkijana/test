import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ContactService } from '../shared/contact.service';

import { AuthService } from '../../auth/shared/auth.service';
import { SyncService } from '../../core/sync.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list-page',
  templateUrl: './contact-list-page.component.html',
  styleUrls: ['./contact-list-page.component.scss']
})
export class ContactListPageComponent implements OnInit, OnDestroy {
  // contacts: Contact[] = [];
  contacts = [
    {
      name: 'Yellow Tower',
      logo: 'http://s-yoolk-images.s3.amazonaws.com/kh/logo_images/original/1371283-white-yellow-tower-logol?1490597937'
    },
    {
      name: 'Chumnith International Corporation (CIC)',
      logo: 'http://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3537080-Chumnith-International?1508293292'
    },
    {
      name: 'Tang Pech Construction Co., Ltd.',
      logo: 'https://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3517887-2014-10-31__08-32-56__new-logo?1501471429'
    },
    {
      name: 'VENG HUOT Supplies Construction Materials',
      logo: 'https://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3560389-Veng_huot_logo?1522465888'
    },
    {
      name: 'Soma Construction & Development Co., Ltd.',
      logo: 'https://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3526661-10527469_529159180518141_4338518337375969063_n?1504084900'
    },
    {
      name: 'Ly Kim Hong Development Construction Co., Ltd.',
      logo: 'https://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3505918-Ly_Kim_Hong_Development_Construction_Co.__Ltd.?1495091926'
    },
    {
      name: 'KP Industries Co., Ltd.',
      logo: 'https://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3512659-KP-Industries?1498550074'
    },
    {
      name: 'BAA - Bunseang Architects & Associates',
      logo: 'https://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3524710-20108497_766357916882153_2816972193098809319_n?1503643712'
    },
    {
      name: 'VNB Foundation Co., Ltd.',
      logo: 'https://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3558207-14199143_318191405181642_1856428475371091270_n?1521168436'
    },
    {
      name: 'Seng Socheat Trading Co., Ltd.',
      logo: 'https://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3559819-Seng-Socheat?1522118253'
    },
    {
      name: 'Mega Build Construction',
      logo: 'https://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3553952-22310259_131705387482574_4905004779366358062_n?1518150796'
    },
    {
      name: 'Seila Amrit Co., Ltd.',
      logo: 'https://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3537922-16195146_706350742858988_6366216588553390453_n?1508316298'
    },
    {
      name: 'Krovann Architecture & Interior Design',
      logo: 'https://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3554445-rdsg?1518430625'
    },
    {
      name: 'KC Gecin Enterprises',
      logo: 'https://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3552220-KC-Gecin-Enterprises?1516249799'
    },
    {
      name: 'Maxk Dsign Co., Ltd.',
      logo: 'https://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3526105-16426122_1409686549083967_7504771359114655422_n?1503974547'
    }
  ];

  private afterLoggedOut$: Subscription;
  private afterSynced$: Subscription;
  private contacts$: Subscription;

  constructor(
    private authService: AuthService,
    private contactService: ContactService,
    private router: Router,
    // private sidenavService: SidenavService,
    private syncService: SyncService
  ) {}

  ngOnInit(): void {
    // this.subscribeAfterLoggedOut();
    // this.subscribeAfterSynced();
    // this.subscribeContacts();

    // this.loadContacts();
  }

  ngOnDestroy(): void {
    // this.afterLoggedOut$.unsubscribe();
    // this.afterSynced$.unsubscribe();
    // this.contacts$.unsubscribe();
  }

  // gotoContactSearch(): void {
  //   this.router.navigate(['contacts', 'search']);
  // }

  // private loadContacts(): void {
  //   this.contactService
  //     .loadAllContacts()
  //     .subscribe();
  // }

  // private subscribeAfterSynced(): void {
  //   this.afterSynced$ = this.syncService
  //     .afterSynced$
  //     .subscribe(() => this.loadContacts());
  // }

  // private subscribeAfterLoggedOut(): void {
  //   this.afterLoggedOut$ = this.authService
  //     .afterLoggedOut$
  //     .subscribe(() => this.contacts = []);
  // }

  // private subscribeContacts(): void {
  //   this.contacts$ = this.contactService
  //     .contacts$
  //     .subscribe(contacts => this.contacts = contacts);
  // }

}
