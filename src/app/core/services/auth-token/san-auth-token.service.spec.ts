import { TestBed } from '@angular/core/testing';

import { SanAuthTokenService } from './san-auth-token.service';

describe('SanAuthTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SanAuthTokenService = TestBed.get(SanAuthTokenService);
    expect(service).toBeTruthy();
  });
});
