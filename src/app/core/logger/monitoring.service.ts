import { Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { Monitor } from '@san/shared/interfaces/monitor';
import { User } from '@san/shared/models/user';

@Injectable()
export class MonitoringService extends Monitor {
  monitorUser(user: User) {
    Sentry.configureScope(scope => {
      scope.setUser({
        id: user.id,
        username: user.name,
        email: user.email
      });
    });
  }
}
