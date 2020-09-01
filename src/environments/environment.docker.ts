import { Constants } from '@san/shared/interfaces/constants';

export const environment: Constants = {
  production: false,
  baseUrl: '/api/',
  environment: 'docker',
  sentryDNS: null,
  oauthProviders: { stripe: 'stripe_dev' },
  forcedUrlComponent: 'yti'
};
