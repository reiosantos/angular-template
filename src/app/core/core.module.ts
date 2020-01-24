import { CommonModule } from '@angular/common';
import { ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { LoggerService } from '@san/core/logger/logger.service';
import { LoggerPublisherService } from '@san/core/logger/logger-publisher.service';
import { NavMenuService } from '@san/core/services/nav-menu/nav-menu.service';
import { AlertService } from '@san/core/services/alert/alert.service';
import { AuthService } from '@san/core/services/auth/auth.service';
import { getErrorHandler } from '@san/core/logger/sentry-logger.service';
import { HttpWrapperService } from '@san/core/http/http-wrapper.service';
import { ErrorStateMatcher } from '@angular/material';
import { SanErrorStateMatcher } from '@san/core/providers/san-error-state-matcher';
import { SanAuth } from '@san/shared/interfaces/san-auth';
import { SanAuthToken } from '@san/shared/interfaces/san-auth-token';
import { SanLogger, SanLoggerPublisher } from '@san/shared/interfaces/san-logger-publisher';
import { SanAuthTokenService } from '@san/core/services/auth-token/san-auth-token.service';
import { SanHttpClient } from '@san/shared/interfaces/san-http-client';
import { SanNavMenu } from '@san/shared/interfaces/san-nav-menu';
import { SanMonitor } from '@san/shared/interfaces/san-monitor';
import { MonitoringService } from '@san/core/logger/monitoring.service';
import { SanAlert } from '@san/shared/interfaces/san-alert';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: ErrorStateMatcher, useClass: SanErrorStateMatcher },
        { provide: ErrorHandler, useFactory: getErrorHandler },
        { provide: SanAuth, useClass: AuthService },
        { provide: SanAuthToken, useClass: SanAuthTokenService },
        { provide: SanLogger, useClass: LoggerService },
        { provide: SanLoggerPublisher, useClass: LoggerPublisherService },
        { provide: SanHttpClient, useClass: HttpWrapperService },
        { provide: SanNavMenu, useClass: NavMenuService },
        { provide: SanMonitor, useClass: MonitoringService },
        { provide: SanAlert, useClass: AlertService }
      ]
    };
  }
}
