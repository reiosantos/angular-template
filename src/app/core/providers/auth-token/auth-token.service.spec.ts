import { TestBed } from '@angular/core/testing';

import { AuthTokenService } from './auth-token.service';
import { Storage } from '@san/shared/interfaces/storage';
import { StorageService } from '@san/core/providers/storage/storage.service';

describe('AuthTokenService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ providers: [AuthTokenService, { provide: Storage, useClass: StorageService }] })
  );

  it('should be created', () => {
    const service: AuthTokenService = TestBed.inject(AuthTokenService);
    expect(service).toBeTruthy();
  });
});
