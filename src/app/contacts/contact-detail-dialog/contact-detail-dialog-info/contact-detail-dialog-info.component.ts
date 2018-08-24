import { Component, Input } from '@angular/core';
import { Contact } from '../../shared/contact.model';

@Component({
  selector: 'app-contact-detail-dialog-info',
  templateUrl: './contact-detail-dialog-info.component.html',
  styleUrls: ['./contact-detail-dialog-info.component.scss']
})
export class ContactDetailDialogInfoComponent {
  @Input() contact: Contact;
}
