import { Injectable } from '@angular/core';
import { HttpClient } from '@san/shared/interfaces/http-client';
import { Observable } from 'rxjs';
import { UserI } from '@san/shared/interfaces/services/user-i';
import { Urls } from '@san/core/providers/urls';

@Injectable()
export class UserService extends UserI {
  constructor(private httpClient: HttpClient) {
    super();
  }

  currentUser = (): Observable<any> => {
    return this.httpClient.get(Urls.getCurrentUserUrl());
  };
}
