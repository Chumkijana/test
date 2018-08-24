import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ContactGroup, isContactGroup } from './contact-group.model';
import { ContactGroupStorage } from './contact-group.storage';

import { AuthService } from '../../auth/shared/auth.service';
import { Account } from '../../accounts/shared/account.model';

import { Observable, Subject, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class ContactGroupService {
  accounts$ = new Subject<Account[]>();
  contactGroup$ = new Subject<ContactGroup>();
  contactGroups$ = new Subject<ContactGroup[]>();
  sharedContactGroups$ = new Subject<ContactGroup[]>();

  accounts: Account[] = [];
  contactGroup: ContactGroup;
  contactGroups: ContactGroup[] = [];
  sharedContactGroups: ContactGroup[] = [];

  constructor(
    private authService: AuthService,
    private contactGroupStorage: ContactGroupStorage,
    private httpClient: HttpClient,
    private storage: LocalStorageService
  ) { }

  loadAllContactGroups(): Observable<ContactGroup[]> {
    let handler;

    if (this.authService.isAuthenticated()) {
      handler = this.httpClient.get('/account/contact_lists').pipe(
        map((res: any) => <ContactGroup[]>res.data)
      );
    } else {
      handler = this.contactGroupStorage.getContactGroups();
      handler = of(handler);
    }

    return handler.pipe(
      tap(
        (contactGroups: ContactGroup[]) => {
          this.setContactGroups(contactGroups);
        }
      )
    );
  }

  loadAllSharedContactGroups(): Observable<ContactGroup[]> {
    return this.httpClient
      .get('/account/contact_lists/shared_contact_lists')
      .pipe(
        map((res: any) => <ContactGroup[]>res.data),
        tap(
          (contactGroups: ContactGroup[]) => {
            this.setSharedContactGroups(contactGroups);
          }
        )
      );
  }

  loadContactGroup(groupId: number | string): Observable<ContactGroup> {
    return this.httpClient
      .get(`/account/contact_lists/${groupId}`)
      .pipe(
        map((res: any) => <ContactGroup>res.data),
        tap(group => this.setContactGroup(group))
      );

    // let handler;

    // if (this.authService.isAuthenticated()) {
    //   handler = this.httpClient.get<ContactGroup>(`/contact_lists/${contactGroupId}`).pipe(
    //     map((res: any) => <ContactGroup>res.data)
    //   );
    // } else {
    //   handler = this.contactGroupStorage.getContactGroup(contactGroupId);
    //   handler = of(handler);
    // }

    // return handler.pipe(
    //   tap(
    //     (contactGroup: ContactGroup) => {
    //       this.setContactGroup(contactGroup);
    //     }
    //   )
    // );
  }

  loadContactGroupCollaboration(contactGroupId: number): Observable<Account[]> {
    return this.httpClient.get(`/contact_lists/${contactGroupId}/shares`).pipe(
      map((res: any) => <Account[]>res.data),
      tap(accounts => this.accounts$.next(accounts))
    );
  }

  inviteToContactGroup(contactGroupId: number, email: string): Observable<Account> {
    return this.httpClient.put(`/contact_lists/${contactGroupId}/invite`, { email }).pipe(
      map((res: any) => <Account>res.data),
      tap(account => {
        const accounts = [...this.accounts, account];

        this.accounts$.next(accounts);
      })
    );
  }

  removeInviteFromContactGroup(contactGroupId: number, email: string): Observable<any> {
    return this.httpClient.put(`/contact_lists/${contactGroupId}/uninvite`, { email }).pipe(
      tap(_ => {
        const accounts = this.accounts.filter(x => x.email !== email);

        this.accounts$.next(accounts);
      })
    );
  }

  saveContactGroup(contactGroup: ContactGroup): Observable<ContactGroup> {
    const isUpdated = !!contactGroup.id;
    let handler;
    const companyId = this.storage.retrieve('company_id');

    if (this.authService.isAuthenticated()) {
      if (isUpdated) {
        handler = this.httpClient.put(`/account/contact_lists/${contactGroup.id}`, contactGroup);
      } else {
        handler = this.httpClient.post('/account/contact_lists', {
          name: contactGroup.name,
          company_id: companyId
        });
      }

      handler = handler.pipe(
        map((res: any) => <ContactGroup>res.data)
      );
    } else {
      handler = this.contactGroupStorage.saveContactGroup(contactGroup);

      if (!isContactGroup(handler)) {
        return throwError(handler);
      }

      handler = of(handler);
    }

    return handler.pipe(
      tap(
        (responseContactGroup: ContactGroup) => {
          let contactGroups;

          if (isUpdated) {
            contactGroups = this.contactGroups.map(x => x.id === responseContactGroup.id ? responseContactGroup : x);
          } else {
            contactGroups = [...this.contactGroups, responseContactGroup];
          }

          this.setContactGroup(responseContactGroup);
          this.setContactGroups(contactGroups);
        }
      )
    );
  }

  deleteContactGroup(contactGroupId: number): Observable<any> {
    let handler;

    if (this.authService.isAuthenticated()) {
      handler = this.httpClient.delete(`/account/contact_lists/${contactGroupId}`);
    } else {
      handler = of(this.contactGroupStorage.deleteContactGroup(contactGroupId));
    }

    return handler.pipe(
      tap(
        () => {
          const contactGroups = this.contactGroups.filter(x => x.id !== contactGroupId);

          this.setContactGroup(null);
          this.setContactGroups(contactGroups);
        }
      )
    );
  }

  setContactGroup(contactGroup: ContactGroup): void {
    this.contactGroup = contactGroup;
    this.contactGroup$.next(contactGroup);
  }

  setContactGroups(contactGroups: ContactGroup[]): void {
    this.contactGroups = contactGroups;
    this.contactGroups$.next(contactGroups);
  }

  shareContactGroup(group: any, emails: string[]): Observable<any> {
    return this.httpClient
      .put(`/account/contact_lists/${group.id}/share`, { emails });
  }

  getContactGroupAccounts(group: any): Observable<any> {
    return this.httpClient
      .get(`/account/contact_lists/${group.id}/share_accounts`);
  }

  loadGroup(id: any): Observable<any> {
    return this.httpClient
      .get(`/account/contact_lists/${id}`);
  }

  private setSharedContactGroups(contactGroups: ContactGroup[]): void {
    this.sharedContactGroups = contactGroups;
    this.sharedContactGroups$.next(contactGroups);
  }
}
