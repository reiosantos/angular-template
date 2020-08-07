import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthToken } from '@san/shared/interfaces/auth-token';

/**
 * @ngdoc service
 * trafficApp.jwtInterceptor
 * @description
 * # jwtInterceptor
 */

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authToken: AuthToken) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let reqClone = req;

    const doNotSendTokenToThisUrls = ['/api/jwt/verify/', '/api/jwt/getLoginUrl/'];

    if (this.authToken.getToken() && doNotSendTokenToThisUrls.indexOf(reqClone.url) === -1) {
      reqClone = reqClone.clone({
        headers: reqClone.headers.set('Authorization', `JWT ${this.authToken.getToken()}`)
      });
    }

    return next.handle(reqClone);
  }
}
