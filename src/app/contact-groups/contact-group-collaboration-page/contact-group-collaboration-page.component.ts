import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { ContactGroupService } from '../shared/contact-group.service';
import { ContactGroup } from '../shared/contact-group.model';

import { Account } from '../../accounts/shared/account.model';
import { DialogService } from '../../core/dialog/dialog.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-group-collaboration-page',
  templateUrl: './contact-group-collaboration-page.component.html',
  styleUrls: ['./contact-group-collaboration-page.component.scss']
})
export class ContactGroupCollaborationPageComponent implements OnInit, OnDestroy {
  contactGroup: ContactGroup;
  accounts: Account[] = [];

  private accounts$: Subscription;
  private contactGroup$: Subscription;

  constructor(
    private contactGroupService: ContactGroupService,
    private location: Location,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.accounts$ = this.contactGroupService.accounts$.subscribe(accounts => this.accounts = accounts);
    this.contactGroup$ = this.contactGroupService.contactGroup$.subscribe(contactGroup => this.contactGroup = contactGroup);

    this.route.paramMap.subscribe((params: ParamMap) => {
      const contactGroupId = +params.get('id');

      this.contactGroupService.loadContactGroup(contactGroupId).subscribe();
      this.contactGroupService.loadContactGroupCollaboration(contactGroupId).subscribe();
    });
  }

  ngOnDestroy(): void {
    this.accounts$.unsubscribe();
    this.contactGroup$.unsubscribe();
  }

  close(): void {
    this.location.back();
  }

  open(): void {
    this.dialogService.invite(this.contactGroup);
  }

  remove(account: Account): void {
    this.dialogService.confirm(account.email)
      .afterClosed()
      .subscribe(confirmed => {
        if (!confirmed) {
          return;
        }

        this.contactGroupService
          .removeInviteFromContactGroup(this.contactGroup.id, account.email)
          .subscribe();
      });
  }
}
