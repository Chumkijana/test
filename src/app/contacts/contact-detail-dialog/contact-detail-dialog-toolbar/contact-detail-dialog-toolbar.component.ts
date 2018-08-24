import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog, MatMenuTrigger } from '@angular/material';

import { Contact } from '../../shared/contact.model';
import { ContactService } from '../../shared/contact.service';
import { ContactDetailDialogComponent } from '../contact-detail-dialog.component';

import { ContactGroup } from '../../../contact-groups/shared/contact-group.model';
import { ContactGroupService } from '../../../contact-groups/shared/contact-group.service';
import { ContactGroupFormDialogComponent } from '../../../contact-groups/contact-group-form-dialog/contact-group-form-dialog.component';
import { ContactGroupItemService } from '../../../contact-group-items/shared/contact-group-item.service';

@Component({
  selector: 'app-contact-detail-dialog-toolbar',
  templateUrl: './contact-detail-dialog-toolbar.component.html',
  styleUrls: ['./contact-detail-dialog-toolbar.component.scss']
})
export class ContactDetailDialogToolbarComponent implements OnInit {
  @Input() contact: Contact;

  changedOnRemove = false;
  changed = false;
  saved = false;
  contactGroups: ContactGroup[] = [];
  selectedContactGroups: ContactGroup[] = [];
  sharedContactGroups: ContactGroup[] = [];
  selectedSharedContactGroups: ContactGroup[] = [];

  @ViewChild('triggerMenu') triggerMenu: MatMenuTrigger;

  constructor(
    private contactService: ContactService,
    private contactGroupService: ContactGroupService,
    private contactGroupItemService: ContactGroupItemService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ContactDetailDialogComponent>
  ) { }

  ngOnInit(): void {
    const meta = this.contactService.meta;
    this.contactGroups = this.contactGroupService.contactGroups;
    this.sharedContactGroups = this.contactGroupService.sharedContactGroups;

    if (meta) {
      this.saved = meta.saved;
      this.selectedContactGroups = meta.contact_list_ids.map(id => {
        return this.contactGroups.find(x => x.id === id);
      }).filter(x => x);

      this.selectedSharedContactGroups = meta.shared_contact_list_ids.map(id => {
        return this.sharedContactGroups.find(x => x.id === id);
      }).filter(x => x);
    }
  }

  close(): void {
    if (this.changed) {
      this.contactGroupService.loadAllContactGroups().subscribe();
      this.contactGroupService.loadAllSharedContactGroups().subscribe();

      if (this.contactGroupService.contactGroup) {
        this.contactGroupItemService.loadAllContactGroupItemsByContactGroup(this.contactGroupService.contactGroup.id).subscribe();
      }
    }

    if (this.changedOnRemove) {
      this.contactService.loadAllContacts().subscribe();
      this.contactGroupService.loadAllSharedContactGroups().subscribe();
    }

    this.dialogRef.close();
  }

  save(): void {
    this.contactGroupItemService
      .saveContactGroupItem(this.contact)
      .subscribe(() => {
        this.saved = true;
        setTimeout(() => { this.triggerMenu.openMenu(); });
      });
  }

  remove(): void {
    this.contactGroupItemService
      .deleteContactGroupItem(this.contact.id)
      .subscribe(() => {
        this.changed = true;
        this.changedOnRemove = true;
        this.saved = false;
        this.selectedContactGroups = [];
      });
  }

  onToggleSelect(e: any, contactGroup: ContactGroup): void {
    e.stopPropagation();

    this.toggleSelect(contactGroup);
  }

  onToggleSelectSharedContactGroup(e: any, contactGroup: ContactGroup): void {
    e.stopPropagation();

    this.toggleSelectSharedContactGroup(contactGroup);
  }

  openContactGroupForm(): void {
    this.dialog.open(ContactGroupFormDialogComponent, {
        panelClass: 'contact-group-form-dialog',
        disableClose: true,
        data: { contactGroup: { name: '' } }
      })
      .afterClosed()
      .subscribe((contactGroup: ContactGroup) => {
        if (!contactGroup) { return; }

        this.contactGroups = [...this.contactGroups, contactGroup];
        this.toggleSelect(contactGroup);
      });
  }

  isSelected(contactGroup: ContactGroup): boolean {
    return !!this.selectedContactGroups.find(x => x.id === contactGroup.id);
  }

  isSelectedSharedContactGroup(contactGroup: ContactGroup): boolean {
    return !!this.selectedSharedContactGroups.find(x => x.id === contactGroup.id);
  }

  private toggleSelect(contactGroup: ContactGroup): void {
    this.changed = true;

    if (this.isSelected(contactGroup)) {
      this.contactGroupItemService
        .deleteContactGroupItemByContactGroup(contactGroup.id, this.contact.id)
        .subscribe(() => {
          this.selectedContactGroups = this.selectedContactGroups.filter(x => x.id !== contactGroup.id);
        });
    } else {
      this.contactGroupItemService
        .saveContactGroupItemByContactGroup(contactGroup.id, this.contact)
        .subscribe(() => {
          this.selectedContactGroups = [...this.selectedContactGroups, contactGroup];
        });
    }
  }

  private toggleSelectSharedContactGroup(contactGroup: ContactGroup): void {
    this.changed = true;

    if (this.isSelectedSharedContactGroup(contactGroup)) {
      this.contactGroupItemService
        .deleteSharedContactGroupItemByContactGroup(contactGroup.id, this.contact.id)
        .subscribe(() => {
          this.selectedSharedContactGroups = this.selectedSharedContactGroups.filter(x => x.id !== contactGroup.id);
        });
    } else {
      this.contactGroupItemService
        .saveSharedContactGroupItemByContactGroup(contactGroup.id, this.contact)
        .subscribe(() => {
          this.selectedSharedContactGroups = [...this.selectedSharedContactGroups, contactGroup];
        });
    }
  }
}
