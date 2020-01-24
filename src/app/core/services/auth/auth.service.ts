import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SanAuth } from '@san/shared/interfaces/san-auth';
import { SanHttpClient } from '@san/shared/interfaces/san-http-client';
import { SanUrls } from '@san/core/providers/san-urls';

@Injectable()
export class AuthService extends SanAuth {
  constructor(private sanHttpClient: SanHttpClient) {
    super();
  }

  login = (username: string, password: string): Observable<any> => {
    return this.sanHttpClient.post(SanUrls.getLoginUrl(), { username, password });
  };
}
