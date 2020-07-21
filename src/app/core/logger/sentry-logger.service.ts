import { ErrorHandler } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { environment } from '@san/environment';

export class SentryLoggerService extends ErrorHandler {
  constructor() {
    super();
    Sentry.init({
      dsn: environment.sentryDNS,
      environment: environment.environment
    });
  }

  handleError(error: any): void {
    Sentry.captureException(error.orinialError || error);
    throw error;
  }
}

export function getErrorHandler(): ErrorHandler {
  const noSentryEnvs = ['docker', 'test'];

  if (environment.production || !noSentryEnvs.includes(environment.environment)) {
    return new SentryLoggerService();
  }
  return new ErrorHandler();
}
