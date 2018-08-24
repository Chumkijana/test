import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Contact } from '../shared/contact.model';
import { ContactService } from '../shared/contact.service';

// import { SidenavService } from '../../sidenav/sidenav.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shared-contact-list-page',
  templateUrl: './shared-contact-list-page.component.html',
  styleUrls: ['./shared-contact-list-page.component.scss']
})
export class SharedContactListPageComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];

  private contacts$: Subscription;

  constructor(
    private contactService: ContactService,
    private router: Router,
    // private sidenavService: SidenavService
  ) {}

  ngOnInit(): void {
    this.contacts$ = this.contactService.contacts$.subscribe(contacts => this.contacts = contacts);
    this.contactService.loadAllSharedContacts().subscribe();
  }

  ngOnDestroy(): void {
    this.contacts$.unsubscribe();
  }

  openSidenav(): void {
    // this.sidenavService.sidenav.open();
  }

  gotoContactSearch(): void {
    this.router.navigate(['contacts', 'search']);
  }
}
