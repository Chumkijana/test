import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-group-list-page',
  templateUrl: './contact-group-list-page.component.html',
  styleUrls: ['./contact-group-list-page.component.scss']
})
export class ContactGroupListPageComponent implements OnInit {

  groups = [
    { name: 'Suppliers' },
    { name: 'Customers' },
    { name: 'Real Estates' },
    { name: 'Constructions' },
    { name: 'Clients' },
    { name: 'TK Area' },
    { name: 'BKK Area' },
    { name: 'Potentials' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
