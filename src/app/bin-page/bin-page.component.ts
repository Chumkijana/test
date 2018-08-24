import { Component, OnInit } from '@angular/core';
import { ViewMode } from '../header/view-mode.enum';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-bin-page',
  templateUrl: './bin-page.component.html',
  styleUrls: ['./bin-page.component.scss']
})
export class BinPageComponent implements OnInit {

  get ViewMode() { return ViewMode; }

  contacts = [
    {
      name: 'Chumnith International Corporation (CIC)',
      logo: 'http://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3537080-Chumnith-International?1508293292'
    }
  ];

  constructor(
    public headerService: HeaderService
  ) { }

  ngOnInit() {
  }

}
