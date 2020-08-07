import { TestBed } from '@angular/core/testing';

import { AppConfigService } from './app-config.service';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { UrlComponent } from '@san/shared/interfaces/url-component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { createTranslateLoader } from '@san/app.module';
import { UrlComponentService } from '@san/configs/url-component/url-component.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppConfigService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        AppConfigService,
        HttpBackend,
        TranslateService,
        { provide: UrlComponent, useClass: UrlComponentService }
      ]
    })
  );

  it('should be created', () => {
    const service: AppConfigService = TestBed.inject(AppConfigService);
    expect(service).toBeTruthy();
  });

  it('should init settings', () => {
    const service: AppConfigService = TestBed.inject(AppConfigService);
    spyOn(service, 'fetchTranslations').and.returnValue(
      of({ availableLanguages: [2], translations: { en: 'us-uat' } })
    );
    spyOn(service, 'fetchVenueSettings').and.returnValue(of({ ENABLE_SHIFTS: true }));

    service.initSettings().subscribe(v => {
      expect(v).toBeInstanceOf(Object);
      expect(service.venueSettings).toEqual({ ENABLE_SHIFTS: true });
      expect(service.translations).toEqual({ en: 'us-uat' });
      expect(service.availableLanguages).toEqual([2]);
    });
  });
});
