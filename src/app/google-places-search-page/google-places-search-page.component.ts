// import { Component, OnInit } from '@angular/core';
// // import { Contact } from '../core/contact/contact.model';
// // import { ContactService } from '../core/contact/contact.service';

// @Component({
//   selector: 'app-google-places-search-page',
//   templateUrl: './google-places-search-page.component.html',
//   styleUrls: ['./google-places-search-page.component.scss']
// })
// export class GooglePlacesSearchPageComponent implements OnInit {

//   name = 'Search in Google Places';
//   // contacts: Contact[] = [];
//   loading = false;

//   private location: string;

//   constructor(
//     // private contactService: ContactService
//   ) { }

//   ngOnInit() {
//     this.getLatLong();
//   }

//   onSearch(query: string): void {
//     if (!this.location) {
//       return;
//     }

//     // this.contactService
//     //   .searchGooglePlacesContacts(query, this.location)
//     //   .subscribe(
//     //     ((contacts: Contact[]) => this.contacts = contacts),
//     //     () => { this.onLoading(false) },
//     //     () => { this.onLoading(false) }
//     //   )
//   }

//   onLoading(loading: boolean): void {
//     this.loading = loading;
//   }

//   private getLatLong(): void {
//     navigator.geolocation.getCurrentPosition((position) => {
//       console.log('ready');

//       this.location = `${position.coords.latitude},${position.coords.longitude}`;
//     });
//   }

// }
