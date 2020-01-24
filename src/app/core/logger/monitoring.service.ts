import { Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { SanMonitor } from '@san/shared/interfaces/san-monitor';
import { SanUser } from '@san/shared/models/san-user';

@Injectable()
export class MonitoringService extends SanMonitor {
  monitorUser(user: SanUser) {
    Sentry.configureScope((scope) => {
      scope.setUser({
        id: user.id,
        username: user.name,
        email: user.email
      });
    });
  }
}
