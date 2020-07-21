import { environment } from '@san/environment';

export class Urls {
  private static currentBaseUrl: string = environment.baseUrl;
  private static PLACEHOLDER_URL = 'https://dummy-placeholder.angulartemplate.com/';

  static setCurrentBaseUrl = (url: string): void => {
    Urls.currentBaseUrl = url;
  };
  static getBaseUrl = (): string => Urls.PLACEHOLDER_URL;
  static getCurrentBaseUrl = (): string => Urls.currentBaseUrl;

  static getLoginUrl = (): string => `${Urls.getBaseUrl()}jwt/login/`;
  static getJwtVerifyUrl = (): string => `${Urls.getBaseUrl()}jwt/verify/`;
  static getCurrentUserUrl = (): string => `${Urls.getBaseUrl()}user/current/`;
}
