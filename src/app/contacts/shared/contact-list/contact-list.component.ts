// import { Component, Input } from '@angular/core';
// import { MatDialog } from '@angular/material';

// import { Contact } from './../contact.model';
// import { ContactService } from '../contact.service';
// import { ContactDetailDialogComponent } from '../../contact-detail-dialog/contact-detail-dialog.component';

// @Component({
//   selector: 'app-contact-list',
//   templateUrl: './contact-list.component.html',
//   styleUrls: ['./contact-list.component.scss']
// })
// export class ContactListComponent {
//   @Input() contacts: Contact[];

//   constructor(
//     private contactService: ContactService,
//     private dialog: MatDialog
//   ) {}

//   openContactDetail(contact: Contact): void {
//     this.contactService
//       .loadContact(contact.id)
//       .subscribe((loadedContact: Contact) => {
//         this.dialog.open(ContactDetailDialogComponent, {
//           width: '100%',
//           height: '100%',
//           maxWidth: '100%',
//           panelClass: 'contact-detail-dialog',
//           data: { contact: loadedContact }
//         });
//       });
//   }
// }
