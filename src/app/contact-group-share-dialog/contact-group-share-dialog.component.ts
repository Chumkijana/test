import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent } from '@angular/material';
import { ContactGroupService } from '../contact-groups/shared/contact-group.service';

@Component({
  selector: 'app-contact-group-share-dialog',
  templateUrl: './contact-group-share-dialog.component.html',
  styleUrls: ['./contact-group-share-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactGroupShareDialogComponent implements OnInit {

  contactGroup: any;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  emails: any[] = [];
  accounts: any[];
  fetchAccount = 0;

  constructor(
    private dialogRef: MatDialogRef<ContactGroupShareDialogComponent>,
    private contactGroupService: ContactGroupService,
    @Inject(MAT_DIALOG_DATA) data: { contactGroup: any }
  ) {
    this.contactGroup = data.contactGroup;
  }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.emails.length === 0) {
      this.close();
      return;
    }

    this.contactGroupService
      .shareContactGroup(this.contactGroup, this.emails)
      .subscribe(
        () => this.dialogRef.close()
      );
  }

  remove(email: string): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.emails.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  see(): void {
    this.fetchAccount = 1;

    this.contactGroupService
      .getContactGroupAccounts(this.contactGroup)
      .subscribe((res: any) => {
        const data = res.data;

        this.accounts = data.accounts;
        this.fetchAccount = 2;
      });
  }

}
