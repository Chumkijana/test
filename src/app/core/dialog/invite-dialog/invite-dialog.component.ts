import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ContactGroup } from '../../../contact-groups/shared/contact-group.model';
import { ContactGroupService } from '../../../contact-groups/shared/contact-group.service';

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InviteDialogComponent {
  form: FormGroup;
  contactGroup: ContactGroup;
  get email() { return this.form.get('email'); }

  constructor(
    private contactGroupService: ContactGroupService,
    private dialogRef: MatDialogRef<InviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { contactGroup: ContactGroup }
  ) {
    this.contactGroup = data.contactGroup;

    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.required, Validators.pattern(emailRegex)
      ])
    });
  }

  invite(): void {
    this.contactGroupService
      .inviteToContactGroup(this.contactGroup.id, this.email.value)
      .subscribe(() => this.close());
  }

  close(): void {
    this.dialogRef.close();
  }
}
