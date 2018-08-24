import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ContactGroupItemStorage } from './contact-group-item.storage';

import { AuthService } from '../../auth/shared/auth.service';
import { Contact } from '../../contacts/shared/contact.model';

import { Subject, Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class ContactGroupItemService {
  contacts$: Subject<Contact[]> = new Subject<Contact[]>();

  constructor(
    private authService: AuthService,
    private contactGroupItemStorage: ContactGroupItemStorage,
    private httpClient: HttpClient
  ) { }

  loadAllContactGroupItemsByContactGroup(contactGroupId: number): Observable<Contact[]> {
    let handler;

    if (this.authService.isAuthenticated()) {
      handler = this.httpClient.get(`/account/contact_lists/${contactGroupId}/contacts`).pipe(
        map((res: any) => <Contact[]>res.data)
      );
    } else {
      handler = this.contactGroupItemStorage.loadAllContactGroupItemsByContactGroup(contactGroupId);
      handler = of(handler);
    }

    return handler
      .pipe(
        tap(
          (contacts: Contact[]) => this.contacts$.next(contacts)
        )
      );
  }

  saveContactGroupItem(contact: Contact): Observable<any> {
    let handler;

    if (this.authService.isAuthenticated()) {
      handler = this.httpClient.post('/account/contacts', { listing_id: contact.id });
    } else {
      handler = this.contactGroupItemStorage.saveContactGroupItem(contact);
      handler = of(handler);
    }

    return handler;
  }

  saveContactGroupItemByContactGroup(contactGroupId: number, contact: Contact): Observable<any> {
    let handler;

    if (this.authService.isAuthenticated()) {
      handler = this.httpClient.post(`/account/contact_lists/${contactGroupId}/contacts`, { listing_id: contact.id });
    } else {
      handler = this.contactGroupItemStorage.saveContactGroupItemByContactGroup(contactGroupId, contact);
      handler = of(handler);
    }

    return handler;
  }

  saveSharedContactGroupItemByContactGroup(contactGroupId: number, contact: Contact): Observable<any> {
    return this.httpClient
      .post(`/account/contact_lists/${contactGroupId}/contacts/shared_contact`, {
        listing_id: contact.id
      });
  }

  deleteContactGroupItem(contactId: string): Observable<any> {
    let handler;

    if (this.authService.isAuthenticated()) {
      handler = this.httpClient.delete(`/account/contacts/${contactId}`);
    } else {
      handler = this.contactGroupItemStorage.deleteContactGroupItem(contactId);
      handler = of(handler);
    }

    return handler;
  }

  deleteContactGroupItemByContactGroup(contactGroupId: number, contactId: string): Observable<any> {
    let handler;

    if (this.authService.isAuthenticated()) {
      handler = this.httpClient.delete(`/account/contact_lists/${contactGroupId}/contacts/${contactId}`);
    } else {
      handler = this.contactGroupItemStorage.deleteContactGroupItemByContactGroup(contactGroupId, contactId);
      handler = of(handler);
    }

    return handler;
  }

  deleteSharedContactGroupItemByContactGroup(contactGroupId: number, contactId: string): Observable<any> {
    return this.httpClient
      .delete(`/account/contact_lists/${contactGroupId}/contacts/${contactId}/destroy_shared_contact`);
  }
}
