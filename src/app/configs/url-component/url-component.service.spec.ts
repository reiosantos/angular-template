import { UrlComponentService } from './url-component.service';

describe('UrlComponentService', () => {
  it('should be test on local', () => {
    const service: UrlComponentService = new UrlComponentService({
      location: {
        href: 'http://local.voyagecontorl.com/dashboard',
        pathname: '/dashboard',
        hostname: 'local.voyagecontorl.com'
      }
    });
    expect(service).toBeTruthy();
    expect(service.isLocal()).toBeTrue();
    expect(service.isStaging()).toBeFalse();
  });

  it('should be test on staging', () => {
    const service: UrlComponentService = new UrlComponentService({
      location: {
        href: 'https://stg-yti.voyagecontorl.com/dashboard',
        pathname: '/dashboard',
        hostname: 'stg-yti.voyagecontorl.com'
      }
    });
    expect(service).toBeTruthy();
    expect(service.isLocal()).toBeFalse();
    expect(service.isStaging()).toBeTrue();
  });

  it('should be test on UAT', () => {
    const service: UrlComponentService = new UrlComponentService({
      location: {
        href: 'https://stg-yti.voyagecontorl.com/dashboard',
        pathname: '/dashboard',
        hostname: 'stg-yti.voyagecontorl.com'
      }
    });
    expect(service).toBeTruthy();
    expect(service.isLocal()).toBeFalse();
    expect(service.isStaging()).toBeTrue();
  });

  it('should get venue from suffix', () => {
    const service: UrlComponentService = new UrlComponentService({
      location: {
        href: 'https://dev.voyagecontorl.com/dashboard/yti',
        pathname: '/dashboard/yti',
        hostname: 'dev.voyagecontorl.com'
      }
    });
    expect(service).toBeTruthy();
    expect(service.get()).toBe('yti');
  });

  it('should get venue from hostname', () => {
    const service: UrlComponentService = new UrlComponentService({
      location: {
        href: 'https://stg-yti.voyagecontorl.com/dashboard',
        pathname: '/dashboard',
        hostname: 'stg-yti.voyagecontorl.com'
      }
    });
    expect(service).toBeTruthy();
    expect(service.get()).toBe('yti');
  });
});
