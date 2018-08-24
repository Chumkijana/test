// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { MatDialog } from '@angular/material';

// import { ContactGroup } from '../shared/contact-group.model';
// import { ContactGroupFormDialogComponent } from '../contact-group-form-dialog/contact-group-form-dialog.component';
// import { ContactGroupService } from '../shared/contact-group.service';

// import { Contact } from '../../contacts/shared/contact.model';
// import { ContactGroupItemService } from '../../contact-group-items/shared/contact-group-item.service';
// import { DialogService } from '../../core/dialog/dialog.service';
// // import { SidenavService } from '../../sidenav/sidenav.service';

// import { Subscription } from 'rxjs';
// import { AuthService } from '../../auth/shared/auth.service';

// @Component({
//   selector: 'app-contact-group-detail-page',
//   templateUrl: './contact-group-detail-page.component.html',
//   styleUrls: ['./contact-group-detail-page.component.scss']
// })
// export class ContactGroupDetailPageComponent implements OnInit, OnDestroy {
//   contactGroup: ContactGroup;
//   contacts: Contact[] = [];

//   isAuthenticated: boolean;

//   private contactGroup$: Subscription;
//   private contacts$: Subscription;

//   constructor(
//     private authService: AuthService,
//     private activatedRoute: ActivatedRoute,
//     private contactGroupService: ContactGroupService,
//     private contactGroupItemService: ContactGroupItemService,
//     private dialog: MatDialog,
//     private dialogService: DialogService,
//     private router: Router,
//     // private sidenavService: SidenavService
//   ) { }

//   ngOnInit(): void {
//     this.isAuthenticated = this.authService.isAuthenticated();

//     this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
//       const contactGroupId = +params.get('id');

//       this.loadContactGroup(contactGroupId);
//       this.loadContacts(contactGroupId);
//     });
//   }

//   ngOnDestroy(): void {
//     this.contactGroup$.unsubscribe();
//     this.contacts$.unsubscribe();
//   }

//   deleteContactGroup(): void {
//     this.dialogService
//       .confirm(this.contactGroup.name)
//       .afterClosed()
//       .subscribe(confirmed => {
//         if (!confirmed) {
//           return;
//         }

//         this.contactGroupService
//           .deleteContactGroup(this.contactGroup.id)
//           .subscribe(() => this.gotoHome());
//       });
//   }

//   openSidenav(): void {
//     // this.sidenavService.sidenav.open();
//   }

//   gotoCollaboration(): void {
//     this.router.navigate(['contact-groups', this.contactGroup.id, 'collaboration']);
//   }

//   gotoHome(): void {
//     this.router.navigate(['']);
//   }

//   openContactGroupForm(): void {
//     this.dialog.open(ContactGroupFormDialogComponent, {
//       panelClass: 'contact-group-form-dialog',
//       disableClose: true,
//       data: { contactGroup: this.contactGroup }
//     });
//   }

//   openInviteForm(): void {
//     this.dialogService.invite(this.contactGroup);
//   }

//   private loadContactGroup(contactGroupId: number): void {
//     this.contactGroup$ = this.contactGroupService
//       .contactGroup$
//       .subscribe(contactGroup => this.contactGroup = contactGroup);

//     this.contactGroupService
//       .loadContactGroup(contactGroupId)
//       .subscribe();
//   }

//   private loadContacts(contactGroupId: number): void {
//     this.contacts$ = this.contactGroupItemService
//       .contacts$
//       .subscribe(contacts => this.contacts = contacts);

//     this.contactGroupItemService
//       .loadAllContactGroupItemsByContactGroup(contactGroupId)
//       .subscribe();
//   }
// }
