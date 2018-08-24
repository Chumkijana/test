import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { Contact } from '../shared/contact.model';
import { ContactService } from '../shared/contact.service';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-contact-search-page',
  templateUrl: './contact-search-page.component.html',
  styleUrls: ['./contact-search-page.component.scss']
})
export class ContactSearchPageComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  searching = false;
  noResult = false;

  private searchTerms = new Subject<String>();

  constructor(
    private contactService: ContactService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // more than 2 chars
      filter((term: string) => term.length > 2),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        this.searching = true;

        return this.contactService.searchContacts(term);
      })
    ).subscribe((contacts: Contact[]) => {
      this.searching = false;
      this.noResult = !!!contacts.length;
      this.contacts = contacts;
    });
  }

  ngOnDestroy(): void {
    this.searchTerms.unsubscribe();
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  goback(): void {
    this.location.back();
  }
}
