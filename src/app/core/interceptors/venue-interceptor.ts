import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SanConfig } from '@san/shared/interfaces/san-config';
import { SanUrls } from '@san/core/providers/san-urls';

/**
 * @ngdoc service
 * trafficApp.venueInterceptor
 * @description
 * # venueInterceptor
 * Appends the venue, as a querystring parameter, to each request.
 */

@Injectable()
export class VenueInterceptor implements HttpInterceptor {
  constructor(private sanConfig: SanConfig) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const update: any = {};
    if (req.url.indexOf(SanUrls.getBaseUrl()) === 0) {
      // base url holds a placeholder url and we should change it with getCurrentBaseUrl
      update.url = req.url.replace(SanUrls.getBaseUrl(), SanUrls.getCurrentBaseUrl());
    }

    const reqClone = req.clone(update);

    if (0 === reqClone.url.indexOf(SanUrls.getBaseUrl())) {
      // It's an API request so we append the 'venue' parameter
      if (reqClone.params.has('forceVenue') && reqClone.params.get('forceVenue')) {
        reqClone.params.set('venue', reqClone.params.get('forceVenue'));
        reqClone.params.delete('forceVenue');
      } else {
        reqClone.params.set('venue', this.sanConfig.env.urlComponent);
      }
    }

    return next.handle(reqClone);
  }
}
