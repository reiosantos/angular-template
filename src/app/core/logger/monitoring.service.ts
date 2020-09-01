import { Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { Monitor } from '@san/shared/interfaces/monitor';
import { UserType } from '@san/shared/models/user-type';

@Injectable()
export class MonitoringService extends Monitor {
  monitorUser(user: UserType) {
    Sentry.configureScope(scope => {
      scope.setUser({
        id: user.id.toString(),
        username: user.name,
        email: user.email
      });
    });
  }
}
