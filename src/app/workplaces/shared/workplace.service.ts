import { Injectable } from '@angular/core';

import { Workplace } from './workplace.model';
import { WorkplaceStorage } from './workplace.storage';

import { AuthService } from '../../auth/shared/auth.service';
import { AccountService } from '../../accounts/shared/account.service';

import { Subject } from 'rxjs';

@Injectable()
export class WorkplaceService {

  workplace$: Subject<Workplace> = new Subject<Workplace>();

  private workplaces: Workplace[] = [];

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private workplaceStorage: WorkplaceStorage
  ) {
    this.accountService
      .account$
      .subscribe(account => {
        if (account) {
          this.workplaces = account.workplaces;
        } else {
          this.workplaces = [];
        }
      });
  }

  getCurrentWorkplace(): Workplace {
    const currentWorkplaceId = this.workplaceStorage.getCurrentWorkplaceId();

    return this.workplaces.find(workplace => workplace.id === currentWorkplaceId);
  }

  setCurrentWorkplace(workplace: Workplace) {
    this.workplace$.next(workplace);

    if (workplace) {
      this.workplaceStorage.setCurrentWorkplaceId(workplace.id);
    } else {
      this.workplaceStorage.setCurrentWorkplaceId(null);
    }
  }

}
