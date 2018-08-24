import { Injectable } from '@angular/core';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { AddOptionBottomSheetComponent } from './add-option-bottom-sheet/add-option-bottom-sheet.component';
import { AddAddOptionBottomSheetComponent } from './add-add-option-bottom-sheet/add-add-option-bottom-sheet.component';

@Injectable()
export class AddOptionService {

  constructor(
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) { }

  open(): void {
    this.dialog.open(AddOptionBottomSheetComponent, {
      width: '100%',
      height: 'auto',
      position: {
        bottom: '0px'
      },
      panelClass: ['max-screen-md', 'ml-auto', 'mr-auto']
    });
  }

  openBottomSheet(): void {
    this.bottomSheet.open(AddAddOptionBottomSheetComponent, {
      hasBackdrop: true
    });
  }

}
