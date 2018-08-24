import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ContactService } from '../contacts/shared/contact.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-portal-list-dialog',
  templateUrl: './portal-list-dialog.component.html',
  styleUrls: ['./portal-list-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PortalListDialogComponent implements OnInit {

  portalId: any;
  portals: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<PortalListDialogComponent>,
    private contactService: ContactService,
    private storage: LocalStorageService
  ) {
    this.portalId = this.storage.retrieve('portal_id');
    this.contactService
      .loadPortals()
      .subscribe((res: any) => {
        this.portals = res.data;
      });
  }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

  choose(portal: any): void {
    this.portalId = portal.id;
  }

  submit(): void {
    this.storage.store('portal_id', this.portalId);
    this.dialogRef.close(true);
  }

}
