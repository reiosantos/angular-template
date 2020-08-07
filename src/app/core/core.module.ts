import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { LoggerService } from '@san/core/logger/logger.service';
import { LoggerPublisherService } from '@san/core/logger/logger-publisher.service';
import { AlertService } from '@san/core/providers/alert/alert.service';
import { AuthService } from '@san/core/services/auth/auth.service';
import { getErrorHandler } from '@san/core/logger/sentry-logger.service';
import { HttpWrapperService } from '@san/core/http/http-wrapper.service';
import { ErrorStateMatcher } from '@san/core/providers/error-state-matcher';
import { Auth } from '@san/shared/interfaces/auth';
import { AuthToken } from '@san/shared/interfaces/auth-token';
import { Logger, LoggerPublisher } from '@san/shared/interfaces/logger-publisher';
import { HttpClient } from '@san/shared/interfaces/http-client';
import { NavMenu } from '@san/shared/interfaces/nav-menu';
import { Monitor } from '@san/shared/interfaces/monitor';
import { MonitoringService } from '@san/core/logger/monitoring.service';
import { Alert } from '@san/shared/interfaces/alert';
import { ErrorStateMatcher as XErrorStateMatcher } from '@angular/material/core';
import { Config } from '@san/shared/interfaces/config';
import { AppConfigService } from '@san/configs/app-config.service';
import { UrlComponentService } from '@san/configs/url-component/url-component.service';
import { UrlComponent } from '@san/shared/interfaces/url-component';
import { Storage } from '@san/shared/interfaces/storage';
import { StorageService } from '@san/core/providers/storage/storage.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { configFactory } from '@san/core/providers/app.factories';
import { JwtInterceptor } from '@san/core/interceptors/jwt-interceptor';
import { VenueInterceptor } from '@san/core/interceptors/venue-interceptor';
import { LoaderInterceptor } from '@san/core/interceptors/loader-interceptor';
import { AuthTokenService } from '@san/core/providers/auth-token/auth-token.service';
import { NavMenuService } from '@san/core/providers/nav-menu/nav-menu.service';
import { SanStoreModule } from '@san/store';
import { UserService } from '@san/core/services/user/user.service';
import { User } from '@san/shared/interfaces/services/user';
import { NotifyInterceptor } from '@san/core/interceptors/notify-interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, SanStoreModule, HttpClientModule],
  exports: [SanStoreModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: XErrorStateMatcher, useClass: ErrorStateMatcher },
        { provide: ErrorHandler, useFactory: getErrorHandler },
        { provide: Config, useClass: AppConfigService },
        { provide: UrlComponent, useClass: UrlComponentService },
        { provide: Auth, useClass: AuthService },
        { provide: Storage, useClass: StorageService },
        { provide: AuthToken, useClass: AuthTokenService },
        { provide: Logger, useClass: LoggerService },
        { provide: LoggerPublisher, useClass: LoggerPublisherService },
        { provide: HttpClient, useClass: HttpWrapperService },
        { provide: NavMenu, useClass: NavMenuService },
        { provide: Monitor, useClass: MonitoringService },
        { provide: Alert, useClass: AlertService },
        { provide: User, useClass: UserService },

        { provide: APP_INITIALIZER, useFactory: configFactory, deps: [Config], multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: NotifyInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: VenueInterceptor, multi: true }
      ]
    };
  }
}
