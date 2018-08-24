import { Component, OnInit, Input } from '@angular/core';
import { ContactGroup } from '../contact-groups/shared/contact-group.model';
import { HeaderService } from '../header/header.service';
import { ViewMode } from '../header/view-mode.enum';

@Component({
  selector: 'app-contact-group-list-container',
  templateUrl: './contact-group-list-container.component.html',
  styleUrls: ['./contact-group-list-container.component.scss']
})
export class ContactGroupListContainerComponent implements OnInit {

  @Input() groups: ContactGroup[];

  get ViewMode() { return ViewMode; }

  constructor(
    public headerService: HeaderService
  ) { }

  ngOnInit() {
  }

}
