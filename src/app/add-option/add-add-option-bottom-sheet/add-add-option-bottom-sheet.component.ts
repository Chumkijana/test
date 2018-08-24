import { Component, OnInit } from '@angular/core';
import { MatDialog, MatBottomSheetRef } from '@angular/material';
import { Router } from '@angular/router';
import { addOptions, AddOptionName } from '../add-option-bottom-sheet/add-option';
import { ContactGroupFormDialogComponent } from '../../contact-groups/contact-group-form-dialog/contact-group-form-dialog.component';

@Component({
  selector: 'app-add-add-option-bottom-sheet',
  templateUrl: './add-add-option-bottom-sheet.component.html',
  styleUrls: ['./add-add-option-bottom-sheet.component.scss']
})
export class AddAddOptionBottomSheetComponent implements OnInit {

  addOptions = addOptions;

  constructor(
    private dialog: MatDialog,
    private bottomSheetRef: MatBottomSheetRef<AddAddOptionBottomSheetComponent>,

    private router: Router
  ) { }

  ngOnInit() {
  }

  onClickAddOption(optionName: AddOptionName): void {
    this.bottomSheetRef.dismiss();

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
