import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../../auth/shared/auth.service';

@Injectable()
export class StatusService {

  unconfirmed$: Subject<boolean> = new Subject<boolean>();
  unsaved$: Subject<boolean> = new Subject<boolean>();

  private afterLoggedIn$: Subscription;

  constructor(
    private authService: AuthService
  ) {
    this.afterLoggedIn$ = this.authService.afterLoggedIn$.subscribe(() => this.hideUnsaved());
  }

  showUnsaved(): void {
    this.unsaved$.next(true);
  }

  hideUnsaved(): void {
    this.unsaved$.next(false);
  }

  showUnconfirmed(): void {
    this.unconfirmed$.next(true);
  }

  hideUnconfirmed(): void {
    this.unconfirmed$.next(false);
  }
}
