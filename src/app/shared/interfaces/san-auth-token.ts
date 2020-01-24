export abstract class SanAuthToken {
  abstract getToken(): string | null;

  abstract setToken(token: string): void;

  abstract deleteToken(): void;
}
