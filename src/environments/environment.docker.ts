import { SanConstants } from '@san/shared/interfaces/san-constants';

export const environment: SanConstants = {
  production: false,
  baseUrl: '/api/',
  environment: 'docker',
  sentryDNS: null,
  oauthProviders: { stripe: 'stripe_dev' },
  forcedUrlComponent: 'angulartemplate',
};
