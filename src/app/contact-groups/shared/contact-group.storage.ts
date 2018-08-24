import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { ContactGroup } from './contact-group.model';

import { StatusService } from '../../core/status/status.service';

@Injectable()
export class ContactGroupStorage {
  private contactGroupsKey = 'contactGroups';

  constructor(
    private statusService: StatusService,
    private storage: LocalStorageService
  ) {}

  getContactGroup(contactGroupId: number): ContactGroup {
    return this.getContactGroups().find(x => x.id === contactGroupId);
  }

  getContactGroups(): ContactGroup[] {
    return <ContactGroup[]>(this.storage.retrieve(this.contactGroupsKey) || []);
  }

  deleteContactGroup(contactGroupId: number): void {
    const contactGroups = this.getContactGroups().filter(x => x.id !== contactGroupId);

    this.statusService.showUnsaved();
    this.setContactGroups(contactGroups);
  }

  setContactGroups(contactGroups: ContactGroup[]): void {
    this.storage.store(this.contactGroupsKey, contactGroups);
  }

  saveContactGroup(contactGroup: ContactGroup): any {
    let savedContactGroup = { ...contactGroup };
    let contactGroups = this.getContactGroups();

    if (this.duplicateName(contactGroup)) {
      const errors = {
        error: {
          errors: { name: 'has already been taken' }
        }
      };

      return errors;
    }

    if (savedContactGroup.id) {
      contactGroups = contactGroups.map(x => x.id === savedContactGroup.id ? savedContactGroup : x);
    } else {
      savedContactGroup = { ...savedContactGroup, id: contactGroups.length + 1, items_count: 0 };
      contactGroups = [...contactGroups, savedContactGroup];
    }

    this.statusService.showUnsaved();
    this.setContactGroups(contactGroups);

    return savedContactGroup;
  }

  private duplicateName(contactGroup: ContactGroup): boolean {
    const contactGroups = this.getContactGroups();

    return !!contactGroups.find(x => {
      return x.id !== contactGroup.id && x.name.toLowerCase() === contactGroup.name.toLowerCase();
    });
  }
}
