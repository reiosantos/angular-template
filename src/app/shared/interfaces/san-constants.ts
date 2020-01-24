export interface SanConstants {
  baseUrl?: string;
  production?: boolean;
  environment?: string;
  sentryDNS?: string;
  oauthProviders?: {
    stripe?: string
  };
  version?: string | number;
  forcedUrlComponent?: string;
  urlComponent?: string;
}
