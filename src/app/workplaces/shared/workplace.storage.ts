import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { Workplace } from './workplace.model';

@Injectable()
export class WorkplaceStorage {

  private currentWorkplaceIdKey = 'currentWorkplaceId';

  constructor(
    private storage: LocalStorageService
  ) { }

  getCurrentWorkplaceId(): string {
    return this.storage.retrieve(this.currentWorkplaceIdKey);
  }

  setCurrentWorkplaceId(workplaceId: string) {
    this.storage.store(this.currentWorkplaceIdKey, workplaceId);
  }

}
