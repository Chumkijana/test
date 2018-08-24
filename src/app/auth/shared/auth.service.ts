import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthStorage } from './auth.storage';

import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class AuthService {
  afterLoggedIn$ = new Subject();
  afterLoggedOut$ = new Subject();

  constructor(
    private authStorage: AuthStorage,
    private httpClient: HttpClient,
    private storage: LocalStorageService
  ) {}

  isAuthenticated(): boolean {
    const expiry = this.authStorage.getAuth().expiry;

    return !!expiry && this.isTokenNotExpired(expiry);
  }

  login(email: string, password: string): Observable<Account> {
    return this.httpClient
      .post('/auth/sign_in', { email, password })
      .pipe(
        map((res: any) => <Account>res.data),
        tap(account => {
          this.afterLoggedIn$.next();
        })
      );
  }

  logout(): Observable<any> {
    return this.httpClient
      .delete('/auth/sign_out')
      .pipe(
        tap(
          () => {
            console.log('logout');
            this.afterLoggedOut$.next();
            this.authStorage.setAuth(null);
            this.storage.clear('company_id');
          }
        )
      );
  }

  register(email: string, password: string): Observable<any> {
    return this.httpClient.post('/auth', { email, password }).pipe(
      tap(
        (res: any) => {
          this.afterLoggedIn$.next();
        }
      )
    );
  }

  facebookLogin(id: string, email: string): Observable<any> {
    return this.httpClient
      .post('/auth/sign_up_with_provider', { uid: id, email: email, provider: 'facebook' }).pipe(
        tap(
          (res: any) => {
            this.afterLoggedIn$.next();
          }
        )
      );
  }

  googleLogin(id: string, email: string): Observable<any> {
    return this.httpClient
      .post('/auth/sign_up_with_provider', { uid: id, email: email, provider: 'google' }).pipe(
        tap(
          (res: any) => {
            this.afterLoggedIn$.next();
          }
        )
      );
  }

  private isTokenNotExpired(expiry: number): boolean {
    return Date.now() > expiry;
  }
}
