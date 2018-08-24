import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ScrollService } from '../core/scroll.service';
import { Location } from '@angular/common';
import { ContactService } from '../contacts/shared/contact.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contacts/shared/contact.model';
import { MatMenuTrigger, MatDialog } from '@angular/material';
import { ContactGroupFormDialogComponent } from '../contact-groups/contact-group-form-dialog/contact-group-form-dialog.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact-detail-page',
  templateUrl: './contact-detail-page.component.html',
  styleUrls: ['./contact-detail-page.component.scss']
})
export class ContactDetailPageComponent implements OnInit, OnDestroy {

  saved: boolean;
  contact: Contact;
  groups: any[] = [];

  @ViewChild('groupTriggerMenu') groupTriggerMenu: MatMenuTrigger;

  private $params: Subscription;

  constructor(
    public location: Location,
    public scrollService: ScrollService,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.$params = this.activatedRoute.params.subscribe(params => {
      const contactId = params['id'];

      this.contactService.loadContact(contactId).subscribe(contact => {
        this.contact = contact;
        this.saved = this.contactService.meta.saved;
        this.groups = this.contactService.meta.contact_lists;
      });
    });
  }

  ngOnDestroy(): void {
    this.$params.unsubscribe();
  }

  edit(): void {
    const url = `${environment.ecUrl}office/front_desk/${this.contact.alias_id}/`;

    window.open(url, '_blank');
  }

  remove(): void {
    this.contactService
      .removeContact(this.contact.id)
      .subscribe(() => {
        this.saved = false;
      });
  }

  save(): void {
    this.contactService
      .saveContact(this.contact.id)
      .subscribe(() => {
        this.saved = true;
        setTimeout(() => { this.groupTriggerMenu.openMenu(); });
      });
  }

  onClickGroup(e: any, group: any): void {
    e.stopPropagation();

    if (group.selected) {
      group.selected = false;
      this.contactService.removeGroup(this.contact.id, group.id).subscribe();
    } else {
      group.selected = true;
      this.contactService.selectGroup(this.contact.id, group.id).subscribe();
    }
  }

  openContactGroupForm(): void {
    this.dialog.open(ContactGroupFormDialogComponent, {
      panelClass: 'contact-group-form-dialog',
      disableClose: true,
      data: { }
    })
    .afterClosed()
    .subscribe((group: any) => {
      if (group) {
        this.groups.push({
          ...group, selected: false
        });
      }
    });
  }

}
