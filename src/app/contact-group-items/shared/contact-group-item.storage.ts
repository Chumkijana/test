import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { ContactGroupItem } from './contact-group-item.model';

import { Contact } from '../../contacts/shared/contact.model';
import { ContactStorage } from '../../contacts/shared/contact.storage';
import { ContactGroupStorage } from '../../contact-groups/shared/contact-group.storage';
import { StatusService } from '../../core/status/status.service';

@Injectable()
export class ContactGroupItemStorage {
  private contactGroupItemsKey = 'contactGroupItems';

  constructor(
    private storage: LocalStorageService,
    private contactStorage: ContactStorage,
    private contactGroupStorage: ContactGroupStorage,
    private statusService: StatusService
  ) {}

  loadAllContactGroupItemsByContactGroup(contactGroupId: number): Contact[] {
    const contactIds = this.getContactGroupItems().filter(x => x.contact_group_id === contactGroupId).map(x => x.contact_id);

    return this.contactStorage.getContacts().filter(x => contactIds.includes(x.id));
  }

  saveContactGroupItem(contact: Contact): void {
    const savedContact = { ...contact,
      emails: [],
      telephones: [],
      websites: [],
      descs: []
    };
    const contacts = [...this.contactStorage.getContacts(), savedContact];

    this.statusService.showUnsaved();
    this.contactStorage.setContacts(contacts);
  }

  deleteContactGroupItem(contactId: string): void {
    const contacts = this.contactStorage.getContacts().filter(x => x.id !== contactId);
    const contactGroupIds = this.getContactGroupItems().filter(x => x.contact_id === contactId).map(x => x.contact_group_id);

    contactGroupIds.map(id => this.deleteContactGroupItemByContactGroup(id, contactId));
    this.statusService.showUnsaved();
    this.contactStorage.setContacts(contacts);
  }

  saveContactGroupItemByContactGroup(contactGroupId: number, contact: Contact): void {
    const item = { contact_id: contact.id, contact_group_id: contactGroupId };
    const items = [...this.getContactGroupItems(), item];
    const contactGroups = this.contactGroupStorage.getContactGroups().map(x => {
      if (x.id === contactGroupId) {
        x.items_count += 1;
      }

      return x;
    });

    this.statusService.showUnsaved();
    this.setContactGroupItems(items);
    this.contactGroupStorage.setContactGroups(contactGroups);
  }

  deleteContactGroupItemByContactGroup(contactGroupId: number, contactId: string): void {
    const items = this.getContactGroupItems().filter(x => !(x.contact_group_id === contactGroupId && x.contact_id === contactId));
    const contactGroups = this.contactGroupStorage.getContactGroups().map(x => {
      if (x.id === contactGroupId) {
        x.items_count -= 1;
      }

      return x;
    });

    this.statusService.showUnsaved();
    this.setContactGroupItems(items);
    this.contactGroupStorage.setContactGroups(contactGroups);
  }

  getMeta(contactId: string): any {
    const contact = this.contactStorage.getContact(contactId);
    const contactGroupIds = this.getContactGroupItems()
      .filter(x => x.contact_id === contactId )
      .map(x => x.contact_group_id);

    return {
      saved: !!contact,
      contact_list_ids: contactGroupIds
    };
  }

  getContactGroupItems(): ContactGroupItem[] {
    return <ContactGroupItem[]>(this.storage.retrieve(this.contactGroupItemsKey)) || [];
  }

  setContactGroupItems(contactGroupItems: ContactGroupItem[]): void {
    this.storage.store(this.contactGroupItemsKey, contactGroupItems);
  }
}
