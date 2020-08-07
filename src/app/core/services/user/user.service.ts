import { Injectable } from '@angular/core';
import { HttpClient } from '@san/shared/interfaces/http-client';
import { Observable } from 'rxjs';
import { User } from '@san/shared/interfaces/services/user';
import { Urls } from '@san/core/providers/urls';

@Injectable()
export class UserService extends User {
  constructor(private httpClient: HttpClient) {
    super();
  }

  currentUser = (): Observable<any> => {
    return this.httpClient.get(Urls.getCurrentUserUrl());
  };
}
