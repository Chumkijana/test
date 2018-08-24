import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiBaseUrlInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const urlWithBase = `${environment.apiUrl}${req.url}`;
    const apiBaseUrlReq = req.clone({
      url: urlWithBase
    });

    return next.handle(apiBaseUrlReq);
  }

}
