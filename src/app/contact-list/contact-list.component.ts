import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contacts/shared/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  @Input() contacts: Contact[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClick(contact: Contact): void {
    this.router.navigate(['contact-detail', contact.id]);
  }

}
