import { Component, OnInit, Input } from '@angular/core';
import { ContactGroup } from '../contact-groups/shared/contact-group.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-group-list',
  templateUrl: './contact-group-list.component.html',
  styleUrls: ['./contact-group-list.component.scss']
})
export class ContactGroupListComponent implements OnInit {

  @Input() groups: ContactGroup[];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClick(group: ContactGroup): void {
    this.router.navigate(['group-detail', group.id]);
  }

}
