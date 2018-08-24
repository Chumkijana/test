import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Contact } from './contact.model';
import { ContactStorage } from './contact.storage';

import { AuthService } from '../../auth/shared/auth.service';
import { ContactGroupItemStorage } from '../../contact-group-items/shared/contact-group-item.storage';

import { Observable, Subject, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class ContactService {
  meta: any;
  contact$: Subject<Contact> = new Subject<Contact>();
  contacts$: Subject<Contact[]> = new Subject<Contact[]>();

  private contact: Contact;

  constructor(
    private authService: AuthService,
    private contactStorage: ContactStorage,
    private httpClient: HttpClient,
    private storage: LocalStorageService
  ) { }

  searchContacts(term: string): Observable<Contact[]> {
    return this.httpClient
      .get(`/contacts/search?q=${term}`, { params: this.getParams() })
      .pipe(
        map((res: any) => <Contact[]>res.data)
      );
  }

  loadAllContacts(): Observable<Contact[]> {
    let handler;

    if (this.authService.isAuthenticated()) {
      handler = this.contactStorage.getContacts();
      handler = of(handler);
    } else {
      handler = this.contactStorage.getContacts();
      handler = of(handler);
    }

    return handler.pipe(
      tap(
        (contacts: Contact[]) => this.setContacts(contacts)
      )
    );
  }

  loadAllContactsByGroup(groupId: number): Observable<Contact[]> {
    return this.httpClient
      .get(`/account/contact_lists/${groupId}/contacts`)
      .pipe(
        map((res: any) => <Contact[]>res.data),
      );
  }

  loadAllSharedContacts(): Observable<Contact[]> {
    return this.httpClient
      .get('/account/contacts/shared_contacts')
      .pipe(
        map((res: any) => <Contact[]>res.data),
        tap(
          contacts => this.setContacts(contacts)
        )
      );
  }

  loadShareWithMe(): Observable<any> {
    return this.httpClient
      .get('/account/contacts/share_with_me', { params: this.getParams() });
  }

  loadAll(): Observable<any> {
    return this.httpClient
      .get('/account/contacts', { params: this.getParams() });
  }

  loadContact(contactId: string): Observable<any> {
    return this.httpClient.get(`/contacts/${contactId}`).pipe(
      tap(
        (res: any) => {
          // if (this.authService.isAuthenticated()) {
            this.meta = res.meta;
          // } else {
          //   this.meta = this.contactGroupItemStorage.getMeta(contactId);
          // }

          this.setContact(res.data);
        }
      ),
      map((res: any) => <Contact>res.data)
    );
  }

  getContact(): Contact {
    return this.contact;
  }

  removeContact(contactId: string): Observable<any> {
    return this.httpClient
      .put(`/account/contacts/${contactId}/remove`, {});
  }

  saveContact(contactId: string): Observable<any> {
    return this.httpClient
      .put(`/account/contacts/${contactId}/save`, {});
  }

  selectGroup(contactId: string, groupId: string): Observable<any> {
    return this.httpClient
      .put(`/account/contacts/${contactId}/select_group`, { contact_list_id: groupId });
  }

  removeGroup(contactId: string, groupId: string): Observable<any> {
    return this.httpClient
      .put(`/account/contacts/${contactId}/remove_group`, { contact_list_id: groupId });
  }

  loadPortals(): Observable<any> {
    return this.httpClient
      .get(`/account/contacts/portals`, { params: this.getParams() });
  }

  private setContact(contact: Contact): void {
    this.contact = contact;
    this.contact$.next(contact);
  }

  private setContacts(contacts: Contact[]): void {
    this.contacts$.next(contacts);
  }

  private getParams(): any {
  // Initialize Params Object
    let params = new HttpParams();
    const companyId = this.storage.retrieve('company_id');
    const portalId = this.storage.retrieve('portal_id');

    if (companyId) {
      // Begin assigning parameters
      params = params.append('company_id', companyId);
    }

    if (portalId) {
      params = params.append('portal_id', portalId);
    }

    return params;
  }
}
