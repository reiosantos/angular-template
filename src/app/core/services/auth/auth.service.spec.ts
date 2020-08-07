import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@san/shared/interfaces/http-client';
import { HttpWrapperService } from '@san/core/http/http-wrapper.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: HttpClient, useClass: HttpWrapperService }]
    })
  );

  it('should be created', () => {
    const service: AuthService = TestBed.inject(AuthService);
    expect(service).toBeTruthy();
  });

  it('should make post request', () => {
    const service: AuthService = TestBed.inject(AuthService);
    const http: HttpClient = TestBed.inject(HttpClient);
    spyOn(http, 'post').and.returnValue(of({ token: 123 }));

    service.login('name', 'pass').subscribe(v => {
      expect(http.post).toHaveBeenCalledTimes(1);
      expect(v).toEqual({ token: 123 });
    });
  });
});
