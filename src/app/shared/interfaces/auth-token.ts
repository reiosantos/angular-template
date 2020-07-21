export abstract class AuthToken {
  abstract getToken(): string | null;

  abstract setToken(token: string): void;

  abstract deleteToken(): void;

  abstract getTokenData(): void;
}
