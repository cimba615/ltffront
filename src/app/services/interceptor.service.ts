import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';

@Injectable()
export class InterceptorService {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('currentUser') && localStorage.getItem('currentUser').length > 0) {
      request = request.clone({
        setHeaders: {
          BasicAuthentication: `${localStorage.getItem('sessionToken')}`
        }
      });
    }

    return next.handle(request);
  }

}
