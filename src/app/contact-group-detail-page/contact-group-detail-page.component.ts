import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contacts/shared/contact.model';
import { ContactGroupService } from '../contact-groups/shared/contact-group.service';
import { ContactGroup } from '../contact-groups/shared/contact-group.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ContactGroupFormDialogComponent } from '../contact-groups/contact-group-form-dialog/contact-group-form-dialog.component';
import { DialogService } from '../core/dialog/dialog.service';
import { ContactGroupShareDialogComponent } from '../contact-group-share-dialog/contact-group-share-dialog.component';
import { AccountService } from '../accounts/shared/account.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-group-detail-page',
  templateUrl: './contact-group-detail-page.component.html',
  styleUrls: ['./contact-group-detail-page.component.scss']
})
export class ContactGroupDetailPageComponent implements OnInit, OnDestroy {

  account: any;
  contacts: Contact[] = [];
  group: ContactGroup;
  owner: any;

  private $params: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactGroupService: ContactGroupService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private router: Router,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private location: Location
  ) { }

  ngOnInit() {
    this.$params = this.activatedRoute.params.subscribe(params => {
      const groupId = params['id'];

      this.contactGroupService
        .loadGroup(groupId)
        .subscribe((res: any) => {
          const data = res.data;

          this.account = this.accountService.account;
          this.group = data.group;
          this.contacts = data.contacts;
          this.owner = data.owner;
        });
    });
  }

  ngOnDestroy(): void {
    this.$params.unsubscribe();
  }

  edit(): void {
    this.dialog.open(ContactGroupFormDialogComponent, {
      panelClass: 'contact-group-form-dialog',
      disableClose: true,
      data: { contactGroup: this.group }
    })
    .afterClosed()
    .subscribe(group => {
      if (group) {
        this.group = group;
      }
    });
  }

  delete(): void {
    this.dialogService
      .confirm(this.group.name)
      .afterClosed()
      .subscribe(confirmed => {
        if (!confirmed) {
          return;
        }

        this.contactGroupService
          .deleteContactGroup(this.group.id)
          .subscribe(() => this.gotoHome());
      });
  }

  share(): void {
    this.dialog.open(ContactGroupShareDialogComponent, {
      panelClass: 'contact-group-share-dialog',
      disableClose: true,
      data: { contactGroup: this.group }
    })
    .afterClosed()
    .subscribe(group => {
      if (group) {
        this.group = group;
      }
    });
  }

  gotoHome(): void {
    this.router.navigate(['']);
  }

  copyLink(): void {
    const selBox = document.createElement('textarea');

    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = document.location.href;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.snackBar.open('link copied.', 'close', { duration: 3000 });
  }

}
