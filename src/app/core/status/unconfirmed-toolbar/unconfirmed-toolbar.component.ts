import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatusService } from '../status.service';
import { DialogService } from '../../dialog/dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unconfirmed-toolbar',
  templateUrl: './unconfirmed-toolbar.component.html',
  styleUrls: ['./unconfirmed-toolbar.component.scss']
})
export class UnconfirmedToolbarComponent implements OnInit, OnDestroy {
  unconfirmed = false;

  private status$: Subscription;

  constructor(
    private dialogService: DialogService,
    private statusService: StatusService
  ) { }

  ngOnInit(): void {
    this.status$ = this.statusService.unconfirmed$.subscribe(unconfirmed => this.unconfirmed = unconfirmed);
  }

  ngOnDestroy(): void {
    this.status$.unsubscribe();
  }
}
