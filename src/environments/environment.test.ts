import { Constants } from '@san/shared/interfaces/constants';

export const environment: Constants = {
  production: false,
  baseUrl: '/api/',
  environment: 'test',
  sentryDNS: null,
  oauthProviders: { stripe: 'stripe_stg' },
  forcedUrlComponent: 'test'
};
