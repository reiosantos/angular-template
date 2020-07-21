import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '@san/shared/interfaces/config';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs/operators';
import { StoreActions, StoreState } from '@san/store';

/**
 * @ngdoc service
 * @description
 * # loaderInterceptor
 */

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private vcConfig: Config, private store: Store<StoreState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Using Promise.resolve(null).then(). This results in it dispatching after Angular double
    // checks for changes.
    const shoeLoader = req.headers.get('Show-Loader');
    const reqClone = req.clone({ headers: req.headers.delete('Show-Loader') });

    Promise.resolve(null).then(() => {
      if (shoeLoader === 'true') {
        this.store.dispatch(new StoreActions.loader.ShowLoaderAction());
      }
    });

    return next.handle(reqClone).pipe(finalize(() => this.store.dispatch(new StoreActions.loader.HideLoaderAction())));
  }
}
