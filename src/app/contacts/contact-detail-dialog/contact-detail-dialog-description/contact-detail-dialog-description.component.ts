import { Component, Input } from '@angular/core';
import { Contact } from '../../shared/contact.model';

@Component({
  selector: 'app-contact-detail-dialog-description',
  templateUrl: './contact-detail-dialog-description.component.html',
  styleUrls: ['./contact-detail-dialog-description.component.scss']
})
export class ContactDetailDialogDescriptionComponent {
  @Input() contact: Contact;
}
