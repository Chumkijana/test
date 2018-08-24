import { Component, OnInit, Input } from '@angular/core';
import { ViewMode } from '../header/view-mode.enum';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-person-list-container',
  templateUrl: './person-list-container.component.html',
  styleUrls: ['./person-list-container.component.scss']
})
export class PersonListContainerComponent implements OnInit {

  @Input() people: any[];

  get ViewMode() { return ViewMode; }

  constructor(
    public headerService: HeaderService
  ) { }

  ngOnInit() {
  }

}
