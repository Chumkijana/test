import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { ViewMode } from '../header/view-mode.enum';

@Component({
  selector: 'app-vip-page',
  templateUrl: './vip-page.component.html',
  styleUrls: ['./vip-page.component.scss']
})
export class VipPageComponent implements OnInit {

  get ViewMode() { return ViewMode; }

  contacts = [
    {
      name: 'Tang Pech Construction Co., Ltd.',
      logo: 'https://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3517887-2014-10-31__08-32-56__new-logo?1501471429'
    },
    {
      name: 'VENG HUOT Supplies Construction Materials',
      logo: 'https://s-yoolk-images.s3.amazonaws.com/khmer/logo_images/large/3560389-Veng_huot_logo?1522465888'
    }
  ];

  groups = [
    {
      name: 'Coworking places in SEA',
      caption: '45 listings in Cambodia, Indonesia, Singapore and 5 other'
    }
  ];

  constructor(
    public headerService: HeaderService
  ) { }

  ngOnInit() {
  }

}
