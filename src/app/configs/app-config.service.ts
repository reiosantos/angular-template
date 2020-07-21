import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@san/environment';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from '@san/shared/interfaces/config';
import { Constants } from '@san/shared/interfaces/constants';
import { UrlComponent } from '@san/shared/interfaces/url-component';

@Injectable()
export class AppConfigService extends Config {
  env: Constants = {};
  venueSettings: any = {};
  availableLanguages: any = [];
  translations: any = {};
  private httpClient: HttpClient;

  constructor(
    private httpBackend: HttpBackend,
    private vcUrlComponent: UrlComponent,
    private translateService: TranslateService
  ) {
    super();
    this.httpClient = new HttpClient(this.httpBackend);
    this.env = environment;
    this.env.urlComponent = this.vcUrlComponent.get();
  }

  private fetchVenueSettings = (): Observable<any> => {
    return this.httpClient.get(`${environment.baseUrl}venue/settings/?venue=${this.env.urlComponent}`).pipe(
      map((settings: [] = []) => {
        return settings.reduce((accumulator: { [key: string]: string }, current: { path?: string; value?: string }) => {
          if (current.path) {
            accumulator[current.path] = current.value;
          }
          return accumulator;
        }, {});
      }),
      map((value: any) => {
        value.dateformat = Object.assign(
          {},
          {
            shortTime: 'HH:mm',
            mediumDate: 'dd-MMM-yyyy',
            medium: 'dd-MMM-yyyy HH:mm',
            full: 'EEE d MMM HH:mm'
          },
          value.dateformat
        );
        return value;
      })
    );
  };

  private fetchTranslations = (): Observable<any> => {
    return this.httpClient.get(`${environment.baseUrl}terminology/?venue=${this.env.urlComponent}`).pipe(
      map((terminologyResponse: any) => {
        const translations: any = terminologyResponse.translations || {};
        const availableLanguages = terminologyResponse.availableLanguages || [];
        const langs = [];

        const entries: [string, string][] = Object.entries(translations);

        for (const [key, value] of entries) {
          this.translateService.setTranslation(key, value);
          langs.push(key);
        }

        langs.forEach(lang => {
          this.translateService.getTranslation(lang).subscribe(
            value => {
              const mergedTranslations = Object.assign({}, translations[lang], value);
              this.translateService.setTranslation(lang, mergedTranslations);
            },
            () => {}
          );
        });

        this.translateService.setDefaultLang('en-us');
        this.translateService.addLangs(langs);
        this.translateService.use('en-us');
        return { availableLanguages, translations };
      })
    );
  };

  initSettings = (): Observable<any> => {
    return forkJoin([this.fetchVenueSettings(), this.fetchTranslations()]).pipe(
      map((results: Record<string, unknown>[] = []) => {
        const venueSettings: any = results[0] || {};
        const terminology: any = results[1] || {};

        this.venueSettings = venueSettings;
        this.availableLanguages = terminology.availableLanguages;
        this.translations = terminology.translations;

        return results;
      })
    );
  };
}
