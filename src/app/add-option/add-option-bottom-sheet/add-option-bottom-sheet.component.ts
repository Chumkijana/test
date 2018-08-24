import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { addOptions, AddOptionName } from './add-option';
import { ContactGroupFormDialogComponent } from '../../contact-groups/contact-group-form-dialog/contact-group-form-dialog.component';

@Component({
  selector: 'app-add-option-bottom-sheet',
  templateUrl: './add-option-bottom-sheet.component.html',
  styleUrls: ['./add-option-bottom-sheet.component.scss']
})
export class AddOptionBottomSheetComponent implements OnInit {

  addOptions = addOptions;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddOptionBottomSheetComponent>,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClickAddOption(optionName: AddOptionName): void {
    this.dialogRef.close();

    switch (optionName) {
      case AddOptionName.Contact:
        this.router.navigate(['contact-new']);
        break;

      case AddOptionName.Group:
        this.openContactGroupForm();
        break;

      case AddOptionName.Photo:
        this.router.navigate(['photo-new']);
        break;

      case AddOptionName.QRCode:
        this.router.navigate(['qrcode-new']);
        break;
    }
  }

  private openContactGroupForm(): void {
    this.dialog.open(ContactGroupFormDialogComponent, {
      panelClass: 'contact-group-form-dialog',
      disableClose: true,
      data: { }
    });
  }

}
