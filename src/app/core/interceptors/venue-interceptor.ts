import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '@san/shared/interfaces/config';
import { Urls } from '@san/core/providers/urls';

/**
 * @ngdoc service
 * trafficApp.venueInterceptor
 * @description
 * # venueInterceptor
 * Appends the venue, as a querystring parameter, to each request.
 */

@Injectable()
export class VenueInterceptor implements HttpInterceptor {
  constructor(private sanConfig: Config) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const update: any = {};

    const reqClone = req.clone(update);

    if (0 === reqClone.url.indexOf(Urls.getBaseUrl())) {
      // It's an API request so we append the 'venue' parameter
      if (reqClone.params.has('forceVenue') && reqClone.params.get('forceVenue')) {
        reqClone.params.set('venue', reqClone.params.get('forceVenue'));
        reqClone.params.delete('forceVenue');
      } else {
        reqClone.params.set('venue', this.sanConfig.env.urlComponent);
      }
    }

    if (req.url.indexOf(Urls.getBaseUrl()) === 0) {
      // base url holds a placeholder url and we should change it with getCurrentBaseUrl
      update.url = req.url.replace(Urls.getBaseUrl(), Urls.getCurrentBaseUrl());
    }

    return next.handle(reqClone.clone(update));
  }
}
