import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth/shared/auth.service';
import { ContactStorage } from '../contacts/shared/contact.storage';
import { ContactGroupStorage } from '../contact-groups/shared/contact-group.storage';
import { ContactGroupItemStorage } from '../contact-group-items/shared/contact-group-item.storage';

import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SyncService {
  afterSynced$ = new Subject();

  constructor(
    private authService: AuthService,
    private contactStorage: ContactStorage,
    private contactGroupStorage: ContactGroupStorage,
    private contactGroupItemStorage: ContactGroupItemStorage,
    private http: HttpClient
  ) {
    this.authService.afterLoggedIn$.subscribe(() => this.synce().subscribe());
  }

  synce(): Observable<any> {
    const contactIds = this.contactStorage.getContacts().map(x => x.id);
    const items = this.contactGroupItemStorage.getContactGroupItems();
    const contactGroups = this.contactGroupStorage.getContactGroups().map(x => {
      const ids = items.filter(i => i.contact_group_id === x.id).map(i => i.contact_id);

      return {
        name: x.name,
        contact_ids: ids
      };
    });

    const data = {
      contact_ids: contactIds,
      contact_lists: contactGroups
    };

    return this.http.post('/account/sync', data).pipe(
      tap(
        () => {
          this.afterSynced$.next();
          this.contactStorage.setContacts(null);
          this.contactGroupStorage.setContactGroups(null);
          this.contactGroupItemStorage.setContactGroupItems(null);
        }
      )
    );
  }
}
