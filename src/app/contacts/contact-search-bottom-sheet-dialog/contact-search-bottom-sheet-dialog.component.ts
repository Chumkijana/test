// import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { Router } from '@angular/router';
// import { MatDialogRef } from '@angular/material';

// @Component({
//   selector: 'app-contact-search-bottom-sheet-dialog',
//   templateUrl: './contact-search-bottom-sheet-dialog.component.html',
//   styleUrls: ['./contact-search-bottom-sheet-dialog.component.scss'],
//   encapsulation: ViewEncapsulation.None
// })
// export class ContactSearchBottomSheetDialogComponent implements OnInit {

//   constructor(
//     private router: Router,
//     private dialogRef: MatDialogRef<ContactSearchBottomSheetDialogComponent>
//   ) { }

//   ngOnInit() {
//   }

//   onClickYellowPages(e: any): void {
//     this.onClick(e, '/yellow-pages/search');
//   }

//   onClickGooglePlaces(e: any): void {
//     this.onClick(e, '/google-places/search');
//   }

//   private onClick(e: any, path: string): void {
//     e.preventDefault();

//     this.dialogRef.close();
//     this.router.navigate([path]);
//   }
// }
