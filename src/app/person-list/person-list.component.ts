import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  @Input() people: any[];

  constructor() { }

  ngOnInit() {
  }

}
