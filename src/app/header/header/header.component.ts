import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { DataMode } from '../data-mode.enum';
import { HeaderService } from '../header.service';
import { ViewMode } from '../view-mode.enum';

import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { DrawerService } from '../../drawer/drawer.service';
import { ScrollService } from '../../core/scroll.service';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  DataMode = DataMode;
  ViewMode = ViewMode;

  atTop = true;
  title: string;

  private $routerEvent: Subscription;
  private $titleChanged: Subscription;

  constructor(
    public authService: AuthService,
    public drawerService: DrawerService,
    public headerService: HeaderService,
    public scrollService: ScrollService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.subcribeRouterEvent();
    this.$titleChanged = this.headerService.titleChanged$.subscribe(title => this.title = title);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.$routerEvent.unsubscribe();
    this.$titleChanged.unsubscribe();
  }

  goto(path: string): void {
    this.router.navigate([path]);
  }

  private subcribeRouterEvent(): void {
    this.$routerEvent = this.router
      .events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute.firstChild),
        switchMap(route => route.data)
      )
      .subscribe((data: any) => {
        if (data) {
          this.headerService.setTitle(data.title);
        }
      });
  }

}
