import { Component, OnInit } from '@angular/core';
import { ScrollService } from '../core/scroll.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-contact-page',
  templateUrl: './new-contact-page.component.html',
  styleUrls: ['./new-contact-page.component.scss']
})
export class NewContactPageComponent implements OnInit {

  placeHolder: string;
  searchContext: string;
  q = '';

  constructor(
    public location: Location,
    public scrollService: ScrollService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchContext = 'Business';
    this.placeHolder = 'Search in business';
  }

  onChange(): void {
    if (this.searchContext === 'Business') {
      this.placeHolder = 'Search in business';
    } else {
      this.placeHolder = 'Search in people';
    }
  }

  onNext(): void {
    this.router.navigate(['result'], { queryParams: { kind: this.searchContext, q: this.q } } );
  }

}
