import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-search-button',
  templateUrl: './contact-search-button.component.html',
  styleUrls: ['./contact-search-button.component.scss']
})
export class ContactSearchButtonComponent {

  constructor(
    private router: Router
  ) { }

  gotoContactSearch(): void {
    this.router.navigate(['contacts', 'search']);
  }
}
