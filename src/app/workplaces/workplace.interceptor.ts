import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { WorkplaceStorage } from './shared/workplace.storage';

import { Observable } from 'rxjs';


@Injectable()
export class WorkplaceInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const workplaceStorage = this.injector.get(WorkplaceStorage);
    const workplaceId = workplaceStorage.getCurrentWorkplaceId();

    // attach param workplaceId to request.
    if (workplaceId) {
      req = req.clone({
        setParams: {
          workplace_id: workplaceId
        }
      });
    }

    return next.handle(req);
  }
}
