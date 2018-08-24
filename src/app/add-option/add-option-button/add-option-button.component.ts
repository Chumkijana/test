import { Component, OnInit } from '@angular/core';
import { AddOptionService } from '../add-option.service';

@Component({
  selector: 'app-add-option-button',
  templateUrl: './add-option-button.component.html',
  styleUrls: ['./add-option-button.component.scss']
})
export class AddOptionButtonComponent implements OnInit {

  constructor(
    public addOptionService: AddOptionService
  ) { }

  ngOnInit() {
  }

}
