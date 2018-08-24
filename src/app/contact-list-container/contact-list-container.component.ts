import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { ViewMode } from '../header/view-mode.enum';
import { Router } from '@angular/router';
import { Contact } from '../contacts/shared/contact.model';

@Component({
  selector: 'app-contact-list-container',
  templateUrl: './contact-list-container.component.html',
  styleUrls: ['./contact-list-container.component.scss']
})
export class ContactListContainerComponent implements OnInit {

  @Input() contacts: Contact[] = [];

  get ViewMode() { return ViewMode; }

  constructor(
    public headerService: HeaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
