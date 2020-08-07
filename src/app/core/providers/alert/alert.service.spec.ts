import { TestBed } from '@angular/core/testing';

import { AlertService } from '@san/core/providers/alert/alert.service';
import { Store } from '@ngrx/store';
import { SanStoreModule } from '@san/store';
import { Auth } from '@san/shared/interfaces/auth';
import { AuthService } from '@san/core/services/auth/auth.service';
import { HttpClient } from '@san/shared/interfaces/http-client';
import { HttpWrapperService } from '@san/core/http/http-wrapper.service';
import { AuthToken } from '@san/shared/interfaces/auth-token';
import { AuthTokenService } from '@san/core/providers/auth-token/auth-token.service';
import { Storage } from '@san/shared/interfaces/storage';
import { StorageService } from '@san/core/providers/storage/storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const MockStore = {
  dispatch: jasmine.createSpy()
};

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(async () =>
    TestBed.configureTestingModule({
      imports: [SanStoreModule, HttpClientTestingModule],
      providers: [
        AlertService,
        { provide: Store, useValue: MockStore },
        { provide: Auth, useClass: AuthService },
        { provide: HttpClient, useClass: HttpWrapperService },
        { provide: AuthToken, useClass: AuthTokenService },
        { provide: Storage, useClass: StorageService }
      ]
    }).compileComponents()
  );

  it('should be created', () => {
    service = TestBed.inject(AlertService);
    expect(service).toBeTruthy();
  });
});
