import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { Contact } from './contact.model';

@Injectable()
export class ContactStorage {
  private contactsKey = 'contacts';

  constructor(
    private storage: LocalStorageService
  ) {}

  getContact(contactId: string): Contact {
    return this.getContacts().find(x => x.id === contactId);
  }

  getContacts(): Contact[] {
    return <Contact[]>(this.storage.retrieve(this.contactsKey)) || [];
  }

  setContacts(contacts: Contact[]): void {
    this.storage.store(this.contactsKey, contacts);
  }
}
