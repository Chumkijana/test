import { Injectable, Injector } from '@angular/core';
import { AuthStorage } from './shared/auth.storage';
import {
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './shared/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const authStorage = this.injector.get(AuthStorage);
    const auth = authStorage.getAuth();

    // attach authenticated headers to request.
    if (authService.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          'access-token': auth.accessToken,
          'token-type': auth.tokenType,
          'client': auth.client,
          'expiry': auth.expiry.toString(),
          'uid': auth.uid
        }
      });
    }

    return next.handle(req).pipe(
      // updated to new authenticated headers from response.
      tap(
        (e: HttpEvent<any>) => {
          if (e instanceof HttpResponse && e.headers.get('access-token')) {
            auth.accessToken = e.headers.get('access-token');
            auth.tokenType = e.headers.get('token-type');
            auth.client = e.headers.get('client');
            auth.expiry = +e.headers.get('expiry');
            auth.uid = e.headers.get('uid');

            authStorage.setAuth(auth);
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            console.log('error response');
          }
        }
      )
    );
  }
}
