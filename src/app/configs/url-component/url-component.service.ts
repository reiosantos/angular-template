import { Inject, Injectable } from '@angular/core';
import { environment } from '@san/environment';
import { UrlComponent } from '@san/shared/interfaces/url-component';
import { WINDOW } from '@san/core/providers/injetion-tokens';

@Injectable()
export class UrlComponentService extends UrlComponent {
  private hostname: string;
  private pathname: string;
  private href: string;

  constructor(@Inject(WINDOW) private win: any) {
    super();
    this.hostname = this.win.location.hostname;
    this.pathname = this.win.location.pathname;
    this.href = this.win.location.href;
  }

  /**
   * Whether or not the current domain (host) indicates that we should use the last part of the URL
   * path to determine the venue.
   * @returns {boolean} if should check for venue
   */
  private shouldUseSuffix = (): boolean => {
    // Domains from which to check for the venue from last part of URL path
    const DOMAINS = [
      'dev.voyagecontorl.com',
      'apps.voyagecontorl.com',
      'stg.voyagecontorl.com',
      'int.voyagecontorl.com'
    ];
    return -1 !== DOMAINS.indexOf(this.hostname.toLowerCase());
  };

  /**
   * Venue URL-component, read from dev-deployed URL.
   * @returns {string} The last part of the current URL.
   */
  private urlComponentFromSuffix = (): string => {
    const urlParts = this.pathname.split('/');
    return urlParts[urlParts.length - 1].toLowerCase();
  };

  /**
   * Venue URL-component, read from production-deployed domain.
   * @returns {string}, Subdomain of the current domain (host).
   */
  private urlComponentFromProduction = (): string => {
    const domainParts = this.hostname.split('.');
    const venueName = domainParts[0].split('-');
    return venueName.length === 2 ? venueName[1].toLowerCase() : domainParts[0].toLowerCase();
  };

  get = (): string => {
    if (environment.forcedUrlComponent) {
      return environment.forcedUrlComponent;
    }

    if (this.shouldUseSuffix()) {
      return this.urlComponentFromSuffix();
    }
    return this.urlComponentFromProduction();
  };

  isStaging = (): boolean => {
    return !!(this.href.startsWith('https://') && (this.hostname.startsWith('stg') || this.hostname.startsWith('dev')));
  };

  isUat = (): boolean => {
    return !!(this.href.startsWith('https://') && this.hostname.indexOf('uat') !== -1);
  };

  isLocal = (): boolean => {
    return !!(this.href.startsWith('http://') && this.hostname.startsWith('local'));
  };

  isProd = (): boolean => {
    throw new Error('Method not implemented.');
  };
}
