import { SanConstants } from '@san/shared/interfaces/san-constants';

export const environment: SanConstants = {
  production: true,
  baseUrl: '/api/',
  environment: 'production',
  sentryDNS: null,
  oauthProviders: { stripe: 'stripe' }
};
