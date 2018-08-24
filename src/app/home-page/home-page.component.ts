import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { ContactService } from '../contacts/shared/contact.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit, OnDestroy {

  contacts: any[] = [];
  groups: any[] = [];
  people: any[] = [];

  constructor(
    public headerService: HeaderService,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.contactService
      .loadAll()
      .subscribe((res: any) => {
        const data = res.data;

        this.contacts = data.contacts;
        this.groups = data.groups;
        this.people = data.people;
      });
  }

  ngOnDestroy(): void {
  }

}
