import { Injectable } from '@angular/core';
import { ViewMode } from './view-mode.enum';
import { DataMode } from './data-mode.enum';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Injectable()
export class HeaderService {

  dataMode: DataMode;
  viewMode: ViewMode;

  titleChanged$ = new Subject<string | null>();

  constructor(
    private title: Title
  ) {
    this.dataMode = DataMode.Contact;
    this.viewMode = ViewMode.List;
  }

  changeViewMode(): void {
    switch (this.viewMode) {
      case ViewMode.List:
        this.viewMode = ViewMode.Module;
        break;

      case ViewMode.Module:
        this.viewMode = ViewMode.List;
        break;
    }
  }

  changeDataMode(): void {
    switch (this.dataMode) {
      case DataMode.Contact:
        this.dataMode = DataMode.People;
        break;

      case DataMode.People:
        this.dataMode = DataMode.Contact;
        break;
    }
  }

  setTitle(title: string): void {
    this.titleChanged$.next(title);
    this.title.setTitle(title);
  }

}
