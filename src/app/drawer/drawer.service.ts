import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material';

@Injectable()
export class DrawerService {

  private drawer: MatDrawer;

  constructor(
  ) { }

  close(): void {
    this.drawer.close();
  }

  open(): void {
    this.drawer.open();
  }

  setDrawer(drawer: MatDrawer): void {
    this.drawer = drawer;
  }

}
