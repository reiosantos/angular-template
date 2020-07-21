import { Injectable } from '@angular/core';
import { Strings } from '@san/shared/interfaces/strings';
import { AuthToken } from '@san/shared/interfaces/auth-token';
import { Storage } from '@san/shared/interfaces/storage';
import jwtDecode from 'jwt-decode';

@Injectable()
export class AuthTokenService extends AuthToken {
  constructor(private storage: Storage) {
    super();
  }

  getToken = (): string | null => {
    return this.storage.get(Strings.TOKEN_KEY);
  };

  getTokenData = (): any => {
    try {
      let token = this.storage.get(Strings.TOKEN_KEY);
      token = jwtDecode(token);
      return token;
    } catch (e) {
      this.storage.clear();
      return null;
    }
  };

  setToken = (value: string): void => {
    this.storage.set(Strings.TOKEN_KEY, value);
  };

  deleteToken() {
    this.storage.delete(Strings.TOKEN_KEY);
  }
}
