import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddOptionService } from './add-option.service';
import { AddOptionBottomSheetComponent } from './add-option-bottom-sheet/add-option-bottom-sheet.component';
import { AddOptionButtonComponent } from './add-option-button/add-option-button.component';
import { AddAddOptionBottomSheetComponent } from './add-add-option-bottom-sheet/add-add-option-bottom-sheet.component';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    AddOptionService
  ],
  declarations: [
    AddOptionBottomSheetComponent,
    AddAddOptionBottomSheetComponent,
    AddOptionButtonComponent
  ],
  exports: [
    AddOptionButtonComponent,
    AddAddOptionBottomSheetComponent
  ],
  entryComponents: [
    AddOptionBottomSheetComponent,
    AddAddOptionBottomSheetComponent
  ]
})
export class AddOptionModule { }
