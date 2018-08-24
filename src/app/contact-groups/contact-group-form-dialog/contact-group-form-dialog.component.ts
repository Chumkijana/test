import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactGroup } from '../shared/contact-group.model';
import { ContactGroupService } from '../shared/contact-group.service';

@Component({
  selector: 'app-contact-group-form-dialog',
  templateUrl: './contact-group-form-dialog.component.html',
  styleUrls: ['./contact-group-form-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactGroupFormDialogComponent {

  form: FormGroup;
  contactGroup: ContactGroup;
  editMode = false;

  get name() { return this.form.get('name'); }

  constructor(
    private contactGroupService: ContactGroupService,
    private dialogRef: MatDialogRef<ContactGroupFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { contactGroup: ContactGroup }
  ) {
    this.contactGroup = data.contactGroup || <ContactGroup>{ name: '' };
    this.editMode = !!this.contactGroup.id;
    this.form = new FormGroup({
      'name': new FormControl(this.contactGroup.name, [
        Validators.required
      ])
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const contactGroup = <ContactGroup>{ ...this.contactGroup, name: this.name.value };

    this.contactGroupService
      .saveContactGroup(contactGroup)
      .subscribe(
        (created: ContactGroup) => this.dialogRef.close(created),
        err => {
          const errors = err.error.errors;
          Object.keys(errors).map(key => {
            this.form.controls[key].setErrors({ serverError: true });
            (<any>this.form.controls[key]).errorMessage = errors[key];
          });
        }
      );
  }
}
