import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from '@san/app.component';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@san/core/core.module';
import { AppRoutingModule } from '@san/app-routing.module';
import { PageNotFoundComponent } from '@san/shared/components/page-not-found/page-not-found.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from '@san/shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@san/environment';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    CoreModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    // service worker needs to be tested on a prod server(NGINX) is a good choice here.
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
