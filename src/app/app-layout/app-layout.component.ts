import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { DrawerService } from '../drawer/drawer.service';
import { ScrollService } from '../core/scroll.service';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('drawer') drawer: MatDrawer;

  constructor(
    public authService: AuthService,
    private drawerService: DrawerService,
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.drawerService.setDrawer(this.drawer);
    });
  }

  onScroll(e: any): void {
    this.scrollService.scroll(e.target.scrollTop);
  }

}
