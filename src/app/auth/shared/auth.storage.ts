import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Auth } from './auth.model';

@Injectable()
export class AuthStorage {
  private authKey = 'auth';

  constructor(
    private storage: LocalStorageService
  ) {}

  getAuth(): Auth {
    return <Auth>(this.storage.retrieve(this.authKey) || {});
  }

  setAuth(auth: Auth): void {
    this.storage.store(this.authKey, auth);
  }
}
