import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { SanConfig } from '@san/shared/interfaces/san-config';
import { SanUrlComponent } from '@san/shared/interfaces/san-url-component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { configFactory } from '@san/core/providers/san-app.factories';
import { JwtInterceptor } from '@san/core/interceptors/jwt-interceptor';
import { VenueInterceptor } from '@san/core/interceptors/venue-interceptor';
import { AppConfigService } from '@san/configs/app-config.service';
import { UrlComponentService } from '@san/configs/url-component/url-component.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@san/core/core.module';
import { AppRoutingModule } from '@san/app-routing.module';
import {
  PageNotFoundComponent
} from '@san/shared/components/page-not-found/page-not-found.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient]
      }
    }),
    CoreModule.forRoot(),
    AppRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    { provide: SanConfig, useClass: AppConfigService },
    { provide: SanUrlComponent, useClass: UrlComponentService },
    { provide: APP_INITIALIZER, useFactory: configFactory, deps: [SanConfig], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: VenueInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
