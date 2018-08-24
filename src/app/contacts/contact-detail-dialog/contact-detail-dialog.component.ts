import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Contact } from '../shared/contact.model';

@Component({
  selector: 'app-contact-detail-dialog',
  templateUrl: './contact-detail-dialog.component.html',
  styleUrls: ['./contact-detail-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactDetailDialogComponent {
  contact: Contact;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.contact = data.contact;
  }
}
