import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatusService } from '../status.service';
import { DialogService } from '../../dialog/dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unsaved-toolbar',
  templateUrl: './unsaved-toolbar.component.html',
  styleUrls: ['./unsaved-toolbar.component.scss']
})
export class UnsavedToolbarComponent implements OnInit, OnDestroy {
  unsaved = false;

  private status$: Subscription;

  constructor(
    private dialogService: DialogService,
    private statusService: StatusService
  ) { }

  ngOnInit(): void {
    this.status$ = this.statusService.unsaved$.subscribe(unsaved => this.unsaved = unsaved);
  }

  ngOnDestroy(): void {
    this.status$.unsubscribe();
  }

  register() {
    this.dialogService.register();
  }
}
