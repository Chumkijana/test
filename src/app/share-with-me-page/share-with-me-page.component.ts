import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewMode } from '../header/view-mode.enum';
import { HeaderService } from '../header/header.service';
import { ContactService } from '../contacts/shared/contact.service';

@Component({
  selector: 'app-share-with-me',
  templateUrl: './share-with-me-page.component.html',
  styleUrls: ['./share-with-me-page.component.scss']
})
export class ShareWithMePageComponent implements OnInit, OnDestroy {

  get ViewMode() { return ViewMode; }

  contacts: any[] = [];
  groups: any[] = [];

  constructor(
    public headerService: HeaderService,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.contactService
      .loadShareWithMe()
      .subscribe((res: any) => {
        const data = res.data;

        this.groups = data.groups;
        this.contacts = data.contacts;
      });
  }

  ngOnDestroy(): void {
  }

}
