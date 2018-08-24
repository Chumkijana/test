import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollService } from '../core/scroll.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, AfterViewInit {

  @ViewChild('inputSearch') inputSearch: ElementRef;

  constructor(
    public location: Location,
    public scrollService: ScrollService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inputSearch.nativeElement.focus();
    });
  }

  onClear(): void {
    const el = this.inputSearch.nativeElement;

    el.value = '';
    el.focus();
  }

  search(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      this.router.navigate(['result'], {
        queryParams: {
          q: this.inputSearch.nativeElement.value,
          kind: 'Business'
        }
      });
    }
  }

}
