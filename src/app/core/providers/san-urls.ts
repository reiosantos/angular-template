import { environment } from '@san/environment';

export class SanUrls {
  private static currentBaseUrl: string = environment.baseUrl;

  static setCurrentBaseUrl = (url: string): void => {
    SanUrls.currentBaseUrl = url;
  };
  static getBaseUrl = (): string => environment.baseUrl;
  static getCurrentBaseUrl = (): string => SanUrls.currentBaseUrl;
  static getLoginUrl = (): string => `${SanUrls.getBaseUrl}jwt/verify/`;
}
