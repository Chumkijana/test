import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ScrollService } from '../core/scroll.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contacts/shared/contact.model';
import { ContactService } from '../contacts/shared/contact.service';
import { MatDialog } from '@angular/material';
import { PortalListDialogComponent } from '../portal-list-dialog/portal-list-dialog.component';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultPageComponent implements OnInit, OnDestroy {

  q: string;
  selectedIndex: number;
  contacts: Contact[] = [];
  people = [];

  private $queryParams: Subscription;

  constructor(
    public location: Location,
    public scrollService: ScrollService,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.$queryParams = this.activatedRoute
      .queryParams
      .subscribe((params: any) => {
        this.q = params.q;

        this.contactService.searchContacts(this.q).subscribe(contacts => this.contacts = contacts);

        if (params.kind === 'Business') {
          this.selectedIndex = 0;
        } else {
          this.selectedIndex = 1;
        }
      });
  }

  ngOnDestroy(): void {
    this.$queryParams.unsubscribe();
  }

  changePortal(): void {
    this.dialog.open(PortalListDialogComponent, {
      panelClass: 'portal-list-dialog',
      disableClose: true,
      data: { }
    })
    .afterClosed()
    .subscribe((changed: boolean) => {
      if (changed) {
        this.contactService
          .searchContacts(this.q)
          .subscribe(contacts => this.contacts = contacts);
      }
    });
  }

}
