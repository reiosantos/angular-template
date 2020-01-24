import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { SanAuthToken } from '@san/shared/interfaces/san-auth-token';
import { SanStrings } from '@san/shared/interfaces/san-strings';

@Injectable()
export class SanAuthTokenService extends SanAuthToken {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: StorageService) {
    super();
  }

  getToken = (): string|null => {
    return this.localStorage.get(SanStrings.TOKEN_KEY);
  };

  setToken = (value: string): void => {
    this.localStorage.set(SanStrings.TOKEN_KEY, value);
  };

  deleteToken() {
    this.localStorage.remove(SanStrings.TOKEN_KEY);
  }
}
