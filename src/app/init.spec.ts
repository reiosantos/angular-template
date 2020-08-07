import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@san/shared/components/confirmation-dialog/confirmation-dialog.component';
import { IconComponent } from '@san/shared/components/icon/icon.component';
import { AppMaterialModule } from '@san/app-material.module';
import { AppFontIconModule } from '@san/app-font-icon.module';
import { LanguageComponent } from '@san/shared/components/language/language.component';
import { Config } from '@san/shared/interfaces/config';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ErrorStateMatcher as XErrorStateMatcher } from '@angular/material/core';

import { ErrorStateMatcher } from '@san/core/providers/error-state-matcher';
import { ErrorHandler } from '@angular/core';
import { getErrorHandler } from '@san/core/logger/sentry-logger.service';
import { AppConfigService } from '@san/configs/app-config.service';
import { UrlComponent } from '@san/shared/interfaces/url-component';
import { UrlComponentService } from '@san/configs/url-component/url-component.service';
import { Auth } from '@san/shared/interfaces/auth';
import { AuthService } from '@san/core/services/auth/auth.service';
import { Storage } from '@san/shared/interfaces/storage';
import { StorageService } from '@san/core/providers/storage/storage.service';
import { AuthToken } from '@san/shared/interfaces/auth-token';
import { AuthTokenService } from '@san/core/providers/auth-token/auth-token.service';
import { Logger, LoggerPublisher } from '@san/shared/interfaces/logger-publisher';
import { LoggerService } from '@san/core/logger/logger.service';
import { LoggerPublisherService } from '@san/core/logger/logger-publisher.service';
import { HttpClient } from '@san/shared/interfaces/http-client';
import { HttpWrapperService } from '@san/core/http/http-wrapper.service';
import { NavMenu } from '@san/shared/interfaces/nav-menu';
import { NavMenuService } from '@san/core/providers/nav-menu/nav-menu.service';
import { Monitor } from '@san/shared/interfaces/monitor';
import { MonitoringService } from '@san/core/logger/monitoring.service';
import { Alert } from '@san/shared/interfaces/alert';
import { AlertService } from '@san/core/providers/alert/alert.service';
import { UserI } from '@san/shared/interfaces/services/user-i';
import { UserService } from '@san/core/services/user/user.service';
import { createTranslateLoader } from '@san/app.module';
import { SanStoreModule } from '@san/store';
import { LoaderComponent } from '@san/shared/components/loader/loader.component';
import { ComponentType } from '@angular/cdk/overlay';
import { AuthWrapperComponent } from '@san/modules/auth/auth-wrapper/auth-wrapper.component';
import { NotificationComponent } from '@san/shared/components/notification/notification.component';
import { LoginComponent } from '@san/modules/auth/login/login.component';
import { SidebarComponent } from '@san/shared/components/sidebar/sidebar.component';
import { mockMatDialogData, mockMatDialogRef } from '@san/core/mocks/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TitleCasePipe } from '@angular/common';
import { ErrorControlDirective } from '@san/shared/directives/error/error-control.directive';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const declarationsGlobal = [
  ConfirmModalComponent,
  IconComponent,
  LanguageComponent,
  LoaderComponent,
  AuthWrapperComponent,
  NotificationComponent,
  LoginComponent,
  SidebarComponent,
  ErrorControlDirective
];

export class InitSpec {
  static configureTestBed(declarations: Array<ComponentType<any>> = [], providers: Array<{}> = []) {
    beforeEach(async () => {
      return TestBed.configureTestingModule({
        imports: [
          AppMaterialModule,
          AppFontIconModule,
          SanStoreModule,
          ReactiveFormsModule,
          RouterTestingModule,
          HttpClientTestingModule,
          NoopAnimationsModule,
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: createTranslateLoader,
              deps: [HttpClient]
            }
          })
        ],
        declarations: [...declarationsGlobal, ...declarations],
        providers: [
          TitleCasePipe,
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
          { provide: UserI, useClass: UserService },

          { provide: MatDialogRef, useValue: mockMatDialogRef },
          { provide: MAT_DIALOG_DATA, useValue: mockMatDialogData },
          ...providers
        ]
      }).compileComponents();
    });
  }
}
