import { Constants } from '@san/shared/interfaces/constants';

export const environment: Constants = {
  production: true,
  baseUrl: '/api/',
  environment: 'production',
  sentryDNS: null,
  oauthProviders: { stripe: 'stripe' }
};
