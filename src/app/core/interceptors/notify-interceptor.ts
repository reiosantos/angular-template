import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Config } from '@san/shared/interfaces/config';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs/operators';
import { StoreActions, StoreState } from '@san/store';
import { NotificationTypes } from '@san/store/shared/notification/actions';

/**
 * @ngdoc service
 * @description
 * # loaderInterceptor
 */

@Injectable()
export class NotifyInterceptor implements HttpInterceptor {
  constructor(private config: Config, private store: Store<StoreState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message: string = null;

        if (typeof error.error === 'string') {
          if (!error.error.includes('<!DOCTYPE html>')) {
            // not an html page, so show the error
            message = error.error;
          }
        } else if (Array.isArray(error.error)) {
          message = error.error.join(' ');
        } else if (typeof error.error === 'object') {
          let [values] = Object.values(error.error);
          if (Array.isArray(values)) {
            values = values.join(' ');
          }
          // @ts-ignore
          message = values;
        }

        let type = NotificationTypes.WARN;
        if (error.status >= 500) {
          // only show server side errors as ERRORS
          type = NotificationTypes.ERROR;
        }

        const payload = { message, type };
        if (message) {
          this.store.dispatch(new StoreActions.notify.ShowNotification(payload));
        }
        return EMPTY;
      })
    );
  }
}
