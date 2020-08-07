import { TestBed } from '@angular/core/testing';

import { HttpWrapperService } from './http-wrapper.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HttpWrapperService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpWrapperService]
    })
  );

  it('should be created', () => {
    const service: HttpWrapperService = TestBed.inject(HttpWrapperService);
    expect(service).toBeTruthy();
  });
});
