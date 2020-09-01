import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '@san/shared/interfaces/config';
import { Urls } from '@san/core/providers/urls';
import { Strings } from '@san/shared/interfaces/strings';
import { UserType } from '@san/shared/models/user-type';
import { Storage } from '@san/shared/interfaces/storage';

/**
 * @ngdoc service
 * trafficApp.venueInterceptor
 * @description
 * # venueInterceptor
 * Appends the venue, as a querystring parameter, to each request.
 */

@Injectable()
export class VenueInterceptor implements HttpInterceptor {
  constructor(private sanConfig: Config, private storage: Storage) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const update: any = {};

    const reqClone = req.clone(update);

    if (0 === reqClone.url.indexOf(Urls.getBaseUrl())) {
      let { params } = reqClone;
      // It's an API request so we append the 'venue' parameter
      if (params.has('forceVenue') && params.get('forceVenue')) {
        params = params.set('venue', params.get('forceVenue'));
        params = params.delete('forceVenue');
      } else {
        params = params.set('venue', this.sanConfig.env.urlComponent);
      }

      let user: UserType = this.storage.get(Strings.USER_KEY);
      if (user) {
        user = new UserType(user);
        const company = params.has('company') && params.get('company');

        if (!user.isSuperAdmin) {
          // all non super users mut send their company
          params = params.set('company', user.companyId?.toString());
        } else {
          if (!company) {
            // super user but did not supply a company, use the user company
            params = params.set('company', user.companyId?.toString());
          }
        }
      }
      update.params = params;
    }

    if (req.url.indexOf(Urls.getBaseUrl()) === 0) {
      // base url holds a placeholder url and we should change it with getCurrentBaseUrl
      update.url = req.url.replace(Urls.getBaseUrl(), Urls.getCurrentBaseUrl());
    }

    return next.handle(reqClone.clone(update));
  }
}
