import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '@san/shared/interfaces/auth';
import { HttpClient } from '@san/shared/interfaces/http-client';
import { Urls } from '@san/core/providers/urls';

@Injectable()
export class AuthService extends Auth {
  constructor(private httpClient: HttpClient) {
    super();
  }

  login = (username: string, password: string): Observable<any> => {
    return this.httpClient.post(Urls.getLoginUrl(), { username, password });
  };
}
