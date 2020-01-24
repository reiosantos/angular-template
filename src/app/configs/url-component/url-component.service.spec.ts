import { TestBed } from '@angular/core/testing';

import { UrlComponentService } from './url-component.service';

describe('UrlComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlComponentService = TestBed.get(UrlComponentService);
    expect(service).toBeTruthy();
  });
});
