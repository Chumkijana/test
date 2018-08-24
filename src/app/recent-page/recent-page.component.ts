import { Component, OnInit } from '@angular/core';
import { ViewMode } from '../header/view-mode.enum';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-recent-page',
  templateUrl: './recent-page.component.html',
  styleUrls: ['./recent-page.component.scss']
})
export class RecentPageComponent implements OnInit {

  get ViewMode() { return ViewMode; }

  contacts = [
    {
      name: 'Chumnith International Corporation (CIC)',
      logo: 'http://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3537080-Chumnith-International?1508293292'
    },
    {
      name: 'Tang Pech Construction Co., Ltd.',
      logo: 'https://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3517887-2014-10-31__08-32-56__new-logo?1501471429'
    }
  ];

  groups = [
    {
      name: 'Real Estate Agents',
      caption: '23 listings in Phnom Penh'
    }
  ];

  constructor(
    public headerService: HeaderService
  ) { }

  ngOnInit() {
  }

}
