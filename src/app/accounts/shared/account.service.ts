import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Account } from './account.model';

import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/shared/auth.service';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class AccountService {

  account: any = null;
  account$ = new Subject<Account>();

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private storage: LocalStorageService
  ) {
    this.authService
      .afterLoggedIn$
      .subscribe(() => this.loadAccountInfo().subscribe());

    this.authService
      .afterLoggedOut$
      .subscribe(() => this.account$.next(null));
  }

  loadAccountInfo(): Observable<Account> {
    return this.httpClient
      .get('/account/info')
      .pipe(
        map((res: any) => <Account>res.data),
        tap(account => {
          this.account = account;
          console.log(account);
          this.account$.next(account);
          if (account.company) {
            this.storage.store('company_id', account.company.id);
          } else {
            this.storage.store('company_id', null);
          }
        })
      );
  }

}
