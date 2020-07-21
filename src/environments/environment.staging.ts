import { Constants } from '@san/shared/interfaces/constants';

export const environment: Constants = {
  production: false,
  baseUrl: '/api/',
  environment: 'staging',
  sentryDNS: null,
  oauthProviders: { stripe: 'stripe_stg' }
};
