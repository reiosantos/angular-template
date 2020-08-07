import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClient } from '@san/shared/interfaces/http-client';
import { HttpWrapperService } from '@san/core/http/http-wrapper.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, { provide: HttpClient, useClass: HttpWrapperService }]
    })
  );

  it('should be created', () => {
    const service: UserService = TestBed.inject(UserService);
    expect(service).toBeTruthy();
  });

  it('should fetch current user', () => {
    const service: UserService = TestBed.inject(UserService);
    const http: HttpClient = TestBed.inject(HttpClient);
    spyOn(http, 'get').and.returnValue(of({ email: 'some@gmail.com' }));

    service.currentUser().subscribe(v => {
      expect(http.get).toHaveBeenCalledTimes(1);
      expect(v).toEqual({ email: 'some@gmail.com' });
    });
  });
});
